/**
 * =============================================================================
 * PARENT PORTAL — shared types
 * =============================================================================
 * These types describe the portal's data model. They are used by both the
 * demo (in-memory) store and the Supabase-backed store, so the UI never needs
 * to know which one is active.
 */

export type Family = {
  id: string;
  /** Family surname, e.g. "Talbot" */
  name: string;
  /** Greeting name, e.g. "the Talbot family" */
  displayName: string;
  /** 4-digit sign-in code parents type into the portal */
  pin: string;
  /** Unguessable code embedded in the printed QR badge for kiosk check-in */
  badgeCode: string;
};

export type Child = {
  id: string;
  familyId: string;
  name: string;
  active: boolean;
};

export type Meal = {
  time: string; // "9:00 AM"
  item: string; // "Snack: apple slices & crackers"
};

export type DailyLog = {
  id: string;
  childId: string;
  date: string; // "YYYY-MM-DD"
  mood: string;
  focus: string;
  note: string;
  nap: string;
  meals: Meal[];
};

export type AttendanceRecord = {
  id: string;
  childId: string;
  date: string; // "YYYY-MM-DD"
  /** ISO timestamps; formatted for display in Eastern time */
  timeIn: string | null;
  timeOut: string | null;
  droppedBy: string | null;
  pickedUpBy: string | null;
};

export type ScheduleDay = {
  /** 1 = Monday … 5 = Friday */
  weekday: number;
  theme: string;
  detail: string;
};

export type Photo = {
  id: string;
  date: string; // "YYYY-MM-DD"
  caption: string;
  /** Path inside the storage bucket; null in demo mode (placeholder shown) */
  storagePath: string | null;
  /** null = visible to every family; otherwise only that family sees it */
  familyId: string | null;
  /** Resolved, time-limited URL for rendering (filled in server-side) */
  url?: string | null;
};

export type FamilyKioskStatus = {
  family: Family;
  children: (Child & {
    /** Is the child currently signed in today? */
    isIn: boolean;
    /** Display time of the most recent event today, e.g. "8:05 AM" */
    since: string | null;
  })[];
};

/**
 * The storage interface both backends implement. Keep this small — it is the
 * contract between the UI and the database.
 */
export interface PortalStore {
  // -- families & children ----------------------------------------------------
  getFamilyByPin(pin: string): Promise<Family | null>;
  getFamilyById(id: string): Promise<Family | null>;
  getFamilyByBadge(badgeCode: string): Promise<Family | null>;
  listFamilies(): Promise<Family[]>;
  createFamily(input: { name: string; displayName: string; pin: string }): Promise<Family>;
  updateFamily(id: string, input: Partial<Pick<Family, "name" | "displayName" | "pin">>): Promise<void>;
  deleteFamily(id: string): Promise<void>;
  listChildren(familyId: string): Promise<Child[]>;
  listAllChildren(): Promise<Child[]>;
  createChild(familyId: string, name: string): Promise<Child>;
  updateChild(id: string, input: { name?: string; active?: boolean }): Promise<void>;
  deleteChild(id: string): Promise<void>;

  // -- daily logs -------------------------------------------------------------
  getDailyLog(childId: string, date: string): Promise<DailyLog | null>;
  upsertDailyLog(input: Omit<DailyLog, "id">): Promise<void>;

  // -- attendance -------------------------------------------------------------
  getAttendance(childId: string, fromDate: string, toDate: string): Promise<AttendanceRecord[]>;
  getAttendanceForDate(date: string): Promise<AttendanceRecord[]>;
  /** Sign a child in or out. Creates or updates today's record. */
  recordAttendance(input: {
    childId: string;
    date: string;
    action: "in" | "out";
    time: string; // ISO
    by?: string | null;
  }): Promise<void>;
  updateAttendance(id: string, input: Partial<Omit<AttendanceRecord, "id" | "childId" | "date">>): Promise<void>;

  // -- weekly schedule --------------------------------------------------------
  getSchedule(): Promise<ScheduleDay[]>;
  upsertScheduleDay(day: ScheduleDay): Promise<void>;

  // -- photos -----------------------------------------------------------------
  listPhotosForFamily(familyId: string, limit?: number): Promise<Photo[]>;
  listAllPhotos(limit?: number): Promise<Photo[]>;
  addPhoto(input: { date: string; caption: string; storagePath: string | null; familyId: string | null }): Promise<void>;
  deletePhoto(id: string): Promise<void>;
}
