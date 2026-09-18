# Momentum Physics Academy - Student Registration & Google Sheets Integration

A high-performance React + TypeScript + Next.js web application for **Momentum Physics Academy** featuring a complete student enrollment workflow powered by Google Sheets and Google Apps Script.

---

## 🚀 Features Overview

- **AP & Tahsili Physics Curricula**: Tailored prep modules for AP Physics 1, AP Physics 2, AP Physics C Mechanics, AP Physics C E&M, and Tahsili Physics.
- **Complete Student Registration Form**: Sanitized & validated enrollment fields (Student Name, Email, Phone, Parent Contact, Country, Course, Study Mode, Preferred Batch, Payment Method, Notes).
- **Google Sheets Backend Integration**: Direct POST requests via `googleSheets.ts` service to Google Apps Script.
- **Admin Status Tracking**: Automatic row appending with default status `Pending Payment`.
- **Registration Success Page (`/registration-success`)**:
  - Payment instructions tailored to Cash or IBAN Bank Transfer (Al Rajhi Bank, IBAN `SA37 1000 0011 1003 7585 5900`).
  - 1-Click WhatsApp Transfer Notification ("I've Sent the Transfer").
  - Onboarding roadmap for Microsoft Teams invitation, course schedule, formula handbook, and portal access.
- **Automated Welcome Email**: Google Apps Script `onEdit` trigger fires when Admin sets status to `Paid` in Google Sheets.

---

## 🛠️ Part 1: How to Deploy the Web Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Google Apps Script Web App URL:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec
   ```

3. **Build & Start**:
   ```bash
   npm run build
   npm run dev
   ```

---

## 📊 Part 2: Google Sheets & Apps Script Setup

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it **"Momentum Physics Enrollments"**.
3. Rename the first sheet tab to **"Enrollments"**.

### Step 2: Add Google Apps Script Code
1. In the top Google Sheets menu, click **Extensions ➔ Apps Script**.
2. Delete any default code and copy the contents from `/Code.gs` in this repository into the editor.
3. Click the **Save** disk icon.

### Step 3: Deploy as Web App
1. In the top right corner of Apps Script, click **Deploy ➔ New deployment**.
2. Click the gear icon (**Select type**) and choose **Web app**.
3. Configure the settings as follows:
   - **Description**: `Momentum Physics Enrollment Web App v1`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(CRITICAL: Must be set to "Anyone" so website visitors can submit forms!)*
4. Click **Deploy**.
5. Authorize permissions when prompted by Google.
6. Copy the generated **Web App URL** (ends in `/exec`).
7. Paste this URL into your `.env` file as `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.

---

## ✉️ Part 3: Automated Welcome Email Setup

When an Admin updates a student's status from **Pending Payment** to **Paid** inside Google Sheets, an automated Welcome Email is dispatched to the student:

1. In Google Apps Script, click the **Triggers** icon (Alarm clock on left sidebar).
2. Click **+ Add Trigger** (bottom right).
3. Configure:
   - **Choose function**: `onEditStatusTrigger`
   - **Event source**: `From spreadsheet`
   - **Event type**: `On edit`
4. Click **Save**.

Now, whenever an admin edits a student's status column to **Paid** in Google Sheets:
- The cell turns green.
- A branded Welcome Email containing Microsoft Teams live classroom links, course schedule, handbook links, and portal credentials is automatically emailed to the student!

---

## 🌐 Part 4: How to Buy & Connect a Custom Domain

To buy a custom domain name (e.g. `momentumphysics.com` or `momentumphysics.sa`):

1. **Choose a Domain Registrar**:
   - [Namecheap](https://www.namecheap.com) ($10 - $14/year)
   - [Cloudflare Registrar](https://www.cloudflare.com) (At-cost pricing)
   - [GoDaddy](https://godaddy.com)
   - [SaudiNIC (.sa)](https://nic.sa) for official Saudi national domains.

2. **Register Your Domain**:
   Search for `momentumphysics.com` or `momentumphysics.sa` and complete purchase.

3. **Point DNS Records**:
   In your domain registrar dashboard under **DNS Settings**, add a `CNAME` record:
   - **Type**: `CNAME`
   - **Host / Name**: `www` (or `@`)
   - **Target**: Your Cloud Run / AI Studio hosting domain URL.

---

## 📁 Repository Structure

```
├── .env.example                # Environment variables template
├── Code.gs                     # Complete Google Apps Script backend code
├── README_GOOGLE_SHEETS_SETUP.md # Detailed deployment & automation guide
├── src/
│   ├── config/
│   │   └── bankDetails.ts      # Bank info, courses, and schedules
│   ├── services/
│   │   └── googleSheets.ts     # Google Apps Script POST submission service
│   ├── hooks/
│   │   └── useEnrollmentForm.ts# Form state & validation hook
│   ├── utils/
│   │   └── validation.ts       # Input sanitization & field validators
│   ├── types/
│   │   └── enrollment.ts       # TypeScript interfaces
│   ├── components/
│   │   ├── EnrollmentForm.tsx  # Interactive student registration form
│   │   ├── RegistrationSuccess.tsx # Success view with IBAN & WhatsApp receipt
│   │   └── DomainSetupModal.tsx# Custom domain purchasing guide
│   └── App.tsx                 # Main application & routing logic
```
