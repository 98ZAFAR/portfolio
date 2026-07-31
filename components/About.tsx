'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ── Animated Counter ──
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const handle = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(handle);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);
    return () => clearInterval(handle);
  }, [value, duration]);

  return <>{count}</>;
};

export default function About() {
  return (
    <section className="py-section-gap max-w-container-max mx-auto px-gutter" id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-label-sm text-label-sm uppercase tracking-[0.2em] mb-4 block">Foundations</span>
          <h2 className="font-display-lg text-display-lg text-text mb-stack-lg">Architecting the invisible layers of the web.</h2>
          <p className="text-text-secondary text-body-lg mb-8 leading-relaxed">
            I bridge the gap between complex engineering and fluid human interaction. My approach is rooted in mathematical precision and an obsession with detail, ensuring every pixel and every line of code serves a clear, aesthetic purpose.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-display-lg font-display-lg text-primary tabular-nums relative z-10 flex items-center">
                <AnimatedCounter value={1} />
                <span>+</span>
              </div>
              <div className="text-label-sm font-label-sm text-muted uppercase mt-1 relative z-10">Years Experience</div>
            </div>
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-display-lg font-display-lg text-sand-light tabular-nums relative z-10 flex items-center">
                <AnimatedCounter value={20} />
                <span>+</span>
              </div>
              <div className="text-label-sm font-label-sm text-muted uppercase mt-1 relative z-10">Projects Built</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative space-y-6"
        >
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text">My Philosophy</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">Code is poetry when optimized. I believe in performance first, followed by an interface so intuitive it feels like an extension of the user&apos;s thought.</p>
            </div>
          </div>

          <div className="glass-card p-8 ml-4 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sand-light text-xl">rocket_launch</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text">My Journey</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">From low-level systems architecture to high-fidelity creative frontend work, I&apos;ve navigated the full spectrum of modern digital development.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
