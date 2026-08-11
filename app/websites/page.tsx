import { LandingPage } from '@/components/landing/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Websites that bring you leads',
  description:
    'Software solutions, websites, and SEO — book a call to get started.',
  openGraph: {
    title: 'Devly — Websites that bring you leads',
    description:
      'Software solutions, websites, and SEO — book a call to get started.',
    url: 'https://work.devly.info/websites',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly — Websites that bring you leads',
    description:
      'Software solutions, websites, and SEO — book a call to get started.',
    creator: '@DevlyOfficial',
  },
};

export default function WebsitesPage() {
  return <LandingPage />;
}
