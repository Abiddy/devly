'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { X } from 'lucide-react';
import { ScrollStaggerBlocks } from './ScrollStaggerBlocks';

const problems = [
  {
    title: "People don't understand what you do",
    description: "If your website and marketing aren't crystal clear, potential customers won't get what you do or why it matters."
  },
  {
    title: "You look amateur and like you're still testing",
    description: "First impressions matter. A DIY or unpolished design makes users bounce 127% faster, even if your product is solid."
  }
];

export const Problems = () => {
  return (
    <div className="bg-white relative overflow-hidden min-h-screen" data-theme="dark">
      {/* Scroll-driven Creeping Blocks */}
      <ScrollStaggerBlocks color="black" />

      <SectionWrapper className="relative z-10 py-32 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded border border-white/20 text-xs font-mono text-white/60">
                1
              </div>
              <span className="text-sm font-medium uppercase tracking-widest text-white/40">Problems</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light leading-tight mb-6"
            >
              You have traction but your website still looks MVP
            </motion.h2>
            <p className="text-white/40 text-lg">There's a gap between how your product quality and how you present it</p>
          </div>

          <div className="lg:col-span-7 space-y-24">
            <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 group">
                {/* Visual indicator of "bad design" or just abstract UI */}
                <div className="absolute inset-0 p-12 flex flex-col gap-6">
                    <div className="w-48 h-4 bg-white/10 rounded" />
                    <div className="w-full h-8 bg-white/10 rounded" />
                    <div className="w-2/3 h-8 bg-white/10 rounded" />
                    <div className="mt-auto flex justify-end">
                         <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                            <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse" />
                         </div>
                    </div>
                </div>
                {/* Glow effect */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="space-y-12">
              <p className="text-white/40 font-medium">You've outgrown your MVP, but your site hasn't. Here's how it might be holding you back.</p>
              
              {problems.map((prob, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-3">{prob.title}</h3>
                    <p className="text-white/40 text-lg leading-relaxed">{prob.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
