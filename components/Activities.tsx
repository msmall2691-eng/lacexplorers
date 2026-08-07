import Image from "next/image";
import { activitiesIntro, activityGroups } from "@/data/activities";
import { ActivityCard } from "./ActivityCard";
import { Container } from "./Container";
import { NatureDivider } from "./NatureDivider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Activities() {
  return (
    <section id="activities" className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={activitiesIntro.eyebrow} title={activitiesIntro.headline}>
          {activitiesIntro.body}
        </SectionHeading>

        {/* PHOTO: garden & natural play space. Swap /images/garden.jpg to change. */}
        <Reveal className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl shadow-soft ring-1 ring-beige/60 sm:aspect-[21/9]">
          <Image
            src="/images/garden.jpg"
            alt="Gardens, rocks, and natural play spaces at Arrowhead Explorers"
            fill
            sizes="(max-width: 1024px) 100vw, 72rem"
            className="object-cover"
          />
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {activityGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 70} className="h-full">
              <ActivityCard group={group} />
            </Reveal>
          ))}
        </div>

        <NatureDivider className="mt-14" />
        <p className="mx-auto max-w-xl text-center font-serif text-xl italic text-sage-dark">
          &ldquo;Some of the best learning happens through play.&rdquo;
        </p>
      </Container>
    </section>
  );
}
