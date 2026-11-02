import { useEffect } from "react";
import { useRouter } from "next/router";

// Support old challenge URLs after the browser CAPTCHA completes.
export default function CaptchaPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    let destination = "/";
    if (typeof router.query.next === "string") {
      try {
        const target = new URL(router.query.next, window.location.origin);
        if (
          target.origin === window.location.origin &&
          target.pathname.replace(/\/+$/, "") !== "/captcha"
        ) {
          destination = `${target.pathname}${target.search}${target.hash}`;
        }
      } catch {
        // Fall back to the home page for an invalid return URL.
      }
    }

    router.replace(destination);
  }, [router.isReady, router.query.next]);

  return <p role="status">Verification complete. Redirecting…</p>;
}
