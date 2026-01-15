'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const COLUMNS = 12;

// These offsets create a non-linear, "leaping" effect where bars move at different speeds
const SPEEDS = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.75, 0.55, 0.85, 0.5, 0.7];

export const ScrollStaggerBlocks = ({ color = 'black', reverse = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We trigger the animation earlier and let it last longer to create the "bleed"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.2"] 
  });

  return (
    <div ref={containerRef} className="absolute -top-[30vh] left-0 right-0 bottom-0 flex pointer-events-none z-0">
      {Array.from({ length: COLUMNS }).map((_, i) => {
        const speed = SPEEDS[i % SPEEDS.length];
        const start = (i * 0.03);
        const end = Math.min(start + speed, 1);
        
        // Height is now 130% to account for the -30vh top offset bleed
        const height = useTransform(
          scrollYProgress, 
          [start, end], 
          reverse ? ["130%", "0%"] : ["0%", "130%"]
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
              width: `${(100 / COLUMNS) + 0.1}%`,
            }}
          />
        );
      })}
    </div>
  );
};
