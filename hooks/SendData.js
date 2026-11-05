import axios from "axios";
import { buildApiUrl } from "../config/api";
import { CAPTCHA_SESSION_TOKEN_KEY } from "../components/Captcha/InvisibleCaptchaGate";

export default function SendData(params) {
  // The backend requires the captcha-minted session token on /api/create/*.
  let sessionToken = null;
  try {
    sessionToken = sessionStorage.getItem(CAPTCHA_SESSION_TOKEN_KEY);
  } catch {
    sessionToken = null;
  }

  return axios
    .post(buildApiUrl(`/api/create/user`), params, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        ...(sessionToken ? { "X-Session-Token": sessionToken } : {}),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { error: err.message, code: err.code };
    });
}
