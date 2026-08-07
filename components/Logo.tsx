import { site } from "@/data/site";

/**
 * Logo — the brand lockup used in the header and footer.
 *
 * Meg: to use your own logo, either overwrite /public/logo.svg with your file,
 * or drop a PNG in /public and change LOGO_SRC below to e.g. "/logo.png".
 * If your logo file ALREADY contains the words "Arrowhead Explorers", set
 * LOGO_INCLUDES_WORDMARK to true so the name isn't shown twice.
 */
const LOGO_SRC = "/logo.svg";
const LOGO_INCLUDES_WORDMARK = false;

export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  // Using a plain <img> keeps the logo trivially swappable (just replace the file).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={LOGO_SRC} alt={`${site.name} logo`} className={className} />;
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
  markClassName = "h-11 w-11",
  textClassName = "text-charcoal",
  descriptorClassName = "text-sage",
  showDescriptor = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      {!LOGO_INCLUDES_WORDMARK && (
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
      )}
    </span>
  );
}
