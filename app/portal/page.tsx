import Link from "next/link";
import { Leaf } from "lucide-react";
import { getFamilySession } from "@/lib/portal/auth";
import { getStore, isDemoMode } from "@/lib/portal/store";
import { loginWithPin } from "@/lib/portal/actions";
import { addDays, mondayOf, todayISO } from "@/lib/portal/dates";
import PinPad from "@/components/portal/PinPad";
import ParentDashboard from "@/components/portal/ParentDashboard";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ child?: string }>;
}) {
  const familyId = await getFamilySession();
  const store = await getStore();
  const family = familyId ? await store.getFamilyById(familyId) : null;

  // ---- Signed out: PIN gate -------------------------------------------------
  if (!family) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-2 flex items-center justify-center gap-2 text-pine">
            <Leaf size={22} strokeWidth={1.5} />
            <span className="font-serif text-lg tracking-tight">{site.name}</span>
          </div>
          <h1 className="mb-1 text-center font-serif text-3xl text-pine">Welcome back</h1>
          <p className="mb-8 text-center text-sm text-charcoal-light">
            Enter your family&apos;s 4-digit code
          </p>
          <PinPad
            action={loginWithPin}
            hint={isDemoMode() ? "Demo codes: 1234, 5678, or 2468" : undefined}
          />
          <div className="mt-6 space-y-2 text-center">
            <Link
              href="/portal/kiosk"
              className="block text-xs text-pine/70 underline underline-offset-2"
            >
              Family check-in kiosk →
            </Link>
            <Link
              href="/portal/admin"
              className="block text-xs text-charcoal-light/60 underline underline-offset-2"
            >
              Staff sign-in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- Signed in: gather this family's data --------------------------------
  const children = await store.listChildren(family.id);
  const params = await searchParams;
  const selected = children.find((c) => c.id === params.child) ?? children[0] ?? null;

  const today = todayISO();
  const monday = mondayOf(today);

  const [log, attendance, schedule, rawPhotos] = selected
    ? await Promise.all([
        store.getDailyLog(selected.id, today),
        store.getAttendance(selected.id, monday, addDays(monday, 4)),
        store.getSchedule(),
        store.listPhotosForFamily(family.id),
      ])
    : [null, [], await store.getSchedule(), await store.listPhotosForFamily(family.id)];

  let photos = rawPhotos;
  if (!isDemoMode()) {
    const { withSignedUrls } = await import("@/lib/portal/supabase-store");
    photos = await withSignedUrls(rawPhotos);
  }

  return (
    <ParentDashboard
      family={family}
      childList={children}
      selectedChildId={selected?.id ?? null}
      log={log}
      attendance={attendance}
      schedule={schedule}
      photos={photos}
      today={today}
    />
  );
}
