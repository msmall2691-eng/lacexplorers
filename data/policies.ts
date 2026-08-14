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
      "Due weekly, by Monday morning, for the week ahead.",
      "It stays the same during vacations, illness, and holidays.",
      "A $75 one-time registration fee and a two-week deposit (applied to your final two weeks) are due once your place is confirmed.",
    ],
    footnote:
      "Final payment terms are confirmed in your enrollment agreement.",
  },
  {
    title: "Late Pickup",
    intro:
      "There's a ten-minute grace period, then $1 per minute. Life happens — just call.",
  },
  {
    title: "Health & Illness",
    intro:
      "To keep everyone healthy, please keep your child home for:",
    bullets: [
      "A fever of 100.4°F or higher",
      "Vomiting or diarrhea",
      "An unexplained rash",
      "Anything contagious",
    ],
    footnote:
      "Children can return once they've been 24 hours symptom-free without medication.",
  },
  {
    title: "Meals & Snacks",
    intro: "Here's the plan for food through the day:",
    bullets: [
      "A morning snack (around 8:30) and an afternoon snack (around 2:00), both provided.",
      "Parents pack a lunch and a water bottle — we sit down and eat together around 11:45.",
    ],
    footnote: "Please tell us about any allergies. Meal details are confirmed at enrollment.",
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
  intro: "Holidays we're closed (tuition is unchanged during holiday weeks):",
  holidays: [
    "New Year's Day",
    "Memorial Day",
    "Juneteenth",
    "Independence Day",
    "Labor Day",
    "Thanksgiving",
    "Christmas Eve",
    "Christmas Day",
  ],
  advanceNotice: "Any other planned closure is announced 30 days ahead.",
  unexpected:
    "Unexpected closures are rare — you'll hear from me as early as I can, and tuition is credited for any unexpected closure beyond the first day.",
  weather:
    "We generally follow RSU 57 for full storm closures. A delayed opening usually just means a slower morning here — I'll message you by 6:00 AM either way.",
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
      body: "Hooks, boots, hellos, and quiet play while everyone arrives. We share a morning snack together around 8:30 — nobody gets rushed through the door.",
      icon: "sun" as const,
    },
    {
      phase: "Morning",
      title: "Outside, whatever the sky is doing",
      body: "By 9:00 we're out — trails, woods, the playground, mud, buckets, snow. Around 11:00 we gather for circle: stories, songs, and a little early literacy.",
      icon: "leaf" as const,
    },
    {
      phase: "Midday",
      title: "Lunch, then a good long rest",
      body: "Packed lunches at a real table around 11:45, then rest and quiet time — a nap for those who need one, a book for those who don't.",
      icon: "book" as const,
    },
    {
      phase: "Afternoon",
      title: "Snack, then making things",
      body: "An afternoon snack around 2:00, then the making part of the day — art, sensory play, nature science — before we head back outside for free play.",
      icon: "palette" as const,
    },
    {
      phase: "Pick-up",
      title: "The handoff, with details",
      body: "Between 4:00 and 5:00, with a day recap: what they ate, what they found, and who they played with. Not a summary — the actual story.",
      icon: "heart" as const,
    },
  ],
};
