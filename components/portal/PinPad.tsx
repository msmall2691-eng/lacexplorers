"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Delete } from "lucide-react";

/**
 * Four-digit code entry used for the parent sign-in. Submits to a server
 * action passed in by the page (loginWithPin).
 */

export default function PinPad({
  action,
  hint,
}: {
  action: (pin: string) => Promise<{ ok: boolean; error?: string }>;
  hint?: string;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (code: string) => {
    startTransition(async () => {
      const res = await action(code);
      if (res.ok) {
        router.refresh();
      } else {
        setError(res.error ?? "That code didn't match — try again.");
        setPin("");
      }
    });
  };

  const press = (d: string) => {
    if (pending || pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError(null);
    if (next.length === 4) submit(next);
  };

  return (
    <div>
      <div className="mb-8 flex justify-center gap-3" aria-label="Code entry">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full border-2 transition-colors ${
              i < pin.length ? "border-pine bg-pine" : "border-wood/50"
            } ${pending ? "animate-pulse" : ""}`}
          />
        ))}
      </div>

      {error && <p className="mb-4 text-center text-sm text-berry">{error}</p>}

      <div className="mx-auto grid max-w-[260px] grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button
            key={d}
            onClick={() => press(d)}
            disabled={pending}
            className="aspect-square rounded-full bg-white text-xl font-medium text-pine shadow-soft transition-transform active:scale-95 disabled:opacity-60"
          >
            {d}
          </button>
        ))}
        <div />
        <button
          onClick={() => press("0")}
          disabled={pending}
          className="aspect-square rounded-full bg-white text-xl font-medium text-pine shadow-soft transition-transform active:scale-95 disabled:opacity-60"
        >
          0
        </button>
        <button
          onClick={() => setPin((p) => p.slice(0, -1))}
          disabled={pending}
          aria-label="Delete last digit"
          className="flex aspect-square items-center justify-center rounded-full text-charcoal-light transition-transform active:scale-95"
        >
          <Delete size={20} strokeWidth={1.75} />
        </button>
      </div>

      {hint && <p className="mt-8 text-center text-xs text-charcoal-light/70">{hint}</p>}
    </div>
  );
}
