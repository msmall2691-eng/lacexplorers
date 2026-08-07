/**
 * =============================================================================
 * TUITION — proposed, editable pricing.
 * =============================================================================
 * IMPORTANT: These are STARTING / PROPOSED rates and are subject to final
 * enrollment agreements. This is intentionally easy to change.
 *
 * You can run tuition in one of two modes. Set `pricingMode` below:
 *
 *   "schedule-based"  -> one simple table by number of days (simplest to manage)
 *   "age-based"       -> separate rates for younger toddlers vs. preschool age
 *
 * The Tuition section reads this flag and shows the matching table automatically.
 * Prices are weekly and are shown with an "approx." qualifier on the site.
 */

export type PricingMode = "schedule-based" | "age-based";

// 👉 Change this ONE line to switch how tuition is displayed.
export const pricingMode: PricingMode = "schedule-based";

/** Simple schedule-based table (used when pricingMode === "schedule-based"). */
export const scheduleBasedPricing = {
  currency: "$",
  cadence: "per week",
  rows: [
    { schedule: "2 Days / week", price: 110 },
    { schedule: "3 Days / week", price: 165 },
    { schedule: "4 Days / week", price: 220 },
  ],
};

/** Age-based table (used when pricingMode === "age-based"). */
export const ageBasedPricing = {
  currency: "$",
  cadence: "per week",
  groups: [
    {
      label: "Little Explorers",
      sublabel: "Younger toddlers",
      rows: [
        { schedule: "2 Days / week", price: 115 },
        { schedule: "3 Days / week", price: 165 },
        { schedule: "4 Days / week", price: 220 },
      ],
    },
    {
      label: "Explorers",
      sublabel: "Preschool age",
      rows: [
        { schedule: "2 Days / week", price: 110 },
        { schedule: "3 Days / week", price: 155 },
        { schedule: "4 Days / week", price: 210 },
      ],
    },
  ],
};

/** Shown for programs whose pricing isn't finalized. */
export const tuitionNotes = {
  disclaimer:
    "Rates shown are proposed starting tuition and are subject to final enrollment agreements.",
  beforeAfterSchool: {
    label: "Before & After School (Adventure Club)",
    price: "Pricing coming soon",
  },
  dropIn: {
    label: "Drop-in care",
    price:
      "May be offered in the future based on available space — not a primary service.",
  },
  reserves: "Tuition reserves your child's scheduled spot each week.",
};
