import { Bricolage_Grotesque, Fraunces } from 'next/font/google';
import type { ReactNode } from 'react';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-studio',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-studio-display',
  display: 'swap',
});

export default function WebsitesLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${bricolage.variable} ${fraunces.variable} font-[family-name:var(--font-studio)] antialiased`}
    >
      {children}
    </div>
  );
}
