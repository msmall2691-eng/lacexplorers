import {
  weeklyTuition,
  schoolAgeCare,
  tuitionTerms,
  tuitionIncluded,
  tuitionDisclaimer,
} from "@/data/pricing";
import { hours } from "@/data/site";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Tuition() {
  const { currency, columns, rows, ratioNote } = weeklyTuition;

  return (
    <section id="tuition" className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <SectionHeading
            align="left"
            eyebrow="Tuition & enrollment"
            title="Simple, predictable, and worth it."
          >
            Choose the number of days that fit your week. Tuition is billed weekly
            and holds your child&rsquo;s spot — Monday through Thursday,{" "}
            {hours.timeRange}.
          </SectionHeading>

          {/* Weekly tuition — two age tiers */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-pine">
                  <th className="py-3 pr-3 text-xs font-bold uppercase tracking-[0.14em] text-wood">
                    Weekly
                  </th>
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="py-3 pl-3 text-right text-xs font-bold uppercase tracking-[0.12em] text-wood"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.schedule} className="border-b border-beige/60">
                    <td className="py-4 pr-3">
                      <span className="font-serif text-lg font-semibold text-pine">
                        {row.schedule}
                      </span>
                      <span className="block text-xs text-charcoal-light">
                        {row.detail}
                      </span>
                    </td>
                    {row.prices.map((price, i) => (
                      <td key={i} className="py-4 pl-3 text-right align-middle">
                        <span className="whitespace-nowrap font-serif text-xl font-semibold text-sage sm:text-2xl">
                          {currency}
                          {price}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs italic leading-relaxed text-charcoal-light/80">
            {ratioNote}
          </p>

          {/* School-age care */}
          <h3 className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-wood">
            {schoolAgeCare.eyebrow}
          </h3>
          <div className="mt-3 border-t border-beige/70">
            {schoolAgeCare.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-beige/60 py-3"
              >
                <span className="text-sm text-charcoal sm:text-base">{row.label}</span>
                <span className="whitespace-nowrap font-serif text-lg font-semibold text-sage">
                  {schoolAgeCare.currency}
                  {row.price}
                  <span className="ml-1 text-xs font-semibold uppercase tracking-wide text-wood">
                    {schoolAgeCare.unit}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Terms & fees */}
          <ul className="mt-6 space-y-2">
            {tuitionTerms.map((term) => (
              <li key={term} className="flex items-start gap-2 text-sm text-charcoal-light">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span>{term}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs italic text-charcoal-light/80">
            {tuitionDisclaimer}
          </p>

          {/* What's included */}
          <h3 className="mt-10 font-serif text-xl font-semibold text-pine">
            What&rsquo;s included
          </h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {tuitionIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span className="text-charcoal-light">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-hand text-xl text-sage-dark">
            Pack a lunch, a water bottle, a spare set of clothes, and boots you
            don&rsquo;t mind losing to the mud.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
