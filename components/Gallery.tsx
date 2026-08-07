import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Gallery — a peek at the real space. Swap any /images/*.jpg below, or add more
 * items to the array (they flow into the responsive grid automatically).
 */
const photos = [
  {
    src: "/images/home-pines.jpg",
    alt: "The Arrowhead Explorers home tucked among tall pines",
    caption: "Home among the pines",
  },
  {
    src: "/images/backyard.jpg",
    alt: "The natural-wood backyard play set with slides and swings",
    caption: "Room to play & explore",
  },
  {
    src: "/images/slide-play.jpg",
    alt: "A young child playing on the backyard slide",
    caption: "Everyday adventures",
  },
];

export function Gallery() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Our Space" title="A Peek at Our Corner of the Woods">
          Tucked into the Lake Arrowhead pines — a warm, home-like setting with
          plenty of room to play, explore, and feel at home.
        </SectionHeading>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 90}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft ring-1 ring-beige/50"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 30vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/60 to-transparent p-4">
                <span className="text-sm font-medium text-cream">
                  {photo.caption}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
