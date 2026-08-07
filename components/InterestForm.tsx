"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Icon } from "./Icon";

const scheduleOptions = [
  "2 days / week",
  "3 days / week",
  "4 days / week",
  "Before School",
  "After School",
  "Before & After School",
  "Summer Program",
  "Just interested / updates",
];

const preferredDayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday"];

const labelCls = "block text-sm font-medium text-charcoal";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-beige bg-offwhite px-4 py-2.5 text-charcoal placeholder:text-charcoal-light/50 transition focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30";

type Status = "idle" | "submitting" | "success" | "error";

export function InterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real people leave this empty.
    if (fd.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      parentName: fd.get("parentName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      childName: fd.get("childName"),
      childAge: fd.get("childAge"),
      childDob: fd.get("childDob"),
      desiredStart: fd.get("desiredStart"),
      desiredSchedule: fd.get("desiredSchedule"),
      preferredDays: fd.getAll("preferredDays"),
      schoolName: fd.get("schoolName"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      submittedAt: new Date().toISOString(),
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      const res = formspree
        ? await fetch(formspree, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/interest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(
        `Sorry — something went wrong sending your inquiry. Please email us directly at ${site.contact.email} and we'll be in touch.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-beige/60 bg-white p-8 text-center shadow-card sm:p-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-cream">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.2} />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-charcoal">
          Thanks for reaching out!
        </h3>
        <p className="mt-3 max-w-md text-charcoal-light">
          We&rsquo;re excited to learn more about your family and will be in touch
          as enrollment details become available.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-sage-dark underline underline-offset-4 hover:text-sage"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-beige/60 bg-white p-6 shadow-card sm:p-8"
      noValidate
    >
      {/* Honeypot (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5">
        <div>
          <label htmlFor="parentName" className={labelCls}>
            Parent / Guardian Name <span className="text-sage">*</span>
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelCls}>
              Email <span className="text-sage">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputCls}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputCls}
              placeholder="(207) 555-0123"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="childName" className={labelCls}>
              Child&rsquo;s Name
            </label>
            <input
              id="childName"
              name="childName"
              type="text"
              className={inputCls}
              placeholder="Child's name"
            />
          </div>
          <div>
            <label htmlFor="childAge" className={labelCls}>
              Child&rsquo;s Age
            </label>
            <input
              id="childAge"
              name="childAge"
              type="text"
              className={inputCls}
              placeholder="e.g. 2 years"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="childDob" className={labelCls}>
              Child&rsquo;s Date of Birth
            </label>
            <input
              id="childDob"
              name="childDob"
              type="date"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="desiredStart" className={labelCls}>
              Desired Start Date
            </label>
            <input
              id="desiredStart"
              name="desiredStart"
              type="date"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="desiredSchedule" className={labelCls}>
            Desired Schedule
          </label>
          <select
            id="desiredSchedule"
            name="desiredSchedule"
            className={inputCls}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option…
            </option>
            {scheduleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className={labelCls}>Preferred Days</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {preferredDayOptions.map((day) => (
              <label
                key={day}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-beige bg-offwhite px-4 py-2 text-sm text-charcoal transition has-[:checked]:border-sage has-[:checked]:bg-sage-50 has-[:checked]:text-sage-dark"
              >
                <input
                  type="checkbox"
                  name="preferredDays"
                  value={day}
                  className="h-4 w-4 rounded border-beige text-sage focus:ring-sage/40"
                />
                {day}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="schoolName" className={labelCls}>
            School Name{" "}
            <span className="font-normal text-charcoal-light">
              (optional, for school-age children)
            </span>
          </label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            className={inputCls}
            placeholder="School name"
          />
        </div>

        <div>
          <label htmlFor="message" className={labelCls}>
            Anything you&rsquo;d like us to know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={inputCls}
            placeholder="Tell us a little about your family and what you're looking for…"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-charcoal-light">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-beige text-sage focus:ring-sage/40"
          />
          <span>
            I understand this is currently an interest inquiry and does not
            guarantee enrollment. <span className="text-sage">*</span>
          </span>
        </label>

        {status === "error" && (
          <p
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-7 py-3.5 text-base font-semibold text-cream shadow-card transition hover:bg-sage-dark hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : site.cta.primary}
          {status !== "submitting" && <Icon name="arrowRight" className="h-5 w-5" />}
        </button>

        <p className="text-center text-xs text-charcoal-light/70" aria-live="polite">
          We&rsquo;ll only use your information to follow up about Arrowhead
          Explorers.
        </p>
      </div>
    </form>
  );
}
