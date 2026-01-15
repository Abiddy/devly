'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { ScrollStaggerBlocks } from './ScrollStaggerBlocks';

const steps = [
  {
    id: "01",
    title: "Book a quick call",
    description: "We jump on a call to discuss your needs and Identify opportunities. No commitments + you'll know what to do next.",
    duration: "~40 min",
    color: "bg-blue-50"
  },
  {
    id: "02",
    title: "Seamless execution",
    description: "On-board, receive frequent async updates and watch your brand transform with a solid process proved to get results on 70+ projects.",
    duration: "2-8 weeks",
    color: "bg-purple-50"
  },
  {
    id: "03",
    title: "Launch, build trust, convert more",
    description: "Increase user trust & engagement from the start, convert more, and feel like your website is setting standards.",
    duration: "On-going support available",
    color: "bg-emerald-50"
  }
];

export const Process = () => {
  return (
    <div className="relative overflow-visible bg-black min-h-screen">
      {/* Scroll-driven Creeping Light Blocks */}
      <ScrollStaggerBlocks color="#f8f9fa" />

      <SectionWrapper id="process" className="relative z-10 py-32">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded border border-black/10 text-xs font-mono text-black/40">
                4
              </div>
              <span className="text-sm font-medium uppercase tracking-widest text-black/40">How it works</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-black"
          >
            How we work<br/>together
          </motion.h2>
          <p className="text-black/40 text-lg">Seamless kick-off, seamless collaboration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col group p-8 rounded-[32px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="text-sm font-mono text-red-500 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-red-200" />
                  {step.id}
              </div>

              <h3 className="text-2xl font-medium mb-4 group-hover:text-red-500 transition-colors text-black">{step.title}</h3>
              <p className="text-black/50 leading-relaxed mb-8 flex-grow">{step.description}</p>
              
              <div className="mt-auto">
                  <span className="inline-block px-3 py-1 rounded-sm bg-black/5 text-black/40 text-[10px] font-bold uppercase tracking-[0.1em] border border-black/5">
                      {step.duration}
                  </span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};
