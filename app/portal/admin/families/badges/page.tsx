import QRCode from "qrcode";
import Link from "next/link";
import { headers } from "next/headers";
import { Leaf } from "lucide-react";
import { getStaffSession } from "@/lib/portal/auth";
import { getStore } from "@/lib/portal/store";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/**
 * Printable badge sheet. Each family's QR encodes a kiosk deep link with
 * their private badge code — scanning it (with any phone camera, or the
 * kiosk tablet) opens the check-in screen with that family ready to go.
 * Print, cut out, and hand one to each family for a keychain or wallet.
 */
export default async function BadgesPage() {
  // Defense in depth: the layout renders the sign-in screen without a staff
  // session, but pages must not fetch data for unauthenticated requests either.
  if (!(await getStaffSession())) return null;
  const store = await getStore();
  const families = await store.listFamilies();

  // Build absolute kiosk URLs from the live host, so badges work in every
  // environment (main domain, portal subdomain, or preview deploys).
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;

  const badges = await Promise.all(
    families.map(async (f) => ({
      family: f,
      qr: await QRCode.toDataURL(`${base}/portal/kiosk?badge=${encodeURIComponent(f.badgeCode)}`, {
        margin: 1,
        width: 240,
        color: { dark: "#3D4636", light: "#FFFFFF" },
      }),
    }))
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Link href="/portal/admin/families" className="text-xs text-charcoal-light underline">
          ← Back to families
        </Link>
        <p className="text-xs text-charcoal-light">
          Use your browser&apos;s Print button, then cut out the cards.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {badges.map(({ family, qr }) => (
          <div
            key={family.id}
            className="break-inside-avoid rounded-2xl border border-wood/25 bg-white p-4 text-center"
          >
            <div className="mb-2 flex items-center justify-center gap-1.5 text-pine">
              <Leaf size={14} strokeWidth={1.5} />
              <span className="font-serif text-sm">{site.shortName}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL */}
            <img src={qr} alt={`Check-in badge for the ${family.name} family`} className="mx-auto w-full max-w-[160px]" />
            <p className="mt-2 font-serif text-lg text-charcoal">{family.name} family</p>
            <p className="text-[10px] text-charcoal-light">Scan at the door to sign in &amp; out</p>
          </div>
        ))}
      </div>
    </div>
  );
}
