import { dailyRhythm } from "@/data/policies";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function DailyRhythm() {
  return (
    <section id="rhythm" className="scroll-mt-24 bg-linen py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-wood">
            {dailyRhythm.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-pine sm:text-4xl">
            {dailyRhythm.headline}
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal-light">
            {dailyRhythm.intro}
          </p>
        </div>

        <ol className="mt-10 max-w-2xl">
          {dailyRhythm.stops.map((stop, i) => (
            <Reveal
              as="li"
              key={stop.phase}
              delay={i * 60}
              className="relative border-l-2 border-dashed border-wood/50 pb-9 pl-8 last:border-transparent last:pb-0 sm:pl-10"
            >
              <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-linen text-sage-dark ring-4 ring-linen">
                <Icon name={stop.icon} className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-wood">
                {stop.phase}
              </span>
              <h3 className="mt-1 font-serif text-xl font-semibold text-pine">
                {stop.title}
              </h3>
              <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-charcoal-light sm:text-base">
                {stop.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl font-hand text-xl text-sage-dark">
          {dailyRhythm.note}
        </p>
      </Container>
    </section>
  );
}
