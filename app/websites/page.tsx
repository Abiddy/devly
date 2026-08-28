import { WebsitesLanding } from '@/components/websites/WebsitesLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Custom websites that get you results',
  description:
    'Devly designs and develops custom websites for founders and local businesses. Book a call for a clear proposal — no template farms, no surprise checkout.',
};

export default function WebsitesPage() {
  return <WebsitesLanding />;
}
