import { Component, createContext, useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const STORAGE_KEY = `captcha-completed:${SITE_KEY}`;
const CaptchaContext = createContext({ token: null, verified: false });

export const useCaptcha = () => useContext(CaptchaContext);

class CaptchaWidgetBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError("reCAPTCHA could not start. Check that your site key is for reCAPTCHA v2 Invisible.");
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function InvisibleCaptchaGate({ children }) {
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [scriptReady, setScriptReady] = useState(false);
  const captchaRef = useRef(null);
  const completedRef = useRef(false);
  const executingRef = useRef(false);

  useEffect(() => {
    // Remember completion for this tab; no server cookie or redirect is needed.
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        completedRef.current = true;
        setVerified(true);
      }
    } catch {
      // Verification still works when browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || verified || scriptReady || error || !SITE_KEY) return;
    // reCAPTCHA normally resolves in ~1s. Surface a retry instead of
    // leaving visitors on a blank screen if Google is unreachable.
    const timeout = setTimeout(() => {
      if (!completedRef.current) setError("reCAPTCHA could not load. Check your connection and try again.");
    }, 15000);
    return () => clearTimeout(timeout);
  }, [ready, verified, scriptReady, error, attempt]);

  const fail = (message) => {
    if (!completedRef.current) setError(message);
  };

  const executeCaptcha = (script) => {
    if (completedRef.current || executingRef.current) return;
    if (script?.errored) {
      fail("reCAPTCHA could not load. Please try again.");
      return;
    }
    setScriptReady(true);
    try {
      if (!captchaRef.current) throw new Error("Widget unavailable");
      executingRef.current = true;
      captchaRef.current.execute();
    } catch {
      fail("reCAPTCHA could not start. Please try again.");
    }
  };

  const complete = (value) => {
    if (!value || completedRef.current) return;
    completedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Keep completion in React state if storage is blocked.
    }
    setToken(value);
    setError("");
    setVerified(true);
  };

  const retry = () => {
    executingRef.current = false;
    setError("");
    setScriptReady(false);
    setAttempt((value) => value + 1);
  };

  const message = error || (!SITE_KEY ? "Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your hosting environment and redeploy." : "");

  return (
    <CaptchaContext.Provider value={{ token, verified }}>
      {/*
        Render the page immediately. The invisible reCAPTCHA keeps running in
        the background and the forms gate their final submit on `verified`,
        so loading no longer waits for Google's script.
      */}
      {children}
      {ready && !verified && !message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(1, 2, 5, 0.82)",
            color: "#fff",
            font: "500 12px/1.2 system-ui, sans-serif",
            pointerEvents: "none",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 12,
              height: 12,
              border: "2px solid #fff",
              borderBottomColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "captcha-gate-spin 1s linear infinite",
            }}
          />
          Verifying browser…
        </div>
      )}
      {ready && !verified && !message && (
        <div style={{ position: "relative", zIndex: 10000 }}>
          <CaptchaWidgetBoundary key={attempt} onError={fail}>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={SITE_KEY}
              size="invisible"
              badge="bottomright"
              asyncScriptOnLoad={executeCaptcha}
              onChange={complete}
              onErrored={() => fail("reCAPTCHA failed. Please check your connection and try again.")}
              onExpired={() => fail("Verification expired. Please try again.")}
            />
          </CaptchaWidgetBoundary>
        </div>
      )}
      <style jsx global>{`@keyframes captcha-gate-spin { to { transform: rotate(360deg); } }`}</style>
      {!verified && message && (
        <div role="alert" style={{ position: "fixed", inset: 0, zIndex: 10001, display: "grid", placeItems: "center", padding: 24, background: "#010205", color: "#fff", textAlign: "center" }}>
          <div>
            <h1>Security verification required</h1>
            <p>{message}</p>
            <button type="button" onClick={retry}>Try again</button>
          </div>
        </div>
      )}
      <noscript><p>Enable JavaScript to complete the security verification.</p></noscript>
    </CaptchaContext.Provider>
  );
}
