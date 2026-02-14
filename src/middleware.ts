import { clerkMiddleware, clerkClient, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim()).filter(Boolean);

// ============================================================
// Rate Limiting (edge runtime — longer-lived than serverless)
// ============================================================
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// Cleanup old entries every 60s
let lastCleanup = Date.now();
function cleanupRateLimits() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}

// Rate limit config per path pattern
const RATE_LIMITS: { pattern: RegExp; limit: number; windowMs: number; methods?: string[] }[] = [
  // Strict: order creation
  { pattern: /^\/api\/orders$/, limit: 5, windowMs: 60_000, methods: ["POST"] },
  // Moderate: tracking, search, cart validation
  { pattern: /^\/api\/track-order$/, limit: 15, windowMs: 60_000 },
  { pattern: /^\/api\/search$/, limit: 30, windowMs: 60_000 },
  { pattern: /^\/api\/cart\/validate$/, limit: 10, windowMs: 60_000 },
  // Light: public reads
  { pattern: /^\/api\/delivery-slots$/, limit: 30, windowMs: 60_000 },
  { pattern: /^\/api\/blocked-dates$/, limit: 30, windowMs: 60_000 },
  { pattern: /^\/api\/categories$/, limit: 30, windowMs: 60_000 },
  { pattern: /^\/api\/products$/, limit: 30, windowMs: 60_000 },
  { pattern: /^\/api\/ingredients$/, limit: 30, windowMs: 60_000 },
  // Upload
  { pattern: /^\/api\/upload$/, limit: 20, windowMs: 60_000, methods: ["POST"] },
  // Gallery public read
  { pattern: /^\/api\/gallery$/, limit: 30, windowMs: 60_000, methods: ["GET"] },
];

// ============================================================
// Security Headers
// ============================================================
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-DNS-Prefetch-Control": "on",
};

// ============================================================
// CSRF / Origin Check
// ============================================================
function isValidOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // Allow same-origin requests (no origin header = same-origin in most cases)
  if (!origin && !referer) return true;

  const allowedHosts = [
    "la-tabla.vercel.app",
    "localhost",
    "127.0.0.1",
  ];

  // Add custom domain if configured
  const customDomain = process.env.NEXT_PUBLIC_DOMAIN;
  if (customDomain) allowedHosts.push(customDomain);

  if (origin) {
    try {
      const url = new URL(origin);
      return allowedHosts.some(h => url.hostname === h || url.hostname.endsWith(`.${h}`));
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const url = new URL(referer);
      return allowedHosts.some(h => url.hostname === h || url.hostname.endsWith(`.${h}`));
    } catch {
      return false;
    }
  }

  return false;
}

// ============================================================
// Main Middleware
// ============================================================
export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // 1. Security headers on all responses
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // 2. CSRF check on mutating API requests
  if (pathname.startsWith("/api/") && ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    if (!isValidOrigin(req)) {
      return NextResponse.json(
        { error: "Solicitud no autorizada" },
        { status: 403, headers: Object.fromEntries(Object.entries(SECURITY_HEADERS)) }
      );
    }
  }

  // 3. Rate limiting on API routes
  if (pathname.startsWith("/api/")) {
    cleanupRateLimits();

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("x-real-ip") || 
               "unknown";

    for (const rule of RATE_LIMITS) {
      if (rule.pattern.test(pathname)) {
        if (rule.methods && !rule.methods.includes(req.method)) continue;

        const key = `${ip}:${pathname}:${req.method}`;
        if (!checkRateLimit(key, rule.limit, rule.windowMs)) {
          return NextResponse.json(
            { error: "Demasiadas solicitudes. Intentá en un minuto." },
            { status: 429, headers: { ...Object.fromEntries(Object.entries(SECURITY_HEADERS)), "Retry-After": "60" } }
          );
        }
        break;
      }
    }
  }

  // 4. Admin route protection
  if (isAdminRoute(req)) {
    const { userId } = await auth.protect();

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!email || !ADMIN_EMAILS.includes(email)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
