import { ImageResponse } from 'next/og';

export const alt = 'Devly — Custom websites that get you results';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: '#f3f5fa',
          color: '#152868',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, marginBottom: 24 }}>
          Devly
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
          We design and develop really good websites
        </div>
      </div>
    ),
    { ...size },
  );
}
