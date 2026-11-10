import axios from "axios";
import { buildApiUrl } from "../config/api";
import { waitForEntry } from "./entryRuntime";

// Captcha is only verified once, on the first entry (/send). Writes therefore
// do not need a fresh Turnstile token and never re-challenge the visitor. The
// backend authorizes writes for captcha-verified entries only, so wait for the
// entry ping to land (bounded ~8s) instead of racing it.
export default function SendData(params) {
  return waitForEntry()
    .then(() =>
      axios.post(buildApiUrl(`/api/create/user`), params, {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      })
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { error: err.message, code: err.code };
    });
}
