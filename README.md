# Arrowhead Explorers

A polished, mobile-first website for **Arrowhead Explorers** — a nature-inspired
home childcare program in North Waterboro, Maine (Lake Arrowhead community).

> _Growing Curious Minds Through Nature & Play._

The site's primary goal is to **generate parent inquiries and build an interest
list** while the program is in its planning / licensing-preparation phase.

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Structure:** single scrolling page with anchored sections (Home, About,
  Programs, Activities, Tuition, Parent Info, FAQ, Interest List). Everything is
  built from small, reusable components and data files, so it can grow into a
  multi-page site later without a rewrite.

---

## Table of contents

1. [Quick start (run it locally)](#quick-start-run-it-locally)
2. [Editing your content](#editing-your-content) — the important part for Meg
   - [Tuition / pricing](#tuition--pricing)
   - [Hours & days](#hours--days)
   - [Programs, activities, FAQ, policies](#programs-activities-faq-policies)
   - [Replacing the logo & photos](#replacing-the-logo--photos)
3. [Connecting the Interest form](#connecting-the-interest-form)
4. [Deploying to Vercel](#deploying-to-vercel)
5. [Project structure](#project-structure)
6. [Before you open — final checklist](#before-you-open--final-checklist)

---

## Quick start (run it locally)

You'll need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
npm install       # install dependencies (first time only)
npm run dev       # start the local dev server
```

Then open **http://localhost:3000** in your browser. The page updates
automatically as you save changes.

Other commands:

```bash
npm run build     # create an optimized production build
npm run start     # run the production build locally
npm run lint      # check for code issues
```

---

## Editing your content

**Almost all of the words, prices, hours, and lists on the site live in the
`data/` folder** — plain text files you can edit without touching the design.
After you save a file, the site updates automatically (in `npm run dev`).

| File | What it controls |
| --- | --- |
| `data/site.ts` | Business name, tagline, location, contact email, hours, the "Coming Soon" notice bar, hero text |
| `data/pricing.ts` | Tuition rates and pricing mode |
| `data/programs.ts` | The program cards (Little Explorers, Explorers, Adventure Club, Summer) |
| `data/activities.ts` | The activities lists (Nature, Creative, Learning, Outdoor) |
| `data/features.ts` | The "Why Families Choose Arrowhead" cards |
| `data/faq.ts` | The FAQ questions and answers |
| `data/policies.ts` | Parent info, payment, late fee, holidays/closures, and the daily rhythm |

Search the files for `TODO` to find every detail that should be confirmed before
opening.

### Tuition / pricing

Open **`data/pricing.ts`**. You can run tuition in either of two ways — change
the one line near the top:

```ts
export const pricingMode: PricingMode = "schedule-based";
```

- **`"schedule-based"`** (current) — one simple table: 2 / 3 / 4 days per week.
  Edit the numbers in `scheduleBasedPricing`.
- **`"age-based"`** — separate rates for younger toddlers vs. preschool age.
  Edit the numbers in `ageBasedPricing`.

The website automatically shows whichever one you pick. All prices display an
"approx." qualifier and a disclaimer that rates are proposed and subject to final
enrollment agreements.

### Hours & days

Open **`data/site.ts`** and edit the `hours` section. The proposed schedule is
Monday–Thursday, 7:00 AM–5:00 PM, with Friday closed. Change the `schedule`
array (set `closed: true/false` and the open/close times) and the `summary` /
`timeRange` text. The homepage schedule card and the Parent Info section both
read from here.

To change the **late-pickup fee**, edit `lateFee` in `data/policies.ts`.

### Programs, activities, FAQ, policies

These are all lists you can add to, remove from, or reword:

- **Programs** — `data/programs.ts`. Each program has a name, age range, tagline,
  and a `focus` list. The `status` field shows a badge: `"planned"` → "Coming
  Soon", `"future"` → "Future Program".
- **Activities** — `data/activities.ts`. Grouped by theme; each group is a list
  of activity chips.
- **FAQ** — `data/faq.ts`. A list of `{ question, answer }`.
- **Policies / Parent Info / Daily Rhythm** — `data/policies.ts`.

### Replacing the logo & photos

**Logo.** A placeholder logo lives at `public/logo.svg`. To use your real logo:

- **Easiest:** save your logo as `public/logo.svg` (overwrite the file). Done.
- **Using a PNG:** drop your file in `public/` (e.g. `public/logo.png`) and open
  `components/Logo.tsx`, then change `LOGO_SRC` to `"/logo.png"`.
- If your logo file **already includes the words "Arrowhead Explorers"**, set
  `LOGO_INCLUDES_WORDMARK = true` in `components/Logo.tsx` so the name isn't
  shown twice next to the logo.

The favicon (browser-tab icon) is `app/icon.svg`, and the social-share preview
image is generated in `app/opengraph-image.tsx` — update those to match if you
like.

**Photos.** For v1 the site uses tasteful on-brand illustrations and placeholders
(no stock photos needed). When you have real photos:

1. Put your images in `public/images/` (create the folder).
2. Replace a `<PhotoPlaceholder />` or the hero illustration (`HeroArt`) with an
   image, for example:
   ```tsx
   <img src="/images/meg.jpg" alt="Meg, owner of Arrowhead Explorers"
        className="h-full w-full rounded-3xl object-cover" />
   ```

Every spot that's ready for a real photo is marked with a comment in the code
(search for `PHOTO` or `PhotoPlaceholder`). Good photos to gather: outdoor/nature
play, gardening, reading, painting, sensory play, and warm home-like spaces.

---

## Connecting the Interest form

Out of the box, the form **works in "demo mode"**: it shows the friendly
confirmation message, but it does **not** save or send the inquiry anywhere. Pick
**one** option below before you start sharing the site so you actually receive
inquiries.

First, copy the example environment file:

```bash
cp .env.example .env.local
```

Then fill in one of these in `.env.local`:

### Option A — Resend (recommended: emails each inquiry to your inbox)

1. Sign up free at [resend.com](https://resend.com).
2. Create an API key and paste it as `RESEND_API_KEY`.
3. Set `INTEREST_NOTIFY_EMAIL` to the address that should receive inquiries
   (e.g. `lacexplorers@gmail.com`).
4. For real sending you'll verify a domain in Resend and set `RESEND_FROM_EMAIL`
   to an address on that domain. (For quick testing you can use
   `onboarding@resend.dev`.)

### Option B — Supabase (stores every inquiry in a database table)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run:
   ```sql
   create table interest_inquiries (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     parent_name text,
     email text,
     phone text,
     child_name text,
     child_age text,
     child_dob date,
     desired_start date,
     desired_schedule text,
     preferred_days text[],
     school_name text,
     message text,
     submitted_at timestamptz
   );
   ```
3. In `.env.local`, set `SUPABASE_URL` (Project URL) and
   `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → **service_role** key).
   Keep the service-role key private — never commit it or expose it in the
   browser.

### Option C — Formspree (simplest, no backend)

1. Create a free form at [formspree.io](https://formspree.io) and copy its
   endpoint URL (e.g. `https://formspree.io/f/abcdwxyz`).
2. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local`. When set, the form posts
   directly to Formspree.

> You can even use A **and** B together — if both Resend and Supabase are
> configured, each inquiry is emailed to you _and_ saved to the database.

---

## Deploying to Vercel

[Vercel](https://vercel.com) is the easiest way to put this online (free tier is
plenty for this site).

1. Push this project to a GitHub repository.
2. Go to Vercel → **Add New… → Project** and import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. Add your environment variables under **Project → Settings → Environment
   Variables** (the same keys from `.env.local`). Set
   `NEXT_PUBLIC_SITE_URL` to your live URL.
5. (Optional) Add a custom domain under **Project → Settings → Domains**.

Every time you push to GitHub, Vercel redeploys automatically.

---

## Project structure

```
app/
  layout.tsx          # site metadata (SEO), fonts, LocalBusiness/ChildCare schema
  page.tsx            # composes all the sections in order
  globals.css         # global styles + scroll-reveal + reduced-motion support
  icon.svg            # favicon
  opengraph-image.tsx # social share preview image
  sitemap.ts          # /sitemap.xml
  robots.ts           # /robots.txt
  api/interest/route.ts  # handles form submissions (Resend / Supabase / demo)

components/            # reusable UI (Navbar, Hero, ProgramCard, InterestForm, …)

data/                  # ← all editable business content lives here

public/
  logo.svg            # brand mark (replaceable)
```

**SEO** is set up with page metadata, Open Graph / Twitter cards, a sitemap,
robots.txt, FAQ structured data, and truthful LocalBusiness/ChildCare structured
data (kept honest for the pre-opening phase).

**Accessibility & performance:** semantic HTML, labeled form fields, keyboard
focus styles, `prefers-reduced-motion` support, and lightweight self-contained
illustrations (no external image requests).

---

## Before you open — final checklist

The site is intentionally honest about being in the planning/licensing phase.
When things are finalized, update:

- [ ] `data/site.ts` → set `status.comingSoon` to `false` and update the notice
      bar / hero badge / phase language.
- [ ] `data/faq.ts` → update the "Are you licensed?" answer.
- [ ] Confirm final **hours**, **tuition**, **late fee**, **holidays**, and
      **meal** details (search the `data/` files for `TODO`).
- [ ] Add your real **phone number** and **Facebook URL** in `data/site.ts`.
- [ ] Replace the **logo** and add real **photos**.
- [ ] Connect the **Interest form** (see above) and send yourself a test inquiry.

Everything on the site currently uses careful language ("proposed", "planned",
"coming soon", "future program", "interest list") and avoids unverified claims
about licensing, certifications, transportation, meals, or guaranteed enrollment.
Please keep it that way until each item is confirmed.
