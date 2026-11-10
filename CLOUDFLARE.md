# Cloudflare bot protection

reCAPTCHA has been removed. Bot traffic is now handled at the **Cloudflare
edge** with **Bot Fight Mode**, and the app is configured so real visitors are
never challenged or held back.

## What the code does

- The browser only talks to the **app's own origin**. `NEXT_PUBLIC_BACKEND_URL`
  is set to the relative path `/backend`, and `next.config.js` rewrites
  `/backend/*` to the real backend (`BACKEND_ORIGIN`). That way every API **and**
  socket.io request passes through the app's front door — i.e. Cloudflare — and
  never hits the backend host directly.
- `middleware.js` skips its user-agent / spam-referrer heuristics whenever a
  request arrives through Cloudflare (it has a `cf-connecting-ip` or `cf-ray`
  header). Direct hits to the origin still get the heuristics as a safety net.
- The `InvisibleCaptchaGate` is now a tiny always-verified context, so the UI
  renders immediately instead of waiting for a challenge to solve.
- The backend trusts Cloudflare-proxied requests the same way (see the
  `mango-back/CLOUDFLARE.md` guide).

## One-time Cloudflare setup

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
