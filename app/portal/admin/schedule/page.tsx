import { getStore } from "@/lib/portal/store";
import { adminSaveSchedule } from "@/lib/portal/actions";
import { WEEKDAY_NAMES } from "@/lib/portal/dates";

/**
 * Weekly schedule editor. One theme + detail per weekday; parents see this
 * on the Schedule tab with today highlighted.
 */
export default async function AdminSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const store = await getStore();
  const params = await searchParams;
  const schedule = await store.getSchedule();
  const byDay = new Map(schedule.map((s) => [s.weekday, s]));

  const inputCls =
    "w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-pine">This week&apos;s schedule</h1>
        <p className="text-sm text-charcoal-light">
          What families see on their Schedule tab. Update it whenever the plan changes.
        </p>
      </div>

      {params.saved && (
        <p className="rounded-xl bg-sage-50 px-4 py-2 text-sm text-sage-dark">Saved ✓</p>
      )}

      <form action={adminSaveSchedule} className="space-y-3">
        {[1, 2, 3, 4, 5].map((wd) => (
          <div key={wd} className="rounded-2xl bg-white p-4">
            <p className="mb-2 text-sm font-medium text-charcoal">{WEEKDAY_NAMES[wd]}</p>
            <div className="space-y-2">
              <input
                name={`theme${wd}`}
                defaultValue={byDay.get(wd)?.theme ?? ""}
                placeholder="Theme — e.g. Letter Hunt"
                className={inputCls}
              />
              <input
                name={`detail${wd}`}
                defaultValue={byDay.get(wd)?.detail ?? ""}
                placeholder="Details — e.g. Lake walk looking for letter shapes"
                className={inputCls}
              />
            </div>
          </div>
        ))}
        <button className="w-full rounded-full bg-pine py-3 text-sm font-medium text-cream">
          Save schedule
        </button>
      </form>
    </div>
  );
}
