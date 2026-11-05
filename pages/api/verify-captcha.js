// Verifies the reCAPTCHA token server-side with Google's siteverify endpoint.
// Without this, any bot can fake verification in the browser.
//
// On success it also mints a short-lived session token (HMAC of the expiry,
// signed with SESSION_TOKEN_SECRET). The backend requires this token on
// /api/create/*, so bots cannot write sessions or trigger alerts without
// passing the captcha first.

import crypto from "crypto";

const SESSION_TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

function issueSessionToken() {
  const secret = process.env.SESSION_TOKEN_SECRET;
  if (!secret) return null;
  const expires = Date.now() + SESSION_TOKEN_TTL_MS;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(String(expires))
    .digest("base64url");
  return `${expires}.${signature}`;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ ok: false, error: "Captcha secret not configured" });
  }

  const token = req.body?.token;
  if (typeof token !== "string" || token.length === 0) {
    return res.status(400).json({ ok: false, error: "Missing token" });
  }

  let data;
  try {
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    );
    data = await verifyResponse.json();
  } catch {
    return res.status(502).json({ ok: false, error: "Could not reach reCAPTCHA" });
  }

  if (data.success !== true) {
    return res
      .status(403)
      .json({ ok: false, errors: data["error-codes"] || [] });
  }

  // Optional allow-list for hostnames. If empty, the token must have been
  // issued for the same host that receives this request.
  const configured = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  const allowed =
    configured.length > 0
      ? configured
      : [String(req.headers.host || "").toLowerCase().split(":")[0]];
  if (allowed.length > 0 && !allowed.includes(String(data.hostname || "").toLowerCase())) {
    return res.status(403).json({ ok: false, error: "Hostname not allowed" });
  }

  const sessionToken = issueSessionToken();
  return res.status(200).json(sessionToken ? { ok: true, sessionToken } : { ok: true });
}
