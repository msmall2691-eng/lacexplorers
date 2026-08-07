import { Accordion, type AccordionItem } from "./Accordion";
import { faq } from "@/data/faq";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const faqItems: AccordionItem[] = faq.map((item, i) => ({
  id: `faq-${i}`,
  title: item.question,
  content: <p className="text-sm leading-relaxed sm:text-base">{item.answer}</p>,
}));

// FAQ structured data helps this content appear well in search results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-offwhite py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions">
          Answers to the questions families ask most. Have another? We&rsquo;d love
          to hear from you.
        </SectionHeading>

        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal>
            <Accordion items={faqItems} />
          </Reveal>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
