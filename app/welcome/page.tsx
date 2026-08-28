import { WelcomePackage } from '@/components/websites/WelcomePackage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Welcome Package',
  description:
    'How Devly builds lead-focused websites: process, what’s included, pricing overview, and next steps.',
};

export default function WelcomePackagePage() {
  return <WelcomePackage />;
}
