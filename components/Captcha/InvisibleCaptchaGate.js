import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Cloudflare Turnstile (no reCAPTCHA). The widget runs in the background in
// Managed mode and only asks for a box when the visitor looks automated. Every
// call to the backend carries a one-time token, which the server verifies with
// Cloudflare's Siteverify API.
//
// Safety: if Turnstile is not configured, fails to load, or does not produce a
// token in time, the gate opens anyway (`bypass`) so a real visitor is never
// stuck. Nothing here gates the page; it only reports readiness.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const VERIFY_TIMEOUT_MS = 8000;

const GateContext = createContext({
  verified: true,
  bypass: false,
  getToken: async () => null,
});

export const useCaptcha = () => useContext(GateContext);

// Plain (non-hook) access for SendData and friends.
export const captchaRuntime = {
  getToken: async () => null,
};

function loadScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (window.__cfTurnstileLoading) return window.__cfTurnstileLoading;
  window.__cfTurnstileLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile script failed"));
    document.head.appendChild(script);
  });
  return window.__cfTurnstileLoading;
}

export default function InvisibleCaptchaGate({ children }) {
  const configured = Boolean(SITE_KEY);
  const [verified, setVerified] = useState(!configured);
  const [bypass, setBypass] = useState(!configured);

  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const tokenRef = useRef(null);
  const waiterRef = useRef(null);
  const verifiedRef = useRef(!configured);
  const chainRef = useRef(Promise.resolve());

  const settle = useCallback((token) => {
    if (token) tokenRef.current = token;
    verifiedRef.current = true;
    setVerified(true);
    if (waiterRef.current) {
      const waiter = waiterRef.current;
      waiterRef.current = null;
      waiter(token || null);
    }
  }, []);

  const failOpen = useCallback(() => {
    setBypass(true);
    verifiedRef.current = true;
    setVerified(true);
    if (waiterRef.current) {
      const waiter = waiterRef.current;
      waiterRef.current = null;
      waiter(null);
    }
  }, []);

  useEffect(() => {
    if (!configured) return undefined;
    let cancelled = false;
    let timeout;

    (async () => {
      try {
        await loadScript();
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          size: "flexible",
          theme: "auto",
          callback: (token) => settle(token),
          "error-callback": () => failOpen(),
          "timeout-callback": () => failOpen(),
        });
        timeout = setTimeout(() => {
          if (!verifiedRef.current) failOpen();
        }, VERIFY_TIMEOUT_MS);
      } catch {
        failOpen();
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [configured, settle, failOpen]);

  const acquireToken = useCallback(async () => {
    if (!configured) return null;
    if (tokenRef.current) {
      const token = tokenRef.current;
      tokenRef.current = null;
      return token;
    }
    if (!window.turnstile || widgetIdRef.current == null) return null;

    return new Promise((resolve) => {
      waiterRef.current = resolve;
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        waiterRef.current = null;
        resolve(null);
        return;
      }
      setTimeout(() => {
        if (waiterRef.current === resolve) {
          waiterRef.current = null;
          resolve(null);
        }
      }, VERIFY_TIMEOUT_MS);
    });
  }, [configured]);

  // Serialize token acquisition so overlapping sends each get their own token.
  const getToken = useCallback(() => {
    const next = chainRef.current.then(acquireToken, acquireToken);
    chainRef.current = next.catch(() => null);
    return next;
  }, [acquireToken]);

  captchaRuntime.getToken = getToken;

  return (
    <GateContext.Provider value={{ verified, bypass, getToken }}>
      {children}
      {configured && (
        <div
          ref={containerRef}
          style={{ position: "fixed", left: 16, bottom: 16, zIndex: 10000 }}
        />
      )}
    </GateContext.Provider>
  );
}
