# Cloudflare bot protection

reCAPTCHA has been removed. Bot traffic is now handled at the **Cloudflare
edge** with **Bot Fight Mode**, and the app is configured so real visitors are
never challenged or held back.

## What the code does

- The browser only talks to the **app's own origin** for HTTP API calls.
  `NEXT_PUBLIC_BACKEND_URL` is the relative path `/backend`, and
  `next.config.js` rewrites `/backend/*` to the real backend (`BACKEND_ORIGIN`),
  so API calls pass through the app's front door — i.e. Cloudflare.
- The socket connects straight to the backend (`NEXT_PUBLIC_SOCKET_URL`) over
  WebSocket. Platform proxies (Vercel rewrites) cannot tunnel WebSocket
  upgrades, and polling through them is only the fallback. The exit
  notification depends on this connection, plus the `/api/ping/exit` beacon as
  a backup. Two gotchas this required: `skipTrailingSlashRedirect: true` and a
  dedicated `/backend/socket.io/` rewrite — the generic `:path*` rewrite drops
  the trailing slash that Engine.IO needs.
- `middleware.js` skips its user-agent / spam-referrer heuristics whenever a
  request arrives through Cloudflare (it has a `cf-connecting-ip` or `cf-ray`
  header). Direct hits to the origin still get the heuristics as a safety net.
- The `InvisibleCaptchaGate` is now a tiny always-verified context, so the UI
  renders immediately instead of waiting for a challenge to solve.
- The backend trusts Cloudflare-proxied requests the same way (see the
  `mango-back/CLOUDFLARE.md` guide).
- Link previews / email scanners (Gmail `Google-Safety`, Safe Links, Proofpoint,
  social unfurlers, …) get a tiny **JS-free stub page** instead of the app.

## Link previews / email scanners

Preview fetchers and email security scanners are given a minimal, script-free
page (generic title, `noindex`, `no-store`). They therefore cannot read the
content or trigger an entry/alert. It is still a `200`, so links are not marked
broken.

Real browsers always get the real app. A request is only stubbed when **all** of
these hold: known fetcher UA, page route (`/`, `/captcha`), `GET`/`HEAD`, no
`Sec-Fetch-Mode: navigate`, no `pf_real` cookie, and no `?full=1`.

- Bypass/testing: append `?full=1` (this also sets the `pf_real` cookie).
- The stub is `private, no-store` + `Vary: User-Agent`, so a shared cache can
  never serve it to a real visitor.

## Captcha (Cloudflare Turnstile)

The app uses Turnstile, not reCAPTCHA. It runs **Managed** mode with
`appearance: interaction-only`, so visitors normally see nothing and only get a
box if Cloudflare thinks they are automated.

Setup:

1. Cloudflare dashboard → **Turnstile → Add widget**.
2. Hostname(s) = your domain. Widget mode **Managed**.
3. Pre-clearance **Yes**, level **Managed** (so one solve covers the session).
4. Copy **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; **Secret Key** →
   `TURNSTILE_SECRET_KEY` in `mango-back/.env`.
5. Redeploy both.

`TURNSTILE_MODE` on the backend: `off` | `soft` (verify+log, always allow) |
`enforce` (default). The guard **fails open** on network errors, and the
frontend sends `X-Captcha-Bypass: 1` if the widget cannot produce a token, so a
real visitor is never stuck. Leave the site key empty to disable the gate.

Local testing: use `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` and
`TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` (always pass).


1. **Proxy the site through Cloudflare.** Add the domain, update the
   nameservers, and keep the DNS record for the app **proxied** (orange cloud).
2. **Turn bot control on:** dashboard → **Security → Bots** →
   **Bot Fight Mode** (Free) or **Super Bot Fight Mode** (Pro+).
3. **Configure it to block bots but not people** (this is the important part):
   - *Definitely automated* → **Block**
   - *Likely automated* → **Allow** (do **not** challenge — this is what was
     stopping real people)
   - *Verified bots* → **Allow**
   - Leave Managed Challenge / JS Challenge off unless you want a puzzle.
4. **SSL/TLS** → encryption mode **Full (strict)**.
5. (Optional) Security → WAF → a rate-limiting rule for the submission
   endpoints if you want an extra layer — the app already throttles too.

## Optional: prove requests came through Cloudflare

On the backend you can require a shared secret so a direct hit to the raw origin
cannot spoof `cf-connecting-ip`:

1. Set `CLOUDFLARE_ORIGIN_SECRET` in `mango-back/.env`.
2. In Cloudflare add a **Transform Rule** (Rules → Transform Rules → Modify
   Request Header) that sets `X-Cloudflare-Secret` to the same value for the
   origin.

When the variable is empty the backend simply trusts the presence of Cloudflare
headers.
