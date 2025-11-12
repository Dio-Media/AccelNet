# AccelNet

A monorepo for the **AccelNet** website and services supporting convergent research on **brain activity, expressive movement, and music**.

> This README is auto-generated from your uploaded repository snapshot and merged content brief.

---

## Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Data & Database](#data--database)
- [Content Map](#content-map)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project powers the AccelNet web presence: a Next.js/React frontend and a Node/Express backend (with MySQL) that publish activities, publications, grants, organizations, participants, and multimedia.

## Tech Stack

- **Frontend:** React / Next.js, TypeScript, Tailwind CSS (as applicable)
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Auth:** JWT or session-based (as applicable)
- **Deployment:** (fill in) – e.g., Vercel for frontend, Kinsta/Render/EC2 for backend, PlanetScale/RDS for MySQL

> Detected files and scripts:

=== AccelNet Repo Scan Summary ===

Directory tree (truncated):
AccelNet-main/
└─ AccelNet-main/
   ├─ accelnet-backend/
   │  ├─ config/
   │  │  ├─ db.js
   │  │  └─ envVars.js
   │  ├─ controllers/
   │  │  ├─ auth.controller.js
   │  │  ├─ events.controller.js
   │  │  ├─ news.controller.js
   │  │  ├─ participants.controller.js
   │  │  ├─ publications.controller.js
   │  │  └─ wg.controller.js
   │  ├─ middleware/
   │  │  └─ protect.route.js
   │  ├─ models/
   │  │  └─ user.model.js
   │  ├─ routes/
   │  │  ├─ auth.route.js
   │  │  ├─ events.route.js
   │  │  ├─ news.route.js
   │  │  ├─ participants.routes.js
   │  │  ├─ publications.route.js
   │  │  └─ wg.route.js
   │  ├─ uploads/
   │  │  └─ participants/
   │  │     └─ IPpfp.jpg
   │  ├─ utils/
   │  │  └─ generateToken.js
   │  └─ server.js
   ├─ accelnet-frontend/
   │  ├─ public/
   │  │  ├─ backgroundacn.jpg
   │  │  ├─ bg-lines.svg
   │  │  ├─ brain.svg
   │  │  └─ brainicon.png
   │  ├─ src/
   │  │  ├─ componets/
   │  │  │  ├─ ui/
   │  │  │  │  ├─ accordion.tsx
   │  │  │  │  ├─ alert-dialog.tsx
   │  │  │  │  ├─ alert.tsx
   │  │  │  │  ├─ aspect-ratio.tsx
   │  │  │  │  ├─ avatar.tsx
   │  │  │  │  ├─ badge.tsx
   │  │  │  │  ├─ breadcrumb.tsx
   │  │  │  │  ├─ button.tsx
   │  │  │  │  ├─ calendar.tsx
   │  │  │  │  ├─ card.tsx
   │  │  │  │  ├─ carousel.tsx
   │  │  │  │  ├─ chart.tsx
   │  │  │  │  ├─ checkbox.tsx
   │  │  │  │  ├─ collapsible.tsx
   │  │  │  │  ├─ command.tsx
   │  │  │  │  ├─ c...

## Repository Structure

```
AccelNet-main/
└─ AccelNet-main/
   ├─ accelnet-backend/
   │  ├─ config/
   │  │  ├─ db.js
   │  │  └─ envVars.js
   │  ├─ controllers/
   │  │  ├─ auth.controller.js
   │  │  ├─ events.controller.js
   │  │  ├─ news.controller.js
   │  │  ├─ participants.controller.js
   │  │  ├─ publications.controller.js
   │  │  └─ wg.controller.js
   │  ├─ middleware/
   │  │  └─ protect.route.js
   │  ├─ models/
   │  │  └─ user.model.js
   │  ├─ routes/
   │  │  ├─ auth.route.js
   │  │  ├─ events.route.js
   │  │  ├─ news.route.js
   │  │  ├─ participants.routes.js
   │  │  ├─ publications.route.js
   │  │  └─ wg.route.js
   │  ├─ uploads/
   │  │  └─ participants/
   │  │     └─ IPpfp.jpg
   │  ├─ utils/
   │  │  └─ generateToken.js
   │  └─ server.js
   ├─ accelnet-frontend/
   │  ├─ public/
   │  │  ├─ backgroundacn.jpg
   │  │  ├─ bg-lines.svg
   │  │  ├─ brain.svg
   │  │  └─ brainicon.png
   │  ├─ src/
   │  │  ├─ componets/
   │  │  │  ├─ ui/
   │  │  │  │  ├─ accordion.tsx
   │  │  │  │  ├─ alert-dialog.tsx
   │  │  │  │  ├─ alert.tsx
   │  │  │  │  ├─ aspect-ratio.tsx
   │  │  │  │  ├─ avatar.tsx
   │  │  │  │  ├─ badge.tsx
   │  │  │  │  ├─ breadcrumb.tsx
   │  │  │  │  ├─ button.tsx
   │  │  │  │  ├─ calendar.tsx
   │  │  │  │  ├─ card.tsx
   │  │  │  │  ├─ carousel.tsx
   │  │  │  │  ├─ chart.tsx
   │  │  │  │  ├─ checkbox.tsx
   │  │  │  │  ├─ collapsible.tsx
   │  │  │  │  ├─ command.tsx
   │  │  │  │  ├─ context-menu.tsx
   │  │  │  │  ├─ dialog.tsx
   │  │  │  │  ├─ drawer.tsx
   │  │  │  │  ├─ dropdown-menu.tsx
   │  │  │  │  ├─ form.tsx
   │  │  │  │  ├─ hover-card.tsx
   │  │  │  │  ├─ input-otp.tsx
   │  │  │  │  ├─ input.tsx
   │  │  │  │  ├─ label.tsx
   │  │  │  │  ├─ menubar.tsx
   │  │  │  │  ├─ navigation-menu.tsx
   │  │  │  │  ├─ pagination.tsx
   │  │  │  │  ├─ popover.tsx
   │  │  │  │  ├─ progress.tsx
   │  │  │  │  ├─ radio-group.tsx
   │  │  │  │  ├─ resizable.tsx
   │  │  │  │  ├─ scroll-area.tsx
   │  │  │  │  ├─ select.tsx
   │  │  │  │  ├─ separator.tsx
   │  │  │  │  ├─ sheet.tsx
   │  │  │  │  ├─ sidebar.tsx
   │  │  │  │  ├─ skeleton.tsx
   │  │  │  │  ├─ slider.tsx
   │  │  │  │  ├─ sonner.tsx
   │  │  │  │  ├─ switch.tsx
   │  │  │  │  ├─ table.tsx
   │  │  │  │  ├─ tabs.tsx
   │  │  │  │  ├─ textarea.tsx
   │  │  │  │  ├─ toggle-group.tsx
   │  │  │  │  ├─ toggle.tsx
   │  │  │  │  └─ tooltip.tsx
   │  │  │  ├─ Footer.jsx
   │  │  │  ├─ ImageWithFallback.tsx
   │  │  │  ├─ Layout.jsx
   │  │  │  └─ Navbar.jsx
   │  │  ├─ hooks/
   │  │  │  └─ use-mobile.ts
   │  │  ├─ lib/
   │  │  │  ├─ api.js
   │  │  │  └─ utils.ts
   │  │  ├─ pages/
   │  │  │  ├─ home/
   │  │  │  │  ├─ componets/
   │  │  │  │  │  ├─ DataVisualization.tsx
   │  │  │  │  │  ├─ Publications.tsx
   │  │  │  │  │  ├─ ResearchFindings.tsx
   │  │  │  │  │  ├─ ResearchHero.tsx
   │  │  │  │  │  ├─ ResearchMethodology.tsx
   │  │  │  │  │  └─ ResearchTeam.tsx
   │  │  │  │  └─ HomePage.tsx
   │  │  │  ├─ Events.jsx
   │  │  │  ├─ LoginPage.jsx
   │  │  │  ├─ News.jsx
   │  │  │  ├─ PublicationsPage.jsx
   │  │  │  ├─ SignUpPage.jsx
   │  │  │  └─ WgPage.jsx
   │  │  ├─ store/
   │  │  │  └─ useAuthStore.jsx
   │  │  ├─ App.jsx
   │  │  ├─ index.css
   │  │  └─ main.jsx
   │  ├─ .gitignore
   │  ├─ eslint.config.js
   │  ├─ index.html
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ postcss.config.js
   │  ├─ README.md
   │  ├─ tailwind.config.js
   │  ├─ tsconfig.json
   │  ├─ tsconfig.node.json
   │  └─ vite.config.js
   ├─ .env
   ├─ .gitignore
   ├─ package-lock.json
   ├─ package.json
   └─ README.md
```

> The above tree is truncated for readability.

## Getting Started

### Prerequisites
- Node.js LTS (>=18.x)
- npm or pnpm
- MySQL 8.x
- Git

### Setup

1. **Install dependencies** (run in each app where `package.json` exists):
   ```bash
   npm install
   ```

2. **Create `.env` files** (frontend and backend as needed). Example:
   ```bash
   # Backend (.env)
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=accelnet
   DB_PASSWORD=yourpassword
   DB_NAME=accelnet

   JWT_SECRET=replace_me
   CORS_ORIGIN=http://localhost:3000

   # Frontend (.env.local)
   NEXT_PUBLIC_API_BASE=http://localhost:4000/api
   ```

3. **Database**
   - Create schema and run migrations/seed scripts (see `/accelnet-backend/models` or `/db` if present).
   - Verify connectivity via a health route (e.g., `GET /api/health`).

4. **Run locally**
   ```bash
   # Backend (example)
   npm run dev  # or: node --watch server.js

   # Frontend (example)
   npm run dev
   ```

## Development

- **Linting/Format:** `npm run lint` / `npm run format` (if configured)
- **TypeScript:** Ensure `tsconfig.json` and `tsconfig.node.json` are valid.
- **Testing:** `npm test` (if configured)

## Environment Variables

Document all required variables for both apps. See the [Setup](#setup) section for a starter.

## API Routes

> Adjust to match your backend. Below is a typical layout used in AccelNet discussions.

- `GET /api/news` – list news  
- `GET /api/publications` – list publications  
- `GET /api/grants` – list grants  
- `GET /api/participants` – list/filter participants  
- `GET /api/activities` – meetings, workshops, conferences  
- `POST /api/auth/login` – login  
- `POST /api/auth/register` – signup  

## Data & Database

Tables discussed for this project include `news`, `publications`, `events/activities`, `organizations`, `participants`. Keep SQL migrations under `/db/migrations` (or similar).

## Content Map

See **`/docs/AccelNet-Website-Content.md`** (exported alongside this README) for page-by-page content, including:
- About • Structure • Working Groups • Activities • Publications • Grants • Organizations • Impacts • News & Events • Join Us

## Contributing

1. Fork and create a feature branch: `git checkout -b feat/my-change`  
2. Commit using conventional commits: `feat: ...`, `fix: ...`, `chore: ...`  
3. Open a Pull Request with context/screenshots.

## License

TBD (MIT recommended unless otherwise required).
