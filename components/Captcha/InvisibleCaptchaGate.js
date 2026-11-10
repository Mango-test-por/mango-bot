import { createContext, useContext } from "react";

// reCAPTCHA has been removed entirely. Bot traffic is now handled at the
// Cloudflare edge (Bot Fight Mode), so the app itself no longer has to solve a
// browser challenge before it can talk to the backend.
//
// This provider is kept as a tiny "are we clear to go?" context so the UI
// components that used to wait for the captcha (Form and the step-0 screen)
// keep working unchanged. It is always verified, so nothing is ever held back.
const ALWAYS_VERIFIED = { verified: true };
const GateContext = createContext(ALWAYS_VERIFIED);

export const useCaptcha = () => useContext(GateContext);

export default function InvisibleCaptchaGate({ children }) {
  return (
    <GateContext.Provider value={ALWAYS_VERIFIED}>
      {children}
    </GateContext.Provider>
  );
}
