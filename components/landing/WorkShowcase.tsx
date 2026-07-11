'use client';

import { BookCallButton } from '@/components/landing/BookCallButton';
import { ScrollPortraitWall } from '@/components/ui/scroll-portrait-wall';
import { showcaseWork } from '@/data/showcase-work';

type WorkShowcaseProps = {
  onBookCall: () => void;
};

export function WorkShowcase({ onBookCall }: WorkShowcaseProps) {
  return (
    <div className="border-t border-border bg-background pt-10 sm:pt-12">
      <ScrollPortraitWall
        title="Websites that actually bring you leads."
        titleClassName="mx-auto max-w-md px-6 text-medium font-normal leading-relaxed tracking-normal text-black sm:text-base"
        date={null}
        hint="scroll to explore"
        speakers={showcaseWork}
        showCaptions={false}
        columns={3}
        scrollExit
        cta={<BookCallButton onClick={onBookCall} />}
      />
    </div>
  );
}
