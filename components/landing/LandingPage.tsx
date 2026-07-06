'use client';

import { useState } from 'react';
import { buildCalendlyUrl, type BookingDetails } from '@/lib/calendly';
import { CalendlyEmbed } from './CalendlyEmbed';

type FormState = {
  name: string;
  email: string;
  phone: string;
  website: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  website: '',
};

export function LandingPage() {
  const [step, setStep] = useState<'form' | 'schedule'>('form');
  const [form, setForm] = useState<FormState>(initialForm);
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [error, setError] = useState('');

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }

    const details: BookingDetails = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim() || undefined,
    };

    setCalendlyUrl(buildCalendlyUrl(details));
    setStep('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'schedule') {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#f5f7fa',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <button
            type="button"
            onClick={() => setStep('form')}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'rgb(100,100,105)',
              fontFamily: "'Inter',sans-serif",
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 24,
              padding: 0,
            }}
          >
            ← Back to details
          </button>
          <h1
            style={{
              margin: '0 0 8px',
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: '-0.03em',
              color: 'rgb(20,20,22)',
            }}
          >
            Pick a time
          </h1>
          <p
            style={{
              margin: '0 0 32px',
              fontFamily: "'Inter',sans-serif",
              fontSize: 16,
              color: 'rgb(100,100,105)',
            }}
          >
            Your details are saved — choose a slot that works for you.
          </p>
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <CalendlyEmbed url={calendlyUrl} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        background: 'white',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: 'rgb(20,20,22)',
            }}
          >
            Bring the idea.
            <br />I&apos;ll shape the experience.
          </h1>
          <p
            style={{
              margin: '24px 0 0',
              fontFamily: "'Inter',sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgb(100,100,105)',
              maxWidth: 420,
            }}
          >
            Share a few details, then pick a time. No back-and-forth — just a
            straight path to your call.
          </p>
          <a
            href="/portfolio"
            style={{
              display: 'inline-block',
              marginTop: 32,
              fontFamily: "'Inter',sans-serif",
              fontSize: 14,
              color: 'rgb(100,100,105)',
              textDecoration: 'underline',
              textUnderlineOffset: 4,
            }}
          >
            View portfolio →
          </a>
        </div>

        <form
          onSubmit={handleContinue}
          style={{
            border: '1px solid rgb(229,229,234)',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid rgb(229,229,234)',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: 'rgb(100,100,105)',
              }}
            >
              Devly — Website Application
            </span>
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: 'rgb(134,134,139)',
              }}
            >
              Confidential · Reviewed within 24h
            </span>
          </div>

          <div style={{ padding: '32px 24px 24px' }}>
            <h2
              style={{
                margin: '0 0 24px',
                fontFamily: "'Inter',sans-serif",
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: '-0.03em',
                color: 'rgb(20,20,22)',
              }}
            >
              Let&apos;s get to know you
            </h2>

            <Field
              label="Full Name"
              required
              value={form.name}
              onChange={(v) => updateField('name', v)}
              placeholder="Your full name"
            />
            <Field
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={(v) => updateField('email', v)}
              placeholder="your@email.com"
            />
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 6,
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgb(20,20,22)',
                }}
              >
                Phone / WhatsApp <span style={{ color: 'rgb(253,93,92)' }}>*</span>
              </label>
              <p
                style={{
                  margin: '0 0 8px',
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12,
                  color: 'rgb(134,134,139)',
                  lineHeight: 1.5,
                }}
              >
                Include your country code. You&apos;ll receive a meeting
                confirmation after you book.
              </p>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 555 000 0000"
                style={inputStyle}
              />
            </div>
            <Field
              label="Current Website"
              value={form.website}
              onChange={(v) => updateField('website', v)}
              placeholder="https:// (optional)"
            />

            {error ? (
              <p
                style={{
                  margin: '0 0 16px',
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 13,
                  color: 'rgb(253,93,92)',
                }}
              >
                {error}
              </p>
            ) : null}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: 8,
                borderTop: '1px solid rgb(229,229,234)',
                marginTop: 8,
              }}
            >
              <button
                type="submit"
                style={{
                  marginTop: 16,
                  padding: '12px 24px',
                  borderRadius: 64,
                  border: 'none',
                  background: 'rgb(20,20,22)',
                  color: 'white',
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: 'pointer',
                  letterSpacing: '-0.02em',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid rgb(229,229,234)',
  fontFamily: "'Inter',sans-serif",
  fontSize: 15,
  color: 'rgb(20,20,22)',
  outline: 'none',
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: FieldProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: 'block',
          marginBottom: 8,
          fontFamily: "'Inter',sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: 'rgb(20,20,22)',
        }}
      >
        {label}{' '}
        {required ? (
          <span style={{ color: 'rgb(253,93,92)' }}>*</span>
        ) : null}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}
