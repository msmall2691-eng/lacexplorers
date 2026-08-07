import type { ActivityGroup } from "@/data/activities";
import { Icon } from "./Icon";

export function ActivityCard({ group }: { group: ActivityGroup }) {
  return (
    <div className="h-full rounded-2xl border border-beige/60 bg-white p-7 shadow-soft transition duration-300 hover:shadow-lift">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-50 text-sage-dark">
          <Icon name={group.icon} className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-serif text-xl font-semibold text-charcoal">
            {group.title}
          </h3>
          <p className="text-sm text-charcoal-light">{group.blurb}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-beige bg-cream/60 px-3 py-1.5 text-sm text-charcoal-light"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
