/**
 * =============================================================================
 * SITE CONFIG — the main place to edit business-wide details.
 * =============================================================================
 * Almost everything a parent reads that isn't a program/activity/FAQ lives here.
 * Edit these values and the whole site updates. Look for `TODO` markers for
 * details that should be confirmed before opening.
 */

export const site = {
  name: "Arrowhead Explorers",
  // Used in tight spaces (mobile nav, footer mark, etc.)
  shortName: "Arrowhead Explorers",
  tagline: "Growing Curious Minds Through Nature & Play.",
  // One-line description of the business model. Reused in metadata + footer.
  descriptor: "Nature-Based Family Childcare",
  positioning: "A nature-inspired home childcare program.",

  /**
   * Coming-soon / pre-opening status.
   * IMPORTANT: Keep this honest. Arrowhead Explorers is in the planning /
   * licensing-preparation phase — do not describe it as already licensed or open.
   * When you open and licensing is finalized, flip `comingSoon` to false and
   * update the copy throughout (notice bar, hero badge, FAQ "Are you licensed?").
   */
  status: {
    comingSoon: true,
    // Text for the dismissible notice bar at the very top of the site.
    noticeBar:
      "🌲 Now enrolling our interest list — Lake Arrowhead & North Waterboro families welcome.",
    // Open-ended badge shown in the hero (no firm opening date).
    noticeBadge: "Now enrolling our interest list",
    // Short badge (kept for reference / future use).
    heroBadge: "Coming Soon",
    // Honest phase language reused in a few spots.
    phaseLine: "We're preparing to open and building our interest list.",
  },

  location: {
    town: "North Waterboro",
    state: "Maine",
    stateAbbr: "ME",
    region: "Lake Arrowhead",
    // Public-facing location line. Do NOT publish the exact home address.
    community: "Located in the Lake Arrowhead community of North Waterboro, Maine.",
    exactAddressNote: "Exact location provided to enrolled families.",
    badge: "North Waterboro • Lake Arrowhead",
  },

  contact: {
    email: "lacexplorers@gmail.com",
    // TODO: Add a public phone number here if Meg wants one shown, or leave "".
    phone: "",
    // TODO: Replace with the real Facebook page URL once it exists.
    facebookUrl: "https://www.facebook.com/",
    facebookLabel: "Arrowhead Explorers | North Waterboro, Maine",
  },

  cta: {
    primary: "Join the Interest List",
    primaryHref: "#interest",
    secondary: "Contact Us",
    secondaryHref: "#interest",
    explore: "Explore Our Programs",
    exploreHref: "#programs",
  },

  hero: {
    headline: "Growing Curious Minds Through Nature & Play.",
    subheadline:
      "Small-group, nature-inspired home childcare in North Waterboro, Maine.",
    body:
      "A warm, nurturing home where children learn, create, and explore — spending most of our days outside.",
  },

  // Age range used consistently across the site. Keep every page in sync with this.
  ageRange: "approximately 18 months through school age",

  footerNote:
    "Program details, availability, tuition, and policies are subject to change as licensing and opening preparations are finalized.",
};

/**
 * =============================================================================
 * HOURS — proposed operating schedule. Easy to edit here.
 * =============================================================================
 * The owner prefers a sustainable part-time week rather than five long days.
 * Proposed: Monday–Thursday, 7:00 AM – 5:00 PM, Friday closed.
 * TODO: Confirm final hours before opening.
 */
export const hours = {
  // Machine-readable per-day schedule (used for structured data / future features).
  schedule: [
    { day: "Monday", open: "7:00 AM", close: "5:00 PM", closed: false },
    { day: "Tuesday", open: "7:00 AM", close: "5:00 PM", closed: false },
    { day: "Wednesday", open: "7:00 AM", close: "5:00 PM", closed: false },
    { day: "Thursday", open: "7:00 AM", close: "5:00 PM", closed: false },
    { day: "Friday", open: "", close: "", closed: true },
    { day: "Saturday", open: "", close: "", closed: true },
    { day: "Sunday", open: "", close: "", closed: true },
  ],
  // Human-friendly summary shown on the site.
  summary: "Monday – Thursday",
  timeRange: "7:00 AM – 5:00 PM",
  closedNote: "Friday closed",
  arrival:
    "Preferred arrival before approximately 9:00 AM unless otherwise arranged.",
  pickup: "Children are released to authorized adults only.",
} as const;

/**
 * Enrollment options message — reinforces the flexible part-time model.
 */
export const enrollment = {
  options: ["2 days / week", "3 days / week", "4 days / week"],
  headline: "Flexible 2-, 3-, and 4-day enrollment options.",
  note: "Families choose a consistent recurring weekly schedule.",
};
