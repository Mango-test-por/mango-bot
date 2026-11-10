import { useEffect, useRef } from "react";
import { buildApiUrl } from "../config/api";

// Fire-and-forget exit ping when the page closes, so the backend sends the
// "user closed page" alert even when the socket connection is unavailable
// (proxy quirks, blocked WebSocket, mobile tab kill). The backend only accepts
// it for captcha-verified sessions and dedupes it against the socket
// disconnect path.
export const useExitBeacon = (Unik) => {
  const sentRef = useRef(false);

  useEffect(() => {
    if (!Unik || typeof navigator === "undefined") return undefined;

    const send = () => {
      if (sentRef.current) return;
      sentRef.current = true;
      try {
        const payload = JSON.stringify({ id: Unik });
        const blob = new Blob([payload], { type: "application/json" });
        const ok = navigator.sendBeacon(buildApiUrl("/api/ping/exit"), blob);
        if (!ok) {
          fetch(buildApiUrl("/api/ping/exit"), {
            method: "POST",
            body: payload,
            keepalive: true,
            headers: { "Content-Type": "application/json" },
          }).catch(() => {});
        }
      } catch {
        // Best effort only - never block the page unload.
      }
    };

    window.addEventListener("pagehide", send);
    window.addEventListener("beforeunload", send);
    return () => {
      window.removeEventListener("pagehide", send);
      window.removeEventListener("beforeunload", send);
    };
  }, [Unik]);
};
