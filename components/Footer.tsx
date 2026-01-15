'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-20">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-6xl font-light mb-8">Ready to transform<br className="hidden md:block"/>your brand?</h2>
            <button className="flex items-center justify-center gap-2 px-8 py-4 border border-[#F97316] rounded-sm text-[12px] font-bold uppercase tracking-[0.2em] text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all active:scale-95 group">
              Book a Call
              <div className="w-2 h-2 rounded-full bg-[#F97316] group-hover:bg-white transition-colors" />
            </button>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center gap-6">
            <div className="flex gap-8">
              <Link href="#" className="text-white/40 hover:text-white transition-colors">LinkedIn</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">X</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">Instagram</Link>
            </div>
            <p className="text-white/20 text-sm">© 2026 Devly. All rights reserved.</p>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-medium tracking-tight">Devly</div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-white/40">
             <Link href="#work" className="hover:text-white transition-colors">Work</Link>
             <Link href="#process" className="hover:text-white transition-colors">Process</Link>
             <Link href="#reviews" className="hover:text-white transition-colors">Reviews</Link>
             <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
};
