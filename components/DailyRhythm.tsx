import { dailyRhythm } from "@/data/policies";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function DailyRhythm() {
  return (
    <section className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={dailyRhythm.eyebrow} title={dailyRhythm.headline}>
          A gentle, predictable flow gives children security — with plenty of room
          to follow their curiosity.
        </SectionHeading>

        <ol className="mx-auto mt-12 max-w-2xl">
          {dailyRhythm.blocks.map((block, i) => (
            <Reveal
              as="li"
              key={block.time}
              delay={i * 40}
              className="grid grid-cols-[5.5rem_1fr] gap-3 sm:grid-cols-[7rem_1fr] sm:gap-4"
            >
              <div className="pt-3 text-right text-sm font-semibold text-sage-dark">
                {block.time}
              </div>
              <div className="relative border-l-2 border-sage-light/50 pb-3 pl-5 sm:pl-6">
                <span className="absolute -left-[7px] top-3.5 h-3 w-3 rounded-full bg-sage ring-4 ring-cream" />
                <div className="rounded-xl border border-beige/50 bg-white p-3.5 text-sm text-charcoal shadow-soft sm:text-base">
                  {block.activity}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm italic text-charcoal-light">
          <Icon name="leaf" className="h-4 w-4 text-sage" />
          {dailyRhythm.note}
        </p>
      </Container>
    </section>
  );
}
