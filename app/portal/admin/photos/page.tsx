import { Leaf } from "lucide-react";
import { getStaffSession } from "@/lib/portal/auth";
import { getStore, isDemoMode } from "@/lib/portal/store";
import { adminDeletePhoto, adminUploadPhoto } from "@/lib/portal/actions";
import { formatShortDate } from "@/lib/portal/dates";

/**
 * Photo journal manager: upload a photo (everyone, or just one family)
 * and remove old ones. Files live in a private storage bucket; parents
 * see them through short-lived signed links.
 */
export default async function AdminPhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  // Defense in depth: the layout renders the sign-in screen without a staff
  // session, but pages must not fetch data for unauthenticated requests either.
  if (!(await getStaffSession())) return null;
  const store = await getStore();
  const params = await searchParams;
  const families = await store.listFamilies();
  let photos = await store.listAllPhotos();
  if (!isDemoMode()) {
    const { withSignedUrls } = await import("@/lib/portal/supabase-store");
    photos = await withSignedUrls(photos);
  }
  const familyName = new Map(families.map((f) => [f.id, f.name]));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-pine">Photo journal</h1>
        <p className="text-sm text-charcoal-light">
          Photos marked &ldquo;All families&rdquo; appear for everyone; or share one with a single family.
        </p>
      </div>

      {params.saved && (
        <p className="rounded-xl bg-sage-50 px-4 py-2 text-sm text-sage-dark">Photo added ✓</p>
      )}

      <form action={adminUploadPhoto} className="space-y-3 rounded-2xl bg-white p-4">
        {isDemoMode() ? (
          <p className="rounded-xl bg-goldenrod/15 px-3 py-2 text-xs text-charcoal">
            Demo mode: uploads are saved as placeholders. Connect the database to store real photos.
          </p>
        ) : (
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="w-full text-sm text-charcoal file:mr-3 file:rounded-full file:border-0 file:bg-linen file:px-4 file:py-2 file:text-xs file:font-medium file:text-charcoal"
          />
        )}
        <input
          name="caption"
          placeholder="Caption — e.g. Practicing letters in the sandbox"
          className="w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
        />
        <select
          name="familyId"
          className="w-full rounded-xl border border-wood/30 bg-white px-3 py-2 text-sm text-charcoal"
        >
          <option value="">All families</option>
          {families.map((f) => (
            <option key={f.id} value={f.id}>
              Only the {f.name} family
            </option>
          ))}
        </select>
        <button className="w-full rounded-full bg-pine py-2.5 text-sm font-medium text-cream">
          Add photo
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((p) => (
          <div key={p.id} className="rounded-xl bg-white p-2">
            {p.url ? (
              // eslint-disable-next-line @next/next/no-img-element -- signed URLs are short-lived
              <img src={p.url} alt={p.caption} className="aspect-square w-full rounded-lg object-cover" />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-water to-cream">
                <Leaf size={24} strokeWidth={1} className="text-pine/40" />
              </div>
            )}
            <p className="mt-2 line-clamp-2 text-xs text-charcoal">{p.caption || "—"}</p>
            <p className="text-[11px] text-charcoal-light">
              {formatShortDate(p.date)} ·{" "}
              {p.familyId ? `${familyName.get(p.familyId) ?? "One"} family` : "All families"}
            </p>
            <form action={adminDeletePhoto} className="mt-1">
              <input type="hidden" name="id" value={p.id} />
              <button className="text-[11px] text-berry underline underline-offset-2">Remove</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
