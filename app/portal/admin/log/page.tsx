import { getStore } from "@/lib/portal/store";
import { adminSaveDailyLog } from "@/lib/portal/actions";
import { formatLongDate, todayISO } from "@/lib/portal/dates";
import type { Child, Family } from "@/lib/portal/types";

/**
 * Daily log editor. Pick a date and a child to prefill from; check off which
 * children the entry applies to (group days are common, so one write-up can
 * go to everyone at once) and save.
 */
export default async function AdminLogPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; child?: string; saved?: string }>;
}) {
  const store = await getStore();
  const params = await searchParams;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(params.date ?? "") ? params.date! : todayISO();

  const families = await store.listFamilies();
  const children: (Child & { familyName: string })[] = [];
  for (const f of families) {
    for (const c of await store.listChildren(f.id)) children.push({ ...c, familyName: f.name });
  }

  const prefillChild = children.find((c) => c.id === params.child) ?? children[0] ?? null;
  const log = prefillChild ? await store.getDailyLog(prefillChild.id, date) : null;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-pine">Daily log</h1>
          <p className="text-sm text-charcoal-light">{formatLongDate(date)}</p>
        </div>
        <form method="get" className="flex items-center gap-2">
          <input
            type="date"
            name="date"
            defaultValue={date}
            className="rounded-lg border border-wood/30 bg-white px-2 py-1.5 text-sm text-charcoal"
          />
          <button className="rounded-full bg-linen px-3 py-1.5 text-xs font-medium text-charcoal">Go</button>
        </form>
      </div>

      {params.saved && (
        <p className="rounded-xl bg-sage-50 px-4 py-2 text-sm text-sage-dark">Saved ✓</p>
      )}

      {children.length > 0 && (
        <div className="rounded-2xl bg-white p-4">
          <p className="mb-2 text-xs font-medium text-charcoal-light">
            Prefill the form from an existing entry:
          </p>
          <div className="flex flex-wrap gap-2">
            {children.map((c) => (
              <a
                key={c.id}
                href={`/portal/admin/log?date=${date}&child=${c.id}`}
                className={`rounded-full border px-3 py-1 text-sm ${
                  c.id === prefillChild?.id
                    ? "border-pine bg-pine text-cream"
                    : "border-wood/30 text-charcoal"
                }`}
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <form action={adminSaveDailyLog} className="space-y-4">
        <input type="hidden" name="date" value={date} />

        <div className="rounded-2xl bg-white p-4">
          <p className="mb-2 text-sm font-medium text-charcoal">Apply this entry to:</p>
          <div className="flex flex-wrap gap-3">
            {children.map((c) => (
              <label key={c.id} className="flex items-center gap-1.5 text-sm text-charcoal">
                <input
                  type="checkbox"
                  name="childId"
                  value={c.id}
                  defaultChecked={c.id === prefillChild?.id}
                  className="h-4 w-4 accent-[#3D4636]"
                />
                {c.name}
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-charcoal-light">
            Check several children to save the same write-up for each of them.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <label className="mb-1 block text-sm font-medium text-charcoal">How the day went</label>
          <textarea
            name="note"
            rows={5}
            defaultValue={log?.note ?? ""}
            placeholder="The story of the day — what you did, what made them laugh, what they're proud of…"
            className="w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <label className="mb-1 block text-sm font-medium text-charcoal">Today&apos;s focus</label>
            <input
              name="focus"
              defaultValue={log?.focus ?? ""}
              placeholder="e.g. Letter recognition"
              className="w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
            />
          </div>
          <div className="rounded-2xl bg-white p-4">
            <label className="mb-1 block text-sm font-medium text-charcoal">Mood</label>
            <input
              name="mood"
              defaultValue={log?.mood ?? ""}
              placeholder="e.g. Cheerful, full of questions"
              className="w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <label className="mb-1 block text-sm font-medium text-charcoal">Nap</label>
          <input
            name="nap"
            defaultValue={log?.nap ?? ""}
            placeholder="e.g. 12:45 – 2:15 PM, slept the whole time"
            className="w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
          />
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="mb-2 text-sm font-medium text-charcoal">Meals &amp; snacks</p>
          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2">
                <input
                  name={`mealTime${i}`}
                  defaultValue={log?.meals[i]?.time ?? ""}
                  placeholder="9:00 AM"
                  className="w-28 rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
                />
                <input
                  name={`mealItem${i}`}
                  defaultValue={log?.meals[i]?.item ?? ""}
                  placeholder="Snack: apple slices & crackers"
                  className="flex-1 rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="w-full rounded-full bg-pine py-3 text-sm font-medium text-cream transition-transform active:scale-[0.99]">
          Save daily log
        </button>
      </form>
    </div>
  );
}
