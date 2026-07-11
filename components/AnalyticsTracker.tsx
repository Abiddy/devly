'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/track-client';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;
    if (lastPath.current === pathname) return;

    lastPath.current = pathname;
    trackEvent('pageview', { path: pathname });
  }, [pathname]);

  return null;
}
