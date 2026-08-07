"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Activities", href: "#activities" },
  { label: "Tuition", href: "#tuition" },
  { label: "Parent Info", href: "#parent-info" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-beige/60 bg-offwhite/90 shadow-soft backdrop-blur"
          : "border-b border-transparent bg-offwhite/70 backdrop-blur"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
        aria-label="Main"
      >
        <a href="#top" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
          <Logo markClassName="h-10 w-10 sm:h-11 sm:w-11" />
          <span className="sr-only">Back to top</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-light transition hover:bg-sage-50 hover:text-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.cta.primaryHref}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition hover:bg-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            {site.cta.primary}
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-charcoal transition hover:bg-sage-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-beige/60 bg-offwhite/98 backdrop-blur lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-charcoal transition hover:bg-sage-50 hover:text-sage-dark"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.cta.primaryHref}
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-3 text-base font-semibold text-cream shadow-sm transition hover:bg-sage-dark"
            >
              {site.cta.primary}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
