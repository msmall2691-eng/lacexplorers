import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Photo — tucked in a simple frame */}
          <Reveal className="mx-auto w-full max-w-[17rem] sm:max-w-xs">
            <div className="rotate-[-2deg] rounded-sm bg-white p-3 pb-10 shadow-lift ring-1 ring-beige/40">
              {/* PHOTO: Meg & her son. Swap /images/meg.jpg to change. */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/meg.jpg"
                  alt="Meg, owner of Arrowhead Explorers, with her son"
                  fill
                  sizes="(max-width: 1024px) 70vw, 300px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center font-hand text-xl text-sage-dark">
                Meg — owner &amp; provider
              </p>
            </div>
          </Reveal>

          {/* First-person welcome */}
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-wood">
              Hello from the woods
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-pine sm:text-4xl">
              I&rsquo;m Meg, and I&rsquo;m building the childcare I was looking
              for.
            </h2>
            <p className="mt-5 leading-relaxed text-charcoal-light">
              As a mom of three boys — 15, 4, and 3 — I know what it feels like
              to search for care and hope it feels like an extension of your own
              home. Somewhere small. Somewhere warm. Somewhere your child is
              known by name.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal-light">
              I&rsquo;ve been caring for children since I was a teenager —
              babysitting, summers as a camp counselor, then nannying when my
              first son was born. In between I worked in healthcare, where I
              learned to stay calm when something goes wrong, and I&rsquo;ve kept
              my CPR certification current ever since.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal-light">
              Arrowhead Explorers is a nature-based family childcare program in
              North Waterboro, Maine. We&rsquo;re keeping the group small on
              purpose, so days can move at a child&rsquo;s pace — with time to
              dig, wonder, ask the same question four times, and get properly
              muddy.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal-light">
              Most of our learning happens outside. The rest happens on the rug
              with a stack of books and a snack.
            </p>

            <blockquote className="mt-7 border-l-2 border-wood pl-5 font-serif text-lg italic leading-relaxed text-pine">
              Children don&rsquo;t need to be entertained every minute. They need
              a safe grown-up, good boots, and permission to be curious.
            </blockquote>
            <p className="mt-3 font-hand text-3xl text-sage">— Meg</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
