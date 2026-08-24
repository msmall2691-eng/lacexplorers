import { site } from "@/data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Our Days", href: "#rhythm" },
  { label: "Ages & Care", href: "#programs" },
  { label: "Adventures", href: "#adventures" },
  { label: "Tuition", href: "#tuition" },
  { label: "FAQ", href: "#faq" },
  { label: "Join Interest List", href: "#interest" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sage-dark text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo
              markClassName="h-11 w-11 text-moss"
              textClassName="text-cream"
              descriptorClassName="text-cream/70"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/80">
              {site.location.community}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-cream/70">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{site.location.exactAddressNote}</span>
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream/60">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/85 transition hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream/60">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/85">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-cream"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone && (
                <li>
                  <a
                    href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-2 transition hover:text-cream"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    {site.contact.phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={site.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-cream"
                >
                  <Icon name="facebook" className="h-4 w-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6">
          <p className="text-xs leading-relaxed text-cream/60">
            {site.footerNote}
          </p>
          <p className="mt-4 text-xs text-cream/60">
            © {year} {site.name} · {site.descriptor} · {site.location.town},{" "}
            {site.location.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
