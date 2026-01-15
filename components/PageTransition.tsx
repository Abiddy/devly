'use client';

import { motion } from 'framer-motion';

const COLUMNS = 10;

export const PageTransition = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex">
      {Array.from({ length: COLUMNS }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: [0, 1, 1, 0],
            originY: i % 2 === 0 ? 0 : 1 
          }}
          transition={{
            duration: 2,
            times: [0, 0.4, 0.6, 1],
            delay: i * 0.1,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="flex-1 bg-black"
        />
      ))}
    </div>
  );
};

export const SectionReveal = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex">
      {Array.from({ length: COLUMNS }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ margin: "-10% 0px -90% 0px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.05,
            ease: [0.76, 0, 0.24, 1],
          }}
          className={`flex-1 ${isDark ? 'bg-black' : 'bg-[#f8f9fa]'}`}
        />
      ))}
    </div>
  );
};
