"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "./Icon";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

/**
 * Accordion — accessible disclosure list. Items open/close independently.
 * Uses a CSS grid-rows transition for a smooth, height-aware expand.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="divide-y divide-beige/70 overflow-hidden rounded-2xl border border-beige/70 bg-offwhite">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-sage-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sage sm:px-6"
              >
                <span className="font-serif text-lg font-medium text-charcoal">
                  {item.title}
                </span>
                <span
                  className={`shrink-0 rounded-full bg-sage-50 p-1 text-sage-dark transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <Icon name="chevron" className="h-5 w-5" />
                </span>
              </button>
            </h3>
            <div
              id={`panel-${item.id}`}
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-charcoal-light sm:px-6">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
