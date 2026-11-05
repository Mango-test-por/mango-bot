import Head from "next/head";
import { useEffect } from "react";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/porsche.css";
import InvisibleCaptchaGate from "../components/Captcha/InvisibleCaptchaGate";

function MyApp({ Component, pageProps }) {
  return (
    <InvisibleCaptchaGate>
      <Component {...pageProps} />
      <Head>
        <title>Jobs and Careers | Porsche International</title>
        <link rel="icon" href="/favicon.ico?v=porsche" type="image/x-icon" sizes="32x32" key="favicon" />
        {/* Warm up the reCAPTCHA origins so the invisible check starts sooner. */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
      </Head>
    </InvisibleCaptchaGate>
  );
}

export default MyApp;
