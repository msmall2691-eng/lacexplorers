import type { ReactNode } from "react";

/**
 * SectionHeading — eyebrow + headline + optional supporting copy.
 * Set `align="left"` for left-aligned headings (defaults to centered).
 */
export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base leading-relaxed text-charcoal-light sm:text-lg">
          {children}
        </p>
      )}
    </div>
  );
}
