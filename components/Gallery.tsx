import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Gallery — a peek at everyday moments. Swap any /images/*.jpg below, or add more
 * items to the array (they flow into the responsive grid automatically).
 */
const photos = [
  {
    src: "/images/slide-play.jpg",
    alt: "A young child playing on the backyard slide",
    caption: "Everyday play",
  },
  {
    src: "/images/nature-play.jpg",
    alt: "A child exploring ferns and rocks in the woods",
    caption: "In the woods",
  },
  {
    src: "/images/water-play.jpg",
    alt: "A child playing with water outside on a summer day",
    caption: "Water play",
  },
];

export function Gallery() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Our Space" title="A Peek at Everyday Adventures">
          Tucked into the Lake Arrowhead pines — a warm, home-like setting with
          plenty of room to play, explore, and feel at home.
        </SectionHeading>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 90}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft ring-1 ring-beige/50"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 30vw, 15rem"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-2.5 sm:p-3">
                <span className="text-xs font-medium text-cream sm:text-sm">
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
