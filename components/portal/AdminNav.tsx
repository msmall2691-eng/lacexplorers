"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/portal/admin", label: "Today" },
  { href: "/portal/admin/log", label: "Daily log" },
  { href: "/portal/admin/attendance", label: "Attendance" },
  { href: "/portal/admin/schedule", label: "Schedule" },
  { href: "/portal/admin/photos", label: "Photos" },
  { href: "/portal/admin/families", label: "Families" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-10 overflow-x-auto border-b border-wood/15 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-2xl">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                active ? "border-pine text-pine" : "border-transparent text-charcoal-light"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
