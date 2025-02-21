"use client";
import Sky from "@/components/sky";
import Link from "next/link";
import localFont from "next/font/local";
import Script from "next/script";

const pearSoda = localFont({
  src: "../public/PearSoda.ttf",
  variable: "--font-pearsoda",
});

const grapeSoda = localFont({
  src: "../public/GrapeSoda.ttf",
  variable: "--font-grapesoda",
});

export default function Home() {
  return (
    <>
      <Sky />
      <div
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen p-8 ${grapeSoda.className}`}
      >
        <h1 className="text-7xl font-bold">elr</h1>
        <p className={`text-2xl pb-5 ${pearSoda.className}`}>
          a <Link href="https://en.wikipedia.org/wiki/Webring">WEBRING</Link> of
          technical, creative and cool people.{" "}
        </p>
        <div
          id="index"
          className={`${pearSoda.className} max-w-md w-full text-2xl bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg [&_ul]:list-inside`}
        >
          <Script src="/onionring-variables.js" strategy="afterInteractive" />
          <Script src="/onionring-index.js" strategy="afterInteractive" />
        </div>
        <p className="pt-9">
          <span className={pearSoda.className}>want to join?</span>{" "}
          <span>
            contact{" "}
            <Link href="mailto:elr@aram.sh" className="text-blue-700">
              aram
            </Link>
          </span>
        </p>
        <footer className="fixed bottom-0 left-0 w-full p-4 text-center">
          <p>
            Fonts by{" "}
            <Link href="https://fontenddev.com/" className="underline text-xs">
              Font End Dev
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}
