'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/track-client';

type BookCallButtonProps = {
  onClick: () => void;
  label?: string;
};

export function BookCallButton({
  onClick,
  label = 'Book a call',
}: BookCallButtonProps) {
  const handleClick = () => {
    trackEvent('cta_click');
    onClick();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="group mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent"
    >
      <span className="rounded-full bg-primary px-6 py-3 text-black transition-colors duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary">
        {label}
      </span>
      <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-primary p-5 text-black transition-colors duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary">
        <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
        <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
      </div>
    </Button>
  );
}
