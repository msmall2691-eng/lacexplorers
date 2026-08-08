import Image from "next/image";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Photo montage of the real space + everyday play. Swap any /images/*.jpg. */
const photos = [
  { src: "/images/playset.jpg", alt: "The natural-wood backyard play set in the pines", caption: "Our backyard play space" },
  { src: "/images/playground.jpg", alt: "Children playing at the neighborhood playground", caption: "The neighborhood playground" },
  { src: "/images/log-climb.jpg", alt: "Two children climbing a fallen log in the snowy woods", caption: "Climbing in the woods" },
  { src: "/images/sensory-play.jpg", alt: "Children digging for dinosaurs in a sand sensory bin", caption: "Sensory play" },
  { src: "/images/climbing-wall.jpg", alt: "A child climbing the backyard rock wall", caption: "Up the climbing wall" },
  { src: "/images/home-front.jpg", alt: "The Arrowhead Explorers home in North Waterboro, Maine", caption: "Home in the pines" },
];

export function Adventures() {
  return (
    <section id="adventures" className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Everyday adventures" title="Little hands, big adventures.">
          Most of our day is spent outside — in the yard, on the trails, and at a
          neighborhood playground a short walk away.
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 70}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-soft ring-1 ring-beige/50"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 45vw, 22rem"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-2.5">
                <span className="text-xs font-medium text-cream sm:text-sm">
                  {photo.caption}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Two-playgrounds + water-play highlights */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Reveal className="flex items-start gap-3 rounded-2xl border border-beige/60 bg-linen p-5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sage-dark">
              <Icon name="tree" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-pine">Two places to play</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                Our own natural play space in the backyard — plus a neighborhood
                playground within walking distance.
              </p>
            </div>
          </Reveal>
          <Reveal
            delay={80}
            className="flex items-start gap-3 rounded-2xl border border-beige/60 bg-linen p-5"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sage-dark">
              <Icon name="droplet" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-pine">Water play, all summer</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                When it&rsquo;s warm, we love water play — sprinklers, water
                tables, and splashing outside.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
