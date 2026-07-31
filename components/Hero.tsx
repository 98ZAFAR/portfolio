'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 0.3,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    }
  }
};

export default function Hero() {
  const titleText = "MOHAMMAD ZAFAR";
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden" id="hero">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[120%] opacity-50 z-0 origin-top"
      >
        <Image
          src="/images/portfolio_bg_comp.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/20 to-bg z-10" />
      </motion.div>

      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-gutter max-w-5xl mt-20"
      >
        <motion.h1
          className="font-display-2xl text-display-lg-mobile md:text-display-lg lg:text-display-2xl mb-stack-md leading-none flex justify-center flex-wrap"
          initial="hidden"
          animate="visible"
        >
          {titleText.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={titleVariants}
              custom={index}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-body-lg text-body-lg text-text-secondary mb-stack-lg"
        >
          Crafting Digital Experiences with Precision and Artistry
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-stack-md justify-center items-center"
        >
          <a href="#projects" className="group relative px-8 py-4 bg-primary text-bg rounded-full overflow-hidden magnetic-target inline-block font-bold transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
            <div className="absolute inset-0 bg-primary-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
          </a>
          <a href="#contact" className="group px-8 py-4 border-2 border-border text-text rounded-full hover:border-primary hover:text-primary transition-all magnetic-target inline-block hover:bg-primary/5 hover:scale-105 active:scale-95">
            <span className="flex items-center gap-2">
              Contact Me
              <span className="material-symbols-outlined opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">mail</span>
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted z-10"
      >
        <span className="text-label-sm font-label-sm uppercase tracking-widest">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-bounce"></div>
      </motion.div>
    </section>
  );
}
