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
  eyebrow: "A day with us",
  headline: "Our days follow a rhythm, not a schedule.",
  intro:
    "Children settle when they know what comes next. Ours is predictable enough to feel safe and loose enough to follow a good idea when one shows up.",
  note: "Times shift with the children, the weather, and what we're exploring that day.",
  stops: [
    {
      phase: "Arrival",
      title: "Slow starts & soft landings",
      body: "Hooks, boots, hellos. Quiet play while everyone arrives — nobody gets rushed through the door.",
      icon: "sun" as const,
    },
    {
      phase: "Morning",
      title: "Outside, whatever the sky is doing",
      body: "The longest block of the day — trails, mud, sticks, bugs, buckets, snow. We dress for it and we go.",
      icon: "leaf" as const,
    },
    {
      phase: "Midday",
      title: "Snack, story, and a good sit-down",
      body: "Real food at a real table, then books — usually more than we planned, because someone always asks for one more.",
      icon: "book" as const,
    },
    {
      phase: "Afternoon",
      title: "Rest, then making things",
      body: "Quiet time for those who need it, then painting, building, planting, or whatever the week's project has become.",
      icon: "palette" as const,
    },
    {
      phase: "Pick-up",
      title: "The handoff, with details",
      body: "You'll hear what they ate, what they found, and who they played with. Not a summary — the actual story.",
      icon: "heart" as const,
    },
  ],
};
