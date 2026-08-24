import { programs } from "@/data/programs";
import { Container } from "./Container";
import { ProgramCard } from "./ProgramCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Ages &amp; care" title="One small group, mixed by age.">
          Eighteen months through school age, together — plus before- and
          after-school care for the big kids.
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
