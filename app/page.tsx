import { AnatomyLanding } from '@/components/anatomy/AnatomyLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The anatomy of a good website — Devly',
  description:
    'Looking good is the entry fee. See what makes a website actually work — clarity, trust, leads, speed, search, and measurement — then have Devly build one for you.',
};

export default function HomePage() {
  return <AnatomyLanding />;
}
