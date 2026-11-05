import { NextResponse } from "next/server";

const BLOCK_PAGE = `
<!DOCTYPE html>
<html>
<head><title>Access Denied</title><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#111;color:#aaa;flex-direction:column;gap:16px;text-align:center;padding:20px}h1{color:#fff;font-size:24px}p{font-size:14px;max-width:400px}</style></head>
<body><h1>Access Denied</h1><p>Your request has been blocked by our security system.</p><p style="font-size:12px;color:#666">Reference: BOT-GATE-01</p></body>
</html>
`;

const RATE_LIMIT_MAP = new Map();

function getRateLimitKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : null;
  // Do not group unrelated visitors into a shared fallback bucket.
  if (!ip) return null;
  const path = request.nextUrl.pathname;
  return `${ip}:${path}`;
}

function checkRateLimit(key) {
  if (!key) return true;
  const now = Date.now();
  const WINDOW_MS = 10000;
  const MAX_REQUESTS = 20;

  if (!RATE_LIMIT_MAP.has(key)) {
    RATE_LIMIT_MAP.set(key, { count: 1, start: now });
    return true;
  }

  const entry = RATE_LIMIT_MAP.get(key);

  if (now - entry.start > WINDOW_MS) {
    entry.count = 1;
    entry.start = now;
    return true;
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return false;
  }

  return true;
}

// Periodic cleanup
// Note: Edge runtime's setInterval has no .unref() - guard for compatibility
const rateLimitCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of RATE_LIMIT_MAP) {
    if (now - entry.start > 30000) {
      RATE_LIMIT_MAP.delete(key);
    }
  }
}, 30000);
if (typeof rateLimitCleanup.unref === "function") {
  rateLimitCleanup.unref();
}

// ====== BOT USER-AGENT PATTERNS ======

const BOT_UA_PATTERNS = [
  // CLI / script clients
  /curl/i, /wget/i, /libwww/i, /httpclient/i,
  /apache-httpclient/i, /scrapy/i, /python-requests/i,
  /python\/3\.\d+/i, /python-urllib/i,
  /axios/i, /node-fetch/i, /got/i, /superagent/i,
  /go-http-client/i, /restsharp/i, /okhttp/i,
  /http:\/\//i, /java\//i, /lwp/i,

  // Security scanners
  /zgrab/i, /nmap/i, /masscan/i, /sqlmap/i, /nikto/i,
  /burpsuite/i, /dirbuster/i, /gobuster/i, /wpscan/i,
  /acunetix/i, /nessus/i, /openvas/i,

  // Automation engines
  /headless/i, /phantomjs/i, /selenium/i, /puppeteer/i,
  /playwright/i, /casperjs/i, /slimerjs/i,
  /chrome-lighthouse/i, /lighthouse/i,

  // Aggressive crawlers (non-search-engine)
  /ahrefsbot/i, /semrushbot/i, /dotbot/i, /mj12bot/i,
  /rogerbot/i, /exabot/i, /barkrowler/i, /blexbot/i,
  /zoominfobot/i, /dataforseo/i, /crawler4j/i,
  /sitechecker/i, /seokicks/i, /netsparker/i,
  /zgrab/i, /grabber/i, /botnet/i,

  // Empty/common bot signatures
  /^wordpress/i, /^drupal/i,
  /^magpierss/i, /^feed/i,

  // Suspicious bot names
  /^bot$/i, /^crawl$/i, /^spider$/i, /^scraper$/i,
];

// ====== KNOWN BOT IP RANGES (CIDR-like patterns) ======
const BOT_IP_PATTERNS = [];

// ====== ALLOWED REFERRERS ======
const BLOCKED_REFERRER_PATTERNS = [
  /semalt\.com/i, /buttons-for-website\.com/i,
  /darodar\.com/i, /ilovevitaly\.com/i,
  /priceg\.com/i, /blackhatworth\.com/i,
  /hulfingtonpost\.com/i, /o-o-6-o-o\.com/i,
  /social-buttons\.com/i, /best-seo-solution\.com/i,
  /free-share-buttons\.com/i, /trafficmonetizer/i,
];

// Backend origin used for the CSP connect-src (http + ws variants),
// driven by the same env var the client uses (see config/api.js).
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://ferr-back.onrender.com";
const BACKEND_WS_URL = BACKEND_URL.replace(/^http/i, "ws");

// ====== MIDDLEWARE ======

export async function middleware(request) {
  const url = request.nextUrl;
  const headers = request.headers;

  // Static assets do not need request filtering.
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname === "/_next/image" ||
    (process.env.NODE_ENV !== "production" && url.pathname === "/_next/webpack-hmr") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/porsche-wordmark.svg"
  ) {
    return NextResponse.next();
  }

  // ===== 1. RATE LIMITING =====
  // Page loads and Next.js prefetches can arrive in bursts on shared networks.
  // Apply this limit to submissions rather than ordinary browsing.
  const isSubmission = !["GET", "HEAD", "OPTIONS"].includes(request.method);
  if (isSubmission && !checkRateLimit(getRateLimitKey(request))) {
    return new NextResponse("Too many requests. Please try again in 10 seconds.", {
      status: 429,
      headers: { "Retry-After": "10", "Cache-Control": "no-store" },
    });
  }

  // ===== 2. USER-AGENT BLOCK =====
  const ua = headers.get("user-agent") || "";
  for (const pattern of BOT_UA_PATTERNS) {
    if (pattern.test(ua)) {
      console.log(`[BOT-BLOCK] UA blocked: "${ua.substring(0, 80)}" matched pattern: ${pattern}`);
      return new NextResponse(BLOCK_PAGE, {
        status: 403,
        headers: { "content-type": "text/html" },
      });
    }
  }

  // ===== 5. REFERRER SPAM BLOCK =====
  const referer = headers.get("referer") || "";
  if (referer) {
    for (const pattern of BLOCKED_REFERRER_PATTERNS) {
      if (pattern.test(referer)) {
        console.log(`[BOT-BLOCK] Spam referrer: ${referer}`);
        return new NextResponse(BLOCK_PAGE, {
          status: 403,
          headers: { "content-type": "text/html" },
        });
      }
    }
  }

  const response = NextResponse.next();

  // ===== 7. SECURITY HEADERS (added to response) =====
  // The HTML is static, so let the CDN serve repeat visits without a full
  // origin round-trip. POSTs stay uncached.
  const isDocumentRequest = ["GET", "HEAD"].includes(request.method);
  response.headers.set(
    "Cache-Control",
    isDocumentRequest
      ? "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
      : "private, no-store"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.ui.porsche.com; frame-src 'self' https://www.google.com https://recaptcha.google.com; img-src 'self' data: https:; connect-src 'self' ${BACKEND_URL} ${BACKEND_WS_URL} https://api.ipify.org https://ipapi.co https://ipwho.is https://ipinfo.io https://www.google.com https://www.gstatic.com;`
  );

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
