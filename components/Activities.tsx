import Image from "next/image";
import { activitiesIntro, activityGroups } from "@/data/activities";
import { ActivityCard } from "./ActivityCard";
import { Container } from "./Container";
import { Icon } from "./Icon";
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
        <Reveal className="relative mt-10 h-40 overflow-hidden rounded-3xl shadow-soft ring-1 ring-beige/60 sm:h-52 lg:h-64">
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

        {/* Two-playgrounds + water-play highlights */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Reveal className="flex items-start gap-3 rounded-2xl border border-beige/60 bg-sage-50 p-5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sage-dark">
              <Icon name="tree" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-charcoal">Two places to play</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                Children enjoy our own natural play space right in the backyard —
                plus a neighborhood playground within walking distance.
              </p>
            </div>
          </Reveal>
          <Reveal
            delay={80}
            className="flex items-start gap-3 rounded-2xl border border-beige/60 bg-sage-50 p-5"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sage-dark">
              <Icon name="droplet" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-charcoal">Water play, all summer</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                When the weather&rsquo;s warm, we love water play — sprinklers,
                water tables, and splashing outside.
              </p>
            </div>
          </Reveal>
        </div>

        <NatureDivider className="mt-14" />
        <p className="mx-auto max-w-xl text-center font-serif text-xl italic text-sage-dark">
          &ldquo;Some of the best learning happens through play.&rdquo;
        </p>
      </Container>
    </section>
  );
}
