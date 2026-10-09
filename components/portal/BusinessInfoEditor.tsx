'use client';

import { useEffect, useState } from 'react';
import type { BusinessInfo } from '@/lib/portal/business-info';

type Tab = 'basics' | 'services' | 'chatbot';

const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: 'basics', label: 'Business info', hint: 'Contact details, hours and social links shown to guests.' },
  { id: 'services', label: 'Services', hint: 'Catering, private events and gift cards.' },
  { id: 'chatbot', label: 'Chatbot answers', hint: 'What your website assistant tells guests when they ask.' },
];

const input =
  'w-full rounded-lg border border-[#d2daf0] bg-white px-3 py-2.5 text-sm text-[#15205f] outline-none placeholder:text-[#98a2b3] focus-visible:ring-2 focus-visible:ring-[#152868]/30';
const card = 'rounded-2xl border border-[#e2e8f5] bg-white p-5 sm:p-6';
const ghostButton =
  'rounded-full border border-[#d2daf0] px-3 py-1.5 text-xs font-medium text-[#152868] hover:bg-[#f3f5fa]';
const removeButton = 'shrink-0 rounded-full px-2 py-1 text-xs font-medium text-[#98a2b3] hover:text-red-600';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#15205f]">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-[#7a849f]">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#15205f]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#152868]"
      />
      {label}
    </label>
  );
}

function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-[#152868]">{title}</h2>
      {children}
    </div>
  );
}

function formatSaved(iso: string | null) {
  if (!iso) return 'Not saved yet';
  return `Last saved ${new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}`;
}

export function BusinessInfoEditor({
  userName,
  userEmail,
  initialInfo,
  initialUpdatedAt,
}: {
  userName: string;
  userEmail: string;
  initialInfo: BusinessInfo;
  initialUpdatedAt: string | null;
}) {
  const [tab, setTab] = useState<Tab>('basics');
  const [info, setInfo] = useState(initialInfo);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function edit(mutate: (draft: BusinessInfo) => void) {
    setInfo((prev) => {
      const next = structuredClone(prev);
      mutate(next);
      return next;
    });
    setDirty(true);
    setStatus(null);
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/portal/business-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (res.status === 401) {
        window.location.assign('/portal/login');
        return;
      }
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        info?: BusinessInfo;
        updatedAt?: string;
      };
      if (!res.ok || !data.info) {
        setStatus({ kind: 'error', text: data.error || 'Could not save. Please try again.' });
        return;
      }
      setInfo(data.info);
      setUpdatedAt(data.updatedAt ?? null);
      setDirty(false);
      setStatus({ kind: 'ok', text: 'Saved. Your website will pick up the changes within a few minutes.' });
    } catch {
      setStatus({ kind: 'error', text: 'Could not reach the server. Check your connection.' });
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    if (dirty && !window.confirm('You have unsaved changes. Sign out anyway?')) return;
    await fetch('/api/portal/logout', { method: 'POST' }).catch(() => undefined);
    window.location.assign('/portal/login');
  }

  const { basics, services, chatbot } = info;
  const activeTab = TABS.find((t) => t.id === tab)!;

  return (
    <div className="pb-28">
      <header className="border-b border-[#e2e8f5] bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a849f]">Devly business portal</p>
            <p className="mt-0.5 text-sm font-medium text-[#152868]">{basics.businessName || userName}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#7a849f] sm:inline">{userEmail}</span>
            <button type="button" onClick={signOut} className={ghostButton}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pt-8">
        <nav className="flex flex-wrap gap-2" aria-label="Sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-[#152868] text-white' : 'bg-white text-[#152868] ring-1 ring-[#e2e8f5]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <p className="mt-3 text-sm text-[#667085]">{activeTab.hint}</p>

        <div className="mt-6 space-y-5">
          {tab === 'basics' ? (
            <>
              <section className={card}>
                <SectionTitle title="Contact" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business name">
                    <input
                      className={input}
                      value={basics.businessName}
                      onChange={(e) => edit((d) => void (d.basics.businessName = e.target.value))}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      className={input}
                      type="tel"
                      value={basics.phone}
                      onChange={(e) => edit((d) => void (d.basics.phone = e.target.value))}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className={input}
                      type="email"
                      value={basics.email}
                      onChange={(e) => edit((d) => void (d.basics.email = e.target.value))}
                    />
                  </Field>
                  <Field label="City">
                    <input
                      className={input}
                      value={basics.city}
                      onChange={(e) => edit((d) => void (d.basics.city = e.target.value))}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Street address">
                      <input
                        className={input}
                        value={basics.address}
                        onChange={(e) => edit((d) => void (d.basics.address = e.target.value))}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <section className={card}>
                <SectionTitle title="Opening hours">
                  <button
                    type="button"
                    className={ghostButton}
                    onClick={() => edit((d) => void d.basics.hours.push({ days: '', time: '' }))}
                  >
                    + Add row
                  </button>
                </SectionTitle>
                {basics.hours.length === 0 ? (
                  <p className="text-sm text-[#7a849f]">No hours yet. Add a row like “Mon – Fri” / “8am – 9pm”.</p>
                ) : (
                  <div className="space-y-3">
                    {basics.hours.map((row, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          className={input}
                          placeholder="Days (e.g. Mon – Fri)"
                          value={row.days}
                          onChange={(e) => edit((d) => void (d.basics.hours[i].days = e.target.value))}
                        />
                        <input
                          className={input}
                          placeholder="Time (e.g. 8am – 9pm)"
                          value={row.time}
                          onChange={(e) => edit((d) => void (d.basics.hours[i].time = e.target.value))}
                        />
                        <button
                          type="button"
                          className={removeButton}
                          aria-label="Remove row"
                          onClick={() => edit((d) => void d.basics.hours.splice(i, 1))}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-5">
                  <Field label="Holiday or special hours" hint="Closures, holiday schedules, seasonal changes.">
                    <textarea
                      className={`${input} min-h-[80px]`}
                      value={basics.holidayHours}
                      onChange={(e) => edit((d) => void (d.basics.holidayHours = e.target.value))}
                    />
                  </Field>
                </div>
              </section>

              <section className={card}>
                <SectionTitle title="Social links" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ['instagram', 'Instagram'],
                      ['facebook', 'Facebook'],
                      ['tiktok', 'TikTok'],
                      ['x', 'X (Twitter)'],
                      ['yelp', 'Yelp'],
                    ] as const
                  ).map(([key, label]) => (
                    <Field key={key} label={label}>
                      <input
                        className={input}
                        type="url"
                        placeholder="https://"
                        value={basics.socials[key]}
                        onChange={(e) => edit((d) => void (d.basics.socials[key] = e.target.value))}
                      />
                    </Field>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {tab === 'services' ? (
            <>
              <section className={card}>
                <SectionTitle title="Catering">
                  <Toggle
                    label="We offer catering"
                    checked={services.catering.offered}
                    onChange={(v) => edit((d) => void (d.services.catering.offered = v))}
                  />
                </SectionTitle>
                {services.catering.offered ? (
                  <div className="space-y-4">
                    <Field label="Description" hint="A short overview guests will see.">
                      <textarea
                        className={`${input} min-h-[80px]`}
                        value={services.catering.description}
                        onChange={(e) => edit((d) => void (d.services.catering.description = e.target.value))}
                      />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field label="Minimum order">
                        <input
                          className={input}
                          placeholder="e.g. 20 guests"
                          value={services.catering.minimum}
                          onChange={(e) => edit((d) => void (d.services.catering.minimum = e.target.value))}
                        />
                      </Field>
                      <Field label="Notice needed">
                        <input
                          className={input}
                          placeholder="e.g. 48 hours"
                          value={services.catering.notice}
                          onChange={(e) => edit((d) => void (d.services.catering.notice = e.target.value))}
                        />
                      </Field>
                      <Field label="How to book">
                        <input
                          className={input}
                          placeholder="e.g. Call or email us"
                          value={services.catering.howToBook}
                          onChange={(e) => edit((d) => void (d.services.catering.howToBook = e.target.value))}
                        />
                      </Field>
                    </div>

                    <div className="border-t border-[#e2e8f5] pt-4">
                      <SectionTitle title="Packages">
                        <button
                          type="button"
                          className={ghostButton}
                          onClick={() =>
                            edit((d) => void d.services.catering.packages.push({ name: '', includes: '', price: '' }))
                          }
                        >
                          + Add package
                        </button>
                      </SectionTitle>
                      {services.catering.packages.length === 0 ? (
                        <p className="text-sm text-[#7a849f]">No packages yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {services.catering.packages.map((pkg, i) => (
                            <div key={i} className="rounded-xl bg-[#f7f9fd] p-4">
                              <div className="flex items-center gap-2">
                                <input
                                  className={input}
                                  placeholder="Package name"
                                  value={pkg.name}
                                  onChange={(e) =>
                                    edit((d) => void (d.services.catering.packages[i].name = e.target.value))
                                  }
                                />
                                <input
                                  className={`${input} max-w-[160px]`}
                                  placeholder="Price"
                                  value={pkg.price}
                                  onChange={(e) =>
                                    edit((d) => void (d.services.catering.packages[i].price = e.target.value))
                                  }
                                />
                                <button
                                  type="button"
                                  className={removeButton}
                                  onClick={() => edit((d) => void d.services.catering.packages.splice(i, 1))}
                                >
                                  Remove
                                </button>
                              </div>
                              <textarea
                                className={`${input} mt-2 min-h-[64px]`}
                                placeholder="What's included"
                                value={pkg.includes}
                                onChange={(e) =>
                                  edit((d) => void (d.services.catering.packages[i].includes = e.target.value))
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </section>

              <section className={card}>
                <SectionTitle title="Private events">
                  <Toggle
                    label="We host events"
                    checked={services.events.offered}
                    onChange={(v) => edit((d) => void (d.services.events.offered = v))}
                  />
                </SectionTitle>
                {services.events.offered ? (
                  <Field label="Details" hint="Capacity, pricing, how to inquire.">
                    <textarea
                      className={`${input} min-h-[80px]`}
                      value={services.events.details}
                      onChange={(e) => edit((d) => void (d.services.events.details = e.target.value))}
                    />
                  </Field>
                ) : null}
              </section>

              <section className={card}>
                <SectionTitle title="Gift cards">
                  <Toggle
                    label="We sell gift cards"
                    checked={services.giftCards.offered}
                    onChange={(v) => edit((d) => void (d.services.giftCards.offered = v))}
                  />
                </SectionTitle>
                {services.giftCards.offered ? (
                  <Field label="Details" hint="Where to buy, amounts, in-store or online.">
                    <textarea
                      className={`${input} min-h-[80px]`}
                      value={services.giftCards.details}
                      onChange={(e) => edit((d) => void (d.services.giftCards.details = e.target.value))}
                    />
                  </Field>
                ) : null}
              </section>
            </>
          ) : null}

          {tab === 'chatbot' ? (
            <>
              <section className={card}>
                <SectionTitle title="Common questions" />
                <div className="space-y-4">
                  <Field label="Dietary options" hint="Vegan, gluten-free, nut allergies, halal, etc.">
                    <textarea
                      className={`${input} min-h-[80px]`}
                      value={chatbot.dietary}
                      onChange={(e) => edit((d) => void (d.chatbot.dietary = e.target.value))}
                    />
                  </Field>
                  <Field label="Parking & getting here">
                    <textarea
                      className={`${input} min-h-[80px]`}
                      value={chatbot.parking}
                      onChange={(e) => edit((d) => void (d.chatbot.parking = e.target.value))}
                    />
                  </Field>
                  <Field label="Anything else guests should know" hint="Reservations, kids, pets, Wi-Fi, payment methods.">
                    <textarea
                      className={`${input} min-h-[80px]`}
                      value={chatbot.guestNotes}
                      onChange={(e) => edit((d) => void (d.chatbot.guestNotes = e.target.value))}
                    />
                  </Field>
                </div>
              </section>

              <section className={card}>
                <SectionTitle title="Custom questions & answers">
                  <button
                    type="button"
                    className={ghostButton}
                    onClick={() => edit((d) => void d.chatbot.faqs.push({ question: '', answer: '' }))}
                  >
                    + Add question
                  </button>
                </SectionTitle>
                {chatbot.faqs.length === 0 ? (
                  <p className="text-sm text-[#7a849f]">
                    Add questions guests often ask, and the answer you want the assistant to give.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {chatbot.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl bg-[#f7f9fd] p-4">
                        <div className="flex items-center gap-2">
                          <input
                            className={input}
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => edit((d) => void (d.chatbot.faqs[i].question = e.target.value))}
                          />
                          <button
                            type="button"
                            className={removeButton}
                            onClick={() => edit((d) => void d.chatbot.faqs.splice(i, 1))}
                          >
                            Remove
                          </button>
                        </div>
                        <textarea
                          className={`${input} mt-2 min-h-[64px]`}
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => edit((d) => void (d.chatbot.faqs[i].answer = e.target.value))}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-4 text-xs text-[#7a849f]">Questions without an answer aren&apos;t saved.</p>
              </section>
            </>
          ) : null}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-[#e2e8f5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
          <p
            className={`text-xs ${
              status?.kind === 'error' ? 'text-red-600' : status?.kind === 'ok' ? 'text-emerald-700' : 'text-[#7a849f]'
            }`}
          >
            {status?.text ?? (dirty ? 'You have unsaved changes.' : formatSaved(updatedAt))}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-full bg-[#152868] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
