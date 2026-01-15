'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const COLUMNS = 12;

// These offsets create a non-linear, "leaping" effect where bars move at different speeds
const SPEEDS = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.75, 0.55, 0.85, 0.5, 0.7];

export const ScrollStaggerBlocks = ({ color = 'black', reverse = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We use a tighter offset so the transition completes quickly as the section enters
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"] 
  });

  return (
    <div ref={containerRef} className="absolute inset-0 flex pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: COLUMNS }).map((_, i) => {
        // Different start and end points for each bar to create "leaping" effect
        const speed = SPEEDS[i % SPEEDS.length];
        const start = (i * 0.02);
        const end = Math.min(start + speed, 1);
        
        const height = useTransform(
          scrollYProgress, 
          [start, end], 
          reverse ? ["100%", "0%"] : ["0%", "100%"]
        );

        return (
          <motion.div
            key={i}
            style={{ 
              height,
              backgroundColor: color,
              bottom: 0,
              position: 'absolute',
              left: `${(i / COLUMNS) * 100}%`,
              width: `${(100 / COLUMNS) + 0.1}%`, // small overlap to prevent gaps
            }}
          />
        );
      })}
    </div>
  );
};
