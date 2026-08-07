import { features } from "@/data/features";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Features() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Why Arrowhead" title="Why Families Choose Arrowhead">
          A warm, intentional approach to childcare — built around curiosity,
          nature, and the way young children actually grow.
        </SectionHeading>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={i * 70}
              className="group rounded-2xl border border-beige/50 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-50 text-sage-dark transition group-hover:bg-sage group-hover:text-cream">
                <Icon name={feature.icon} className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
