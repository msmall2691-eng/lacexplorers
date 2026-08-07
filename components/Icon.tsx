/**
 * Icon — a small set of consistent line icons drawn with currentColor.
 * Add new icons by adding a case to the switch. Keep them simple and organic.
 */

export type IconName =
  | "leaf"
  | "sun"
  | "book"
  | "palette"
  | "calendar"
  | "bus"
  | "heart"
  | "sprout"
  | "tree"
  | "menu"
  | "close"
  | "chevron"
  | "mapPin"
  | "clock"
  | "check"
  | "mail"
  | "phone"
  | "facebook"
  | "droplet"
  | "arrowRight";

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};

export function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.7,
  ...rest
}: IconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };

  switch (name) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16" />
          <path d="M9 15c2-3 5-5 8-6" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
          <path d="M4 5.5v15" />
          <path d="M12 3v15" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.9 1.8-2 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-6.7-9-6.7Z" />
          <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="7.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        </svg>
      );
    case "bus":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="12" rx="2.5" />
          <path d="M4 11h16M8 4v7M16 4v7" />
          <path d="M7 20v-2M17 20v-2" />
          <circle cx="8" cy="16.5" r="0.4" fill="currentColor" />
          <circle cx="16" cy="16.5" r="0.4" fill="currentColor" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-9.2-8.6C1.3 8.5 2.6 5.5 5.6 5c1.9-.3 3.5.8 4.4 2.2C10.9 5.8 12.5 4.7 14.4 5c3 .5 4.3 3.5 2.8 6.4C19 15.6 12 20 12 20Z" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M12 21v-8" />
          <path d="M12 13c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
          <path d="M12 11c0-2.6 2.2-4.5 5.5-4.5C17.5 9 15.3 11 12 11Z" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 3 6.5 11h3L5 18h14l-4.5-7h3z" />
          <path d="M12 18v3" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "mapPin":
      return (
        <svg {...common}>
          <path d="M12 21s-6.5-5.5-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.5-6.5 11-6.5 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4.5 12.5l5 5 10-11" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M6.5 3.5 9 4l1 4-2 1.5a11 11 0 0 0 5 5L14.5 16l4 1 .5 2.5a2 2 0 0 1-2.2 2.2A16 16 0 0 1 2.3 7.7 2 2 0 0 1 4.5 5.5z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 8.5V6.8c0-.8.5-1 1-1h1.5V3H14c-2 0-3.3 1.3-3.3 3.4v2.1H8.5V11h2.2v10h3V11h2.3l.5-2.5z" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...common}>
          <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.7A5.5 5.5 0 0 1 6.5 13.2c0-3.1 2.5-6.1 5.5-9.7Z" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...common}>
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
