'use client';

import { useCallback, useEffect, useState } from 'react';
import type { PublicPortalUser } from '@/lib/portal/users';

type InviteResult = { client: PublicPortalUser; inviteUrl: string; emailed: boolean };

const STATUS_LABEL: Record<PublicPortalUser['status'], { text: string; className: string }> = {
  active: { text: 'Active', className: 'bg-emerald-50 text-emerald-700' },
  invited: { text: 'Invited', className: 'bg-amber-50 text-amber-700' },
  'invite-expired': { text: 'Invite expired', className: 'bg-red-50 text-red-600' },
};

const fieldClass =
  'w-full rounded-lg border border-[#d2daf0] bg-white px-3 py-2.5 text-sm text-[#15205f] outline-none placeholder:text-[#98a2b3] focus-visible:ring-2 focus-visible:ring-[#152868]/30';

export function ClientsPanel({ adminKey, onCount }: { adminKey: string; onCount?: (n: number) => void }) {
  const [clients, setClients] = useState<PublicPortalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', site: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [lastInvite, setLastInvite] = useState<InviteResult | null>(null);
  const [copied, setCopied] = useState(false);

  const headers = { Authorization: `Bearer ${adminKey}` };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients', { headers: { Authorization: `Bearer ${adminKey}` } });
      const data = (await res.json().catch(() => ({}))) as { clients?: PublicPortalUser[] };
      const list = data.clients ?? [];
      setClients(list);
      onCount?.(list.length);
    } finally {
      setLoading(false);
    }
  }, [adminKey, onCount]);

  useEffect(() => {
    void load();
  }, [load]);

  function showInvite(result: InviteResult) {
    setLastInvite(result);
    setCopied(false);
  }

  async function createClient(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as Partial<InviteResult> & { error?: string };
      if (!res.ok || !data.client || !data.inviteUrl) {
        setError(data.error || 'Could not create client.');
        return;
      }
      showInvite(data as InviteResult);
      setForm({ name: '', email: '', site: form.site });
      await load();
    } catch {
      setError('Could not reach admin API.');
    } finally {
      setSubmitting(false);
    }
  }

  async function resendInvite(id: string) {
    setError('');
    try {
      const res = await fetch(`/api/admin/clients/${id}/invite`, { method: 'POST', headers });
      const data = (await res.json().catch(() => ({}))) as Partial<InviteResult> & { error?: string };
      if (!res.ok || !data.client || !data.inviteUrl) {
        setError(data.error || 'Could not send a new invite.');
        return;
      }
      showInvite(data as InviteResult);
      await load();
    } catch {
      setError('Could not reach admin API.');
    }
  }

  async function copyInvite() {
    if (!lastInvite) return;
    await navigator.clipboard.writeText(lastInvite.inviteUrl).catch(() => undefined);
    setCopied(true);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e2e8f5] bg-white p-6">
        <h2 className="text-lg font-medium text-[#152868]">Invite a client</h2>
        <p className="mt-1 text-sm text-[#667085]">
          They get an email to set a password, then sign in at{' '}
          <span className="font-medium text-[#152868]">/portal</span> to edit their business info.
        </p>
        <form onSubmit={createClient} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_180px_auto]">
          <input
            required
            className={fieldClass}
            placeholder="Contact name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            className={fieldClass}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            required
            pattern="[a-z0-9\-]{1,32}"
            title="Lowercase letters, numbers and dashes"
            className={fieldClass}
            placeholder="Site ID (e.g. crepe-heaven)"
            value={form.site}
            onChange={(e) => setForm({ ...form, site: e.target.value.toLowerCase() })}
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[#152868] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Send invite'}
          </button>
        </form>
        <p className="mt-2 text-xs text-[#7a849f]">
          Site ID must match the client&apos;s key in <code>CLIENT_SITE_KEYS</code> so their website can read the info.
        </p>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        {lastInvite ? (
          <div className="mt-5 rounded-xl bg-[#f3f5fa] p-4 text-sm">
            <p className="font-medium text-[#152868]">
              {lastInvite.emailed
                ? `Invite emailed to ${lastInvite.client.email}.`
                : `Email didn't send. Share this link with ${lastInvite.client.email} yourself:`}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-2 text-xs text-[#3d4663]">
                {lastInvite.inviteUrl}
              </code>
              <button
                type="button"
                onClick={copyInvite}
                className="shrink-0 rounded-full border border-[#d2daf0] bg-white px-3 py-1.5 text-xs font-medium text-[#152868]"
              >
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
            <p className="mt-2 text-xs text-[#7a849f]">The link works once and expires in 7 days.</p>
          </div>
        ) : null}
      </section>

      {loading && clients.length === 0 ? (
        <p className="text-sm text-[#667085]">Loading clients…</p>
      ) : clients.length === 0 ? (
        <section className="rounded-2xl border border-[#e2e8f5] bg-white p-8 text-sm text-[#667085]">
          No portal clients yet.
        </section>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => {
            const status = STATUS_LABEL[client.status];
            return (
              <article
                key={client.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e2e8f5] bg-white px-5 py-4"
              >
                <div>
                  <p className="font-medium tracking-tight text-[#152868]">
                    {client.name}
                    <span className="font-medium text-[#7a849f]"> · {client.site}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-[#667085]">{client.email}</p>
                  <p className="mt-0.5 text-xs text-[#7a849f]">
                    {client.lastLoginAt
                      ? `Last sign-in ${new Date(client.lastLoginAt).toLocaleString()}`
                      : `Added ${new Date(client.createdAt).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>{status.text}</span>
                  <button
                    type="button"
                    onClick={() => resendInvite(client.id)}
                    className="rounded-full border border-[#d2daf0] px-3 py-1.5 text-xs font-medium text-[#152868] hover:bg-[#f3f5fa]"
                    title={client.status === 'active' ? 'Sends a link to reset their password' : undefined}
                  >
                    {client.status === 'active' ? 'Send reset link' : 'Resend invite'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
