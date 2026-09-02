"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * Simple staff-code form used to unlock the kiosk and the admin area.
 * Takes the server action to call; refreshes the page on success.
 */

export default function CodeEntry({
  action,
  label = "Staff code",
}: {
  action: (code: string) => Promise<{ ok: boolean; error?: string }>;
  label?: string;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    startTransition(async () => {
      const res = await action(code);
      if (res.ok) router.refresh();
      else {
        setError(res.error ?? "That code didn't match.");
        setCode("");
      }
    });
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-[260px]">
      <label className="mb-1 block text-xs font-medium text-charcoal-light">{label}</label>
      <input
        type="password"
        inputMode="numeric"
        autoComplete="off"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full rounded-xl border border-wood/30 bg-white px-4 py-3 text-center text-lg tracking-widest text-pine outline-none focus:border-sage"
      />
      {error && <p className="mt-3 text-center text-sm text-berry">{error}</p>}
      <button
        type="submit"
        disabled={pending || !code}
        className="mt-4 w-full rounded-full bg-pine py-3 text-sm font-medium text-cream transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
