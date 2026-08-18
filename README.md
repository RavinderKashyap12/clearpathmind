# Clearpath Website

Production build for the Clear Path Behavioral Health website — a psychiatric
outpatient clinic in Orange County, CA offering medication management, psychotherapy,
and telehealth.

Built with [Astro](https://astro.build/) and a JSON-based content layer, deployed on
Netlify. Lead capture is **forms-only** (no phone numbers): forms POST to Netlify
Functions that validate, block bots, email a notification via Mailgun, and forward
leads to CallTrackingMetrics.

## Tech Stack

- **Framework:** Astro
- **Styling:** Tailwind CSS (utility classes in `.astro` components)
- **Content:** JSON files under `src/content/` (no external database)
- **Forms UI:** React island (`src/components/Form.tsx`)
- **Forms backend:** Netlify Functions (`netlify/functions/`) + Mailgun + CallTrackingMetrics
- **Validation:** `zod`
- **Hosting:** Netlify
- **Analytics:** Google Tag Manager

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (ships with Node)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars and fill them in (see "Forms & API" below)
cp .env.example .env

# 3. Start the local dev server (http://localhost:4321)
npm run dev
```

To exercise the form API routes locally you need the Netlify CLI, which runs the
functions alongside the Astro dev server:

```bash
npm i -g netlify-cli
netlify dev
```

## Available Scripts

| Command           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start the local dev server with hot reload         |
| `npm run start`   | Alias for `npm run dev`                            |
| `npm run build`   | Type-check (`astro check`) and build to `dist/`    |
| `npm run preview` | Preview the production build locally               |
| `npm run astro`   | Run the Astro CLI directly                         |

## Project Structure

```
netlify/
└── functions/       # Serverless form handlers (contact, verify-insurance, ...)
    └── _lib/        # Shared Mailgun + CTM helpers (not deployed as a function)
src/
├── components/      # Reusable UI and section components (.astro)
│   └── forms/       # React form islands: ContactForm, VerifyInsuranceForm, FormConsent
├── content/         # Page content as JSON (programs, treatments, home, etc.)
│   └── programs/    # Program pages (medication-management, psychotherapy, telehealth)
├── layouts/         # Shared page shells (MainLayout.astro)
├── pages/           # Routes; [slug].astro renders program pages from content
├── styles/          # Global CSS
└── utils/           # Data-mapping helpers
```

## Forms & API

The forms follow a shared reference pattern: two React
form islands (`src/components/forms/`) POST to two Netlify Functions
(`netlify/functions/`). The pretty `/api/*` paths are proxied to
`/.netlify/functions/*` via `public/_redirects`.

| Form (component)                          | Endpoint                     | Fields |
| ----------------------------------------- | ---------------------------- | ------ |
| Contact (`ContactForm.tsx`)               | `POST /api/contact`          | first_name, last_name, phone, email?, insurance?, message?, sms_consent, marketing_sms_consent |
| Verify Insurance (`VerifyInsuranceForm.tsx`) | `POST /api/verify-insurance` | first_name, last_name, phone, email?, dob_month/day/year, insurance, policy_number, sms_consent, marketing_sms_consent |

Both forms share `FormConsent.tsx` (dual TCPA SMS consent) and include a hidden
`honeypot` input. `Form.astro` (used on program pages) and `ContactHero.astro` render
these components with `client:load`.

Every submission runs through the same pipeline: **zod validation (422 on failure) →
honeypot check (filled → `{ ok: true }` silently) → Mailgun notification (500 if
unconfigured or on send failure) → CTM forward → `{ ok: true }`.** On any failure the
UI shows an email-us fallback (no phone number). The lead's own phone is captured and
included in the internal notification email so staff can call them back.

### Environment variables

Copy `.env.example` to `.env` (local) and set the same values in **Netlify → Site
settings → Environment variables** (production). If the Mailgun vars are missing the
routes return **503** so the UI shows the email-us fallback instead of faking success.

```
MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_REGION, NOTIFICATION_EMAIL,
EMAIL_FROM_NAME, EMAIL_FROM_ADDRESS          # email (required)
CONTACT_URL, VERIFY_INSURANCE_URL            # CTM Form Reactor URLs (optional)
```

## Editing Content

Page copy, SEO metadata, and structured data live in the JSON files under
`src/content/`. For program pages, each file in `src/content/programs/` maps to a
route via `src/pages/program/[slug].astro`.

- **SEO title / description:** `seo.metaTitle` and `seo.metaDescription`. These
  also drive the Open Graph and Twitter Card tags in `MainLayout.astro`.
- **Per-page JSON-LD schema:** add a `jsonLd` object to a program's JSON file;
  `[slug].astro` renders it as a `<script type="application/ld+json">` tag only
  when present, keeping schema page-scoped.

## Admin / CMS (Decap CMS)

The site ships with a Git-based content editor so non-technical users can log in and
edit content through a UI. It is served entirely from static files — no separate
server.

- **Login URL:** `https://<your-site>/admin/`
- **Editor UI:** `public/admin/index.html` (loads Decap CMS + the Netlify Identity widget)
- **Collections / fields config:** `public/admin/config.yml`
- **Backend:** `git-gateway` on the `main` branch — edits are committed straight to Git,
  which triggers a rebuild/redeploy.
- **Login widget:** the Netlify Identity widget is loaded site-wide from
  `MainLayout.astro`; after login (or when opening an `#invite_token` / `#recovery_token`
  link) the user is redirected to `/admin/`.
- `/admin/` is disallowed in `robots.txt` and the editor page is `noindex`, so it stays
  out of search results.

### Enabling logins (one-time Netlify dashboard setup)

Git Gateway needs Netlify Identity, which is configured in the Netlify dashboard, not in
this repo:

1. **Site configuration → Identity → Enable Identity.**
2. **Identity → Services → Git Gateway → Enable Git Gateway** (authorizes commits to the repo).
3. Set **Registration** to **Invite only** (recommended for a private admin).
4. **Identity → Invite users** — enter each editor's email. They receive an invite email,
   click the link (which lands on the site with `#invite_token=…`), set a password, and are
   redirected to `/admin/`.
5. Existing/returning editors just visit `/admin/` and log in with their email + password.

> There are no hard-coded credentials in the codebase — accounts are managed under
> **Netlify → Identity**. To reset a password, use "Forgot password?" on the login widget
> or re-invite the user from the dashboard.

## SEO & AEO

- `public/robots.txt` allows major search and AI/LLM crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, etc.) and points to the XML sitemap.
- XML sitemaps are generated (`sitemap.xml`, page/post sitemaps) and an HTML sitemap
  lives at `/sitemap`.
- Canonical URLs, Open Graph/Twitter tags, and `MedicalBusiness` JSON-LD are emitted
  from `MainLayout.astro`; program pages can add page-scoped JSON-LD.

## Deployment

Pushing to the production branch triggers a Netlify build that runs `npm run build`,
publishes the `dist/` directory, and deploys the functions in `netlify/functions/`.
Set the environment variables above in the Netlify dashboard before going live.
