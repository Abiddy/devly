'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <SectionWrapper className="min-h-screen flex items-center pt-20 pb-20 overflow-hidden relative">
      <div className="flex flex-col items-start max-w-4xl w-full">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-black"
        >
          Build trust, convert more, and raise funding with a beautifully functional website & brand
        </motion.h1>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-12 md:mt-16 w-full sm:w-auto"
        >
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#F97316] rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all active:scale-95 group">
            Book a Call
            <div className="w-2 h-2 rounded-full bg-[#F97316] group-hover:bg-white transition-colors" />
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-black/10 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black hover:border-black/30 transition-all group">
            View Work
            <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Optional: Scroll indicator at the bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-black/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/3 bg-black/40"
          />
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
