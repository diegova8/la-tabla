# 🧀 La Tabla — Charcutería & Quesos Artesanales

E-commerce platform for **La Tabla**, a premium charcuterie and artisan cheese business based in Costa Rica. Customers can browse curated charcuterie boards (*tablas*), specialty products, catering services, and workshops — then place orders with home delivery or pickup.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-0.45-c5f74f) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)

---

## ✨ Features

- **Product Catalog** — Four product types: tablas (configurable charcuterie boards), especialidades (fixed specialty items), servicios (catering services), and talleres (workshops)
- **Configurable Boards** — Customers pick ingredients per category when ordering a tabla
- **Shopping Cart** — Client-side cart with Zustand, server-side validation before checkout
- **Order System** — Guest checkout with Sinpe Móvil / bank transfer payment, order tracking by number
- **Admin Panel** — Full CRUD for products, ingredients, categories, orders, gallery, calendar
- **Email Notifications** — Dual emails via Resend (customer confirmation + admin notification)
- **Image Management** — Upload to Vercel Blob with gallery management
- **Search** — Real-time product search with rate limiting
- **Calendar** — Block dates, view upcoming orders
- **Responsive Design** — Mobile-first, elegant dark/gold aesthetic

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| Language | TypeScript 5 |
| Database | [Neon PostgreSQL](https://neon.tech/) (serverless) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Auth | [Clerk](https://clerk.com/) |
| File Storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Email | [Resend](https://resend.com/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| Validation | [Zod 4](https://zod.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Date Utils | [date-fns](https://date-fns.org/) |
| Testing | [Vitest](https://vitest.dev/) + Testing Library |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |

---

## 📋 Prerequisites

- **Node.js** 18+ (22 recommended)
- **pnpm** / npm / yarn
- **Neon** PostgreSQL database ([neon.tech](https://neon.tech))
- **Clerk** account ([clerk.com](https://clerk.com))
- **Vercel Blob** storage token
- **Resend** API key ([resend.com](https://resend.com))

---

## 🔐 Environment Variables

Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string (with `?sslmode=require`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend publishable key |
| `CLERK_SECRET_KEY` | Clerk backend secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page path (default: `/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page path (default: `/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in (default: `/`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up (default: `/`) |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token for image uploads |
| `NEXT_PUBLIC_APP_URL` | Public app URL (e.g., `https://latabla.cr`) |
| `ADMIN_EMAILS` | Comma-separated list of admin email addresses |
| `ADMIN_NOTIFICATION_EMAIL` | Email to receive order notifications (optional, falls back to first admin email) |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone <repo-url> la-tabla
cd la-tabla

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Push database schema
npx drizzle-kit push

# 5. (Optional) Seed the database
npx drizzle-kit studio  # Use Drizzle Studio to add initial data

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
la-tabla/
├── src/
│   ├── app/
│   │   ├── (store)/              # Public storefront pages
│   │   │   ├── tablas/           # Charcuterie boards listing & detail
│   │   │   ├── especialidades/   # Specialty products
│   │   │   ├── servicios/        # Catering services
│   │   │   ├── talleres/         # Workshops
│   │   │   ├── pedido/           # Order tracking
│   │   │   ├── contacto/         # Contact page
│   │   │   └── sobre-nosotros/   # About page
│   │   ├── admin/                # Admin panel (protected)
│   │   │   ├── productos/        # Product management
│   │   │   ├── ingredientes/     # Ingredient management
│   │   │   ├── categorias/       # Category management
│   │   │   ├── pedidos/          # Order management
│   │   │   ├── galeria/          # Image gallery
│   │   │   └── calendario/       # Calendar & blocked dates
│   │   ├── api/                  # API routes
│   │   ├── carrito/              # Shopping cart
│   │   ├── checkout/             # Checkout flow
│   │   ├── sign-in/              # Clerk sign-in
│   │   └── sign-up/              # Clerk sign-up
│   ├── components/
│   │   ├── admin/                # Admin-specific components
│   │   ├── cart/                 # Cart components
│   │   ├── landing/              # Homepage sections
│   │   ├── layout/               # Navbar, footer, sidebar
│   │   ├── products/             # Product cards, grids, detail
│   │   └── ui/                   # Reusable UI primitives
│   ├── db/
│   │   ├── index.ts              # Database connection
│   │   └── schema.ts             # Drizzle schema (13 tables)
│   ├── lib/
│   │   ├── auth.ts               # Admin authentication helper
│   │   ├── constants.ts          # Enums and labels
│   │   ├── emails/               # Email templates & sending
│   │   ├── rate-limit.ts         # In-memory rate limiter
│   │   ├── resend.ts             # Resend client config
│   │   ├── utils.ts              # Utility functions
│   │   └── validations.ts        # Zod schemas
│   └── middleware.ts             # Clerk auth + admin route protection
├── drizzle.config.ts             # Drizzle Kit configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── package.json
```

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (with Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

### Drizzle Kit Commands

```bash
npx drizzle-kit push      # Push schema to database
npx drizzle-kit pull      # Pull schema from database
npx drizzle-kit studio    # Open Drizzle Studio (DB GUI)
npx drizzle-kit generate  # Generate migration files
```

---

## 🚢 Deployment

The app is designed for **Vercel** deployment:

1. Connect your GitHub repo to Vercel
2. Set all environment variables in Vercel project settings
3. Vercel auto-deploys from the `main` branch
4. Neon PostgreSQL works natively with Vercel's serverless functions

### Production Checklist

- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Configure Clerk production instance
- [ ] Verify custom domain in Resend for branded emails
- [ ] Set `ADMIN_EMAILS` with production admin email(s)
- [ ] Enable Vercel Analytics

---

## 📄 Documentation

- **[Admin Manual (ES)](docs/manual-admin.md)** — Guide for managing the store
- **[API Reference](docs/api.md)** — Full API documentation
- **[Architecture](docs/architecture.md)** — Technical architecture and design decisions

---

## 📝 License

Private. All rights reserved.
