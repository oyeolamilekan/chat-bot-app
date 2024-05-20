import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from "@clerk/nextjs";


const inter = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "900"], subsets: ['devanagari'] });

export const metadata: Metadata = {
  title: 'ChatAPP — Chat with your favourite blogs.',
  description: 'Instantly chat with your favorite blogs and get real-time responses, all in one app.',
  metadataBase: new URL('https://chat-app.withapp.xyz/'),
  twitter: {
    title: 'ChatAPP — Chat with your favourite blogs.',
    card: 'summary_large_image',
  },
  openGraph: {
    siteName: 'ChatAPP',
    title: 'ChatAPP — Chat with your favourite blogs.',
    description: 'Instantly chat with your favorite blogs and get real-time responses, all in one app.',
    type: 'website',
    url: 'https://chat-app.withapp.xyz/',
    locale: 'en-US',
    images: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ChatAPP Preview',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Providers>
          <body className={inter.className}>{children}</body>
          <Toaster />
        </Providers>
      </ClerkProvider>
    </html>
  );
}
