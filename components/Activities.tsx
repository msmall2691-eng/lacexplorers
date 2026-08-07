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

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
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
