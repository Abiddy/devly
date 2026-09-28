import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { CALENDLY_EVENT_URL } from '@/lib/calendly';
import './anatomy.css';

type NavKey = 'home' | 'pricing' | 'quote';

export function BookButton({
  className = '',
  children = 'Book a call',
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={CALENDLY_EVENT_URL} target="_blank" rel="noopener noreferrer" className={`an-btn ${className}`}>
      {children}
      <ArrowUpRight aria-hidden />
    </a>
  );
}

export function SiteNav({ active = 'home' }: { active?: NavKey }) {
  const onHome = active === 'home';
  const links: { href: string; label: string; key?: NavKey }[] = [
    { href: onHome ? '#anatomy' : '/#anatomy', label: 'Anatomy' },
    { href: onHome ? '#work' : '/#work', label: 'Work' },
    { href: '/pricing', label: 'Pricing', key: 'pricing' },
    { href: '/inquire', label: 'Get a quote', key: 'quote' },
  ];
  return (
    <header className="an-nav">
      <Link href="/" className="an-nav__logo">
        Devly
      </Link>
      <nav className="an-nav__links" aria-label="Primary">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className={l.key === active ? 'is-active' : undefined}
            aria-current={l.key === active ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <BookButton className="an-btn--sm" />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="an-footer">
      <span className="an-nav__logo">Devly</span>
      <nav aria-label="Footer">
        <Link href="/#work">Work</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/inquire">Get a quote</Link>
        <a href="mailto:sales@devly.info">Contact</a>
      </nav>
      <small>© {new Date().getFullYear()} Devly</small>
    </footer>
  );
}
