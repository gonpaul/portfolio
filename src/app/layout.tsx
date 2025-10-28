import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation';
import {NextIntlClientProvider} from 'next-intl';

export const metadata: Metadata = {
  title: "Gonpaul | Pavel Goncharov",
  description: "Portfolio website of Pavel Goncharov - Software Engineer",
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon.ico',
  //   apple: '/favicon.ico',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta content="Portfo website" name="description" />
        <meta name="google" content="notranslate" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="shortcut icon" href="/fa.ico" />
      </head>
      <body className="min-h-screen bg-black text-white font-mono text-xs leading-relaxed">
        <NextIntlClientProvider>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}