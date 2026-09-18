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
  app/            Next.js entry: layout (fonts, metadata), page, globals.css
  App.tsx         Single-page application shell (client component)
  components/     UI sections, forms, canvas simulations
  hooks/          useEnrollmentForm
  services/       whatsapp.ts — builds the wa.me deep link for enrollment submissions
  config/ types/ utils/
```

## WhatsApp enrollment

The enrollment form has no server. On submit it opens `https://wa.me/<ACADEMY_WHATSAPP>` with the form fields pre-filled; the number lives in `src/config/bankDetails.ts` (`ACADEMY_WHATSAPP`).
