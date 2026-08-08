import { site } from "@/data/site";

/**
 * Arrowhead mark — a simple, elegant nod to the "Arrowhead Explorers" name.
 * Drawn with currentColor so the color is set via the className (e.g. text-sage).
 */
export function LogoMark({
  className = "h-10 w-10 text-sage",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 1.5 L21 22 L12 18 L3 22 Z" />
      <path d="M12 6.5 L12 18" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  descriptorClassName?: string;
  showDescriptor?: boolean;
};

export function Logo({
  className = "",
  markClassName = "h-10 w-10 text-sage",
  textClassName = "text-charcoal",
  descriptorClassName = "text-wood",
  showDescriptor = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-lg font-semibold tracking-tight sm:text-xl ${textClassName}`}
        >
          {site.name}
        </span>
        {showDescriptor && (
          <span
            className={`mt-1 text-[10px] font-medium uppercase tracking-[0.18em] ${descriptorClassName}`}
          >
            {site.descriptor}
          </span>
        )}
      </span>
    </span>
  );
}
