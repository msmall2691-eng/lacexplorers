import { Accordion, type AccordionItem } from "./Accordion";
import { closures, parentInfoIntro, policyCards } from "@/data/policies";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const policyItems: AccordionItem[] = policyCards.map((card, i) => ({
  id: `policy-${i}`,
  title: card.title,
  content: (
    <div className="space-y-3">
      {card.intro && <p className="text-sm leading-relaxed">{card.intro}</p>}
      {card.bullets && (
        <ul className="space-y-1.5">
          {card.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {card.footnote && (
        <p className="text-xs italic text-charcoal-light/80">{card.footnote}</p>
      )}
    </div>
  ),
}));

export function ParentInfo() {
  return (
    <section id="parent-info" className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={parentInfoIntro.eyebrow} title={parentInfoIntro.headline}>
          {parentInfoIntro.body}
        </SectionHeading>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Policies accordion */}
          <Reveal>
            <Accordion items={policyItems} />
          </Reveal>

          {/* Holidays & closures */}
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-beige/60 bg-cream/60 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                {closures.eyebrow}
              </p>
              <p className="mt-2 text-sm text-charcoal-light">{closures.intro}</p>

              <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                {closures.holidays.map((holiday) => (
                  <li
                    key={holiday}
                    className="flex items-start gap-2 text-sm text-charcoal"
                  >
                    <Icon name="leaf" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                    <span>{holiday}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-beige/60 pt-5 text-sm text-charcoal-light">
                <p className="flex items-start gap-2">
                  <Icon name="sun" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>{closures.providerVacation}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon name="book" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>{closures.professionalDevelopment}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>{closures.advanceNotice}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>{closures.weather}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
