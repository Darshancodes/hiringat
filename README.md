# hiringat

**A Linktree-style hiring page for growing companies.**

`hiringat` lets a company publish a polished hiring page in minutes, share every open role through one link, collect tailored applications, and review candidates in a simple dashboard.

This repository is a fast, local-first v0 built to demonstrate the complete flow without authentication, payments, or database setup.

## Features

- Create a branded company hiring page
- Publish one or more open roles
- Add custom application questions per role
- Share a clean public URL such as `/acme-ai`
- Collect candidate names, emails, and answers
- Review every application in a company dashboard
- Copy the public hiring link after publishing
- Use the seeded **Acme AI** page immediately
- Responsive, minimal SaaS interface

## Demo Flow

1. Visit `/create` and enter the company details.
2. Add roles and customize their application questions.
3. Publish the page and share the generated company URL.
4. Open a role on the public page and submit an application.
5. Visit `/{company}/applications` to review candidates.

The included demo company is available at `/acme-ai` with two sample roles.

## Tech Stack

- [Next.js](https://nextjs.org/) App Router
- [React](https://react.dev/) 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Tabler Icons](https://tabler.io/icons)
- Local JSON file storage

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/create` | Company and role builder |
| `/{company}` | Public hiring page |
| `/{company}/applications` | Candidate applications dashboard |

## Project Structure

```text
app/
  [company]/
    applications/       # Applications dashboard
    actions.ts           # Application server action
    page.tsx             # Public company page
  create/                # Company builder and server action
  globals.css            # Global styles and shared utilities
  layout.tsx             # Root layout and navigation
  page.tsx               # Landing page
components/
  application-form.tsx   # Candidate application modal
  company-builder.tsx    # Dynamic company and roles form
  hiring-page.tsx        # Public hiring page interface
data/
  store.json             # Seed data and local persistence
lib/
  store.ts               # JSON storage helpers
  types.ts               # Shared data types
  utils.ts               # Slug and initials helpers
```

## Data Storage

Companies, roles, and applications are stored in [`data/store.json`](data/store.json). Next.js server actions read from and write to this file, so data persists between local page refreshes and development server restarts.

This approach is deliberate for a zero-setup demo. Deployments using ephemeral or read-only filesystems will need a persistent database such as SQLite, PostgreSQL, or a hosted data service.

## Current Limitations

- No authentication or access control
- Application dashboards are publicly reachable
- No email notifications
- No file or resume uploads
- No duplicate slug handling beyond replacing an existing company
- File-backed storage is not designed for concurrent production traffic

## Possible Next Steps

- Add company accounts and protected dashboards
- Move persistence to PostgreSQL or SQLite
- Add resume uploads and candidate status tracking
- Send application confirmation and team notification emails
- Add custom domains, themes, and analytics

---

Built as a focused v0 for testing the idea: one beautiful link for every role a company is hiring for.
