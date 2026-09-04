/**
 * FAQ — parent questions, drawn from the Family Information sheet.
 * Kept honest about the pre-opening / licensing phase: no "licensed" or
 * "certified" claims, no guaranteed opening date.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "What ages do you accept?",
    answer:
      "18 months through school age. Weekly tuition is split into two age groups — under 2, and 2 through school age — because Maine licensing requires a lower caregiver-to-child ratio for the littlest ones.",
  },
  {
    question: "Why Monday through Thursday?",
    answer:
      "A four-day week keeps the group small, the program well-planned, and the caregiver rested — which is what makes the other four days good ones.",
  },
  {
    question: "Can I choose which days we come?",
    answer:
      "Yes — two- and three-day families choose their days, subject to what's open. Consistent days work best for children, so we keep the same schedule week to week.",
  },
  {
    question: "What happens when the weather is bad?",
    answer:
      "We go out anyway, dressed for it — that's rather the point. We stay in for thunderstorms, extreme cold, and poor air quality, and we always come in when a child has had enough.",
  },
  {
    question: "Does my child need to be potty trained?",
    answer:
      "No. We work alongside you at your child's pace and keep it low-pressure. Just send diapers, wipes, and plenty of spare clothes.",
  },
  {
    question: "Do you provide meals?",
    answer:
      "We provide a morning snack and an afternoon snack. Parents pack a lunch and a water bottle, and we sit down to eat together around 11:45.",
  },
  {
    question: "What should I pack?",
    answer:
      "Labeled weather gear (boots, mittens, snow pants, rain suit), a full change of clothes (two in mud season), a packed lunch and water bottle, a nap blanket or comfort item, diapers/wipes/cream if needed, and sunscreen and bug spray in season.",
  },
  {
    question: "Do you offer before- and after-school care?",
    answer:
      "Yes. Before or after school is $28/day, before and after is $42/day, and full days on RSU 57 vacations and no-school days are $52/day. We're in RSU 57 (Massabesic), and the bus stop is a short walk from our door — we walk down together, morning and afternoon.",
  },
  {
    question: "How does payment work?",
    answer:
      "Tuition is due weekly, by Monday morning, for the week ahead — by Venmo, check, or cash — and it reserves your child's spot, so it stays the same during vacations, illness, and holidays. You'll get a year-end statement with my tax ID for the federal child-care tax credit. There's also a $75 one-time registration fee and a deposit of two weeks' tuition, applied to your final two weeks.",
  },
  {
    question: "When should I keep my child home?",
    answer:
      "For a fever of 100.4°F or higher, vomiting or diarrhea, an unexplained rash, or anything contagious. Children can come back once they've been 24 hours symptom-free without medication.",
  },
  {
    question: "What about snow days and holiday closures?",
    answer:
      "We generally follow RSU 57 for full storm closures; a delayed opening usually just means a slower morning here, and I'll message you by 6:00 AM either way. We're closed for the major holidays, any other planned closure is announced 30 days ahead, and tuition is unchanged during holiday weeks.",
  },
  {
    question: "Do you have pets?",
    answer:
      "Yes — cats indoors, and our dog has his own fenced section of the yard, so the children's play space stays theirs. Please tell us about any allergies.",
  },
  {
    question: "Are you licensed yet?",
    answer:
      "We're completing Maine's family child care licensing process now. Until it's finalized, we operate within the state's license-exempt limit — caring for no more than two children who aren't our own at a time — so we're fully within Maine law while we get started. Once we're licensed we'll welcome our full small group, and we reach out to interest-list families in order as places open.",
  },
  {
    question: "Is Arrowhead Explorers a preschool?",
    answer:
      "It's a home childcare program that weaves age-appropriate early learning — reading, letters, creativity, and kindergarten-readiness — into a play-based, mostly-outdoor day.",
  },
];
