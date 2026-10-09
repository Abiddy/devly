'use client';

import { useState } from 'react';
import { AuthShell, inputClass, primaryButtonClass } from '@/components/portal/AuthShell';

export function SetPasswordForm({
  token,
  email,
  name,
  minLength,
}: {
  token: string;
  email: string;
  name: string;
  minLength: number;
}) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError('The passwords don’t match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/portal/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        window.location.assign('/portal');
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || 'Could not set your password.');
    } catch {
      setError('Could not reach the server. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={`Welcome, ${name.split(' ')[0] || name}`}
      subtitle={`Create a password for ${email}. You’ll use it to sign in to your business portal.`}
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input type="email" value={email} autoComplete="username" readOnly hidden />
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={minLength}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`New password (${minLength}+ characters)`}
          className={inputClass}
        />
        <input
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm password"
          className={inputClass}
        />
        <button type="submit" disabled={loading} className={primaryButtonClass}>
          {loading ? 'Saving…' : 'Create password and continue'}
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
    </AuthShell>
  );
}
