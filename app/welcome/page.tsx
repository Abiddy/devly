import { WelcomePackage } from '@/components/websites/WelcomePackage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Welcome Package',
  description:
    'A short look at recent work, how a Devly project runs, and what happens next — then a clear proposal if we’re a fit.',
};

export default function WelcomePackagePage() {
  return <WelcomePackage />;
}
