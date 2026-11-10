import axios from "axios";
import { buildApiUrl } from "../config/api";
import { captchaRuntime } from "../components/Captcha/InvisibleCaptchaGate";

export default async function SendData(params) {
  // One Turnstile token per write. If it cannot be produced, send a bypass flag
  // so the backend lets the request through (fail-open).
  const token = await captchaRuntime.getToken();

  return axios
    .post(buildApiUrl(`/api/create/user`), params, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "X-Turnstile-Token": token } : { "X-Captcha-Bypass": "1" }),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { error: err.message, code: err.code };
    });
}
