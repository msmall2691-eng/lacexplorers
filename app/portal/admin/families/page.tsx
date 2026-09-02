import Link from "next/link";
import { getStaffSession } from "@/lib/portal/auth";
import { getStore } from "@/lib/portal/store";
import {
  adminAddChild,
  adminCreateFamily,
  adminDeleteFamily,
  adminRemoveChild,
  adminUpdateFamily,
} from "@/lib/portal/actions";

/**
 * Family management: each family has a name, a 4-digit portal code, children,
 * and a printable QR badge for the door kiosk.
 */
export default async function AdminFamiliesPage() {
  // Defense in depth: the layout renders the sign-in screen without a staff
  // session, but pages must not fetch data for unauthenticated requests either.
  if (!(await getStaffSession())) return null;
  const store = await getStore();
  const families = await store.listFamilies();
  const childrenByFamily = new Map(
    await Promise.all(
      families.map(async (f) => [f.id, await store.listChildren(f.id)] as const)
    )
  );

  const inputCls =
    "rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage";

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-pine">Families</h1>
          <p className="text-sm text-charcoal-light">
            Each family gets a 4-digit portal code and a printable check-in badge.
          </p>
        </div>
        <Link
          href="/portal/admin/families/badges"
          className="whitespace-nowrap rounded-full bg-linen px-4 py-2 text-xs font-medium text-charcoal"
        >
          Print badges
        </Link>
      </div>

      <form action={adminCreateFamily} className="space-y-3 rounded-2xl bg-white p-4">
        <p className="text-sm font-medium text-charcoal">Add a family</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <input name="name" required placeholder="Family name (e.g. Talbot)" className={inputCls} />
          <input
            name="pin"
            required
            pattern="\d{4}"
            inputMode="numeric"
            maxLength={4}
            placeholder="4-digit code"
            className={inputCls}
          />
          <input name="childName" placeholder="First child's name (optional)" className={inputCls} />
        </div>
        <button className="rounded-full bg-pine px-5 py-2 text-xs font-medium text-cream">
          Add family
        </button>
      </form>

      <div className="space-y-4">
        {families.map((f) => {
          const children = childrenByFamily.get(f.id) ?? [];
          return (
            <div key={f.id} className="rounded-2xl bg-white p-4">
              <form action={adminUpdateFamily} className="flex flex-wrap items-end gap-2">
                <input type="hidden" name="id" value={f.id} />
                <div>
                  <label className="mb-1 block text-xs text-charcoal-light">Family name</label>
                  <input name="name" defaultValue={f.name} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-charcoal-light">Portal code</label>
                  <input
                    name="pin"
                    defaultValue={f.pin}
                    pattern="\d{4}"
                    maxLength={4}
                    inputMode="numeric"
                    className={`${inputCls} w-24 tracking-widest`}
                  />
                </div>
                <button className="rounded-full bg-linen px-4 py-2 text-xs font-medium text-charcoal">
                  Save
                </button>
              </form>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {children.map((c) => (
                  <span
                    key={c.id}
                    className="flex items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1 text-sm text-charcoal"
                  >
                    {c.name}
                    <form action={adminRemoveChild}>
                      <input type="hidden" name="id" value={c.id} />
                      <button aria-label={`Remove ${c.name}`} className="text-charcoal-light hover:text-berry">
                        ×
                      </button>
                    </form>
                  </span>
                ))}
                <form action={adminAddChild} className="flex items-center gap-1.5">
                  <input type="hidden" name="familyId" value={f.id} />
                  <input name="name" placeholder="Add child…" className={`${inputCls} w-32 py-1 text-xs`} />
                  <button className="rounded-full bg-linen px-3 py-1.5 text-xs text-charcoal">Add</button>
                </form>
              </div>

              <form
                action={adminDeleteFamily}
                className="mt-3 border-t border-wood/10 pt-2 text-right"
              >
                <input type="hidden" name="id" value={f.id} />
                <button className="text-[11px] text-berry underline underline-offset-2">
                  Remove family (deletes their logs &amp; attendance)
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
