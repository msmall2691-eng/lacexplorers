import { enrollment, hours, site } from "@/data/site";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function PartTime() {
  const weekdays = hours.schedule.slice(0, 5); // Mon–Fri

  return (
    <section className="bg-gradient-to-br from-sage-dark to-sage py-16 text-cream sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
              Designed for Real Family Schedules
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Not every family needs five days of childcare.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/85 sm:text-lg">
              Arrowhead Explorers is being designed with flexible, consistent
              part-time schedules so families can choose care that fits their
              week — quality childcare without committing to five days every week.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {enrollment.options.map((option) => (
                <span
                  key={option}
                  className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-cream ring-1 ring-white/20"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  {option}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-cream/75">{enrollment.note}</p>
          </Reveal>

          {/* Week schedule card */}
          <Reveal delay={100}>
            <div className="rounded-3xl bg-offwhite p-6 text-charcoal shadow-lift sm:p-8">
              <div className="flex items-center gap-2 text-sage-dark">
                <Icon name="clock" className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Proposed Hours
                </span>
              </div>
              <p className="mt-2 font-serif text-2xl font-semibold text-charcoal">
                {hours.summary}
              </p>
              <p className="text-sage-dark">{hours.timeRange}</p>

              <ul className="mt-6 space-y-2">
                {weekdays.map((day) => (
                  <li
                    key={day.day}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                      day.closed
                        ? "bg-cream/70 text-charcoal-light"
                        : "bg-sage-50 text-charcoal"
                    }`}
                  >
                    <span className="font-medium">{day.day}</span>
                    <span
                      className={day.closed ? "italic" : "font-semibold text-sage-dark"}
                    >
                      {day.closed ? "Closed" : `${day.open} – ${day.close}`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-charcoal-light">
                {site.status.phaseLine} Hours are proposed and subject to change.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
