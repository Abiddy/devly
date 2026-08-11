'use client';

const imgPeaceSymbol =
  'https://jab-speak-07810027.figma.site/assets/205cff25a34184bc8a6d049229042c52dfd558bf-ncz4dPKl.png';
const imgBottomNav =
  'https://jab-speak-07810027.figma.site/assets/image-1-Lt9hbaK5.png';

type PhoneUIProps = {
  width?: number;
};

const metrics = [
  {
    label: 'Engagement',
    value: '5.2%',
    delta: '+1.4%',
    spark: [28, 32, 30, 38, 42, 48, 55],
  },
  {
    label: 'CTR',
    value: '3.8%',
    delta: '+0.9%',
    spark: [22, 25, 24, 31, 35, 40, 46],
  },
  {
    label: 'ROAS',
    value: '4.6x',
    delta: '+22%',
    spark: [18, 24, 22, 30, 36, 44, 52],
  },
];

function TrendUpIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M1.5 8.5L4.5 5.5L6.5 7.5L10.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 3.5H10.5V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sparkline({
  points,
  width,
  height,
}: {
  points: number[];
  width: number;
  height: number;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 2) - 1;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline
        points={coords}
        fill="none"
        stroke="#8173F8"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneUI({ width = 260 }: PhoneUIProps) {
  const height = width * (19.5 / 9);
  const borderRadius = width * 0.13;
  const pad = width * 0.077;
  const titleSize = width * 0.11;
  const cardGap = width * 0.03;
  const cardPad = width * 0.045;

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        boxShadow: '0 0 0 4px white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(170deg, #b8b4e0 0%, #cac7f0 25%, #dcd9f8 55%, #eceaff 100%)',
      }}
    >
      {/* Status bar */}
      <div
        className="relative flex items-center justify-between pt-3"
        style={{ paddingLeft: pad, paddingRight: pad }}
      >
        <span
          className="text-[12px] font-semibold text-white"
          style={{
            fontFamily: 'var(--font-noola-body)',
            letterSpacing: -0.3,
          }}
        >
          9:41
        </span>
        <div
          className="absolute left-1/2 top-[10px] h-6 w-20 -translate-x-1/2 rounded-full bg-black"
          aria-hidden
        />
        <div className="flex items-center gap-1.5">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={i * 3.4}
                y={10 - (i + 1) * 1.8}
                width="2.2"
                height={(i + 1) * 1.8}
                rx="0.5"
                fill="white"
                opacity={[0.4, 0.6, 0.8, 1, 1][i]}
              />
            ))}
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
            <path
              d="M7.5 3.2c1.6 0 3.1.6 4.2 1.7l-1.1 1.1A4.3 4.3 0 0 0 7.5 4.7c-1.1 0-2.1.4-2.9 1.2L3.5 4.8A5.8 5.8 0 0 1 7.5 3.2Z"
              fill="white"
            />
            <path
              d="M7.5 0C10.4 0 13 1.2 14.8 3.1l-1.1 1.1A7.5 7.5 0 0 0 7.5 1.7 7.5 7.5 0 0 0 1.3 4.2L.2 3.1A9.3 9.3 0 0 1 7.5 0Z"
              fill="white"
              opacity="0.5"
            />
            <circle cx="7.5" cy="9.2" r="1.3" fill="white" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden>
            <rect
              x="0.5"
              y="0.5"
              width="20"
              height="11"
              rx="2.5"
              stroke="white"
              strokeOpacity="0.35"
            />
            <rect x="2" y="2" width="17" height="8" rx="1.5" fill="white" />
            <rect
              x="21.5"
              y="3.5"
              width="2"
              height="5"
              rx="0.5"
              fill="white"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* Greeting — brand manager view */}
      <div
        className="mt-3 flex items-center justify-between"
        style={{ paddingLeft: pad, paddingRight: pad }}
      >
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgPeaceSymbol}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
            style={{ background: '#d0cce8' }}
          />
          <p
            className="text-[13px]"
            style={{ fontFamily: 'var(--font-noola-body)' }}
          >
            <span className="text-white/50">Campaign </span>
            <span className="font-medium text-white/90">Q2 Live</span>
          </p>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white">
          <TrendUpIcon size={12} />
        </div>
      </div>

      {/* Heading */}
      <div className="mt-3" style={{ paddingLeft: pad, paddingRight: pad }}>
        <h3
          className="font-medium leading-[1.05] text-white"
          style={{
            fontFamily: 'var(--font-noola-display)',
            fontSize: titleSize,
            letterSpacing: -1,
            whiteSpace: 'pre-line',
          }}
        >
          {'Your KPIs\nthis week'}
        </h3>
      </div>

      {/* Hero metric */}
      <div
        className="mt-3 rounded-2xl border border-white/20 bg-white/15"
        style={{
          marginLeft: pad,
          marginRight: pad,
          padding: cardPad,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-white/60"
              style={{
                fontFamily: 'var(--font-noola-body)',
                fontSize: width * 0.038,
              }}
            >
              Avg. engagement
            </p>
            <p
              className="mt-0.5 font-medium leading-none text-white"
              style={{
                fontFamily: 'var(--font-noola-display)',
                fontSize: width * 0.16,
                letterSpacing: -1.5,
              }}
            >
              5.2%
            </p>
          </div>
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1 text-white"
            style={{
              background: 'rgba(129, 115, 248, 0.45)',
              fontFamily: 'var(--font-noola-body)',
              fontSize: width * 0.035,
            }}
          >
            <TrendUpIcon size={Math.max(9, width * 0.035)} />
            <span className="font-medium">+1.4%</span>
          </div>
        </div>
        <div className="mt-2">
          <Sparkline
            points={[32, 36, 34, 41, 48, 52, 58, 62]}
            width={width - pad * 2 - cardPad * 2}
            height={width * 0.12}
          />
        </div>
      </div>

      {/* Metric rows */}
      <div
        className="mt-2 flex flex-col"
        style={{
          marginLeft: pad,
          marginRight: pad,
          gap: cardGap,
        }}
      >
        {metrics.slice(1).map((m) => (
          <div
            key={m.label}
            className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10"
            style={{ padding: `${cardPad * 0.7}px ${cardPad}px` }}
          >
            <div>
              <p
                className="text-white/55"
                style={{
                  fontFamily: 'var(--font-noola-body)',
                  fontSize: width * 0.034,
                }}
              >
                {m.label}
              </p>
              <p
                className="font-medium leading-tight text-white"
                style={{
                  fontFamily: 'var(--font-noola-display)',
                  fontSize: width * 0.07,
                  letterSpacing: -0.5,
                }}
              >
                {m.value}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkline
                points={m.spark}
                width={width * 0.16}
                height={width * 0.07}
              />
              <div
                className="flex items-center gap-0.5 text-white"
                style={{
                  fontFamily: 'var(--font-noola-body)',
                  fontSize: width * 0.032,
                  color: '#eceaff',
                }}
              >
                <TrendUpIcon size={Math.max(8, width * 0.032)} />
                <span className="font-medium">{m.delta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgBottomNav} alt="" className="w-full" />
    </div>
  );
}
