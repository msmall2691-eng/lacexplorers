"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Leaf, Users } from "lucide-react";
import { kioskRecord } from "@/lib/portal/actions";

/**
 * Self-serve family check-in. Tap your family (or arrive via badge QR link),
 * confirm which children, optionally note who's doing drop-off/pick-up, done.
 */

export type KioskFamily = {
  id: string;
  name: string;
  /** Present only in badge mode — authorizes the action without kiosk unlock */
  badgeCode?: string;
  children: { id: string; name: string; isIn: boolean; since: string | null }[];
};

const BY_OPTIONS = ["Mom", "Dad", "Grandparent", "Other"];

export default function Kiosk({
  roster,
  badgeMode,
  unlocked,
}: {
  roster: KioskFamily[];
  badgeMode: boolean;
  unlocked: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(
    badgeMode && roster.length === 1 ? roster[0].id : null
  );
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [by, setBy] = useState<string>("");
  const [done, setDone] = useState<{ family: string; action: "in" | "out" } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const family = useMemo(() => roster.find((f) => f.id === selectedId) ?? null, [roster, selectedId]);

  // If anyone in this family is currently signed in, this scan signs out; otherwise in.
  const action: "in" | "out" = family && family.children.some((c) => c.isIn) ? "out" : "in";

  const relevantChildren = family
    ? family.children.filter((c) => (action === "out" ? c.isIn : !c.isIn))
    : [];

  const toggleChild = (id: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const confirm = () => {
    if (!family) return;
    const childIds = relevantChildren.filter((c) => !excluded.has(c.id)).map((c) => c.id);
    setError(null);
    startTransition(async () => {
      const res = await kioskRecord({
        familyId: family.id,
        badgeCode: family.badgeCode,
        childIds,
        action,
        by: by || undefined,
      });
      if (res.ok) {
        setDone({ family: family.name, action });
        setSelectedId(null);
        setExcluded(new Set());
        setBy("");
        router.refresh();
        setTimeout(() => setDone(null), 4000);
      } else {
        setError(res.error ?? "Something went wrong — try again.");
      }
    });
  };

  const reset = () => {
    setSelectedId(null);
    setExcluded(new Set());
    setBy("");
    setError(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link href="/portal" className="mb-6 flex items-center justify-center gap-1 text-xs text-charcoal-light">
          <ArrowLeft size={14} /> {badgeMode ? "Family portal" : "Exit kiosk"}
        </Link>
        <div className="mb-6 flex items-center justify-center gap-2 text-pine">
          <Leaf size={20} strokeWidth={1.5} />
          <span className="font-serif text-lg tracking-tight">Arrowhead Explorers</span>
        </div>

        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-pine">
          {done ? (
            <div className="flex flex-col items-center gap-3 px-6 text-center text-cream">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-water">
                <Check size={24} className="text-pine" />
              </div>
              <p className="font-serif text-xl">
                {done.action === "in" ? "Welcome" : "See you next time"}, {done.family} family!
              </p>
            </div>
          ) : family ? (
            <div className="flex w-full flex-col items-center gap-3 px-6 text-center text-cream">
              <p className="font-serif text-xl">
                {action === "in" ? "Good morning" : "Heading home"}, {family.name} family
              </p>

              <div className="mt-1 flex flex-wrap justify-center gap-2">
                {relevantChildren.map((c) => {
                  const included = !excluded.has(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleChild(c.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        included
                          ? "border-water bg-water text-pine"
                          : "border-cream/30 bg-transparent text-cream/50 line-through"
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
                {relevantChildren.length === 0 && (
                  <p className="text-sm text-cream/70">
                    {action === "in" ? "Everyone is already signed in." : "No one to sign out."}
                  </p>
                )}
              </div>
              {relevantChildren.length > 1 && (
                <p className="text-xs text-water/80">Tap a name to leave them off</p>
              )}

              <div className="mt-1 flex flex-wrap justify-center gap-1.5">
                {BY_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setBy(by === o ? "" : o)}
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      by === o ? "bg-cream text-pine" : "bg-cream/15 text-cream/70"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-cream/50">
                Who&apos;s {action === "in" ? "dropping off" : "picking up"}? (optional)
              </p>

              {error && <p className="text-sm text-[#E8A0B0]">{error}</p>}

              <div className="mt-1 flex gap-3">
                <button onClick={reset} className="rounded-full border border-cream/30 px-5 py-2 text-sm text-cream/80">
                  Cancel
                </button>
                <button
                  onClick={confirm}
                  disabled={pending || relevantChildren.filter((c) => !excluded.has(c.id)).length === 0}
                  className="rounded-full bg-cream px-6 py-2 text-sm font-medium text-pine disabled:opacity-50"
                >
                  {pending ? "Saving…" : action === "in" ? "Sign in" : "Sign out"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-cream/80">
              <Users size={44} strokeWidth={1.25} />
              <p className="font-serif text-lg">Tap your family below</p>
              <p className="text-xs text-water">to sign everyone in or out</p>
            </div>
          )}
        </div>

        {unlocked && !family && (
          <div className="mt-5 space-y-2">
            {roster.map((f) => {
              const anyIn = f.children.some((c) => c.isIn);
              const inKids = f.children.filter((c) => c.isIn);
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setDone(null);
                    setSelectedId(f.id);
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${anyIn ? "bg-pine" : "bg-wood/40"}`} />
                    <span className="font-medium text-charcoal">{f.name} family</span>
                  </div>
                  <span className="text-xs text-charcoal-light">
                    {anyIn
                      ? `${inKids.map((c) => c.name).join(" & ")} here${inKids[0]?.since ? ` · ${inKids[0].since}` : ""}`
                      : `${f.children.map((c) => c.name).join(" & ")} not here yet`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
