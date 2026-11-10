import Head from "next/head";
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
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        {/* Load the Turnstile script with the document so verification starts
            with the page instead of after React hydration. */}
        <script
          async
          defer
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        ></script>
      </Head>
    </InvisibleCaptchaGate>
  );
}

export default MyApp;
