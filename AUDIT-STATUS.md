# La Tabla — Audit Re-verification

**Date:** 2026-02-13
**Original findings:** 36 | **Re-audited against current source code**

---

## Summary Table

| # | Finding | Severity | Status |
|---|---------|----------|--------|
| 1 | DB credentials in Git | 🔴 Critical | ✅ FIXED |
| 2 | Hardcoded admin email | 🔴 Critical | ✅ FIXED |
| 3 | Orders PATCH no auth | 🔴 Critical | ✅ FIXED |
| 4 | Orders GET no auth | 🔴 Critical | ✅ FIXED |
| 5 | PUT endpoints accept arbitrary fields | 🟠 High | ✅ FIXED |
| 6 | No Zod validation on API routes | 🟠 High | ❌ OPEN |
| 7 | Order number collision risk | 🟠 High | ✅ FIXED |
| 8 | Track order exposes PII | 🟠 High | ⚠️ PARTIAL |
| 9 | XSS in email templates | 🟠 High | ✅ FIXED |
| 10 | N+1 in order creation | 🟠 High | ✅ FIXED |
| 11 | N+1 in cart validation | 🟠 High | ❌ OPEN |
| 12 | No CSRF protection | 🟡 Medium | ❌ OPEN |
| 13 | Stale TODOs in code | 🟡 Medium | ✅ FIXED |
| 14 | console.log in production | 🟡 Medium | ⚠️ PARTIAL |
| 15 | slugify duplicated in 4 places | 🟡 Medium | ❌ OPEN |
| 16 | Duplicate generateOrderNumber | 🟡 Medium | ✅ FIXED |
| 17 | Product detail page duplication | 🟡 Medium | ❌ OPEN |
| 18 | Product listing page duplication | 🟡 Medium | ❌ OPEN |
| 19 | No DB transactions for orders | 🟡 Medium | ❌ OPEN |
| 20 | No rate limiting | 🟡 Medium | ❌ OPEN |
| 21 | Search API resource abuse | 🟡 Medium | ❌ OPEN |
| 22 | Currency inconsistency | 🟡 Medium | ❌ OPEN |
| 23 | Toast counter bug | 🟡 Medium | ❌ OPEN |
| 24 | Missing generateStaticParams | 🟡 Medium | ❌ OPEN |
| 25 | Unused @react-email/components | 🟡 Medium | ❌ OPEN |
| 26 | No loading.tsx/error.tsx | 🟢 Low | ❌ OPEN |
| 27 | Missing alt text | 🟢 Low | ❌ OPEN |
| 28 | Cart page outside (store) group | 🟢 Low | ❌ OPEN |
| 29 | Checkout outside (store) group | 🟢 Low | ❌ OPEN |
| 30 | No connection pooling config | 🟢 Low | ✅ FIXED (N/A) |
| 31 | OrderStatusBadge unused | 🟢 Low | ❌ OPEN |
| 32 | Unused SVG files | 🟢 Low | ❌ OPEN |
| 33 | Image import unused | 🟢 Low | ✅ FIXED (N/A) |
| 34 | Missing rel noopener | 🟢 Low | ✅ FIXED (N/A) |
| 35 | No migration safety checks | 🟢 Low | ❌ OPEN |
| 36 | propuesta dir public | 🟢 Low | ❌ OPEN |

### Totals

| Status | Count |
|--------|-------|
| ✅ FIXED | 14 |
| ⚠️ PARTIAL | 2 |
| ❌ OPEN | 20 |

**All 4 criticals are fixed.** Most highs are fixed. Medium/low items are largely untouched.

---

## Details — Open & Partial Items

### ❌ #6 — No Zod validation on API routes (🟠 High)
No Zod schemas found anywhere in `src/app/api/`. All routes still use manual `if (!name)` checks. Input validation remains weak.

### ⚠️ #8 — Track order exposes PII (🟠 High, PARTIAL)
**Improved:** Now only returns first name (`guestName.split(" ")[0]`), and no longer exposes full address/email/phone. **Still open:** No rate limiting on the endpoint. Order numbers, while improved (8 random chars), are still enumerable without throttling.

### ❌ #11 — N+1 in cart validation (🟠 High)
`/api/cart/validate` still loops through each item with individual `SELECT` queries. Should use `inArray()` batch fetch.

### ❌ #12 — No CSRF protection (🟡 Medium)
No origin/referer checking in middleware. FormData endpoints (upload, gallery) remain vulnerable.

### ⚠️ #14 — console.log in production (🟡 Medium, PARTIAL)
Removed most logs but `send-order-emails.ts:74` still has `console.log` for email success. The TODO comment in orders route is also cleaned up (only 1 remains for delivery cost, which is a genuine feature TODO).

### ❌ #15 — slugify duplicated (🟡 Medium)
Still duplicated in 4 files: `src/lib/utils.ts`, `src/app/api/categories/route.ts`, `src/app/api/categories/[id]/route.ts`, `src/components/admin/product-form.tsx`. Categories routes define their own local `slugify()` instead of importing from utils.

### ❌ #17 — Product detail page duplication (🟡 Medium)
Three files at 110 lines each, ~95% identical. No shared component created.

### ❌ #18 — Product listing page duplication (🟡 Medium)
Four files at 53 lines each, nearly identical.

### ❌ #19 — No DB transactions for orders (🟡 Medium)
Order creation still uses separate insert statements without a transaction wrapper.

### ❌ #20 — No rate limiting (🟡 Medium)
No rate limiting on any endpoint.

### ❌ #21 — Search API resource abuse (🟡 Medium)
Still uses `ilike` with no rate limiting.

### ❌ #22 — Currency inconsistency (🟡 Medium)
`formatPrice()` still uses USD. Email templates use `$` with `es-CR` locale.

### ❌ #23 — Toast counter bug (🟡 Medium)
`let counter = 0` is still outside the component (module-level), which actually makes it stable across renders. **Reclassified: this is actually fine** as a module-level variable. Not a bug. **→ Consider closing this as N/A.**

### ❌ #24 — Missing generateStaticParams (🟡 Medium)
No `generateStaticParams` in any dynamic route.

### ❌ #25 — Unused @react-email/components (🟡 Medium)
Email templates still use raw HTML strings (with proper escaping now). Dependency likely still installed but unused.

### ❌ #26–29, #31–32, #35–36 — Low severity items
All low-severity items remain unchanged. `propuesta/` is still public (not in robots.txt disallow). No loading/error boundaries. Unused SVGs and components remain.

---

## New Issues Found

### NEW-1: `generateOrderNumber()` still exists in utils.ts (🟢 Low)
The old weak implementation (`Math.random`, 4 chars) still exists in `src/lib/utils.ts` but is **no longer used** — the API route has its own improved version using `crypto.getRandomValues` with 8 chars. The dead code in utils should be removed to avoid confusion.

### NEW-2: `check-admin` API endpoint (🟢 Low)
**File:** `src/app/api/auth/check-admin/route.ts`
New endpoint used by navbar to check admin status server-side. This is a good pattern (replaces client-side email check). No issues, just noting the new file.

### NEW-3: Order error response leaks error message (🟡 Medium)
**File:** `src/app/api/orders/route.ts:112`
```ts
error: error instanceof Error ? error.message : "Internal server error"
```
In production, raw error messages (potentially including DB errors with schema info) are returned to the client. Should always return generic error to client and log details server-side.

---

## Recommended Priority

1. **Add Zod validation** (#6) — highest remaining risk
2. **Add rate limiting** (#20) — especially on track-order and order creation
3. **Fix order error leaking** (NEW-3)
4. **Wrap order creation in transaction** (#19)
5. **Batch cart validation queries** (#11)
6. **Code deduplication** (#15, #17, #18) — quality of life
