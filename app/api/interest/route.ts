import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InterestPayload = {
  parentName?: string;
  email?: string;
  phone?: string;
  childName?: string;
  childAge?: string;
  childDob?: string;
  desiredStart?: string;
  desiredSchedule?: string;
  preferredDays?: string[];
  schoolName?: string;
  message?: string;
  consent?: boolean;
  company?: string; // honeypot
  submittedAt?: string;
};

const NOTIFY_EMAIL = process.env.INTEREST_NOTIFY_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Arrowhead Explorers <onboarding@resend.dev>";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Formspree: the simplest way to get inquiries into an inbox. The form ID is a
// public value (not a secret), so it can live here or in an env var. Create a
// form at formspree.io, set its notification email, and drop the id in.
const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID || "";

// Web3Forms: no account needed — enter an email at web3forms.com, get an access
// key by return email, and every submission is forwarded to that inbox. The key
// can only send mail to its own registered address, so it's low-sensitivity.
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(data: InterestPayload): { subject: string; html: string; text: string } {
  const fields: [string, unknown][] = [
    ["Parent / Guardian", data.parentName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Child's Name", data.childName],
    ["Child's Age", data.childAge],
    ["Child's DOB", data.childDob],
    ["Desired Start", data.desiredStart],
    ["Desired Schedule", data.desiredSchedule],
    ["Preferred Days", (data.preferredDays || []).join(", ")],
    ["School Name", data.schoolName],
    ["Message", data.message],
    ["Submitted", data.submittedAt],
  ];

  const rows = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#3E3E3A;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;color:#3E3E3A">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#F7F3EB;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#FCFBF8;border-radius:16px;overflow:hidden;border:1px solid #D8C7AE">
        <div style="background:#6F7A55;color:#F7F3EB;padding:20px 24px;font-size:18px;font-weight:700">
          🌲 New Interest List Inquiry
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
      </div>
    </div>`;

  const text = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return {
    subject: `New Interest Inquiry — ${data.parentName || "Arrowhead Explorers"}`,
    html,
    text,
  };
}

async function sendViaResend(data: InterestPayload) {
  const { subject, html, text } = buildEmail(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      reply_to: data.email,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

async function sendViaWeb3Forms(data: InterestPayload) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Interest Inquiry — ${data.parentName || "Arrowhead Explorers"}`,
      from_name: "Arrowhead Explorers Website",
      replyto: data.email,
      "Parent / Guardian": data.parentName,
      Email: data.email,
      Phone: data.phone,
      "Child's Name": data.childName,
      "Child's Age": data.childAge,
      "Child's DOB": data.childDob,
      "Desired Start": data.desiredStart,
      "Desired Schedule": data.desiredSchedule,
      "Preferred Days": (data.preferredDays || []).join(", "),
      "School Name": data.schoolName,
      Message: data.message,
      Submitted: data.submittedAt,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Web3Forms error ${res.status}: ${detail}`);
  }
}

async function sendViaFormspree(data: InterestPayload) {
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `New Interest Inquiry — ${data.parentName || "Arrowhead Explorers"}`,
      _replyto: data.email,
      "Parent / Guardian": data.parentName,
      Email: data.email,
      Phone: data.phone,
      "Child's Name": data.childName,
      "Child's Age": data.childAge,
      "Child's DOB": data.childDob,
      "Desired Start": data.desiredStart,
      "Desired Schedule": data.desiredSchedule,
      "Preferred Days": (data.preferredDays || []).join(", "),
      "School Name": data.schoolName,
      Message: data.message,
      Submitted: data.submittedAt,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Formspree error ${res.status}: ${detail}`);
  }
}

async function saveToSupabase(data: InterestPayload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/interest_inquiries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      parent_name: data.parentName,
      email: data.email,
      phone: data.phone,
      child_name: data.childName,
      child_age: data.childAge,
      child_dob: data.childDob || null,
      desired_start: data.desiredStart || null,
      desired_schedule: data.desiredSchedule,
      preferred_days: data.preferredDays,
      school_name: data.schoolName,
      message: data.message,
      submitted_at: data.submittedAt || new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase error ${res.status}: ${detail}`);
  }
}

export async function POST(request: Request) {
  let data: InterestPayload;
  try {
    data = (await request.json()) as InterestPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept and drop.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  // Basic validation.
  if (!data.parentName || !data.email || !data.consent) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, email, and consent." },
      { status: 400 },
    );
  }

  const providers: { name: string; run: Promise<void> }[] = [];
  if (WEB3FORMS_ACCESS_KEY) providers.push({ name: "web3forms", run: sendViaWeb3Forms(data) });
  if (FORMSPREE_FORM_ID) providers.push({ name: "formspree", run: sendViaFormspree(data) });
  if (RESEND_API_KEY && NOTIFY_EMAIL) providers.push({ name: "resend", run: sendViaResend(data) });
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) providers.push({ name: "supabase", run: saveToSupabase(data) });

  // No provider configured yet — accept in "demo mode" so the site is usable
  // out of the box. Set WEB3FORMS_ACCESS_KEY or FORMSPREE_FORM_ID (simplest), or
  // connect Resend/Supabase, before sharing the site so inquiries are delivered.
  if (providers.length === 0) {
    console.warn(
      "[interest] No delivery provider configured. Inquiry received but NOT persisted:",
      JSON.stringify(data),
    );
    return NextResponse.json({ ok: true, persisted: false });
  }

  // Run every configured provider independently. As long as one succeeds the
  // inquiry is safely captured, so a single misconfigured provider (e.g. a
  // shared Supabase env pointing at a missing table) can't take the whole form
  // down — which is exactly what Promise.all would do.
  const results = await Promise.allSettled(providers.map((p) => p.run));
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[interest] provider "${providers[i].name}" failed:`, result.reason);
    }
  });

  const delivered = results.some((result) => result.status === "fulfilled");
  if (!delivered) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your inquiry. Please try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, persisted: true });
}
