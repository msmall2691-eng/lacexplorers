/**
 * FAQ — parent questions. Kept honest about the pre-opening / licensing phase.
 * Answers avoid unverified claims (no "licensed", "certified", guaranteed
 * transportation/meals/enrollment/opening date).
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "What ages do you accept?",
    answer:
      "Approximately 18 months through school age, depending on program availability.",
  },
  {
    question: "Do you offer part-time childcare?",
    answer:
      "Yes. Arrowhead Explorers is intentionally being designed around consistent 2-, 3-, and 4-day schedules.",
  },
  {
    question: "Are you open Fridays?",
    answer: "Our current proposed schedule is Monday through Thursday.",
  },
  {
    question: "Do you offer before and after school care?",
    answer:
      "It is planned as our Adventure Club program for school-age children. Details will be shared as they are finalized.",
  },
  {
    question: "Is Arrowhead Explorers a preschool?",
    answer:
      "It is a home childcare program that incorporates age-appropriate early learning, reading, creativity, and kindergarten-readiness activities through play.",
  },
  {
    question: "Are you licensed?",
    answer:
      "Arrowhead Explorers is currently in the planning / licensing-preparation phase. Enrollment availability and opening details will be shared as they are finalized.",
  },
  {
    question: "Do you spend time outdoors?",
    answer:
      "Yes. Outdoor play and nature exploration are central to the program, weather and safety permitting.",
  },
  {
    question: "Do children need to be potty trained?",
    answer:
      "Not necessarily. Final age-specific requirements will be outlined during enrollment.",
  },
  {
    question: "Do you provide meals?",
    answer:
      "Snacks and meal arrangements will be finalized prior to opening. Parents may initially provide lunch.",
  },
  {
    question: "Do you offer full-time 5-day care?",
    answer:
      "The program is currently being designed primarily around 2-, 3-, and 4-day enrollment.",
  },
];
