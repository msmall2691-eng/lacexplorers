/**
 * Date/time helpers for the portal. The daycare operates in Maine, so every
 * "what day is it / what time is it" question is answered in Eastern time,
 * regardless of where the server runs.
 */

export const DAYCARE_TZ = "America/New_York";

/** Today's date in the daycare's timezone as "YYYY-MM-DD". */
export function todayISO(): string {
  return dateISO(new Date());
}

/** A Date object → "YYYY-MM-DD" in the daycare's timezone. */
export function dateISO(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DAYCARE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** "YYYY-MM-DD" → weekday number, 1 = Monday … 7 = Sunday. */
export function weekdayOf(iso: string): number {
  const d = new Date(`${iso}T12:00:00Z`); // noon UTC avoids DST edge cases
  const wd = d.getUTCDay(); // 0 = Sunday
  return wd === 0 ? 7 : wd;
}

/** The Monday of the week containing the given ISO date. */
export function mondayOf(iso: string): string {
  return addDays(iso, 1 - weekdayOf(iso));
}

/** Add n days to an ISO date string. */
export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** ISO timestamp → "8:05 AM" in Eastern time. */
export function formatTime(isoTimestamp: string | null): string | null {
  if (!isoTimestamp) return null;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DAYCARE_TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoTimestamp));
}

/** "YYYY-MM-DD" → "Wed, Sep 3" */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}

/** "YYYY-MM-DD" → "Wednesday, September 3" */
export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export const WEEKDAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/**
 * Convert a wall-clock Eastern time ("08:05", 24h) on a given date to an ISO
 * timestamp, handling daylight saving by testing both possible offsets.
 */
export function easternToISO(iso: string, hhmm: string): string | null {
  if (!/^\d{2}:\d{2}$/.test(hhmm)) return null;
  for (const off of ["-04:00", "-05:00"]) {
    const d = new Date(`${iso}T${hhmm}:00${off}`);
    const roundTrip = new Intl.DateTimeFormat("en-GB", {
      timeZone: DAYCARE_TZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
    if (roundTrip === hhmm) return d.toISOString();
  }
  return new Date(`${iso}T${hhmm}:00-05:00`).toISOString();
}

/** ISO timestamp → "08:05" (24h, Eastern) for <input type="time"> values. */
export function toTimeInputValue(isoTimestamp: string | null): string {
  if (!isoTimestamp) return "";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: DAYCARE_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(isoTimestamp));
}
