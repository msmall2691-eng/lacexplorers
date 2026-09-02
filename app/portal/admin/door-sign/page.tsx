import QRCode from "qrcode";
import Link from "next/link";
import { headers } from "next/headers";
import { Leaf } from "lucide-react";
import { getStaffSession } from "@/lib/portal/auth";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/**
 * Printable door poster: ONE generic QR that any parent can scan with their
 * own phone when they walk in. It opens the check-in screen; the first scan
 * asks for their family's 4-digit code, then their phone is remembered and
 * every visit after is scan → tap → done.
 */
export default async function DoorSignPage() {
  // Defense in depth: the layout renders the sign-in screen without a staff
  // session, but pages must not fetch data for unauthenticated requests either.
  if (!(await getStaffSession())) return null;

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const kioskUrl = `${proto}://${host}/portal/kiosk`;

  const qr = await QRCode.toDataURL(kioskUrl, {
    margin: 1,
    width: 480,
    color: { dark: "#3D4636", light: "#FFFFFF" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Link href="/portal/admin/families" className="text-xs text-charcoal-light underline">
          ← Back to families
        </Link>
        <p className="text-xs text-charcoal-light">
          Print this page and hang it by the door. One poster works for every family.
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-3xl border border-wood/25 bg-white p-8 text-center print:border-0">
        <div className="mb-3 flex items-center justify-center gap-2 text-pine">
          <Leaf size={22} strokeWidth={1.5} />
          <span className="font-serif text-xl tracking-tight">{site.shortName}</span>
        </div>
        <h1 className="font-serif text-3xl text-pine">Sign In &amp; Out Here</h1>
        <p className="mt-1 text-sm text-charcoal-light">Scan with your phone camera</p>

        {/* eslint-disable-next-line @next/next/no-img-element -- data URL */}
        <img src={qr} alt="Check-in QR code" className="mx-auto my-6 w-full max-w-[280px]" />

        <ol className="mx-auto max-w-xs space-y-2 text-left text-sm text-charcoal">
          <li className="flex gap-2">
            <span className="font-serif text-pine">1.</span> Point your camera at the code and tap
            the link.
          </li>
          <li className="flex gap-2">
            <span className="font-serif text-pine">2.</span> First time? Enter your family&apos;s
            4-digit code — your phone remembers it after that.
          </li>
          <li className="flex gap-2">
            <span className="font-serif text-pine">3.</span> Tap <strong>Sign in</strong> or{" "}
            <strong>Sign out</strong>. That&apos;s it!
          </li>
        </ol>

        <p className="mt-6 text-xs text-charcoal-light">
          No phone handy? Use the tablet by the door, or your printed family badge.
        </p>
      </div>
    </div>
  );
}
