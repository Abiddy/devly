import { InquiryForm } from '@/components/websites/InquiryForm';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Website inquiry',
  description:
    'Tell us about your project. Get the Devly Welcome Package instantly and next steps within 1–2 business days.',
};

export default function InquirePage() {
  return (
    <div className="websites min-h-screen bg-[#410C01] text-white">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/websites"
          className="font-inter text-[12px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
        >
          Devly
        </Link>
        <Link
          href="/websites/welcome"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
        >
          Welcome Package
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-8 sm:px-8 sm:pt-12">
        <InquiryForm />
      </main>
    </div>
  );
}
