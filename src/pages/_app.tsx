import Navbar from "@/component/fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });

const disebleNavbar = ["auth", "admin"];

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider>
      {/* Gunakan font Lato */}
      <div className={lato.className}>
        {!disebleNavbar.includes(pathname.split("/")[1]) && <Navbar />}

        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
