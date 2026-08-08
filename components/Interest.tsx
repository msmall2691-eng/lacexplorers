import { site } from "@/data/site";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { InterestForm } from "./InterestForm";
import { Reveal } from "./Reveal";

const reassurance = [
  "No obligation — this simply adds you to our list",
  "Be among the first to know when we open",
  "We'll share tuition, availability, and next steps",
];

export function Interest() {
  return (
    <section
      id="interest"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-sage-50 to-cream py-16 sm:py-24"
    >
      <Icon
        name="leaf"
        className="pointer-events-none absolute right-[8%] top-16 hidden h-10 w-10 animate-leaf-drift-slow text-sage/20 lg:block"
      />
      <Icon
        name="leaf"
        className="pointer-events-none absolute left-[6%] bottom-24 hidden h-8 w-8 animate-leaf-drift text-sage/20 lg:block"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: invitation + contact */}
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-wood">
              {site.cta.primary}
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-pine sm:text-4xl">
              Save your family&rsquo;s spot on our interest list.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-light sm:text-lg">
              Arrowhead Explorers is currently building its interest list for
              Lake Arrowhead and North Waterboro families. Share a little about
              your family and we&rsquo;ll reach out as enrollment details become
              available.
            </p>

            <ul className="mt-7 space-y-3">
              {reassurance.map((point) => (
                <li key={point} className="flex items-start gap-3 text-charcoal">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-cream">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm sm:text-base">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-beige/60 bg-white/70 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold text-charcoal">Prefer to reach out directly?</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2 text-sage-dark transition hover:text-sage"
                  >
                    <Icon name="mail" className="h-4 w-4" />
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sage-dark transition hover:text-sage"
                  >
                    <Icon name="facebook" className="h-4 w-4" />
                    Follow us on Facebook
                  </a>
                </li>
                <li className="flex items-start gap-2 text-charcoal-light">
                  <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>
                    {site.location.community}{" "}
                    <span className="italic">{site.location.exactAddressNote}</span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Right: the form */}
          <Reveal delay={100}>
            <InterestForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
