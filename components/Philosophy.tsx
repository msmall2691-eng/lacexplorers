import { Container } from "./Container";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";

const pillars: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "sprout",
    title: "Bodies that know what they can do",
    body: "Climbing, balancing, hauling, digging. Real risk in safe amounts is how children build coordination — and the confidence that comes with it.",
  },
  {
    icon: "book",
    title: "Questions before answers",
    body: "Why is that log soft? Where did the frog go? Curiosity grows when children have time to notice things — and a grown-up who takes the question seriously.",
  },
  {
    icon: "heart",
    title: "Kindness, practiced daily",
    body: "Small groups mean conflicts get worked through, not managed around. Sharing a trail, waiting a turn, helping someone up — the lessons that stick.",
  },
];

export function Philosophy() {
  return (
    <section className="bg-pine py-16 text-cream sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-moss">
            Why nature-based
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            The woods are the classroom.
          </h2>
          <p className="mt-4 leading-relaxed text-cream/80">
            Outdoor learning isn&rsquo;t a nice extra we add on when the weather
            cooperates. It&rsquo;s how the whole program is built — and it&rsquo;s
            balanced with story time, early literacy, and plenty of hands-on
            projects.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-moss">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-cream">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-moss/25 pt-10 text-center">
          <p className="mx-auto max-w-[26ch] font-serif text-2xl font-medium italic leading-snug text-cream sm:text-3xl">
            &ldquo;There&rsquo;s no such thing as bad weather. Only the wrong
            mittens.&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}
