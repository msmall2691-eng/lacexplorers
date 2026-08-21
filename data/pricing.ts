/**
 * =============================================================================
 * TUITION — weekly rates, school-age care, and terms. Editable here.
 * =============================================================================
 * Pulled from the Arrowhead Explorers Family Information sheet.
 *
 * Weekly tuition is split by age because Maine licensing requires a lower
 * caregiver-to-child ratio for children under two. Everything below is plain
 * data — edit a number or a line and the Tuition section updates.
 */

export const weeklyTuition = {
  currency: "$",
  cadence: "per week",
  // The two age columns, in display order. `rows[].prices` follows this order.
  columns: ["Under 2", "2 – school age"],
  rows: [
    { schedule: "4 days", detail: "Mon–Thu · our full-time", prices: [240, 215] },
    { schedule: "3 days", detail: "your choice of days", prices: [195, 175] },
    { schedule: "2 days", detail: "your choice of days", prices: [140, 125] },
  ],
  ratioNote:
    "Children under two need a lower caregiver-to-child ratio under Maine's licensing rules, which is why those places cost a little more.",
};

/** Per-day school-age rates (before/after school, vacation days, drop-ins). */
export const schoolAgeCare = {
  eyebrow: "School-age care",
  currency: "$",
  rows: [
    { label: "Before or after school", price: 28 },
    { label: "Before and after school", price: 42 },
    { label: "Full day — school vacations & no-school days", price: 52 },
    { label: "Drop-in day — any age, when space allows", price: 70 },
  ],
  unit: "/ day",
};

/** Fees and terms shown beneath the tables. */
export const tuitionTerms = [
  "Sibling discount — 10% off the younger child's tuition.",
  "$75 one-time registration fee per family.",
  "A deposit of two weeks' tuition holds your place, applied to your final two weeks.",
  "Tuition reserves your child's spot, so it stays the same during vacations, illness, and holidays.",
];

/** What weekly tuition includes. */
export const tuitionIncluded = [
  "Morning and afternoon snacks",
  "All art, sensory, and activity supplies",
  "Outdoor time every single day",
  "Photos and a short note about your child's day",
  "A small, consistent group and one steady caregiver",
];

export const tuitionDisclaimer =
  "Rates are set while we complete Maine's family childcare licensing process, and are confirmed in your enrollment agreement.";
