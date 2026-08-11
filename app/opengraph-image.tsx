import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Devly — We help brands meet their KPIs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(160deg, #5a6899 0%, #6574a4 45%, #7a86b5 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: -1,
            }}
          >
            Devly
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(144, 146, 227, 0.45)',
              borderRadius: 999,
              padding: '10px 18px',
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 20 }}>↑</span>
            <span>+1.4%</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              opacity: 0.75,
            }}
          >
            Creator partnerships that convert
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            We help brands meet their KPIs
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          {[
            { label: 'Engagement', value: '5.2%' },
            { label: 'CTR', value: '3.8%' },
            { label: 'ROAS', value: '4.6x' },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: 20,
                padding: '20px 28px',
                minWidth: 180,
              }}
            >
              <div style={{ fontSize: 18, opacity: 0.7 }}>{m.label}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 40,
                  fontWeight: 600,
                  letterSpacing: -1,
                }}
              >
                {m.value}
                <span style={{ fontSize: 22, color: '#c8c9f5' }}>↑</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
