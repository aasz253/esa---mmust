# ESA MMUST — Engineering Students Association Portal

A full-stack web portal for the **Engineering Students Association** at **Masinde Muliro University of Science & Technology (MMUST)**. The site features a scroll-driven 3D hero, per-page 3D scenes, an events calendar, a merchandise store, leadership, welfare, training and membership management.

## ✨ Features

- **3D home hero** — scroll-driven GSAP + React Three Fiber scene with extruded 3D text, animated engineering background planes, particles and floating chips.
- **Per-page 3D scenes** — distinct animated 3D backgrounds for About, Events, Trips, Training, Welfare, Store, Leadership, Contact and detail pages.
- **Membership portal** — member login, renewal and profile.
- **Merchandise store** — browse products by category, add to cart, order via WhatsApp.
- **Events & Training** — upcoming/past events, registration, installation & training catalogue.
- **Leadership** — elected committee profiles.
- **Welfare** — support cases and contributions.
- **Admin dashboard** — manage members, events, products, training, leadership, announcements and welfare.
- **Image backgrounds** — high-resolution photography used across page heroes.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 14 (App Router, TypeScript)
- **3D:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) 8, [drei](https://github.com/pmndrs/drei) 9, [Three.js](https://threejs.org) 0.169
- **Animation:** [GSAP](https://gsap.com) + ScrollTrigger, Framer Motion
- **Database:** SQLite via [Prisma](https://www.prisma.io)
- **Styling:** Tailwind CSS
- **UI icons:** lucide-react
- **Auth:** bcryptjs (session-based)

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+ and npm
- A `.env` file matching the schema (see [Environment Variables](#-environment-variables))

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

```bash
npm run db:push   # create the SQLite schema
npm run db:seed   # seed demo data
```

### 4. Run the dev server

```bash
npm run dev
```

By default Next.js runs on **http://localhost:3000**. If that port is busy, run instead:

```bash
npm run dev -- -p 3001
```

## 🔐 Demo Accounts

The seed script creates two demo users:

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin | `admin@esa.mmust.ke`   | `admin123` |
| Member| `student@mmust.ac.ke`  | `member123`|

- **Admin** logs in at `/admin`.
- **Member** logs in at `/member`.

## 🧪 Useful Scripts

| Command             | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`       | Run the dev server                   |
| `npm run build`     | Production build                     |
| `npm run start`     | Start the production server          |
| `npm run lint`      | Run ESLint                           |
| `npm run db:push`   | Apply Prisma schema to the database  |
| `npm run db:seed`   | Seed the database with demo data     |
| `npm run db:studio` | Open Prisma Studio (DB GUI)          |

## 📁 Project Structure

```
app/            # App Router pages (public + admin)
components/     # Reusable UI, 3D scenes, heroes, store, auth
lib/            # Data access, actions, utils
prisma/         # Schema + seed script
public/         # Static assets (images, fonts)
config/         # App configuration
context/        # React context (cart, etc.)
```

## ⚙️ Environment Variables

Create a `.env` file in the project root (a sample is provided in the repo layout):

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="<a-long-random-secret>"
NEXTAUTH_URL="http://localhost:3000"
```

> ⚠️ Never commit your real `.env` — it is excluded via `.gitignore`.

## 📸 Customizing Backgrounds & Products

- Background images live in `public/images/bg/`.
- Merchandise product photos live in `public/images/products/`.
- Event cover images live in `public/images/events/`.
- Leadership photos live in `public/images/` and `PICTURES/`.

Update the references in `prisma/seed.ts` and re-run `npm run db:seed` to apply new images.

## 📄 License

This is an internal project for the Engineering Students Association at MMUST.
