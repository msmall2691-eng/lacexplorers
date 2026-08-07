/**
 * =============================================================================
 * PARENT INFORMATION & POLICIES — proposed. Editable here.
 * =============================================================================
 * These are PROPOSED policies for the pre-opening phase. Final policies will be
 * confirmed in the Parent Handbook / enrollment agreement. Copy is written to
 * avoid medical claims and unverified promises.
 *
 * Look for `TODO` markers where a value should be confirmed.
 */

export const parentInfoIntro = {
  eyebrow: "Parent Information",
  headline: "Everything You Need to Know",
  body: "A clear look at how our days are structured and what to expect. Final details will be confirmed in the Parent Handbook before opening.",
};

/** Accordion cards for the Parent Info section. */
export type PolicyCard = {
  title: string;
  // Each card is a short intro + optional bullet list.
  intro?: string;
  bullets?: string[];
  footnote?: string;
};

export const policyCards: PolicyCard[] = [
  {
    title: "Hours",
    intro:
      "Proposed schedule: Monday – Thursday, 7:00 AM – 5:00 PM. Friday closed.",
    bullets: [
      "Preferred arrival before approximately 9:00 AM unless otherwise arranged.",
      "Children are released to authorized adults only.",
    ],
    footnote: "Final hours will be confirmed before opening.",
  },
  {
    title: "Payment",
    intro: "Tuition reserves your child's scheduled spot each week.",
    bullets: [
      "Proposed policy: payment is due weekly regardless of attendance.",
      "This includes child illness, family vacation, and other missed days.",
    ],
    footnote:
      "Final payment policies will be confirmed in the Parent Handbook / enrollment agreement.",
  },
  {
    title: "Late Pickup",
    intro:
      // TODO: Confirm the late-pickup fee before opening. Edit `lateFee` below to change everywhere.
      "A proposed late fee of $1 per minute applies after closing time.",
    footnote: "Final late-pickup policy will be confirmed before opening.",
  },
  {
    title: "Health & Illness",
    intro:
      "To keep everyone healthy, children may need to stay home for symptoms such as:",
    bullets: [
      "Fever",
      "Vomiting",
      "Diarrhea",
      "Contagious illness",
      "Symptoms that prevent normal participation",
    ],
    footnote:
      "Full health and exclusion policies will be provided in the Parent Handbook.",
  },
  {
    title: "Meals & Snacks",
    intro:
      "We plan to offer a morning snack and an afternoon snack. Lunch arrangements are not yet final — parents may initially provide lunch.",
    footnote: "Meal details will be finalized prior to opening.",
  },
  {
    title: "What Parents Provide",
    intro: "Depending on your child's age, please plan to send:",
    bullets: [
      "Diapers & wipes",
      "Formula / breast milk (if applicable)",
      "A change of clothes",
      "Weather-appropriate outdoor gear",
      "A water bottle",
      "A nap comfort item",
      "Sunscreen (if required)",
    ],
  },
];

/** Late fee — referenced in copy so it stays consistent. Edit here to change. */
export const lateFee = {
  amount: 1,
  unit: "per minute",
  description: "after closing time",
};

/**
 * HOLIDAYS & CLOSURES — proposed.
 */
export const closures = {
  eyebrow: "Holidays & Closures",
  intro: "Proposed closed holidays (final calendar shared before opening):",
  holidays: [
    "New Year's Day",
    "Memorial Day",
    "Independence Day",
    "Labor Day",
    "Thanksgiving Day",
    "Day after Thanksgiving",
    "Christmas Eve",
    "Christmas Day",
  ],
  providerVacation:
    "Proposed: up to 2 paid weeks of provider vacation annually.",
  professionalDevelopment:
    "Proposed: up to 5 training / professional-development days annually.",
  advanceNotice: "Parents receive advance notice whenever possible.",
  weather:
    "Maine weather closures may reference local school conditions (such as RSU 57), but the provider may make an independent safety decision. Arrowhead Explorers is not required to follow RSU 57.",
};

/**
 * DAILY RHYTHM — a sample day. Kept flexible on purpose.
 */
export const dailyRhythm = {
  eyebrow: "A Day at Arrowhead",
  headline: "Our Daily Rhythm",
  note: "Times shift depending on the children, the weather, and what we're exploring that day.",
  blocks: [
    { time: "7:00 – 8:30", activity: "Arrival & free play" },
    { time: "8:30", activity: "Morning snack" },
    { time: "9:00", activity: "Outdoor exploration" },
    { time: "10:00", activity: "Story / circle time" },
    { time: "10:30", activity: "Creative or learning activity" },
    { time: "11:30", activity: "Lunch" },
    { time: "12:30 – 2:30", activity: "Nap / quiet time" },
    { time: "2:30", activity: "Snack" },
    { time: "3:00", activity: "Outdoor play / exploration" },
    { time: "4:00", activity: "Free play / pick-up" },
  ],
};
