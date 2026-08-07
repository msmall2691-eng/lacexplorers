import {
  ageBasedPricing,
  pricingMode,
  scheduleBasedPricing,
  tuitionNotes,
} from "@/data/pricing";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { PricingCard } from "./PricingCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ScheduleBased() {
  const { currency, rows } = scheduleBasedPricing;
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {rows.map((row, i) => (
        <Reveal key={row.schedule} delay={i * 70} className="h-full">
          <PricingCard
            schedule={row.schedule}
            price={row.price}
            currency={currency}
            featured={i === 1}
          />
        </Reveal>
      ))}
    </div>
  );
}

function AgeBased() {
  const { currency, groups } = ageBasedPricing;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {groups.map((group, gi) => (
        <Reveal key={group.label} delay={gi * 90}>
          <div className="h-full rounded-2xl border border-beige/60 bg-white p-7 shadow-soft">
            <h3 className="font-serif text-2xl font-semibold text-charcoal">
              {group.label}
            </h3>
            <p className="text-sm font-semibold text-sage">{group.sublabel}</p>
            <ul className="mt-5 divide-y divide-beige/60">
              {group.rows.map((row) => (
                <li
                  key={row.schedule}
                  className="flex items-center justify-between py-3"
                >
                  <span className="text-sm text-charcoal-light">
                    {row.schedule}
                  </span>
                  <span className="font-serif text-xl font-semibold text-charcoal">
                    {currency}
                    {row.price}
                    <span className="ml-1 text-xs font-normal text-charcoal-light">
                      approx./wk
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Tuition() {
  return (
    <section id="tuition" className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Tuition" title="Simple, Flexible Tuition">
          Proposed starting rates for our consistent part-time schedules. You
          choose the number of days that fit your family&rsquo;s week.
        </SectionHeading>

        <div className="mt-12">
          {pricingMode === "age-based" ? <AgeBased /> : <ScheduleBased />}
        </div>

        {/* Secondary pricing notes */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-beige/60 bg-cream/50 p-5">
            <p className="text-sm font-semibold text-charcoal">
              {tuitionNotes.beforeAfterSchool.label}
            </p>
            <p className="mt-1 text-sm text-sage-dark">
              {tuitionNotes.beforeAfterSchool.price}
            </p>
          </div>
          <div className="rounded-2xl border border-beige/60 bg-cream/50 p-5">
            <p className="text-sm font-semibold text-charcoal">
              {tuitionNotes.dropIn.label}
            </p>
            <p className="mt-1 text-sm text-charcoal-light">
              {tuitionNotes.dropIn.price}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-2 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-charcoal-light">
            <Icon name="check" className="h-4 w-4 text-sage" />
            {tuitionNotes.reserves}
          </p>
          <p className="text-xs italic text-charcoal-light/80">
            {tuitionNotes.disclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
}
