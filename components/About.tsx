import Image from "next/image";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const coreValues = [
  "Safety",
  "Kindness",
  "Curiosity",
  "Creativity",
  "Independence",
  "Family Partnership",
  "Outdoor Exploration",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <Reveal className="relative order-1 mx-auto w-full max-w-sm lg:order-none lg:max-w-none">
            {/* PHOTO: the family home in the pines. Swap /images/home-front.jpg to change. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift ring-1 ring-beige/60">
              <Image
                src="/images/home-front.jpg"
                alt="The Arrowhead Explorers home, nestled in the pines of North Waterboro, Maine"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-card ring-1 ring-beige/60">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-cream">
                <Icon name="sprout" className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-charcoal">
                Created with love by a local mom
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              About Us
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
              Childcare That Feels Like Home.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-charcoal-light sm:text-lg">
              Arrowhead Explorers was created from the idea that childcare can
              feel warm, simple, and intentional. Children deserve time to play,
              get messy, ask questions, read stories, explore outdoors, and
              develop confidence in a setting where they are genuinely known.
            </p>

            <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-beige/60 bg-cream/60 p-6 sm:flex-row sm:items-start">
              {/* PHOTO: Meg's portrait. Swap /images/meg.jpg to change. */}
              <div className="relative mx-auto aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-2xl ring-1 ring-beige/60 sm:mx-0 sm:w-40">
                <Image
                  src="/images/meg.jpg"
                  alt="Meg, owner of Arrowhead Explorers, with her son"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-charcoal">
                  Meet Meg
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light sm:text-base">
                  Arrowhead Explorers is being created by Meg — a local mom,
                  business owner, and college student. She knows how much it
                  matters to find childcare that feels safe, comfortable, and
                  personal, and she&rsquo;s passionate about building a warm
                  place where children thrive.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="mt-6 rounded-2xl border-l-4 border-sage bg-sage-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-dark">
                Our Mission
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-charcoal">
                To provide a safe, nurturing, nature-inspired environment where
                children build confidence, independence, kindness, curiosity, and
                a lifelong love of learning through play and exploration.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-charcoal">
                What we value
              </p>
              <ul className="flex flex-wrap gap-2">
                {coreValues.map((value) => (
                  <li
                    key={value}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sage/20 bg-white px-3.5 py-1.5 text-sm font-medium text-sage-dark"
                  >
                    <Icon name="check" className="h-4 w-4 text-sage" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
