// import { AnatomyLanding } from '@/components/anatomy/AnatomyLanding';
import { WorkHero } from '@/components/landing/WorkHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Custom websites that bring people in',
  description:
    'Devly designs and develops custom websites for founders and local businesses. Inquire for a custom proposal.',
};

export default function HomePage() {
  // return <AnatomyLanding />;
  return (
    <main className="h-[100dvh] overflow-hidden">
      <WorkHero />
    </main>
  );
}
