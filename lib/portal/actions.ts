"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  checkRateLimit,
  clearAttempts,
  clearFamilySession,
  clearKioskSession,
  clearStaffSession,
  getFamilySession,
  getKioskSession,
  getStaffSession,
  noteFailedAttempt,
  setFamilySession,
  setKioskSession,
  setStaffSession,
  staffCode,
} from "./auth";
import { getStore, isDemoMode } from "./store";
import { easternToISO, todayISO } from "./dates";
import type { Meal } from "./types";

/**
 * =============================================================================
 * PORTAL SERVER ACTIONS — every mutation in the portal goes through here.
 * Each action re-checks the caller's session; never trust the client.
 * =============================================================================
 */

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// ---- parent sign-in ---------------------------------------------------------

export async function loginWithPin(pin: string): Promise<{ ok: boolean; error?: string }> {
  const key = `pin:${await clientKey()}`;
  if (!checkRateLimit(key)) {
    return { ok: false, error: "Too many attempts — please wait a minute and try again." };
  }
  if (!/^\d{4}$/.test(pin)) return { ok: false, error: "Codes are 4 digits." };
  const store = await getStore();
  const family = await store.getFamilyByPin(pin);
  if (!family) {
    noteFailedAttempt(key);
    return { ok: false, error: "That code didn't match — try again." };
  }
  clearAttempts(key);
  await setFamilySession(family.id);
  return { ok: true };
}

export async function logoutFamily() {
  await clearFamilySession();
  redirect("/portal");
}

// ---- kiosk ------------------------------------------------------------------

export async function unlockKiosk(code: string): Promise<{ ok: boolean; error?: string }> {
  const key = `kiosk:${await clientKey()}`;
  if (!checkRateLimit(key)) return { ok: false, error: "Too many attempts — wait a minute." };
  if (code !== staffCode()) {
    noteFailedAttempt(key);
    return { ok: false, error: "That staff code didn't match." };
  }
  clearAttempts(key);
  await setKioskSession();
  return { ok: true };
}

export async function lockKiosk() {
  await clearKioskSession();
  revalidatePath("/portal/kiosk");
}

/**
 * Record a check-in or check-out from the kiosk.
 * Authorized by either an unlocked kiosk device OR a valid badge code
 * (possession of the printed family badge is the credential).
 */
export async function kioskRecord(input: {
  familyId: string;
  badgeCode?: string;
  childIds: string[];
  action: "in" | "out";
  by?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const store = await getStore();
  // An unlocked kiosk, a signed-in staff member, or a valid badge all authorize.
  let authorized = (await getKioskSession()) || (await getStaffSession());
  if (!authorized && input.badgeCode) {
    const fam = await store.getFamilyByBadge(input.badgeCode);
    authorized = fam !== null && fam.id === input.familyId;
  }
  if (!authorized) return { ok: false, error: "This device isn't set up for check-in — ask staff to unlock it." };

  const children = await store.listChildren(input.familyId);
  const allowed = new Set(children.map((c) => c.id));
  const targets = input.childIds.filter((id) => allowed.has(id));
  if (targets.length === 0) return { ok: false, error: "No children selected." };

  const now = new Date().toISOString();
  const date = todayISO();
  const by = input.by?.trim().slice(0, 40) || null;
  for (const childId of targets) {
    await store.recordAttendance({ childId, date, action: input.action, time: now, by });
  }
  revalidatePath("/portal/kiosk");
  revalidatePath("/portal");
  return { ok: true };
}

// ---- staff auth -------------------------------------------------------------

export async function staffLogin(code: string): Promise<{ ok: boolean; error?: string }> {
  const key = `staff:${await clientKey()}`;
  if (!checkRateLimit(key)) return { ok: false, error: "Too many attempts — wait a minute." };
  if (code !== staffCode()) {
    noteFailedAttempt(key);
    return { ok: false, error: "That staff code didn't match." };
  }
  clearAttempts(key);
  await setStaffSession();
  return { ok: true };
}

export async function staffLogout() {
  await clearStaffSession();
  redirect("/portal/admin");
}

async function requireStaff() {
  if (!(await getStaffSession())) throw new Error("Not signed in as staff.");
}

// ---- staff: families & children --------------------------------------------

export async function adminCreateFamily(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  const pin = String(formData.get("pin") ?? "").trim();
  if (!name || !/^\d{4}$/.test(pin)) throw new Error("A family needs a name and a 4-digit code.");
  const clash = await store.getFamilyByPin(pin);
  if (clash) throw new Error("That code is already in use by another family.");
  const family = await store.createFamily({ name, displayName: `the ${name} family`, pin });
  const childName = String(formData.get("childName") ?? "").trim().slice(0, 60);
  if (childName) await store.createChild(family.id, childName);
  revalidatePath("/portal/admin/families");
}

export async function adminUpdateFamily(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  const pin = String(formData.get("pin") ?? "").trim();
  if (!id || !name || !/^\d{4}$/.test(pin)) throw new Error("A family needs a name and a 4-digit code.");
  const clash = await store.getFamilyByPin(pin);
  if (clash && clash.id !== id) throw new Error("That code is already in use by another family.");
  await store.updateFamily(id, { name, displayName: `the ${name} family`, pin });
  revalidatePath("/portal/admin/families");
}

export async function adminDeleteFamily(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const id = String(formData.get("id") ?? "");
  if (id) await store.deleteFamily(id);
  revalidatePath("/portal/admin/families");
}

export async function adminAddChild(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const familyId = String(formData.get("familyId") ?? "");
  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  if (familyId && name) await store.createChild(familyId, name);
  revalidatePath("/portal/admin/families");
}

export async function adminRemoveChild(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const id = String(formData.get("id") ?? "");
  if (id) await store.updateChild(id, { active: false });
  revalidatePath("/portal/admin/families");
}

// ---- staff: daily log -------------------------------------------------------

export async function adminSaveDailyLog(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const date = String(formData.get("date") ?? todayISO());
  const childIds = formData.getAll("childId").map(String).filter(Boolean);
  const mood = String(formData.get("mood") ?? "").trim().slice(0, 200);
  const focus = String(formData.get("focus") ?? "").trim().slice(0, 300);
  const note = String(formData.get("note") ?? "").trim().slice(0, 4000);
  const nap = String(formData.get("nap") ?? "").trim().slice(0, 200);

  const meals: Meal[] = [];
  for (let i = 0; i < 6; i++) {
    const time = String(formData.get(`mealTime${i}`) ?? "").trim().slice(0, 20);
    const item = String(formData.get(`mealItem${i}`) ?? "").trim().slice(0, 200);
    if (item) meals.push({ time, item });
  }

  for (const childId of childIds) {
    await store.upsertDailyLog({ childId, date, mood, focus, note, nap, meals });
  }
  revalidatePath("/portal/admin/log");
  revalidatePath("/portal");
  redirect(`/portal/admin/log?date=${date}&saved=1`);
}

// ---- staff: attendance ------------------------------------------------------

export async function adminSaveAttendance(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const date = String(formData.get("date") ?? todayISO());
  const childId = String(formData.get("childId") ?? "");
  const recordId = String(formData.get("recordId") ?? "");
  const inTime = String(formData.get("timeIn") ?? "").trim();
  const outTime = String(formData.get("timeOut") ?? "").trim();
  const droppedBy = String(formData.get("droppedBy") ?? "").trim().slice(0, 40);
  const pickedUpBy = String(formData.get("pickedUpBy") ?? "").trim().slice(0, 40);

  if (recordId) {
    await store.updateAttendance(recordId, {
      timeIn: inTime ? easternToISO(date, inTime) : null,
      timeOut: outTime ? easternToISO(date, outTime) : null,
      droppedBy: droppedBy || null,
      pickedUpBy: pickedUpBy || null,
    });
  } else if (childId && inTime) {
    const iso = easternToISO(date, inTime);
    if (iso) {
      await store.recordAttendance({ childId, date, action: "in", time: iso, by: droppedBy || null });
      if (outTime) {
        const outIso = easternToISO(date, outTime);
        if (outIso) await store.recordAttendance({ childId, date, action: "out", time: outIso, by: pickedUpBy || null });
      }
    }
  }
  revalidatePath("/portal/admin/attendance");
  revalidatePath("/portal");
  redirect(`/portal/admin/attendance?date=${date}&saved=1`);
}

/** One-tap sign in/out from the admin overview. */
export async function adminQuickAttendance(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const childId = String(formData.get("childId") ?? "");
  const action = String(formData.get("action") ?? "");
  if (childId && (action === "in" || action === "out")) {
    await store.recordAttendance({
      childId,
      date: todayISO(),
      action,
      time: new Date().toISOString(),
      by: null,
    });
  }
  revalidatePath("/portal/admin");
  revalidatePath("/portal");
}

// ---- staff: schedule --------------------------------------------------------

export async function adminSaveSchedule(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  for (let weekday = 1; weekday <= 5; weekday++) {
    const theme = String(formData.get(`theme${weekday}`) ?? "").trim().slice(0, 120);
    const detail = String(formData.get(`detail${weekday}`) ?? "").trim().slice(0, 400);
    await store.upsertScheduleDay({ weekday, theme, detail });
  }
  revalidatePath("/portal/admin/schedule");
  revalidatePath("/portal");
  redirect("/portal/admin/schedule?saved=1");
}

// ---- staff: photos ----------------------------------------------------------

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

export async function adminUploadPhoto(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const caption = String(formData.get("caption") ?? "").trim().slice(0, 200);
  const familyId = String(formData.get("familyId") ?? "") || null;
  const date = todayISO();

  if (isDemoMode()) {
    // No storage in demo mode — record a placeholder entry so the flow is visible.
    await store.addPhoto({ date, caption: caption || "Demo photo", storagePath: null, familyId });
  } else {
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) throw new Error("Choose a photo to upload.");
    if (file.size > MAX_PHOTO_BYTES) throw new Error("Photos must be under 8 MB.");
    if (!PHOTO_TYPES.has(file.type)) throw new Error("Please upload a JPG, PNG, WEBP, or HEIC image.");
    const { supabase, PHOTO_BUCKET } = await import("./supabase-store");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
    const path = `${date}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase()
      .storage.from(PHOTO_BUCKET)
      .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type });
    if (error) throw new Error(`Photo upload failed: ${error.message}`);
    await store.addPhoto({ date, caption, storagePath: path, familyId });
  }
  revalidatePath("/portal/admin/photos");
  revalidatePath("/portal");
  redirect("/portal/admin/photos?saved=1");
}

export async function adminDeletePhoto(formData: FormData) {
  await requireStaff();
  const store = await getStore();
  const id = String(formData.get("id") ?? "");
  if (id) await store.deletePhoto(id);
  revalidatePath("/portal/admin/photos");
  revalidatePath("/portal");
}

// ---- shared reads used by client components --------------------------------

export async function getFamilyForSession() {
  const id = await getFamilySession();
  if (!id) return null;
  const store = await getStore();
  return store.getFamilyById(id);
}
