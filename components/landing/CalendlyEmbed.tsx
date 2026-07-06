'use client';

import { useEffect } from 'react';

type CalendlyEmbedProps = {
  url: string;
};

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: 320, height: 700, width: '100%' }}
    />
  );
}
