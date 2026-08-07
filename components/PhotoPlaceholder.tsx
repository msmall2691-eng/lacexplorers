import { Icon, type IconName } from "./Icon";

/**
 * PhotoPlaceholder — a tasteful, on-brand stand-in for a real photo.
 *
 * Meg: replace these with real photos when you have them. To swap one out, drop
 * your image in /public/images and use an <img> or next/image in place of this
 * component, e.g.:
 *   <img src="/images/meg.jpg" alt="Meg, owner of Arrowhead Explorers"
 *        className="h-full w-full rounded-3xl object-cover" />
 * See the README ("Replacing the logo & photos").
 */
export function PhotoPlaceholder({
  label = "Photo coming soon",
  icon = "heart",
  aspect = "aspect-[4/5]",
  className = "",
}: {
  label?: string;
  icon?: IconName;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex ${aspect} items-center justify-center overflow-hidden rounded-3xl border border-beige/60 bg-gradient-to-br from-cream via-sage-50 to-sage-light/40 ${className}`}
    >
      {/* botanical corner accents */}
      <Icon
        name="leaf"
        className="absolute -left-2 -top-2 h-16 w-16 rotate-12 text-sage/15"
      />
      <Icon
        name="leaf"
        className="absolute -bottom-3 -right-2 h-20 w-20 -rotate-12 text-sage/15"
      />
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-sage-dark shadow-soft">
          <Icon name={icon} className="h-7 w-7" />
        </span>
        <span className="text-sm font-medium text-sage-dark/80">{label}</span>
      </div>
    </div>
  );
}
