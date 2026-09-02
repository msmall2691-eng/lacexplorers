import type {
  AttendanceRecord,
  Child,
  DailyLog,
  Family,
  Photo,
  PortalStore,
  ScheduleDay,
} from "./types";
import { addDays, mondayOf, todayISO, weekdayOf } from "./dates";

/**
 * =============================================================================
 * DEMO STORE — seeded, in-memory data so the portal works with zero setup.
 * =============================================================================
 * Active whenever SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured.
 * Perfect for previewing the app; NOT for real use — on a serverless host each
 * request may hit a fresh instance, so any change made in demo mode can vanish.
 * The portal shows a "demo mode" banner so this is never mistaken for real data.
 */

let counter = 100;
const nid = () => `demo-${counter++}`;

function seed() {
  const today = todayISO();
  const monday = mondayOf(today);
  const wd = weekdayOf(today);

  const families: Family[] = [
    { id: "fam-talbot", name: "Talbot", displayName: "the Talbot family", pin: "1234", badgeCode: "demo-badge-talbot" },
    { id: "fam-ferreira", name: "Ferreira", displayName: "the Ferreira family", pin: "5678", badgeCode: "demo-badge-ferreira" },
    { id: "fam-chen", name: "Chen", displayName: "the Chen family", pin: "2468", badgeCode: "demo-badge-chen" },
  ];

  const children: Child[] = [
    { id: "ch-wren", familyId: "fam-talbot", name: "Wren", active: true },
    { id: "ch-max", familyId: "fam-ferreira", name: "Max", active: true },
    { id: "ch-nora", familyId: "fam-ferreira", name: "Nora", active: true },
    { id: "ch-sadie", familyId: "fam-chen", name: "Sadie", active: true },
  ];

  const meals = [
    { time: "9:00 AM", item: "Snack: apple slices & crackers" },
    { time: "12:15 PM", item: "Lunch: packed lunch, ate everything" },
    { time: "3:00 PM", item: "Snack: yogurt & berries" },
  ];

  const logs: DailyLog[] = children.map((c) => ({
    id: nid(),
    childId: c.id,
    date: today,
    mood: "Cheerful, full of questions",
    focus: "Letter recognition — sounding out first letters of names",
    note:
      c.id === "ch-wren"
        ? "We walked down to the lake path this morning and found three different kinds of leaves. Wren wanted to count them all out loud and got to nineteen before losing track — great practice! Spent the afternoon building a fort out of branches."
        : `${c.name} had a wonderful day outside — lots of exploring, digging, and a very focused story time.`,
    nap: "12:45 – 2:15 PM, slept the whole time",
    meals,
  }));

  // Timestamps for "this morning" in a portable way: build from today's ISO date.
  const t = (hourUTC: number, min: number) => new Date(`${today}T${String(hourUTC).padStart(2, "0")}:${String(min).padStart(2, "0")}:00-04:00`).toISOString();

  const attendance: AttendanceRecord[] = [];
  // Earlier days this week (Mon..yesterday) for every child.
  for (let d = 1; d < wd && d <= 4; d++) {
    const date = addDays(monday, d - 1);
    if (date >= today) break;
    for (const c of children) {
      attendance.push({
        id: nid(),
        childId: c.id,
        date,
        timeIn: new Date(`${date}T07:52:00-04:00`).toISOString(),
        timeOut: new Date(`${date}T16:15:00-04:00`).toISOString(),
        droppedBy: "Dad",
        pickedUpBy: "Mom",
      });
    }
  }
  // Today: Wren and Ferreira kids are signed in; Sadie not yet arrived.
  attendance.push(
    { id: nid(), childId: "ch-wren", date: today, timeIn: t(7, 45), timeOut: null, droppedBy: "Dad", pickedUpBy: null },
    { id: nid(), childId: "ch-max", date: today, timeIn: t(8, 5), timeOut: null, droppedBy: "Mom", pickedUpBy: null },
    { id: nid(), childId: "ch-nora", date: today, timeIn: t(8, 5), timeOut: null, droppedBy: "Mom", pickedUpBy: null },
  );

  const schedule: ScheduleDay[] = [
    { weekday: 1, theme: "Counting & Collecting", detail: "Nature walk, collect and sort found objects by size" },
    { weekday: 2, theme: "Letter Hunt", detail: "Lake walk looking for letter shapes in sticks and stones" },
    { weekday: 3, theme: "Story & Sound", detail: "Read aloud + practice first-letter sounds" },
    { weekday: 4, theme: "Garden Helpers", detail: "Watering, weeding, and talking about how plants grow" },
    { weekday: 5, theme: "Show & Tell", detail: "Bring something from home that starts with your letter" },
  ];

  const photos: Photo[] = [
    { id: nid(), date: today, caption: "Leaf counting on the lake path", storagePath: null, familyId: null },
    { id: nid(), date: today, caption: "Branch fort, in progress", storagePath: null, familyId: null },
    { id: nid(), date: addDays(today, -1), caption: "Snack time in the garden", storagePath: null, familyId: null },
    { id: nid(), date: addDays(today, -1), caption: "Practicing letters in the sandbox", storagePath: null, familyId: null },
  ];

  return { families, children, logs, attendance, schedule, photos };
}

type DB = ReturnType<typeof seed>;

// Survive hot reloads in dev; on serverless this is per-instance (demo only).
const g = globalThis as unknown as { __portalDemoDb?: DB };
function db(): DB {
  if (!g.__portalDemoDb) g.__portalDemoDb = seed();
  return g.__portalDemoDb;
}

export const demoStore: PortalStore = {
  async getFamilyByPin(pin) {
    return db().families.find((f) => f.pin === pin) ?? null;
  },
  async getFamilyById(id) {
    return db().families.find((f) => f.id === id) ?? null;
  },
  async getFamilyByBadge(code) {
    return db().families.find((f) => f.badgeCode === code) ?? null;
  },
  async listFamilies() {
    return [...db().families].sort((a, b) => a.name.localeCompare(b.name));
  },
  async createFamily({ name, displayName, pin }) {
    const fam: Family = { id: nid(), name, displayName, pin, badgeCode: `demo-badge-${nid()}` };
    db().families.push(fam);
    return fam;
  },
  async updateFamily(id, input) {
    const f = db().families.find((x) => x.id === id);
    if (f) Object.assign(f, input);
  },
  async deleteFamily(id) {
    const d = db();
    d.families = d.families.filter((f) => f.id !== id);
    d.children = d.children.filter((c) => c.familyId !== id);
  },
  async listChildren(familyId) {
    return db().children.filter((c) => c.familyId === familyId && c.active);
  },
  async listAllChildren() {
    return db().children.filter((c) => c.active);
  },
  async createChild(familyId, name) {
    const child: Child = { id: nid(), familyId, name, active: true };
    db().children.push(child);
    return child;
  },
  async updateChild(id, input) {
    const c = db().children.find((x) => x.id === id);
    if (c) Object.assign(c, input);
  },
  async deleteChild(id) {
    const d = db();
    d.children = d.children.filter((c) => c.id !== id);
  },
  async getDailyLog(childId, date) {
    return db().logs.find((l) => l.childId === childId && l.date === date) ?? null;
  },
  async upsertDailyLog(input) {
    const existing = db().logs.find((l) => l.childId === input.childId && l.date === input.date);
    if (existing) Object.assign(existing, input);
    else db().logs.push({ id: nid(), ...input });
  },
  async getAttendance(childId, fromDate, toDate) {
    return db()
      .attendance.filter((a) => a.childId === childId && a.date >= fromDate && a.date <= toDate)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  async getAttendanceForDate(date) {
    return db().attendance.filter((a) => a.date === date);
  },
  async recordAttendance({ childId, date, action, time, by }) {
    const existing = db().attendance.find((a) => a.childId === childId && a.date === date);
    if (action === "in") {
      if (existing) {
        existing.timeIn = existing.timeIn ?? time;
        existing.timeOut = null; // re-signing in clears a stale sign-out
        if (by) existing.droppedBy = by;
      } else {
        db().attendance.push({ id: nid(), childId, date, timeIn: time, timeOut: null, droppedBy: by ?? null, pickedUpBy: null });
      }
    } else if (existing) {
      existing.timeOut = time;
      if (by) existing.pickedUpBy = by;
    }
  },
  async updateAttendance(id, input) {
    const a = db().attendance.find((x) => x.id === id);
    if (a) Object.assign(a, input);
  },
  async getSchedule() {
    return [...db().schedule].sort((a, b) => a.weekday - b.weekday);
  },
  async upsertScheduleDay(day) {
    const existing = db().schedule.find((s) => s.weekday === day.weekday);
    if (existing) Object.assign(existing, day);
    else db().schedule.push(day);
  },
  async listPhotosForFamily(familyId, limit = 24) {
    return db()
      .photos.filter((p) => p.familyId === null || p.familyId === familyId)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);
  },
  async listAllPhotos(limit = 60) {
    return [...db().photos].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
  },
  async addPhoto(input) {
    db().photos.unshift({ id: nid(), ...input });
  },
  async deletePhoto(id) {
    const d = db();
    d.photos = d.photos.filter((p) => p.id !== id);
  },
};
