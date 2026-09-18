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
  data/                Static content: courses, services, testimonials, FAQ, nav links
  config/              site.ts (brand, WhatsApp), pricing.ts, bankDetails.ts (+ form option lists)
  hooks/               useEnrollmentForm, useHashView, useSmoothAnchorScroll, useCopyToClipboard
  lib/                 whatsapp.ts — builds wa.me deep links for enrollment submissions
  types/ utils/
```

Conventions: imports use the `@/` alias; static copy lives in `data/`, tunable values in `config/`;
components take callbacks as props rather than reaching for global state.

## WhatsApp enrollment

The enrollment form has no server. On submit it opens `https://wa.me/<ACADEMY_WHATSAPP>` with the form fields pre-filled; the number lives in `src/config/site.ts` (`ACADEMY_WHATSAPP`).
