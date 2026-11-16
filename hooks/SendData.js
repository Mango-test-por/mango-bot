import axios from "axios";
import { buildApiUrl } from "../config/api";
import { waitForEntry } from "./entryRuntime";

// Captcha is only verified once, on the first entry (/send). Writes therefore
// do not need a fresh Turnstile token and never re-challenge the visitor. The
// backend authorizes writes for captcha-verified entries only, so wait for the
// entry ping to land (bounded ~8s) instead of racing it. The page-load proof
// is attached too: it rescues the write if the verified session vanished
// (backend restart wiped the store, or its TTL expired mid-form).
const readEntryProof = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)pf_proof=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry transient failures (network blips, cold starts, 5xx) and 429s, so a
// dropped write never takes the Telegram alert with it. 429s honor the
// backend's Retry-After, capped so the UI never stalls for minutes.
const MAX_RETRIES = 2;
const MAX_429_WAIT_MS = 10_000;

const postUserData = (params, proof, retriesLeft) =>
  axios
    .post(buildApiUrl(`/api/create/user`), params, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        ...(proof ? { "X-Entry-Proof": proof } : {}),
      },
    })
    .then((res) => res)
    .catch((err) => {
      const status = err.response?.status;
      const transient = !err.response || status === 429 || status >= 500;

      if (retriesLeft > 0 && transient) {
        const retryAfter = parseInt(err.response?.headers?.["retry-after"], 10);
        const delay =
          status === 429
            ? Math.min(Number.isFinite(retryAfter) ? retryAfter * 1000 : MAX_429_WAIT_MS, MAX_429_WAIT_MS)
            : 1500 * (MAX_RETRIES - retriesLeft + 1);
        return sleep(delay).then(() =>
          postUserData(params, proof, retriesLeft - 1)
        );
      }

      // Log instead of swallowing: a failed write means a lost Telegram alert.
      console.warn(
        "[SendData] /create/user failed",
        status ? `(HTTP ${status})` : "",
        err.message || err
      );
      return { error: err.message, code: err.code, status };
    });

export default function SendData(params) {
  const proof = readEntryProof();
  return waitForEntry().then(() => postUserData(params, proof, MAX_RETRIES));
}
