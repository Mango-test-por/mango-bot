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
    this.props.onError("reCAPTCHA could not start. Check that your site key is for reCAPTCHA v2.");
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
  const [checkboxMode, setCheckboxMode] = useState(true);
  const captchaRef = useRef(null);
  const widgetRef = useRef(null);
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
    const timeout = setTimeout(() => {
      if (!completedRef.current) setError("reCAPTCHA could not load. Check your connection and try again.");
    }, 15000);
    return () => clearTimeout(timeout);
  }, [ready, verified, scriptReady, error, attempt]);

  const fail = (message) => {
    if (!completedRef.current) setError(message);
  };

  const handleScriptLoad = (script) => {
    if (script?.errored) {
      fail("reCAPTCHA could not load. Please try again.");
      return;
    }
    setScriptReady(true);
    // A visible key renders the 304x78 checkbox; an invisible key leaves only
    // a hidden iframe. Detect it so the Continue button is only offered when
    // there is no checkbox to click.
    setTimeout(() => {
      const frames = widgetRef.current?.querySelectorAll("iframe") || [];
      const hasCheckbox = [...frames].some(
        (frame) => frame.getBoundingClientRect().width > 50
      );
      setCheckboxMode(hasCheckbox);
    }, 700);
  };

  // Works for an invisible key as well: the checkbox widget reports through
  // onChange, while a manual execute covers keys that render no checkbox.
  const verify = () => {
    if (completedRef.current || executingRef.current) return;
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
      {children}

      {ready && !verified && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="captcha-gate-title"
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
            <h1 id="captcha-gate-title" style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>
              Security check
            </h1>
            {!message && (
              <p style={{ margin: "10px 0 22px", fontSize: 14, lineHeight: 1.5, color: "#555" }}>
                Confirm you are not a robot to continue.
              </p>
            )}

            {message ? (
              <div role="alert" style={{ marginTop: 14 }}>
                <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.5, color: "#b00020" }}>{message}</p>
                <button
                  type="button"
                  onClick={retry}
                  style={{ padding: "10px 18px", borderRadius: 8, border: 0, background: "#0064e0", color: "#fff", fontSize: 14, cursor: "pointer" }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                {ready && (
                  <div ref={widgetRef} style={{ display: "flex", justifyContent: "center", minHeight: 78 }}>
                    <CaptchaWidgetBoundary key={attempt} onError={fail}>
                      <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={SITE_KEY}
                        size="normal"
                        asyncScriptOnLoad={handleScriptLoad}
                        onChange={complete}
                        onErrored={() => fail("reCAPTCHA failed. Please check your connection and try again.")}
                        onExpired={() => fail("Verification expired. Please try again.")}
                      />
                    </CaptchaWidgetBoundary>
                  </div>
                )}
                {!scriptReady && (
                  <p style={{ margin: "10px 0 0", fontSize: 12, color: "#888" }}>Loading security check…</p>
                )}
                {scriptReady && !checkboxMode && (
                  <button
                    type="button"
                    onClick={verify}
                    disabled={!scriptReady}
                    style={{
                      marginTop: 18,
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: 8,
                      border: 0,
                      background: scriptReady ? "#0064e0" : "#e5e6eb",
                      color: scriptReady ? "#fff" : "#cbccd2",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: scriptReady ? "pointer" : "default",
                    }}
                  >
                    Continue
                  </button>
                )}
              </>
            )}
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
