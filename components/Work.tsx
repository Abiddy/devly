'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: "01",
    title: "Transformed Bioanalysis Diagnostic Laboratories into a modern digital platform with integrated booking systems and streamlined service navigation.",
    client: "BDL",
    tags: ["Healthcare UX", "Webflow development", "Booking Integration"],
    imageColor: "bg-[#0a0a0a]",
    logo: "BDL",
    video: "/bdl.mov",
    link: "https://medical-lab-jade.vercel.app"
  },
  {
    id: "02",
    title: "Ongoing brand evolution for Pacific Auto Body, focusing on a complete identity overhaul, advanced SEO for market visibility, and AA accessibility standards.",
    client: "Pacific Auto Body",
    tags: ["Brand Identity", "SEO Strategy", "Accessibility"],
    imageColor: "bg-[#1a1a1a]",
    logo: "Pacific",
    video: "/auto.mov",
    link: "https://pacific-delta.vercel.app"
  },
  {
    id: "03",
    title: "Revamped the Islamic Institute of Torrance's digital presence with a comprehensive UI/UX redesign using Next.js and Framer Motion for a fluid experience.",
    client: "IIT",
    tags: ["Next.js", "Framer Motion", "UI/UX Redesign"],
    imageColor: "bg-[#0a0a0a]",
    logo: "IIT",
    video: "/masjid.mov",
    link: "https://www.ictorrance.org/"
  }
];

export const Work = () => {
  return (
    <SectionWrapper id="work" className="bg-black text-white py-32">
      <div className="mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded border border-white/20 text-xs font-mono text-white/60">
            3
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Work</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-light tracking-tight"
        >
          Recent success stories
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group glass border border-white/5 rounded-[32px] overflow-hidden p-4 md:p-6 lg:p-6 flex flex-col lg:flex-row gap-8 items-stretch min-h-[320px]"
          >
            <div className="flex flex-col gap-4 lg:w-1/2 justify-between py-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-sm border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl md:text-2xl font-medium leading-snug group-hover:text-red-500 transition-colors duration-500">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span className="text-base font-bold tracking-tighter uppercase">{project.client}</span>
                </div>
                <a 
                  href={project.link || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all"
                >
                  View Work
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className={`aspect-video lg:aspect-auto lg:w-1/2 w-full rounded-[24px] ${project.imageColor} relative overflow-hidden flex items-center justify-center border border-white/5 min-h-[240px]`}>
               {project.video ? (
                 <video 
                   key={project.video}
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                 >
                   <source src={project.video} type="video/quicktime" />
                   <source src={project.video} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               ) : (
                 <div className="w-[85%] h-[75%] bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col gap-3">
                    <div className="w-1/4 h-2 bg-white/20 rounded-full" />
                    <div className="w-full h-4 bg-white/10 rounded-lg" />
                    <div className="w-3/4 h-4 bg-white/10 rounded-lg" />
                    <div className="mt-auto flex justify-between items-end">
                      <div className="w-8 h-8 rounded-full bg-red-500/10" />
                      <div className="w-16 h-4 bg-white/5 rounded-md" />
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
