/**
 * HOME PAGE QUICK FEATURES — the "Why Families Choose Arrowhead" cards.
 * `icon` maps to an icon in components/Icon.tsx. Add/remove cards freely.
 */

export type Feature = {
  title: string;
  description: string;
  icon: "leaf" | "sun" | "book" | "palette" | "calendar" | "bus" | "heart" | "sprout";
};

export const features: Feature[] = [
  {
    title: "Small-Group Care",
    description:
      "A calm, home-like setting where every child is genuinely known, seen, and cared for.",
    icon: "heart",
  },
  {
    title: "Nature & Outdoor Play",
    description:
      "Weather permitting, we're outside as much as possible — exploring, moving, and discovering in the fresh Maine air.",
    icon: "leaf",
  },
  {
    title: "Learning Through Play",
    description:
      "Stories, curiosity, and hands-on discovery — the way young children learn best.",
    icon: "book",
  },
  {
    title: "Arts & Creativity",
    description:
      "Painting, process art, music, and imaginative play to spark creative confidence.",
    icon: "palette",
  },
  {
    title: "Flexible Part-Time Options",
    description:
      "Consistent 2-, 3-, and 4-day schedules designed for real family weeks.",
    icon: "calendar",
  },
  {
    title: "Before & After School Care",
    description:
      "Planned Adventure Club for school-age children, with neighborhood bus access being explored.",
    icon: "bus",
  },
];
