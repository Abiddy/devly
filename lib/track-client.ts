'use client';

import type { AnalyticsEventType } from '@/lib/analytics';

const VISITOR_KEY = 'devly_vid';

function getVisitorId(): string {
  if (typeof window === 'undefined') return 'server';

  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  localStorage.setItem(VISITOR_KEY, id);
  return id;
}

export function trackEvent(
  type: AnalyticsEventType,
  options?: { path?: string },
) {
  const path = options?.path ?? window.location.pathname;

  void fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      path,
      referrer: document.referrer || null,
      visitorId: getVisitorId(),
    }),
    keepalive: true,
  }).catch(() => {
    // Non-blocking analytics
  });
}
