'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { ScrollStaggerBlocks } from './ScrollStaggerBlocks';

export const Intro = () => {
  return (
    <div className="relative bg-black">
      <SectionWrapper className="relative z-10 py-32 text-white">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded border border-white/20 text-xs font-mono text-white/60">
              2
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Intro</span>
          </motion.div>
          
          <div className="space-y-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-light leading-tight"
            >
              If that sounds like your situation, I can help.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-white/70 font-light leading-relaxed"
            >
              I’ve completed 100+ successful website projects across a range of industries including tech, AI, education, entertainment, and fashion.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/40 font-light"
            >
              Check out some of my recent project success stories.
            </motion.p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
