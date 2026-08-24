/**
 * =============================================================================
 * CARE & AGES — how the group actually works.
 * =============================================================================
 * Arrowhead Explorers is ONE small, mixed-age group (18 months through school
 * age), plus school-age care built around the neighborhood bus stop. These two
 * cards describe that — no separate branded "programs."
 */

export type Program = {
  id: string;
  name: string;
  age: string;
  tagline: string;
  focus: string[];
  status?: "planned" | "future";
  // Optional note shown under the card.
  note?: string;
  icon: "sprout" | "leaf" | "bus" | "sun";
};

export const programs: Program[] = [
  {
    id: "mixed-age",
    name: "Our mixed-age group",
    age: "18 months – school age",
    tagline:
      "One small group, together — older children help the younger ones, and the younger ones stretch to keep up.",
    focus: [
      "Outdoor exploration in every season",
      "Sensory play & nature science",
      "Stories & early literacy",
      "Art & creative projects",
      "Music & movement",
      "Rest & quiet time after lunch",
      "Practical life — pouring, cleanup, boots on your own",
    ],
    icon: "leaf",
  },
  {
    id: "school-age",
    name: "School-age care",
    age: "Before & after school · no-school days",
    tagline:
      "We walk to the Victoria Lane bus stop together, morning and afternoon — the little ones ride along in the wagon.",
    focus: [
      "Before-school care",
      "After-school care",
      "Full days on RSU 57 vacations & no-school days",
      "Homework & quiet time",
      "Outdoor play & the neighborhood playground",
    ],
    icon: "bus",
    note: "We're in RSU 57 (Massabesic), and the bus stop is a short walk from our door. See Tuition for before/after-school and no-school-day rates.",
  },
];
