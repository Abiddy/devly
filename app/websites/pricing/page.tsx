import { WebsitesPricing } from '@/components/websites/WebsitesPricing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — How website pricing works',
  description:
    'Transparent pricing philosophy. You choose the investment; we send a custom proposal after a short call — no hidden fees.',
};

export default function WebsitesPricingPage() {
  return <WebsitesPricing />;
}
