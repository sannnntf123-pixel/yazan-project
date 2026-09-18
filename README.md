# Momentum Physics Academy

Next.js (App Router) + TypeScript + Tailwind CSS v4 web application for **Momentum Physics Academy** — student registration with a Google Sheets backend via Google Apps Script and automated onboarding emails.

Migrated from the original Vite + React app; components, styling and behaviour are unchanged.

## Getting started

```bash
npm install
cp .env.example .env   # then set NEXT_PUBLIC_GOOGLE_SCRIPT_URL
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
  services/       googleSheets.ts — POSTs enrollments to the Apps Script web app
  config/ types/ utils/
Code.gs           Google Apps Script backend (paste into Sheets → Extensions → Apps Script)
```

## Google Sheets integration

Until `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` is set to a deployed Apps Script web-app URL, the enrollment form runs in *Preview Demo Mode* (payload is logged to the console and the success screen is shown).

See [README_GOOGLE_SHEETS_SETUP.md](./README_GOOGLE_SHEETS_SETUP.md) for the full setup: creating the sheet, deploying `Code.gs`, and the `onEdit` trigger that emails students when their status is set to **Paid**.
