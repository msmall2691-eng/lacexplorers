/**
 * ACTIVITIES — grouped by theme. A major selling point of the program.
 * Edit freely. `icon` maps to components/Icon.tsx.
 */

export type ActivityGroup = {
  title: string;
  icon: "leaf" | "palette" | "book" | "sun";
  blurb: string;
  items: string[];
};

export const activitiesIntro = {
  eyebrow: "Everyday Adventures",
  headline: "Little Hands. Big Adventures.",
  body: "Some of the best learning happens through play. Here's a taste of what everyday exploration looks like at Arrowhead Explorers.",
};

export const activityGroups: ActivityGroup[] = [
  {
    title: "Nature",
    icon: "leaf",
    blurb: "The outdoors is our biggest classroom.",
    items: [
      "Nature walks",
      "Leaf collecting",
      "Bug hunts",
      "Bird watching",
      "Magnifying-glass exploration",
      "Gardening & planting",
      "Vegetable gardening",
      "Pinecone & acorn activities",
      "Seasonal outdoor exploration",
    ],
  },
  {
    title: "Creative",
    icon: "palette",
    blurb: "Room to make, imagine, and get a little messy.",
    items: [
      "Painting",
      "Nature crafts",
      "Process art",
      "Playdough",
      "Sensory bins",
      "Sidewalk chalk",
      "Music & movement",
      "Pretend play",
      "Building activities",
    ],
  },
  {
    title: "Learning",
    icon: "book",
    blurb: "Early skills, woven naturally into the day.",
    items: [
      "Daily story time",
      "Early literacy",
      "Counting through play",
      "Colors & shapes",
      "Basic science",
      "Weather observation",
      "Seasonal themes",
      "Simple experiments",
      "Kindergarten-readiness activities for older children",
    ],
  },
  {
    title: "Outdoor",
    icon: "sun",
    blurb: "Fresh air and plenty of room to move.",
    items: [
      "Free play",
      "Bubbles",
      "Water play",
      "Picnics",
      "Scavenger hunts",
      "Gross-motor play",
      "Snow exploration",
      "Nature-kitchen play (if added later)",
    ],
  },
];
