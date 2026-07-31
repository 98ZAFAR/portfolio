'use client';

import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
};

export default function Tech() {
  return (
    <section className="py-section-gap bg-bg-secondary" id="tech">
      <div className="max-w-container-max mx-auto px-gutter text-center mb-stack-lg">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="font-display-lg text-display-lg text-text"
        >
          Arsenal & Apparatus
        </motion.h2>
        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
          }}
          className="text-text-secondary mt-2"
        >
          The bleeding-edge stack powering my creative engine.
        </motion.p>
      </div>

      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        
        {/* Frontend */}
        <motion.div 
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={cardVariants}
          className="h-full"
        >
          <div className="glass-card p-8 h-full border-t-[3px] border-primary/40 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="mb-6 flex justify-between items-start relative z-10">
              <span className="material-symbols-outlined text-4xl text-primary">devices</span>
              <span className="text-label-sm font-label-sm px-3 py-1 bg-primary/10 text-primary rounded-full">FRONTEND</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-text mb-4 relative z-10">Interface Engineering</h3>
            <ul className="space-y-3 text-text-secondary relative z-10">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> React & Next.js</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Vue.js & Nuxt</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Tailwind CSS</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Three.js / WebGL</li>
            </ul>
          </div>
        </motion.div>

        {/* Backend */}
        <motion.div 
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={cardVariants}
          className="h-full"
        >
          <div className="glass-card p-8 h-full border-t-[3px] border-sand/40 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="mb-6 flex justify-between items-start relative z-10">
              <span className="material-symbols-outlined text-4xl text-sand-light">dns</span>
              <span className="text-label-sm font-label-sm px-3 py-1 bg-sand/10 text-sand-light rounded-full">BACKEND</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-text mb-4 relative z-10">Core Systems</h3>
            <ul className="space-y-3 text-text-secondary relative z-10">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sand-light"></span> Node.js / Bun</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sand-light"></span> GraphQL & REST</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sand-light"></span> PostgreSQL / Redis</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sand-light"></span> AWS / Docker</li>
            </ul>
          </div>
        </motion.div>

        {/* AI */}
        <motion.div 
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={cardVariants}
          className="h-full"
        >
          <div className="glass-card p-8 h-full border-t-[3px] border-secondary/60 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="mb-6 flex justify-between items-start relative z-10">
              <span className="material-symbols-outlined text-4xl text-secondary">psychology</span>
              <span className="text-label-sm font-label-sm px-3 py-1 bg-secondary/10 text-secondary rounded-full">INTELLIGENCE</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-text mb-4 relative z-10">Cognitive Layer</h3>
            <ul className="space-y-3 text-text-secondary relative z-10">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> OpenAI Integration</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> TensorFlow.js</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> LangChain</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Vector Databases</li>
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
