import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <title>Pantheon.so - AI-Powered San Francisco Exploration</title>
        <meta name="description" content="Discover San Francisco like never before with Pantheon.so's AI-powered insights and recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}