import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { FontLoader } from '@/components/FontLoader';
import './globals.css';

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
  title: 'Devly — We help brands meet their KPIs',
  description:
    'Devly connects brands with vetted creators qualified on engagement, consistency, and audience alignment — matched to your awareness, lead gen, or sales objectives.',
  metadataBase: new URL('https://work.devly.info'),
  openGraph: {
    title: 'Devly — We help brands meet their KPIs',
    description:
      'Creator partnerships measured against your KPIs. Qualification-first matching for brands that need results, not vanity metrics.',
    url: 'https://work.devly.info',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly — We help brands meet their KPIs',
    description:
      'Creator partnerships measured against your KPIs. Qualification-first matching for brands that need results, not vanity metrics.',
    creator: '@DevlyOfficial',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <FontLoader />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
