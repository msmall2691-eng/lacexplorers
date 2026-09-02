import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { getFamilySession, getKioskSession } from "@/lib/portal/auth";
import { getStore } from "@/lib/portal/store";
import { formatTime, todayISO } from "@/lib/portal/dates";
import { loginWithPin, unlockKiosk } from "@/lib/portal/actions";
import Kiosk, { type KioskFamily } from "@/components/portal/Kiosk";
import CodeEntry from "@/components/portal/CodeEntry";
import PinPad from "@/components/portal/PinPad";
import { isDemoMode } from "@/lib/portal/store";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/**
 * The check-in screen. Four ways in, checked in this order:
 *  1. A family badge QR deep-links here with ?badge=<code> — that one family,
 *     authorized by badge possession.
 *  2. Staff unlocked this device (door tablet) — full roster, tap a family.
 *  3. A parent scanned the door poster QR on their own phone and is signed
 *     into the portal — their own family only.
 *  4. Nobody? Ask for the family's 4-digit code (same code as the portal);
 *     staff can instead unlock the device via ?staff=1.
 */
export default async function KioskPage({
  searchParams,
}: {
  searchParams: Promise<{ badge?: string; staff?: string }>;
}) {
  const { badge, staff } = await searchParams;
  const store = await getStore();
  const unlocked = await getKioskSession();
  const badgeFamily = badge ? await store.getFamilyByBadge(badge) : null;
  const familySessionId = await getFamilySession();
  const sessionFamily =
    !badgeFamily && !unlocked && familySessionId
      ? await store.getFamilyById(familySessionId)
      : null;

  if (!unlocked && !badgeFamily && !sessionFamily) {
    // ---- Staff device setup (?staff=1) ------------------------------------
    if (staff) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <Link
              href="/portal/kiosk"
              className="mb-6 flex items-center justify-center gap-1 text-xs text-charcoal-light"
            >
              <ArrowLeft size={14} /> Back to family check-in
            </Link>
            <div className="mb-2 flex items-center justify-center gap-2 text-pine">
              <Leaf size={22} strokeWidth={1.5} />
              <span className="font-serif text-lg tracking-tight">{site.name}</span>
            </div>
            <h1 className="mb-1 text-center font-serif text-2xl text-pine">Set up this kiosk</h1>
            <p className="mb-8 text-center text-sm text-charcoal-light">
              Enter the staff code to unlock check-in for all families on this device
              (for the tablet by the door).
            </p>
            <CodeEntry action={unlockKiosk} />
          </div>
        </div>
      );
    }

    // ---- Parent arriving via the door poster QR ----------------------------
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-2 flex items-center justify-center gap-2 text-pine">
            <Leaf size={22} strokeWidth={1.5} />
            <span className="font-serif text-lg tracking-tight">{site.name}</span>
          </div>
          <h1 className="mb-1 text-center font-serif text-2xl text-pine">Check in &amp; out</h1>
          <p className="mb-8 text-center text-sm text-charcoal-light">
            Enter your family&apos;s 4-digit code — your phone will remember it for next time.
          </p>
          <PinPad
            action={loginWithPin}
            hint={isDemoMode() ? "Demo codes: 1234, 5678, or 2468" : undefined}
          />
          <div className="mt-8 space-y-2 border-t border-wood/15 pt-5 text-center">
            <Link
              href="/portal/kiosk?staff=1"
              className="block text-xs text-charcoal-light/70 underline underline-offset-2"
            >
              Staff: set up this device as the door tablet →
            </Link>
            <Link href="/portal" className="block text-xs text-pine/70 underline underline-offset-2">
              Looking for your child&apos;s daily updates? Family portal →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Build the roster: on the unlocked tablet, every family; otherwise just the
  // one family identified by badge or portal session.
  const today = todayISO();
  const singleFamily = badgeFamily ?? sessionFamily;
  const [families, attendance] = await Promise.all([
    unlocked && !badgeFamily ? store.listFamilies() : Promise.resolve([singleFamily!]),
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

  return (
    <Kiosk
      roster={roster}
      badgeMode={Boolean(badgeFamily) || Boolean(sessionFamily)}
      unlocked={unlocked && !badgeFamily}
    />
  );
}
