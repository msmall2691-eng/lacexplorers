/**
 * NatureDivider — a small centered leafy sprig used to separate content.
 * For a full-width wave transition between colored sections, use <WaveEdge />.
 */
export function NatureDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 py-2 text-sage ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-sage-light" />
      <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
        <path
          d="M17 19V6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M17 12c0-3-2.4-5-5.6-5 0 3 2.4 5 5.6 5Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M17 9c0-2.6 2.2-4.5 5.4-4.5C22.4 7 20.2 9 17 9Z"
          fill="currentColor"
          opacity="0.7"
        />
        <circle cx="17" cy="4" r="1.6" fill="currentColor" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-sage-light" />
    </div>
  );
}

/**
 * WaveEdge — a full-width soft wave used as a section transition.
 * Place at the top or bottom of a colored section. `position` controls rotation.
 */
export function WaveEdge({
  color = "#F7F3EB",
  position = "bottom",
  className = "",
}: {
  color?: string;
  position?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${
        position === "top" ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className="relative block h-[40px] w-full sm:h-[60px]"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 C 200 55 400 5 600 25 C 800 45 1000 10 1200 30 L1200 60 L0 60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
