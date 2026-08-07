/**
 * =============================================================================
 * PROGRAMS — the age-based program cards.
 * =============================================================================
 * Edit ages, focus points, and status here. `status` controls the badge:
 *   "planned"  -> shown as "Coming Soon"
 *   "future"   -> shown as "Future Program"
 *   undefined  -> no badge
 *
 * Note on framing: these are home-childcare programs that include age-appropriate
 * early learning — NOT a formal preschool or academy. Keep the language warm and
 * play-based.
 */

export type Program = {
  id: string;
  name: string;
  age: string;
  tagline: string;
  focus: string[];
  status?: "planned" | "future";
  // Extra note shown under the card (used for Adventure Club's bus wording).
  note?: string;
  icon: "sprout" | "leaf" | "bus" | "sun";
};

export const programs: Program[] = [
  {
    id: "little-explorers",
    name: "Little Explorers",
    age: "Approximately 18 months – 3 years",
    tagline: "First discoveries, big feelings, and lots of gentle guidance.",
    focus: [
      "Sensory play",
      "Language development",
      "Music & movement",
      "Simple art",
      "Outdoor exploration",
      "Early independence",
      "Comforting routines",
      "Social-emotional learning",
    ],
    icon: "sprout",
  },
  {
    id: "explorers",
    name: "Explorers",
    age: "Approximately 3 – 5 years",
    tagline: "Curiosity-led learning through stories, nature, and imagination.",
    focus: [
      "Early learning through play",
      "Stories & early literacy",
      "Letters & numbers woven into activities",
      "Art & creativity",
      "Nature & science exploration",
      "Imaginative play",
      "Kindergarten readiness — without a rigid academic environment",
    ],
    icon: "leaf",
  },
  {
    id: "adventure-club",
    name: "Adventure Club",
    age: "School age",
    tagline: "Big kids are explorers too.",
    focus: [
      "Before-school care",
      "After-school care",
      "Afternoon snack",
      "Outdoor play",
      "Homework & quiet time",
      "Creative activities",
      "Friendships",
      "School-vacation days (possible in the future)",
    ],
    status: "planned",
    note:
      "Before & after-school care options are planned, with neighborhood bus access being explored. (We can't promise direct school transportation, but the Lake Arrowhead neighborhood bus stop is nearby.)",
    icon: "bus",
  },
  {
    id: "summer-explorers",
    name: "Summer Explorers",
    age: "Warm-weather program",
    tagline: "Sunshine, gardens, and outdoor adventures.",
    focus: [
      "Nature days",
      "Gardening",
      "Outdoor & water play",
      "Crafts",
      "Summer reading",
      "Scavenger hunts",
      "Nature science",
    ],
    status: "future",
    icon: "sun",
  },
];
