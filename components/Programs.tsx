import { programs } from "@/data/programs";
import { site } from "@/data/site";
import { Container } from "./Container";
import { ProgramCard } from "./ProgramCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Our Programs" title="Programs for Every Explorer">
          Thoughtful, play-based programs for children {site.ageRange}. Each one
          grows with your child.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {programs.map((program, i) => (
            <Reveal key={program.id} delay={i * 70} className="h-full">
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
