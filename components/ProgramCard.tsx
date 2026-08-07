import type { Program } from "@/data/programs";
import { Icon } from "./Icon";

const badgeFor = (status?: Program["status"]) => {
  if (status === "planned")
    return { label: "Coming Soon", className: "bg-beige text-charcoal" };
  if (status === "future")
    return { label: "Future Program", className: "bg-sage-light/50 text-sage-dark" };
  return null;
};

export function ProgramCard({ program }: { program: Program }) {
  const badge = badgeFor(program.status);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-beige/60 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-50 text-sage-dark">
          <Icon name={program.icon} className="h-6 w-6" />
        </span>
        {badge && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
        {program.name}
      </h3>
      <p className="mt-1 text-sm font-semibold text-sage">{program.age}</p>
      <p className="mt-3 text-sm italic leading-relaxed text-charcoal-light">
        {program.tagline}
      </p>

      <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {program.focus.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-charcoal-light"
          >
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {program.note && (
        <p className="mt-5 rounded-xl bg-cream/70 p-4 text-xs leading-relaxed text-charcoal-light">
          {program.note}
        </p>
      )}
    </div>
  );
}
