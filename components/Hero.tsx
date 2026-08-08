import { site } from "@/data/site";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF9F4] via-cream to-[#EFE9DE]">
      <Container className="relative z-10 pb-[13rem] pt-14 text-center sm:pb-[17rem] sm:pt-20 lg:pb-[19rem]">
        <div className="animate-fade-up">
          <p className="mb-7 inline-block rounded-full border border-wood/50 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-wood">
            {site.status.noticeBadge}
          </p>

          <LogoMark className="mx-auto mb-5 h-12 w-11 text-sage" />

          <h1 className="font-serif text-[3.2rem] font-semibold leading-[0.95] tracking-[-0.03em] text-pine sm:text-7xl lg:text-[6rem]">
            Arrowhead
            <br />
            <em className="font-normal italic text-sage">Explorers</em>
          </h1>

          <p className="mx-auto mt-6 max-w-[30ch] font-serif text-lg italic text-sage-dark sm:text-2xl">
            {site.tagline.replace(/\.$/, "")}.
          </p>

          <p className="mx-auto mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-wood sm:text-sm">
            Family Childcare · Ages 18 Months–School Age · {site.location.town},{" "}
            {site.location.stateAbbr}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={site.cta.primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-cream shadow-card transition hover:-translate-y-0.5 hover:bg-pine hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-goldenrod"
            >
              {site.cta.primary}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a
              href={site.cta.exploreHref}
              className="inline-flex items-center gap-2 rounded-full border border-sage/50 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-sage-dark transition hover:-translate-y-0.5 hover:bg-sage hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-goldenrod"
            >
              See our programs
            </a>
          </div>

          {/* Hero video — a short peek at real days. Portrait clip, muted autoplay loop.
              PHOTO/VIDEO: swap /videos/hero.mp4 (and the poster) to change. */}
          <div className="mx-auto mt-11 w-[13.5rem] max-w-full sm:w-56">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-pine shadow-lift ring-4 ring-white/70">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/playground.jpg"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </Container>

      {/* Layered pine ridges */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-0 leading-[0]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="block h-auto w-full">
          <circle cx="1160" cy="120" r="62" fill="#C6A15B" opacity="0.45" />
          <path
            fill="#C9CFB6"
            d="M0,420 L0,235 L20,175 L40,240 L62,160 L84,238 L104,182 L126,242 L148,168 L168,236 L190,178 L212,244 L234,162 L256,238 L278,180 L300,240 L322,170 L344,236 L366,186 L388,242 L410,164 L432,238 L454,178 L476,240 L498,168 L520,236 L542,184 L564,242 L586,160 L608,238 L630,176 L652,240 L674,170 L696,236 L718,182 L740,242 L762,166 L784,238 L806,178 L828,240 L850,172 L872,236 L894,184 L916,242 L938,162 L960,238 L982,176 L1004,240 L1026,170 L1048,236 L1070,182 L1092,242 L1114,164 L1136,238 L1158,178 L1180,240 L1202,168 L1224,236 L1246,184 L1268,242 L1290,166 L1312,238 L1334,176 L1356,240 L1378,172 L1400,236 L1420,180 L1440,238 L1440,420 Z"
          />
          <path
            fill="#8C976F"
            d="M0,420 L0,300 L30,232 L60,306 L94,222 L128,304 L160,244 L194,310 L228,226 L262,302 L296,240 L330,308 L364,220 L398,304 L432,246 L466,310 L500,228 L534,302 L568,238 L602,308 L636,224 L670,304 L704,242 L738,310 L772,230 L806,302 L840,236 L874,308 L908,222 L942,304 L976,244 L1010,310 L1044,226 L1078,302 L1112,240 L1146,308 L1180,224 L1214,304 L1248,242 L1282,310 L1316,228 L1350,302 L1384,238 L1418,308 L1440,250 L1440,420 Z"
          />
          <path
            fill="#6F7A55"
            d="M0,420 L0,358 L44,286 L88,366 L136,272 L184,364 L230,296 L278,370 L326,278 L374,362 L420,292 L468,368 L516,274 L564,364 L610,298 L658,370 L706,280 L754,362 L800,294 L848,368 L896,276 L944,364 L990,300 L1038,370 L1086,282 L1134,362 L1180,296 L1228,368 L1276,274 L1324,364 L1370,298 L1418,368 L1440,320 L1440,420 Z"
          />
          <path
            fill="#3D4636"
            d="M0,420 L0,398 C240,382 420,404 720,392 C1020,380 1200,402 1440,390 L1440,420 Z"
          />
        </svg>
      </div>
    </section>
  );
}
