import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { FontLoader } from '@/components/FontLoader';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-studio',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Devly — Custom websites that get you results',
  description:
    'Devly designs and develops custom websites for founders and local businesses. Book a call for a clear proposal — no template farms, no surprise checkout.',
  metadataBase: new URL('https://work.devly.info'),
  openGraph: {
    title: 'Devly — Custom websites that get you results',
    description:
      'Devly designs and develops custom websites for founders and local businesses. Book a call for a clear proposal — no template farms, no surprise checkout.',
    url: 'https://work.devly.info',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly — Custom websites that get you results',
    description:
      'Devly designs and develops custom websites for founders and local businesses. Book a call for a clear proposal — no template farms, no surprise checkout.',
    creator: '@DevlyOfficial',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body
        className={`${jakarta.className} font-[family-name:var(--font-studio)] antialiased`}
      >
        <FontLoader />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
