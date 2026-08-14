import { WebsitesPricing } from '@/components/websites/WebsitesPricing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Website pricing',
  description:
    'Website package for $1,500: full landing page, forms & booking, consultations, 3 revisions, and launch. Custom plans available.',
  openGraph: {
    title: 'Devly — Website pricing',
    description:
      'Website package for $1,500: full landing page, forms & booking, consultations, 3 revisions, and launch. Custom plans available.',
    url: 'https://work.devly.info/websites/pricing',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
};

export default function WebsitesPricingPage() {
  return <WebsitesPricing />;
}
