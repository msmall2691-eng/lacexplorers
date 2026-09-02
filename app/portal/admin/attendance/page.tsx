import { getStaffSession } from "@/lib/portal/auth";
import { getStore } from "@/lib/portal/store";
import { adminSaveAttendance } from "@/lib/portal/actions";
import { formatLongDate, todayISO, toTimeInputValue } from "@/lib/portal/dates";

/**
 * Attendance editor — fix a missed sign-out, adjust times, or note who did
 * drop-off/pick-up for any date. One small form per child.
 */
export default async function AdminAttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; saved?: string }>;
}) {
  // Defense in depth: the layout renders the sign-in screen without a staff
  // session, but pages must not fetch data for unauthenticated requests either.
  if (!(await getStaffSession())) return null;
  const store = await getStore();
  const params = await searchParams;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(params.date ?? "") ? params.date! : todayISO();

  const [families, records] = await Promise.all([
    store.listFamilies(),
    store.getAttendanceForDate(date),
  ]);
  const byChild = new Map(records.map((r) => [r.childId, r]));

  const rows: { childId: string; childName: string; familyName: string }[] = [];
  for (const f of families) {
    for (const c of await store.listChildren(f.id)) {
      rows.push({ childId: c.id, childName: c.name, familyName: f.name });
    }
  }

  const inputCls =
    "w-full rounded-xl border border-wood/30 px-3 py-2 text-sm text-charcoal outline-none focus:border-sage";

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-pine">Attendance</h1>
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

      <div className="space-y-3">
        {rows.map((row) => {
          const rec = byChild.get(row.childId);
          return (
            <form key={row.childId} action={adminSaveAttendance} className="rounded-2xl bg-white p-4">
              <input type="hidden" name="date" value={date} />
              <input type="hidden" name="childId" value={row.childId} />
              {rec && <input type="hidden" name="recordId" value={rec.id} />}
              <p className="mb-3 font-medium text-charcoal">
                {row.childName}{" "}
                <span className="text-xs font-normal text-charcoal-light">· {row.familyName} family</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-charcoal-light">Arrived</label>
                  <input type="time" name="timeIn" defaultValue={toTimeInputValue(rec?.timeIn ?? null)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-charcoal-light">Left</label>
                  <input type="time" name="timeOut" defaultValue={toTimeInputValue(rec?.timeOut ?? null)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-charcoal-light">Dropped off by</label>
                  <input name="droppedBy" defaultValue={rec?.droppedBy ?? ""} placeholder="Mom / Dad / …" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-charcoal-light">Picked up by</label>
                  <input name="pickedUpBy" defaultValue={rec?.pickedUpBy ?? ""} placeholder="Mom / Dad / …" className={inputCls} />
                </div>
              </div>
              <button className="mt-3 rounded-full bg-pine px-5 py-2 text-xs font-medium text-cream">
                Save
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
