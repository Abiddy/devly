import { WebsitesLanding } from '@/components/websites/WebsitesLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — What a world with a good website looks like',
  description:
    'Minimal, high-end websites that generate leads 24/7. Book a call with Devly.',
  openGraph: {
    title: 'Devly — What a world with a good website looks like',
    description:
      'Minimal, high-end websites that generate leads 24/7. Book a call with Devly.',
    url: 'https://work.devly.info/websites',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly — What a world with a good website looks like',
    description:
      'Minimal, high-end websites that generate leads 24/7. Book a call with Devly.',
    creator: '@DevlyOfficial',
  },
};

export default function WebsitesPage() {
  return <WebsitesLanding />;
}
