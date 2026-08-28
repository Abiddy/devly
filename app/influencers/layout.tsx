import type { ReactNode } from 'react';

export default function InfluencersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-[family-name:var(--font-inter)] antialiased">
      {children}
    </div>
  );
}
