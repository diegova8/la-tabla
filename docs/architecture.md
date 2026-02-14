# 🏗 Architecture — La Tabla

Technical architecture documentation for the La Tabla e-commerce platform.

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐             │
│  │ Storefront│  │  Cart    │  │   Admin   │             │
│  │  (React)  │  │ (Zustand)│  │  Panel    │             │
│  └─────┬─────┘  └────┬─────┘  └─────┬─────┘             │
└────────┼──────────────┼──────────────┼───────────────────┘
         │              │              │
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                 Next.js 16 (App Router)                  │
│  ┌──────────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Server       │  │   API    │  │   Middleware      │  │
│  │  Components   │  │  Routes  │  │  (Clerk Auth)     │  │
│  └──────┬────────┘  └────┬─────┘  └──────────────────┘  │
│         │                │                               │
│  ┌──────┴────────────────┴──────────────────────────┐   │
│  │              Drizzle ORM                          │   │
│  └──────────────────┬───────────────────────────────┘   │
└─────────────────────┼───────────────────────────────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │   Neon   │ │  Vercel  │ │  Resend  │
   │ Postgres │ │   Blob   │ │  Email   │
   └──────────┘ └──────────┘ └──────────┘
```

---

## Database Schema

13 tables organized into 4 domains:

### Catalog Domain

```
categories ─────────< ingredients
    │                     │
    │                     │
    ├────< tablaRules >───┤ (links products to category ingredient rules)
    │                     │
    │                     │
    └────< tablaFixedIngredients (product ↔ ingredient, for fixed tablas)

products ──────< productImages
    │
    ├──────< productVariants
    │
    └──────< serviceConfig (catering/workshop specifics)
```

### Order Domain

```
orders ──────< orderItems ──────< orderItemIngredients
                  │
                  ├── references → products
                  └── references → productVariants
```

### Scheduling Domain

```
deliverySlots (time windows for delivery)
blockedDates  (dates when orders are not accepted)
```

### Table Details

| Table | Description | Key Fields |
|-------|------------|------------|
| `categories` | Ingredient categories | name, slug, displayOrder |
| `ingredients` | Individual ingredients | name, categoryId, cost, costUnit, available |
| `products` | All product types | type, name, slug, price, isConfigurable, isActive |
| `product_images` | Product gallery images | productId, imageUrl, altText |
| `product_variants` | Product size/price variants | productId, name, price |
| `tabla_rules` | How many items per category per tabla | productId, categoryId, quantity |
| `tabla_fixed_ingredients` | Fixed ingredients for non-configurable tablas | productId, ingredientId |
| `service_config` | Extra config for services/workshops | pricePerPerson, minPersons, isVirtual |
| `delivery_slots` | Available delivery time windows | label, startTime, endTime |
| `blocked_dates` | Dates when orders blocked | date, reason |
| `orders` | Customer orders | orderNumber, status, paymentStatus, deliveryDate |
| `order_items` | Line items in an order | orderId, productId, quantity, unitPrice |
| `order_item_ingredients` | Selected ingredients per order item | orderItemId, ingredientId, categoryId |

### Key Indexes

- `products`: type, isActive, slug
- `ingredients`: categoryId, available
- `orders`: customerId, status, deliveryDate, createdAt
- `order_items`: orderId

---

## Authentication Flow

### Clerk Integration

```
Request → Clerk Middleware → Route Handler
              │
              ├── Public routes → pass through
              │
              └── /admin/* routes → check auth
                    │
                    ├── No session → redirect to /sign-in
                    │
                    └── Has session → lookup user email
                          │
                          ├── Email in ADMIN_EMAILS → allow
                          └── Email not in list → redirect to /
```

### Admin Auth (`requireAdmin()`)

API routes use `requireAdmin()` from `src/lib/auth.ts`:

1. Calls `auth()` to get Clerk `userId`
2. If no userId → returns `401 Unauthorized`
3. Fetches user from Clerk API, gets primary email
4. Checks email against `ADMIN_EMAILS` env var
5. If not in list → returns `403 Forbidden`
6. Returns `{ authorized: true }`

**Design decision:** Admin access is email-based (via env var) rather than role-based. Simple, secure, no DB migration needed to add admins.

---

## Order Flow

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌─────────┐
│  Browse  │───>│   Cart   │───>│ Checkout  │───>│ Confirm │
│ Products │    │ (Zustand)│    │   Form    │    │  Page   │
└─────────┘    └──────────┘    └─────┬─────┘    └─────────┘
                                     │
                                     ▼
                              POST /api/orders
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                │                ▼
             Zod Validation    Rate Limit Check    DB Transaction
                                                       │
                                              ┌────────┼────────┐
                                              ▼        ▼        ▼
                                          Insert    Insert    Insert
                                          Order    Items    Ingredients
                                              │
                                              ▼
                                     Send Emails (async)
                                     ┌────────┼────────┐
                                     ▼                  ▼
                              Customer Email     Admin Notification
                                     │
                                     ▼
                              Return { orderNumber }
```

### Step by Step

1. **Browse:** Customer explores products by type (tablas, especialidades, etc.)
2. **Add to Cart:** Items stored client-side in Zustand (persisted to localStorage)
3. **Cart Validation:** Before checkout, `POST /api/cart/validate` verifies products still exist and prices haven't changed
4. **Checkout:** Customer fills in contact info, delivery details, payment method
5. **Order Creation:** `POST /api/orders`
   - Rate limited (5/min per IP)
   - Validated with Zod schema
   - Created in a DB transaction (order → items → ingredients)
   - Order number generated: `LT-YYMMDD-XXXXXXXX`
6. **Email:** Non-blocking dual emails via Resend (customer + admin)
7. **Confirmation:** Customer sees confirmation page with order number
8. **Tracking:** Customer can track status at `/pedido` using order number

---

## File Storage (Vercel Blob)

```
Admin uploads image
       │
       ▼
POST /api/upload or POST /api/gallery
       │
       ▼
Validate: type (JPEG/PNG/WebP), size (<5MB)
       │
       ▼
put(file, { access: "public", addRandomSuffix: true })
       │
       ▼
Returns blob URL → stored in DB (products.imageUrl or productImages.imageUrl)
```

- All images are **public** (no auth needed to view)
- Random suffix prevents filename collisions
- URLs are permanent Vercel Blob CDN URLs

---

## Email System

### Provider: Resend

- **Client:** Initialized in `src/lib/resend.ts`
- **From address:** `La Tabla <onboarding@resend.dev>` (until custom domain verified)
- **Templates:** HTML + plaintext in `src/lib/emails/`

### Dual Email Strategy

Every order triggers two emails sent in parallel (`Promise.allSettled`):

| Email | Recipient | Subject |
|-------|-----------|---------|
| Customer confirmation | Customer's email | `Pedido confirmado #LT-... — La Tabla` |
| Admin notification | `ADMIN_NOTIFICATION_EMAIL` | `🧀 Nuevo pedido #LT-... — $X` |

### Security

- HTML templates use `escapeHtml()` to prevent XSS in email content
- Emails are sent asynchronously (don't block the order response)
- Failures are logged but don't break the order flow

---

## Rate Limiting

### Implementation

Simple **in-memory** rate limiter (`src/lib/rate-limit.ts`):

```typescript
rateLimit(key: string, limit: number, windowMs: number): boolean
```

- Uses a `Map<string, { count, resetAt }>` in memory
- Periodic cleanup every 60 seconds
- Key format: `{action}:{ip}` (e.g., `order:203.0.113.1`)

### Limits

| Endpoint | Key | Limit | Window |
|----------|-----|-------|--------|
| Create order | `order:{ip}` | 5 | 60s |
| Search | `search:{ip}` | 20 | 60s |
| Track order | `track:{ip}` | 10 | 60s |

### Limitations

- Per-instance (resets on cold start in serverless)
- Not shared across instances
- For production at scale, should migrate to Redis-based (e.g., `@upstash/ratelimit`)

---

## Security Measures

### Input Validation (Zod)

All mutating API endpoints validate input with Zod schemas (`src/lib/validations.ts`):

- `createProductSchema` — product creation
- `updateProductSchema` — product updates
- `createIngredientSchema` — ingredient creation
- `createOrderSchema` — order creation (the most complex)
- `createBlockedDateSchema` — date blocking
- `updateOrderStatusSchema` — order status changes

### Authentication & Authorization

- **Clerk middleware** protects all `/admin/*` routes at the edge
- **`requireAdmin()`** helper protects all admin API routes
- Admin check is email-based via `ADMIN_EMAILS` environment variable
- No role-based access — binary admin/non-admin

### XSS Protection

- Email templates escape all user input with `escapeHtml()`
- React's default JSX escaping handles frontend rendering
- No `dangerouslySetInnerHTML` usage

### File Upload Security

- Whitelist of allowed MIME types (`image/jpeg`, `image/png`, `image/webp`)
- 5MB file size limit enforced server-side
- Random suffix on filenames prevents path traversal

### Data Privacy

- Order tracking exposes only first name (not full name, email, or phone)
- Order list requires admin auth
- No customer PII in public API responses

### Soft Deletes

- Products and ingredients are deactivated, not deleted
- Preserves referential integrity with historical orders

---

## Key Design Decisions

### 1. Guest Checkout Only

**Decision:** No customer accounts required for ordering.

**Rationale:** Reduces friction for a small business. Customers provide name, email, phone at checkout. Clerk auth is only for admin access.

### 2. Client-Side Cart (Zustand)

**Decision:** Cart state lives in the browser (Zustand + localStorage).

**Rationale:** No server-side session management needed. Cart persists across page reloads. Server validates cart contents before order creation.

### 3. Email-Based Admin Auth

**Decision:** Admin access determined by email whitelist in env vars.

**Rationale:** Simple, no DB schema for roles. Adding an admin = adding an email to `ADMIN_EMAILS`. Works well for a single-admin or small-team scenario.

### 4. In-Memory Rate Limiting

**Decision:** Simple Map-based rate limiter instead of Redis.

**Rationale:** Adequate for low-to-medium traffic. No external dependency. Acknowledged tradeoff: resets on cold starts in serverless.

### 5. Non-Blocking Emails

**Decision:** Order creation returns immediately; emails sent asynchronously.

**Rationale:** Email delivery shouldn't slow down checkout. Failures are logged but don't affect the order.

### 6. Spanish-First UI

**Decision:** All user-facing content in Spanish, error messages in Spanish.

**Rationale:** Target market is Costa Rica. No i18n complexity needed.

### 7. Configurable Tablas

**Decision:** Tablas can be "configurable" (customer picks ingredients per category rules) or "fixed" (pre-set ingredients).

**Rationale:** Core product differentiation. `tablaRules` defines how many ingredients per category; `tablaFixedIngredients` defines the fixed ones.

---

## Folder Structure Explained

```
src/
├── app/                        # Next.js App Router
│   ├── (store)/                # Route group: public storefront
│   │   ├── tablas/             # /tablas and /tablas/[slug]
│   │   ├── especialidades/     # /especialidades and /especialidades/[slug]
│   │   ├── servicios/          # /servicios and /servicios/[slug]
│   │   ├── talleres/           # /talleres and /talleres/[slug]
│   │   ├── pedido/             # /pedido — order tracking
│   │   ├── contacto/           # /contacto — contact page
│   │   └── sobre-nosotros/     # /sobre-nosotros — about page
│   ├── admin/                  # Admin panel (Clerk-protected)
│   │   ├── page.tsx            # Dashboard
│   │   ├── productos/          # Product CRUD
│   │   ├── ingredientes/       # Ingredient CRUD
│   │   ├── categorias/         # Category CRUD
│   │   ├── pedidos/            # Order management
│   │   ├── galeria/            # Image gallery
│   │   └── calendario/         # Calendar + blocked dates
│   ├── api/                    # API route handlers
│   │   ├── products/           # GET, POST, PUT, DELETE
│   │   ├── ingredients/        # GET, POST, PUT, DELETE
│   │   ├── categories/         # GET, POST, PUT, DELETE
│   │   ├── orders/             # GET, POST, PATCH
│   │   ├── gallery/            # GET, POST, DELETE
│   │   ├── blocked-dates/      # GET, POST, DELETE
│   │   ├── delivery-slots/     # GET
│   │   ├── search/             # GET (rate limited)
│   │   ├── track-order/        # GET (rate limited)
│   │   ├── upload/             # POST (admin, file upload)
│   │   ├── cart/validate/      # POST (cart validation)
│   │   └── auth/check-admin/   # GET (admin check)
│   ├── carrito/                # /carrito — shopping cart page
│   ├── checkout/               # /checkout — checkout flow
│   │   └── confirmacion/       # /checkout/confirmacion — order confirmation
│   ├── sign-in/                # Clerk sign-in page
│   └── sign-up/                # Clerk sign-up page
├── components/
│   ├── admin/                  # Admin panel components
│   │   ├── image-upload.tsx    # Image upload widget
│   │   ├── ingredient-form.tsx # Ingredient create/edit form
│   │   ├── order-detail.tsx    # Order detail modal/view
│   │   ├── product-form.tsx    # Product create/edit form
│   │   └── stats-card.tsx      # Dashboard stat card
│   ├── cart/                   # Cart components
│   │   ├── cart-item.tsx       # Single cart line item
│   │   └── cart-summary.tsx    # Cart totals and checkout button
│   ├── landing/                # Homepage sections
│   │   ├── hero.tsx            # Hero banner
│   │   ├── featured-products.tsx # Featured product carousel
│   │   ├── process-section.tsx # How it works
│   │   ├── delivery-zones.tsx  # Delivery area info
│   │   └── faq.tsx             # FAQ accordion
│   ├── layout/                 # Layout components
│   │   ├── navbar.tsx          # Main navigation
│   │   ├── footer.tsx          # Site footer
│   │   ├── admin-sidebar.tsx   # Admin navigation sidebar
│   │   └── search-bar.tsx      # Product search
│   ├── products/               # Product display components
│   │   ├── product-card.tsx    # Product card for grids
│   │   ├── product-grid.tsx    # Responsive product grid
│   │   ├── product-detail.tsx  # Product detail view
│   │   ├── product-gallery.tsx # Image gallery carousel
│   │   ├── ingredient-picker.tsx # Tabla ingredient selector
│   │   ├── product-listing-page.tsx # Reusable listing page
│   │   └── product-detail-page.tsx  # Reusable detail page
│   └── ui/                     # Reusable UI primitives
│       ├── button.tsx, card.tsx, input.tsx, select.tsx, textarea.tsx
│       ├── badge.tsx, price.tsx, heading.tsx, separator.tsx
│       ├── container.tsx, empty-state.tsx, skeleton.tsx
│       ├── icon-button.tsx, quantity-selector.tsx, toast.tsx
│       └── ...
├── db/
│   ├── index.ts                # Neon + Drizzle connection
│   └── schema.ts               # All 13 tables + relations
├── lib/
│   ├── auth.ts                 # requireAdmin() helper
│   ├── constants.ts            # Enums, labels, config values
│   ├── emails/                 # Email system
│   │   ├── order-confirmation.ts  # HTML/text email builder
│   │   └── send-order-emails.ts   # Dual email sender
│   ├── rate-limit.ts           # In-memory rate limiter
│   ├── resend.ts               # Resend client initialization
│   ├── utils.ts                # Utility functions (slugify, cn, etc.)
│   └── validations.ts          # Zod schemas for all inputs
└── middleware.ts               # Clerk middleware + admin route guard
```
