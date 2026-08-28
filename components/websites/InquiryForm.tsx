'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  Globe,
  Mail,
  Megaphone,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from 'lucide-react';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

type Status = 'idle' | 'loading' | 'success' | 'error';

const GOALS = [
  { id: 'leads', label: 'Bring in more leads', icon: Phone },
  { id: 'bookings', label: 'Book calls or appointments', icon: CalendarDays },
  { id: 'sales', label: 'Sell a product or service', icon: ShoppingBag },
  { id: 'premium', label: 'Look more premium than the rest', icon: Sparkles },
  { id: 'story', label: 'Tell a clearer brand story', icon: Megaphone },
  { id: 'unsure', label: 'Not sure yet — help me decide', icon: Search },
] as const;

const BUDGETS = [
  'Under $1,500',
  '$1,500–$5,000',
  '$5,000–$20,000',
  '$20,000+',
  'Not sure yet',
];

const SIZES = [
  'One focused landing page',
  'A few key pages (3–6)',
  'A full site (7+ pages)',
  'Something more custom / app-like',
  'Still figuring it out',
];

const TIMELINES = [
  'ASAP — this month',
  'In the next 4–8 weeks',
  'This quarter',
  'Just exploring for now',
];

const TOTAL_STEPS = 6;

export function InquiryForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [welcomeUrl, setWelcomeUrl] = useState('/websites/welcome');
  const [triedNext, setTriedNext] = useState(false);

  const [goals, setGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [size, setSize] = useState('');
  const [timeline, setTimeline] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const canAdvance = () => {
    switch (step) {
      case 1:
        return goals.length > 0;
      case 2:
        return Boolean(budget);
      case 3:
        return Boolean(size);
      case 4:
        return Boolean(timeline);
      case 5:
        return details.trim().length >= 8;
      case 6:
        return name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!canAdvance()) {
      setTriedNext(true);
      return;
    }
    setTriedNext(false);
    setError('');
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const goBack = () => {
    setTriedNext(false);
    setError('');
    if (step <= 1) return;
    setStep((s) => s - 1);
  };

  const submit = async () => {
    if (!canAdvance()) {
      setTriedNext(true);
      return;
    }
    setStatus('loading');
    setError('');

    const goalLabels = GOALS.filter((g) => goals.includes(g.id)).map((g) => g.label);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          website,
          message: details,
          goals: goalLabels,
          budget,
          size,
          timeline,
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
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[28px] border border-[#e2e8f5] bg-white px-6 py-10 text-center shadow-[0_24px_56px_-36px_rgba(21,40,104,0.4)] sm:px-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            You&apos;re in
          </p>
          <h3 className="mt-3 text-[clamp(1.7rem,4vw,2.35rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
            Welcome package{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              sent.
            </em>
          </h3>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#667085]">
            Check your inbox. We&apos;ll review your answers and follow up within
            1–2 business days if we&apos;re a fit — with a custom proposal, not a
            generic price list.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={welcomeUrl}
              className="inline-flex items-center gap-2 rounded-full bg-[#152868] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#0f1d52]"
            >
              Open Welcome Package
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-[#d2daf0] bg-white px-6 py-3 text-[13px] font-semibold text-[#152868] hover:bg-[#eef1fb]"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-[22px] border border-[#e2e8f5] bg-white px-5 py-4 shadow-[0_12px_32px_-24px_rgba(21,40,104,0.3)] sm:px-6">
        <div className="flex items-center justify-between text-[13px] font-semibold text-[#667085]">
          <span>
            Progress ({step}/{TOTAL_STEPS})
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8edf8]">
          <div
            className="h-full rounded-full bg-[#152868] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-[28px] border border-[#e2e8f5] bg-white p-6 shadow-[0_24px_56px_-36px_rgba(21,40,104,0.4)] sm:p-8">
        {step === 1 && (
          <StepShell
            title="Purpose"
            question="What should this website actually do?"
            hint="Pick everything that applies."
          >
            <div className="space-y-2.5">
              {GOALS.map((goal) => {
                const Icon = goal.icon;
                const selected = goals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex w-full items-center gap-3 rounded-[18px] border px-3.5 py-3 text-left transition ${
                      selected
                        ? 'border-[#152868] bg-[#f4f6fb]'
                        : 'border-[#e6ebf7] bg-white hover:bg-[#f7f8fc]'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? 'border-[#152868] bg-[#152868] text-white'
                          : 'border-[#cfd6ea] bg-white'
                      }`}
                    >
                      {selected ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        selected
                          ? 'bg-[#e8ecf8] text-[#152868]'
                          : 'bg-[#f3f5fa] text-[#7a849f]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] font-semibold text-[#15205f]">
                      {goal.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            title="Budget"
            question="What range are you considering?"
            body="We make websites from $999 for a one-pager to $25k+ for complex custom builds. A range helps us send a custom quote in 1–2 business days."
          >
            <RadioList options={BUDGETS} value={budget} onChange={setBudget} />
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            title="Scope"
            question="How big is this site, roughly?"
            body="This is how we clock complexity — not a lock-in. You can change your mind."
          >
            <RadioList options={SIZES} value={size} onChange={setSize} />
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            title="Timing"
            question="When do you want to be live?"
            body="We’ll be honest if the timeline is tight. Most focused sites land in about 2–4 weeks once content is moving."
          >
            <RadioList options={TIMELINES} value={timeline} onChange={setTimeline} />
          </StepShell>
        )}

        {step === 5 && (
          <StepShell
            title="The brief"
            question="Tell us about the project."
            body="What you sell, who it’s for, pages you need, examples you like — whatever helps."
          >
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={7}
              className="w-full resize-none rounded-[18px] border border-[#d5dcf0] bg-[#f6f8fd] px-4 py-3.5 text-[15px] leading-relaxed text-[#15205f] outline-none transition placeholder:text-[#98a2b3] focus:border-[#152868] focus:bg-white focus:ring-4 focus:ring-[#152868]/10"
              placeholder="Example: 4–5 page site for a local auto shop. Need a clear path to estimates, photo-led work, and a booking or contact form. We have a logo. Inspired by quiet, premium service brands."
            />
            <label className="mt-4 block">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#152868]">
                Current site <span className="font-medium text-[#7a849f]">(optional)</span>
              </span>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-[16px] border border-[#d5dcf0] bg-[#f6f8fd] py-3 pl-10 pr-4 text-[15px] text-[#15205f] outline-none transition placeholder:text-[#98a2b3] focus:border-[#152868] focus:bg-white focus:ring-4 focus:ring-[#152868]/10"
                  placeholder="https://"
                />
              </div>
            </label>
          </StepShell>
        )}

        {step === 6 && (
          <StepShell
            title="Where should we send it?"
            question="Name and email — that’s it."
            body="We’ll email the Welcome Package and only contact you about this project. No newsletter, no spam."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                required
                icon={User}
                value={name}
                onChange={setName}
                autoComplete="name"
                placeholder="Alex Rivera"
              />
              <Field
                label="Email"
                required
                type="email"
                icon={Mail}
                value={email}
                onChange={setEmail}
                autoComplete="email"
                placeholder="alex@company.com"
              />
            </div>
            <div className="mt-4">
              <Field
                label="Company"
                icon={Briefcase}
                value={company}
                onChange={setCompany}
                autoComplete="organization"
                placeholder="Optional"
              />
            </div>
          </StepShell>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="rounded-full border border-[#d2daf0] bg-white px-6 py-3 text-[14px] font-semibold text-[#15205f] transition hover:bg-[#eef1fb]"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-[#152868] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(21,40,104,0.55)] transition hover:bg-[#0f1d52]"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === 'loading'}
            className="rounded-full bg-[#152868] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(21,40,104,0.55)] transition hover:bg-[#0f1d52] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending…' : 'Send it over'}
          </button>
        )}
      </div>

      {(triedNext && !canAdvance()) || error ? (
        <p className="mt-3 text-center text-[13px] text-[#c2410c]" role="alert">
          {error || 'Answer this one to keep going.'}
        </p>
      ) : (
        <p className="mt-3 text-center text-[12px] text-[#98a2b3]">
          Required questions only — skip nothing that has a *.
        </p>
      )}
    </div>
  );
}

function StepShell({
  title,
  question,
  hint,
  body,
  children,
}: {
  title: string;
  question: string;
  hint?: string;
  body?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
        {title}
      </p>
      <h3 className="mt-2 text-[clamp(1.35rem,3vw,1.75rem)] font-extrabold tracking-[-0.035em] text-[#152868]">
        {question} <span className="text-[#c2410c]">*</span>
      </h3>
      {hint ? (
        <p className="mt-1.5 text-[13px] text-[#7a849f]">{hint}</p>
      ) : null}
      {body ? (
        <p className="mt-2 text-[14px] leading-relaxed text-[#667085]">{body}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function RadioList({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex w-full items-center gap-3 rounded-[18px] border px-4 py-3.5 text-left transition ${
              selected
                ? 'border-[#152868] bg-[#f4f6fb]'
                : 'border-[#e6ebf7] bg-white hover:bg-[#f7f8fc]'
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                selected ? 'border-[#152868]' : 'border-[#cfd6ea]'
              }`}
            >
              {selected ? (
                <span className="h-2.5 w-2.5 rounded-full bg-[#152868]" />
              ) : null}
            </span>
            <span className="text-[15px] font-semibold text-[#15205f]">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  autoComplete,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  icon: typeof User;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-[#152868]">
        {label}
        {required ? <span className="text-[#c2410c]"> *</span> : null}
      </span>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
        <input
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-[16px] border border-[#d5dcf0] bg-[#f6f8fd] py-3 pl-10 pr-4 text-[15px] text-[#15205f] outline-none transition placeholder:text-[#98a2b3] focus:border-[#152868] focus:bg-white focus:ring-4 focus:ring-[#152868]/10"
        />
      </div>
    </label>
  );
}

