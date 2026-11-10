import axios from "axios";
import { buildApiUrl } from "../config/api";

// Captcha is only verified once, on the first entry (/send). Writes therefore
// do not need a fresh Turnstile token and never re-challenge the visitor.
export default function SendData(params) {
  return axios
    .post(buildApiUrl(`/api/create/user`), params, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { error: err.message, code: err.code };
    });
}
