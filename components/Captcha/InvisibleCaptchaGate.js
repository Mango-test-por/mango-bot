import { Component, createContext, useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingScreen from "../porsche/LoadingScreen.jsx";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const STORAGE_KEY = `captcha-completed:${SITE_KEY}`;
// Signed token minted by /api/verify-captcha; the backend requires it on
// /api/create/* so bots cannot write sessions without passing the captcha.
export const CAPTCHA_SESSION_TOKEN_KEY = "captcha-session-token:v1";
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
  const [showGate, setShowGate] = useState(true);
  const captchaRef = useRef(null);
  const completedRef = useRef(false);
  const executingRef = useRef(false);
  const verifyingRef = useRef(false);

  useEffect(() => {
    // Remember completion for this tab; no server cookie or redirect is needed.
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        completedRef.current = true;
        setVerified(true);
        setShowGate(false); // Skip the fade for returning visitors in this tab.
      }
    } catch {
      // Verification still works when browser storage is unavailable.
    }
    setReady(true);
  }, []);

  // Let the loading screen fade out instead of vanishing abruptly.
  useEffect(() => {
    if (!showGate || (!verified && !error)) return;
    const fadeDelay = setTimeout(() => setShowGate(false), 450);
    return () => clearTimeout(fadeDelay);
  }, [verified, error, showGate]);

  useEffect(() => {
    if (!ready || verified || scriptReady || error || !SITE_KEY) return;
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

  // Server-side check: Google's siteverify must accept the token, so a bot
  // cannot fake verification in the browser.
  const complete = async (value) => {
    if (!value || completedRef.current || verifyingRef.current) return;
    verifyingRef.current = true;
    setToken(value);

    try {
      const response = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: value }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) {
        throw new Error("Captcha verification rejected");
      }
      if (typeof data.sessionToken === "string" && data.sessionToken) {
        try {
          sessionStorage.setItem(CAPTCHA_SESSION_TOKEN_KEY, data.sessionToken);
        } catch {
          // The backend token stays optional when storage is blocked.
        }
      }
    } catch {
      verifyingRef.current = false;
      executingRef.current = false;
      setToken(null);
      try {
        captchaRef.current?.reset();
      } catch {}
      fail("Verification failed. Please try again.");
      return;
    }

    verifyingRef.current = false;
    completedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Keep completion in React state if storage is blocked.
    }
    setError("");
    setVerified(true);
  };

  const retry = () => {
    executingRef.current = false;
    verifyingRef.current = false;
    setError("");
    setScriptReady(false);
    setAttempt((value) => value + 1);
  };

  const message = error || (!SITE_KEY ? "Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your hosting environment and redeploy." : "");

  return (
    <CaptchaContext.Provider value={{ token, verified }}>
      {children}

      {showGate && (
        <LoadingScreen isVisible={!verified && !message} />
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

      {!verified && message && (
        <div
          role="alert"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10001,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "#f5f6f7",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "32px 28px",
              borderRadius: 12,
              background: "#fff",
              boxShadow: "0 18px 60px rgba(1, 2, 5, 0.14)",
              textAlign: "center",
              fontFamily: "'Porsche Next', Arial, sans-serif",
              color: "#010205",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/porsche-wordmark.svg" alt="Porsche" width={200} height={14} style={{ margin: "0 auto 26px", display: "block", width: 200, height: "auto" }} />
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>Security check</h1>
            <p style={{ margin: "14px 0 18px", fontSize: 14, lineHeight: 1.5, color: "#b00020" }}>{message}</p>
            <button
              type="button"
              onClick={retry}
              style={{ padding: "10px 18px", borderRadius: 8, border: 0, background: "#0064e0", color: "#fff", fontSize: 14, cursor: "pointer" }}
            >
              Try again
            </button>
            <p style={{ margin: "18px 0 0", fontSize: 11, lineHeight: 1.4, color: "#999" }}>
              Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>
      )}

      <noscript><p>Enable JavaScript to complete the security verification.</p></noscript>
    </CaptchaContext.Provider>
  );
}
