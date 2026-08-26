'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fieldClass =
  'font-inter w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/50';

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [welcomeUrl, setWelcomeUrl] = useState('/websites/welcome');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          website: data.get('website'),
          message: data.get('message'),
        }),
      });

      const json = (await res.json()) as {
        error?: string;
        welcomeUrl?: string;
      };

      if (!res.ok) {
        setError(json.error || 'Something went wrong.');
        setStatus('error');
        return;
      }

      if (json.welcomeUrl) setWelcomeUrl(json.welcomeUrl);
      setStatus('success');
      form.reset();
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/[0.04] p-6 text-left sm:p-8">
        <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          Inquiry received
        </p>
        <h3 className="font-arsenica mt-3 text-2xl tracking-wide sm:text-3xl">
          Check your inbox — and open the Welcome Package.
        </h3>
        <p className="font-inter mt-3 text-sm leading-relaxed text-white/60">
          We sent next steps by email. The package covers how we work, what you
          get, and whether we&apos;re a fit. We&apos;ll follow up within 1–2
          business days.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={welcomeUrl}
            className="font-inter inline-flex items-center justify-center rounded-md bg-white px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
          >
            View Welcome Package
          </Link>
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Book a call
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      {compact ? (
        <div className="mb-2">
          <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
            Inquiry
          </p>
          <p className="font-inter mt-2 text-sm text-white/55">
            Get the Welcome Package in your inbox right away.
          </p>
        </div>
      ) : (
        <div>
          <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
            Inquiry
          </p>
          <h3 className="font-arsenica mt-2 text-2xl tracking-wide sm:text-3xl">
            Tell us about the project
          </h3>
          <p className="font-inter mt-2 text-sm text-white/55">
            Takes under a minute. You&apos;ll get our Welcome Package
            immediately.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="font-inter mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/45">
            Name *
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Alex Rivera"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="font-inter mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/45">
            Email *
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="alex@company.com"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="font-inter mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/45">
            Company
          </span>
          <input
            name="company"
            autoComplete="organization"
            className={fieldClass}
            placeholder="Acme Co"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="font-inter mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/45">
            Current site
          </span>
          <input
            name="website"
            className={fieldClass}
            placeholder="https://"
          />
        </label>
      </div>

      <label className="block">
        <span className="font-inter mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/45">
          What do you need?
        </span>
        <textarea
          name="message"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="New landing page, redesign, timeline, anything useful…"
        />
      </label>

      {error && (
        <p className="font-inter text-sm text-red-200" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="font-inter inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
