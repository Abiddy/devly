'use client';

import { useEffect, useState } from 'react';
import type { AnalyticsStats } from '@/lib/analytics';

const STORAGE_KEY = 'devly_admin_key';

type StatsResponse = AnalyticsStats & {
  storage?: string;
  note?: string;
};

export function AdminDashboard() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadStats = async (key: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/analytics', {
        headers: { Authorization: `Bearer ${key}` },
      });

      if (!res.ok) {
        setStats(null);
        setError(
          res.status === 401 ? 'Invalid admin password.' : 'Could not load stats.',
        );
        return;
      }

      const data = (await res.json()) as StatsResponse;
      setStats(data);
      sessionStorage.setItem(STORAGE_KEY, key);
    } catch {
      setError('Could not reach analytics API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      void loadStats(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    void loadStats(input.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setInput('');
    setStats(null);
    setError('');
  };

  if (!stats) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Devly Admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your admin password to view traffic stats.
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
            {loading ? 'Loading…' : 'View stats'}
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
          <h1 className="text-3xl font-semibold tracking-tight">Traffic</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Landing page visits and key actions
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
    </main>
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
