'use client';

import { useEffect } from 'react';

const FONT_HREFS = [
  'https://db.onlinewebfonts.com/c/69f2576e7ca287875bf8d089130e292c?family=TT+Firs+Neue',
  'https://db.onlinewebfonts.com/c/0884d17cb11ba81fc10318f784a5133e?family=TT+Firs+Neue+Trl',
  'https://db.onlinewebfonts.com/c/cbb3cb559d2e4387e139cfb1656e31f5?family=Arsenica+Trial+Light',
];

/** Loads display fonts in the browser so they never block Next compile/build. */
export function FontLoader() {
  useEffect(() => {
    FONT_HREFS.forEach((href) => {
      if (document.querySelector(`link[data-devly-font="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-devly-font', href);
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
