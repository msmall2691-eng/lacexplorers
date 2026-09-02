import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { getStaffSession } from "@/lib/portal/auth";
import { staffLogin, staffLogout } from "@/lib/portal/actions";
import CodeEntry from "@/components/portal/CodeEntry";
import AdminNav from "@/components/portal/AdminNav";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/**
 * Staff area gate + chrome. Every page under /portal/admin renders inside
 * this layout, so a missing staff session always shows the sign-in screen.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const signedIn = await getStaffSession();

  if (!signedIn) {
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
          <h1 className="mb-1 text-center font-serif text-2xl text-pine">Staff sign-in</h1>
          <p className="mb-8 text-center text-sm text-charcoal-light">
            The admin area is for daycare staff only.
          </p>
          <CodeEntry action={staffLogin} label="Staff code" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-pine px-5 pb-4 pt-5 text-cream print:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf size={18} strokeWidth={1.5} className="text-water" />
            <span className="font-serif text-lg">Staff Dashboard</span>
          </div>
          <form action={staffLogout}>
            <button className="text-xs text-water underline underline-offset-2">Sign out</button>
          </form>
        </div>
      </header>
      <AdminNav />
      <main className="mx-auto max-w-2xl p-5 pb-16 print:max-w-none print:p-0">{children}</main>
    </div>
  );
}
