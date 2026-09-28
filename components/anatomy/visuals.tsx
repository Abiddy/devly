import Image from 'next/image';
import type { ReactNode } from 'react';

export type Pin = { x: number; y: number; label: string };

export function BrowserFrame({
  url,
  children,
  className = '',
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`an-browser ${className}`}>
      <div className="an-browser__bar" aria-hidden>
        <span />
        <span />
        <span />
        <p>{url}</p>
      </div>
      <div className="an-browser__body">{children}</div>
    </div>
  );
}

export function Pins({ pins }: { pins: Pin[] }) {
  return (
    <div className="an-pins" data-pins aria-hidden>
      {pins.map((pin, i) => (
        <div
          key={pin.label}
          className={`an-pin${pin.x > 60 ? ' an-pin--left' : ''}`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <span className="an-pin__dot">{i + 1}</span>
          <span className="an-pin__label">{pin.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Specimen({
  src,
  alt,
  url,
  pins,
}: {
  src: string;
  alt: string;
  url: string;
  pins: Pin[];
}) {
  return (
    <BrowserFrame url={url}>
      <div className="an-specimen" data-clip>
        <Image
          src={src}
          alt={alt}
          width={1024}
          height={560}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="an-specimen__img"
        />
      </div>
      <Pins pins={pins} />
    </BrowserFrame>
  );
}

export function HeroWireframe() {
  const notes = [
    { cls: 'an-note--nav', label: 'Navigation' },
    { cls: 'an-note--head', label: 'Headline' },
    { cls: 'an-note--cta', label: 'Call to action' },
    { cls: 'an-note--proof', label: 'Proof' },
  ];
  return (
    <div className="an-wire" data-wire>
      <BrowserFrame url="yourbusiness.com">
        <div className="an-wire__page">
          <div className="an-wire__nav">
            <i className="an-wire__logo" />
            <div>
              <i />
              <i />
              <i />
            </div>
            <i className="an-wire__pill" />
          </div>
          <div className="an-wire__hero">
            <div className="an-wire__copy">
              <i className="an-wire__h1" />
              <i className="an-wire__h1 an-wire__h1--short" />
              <i className="an-wire__p" />
              <i className="an-wire__p an-wire__p--short" />
              <i className="an-wire__btn" />
            </div>
            <div className="an-wire__img" />
          </div>
          <div className="an-wire__proof">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </BrowserFrame>
      {notes.map((n) => (
        <span key={n.label} className={`an-note ${n.cls}`} data-note>
          <em>{n.label}</em>
        </span>
      ))}
    </div>
  );
}

const toasts = [
  { title: 'New quote request', meta: 'sarah@… · 2 min ago' },
  { title: 'Call booked', meta: 'Thu · 10:30 AM' },
  { title: 'Catering inquiry', meta: '40 guests · Sat' },
];

export function LeadToasts() {
  return (
    <div className="an-toasts" aria-hidden>
      {toasts.map((t) => (
        <div key={t.title} className="an-toast" data-toast>
          <span className="an-toast__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div>
            <p>{t.title}</p>
            <small>{t.meta}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

const scores = [
  { label: 'Performance', value: 98 },
  { label: 'Accessibility', value: 100 },
  { label: 'SEO', value: 100 },
];

export function SpeedVisual() {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="an-speed">
      <div className="an-phone" data-reveal>
        <div className="an-phone__notch" />
        <div className="an-phone__screen">
          <Image
            src="/website-assets/work-freeland.png"
            alt="Freeland Family Farms on a phone"
            width={1024}
            height={551}
            className="an-phone__img"
          />
        </div>
      </div>
      <div className="an-scores">
        {scores.map((s) => (
          <div key={s.label} className="an-score" data-ring>
            <svg viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r={r} className="an-score__track" />
              <circle
                cx="32"
                cy="32"
                r={r}
                className="an-score__fill"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - s.value / 100)}
                data-ring-fill={c * (1 - s.value / 100)}
                data-ring-len={c}
              />
            </svg>
            <strong data-count={s.value}>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SearchVisual() {
  return (
    <div className="an-search" data-reveal>
      <div className="an-search__bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span data-type="auto body shop near me">auto body shop near me</span>
        <i className="an-search__caret" aria-hidden />
      </div>
      <div className="an-search__results">
        <div className="an-result an-result--top" data-result>
          <span className="an-result__rank">1</span>
          <div>
            <small>yourbusiness.com</small>
            <p>Your Business — Collision Repair in Gardena, CA</p>
            <span className="an-result__meta">
              <b>★★★★★</b> Reviews · Open now · Get an estimate
            </span>
          </div>
        </div>
        <div className="an-result" data-result>
          <span className="an-result__rank">2</span>
          <div>
            <small>directory-site.com</small>
            <p>Top 10 Auto Body Shops Near You</p>
          </div>
        </div>
        <div className="an-result" data-result>
          <span className="an-result__rank">3</span>
          <div>
            <small>someothershop.com</small>
            <p>Home | Welcome to our website</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const bars = [28, 34, 31, 42, 38, 47, 52, 49, 61, 66, 72, 84];

export function MetricsVisual() {
  return (
    <div className="an-metrics" data-reveal>
      <div className="an-metrics__head">
        <p>Example · last 30 days</p>
        <span>Live</span>
      </div>
      <div className="an-metrics__kpis">
        <div>
          <small>Visitors</small>
          <strong>
            <span data-count="12480">12,480</span>
          </strong>
          <em>+18%</em>
        </div>
        <div>
          <small>Leads</small>
          <strong>
            <span data-count="386">386</span>
          </strong>
          <em>+42%</em>
        </div>
        <div>
          <small>Conversion</small>
          <strong>
            <span data-count="3.1" data-decimals="1">3.1</span>%
          </strong>
          <em>+0.9</em>
        </div>
      </div>
      <div className="an-metrics__chart" data-bars aria-hidden>
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
