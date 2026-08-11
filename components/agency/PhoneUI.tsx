'use client';

const imgPeaceSymbol =
  'https://jab-speak-07810027.figma.site/assets/205cff25a34184bc8a6d049229042c52dfd558bf-ncz4dPKl.png';
const imgBottomNav =
  'https://jab-speak-07810027.figma.site/assets/image-1-Lt9hbaK5.png';

type PhoneUIProps = {
  width?: number;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
) {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  // Clockwise large arc from startDeg → endDeg
  return `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`;
}

export function PhoneUI({ width = 260 }: PhoneUIProps) {
  const height = width * (19.5 / 9);
  const borderRadius = width * 0.13;
  const cx = 100;
  const cy = 100;
  const R = 80;
  const endDot = polar(cx, cy, R, 90);
  const dots = [270, 0, 180].map((deg) => polar(cx, cy, R, deg));

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
      <div className="relative flex items-center justify-between px-5 pt-3">
        <span
          className="font-[family-name:var(--font-noola-body)] text-[12px] font-semibold text-white"
          style={{ letterSpacing: -0.3 }}
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

      {/* Greeting */}
      <div className="mt-3 flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgPeaceSymbol}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
            style={{ background: '#d0cce8' }}
          />
          <p className="font-[family-name:var(--font-noola-body)] text-[13px]">
            <span className="text-white/50">Hello, </span>
            <span className="font-medium text-white/90">Kristina!</span>
          </p>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10">
          <svg width="11" height="11" viewBox="0 0 10.171 10.171" fill="none" aria-hidden>
            <path
              d="M9.55718 5.60049L8.81469 2.93313C8.57518 2.07365 8.05532 1.31887 7.33771 0.788685C6.62009 0.258505 5.74588 -0.0166579 4.85397 0.00691348C3.96206 0.0304848 3.1036 0.351439 2.41499 0.918782C1.72638 1.48613 1.24711 2.26732 1.05333 3.13824L0.479518 5.71872C0.403817 6.05941 0.405587 6.41275 0.484697 6.75267C0.563807 7.09258 0.718239 7.41039 0.936593 7.68264C1.15495 7.95489 1.43165 8.17464 1.74628 8.32565C2.06092 8.47667 2.40544 8.55511 2.75444 8.55518H2.92396C3.05882 9.02157 3.34158 9.43151 3.72964 9.72326C4.11771 10.015 4.59006 10.1728 5.07556 10.1728C5.56106 10.1728 6.03341 10.015 6.42148 9.72326C6.80954 9.43151 7.0923 9.02157 7.22716 8.55518H7.30895C7.6683 8.55522 8.02279 8.47217 8.34473 8.31253C8.66667 8.15289 8.94734 7.92097 9.16481 7.63489C9.38228 7.34882 9.53066 7.01634 9.59835 6.66342C9.66605 6.31051 9.65123 5.94672 9.55506 5.60049H9.55718ZM8.15485 6.86509C8.05647 6.99571 7.92897 7.10157 7.78249 7.17426C7.63601 7.24695 7.47459 7.28445 7.31107 7.28379H2.75444C2.59582 7.28376 2.43923 7.24811 2.29622 7.17947C2.15322 7.11083 2.02745 7.01096 1.9282 6.88722C1.82895 6.76349 1.75875 6.61904 1.72278 6.46455C1.68682 6.31006 1.686 6.14946 1.72039 5.99461L2.2942 3.40947C2.42597 2.8145 2.75298 2.2807 3.22318 1.89305C3.69338 1.5054 4.27974 1.28618 4.88893 1.2703C5.49811 1.25441 6.0951 1.44276 6.58487 1.80538C7.07464 2.16799 7.42902 2.68402 7.59162 3.27132L8.33242 5.93867C8.37711 6.09624 8.38433 6.26208 8.3535 6.42294C8.32267 6.5838 8.25464 6.73521 8.15485 6.86509Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <div className="mt-3 px-5">
        <h3
          className="font-[family-name:var(--font-noola-display)] font-medium leading-[1.05] text-white"
          style={{
            fontSize: width * 0.135,
            letterSpacing: -1,
            whiteSpace: 'pre-line',
          }}
        >
          {'How do you\nfeel today?'}
        </h3>
      </div>

      {/* Mood dial */}
      <div className="mx-auto mt-3" style={{ width: 200, height: 200 }}>
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden>
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <circle
            cx={cx}
            cy={cy}
            r={58}
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.3"
          />
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="4" fill="white" opacity="0.7" />
          ))}
          <path
            d={describeArc(cx, cy, R, 220, 90)}
            fill="none"
            stroke="#8173F8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx={endDot.x} cy={endDot.y} r="7" fill="#8173F8" />
          <text
            x={cx}
            y={cy - R - 8}
            textAnchor="middle"
            fill="white"
            opacity="0.7"
            fontSize="9"
            style={{ fontFamily: 'var(--font-noola-body)' }}
          >
            12 AM
          </text>
          <text
            x={cx}
            y={cy + R + 16}
            textAnchor="middle"
            fill="white"
            opacity="0.7"
            fontSize="9"
            style={{ fontFamily: 'var(--font-noola-body)' }}
          >
            12 PM
          </text>
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="500"
            style={{ fontFamily: 'var(--font-noola-body)' }}
          >
            Neutral
          </text>
          <circle cx={cx} cy={cy + 10} r="12" fill="white" opacity="0.14" />
          <path
            d={`M ${cx - 5} ${cy + 13} L ${cx} ${cy + 5} L ${cx + 5} ${cy + 13} Z`}
            fill="white"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="flex-1" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgBottomNav} alt="" className="w-full" />
    </div>
  );
}
