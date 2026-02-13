# La Tabla — Project Audit Report

**Date:** 2026-02-13
**Stack:** Next.js 16.1.6, React 19, Drizzle ORM, Neon PostgreSQL, Clerk Auth, Vercel Blob, Resend, Zustand, Tailwind CSS 4

---

## 🔴 Critical Issues

### 1. Database credentials committed to Git
- **Category:** Security
- **Severity:** 🔴 Critical
- **File:** `.env`, `.env.local`
- **Issue:** Both `.env` and `.env.local` are tracked in Git (`git ls-files` confirms) despite `.gitignore` entries. They contain real production credentials: DATABASE_URL with password, Clerk secret key (`sk_test_...`), Resend API key, and Vercel Blob token. These are in the Git history permanently.
- **Fix:** 
  1. `git rm --cached .env .env.local`
  2. Rotate ALL exposed credentials immediately (Neon DB password, Clerk secret key, Resend API key, Blob token)
  3. Ensure `.gitignore` patterns work (they use `.env*` which should work)

### 2. Hardcoded admin email throughout codebase
- **Category:** Security
- **Severity:** 🔴 Critical
- **Files:** `src/middleware.ts`, `src/lib/auth.ts`, `src/lib/emails/send-order-emails.ts`, `src/components/layout/navbar.tsx`
- **Issue:** `dvargas.dev@gmail.com` is hardcoded in 4 separate places as the admin email. The navbar even does a client-side check (`isAdmin = user?.primaryEmailAddress === "dvargas.dev@gmail.com"`) which is bypassable and leaks the admin identity to the client bundle.
- **Fix:** Move admin emails to env var (`ADMIN_EMAILS`). Use Clerk metadata/roles for admin checks instead of email matching. Remove client-side admin check from navbar — rely on middleware redirect only.

### 3. Order API PATCH endpoint has no authentication
- **Category:** Security  
- **Severity:** 🔴 Critical
- **File:** `src/app/api/orders/[id]/route.ts` — `PATCH` handler
- **Issue:** The PATCH endpoint allows changing order status and payment status without any authentication. Anyone can mark orders as "delivered" or change payment status to "verified". The GET on this same route also has no auth — exposes order details.
- **Fix:** Add `requireAdmin()` to both GET and PATCH handlers.

### 4. Order GET endpoint (individual) has no authentication
- **Category:** Security
- **Severity:** 🔴 Critical
- **File:** `src/app/api/orders/[id]/route.ts` — `GET` handler
- **Issue:** Anyone can fetch any order's full details by ID, including customer PII (name, email, phone, address).
- **Fix:** Add `requireAdmin()` check.

---

## 🟠 High Severity Issues

### 5. PUT endpoints accept arbitrary body fields for database update
- **Category:** Security
- **Severity:** 🟠 High
- **Files:** `src/app/api/products/[id]/route.ts`, `src/app/api/ingredients/[id]/route.ts`
- **Issue:** `db.update().set({ ...body, updatedAt: new Date() })` — the entire request body is spread into the update. An attacker (even authenticated admin) could inject unexpected columns or cause errors.
- **Fix:** Whitelist allowed fields explicitly. Use Zod schemas to validate input.

### 6. No input validation with Zod on any API route
- **Category:** Security / Best Practices
- **Severity:** 🟠 High
- **Files:** All `src/app/api/*/route.ts`
- **Issue:** Zod is installed but never used. All API routes use manual `if (!name)` checks. No type safety on incoming data. Missing validation on email format, phone format, date format, price ranges, etc.
- **Fix:** Create Zod schemas for each API endpoint input and validate with `.parse()` or `.safeParse()`.

### 7. Order number collision risk
- **Category:** Security / Data Integrity
- **Severity:** 🟠 High  
- **Files:** `src/app/api/orders/route.ts`, `src/lib/utils.ts`
- **Issue:** `generateOrderNumber()` uses `Math.random().toString(36).substring(2, 6)` — only 4 alphanumeric chars (~1.7M possibilities per day). Also duplicated in two files with slightly different implementations (one uses 2-digit year, other uses 4-digit).
- **Fix:** Use `crypto.randomUUID()` or at minimum 8+ random chars. Consolidate to one implementation. Add retry logic for unique constraint violations.

### 8. Track order endpoint exposes PII without authentication
- **Category:** Security
- **Severity:** 🟠 High
- **File:** `src/app/api/track-order/route.ts`
- **Issue:** Anyone who guesses/brute-forces an order number gets full order details including customer name, address, payment status. Order numbers are short and guessable.
- **Fix:** Add rate limiting. Consider requiring email verification to view orders, or use longer/harder-to-guess order IDs.

### 9. XSS risk in email templates
- **Category:** Security
- **Severity:** 🟠 High
- **File:** `src/lib/emails/order-confirmation.ts`
- **Issue:** Customer name, notes, and address are interpolated directly into HTML: `${data.customerName}`, `${data.notes}`, `${data.deliveryAddress}`. No HTML escaping.
- **Fix:** HTML-escape all user-provided data before embedding in email templates. Use a proper email templating library like `@react-email/components` (already installed but unused).

### 10. N+1 query pattern in order creation
- **Category:** Database / Performance
- **Severity:** 🟠 High
- **File:** `src/app/api/orders/route.ts`
- **Issue:** Order items and ingredients are inserted one-by-one in a loop. For an order with 5 items each with 5 ingredients, that's 30 sequential queries. Product names are also fetched one-by-one for email.
- **Fix:** Use batch inserts: `db.insert(orderItems).values([...allItems])`. Use `inArray` for product name lookups.

### 11. N+1 query in cart validation
- **Category:** Database / Performance
- **Severity:** 🟠 High
- **File:** `src/app/api/cart/validate/route.ts`
- **Issue:** Each cart item triggers a separate `SELECT` query to validate the product.
- **Fix:** Fetch all products in one query using `inArray(products.id, itemIds)`.

---

## 🟡 Medium Severity Issues

### 12. No CSRF protection on state-mutating API routes
- **Category:** Security
- **Severity:** 🟡 Medium
- **Files:** All POST/PUT/PATCH/DELETE API routes
- **Issue:** No CSRF tokens or origin checking. While Next.js API routes with `Content-Type: application/json` have some implicit protection, the upload and gallery endpoints use `FormData` which is vulnerable.
- **Fix:** Add origin/referer header validation in middleware or use Next.js server actions instead of API routes for mutations.

### 13. TODOs left in production code
- **Category:** Code Quality
- **Severity:** 🟡 Medium
- **Files:** Multiple API routes
- **Issue:** 9 `// TODO: Add auth check (admin only)` comments remain even though auth was already added below them. 1 `// TODO: calculate delivery cost by zone` is a missing feature.
- **Fix:** Remove stale TODO comments. Create a GitHub issue for delivery cost calculation.

### 14. `console.log` in production code
- **Category:** Code Quality
- **Severity:** 🟡 Medium
- **Files:** `src/app/api/orders/route.ts:121`, `src/lib/emails/send-order-emails.ts:74`
- **Issue:** `console.log("📧 Sending order emails to:", email)` leaks customer email in server logs. Email success/failure logging is fine but should use a proper logger.
- **Fix:** Remove customer email from log. Use structured logging (e.g., `pino`).

### 15. `slugify()` function duplicated in 4 places
- **Category:** Architecture / Code Quality
- **Severity:** 🟡 Medium
- **Files:** `src/lib/utils.ts`, `src/app/api/categories/route.ts`, `src/app/api/categories/[id]/route.ts`, `src/components/admin/product-form.tsx`
- **Issue:** Same function copy-pasted in 4 files.
- **Fix:** Import from `@/lib/utils` everywhere.

### 16. Duplicate `generateOrderNumber()` implementations
- **Category:** Architecture
- **Severity:** 🟡 Medium
- **Files:** `src/lib/utils.ts`, `src/app/api/orders/route.ts`
- **Issue:** Two different implementations. The one in utils.ts uses full year (20260213), the API route uses 2-digit year (260213).
- **Fix:** Delete the one in the API route, import from utils.

### 17. Product detail pages have heavy code duplication
- **Category:** Architecture
- **Severity:** 🟡 Medium
- **Files:** `especialidades/[slug]/page.tsx`, `servicios/[slug]/page.tsx`, `talleres/[slug]/page.tsx`
- **Issue:** These three files are ~95% identical. Only the product type filter and fallback emoji differ.
- **Fix:** Create a shared `ProductDetailPage` component that accepts `type` as a parameter.

### 18. Product listing pages have heavy code duplication
- **Category:** Architecture
- **Severity:** 🟡 Medium
- **Files:** `especialidades/page.tsx`, `servicios/page.tsx`, `talleres/page.tsx`, `tablas/page.tsx`
- **Issue:** Four nearly identical listing pages.
- **Fix:** Create a shared `ProductListingPage` component parameterized by type.

### 19. No database transactions for order creation
- **Category:** Database / Data Integrity
- **Severity:** 🟡 Medium
- **File:** `src/app/api/orders/route.ts`
- **Issue:** Order, order items, and order item ingredients are inserted in separate queries. If any fails midway, you get orphaned/partial data.
- **Fix:** Wrap in a Drizzle transaction: `db.transaction(async (tx) => { ... })`. Note: Neon HTTP driver doesn't support transactions natively — consider using the WebSocket driver for this endpoint or use Neon's `transaction()` helper.

### 20. No rate limiting on any endpoint
- **Category:** Security
- **Severity:** 🟡 Medium
- **Files:** All API routes
- **Issue:** No rate limiting. The order creation, search, and track-order endpoints could be abused.
- **Fix:** Add rate limiting via Vercel Edge middleware or `@upstash/ratelimit`.

### 21. Search API potential for resource abuse
- **Category:** Performance / Security
- **Severity:** 🟡 Medium
- **File:** `src/app/api/search/route.ts`
- **Issue:** Uses `ilike` with user-controlled pattern on 3 columns. No rate limiting. Could generate expensive queries with crafted patterns.
- **Fix:** Add rate limiting and consider full-text search indexes.

### 22. Currency inconsistency
- **Category:** Code Quality
- **Severity:** 🟡 Medium
- **Files:** `src/lib/utils.ts`, email templates, JSON-LD
- **Issue:** `formatPrice()` uses USD currency (`currency: "USD"`) but the app is for Costa Rica. Email templates use `$` sign with `toLocaleString("es-CR")`. JSON-LD uses `priceCurrency: "USD"`. Unclear if prices are in USD or CRC.
- **Fix:** Clarify currency and make consistent throughout. If USD, fine. If CRC, update `formatPrice` to use CRC.

### 23. Toast provider counter bug
- **Category:** Code Quality
- **Severity:** 🟡 Medium
- **File:** `src/components/ui/toast.tsx`
- **Issue:** `let counter = 0` inside component body gets reset on every render. Should use `useRef` for a stable counter.
- **Fix:** `const counterRef = useRef(0)` and use `counterRef.current++`.

### 24. Missing `generateStaticParams` for dynamic routes
- **Category:** Performance
- **Severity:** 🟡 Medium
- **Files:** All `[slug]/page.tsx` files
- **Issue:** Dynamic product pages don't export `generateStaticParams`, so they're all server-rendered on demand. For an e-commerce site, these should be statically generated at build time.
- **Fix:** Add `generateStaticParams()` and use `revalidate` for ISR.

### 25. Unused `@react-email/components` dependency
- **Category:** Performance / Bundle Size
- **Severity:** 🟡 Medium
- **File:** `package.json`
- **Issue:** `@react-email/components` is installed but never imported. Email templates are built with raw HTML strings instead.
- **Fix:** Either use `@react-email/components` for type-safe emails with proper escaping (recommended — also fixes XSS issue #9) or remove the dependency.

---

## 🟢 Low Severity Issues

### 26. No `loading.tsx` or `error.tsx` files for any route
- **Category:** Best Practices
- **Severity:** 🟢 Low
- **Files:** All route groups
- **Issue:** No loading states or error boundaries. If a server component throws, users see the default Next.js error page.
- **Fix:** Add `loading.tsx` and `error.tsx` to `(store)/` and `admin/` layouts.

### 27. Missing `alt` text on some images
- **Category:** SEO / Accessibility
- **Severity:** 🟢 Low
- **Files:** Various components where `altText` can be null
- **Issue:** Gallery images and product images may have null alt text. While fallbacks exist (`productName`), explicit alt text is better for SEO.
- **Fix:** Require alt text in the gallery upload form or auto-generate from product name.

### 28. Cart page outside `(store)` route group
- **Category:** Architecture
- **Severity:** 🟢 Low
- **File:** `src/app/carrito/page.tsx`
- **Issue:** The cart page is at `/carrito` outside the `(store)` group, so it manually includes Navbar and Footer instead of using the shared layout.
- **Fix:** Move to `(store)/carrito/page.tsx` or keep as-is (it's functional, just inconsistent).

### 29. Checkout page outside `(store)` route group  
- **Category:** Architecture
- **Severity:** 🟢 Low
- **File:** `src/app/checkout/page.tsx`, `src/app/checkout/confirmacion/page.tsx`
- **Issue:** Same as above — manually includes Navbar/Footer.
- **Fix:** Move into `(store)` group.

### 30. No connection pooling configuration
- **Category:** Database
- **Severity:** 🟢 Low
- **File:** `src/db/index.ts`
- **Issue:** Uses Neon's HTTP driver which is connectionless (no pooling needed), but the connection string uses `-pooler` hostname. This is fine for HTTP, but worth noting.
- **Fix:** No action needed — Neon HTTP + pooler endpoint is the recommended setup.

### 31. `OrderStatusBadge` component never used
- **Category:** Code Quality
- **Severity:** 🟢 Low
- **File:** `src/components/admin/order-status-badge.tsx`
- **Issue:** Dead code. The order detail component uses inline badge styling instead.
- **Fix:** Either use this component in `OrderDetail` or delete it.

### 32. Unused SVG files in public directory
- **Category:** Code Quality
- **Severity:** 🟢 Low
- **File:** `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- **Issue:** Default Next.js boilerplate SVGs never referenced.
- **Fix:** Delete them.

### 33. `Image` import unused in `especialidades/[slug]/page.tsx`
- **Category:** Code Quality
- **Severity:** 🟢 Low
- **File:** `src/app/(store)/especialidades/[slug]/page.tsx`
- **Issue:** `Image` from `next/image` is imported but only used conditionally (when no gallery images exist). The linter might flag this.
- **Fix:** Not a real issue — Image is used. Just noting for awareness.

### 34. Missing `rel="noopener noreferrer"` typo
- **Category:** Security
- **Severity:** 🟢 Low
- **File:** `src/app/page.tsx`
- **Issue:** One Instagram link uses `rel="noopener noreferrer"` (correct) but it's worth verifying all external links.
- **Fix:** Audit all `target="_blank"` links — they all appear correct.

### 35. No database migration safety checks
- **Category:** Database
- **Severity:** 🟢 Low
- **File:** `scripts/`
- **Issue:** Scripts directory contains `cleanup-old-db.ts`, `create-db.ts`, `migrate.ts`, `seed.ts`, `update-images.ts` — these are excluded from TypeScript compilation but could accidentally run against production.
- **Fix:** Add environment checks (`if (process.env.NODE_ENV === 'production') throw`) to destructive scripts.

### 36. `propuesta` directory in public
- **Category:** Code Quality
- **Severity:** 🟢 Low
- **File:** `public/propuesta/`
- **Issue:** Appears to be a business proposal/pitch document publicly accessible.
- **Fix:** Move to a private location or add to `robots.txt` disallow.

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 4 |
| 🟠 High | 7 |
| 🟡 Medium | 14 |
| 🟢 Low | 11 |
| **Total** | **36** |

### Top Priority Actions
1. **Immediately rotate all credentials** (DB password, Clerk keys, Resend key, Blob token) — they're in Git history
2. **Remove `.env` and `.env.local` from Git tracking**
3. **Add auth to `PATCH /api/orders/[id]` and `GET /api/orders/[id]`**
4. **Add Zod validation to all API inputs**
5. **Fix email template XSS** (use react-email or HTML-escape)
6. **Remove client-side admin email check from navbar**
7. **Wrap order creation in a transaction**
8. **De-duplicate code** (slugify, generateOrderNumber, product detail pages)
