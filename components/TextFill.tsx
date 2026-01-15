'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TextFillProps {
  text: string;
}

export const TextFill = ({ text }: TextFillProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Split text into words for more granular filling if desired, 
  // but for a smooth "fill" effect across the whole block, 
  // we'll use a gradient mask.
  const opacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <div ref={containerRef} className="h-[200vh] relative bg-[#f8f9fa]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-24">
        <div className="max-w-4xl relative">
          {/* Background Text (Lighter) */}
          <p className="text-3xl md:text-5xl font-medium leading-tight text-black/10 uppercase tracking-tight">
            {text}
          </p>
          
          {/* Foreground Text (Filling) */}
          <motion.p 
            style={{ 
              clipPath: useTransform(scrollYProgress, [0.3, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
            }}
            className="absolute inset-0 text-3xl md:text-5xl font-medium leading-tight text-black uppercase tracking-tight"
          >
            {text}
          </motion.p>
        </div>
      </div>
    </div>
  );
};
