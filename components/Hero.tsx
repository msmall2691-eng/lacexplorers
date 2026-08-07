import Image from "next/image";
import { site } from "@/data/site";
import { Container } from "./Container";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-offwhite">
      {/* Soft decorative background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sage-light/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-beige/40 blur-3xl"
      />
      {/* Floating leaves */}
      <Icon
        name="leaf"
        className="pointer-events-none absolute left-[6%] top-[22%] hidden h-8 w-8 animate-leaf-drift text-sage-light/60 sm:block"
      />
      <Icon
        name="leaf"
        className="pointer-events-none absolute right-[10%] top-[12%] hidden h-6 w-6 animate-leaf-drift-slow text-sage/40 sm:block"
      />

      <Container className="relative py-14 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div className="animate-fade-up">
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/25 bg-sage/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-dark">
                🌲 {site.status.heroBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-beige bg-white/70 px-3 py-1 text-xs font-medium text-charcoal-light">
                <Icon name="mapPin" className="h-3.5 w-3.5 text-sage" />
                {site.location.badge}
              </span>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-charcoal sm:text-5xl lg:text-[3.4rem]">
              {site.hero.headline}
            </h1>

            <p className="mt-5 text-lg font-medium text-sage-dark sm:text-xl">
              {site.hero.subheadline}
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-light sm:text-lg">
              {site.hero.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.cta.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-7 py-3.5 text-base font-semibold text-cream shadow-card transition hover:bg-sage-dark hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {site.cta.primary}
                <Icon name="arrowRight" className="h-5 w-5" />
              </a>
              <a
                href={site.cta.exploreHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sage/40 bg-transparent px-7 py-3.5 text-base font-semibold text-sage-dark transition hover:bg-sage-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {site.cta.explore}
              </a>
            </div>

            <p className="mt-6 text-sm italic text-charcoal-light/80">
              {site.status.phaseLine}
            </p>
          </div>

          {/* Right: photo card */}
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-beige/60">
              {/* PHOTO: swap /images/playset.jpg for another photo anytime. */}
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/playset.jpg"
                  alt="The natural-wood play space at Arrowhead Explorers, tucked among the pines"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating chips for depth */}
            <div className="absolute -left-3 bottom-8 hidden items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-card ring-1 ring-beige/60 backdrop-blur sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-50 text-sage-dark">
                <Icon name="sun" className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-charcoal">
                Outdoor play, every day
              </span>
            </div>
            <div className="absolute -right-3 top-8 hidden items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-card ring-1 ring-beige/60 backdrop-blur sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-50 text-sage-dark">
                <Icon name="book" className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-charcoal">
                Learning through play
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
