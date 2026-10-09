'use client';

import { useState } from 'react';
import { AuthShell, inputClass, primaryButtonClass } from '@/components/portal/AuthShell';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.assign('/portal');
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || 'Could not sign in.');
    } catch {
      setError('Could not reach the server. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Sign in to your business portal" subtitle="Update your hours, services and website assistant answers.">
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={inputClass}
        />
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={inputClass}
        />
        <button type="submit" disabled={loading} className={primaryButtonClass}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <p className="mt-8 text-xs text-[#7a849f]">
        Forgot your password? Email sales@devly.info and we&apos;ll send you a new setup link.
      </p>
    </AuthShell>
  );
}
