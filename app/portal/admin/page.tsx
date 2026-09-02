import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { getStaffSession } from "@/lib/portal/auth";
import { getStore } from "@/lib/portal/store";
import { adminQuickAttendance } from "@/lib/portal/actions";
import { formatLongDate, formatTime, todayISO } from "@/lib/portal/dates";

/**
 * Staff overview: who's here right now, with one-tap sign in/out,
 * plus quick links to today's tasks.
 */
export default async function AdminTodayPage() {
  // Defense in depth: the layout renders the sign-in screen without a staff
  // session, but pages must not fetch data for unauthenticated requests either.
  if (!(await getStaffSession())) return null;
  const store = await getStore();
  const today = todayISO();
  const [families, attendance] = await Promise.all([
    store.listFamilies(),
    store.getAttendanceForDate(today),
  ]);
  const byChild = new Map(attendance.map((a) => [a.childId, a]));

  const rows: {
    childId: string;
    childName: string;
    familyName: string;
    isIn: boolean;
    label: string;
  }[] = [];
  for (const family of families) {
    for (const child of await store.listChildren(family.id)) {
      const rec = byChild.get(child.id);
      const isIn = Boolean(rec?.timeIn && !rec.timeOut);
      rows.push({
        childId: child.id,
        childName: child.name,
        familyName: family.name,
        isIn,
        label: isIn
          ? `In since ${formatTime(rec!.timeIn)}`
          : rec?.timeOut
            ? `Signed out ${formatTime(rec.timeOut)}`
            : "Not here yet",
      });
    }
  }
  const hereCount = rows.filter((r) => r.isIn).length;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-charcoal-light">{formatLongDate(today)}</p>
        <h1 className="font-serif text-2xl text-pine">
          {hereCount} {hereCount === 1 ? "child" : "children"} here now
        </h1>
      </div>

      <div className="space-y-2">
        {rows.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-charcoal-light">
            No families yet — add your first family under{" "}
            <Link href="/portal/admin/families" className="text-pine underline">
              Families
            </Link>
            .
          </div>
        )}
        {rows.map((r) => (
          <div key={r.childId} className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${r.isIn ? "bg-pine" : "bg-wood/40"}`} />
              <div>
                <p className="font-medium text-charcoal">{r.childName}</p>
                <p className="text-xs text-charcoal-light">
                  {r.familyName} family · {r.label}
                </p>
              </div>
            </div>
            <form action={adminQuickAttendance}>
              <input type="hidden" name="childId" value={r.childId} />
              <input type="hidden" name="action" value={r.isIn ? "out" : "in"} />
              <button
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium ${
                  r.isIn ? "bg-linen text-charcoal" : "bg-pine text-cream"
                }`}
              >
                {r.isIn ? <LogOut size={13} /> : <LogIn size={13} />}
                {r.isIn ? "Sign out" : "Sign in"}
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/portal/admin/log" className="rounded-2xl bg-pine p-4 text-cream">
          <p className="font-serif text-lg">Write today&apos;s log</p>
          <p className="mt-0.5 text-xs text-cream/75">Mood, meals, nap, and the day&apos;s story</p>
        </Link>
        <Link href="/portal/admin/photos" className="rounded-2xl bg-white p-4">
          <p className="font-serif text-lg text-pine">Share photos</p>
          <p className="mt-0.5 text-xs text-charcoal-light">Add to the photo journal</p>
        </Link>
      </div>
    </div>
  );
}
