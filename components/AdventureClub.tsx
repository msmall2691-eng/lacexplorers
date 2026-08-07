import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const highlights = [
  "Before-school care",
  "After-school care",
  "Afternoon snack",
  "Outdoor play",
  "Homework & quiet time",
  "Creative activities",
];

export function AdventureClub() {
  return (
    <section className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Emblem card */}
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sage-light/40 via-cream to-beige/50 p-8 text-center shadow-soft ring-1 ring-beige/60">
              <Icon name="leaf" className="absolute -right-3 -top-3 h-20 w-20 rotate-12 text-sage/15" />
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-sage text-cream shadow-card">
                <Icon name="bus" className="h-10 w-10" />
              </span>
              <p className="mt-5 font-serif text-2xl font-semibold text-charcoal">
                Adventure Club
              </p>
              <p className="text-sm font-semibold text-sage">School Age</p>
              <span className="mt-4 rounded-full bg-beige px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
                Coming Soon
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={80}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Before &amp; After School
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
              Big Kids Are Explorers Too.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-light sm:text-lg">
              Arrowhead Explorers is also planning convenient before and
              after-school care for local school-age children — a safe, familiar
              place for snacks, outdoor play, homework, creativity, and downtime
              before and after the school day.
            </p>

            <ul className="mt-6 grid gap-x-4 gap-y-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-charcoal-light"
                >
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-sage-50 p-4 text-sm leading-relaxed text-sage-dark">
              <Icon name="bus" className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                Before &amp; after-school care options are planned, with
                neighborhood bus access being explored. The Lake Arrowhead
                neighborhood bus stop is nearby, with many local children close by.
              </span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
