import type { Metadata } from "next";
import { isDemoMode } from "@/lib/portal/store";

/**
 * Parent portal shell. The portal is private — kept out of search engines —
 * and shares the site's fonts/brand from the root layout.
 */

export const metadata: Metadata = {
  title: "Family Portal",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      {isDemoMode() && (
        <div className="bg-goldenrod/20 px-4 py-1.5 text-center text-xs font-medium text-charcoal">
          Demo mode — sample data only. Connect the database to go live (see README).
        </div>
      )}
      {children}
    </div>
  );
}
