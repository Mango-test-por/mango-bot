// Verifies the reCAPTCHA token server-side with Google's siteverify endpoint.
// Without this, any bot can fake verification in the browser.

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

  return res.status(200).json({ ok: true });
}
