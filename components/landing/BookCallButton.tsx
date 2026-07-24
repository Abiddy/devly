'use client';

import { trackEvent } from '@/lib/track-client';

type BookCallButtonProps = {
  onClick: () => void;
  label?: string;
  variant?: 'primary' | 'ghost';
};

export function BookCallButton({
  onClick,
  label = 'Book a call',
  variant = 'primary',
}: BookCallButtonProps) {
  const handleClick = () => {
    trackEvent('cta_click');
    onClick();
  };

  if (variant === 'ghost') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="rounded-full border border-paper-white px-5 py-2.5 text-[14px] font-medium text-paper-white transition-colors hover:bg-carbon"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full bg-paper-white px-5 py-2.5 text-[14px] font-medium text-black transition-opacity hover:opacity-90"
    >
      {label}
    </button>
  );
}
