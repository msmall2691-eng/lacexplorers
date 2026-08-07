import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { site, hours } from "@/data/site";
import "./globals.css";

// Elegant serif for headings, clean sans-serif for body copy.
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arrowheadexplorers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Arrowhead Explorers | Nature-Inspired Childcare in North Waterboro, Maine",
    template: "%s | Arrowhead Explorers",
  },
  description:
    "Arrowhead Explorers is a small, nature-inspired home childcare program in North Waterboro, Maine offering flexible part-time care, outdoor play, early learning, and future before & after-school options.",
  keywords: [
    "childcare North Waterboro Maine",
    "daycare North Waterboro Maine",
    "home daycare Waterboro Maine",
    "family childcare Waterboro Maine",
    "Lake Arrowhead childcare",
    "before school care Waterboro Maine",
    "after school care Waterboro Maine",
    "part time daycare Waterboro Maine",
    "nature based childcare Maine",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title:
      "Arrowhead Explorers | Nature-Inspired Childcare in North Waterboro, Maine",
    description:
      "A small, nature-inspired home childcare program in North Waterboro, Maine — flexible part-time care, outdoor play, and early learning through play.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arrowhead Explorers | Nature-Inspired Childcare in Maine",
    description:
      "Small, nature-inspired home childcare in North Waterboro, Maine. Flexible part-time care — now building our interest list.",
  },
  robots: { index: true, follow: true },
};

// LocalBusiness / ChildCare structured data. Kept truthful for the pre-opening
// phase: describes the business and service area without implying it is already
// licensed or operating. Update as details are finalized.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: site.name,
  description:
    "A small, nature-inspired home childcare program in North Waterboro, Maine offering flexible part-time care, outdoor play, and early learning through play.",
  url: siteUrl,
  slogan: site.tagline,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.town,
    addressRegion: site.location.stateAbbr,
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "Place", name: "North Waterboro, Maine" },
    { "@type": "Place", name: "Lake Arrowhead, Maine" },
    { "@type": "Place", name: "Waterboro, Maine" },
  ],
  sameAs: [site.contact.facebookUrl],
  openingHoursSpecification: hours.schedule
    .filter((d) => !d.closed)
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: d.day,
      opens: "07:00",
      closes: "17:00",
    })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
