'use client';

import { useEffect, useState } from 'react';
import type { AnalyticsStats } from '@/lib/analytics';

const STORAGE_KEY = 'devly_admin_key';

type StatsResponse = AnalyticsStats & {
  storage?: string;
  note?: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  goals: string[];
  budget: string;
  size: string;
  timeline: string;
  createdAt: string;
};

export function AdminDashboard() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState<'traffic' | 'leads'>('leads');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadAdmin = async (key: string) => {
    setLoading(true);
    setError('');

    try {
      const headers = { Authorization: `Bearer ${key}` };
      const [statsRes, leadsRes] = await Promise.all([
        fetch('/api/analytics', { headers }),
        fetch('/api/inquiries', { headers }),
      ]);

      if (!statsRes.ok) {
        setStats(null);
        setInquiries([]);
        setError(
          statsRes.status === 401
            ? 'Invalid admin password.'
            : 'Could not load admin data.',
        );
        return;
      }

      const data = (await statsRes.json()) as StatsResponse;
      setStats(data);
      sessionStorage.setItem(STORAGE_KEY, key);

      if (leadsRes.ok) {
        const leads = (await leadsRes.json()) as { inquiries?: Inquiry[] };
        setInquiries(leads.inquiries ?? []);
      } else {
        setInquiries([]);
      }
    } catch {
      setError('Could not reach admin API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      void loadAdmin(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    void loadAdmin(input.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setInput('');
    setStats(null);
    setInquiries([]);
    setError('');
  };

  if (!stats) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Devly Admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your admin password to view traffic and quote leads.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-ring focus-visible:ring-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Open admin'}
          </button>
        </form>

        {error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : null}
      </main>
    );
  }

  const maxDaily = Math.max(...stats.dailyPageviews.map((d) => d.count), 1);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quote leads and landing-page traffic
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          Sign out
        </button>
      </div>

      <div className="mb-8 inline-flex rounded-full border border-border bg-muted/40 p-1">
        <button
          type="button"
          onClick={() => setTab('leads')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'leads'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Leads ({inquiries.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('traffic')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'traffic'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Traffic
        </button>
      </div>

      {tab === 'leads' ? (
        <LeadsList inquiries={inquiries} />
      ) : (
        <TrafficView stats={stats} maxDaily={maxDaily} />
      )}
    </main>
  );
}

function LeadsList({ inquiries }: { inquiries: Inquiry[] }) {
  const [openId, setOpenId] = useState<string | null>(inquiries[0]?.id ?? null);

  if (inquiries.length === 0) {
    return (
      <section className="rounded-2xl border border-border p-8 text-sm text-muted-foreground">
        No quote submissions yet. When someone finishes{' '}
        <span className="font-medium text-foreground">/inquire</span>,
        they show up here — and you still get the notify email.
      </section>
    );
  }

  return (
    <div className="space-y-3">
      {inquiries.map((lead) => {
        const open = openId === lead.id;
        return (
          <article
            key={lead.id}
            className="rounded-2xl border border-border bg-background"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : lead.id)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            >
              <div>
                <p className="font-medium tracking-tight">{lead.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {lead.email}
                  {lead.company ? ` · ${lead.company}` : ''}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium">{lead.budget || 'No budget'}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
            </button>
            {open ? (
              <div className="space-y-3 border-t border-border px-5 py-4 text-sm">
                <Row label="Size" value={lead.size || '—'} />
                <Row label="Timeline" value={lead.timeline || '—'} />
                <Row
                  label="Goals"
                  value={lead.goals.length ? lead.goals.join(', ') : '—'}
                />
                <Row label="Website" value={lead.website || '—'} />
                <div>
                  <p className="text-muted-foreground">Brief</p>
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">
                    {lead.message || '—'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`mailto:${lead.email}`}
                    className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
                  >
                    Reply
                  </a>
                  {lead.website ? (
                    <a
                      href={
                        lead.website.startsWith('http')
                          ? lead.website
                          : `https://${lead.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-xs font-medium"
                    >
                      Current site
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}: </span>
      <span>{value}</span>
    </p>
  );
}

function TrafficView({
  stats,
  maxDaily,
}: {
  stats: StatsResponse;
  maxDaily: number;
}) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total visits" value={stats.totalPageviews} />
        <StatCard label="Unique visitors" value={stats.uniqueVisitors} />
        <StatCard label="Visits today" value={stats.pageviewsToday} />
        <StatCard label="Last 7 days" value={stats.pageviewsLast7Days} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <StatCard label="Book a call clicks" value={stats.ctaClicks} />
        <StatCard label="Started scheduling" value={stats.schedulingStarts} />
      </div>

      <section className="mt-8 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-medium">Last 7 days</h2>
        <div className="mt-6 flex h-40 items-end gap-2">
          {stats.dailyPageviews.map((day) => (
            <div
              key={day.date}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t-md bg-primary"
                style={{
                  height: `${Math.max((day.count / maxDaily) * 100, day.count > 0 ? 8 : 2)}%`,
                  minHeight: day.count > 0 ? 8 : 2,
                }}
                title={`${day.count} visits`}
              />
              <span className="text-[10px] text-muted-foreground">
                {day.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Pages">
          <KeyValueList
            items={Object.entries(stats.viewsByPage)
              .sort((a, b) => b[1] - a[1])
              .map(([page, count]) => ({ label: page, value: count }))}
            empty="No page views yet."
          />
        </Panel>

        <Panel title="Referrers">
          <KeyValueList
            items={stats.topReferrers.map((r) => ({
              label: r.referrer,
              value: r.count,
            }))}
            empty="No referrers recorded yet."
          />
        </Panel>

        <Panel title="Devices">
          <KeyValueList
            items={[
              { label: 'Mobile', value: stats.deviceSplit.mobile },
              { label: 'Desktop', value: stats.deviceSplit.desktop },
              { label: 'Unknown', value: stats.deviceSplit.unknown },
            ]}
          />
        </Panel>

        <Panel title="What we track">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Page visits on `/` and `/portfolio`</li>
            <li>Unique visitors via anonymous browser ID</li>
            <li>&quot;Book a call&quot; button clicks</li>
            <li>Form continues into Calendly scheduling</li>
            <li>Referrer and mobile/desktop split</li>
          </ul>
        </Panel>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Last event:{' '}
        {stats.lastUpdated
          ? new Date(stats.lastUpdated).toLocaleString()
          : '—'}
        {stats.note ? ` · ${stats.note}` : ''}
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border p-6">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function KeyValueList({
  items,
  empty,
}: {
  items: { label: string; value: number }[];
  empty?: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{empty}</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center justify-between gap-4 text-sm"
        >
          <span className="truncate text-muted-foreground">{item.label}</span>
          <span className="font-medium">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
