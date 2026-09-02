import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  AttendanceRecord,
  Child,
  DailyLog,
  Family,
  Photo,
  PortalStore,
  ScheduleDay,
} from "./types";

/**
 * =============================================================================
 * SUPABASE STORE — the real database backend.
 * =============================================================================
 * Active when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set. The service
 * role key is used ONLY on the server (route handlers / server actions) and is
 * never sent to the browser. The schema lives in `supabase/portal-schema.sql`.
 */

export const PHOTO_BUCKET = "portal-photos";

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

function toFamily(r: Record<string, unknown>): Family {
  return {
    id: r.id as string,
    name: r.name as string,
    displayName: (r.display_name as string) ?? `the ${r.name} family`,
    pin: r.pin as string,
    badgeCode: r.badge_code as string,
  };
}

function toChild(r: Record<string, unknown>): Child {
  return { id: r.id as string, familyId: r.family_id as string, name: r.name as string, active: r.active as boolean };
}

function toLog(r: Record<string, unknown>): DailyLog {
  return {
    id: r.id as string,
    childId: r.child_id as string,
    date: r.date as string,
    mood: (r.mood as string) ?? "",
    focus: (r.focus as string) ?? "",
    note: (r.note as string) ?? "",
    nap: (r.nap as string) ?? "",
    meals: (r.meals as DailyLog["meals"]) ?? [],
  };
}

function toAttendance(r: Record<string, unknown>): AttendanceRecord {
  return {
    id: r.id as string,
    childId: r.child_id as string,
    date: r.date as string,
    timeIn: (r.time_in as string) ?? null,
    timeOut: (r.time_out as string) ?? null,
    droppedBy: (r.dropped_by as string) ?? null,
    pickedUpBy: (r.picked_up_by as string) ?? null,
  };
}

function toPhoto(r: Record<string, unknown>): Photo {
  return {
    id: r.id as string,
    date: r.date as string,
    caption: (r.caption as string) ?? "",
    storagePath: (r.storage_path as string) ?? null,
    familyId: (r.family_id as string) ?? null,
  };
}

function fail(context: string, error: { message: string } | null): never {
  throw new Error(`Portal database error (${context}): ${error?.message ?? "unknown"}`);
}

export const supabaseStore: PortalStore = {
  async getFamilyByPin(pin) {
    const { data, error } = await supabase().from("portal_families").select("*").eq("pin", pin).maybeSingle();
    if (error) fail("getFamilyByPin", error);
    return data ? toFamily(data) : null;
  },
  async getFamilyById(id) {
    const { data, error } = await supabase().from("portal_families").select("*").eq("id", id).maybeSingle();
    if (error) fail("getFamilyById", error);
    return data ? toFamily(data) : null;
  },
  async getFamilyByBadge(code) {
    const { data, error } = await supabase().from("portal_families").select("*").eq("badge_code", code).maybeSingle();
    if (error) fail("getFamilyByBadge", error);
    return data ? toFamily(data) : null;
  },
  async listFamilies() {
    const { data, error } = await supabase().from("portal_families").select("*").order("name");
    if (error) fail("listFamilies", error);
    return (data ?? []).map(toFamily);
  },
  async createFamily({ name, displayName, pin }) {
    const { data, error } = await supabase()
      .from("portal_families")
      .insert({ name, display_name: displayName, pin })
      .select("*")
      .single();
    if (error) fail("createFamily", error);
    return toFamily(data);
  },
  async updateFamily(id, input) {
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.displayName !== undefined) patch.display_name = input.displayName;
    if (input.pin !== undefined) patch.pin = input.pin;
    const { error } = await supabase().from("portal_families").update(patch).eq("id", id);
    if (error) fail("updateFamily", error);
  },
  async deleteFamily(id) {
    const { error } = await supabase().from("portal_families").delete().eq("id", id);
    if (error) fail("deleteFamily", error);
  },
  async listChildren(familyId) {
    const { data, error } = await supabase()
      .from("portal_children")
      .select("*")
      .eq("family_id", familyId)
      .eq("active", true)
      .order("name");
    if (error) fail("listChildren", error);
    return (data ?? []).map(toChild);
  },
  async listAllChildren() {
    const { data, error } = await supabase().from("portal_children").select("*").eq("active", true).order("name");
    if (error) fail("listAllChildren", error);
    return (data ?? []).map(toChild);
  },
  async createChild(familyId, name) {
    const { data, error } = await supabase()
      .from("portal_children")
      .insert({ family_id: familyId, name })
      .select("*")
      .single();
    if (error) fail("createChild", error);
    return toChild(data);
  },
  async updateChild(id, input) {
    const { error } = await supabase().from("portal_children").update(input).eq("id", id);
    if (error) fail("updateChild", error);
  },
  async deleteChild(id) {
    const { error } = await supabase().from("portal_children").delete().eq("id", id);
    if (error) fail("deleteChild", error);
  },
  async getDailyLog(childId, date) {
    const { data, error } = await supabase()
      .from("portal_daily_logs")
      .select("*")
      .eq("child_id", childId)
      .eq("date", date)
      .maybeSingle();
    if (error) fail("getDailyLog", error);
    return data ? toLog(data) : null;
  },
  async upsertDailyLog(input) {
    const { error } = await supabase()
      .from("portal_daily_logs")
      .upsert(
        {
          child_id: input.childId,
          date: input.date,
          mood: input.mood,
          focus: input.focus,
          note: input.note,
          nap: input.nap,
          meals: input.meals,
        },
        { onConflict: "child_id,date" }
      );
    if (error) fail("upsertDailyLog", error);
  },
  async getAttendance(childId, fromDate, toDate) {
    const { data, error } = await supabase()
      .from("portal_attendance")
      .select("*")
      .eq("child_id", childId)
      .gte("date", fromDate)
      .lte("date", toDate)
      .order("date");
    if (error) fail("getAttendance", error);
    return (data ?? []).map(toAttendance);
  },
  async getAttendanceForDate(date) {
    const { data, error } = await supabase().from("portal_attendance").select("*").eq("date", date);
    if (error) fail("getAttendanceForDate", error);
    return (data ?? []).map(toAttendance);
  },
  async recordAttendance({ childId, date, action, time, by }) {
    const { data: existing, error: readErr } = await supabase()
      .from("portal_attendance")
      .select("*")
      .eq("child_id", childId)
      .eq("date", date)
      .maybeSingle();
    if (readErr) fail("recordAttendance:read", readErr);
    if (action === "in") {
      if (existing) {
        const { error } = await supabase()
          .from("portal_attendance")
          .update({
            time_in: existing.time_in ?? time,
            time_out: null,
            ...(by ? { dropped_by: by } : {}),
          })
          .eq("id", existing.id);
        if (error) fail("recordAttendance:in", error);
      } else {
        const { error } = await supabase()
          .from("portal_attendance")
          .insert({ child_id: childId, date, time_in: time, dropped_by: by ?? null });
        if (error) fail("recordAttendance:insert", error);
      }
    } else if (existing) {
      const { error } = await supabase()
        .from("portal_attendance")
        .update({ time_out: time, ...(by ? { picked_up_by: by } : {}) })
        .eq("id", existing.id);
      if (error) fail("recordAttendance:out", error);
    }
  },
  async updateAttendance(id, input) {
    const patch: Record<string, unknown> = {};
    if (input.timeIn !== undefined) patch.time_in = input.timeIn;
    if (input.timeOut !== undefined) patch.time_out = input.timeOut;
    if (input.droppedBy !== undefined) patch.dropped_by = input.droppedBy;
    if (input.pickedUpBy !== undefined) patch.picked_up_by = input.pickedUpBy;
    const { error } = await supabase().from("portal_attendance").update(patch).eq("id", id);
    if (error) fail("updateAttendance", error);
  },
  async getSchedule() {
    const { data, error } = await supabase().from("portal_schedule").select("*").order("weekday");
    if (error) fail("getSchedule", error);
    return (data ?? []).map((r) => ({
      weekday: r.weekday as number,
      theme: (r.theme as string) ?? "",
      detail: (r.detail as string) ?? "",
    })) as ScheduleDay[];
  },
  async upsertScheduleDay(day) {
    const { error } = await supabase()
      .from("portal_schedule")
      .upsert({ weekday: day.weekday, theme: day.theme, detail: day.detail }, { onConflict: "weekday" });
    if (error) fail("upsertScheduleDay", error);
  },
  async listPhotosForFamily(familyId, limit = 24) {
    const { data, error } = await supabase()
      .from("portal_photos")
      .select("*")
      .or(`family_id.is.null,family_id.eq.${familyId}`)
      .order("date", { ascending: false })
      .limit(limit);
    if (error) fail("listPhotosForFamily", error);
    return (data ?? []).map(toPhoto);
  },
  async listAllPhotos(limit = 60) {
    const { data, error } = await supabase()
      .from("portal_photos")
      .select("*")
      .order("date", { ascending: false })
      .limit(limit);
    if (error) fail("listAllPhotos", error);
    return (data ?? []).map(toPhoto);
  },
  async addPhoto(input) {
    const { error } = await supabase().from("portal_photos").insert({
      date: input.date,
      caption: input.caption,
      storage_path: input.storagePath,
      family_id: input.familyId,
    });
    if (error) fail("addPhoto", error);
  },
  async deletePhoto(id) {
    const { data, error } = await supabase().from("portal_photos").delete().eq("id", id).select("storage_path");
    if (error) fail("deletePhoto", error);
    const path = data?.[0]?.storage_path as string | undefined;
    if (path) await supabase().storage.from(PHOTO_BUCKET).remove([path]);
  },
};

/** Resolve time-limited signed URLs for photos stored in the private bucket. */
export async function withSignedUrls(photos: Photo[]): Promise<Photo[]> {
  const paths = photos.filter((p) => p.storagePath).map((p) => p.storagePath!) ;
  if (paths.length === 0) return photos;
  const { data } = await supabase().storage.from(PHOTO_BUCKET).createSignedUrls(paths, 60 * 60);
  const byPath = new Map((data ?? []).map((d) => [d.path, d.signedUrl]));
  return photos.map((p) => ({ ...p, url: p.storagePath ? byPath.get(p.storagePath) ?? null : null }));
}
