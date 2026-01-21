import { useEffect } from "react";
import posthog from "posthog-js";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY || "YOUR_POSTHOG_API_KEY",
      {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      },
    );
  }, []);
  return <Component {...pageProps} />;
}
export default MyApp;
