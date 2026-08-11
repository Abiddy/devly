import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Instrument_Serif, Manrope } from 'next/font/google';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-agency-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-agency-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Devly — We help brands meet their KPIs',
  description:
    'Devly connects brands with vetted creators qualified on engagement, consistency, and audience alignment — matched to your awareness, lead gen, or sales objectives.',
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
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
