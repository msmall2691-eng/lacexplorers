import { scheduleBasedPricing, tuitionNotes } from "@/data/pricing";
import { hours } from "@/data/site";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const included = [
  "Morning & afternoon snacks",
  "All art & project materials",
  "Daily outdoor time & nature play",
  "Water play in summer",
  "Photo updates for families",
  "Small-group care",
];

export function Tuition() {
  const { currency, rows } = scheduleBasedPricing;

  return (
    <section id="tuition" className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <SectionHeading align="left" eyebrow="Tuition" title="Clear rates, no surprises.">
            Arrowhead Explorers is built around consistent part-time schedules —
            choose the number of days that fit your week. Tuition is billed
            weekly and holds your child&rsquo;s spot.
          </SectionHeading>

          <p className="mt-4 text-sm font-semibold text-sage-dark">
            Proposed hours: {hours.summary}, {hours.timeRange}.
          </p>

          {/* Rate rows */}
          <div className="mt-8 border-t-2 border-pine">
            {rows.map((row) => (
              <div
                key={row.schedule}
                className="flex items-baseline justify-between gap-4 border-b border-beige/60 py-5"
              >
                <span className="font-serif text-lg font-semibold text-pine">
                  {row.schedule}
                </span>
                <span className="whitespace-nowrap font-serif text-2xl font-semibold text-sage">
                  {currency}
                  {row.price}
                  <span className="ml-1 align-baseline text-xs font-semibold uppercase tracking-wide text-wood">
                    approx/wk
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs italic text-charcoal-light/80">
            {tuitionNotes.disclaimer}
          </p>

          <div className="mt-6 rounded-xl bg-linen p-5 text-sm">
            <span className="font-semibold text-pine">
              {tuitionNotes.beforeAfterSchool.label}:
            </span>{" "}
            <span className="text-charcoal-light">
              {tuitionNotes.beforeAfterSchool.price}
            </span>
          </div>

          {/* What's included */}
          <h3 className="mt-10 font-serif text-xl font-semibold text-pine">
            What&rsquo;s included
          </h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span className="text-charcoal-light">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-hand text-xl text-sage-dark">
            Bring a lunch, a spare set of clothes, and boots you don&rsquo;t mind
            losing to the mud.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
