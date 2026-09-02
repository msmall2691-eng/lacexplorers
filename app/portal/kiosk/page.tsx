import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { getKioskSession } from "@/lib/portal/auth";
import { getStore } from "@/lib/portal/store";
import { formatTime, todayISO } from "@/lib/portal/dates";
import { unlockKiosk } from "@/lib/portal/actions";
import Kiosk, { type KioskFamily } from "@/components/portal/Kiosk";
import CodeEntry from "@/components/portal/CodeEntry";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/**
 * The door kiosk. Two ways in:
 *  - Staff unlocks the device once with the staff code; it stays unlocked.
 *  - A family badge QR deep-links here with ?badge=<code>, which authorizes
 *    check-in for that one family (possession of the badge is the credential).
 */
export default async function KioskPage({
  searchParams,
}: {
  searchParams: Promise<{ badge?: string }>;
}) {
  const { badge } = await searchParams;
  const store = await getStore();
  const unlocked = await getKioskSession();
  const badgeFamily = badge ? await store.getFamilyByBadge(badge) : null;

  if (!unlocked && !badgeFamily) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/portal" className="mb-6 flex items-center justify-center gap-1 text-xs text-charcoal-light">
            <ArrowLeft size={14} /> Back to portal
          </Link>
          <div className="mb-2 flex items-center justify-center gap-2 text-pine">
            <Leaf size={22} strokeWidth={1.5} />
            <span className="font-serif text-lg tracking-tight">{site.name}</span>
          </div>
          <h1 className="mb-1 text-center font-serif text-2xl text-pine">Set up this kiosk</h1>
          <p className="mb-8 text-center text-sm text-charcoal-light">
            Enter the staff code to unlock check-in on this device.
          </p>
          <CodeEntry action={unlockKiosk} />
        </div>
      </div>
    );
  }

  // Build the roster: every family with each child's current in/out state today.
  const today = todayISO();
  const [families, attendance] = await Promise.all([
    badgeFamily ? Promise.resolve([badgeFamily]) : store.listFamilies(),
    store.getAttendanceForDate(today),
  ]);
  const byChild = new Map(attendance.map((a) => [a.childId, a]));

  const roster: KioskFamily[] = [];
  for (const family of families) {
    const children = await store.listChildren(family.id);
    if (children.length === 0) continue;
    roster.push({
      id: family.id,
      name: family.name,
      badgeCode: badgeFamily ? family.badgeCode : undefined,
      children: children.map((c) => {
        const rec = byChild.get(c.id);
        const isIn = Boolean(rec?.timeIn && !rec.timeOut);
        return {
          id: c.id,
          name: c.name,
          isIn,
          since: isIn ? formatTime(rec!.timeIn) : rec?.timeOut ? formatTime(rec.timeOut) : null,
        };
      }),
    });
  }

  return <Kiosk roster={roster} badgeMode={Boolean(badgeFamily)} unlocked={unlocked} />;
}
