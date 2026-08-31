'use client';

import { useEffect, useState } from 'react';
import type { AnalyticsStats } from '@/lib/analytics';
import type { SiteReview } from '@/lib/site-reviews';

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
  const [reviews, setReviews] = useState<SiteReview[]>([]);
  const [tab, setTab] = useState<'traffic' | 'leads' | 'reviews'>('leads');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadAdmin = async (key: string) => {
    setLoading(true);
    setError('');

    try {
      const headers = { Authorization: `Bearer ${key}` };
      const [statsRes, leadsRes, reviewsRes] = await Promise.all([
        fetch('/api/analytics', { headers }),
        fetch('/api/inquiries', { headers }),
        fetch('/api/reviews', { headers }),
      ]);

      if (!statsRes.ok) {
        setStats(null);
        setInquiries([]);
        setReviews([]);
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

      if (reviewsRes.ok) {
        const data = (await reviewsRes.json()) as { reviews?: SiteReview[] };
        setReviews(data.reviews ?? []);
      } else {
        setReviews([]);
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
    setReviews([]);
    setError('');
  };

  if (!stats) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center bg-[#f3f5fa] px-6 py-16 text-[#15205f]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#152868]">
          Devly Admin
        </h1>
        <p className="mt-2 text-sm text-[#667085]">
          Enter your admin password to view traffic, quote leads, and reviews.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-[#d2daf0] bg-white px-4 py-3 text-sm text-[#15205f] outline-none placeholder:text-[#98a2b3] focus-visible:ring-2 focus-visible:ring-[#152868]/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#152868] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Open admin'}
          </button>
        </form>

        {error ? (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        ) : null}
      </main>
    );
  }

  const maxDaily = Math.max(...stats.dailyPageviews.map((d) => d.count), 1);

  return (
    <main className="min-h-screen bg-[#f3f5fa] text-[#15205f]">
      <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#152868]">
            Admin
          </h1>
          <p className="mt-1 text-sm text-[#667085]">
            Quote leads, reviews, and landing-page traffic
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-[#d2daf0] bg-white px-4 py-2 text-sm text-[#5c688f] hover:bg-[#eef1fb]"
        >
          Sign out
        </button>
      </div>

      <div className="mb-8 inline-flex rounded-full border border-[#d2daf0] bg-white p-1">
        <button
          type="button"
          onClick={() => setTab('leads')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'leads'
              ? 'bg-[#152868] text-white shadow-sm'
              : 'text-[#667085]'
          }`}
        >
          Leads ({inquiries.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('reviews')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'reviews'
              ? 'bg-[#152868] text-white shadow-sm'
              : 'text-[#667085]'
          }`}
        >
          Reviews ({reviews.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('traffic')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'traffic'
              ? 'bg-[#152868] text-white shadow-sm'
              : 'text-[#667085]'
          }`}
        >
          Traffic
        </button>
      </div>

      {tab === 'leads' ? (
        <LeadsList inquiries={inquiries} />
      ) : tab === 'reviews' ? (
        <ReviewsList reviews={reviews} />
      ) : (
        <TrafficView stats={stats} maxDaily={maxDaily} />
      )}
      </div>
    </main>
  );
}

function LeadsList({ inquiries }: { inquiries: Inquiry[] }) {
  const [openId, setOpenId] = useState<string | null>(inquiries[0]?.id ?? null);

  if (inquiries.length === 0) {
    return (
      <section className="rounded-2xl border border-[#e2e8f5] bg-white p-8 text-sm text-[#667085]">
        No quote submissions yet. When someone finishes{' '}
        <span className="font-medium text-[#152868]">/inquire</span>,
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
            className="rounded-2xl border border-[#e2e8f5] bg-white text-[#15205f] shadow-[0_1px_0_rgba(21,40,104,0.04)]"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : lead.id)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            >
              <div>
                <p className="font-medium tracking-tight text-[#152868]">
                  {lead.name}
                </p>
                <p className="mt-0.5 text-sm text-[#667085]">
                  {lead.email}
                  {lead.company ? ` · ${lead.company}` : ''}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium text-[#15205f]">
                  {lead.budget || 'No budget'}
                </p>
                <p className="mt-0.5 text-xs text-[#7a849f]">
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
            </button>
            {open ? (
              <div className="space-y-3 border-t border-[#e2e8f5] px-5 py-4 text-sm text-[#15205f]">
                <Row label="Size" value={lead.size || '—'} />
                <Row label="Timeline" value={lead.timeline || '—'} />
                <Row
                  label="Goals"
                  value={lead.goals.length ? lead.goals.join(', ') : '—'}
                />
                <Row label="Website" value={lead.website || '—'} />
                <div>
                  <p className="text-[#667085]">Brief</p>
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed text-[#15205f]">
                    {lead.message || '—'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`mailto:${lead.email}`}
                    className="rounded-full bg-[#152868] px-4 py-2 text-xs font-medium text-white"
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
                      className="rounded-full border border-[#d2daf0] px-4 py-2 text-xs font-medium text-[#152868]"
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

function ReviewsList({ reviews }: { reviews: SiteReview[] }) {
  if (reviews.length === 0) {
    return (
      <section className="rounded-2xl border border-[#e2e8f5] bg-white p-8 text-sm text-[#667085]">
        No reviews yet. When someone submits{' '}
        <span className="font-medium text-[#152868]">/reviews</span>, they show
        up here — only you can see them.
      </section>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="rounded-2xl border border-[#e2e8f5] bg-white px-5 py-5 text-[#15205f] shadow-[0_1px_0_rgba(21,40,104,0.04)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium tracking-tight text-[#152868]">
                {review.name}
                {review.company ? (
                  <span className="font-medium text-[#7a849f]">
                    {' '}
                    · {review.company}
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-xs text-[#7a849f]">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="text-sm font-medium text-[#152868]">
              {review.rating}/5
            </p>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#3d4663]">
            {review.text}
          </p>
        </article>
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-[#667085]">{label}: </span>
      <span className="text-[#15205f]">{value}</span>
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

      <section className="mt-8 rounded-2xl border border-[#e2e8f5] bg-white p-6">
        <h2 className="text-lg font-medium text-[#152868]">Last 7 days</h2>
        <div className="mt-6 flex h-40 items-end gap-2">
          {stats.dailyPageviews.map((day) => (
            <div
              key={day.date}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t-md bg-[#152868]"
                style={{
                  height: `${Math.max((day.count / maxDaily) * 100, day.count > 0 ? 8 : 2)}%`,
                  minHeight: day.count > 0 ? 8 : 2,
                }}
                title={`${day.count} visits`}
              />
              <span className="text-[10px] text-[#7a849f]">
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
          <ul className="space-y-2 text-sm text-[#667085]">
            <li>Page visits on `/` and `/portfolio`</li>
            <li>Unique visitors via anonymous browser ID</li>
            <li>&quot;Book a call&quot; button clicks</li>
            <li>Form continues into Calendly scheduling</li>
            <li>Referrer and mobile/desktop split</li>
          </ul>
        </Panel>
      </div>

      <p className="mt-8 text-xs text-[#7a849f]">
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
    <div className="rounded-2xl border border-[#e2e8f5] bg-white p-5">
      <p className="text-sm text-[#667085]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[#152868]">
        {value}
      </p>
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
    <section className="rounded-2xl border border-[#e2e8f5] bg-white p-6">
      <h2 className="text-lg font-medium text-[#152868]">{title}</h2>
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
    return <p className="text-sm text-[#667085]">{empty}</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center justify-between gap-4 text-sm"
        >
          <span className="truncate text-[#667085]">{item.label}</span>
          <span className="font-medium text-[#15205f]">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
