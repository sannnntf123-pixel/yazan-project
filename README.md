# Momentum Physics Academy

Next.js (App Router) + TypeScript + Tailwind CSS v4 web application for **Momentum Physics Academy** — student registration that opens WhatsApp with the application details pre-filled (no backend).

Migrated from the original Vite + React app; components, styling and behaviour are unchanged.

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Project layout

```
src/
  app/                 Next.js entry: layout (fonts, metadata), page, globals.css
  App.tsx              Composes the single-page site from sections + modals (client component)
  components/
    layout/            Header, Footer
    sections/          One component per landing section (Hero, About, Courses, ...)
    ui/                Shared primitives: Container, SectionHeading, Modal, FormField
    *.tsx              Feature components (EnrollmentForm, PricingCalculator, PhysicsSandbox, ...)
    admin/             Login form, CMS dashboard, section editors
  app/admin/           /admin route + server actions (login, save, reset)
  data/                Default content: courses, services, testimonials, FAQ, defaultContent.ts
  config/              formOptions.ts (enrollment selects), site.ts
  hooks/               useEnrollmentForm, useHashView, useSmoothAnchorScroll, useCopyToClipboard
  lib/                 content-store.ts (JSON file), content-schema.ts (zod), auth.ts, whatsapp.ts
  types/ utils/
content/site-content.json   Written by the CMS (gitignored)
```

Conventions: imports use the `@/` alias; static copy lives in `data/`, tunable values in `config/`;
components take callbacks as props rather than reaching for global state.

## Admin CMS (`/admin`)

All visitor-facing content (hero, about, courses, services, pricing, testimonials, FAQ, payment
details, footer, WhatsApp number) is editable at `/admin`. Edits are saved to
`content/site-content.json` and published to the live site immediately; anything not overridden
falls back to `src/data/defaultContent.ts`.

Credentials and the cookie-signing secret come from environment variables:

```
cp .env.example .env.local   # then change ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET
```

Sessions are HttpOnly signed cookies (7 days); logins are throttled to 5 failed attempts per
15 minutes. The store needs a persistent filesystem (`next start` on a VPS or a Docker volume) —
on serverless hosts such as Vercel the filesystem is read-only, so `src/lib/content-store.ts`
would need to be pointed at a database or KV store.

## WhatsApp enrollment

The enrollment form has no server. On submit it opens `https://wa.me/<number>` with the form fields pre-filled; the number is set in the CMS under **Site & Contact**.
