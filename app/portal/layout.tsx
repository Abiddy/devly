import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business portal · Devly',
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f3f5fa] text-[#15205f]">{children}</div>;
}
