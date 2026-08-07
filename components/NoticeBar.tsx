"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Icon } from "./Icon";

const STORAGE_KEY = "ae-notice-dismissed";

/** Dismissible "Coming Soon" bar at the very top of the site. */
export function NoticeBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      /* localStorage may be unavailable; ignore */
    }
  }, []);

  if (!site.status.comingSoon || !site.status.noticeBar || dismissed) {
    return null;
  }

  return (
    <div className="relative bg-sage text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-10 py-2 text-center text-sm font-medium">
        <p>{site.status.noticeBar}</p>
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            try {
              window.localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-cream/80 transition hover:bg-white/15 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          aria-label="Dismiss announcement"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
