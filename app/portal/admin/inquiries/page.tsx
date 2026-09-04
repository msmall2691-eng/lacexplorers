import { Mail, Phone, MessageSquare, Inbox } from "lucide-react";
import { getStaffSession } from "@/lib/portal/auth";
import { isDemoMode } from "@/lib/portal/store";

export const dynamic = "force-dynamic";

/**
 * Interest-list inquiries submitted from the marketing site (/api/interest),
 * read from the same Supabase project the portal uses. Staff-only: the admin
 * layout gates it, and we re-check the session here as defense in depth.
 */

type Inquiry = {
  id: string;
  parent_name: string | null;
  email: string | null;
  phone: string | null;
  child_name: string | null;
  child_age: string | null;
  child_dob: string | null;
  desired_start: string | null;
  desired_schedule: string | null;
  preferred_days: string[] | null;
  school_name: string | null;
  message: string | null;
  submitted_at: string | null;
  created_at: string;
};

function when(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center">
      <Inbox size={28} strokeWidth={1.5} className="text-wood/50" />
      <p className="max-w-xs text-sm text-charcoal-light">{children}</p>
    </div>
  );
}

export default async function InquiriesPage() {
  if (!(await getStaffSession())) return null;

  if (isDemoMode()) {
    return (
      <Empty>
        Interest-list sign-ups from the website will appear here once the site
        database is connected.
      </Empty>
    );
  }

  const { supabase } = await import("@/lib/portal/supabase-store");
  const { data, error } = await supabase()
    .from("interest_inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return <Empty>Couldn&apos;t load inquiries right now — please try again in a moment.</Empty>;
  }

  const inquiries = (data ?? []) as Inquiry[];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-charcoal-light">Interest list</p>
        <h1 className="font-serif text-2xl text-pine">
          {inquiries.length} {inquiries.length === 1 ? "inquiry" : "inquiries"}
        </h1>
      </div>

      {inquiries.length === 0 ? (
        <Empty>No inquiries yet. New sign-ups from the website will show up here.</Empty>
      ) : (
        <div className="space-y-3">
          {inquiries.map((q) => {
            const details = [
              q.desired_schedule,
              (q.preferred_days ?? []).join(", "),
              q.desired_start ? `start ${q.desired_start}` : "",
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <article key={q.id} className="rounded-2xl bg-white p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-serif text-lg text-pine">{q.parent_name || "Someone"}</h2>
                  <time className="shrink-0 text-xs text-charcoal-light">
                    {when(q.submitted_at || q.created_at)}
                  </time>
                </div>

                {(q.child_name || q.child_age) && (
                  <p className="mt-0.5 text-sm text-charcoal">
                    {q.child_name}
                    {q.child_name && q.child_age ? ", " : ""}
                    {q.child_age ? `age ${q.child_age}` : ""}
                  </p>
                )}

                {details && <p className="mt-1 text-sm text-charcoal-light">{details}</p>}
                {q.school_name && (
                  <p className="mt-1 text-sm text-charcoal-light">School: {q.school_name}</p>
                )}

                {q.message && (
                  <p className="mt-2 flex gap-2 rounded-xl bg-linen p-3 text-sm text-charcoal">
                    <MessageSquare size={16} className="mt-0.5 shrink-0 text-wood" />
                    <span>{q.message}</span>
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {q.email && (
                    <a
                      href={`mailto:${q.email}`}
                      className="inline-flex items-center gap-1.5 text-pine underline underline-offset-2"
                    >
                      <Mail size={14} /> {q.email}
                    </a>
                  )}
                  {q.phone && (
                    <a
                      href={`tel:${q.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-pine underline underline-offset-2"
                    >
                      <Phone size={14} /> {q.phone}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
