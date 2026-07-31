'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TiltCard3D } from './TiltCard3D';

const projectVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
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

interface ProjectItem {
  title: string;
  description: string;
  details?: {
    longDescription?: string;
    techStack?: string[];
    illustration?: {
      color: string;
      icon: string;
      pattern: string;
    };
  };
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax subtle shifts
  const yEven = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yOdd = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-section-gap max-w-container-max mx-auto px-gutter" id="projects">
      <div className="text-center mb-stack-lg">
        <span className="text-primary font-label-sm text-label-sm uppercase tracking-[0.2em] mb-4 block">Selected Works</span>
        <h2 className="font-display-lg text-display-lg text-text">Gallery of Innovation</h2>
      </div>

      <div className="space-y-stack-lg">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const color = project.details?.illustration?.color || "#FB6339";
          const icon = project.details?.illustration?.icon || "terminal";
          const pattern = project.details?.illustration?.pattern || "dots";

          return (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={projectVariants}
              style={{ y: isEven ? yEven : yOdd }}
              className={`flex flex-col gap-8 md:gap-16 items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="w-full md:w-3/5">
                <TiltCard3D className="group relative aspect-[2/1] md:aspect-[21/9] overflow-hidden rounded-2xl w-full flex items-center justify-center bg-bg border border-border" glowColor={color}>
                  <div className="absolute inset-0 opacity-20" style={{ color }}>
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        {pattern === 'circles' && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
                          </pattern>
                        )}
                        {pattern === 'boxes' && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <rect x="10" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
                          </pattern>
                        )}
                        {pattern === 'grid' && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                          </pattern>
                        )}
                        {pattern === 'lines' && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2" />
                          </pattern>
                        )}
                        {pattern === 'hexagons' && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="60" height="103.923" patternUnits="userSpaceOnUse">
                            <path d="M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32z" fill="none" stroke="currentColor" strokeWidth="1"/>
                          </pattern>
                        )}
                        {pattern === 'waves' && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
                            <path d="M0 10 Q 15 0, 30 10 T 60 10" fill="none" stroke="currentColor" strokeWidth="1"/>
                          </pattern>
                        )}
                        {(!pattern || pattern === 'dots') && (
                          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                          </pattern>
                        )}
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${index})`} />
                    </svg>
                  </div>
                  
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                      className="absolute rounded-full opacity-20 mix-blend-screen blur-3xl"
                      style={{ background: color, width: '40%', height: '80%', left: '10%', top: '10%' }}
                      animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute rounded-full opacity-20 mix-blend-screen blur-3xl"
                      style={{ background: color, width: '30%', height: '60%', right: '10%', bottom: '10%' }}
                      animate={{
                        x: [0, -30, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  
                  <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center">
                    <motion.div 
                      className="w-24 h-24 rounded-2xl bg-surface/80 backdrop-blur-md border border-border shadow-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500"
                      style={{ color }}
                      animate={{
                        rotate: [0, 5, -5, 0],
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="material-symbols-outlined text-5xl">
                        {icon}
                      </span>
                    </motion.div>
                    <div className="w-16 h-1 rounded-full group-hover:w-32 transition-all duration-500" style={{ background: color, opacity: 0.5 }}></div>
                  </div>
                </TiltCard3D>
              </div>
              
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.details?.techStack?.map((tag: string) => (
                    <span key={tag} className="text-label-sm font-label-sm px-3 py-1 bg-surface border border-border text-text-secondary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline-md text-headline-md text-text mb-4">{project.title}</h3>
                <p className="text-text-secondary text-body-md mb-6 leading-relaxed">
                  {project.details?.longDescription || project.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-stack-lg flex justify-center">
        <a href="#" className="px-8 py-4 border border-border text-text rounded-full hover:bg-surface/40 hover:border-primary/50 hover:text-primary transition-all magnetic-target cursor-pointer font-bold inline-block">
          View Full Archive
        </a>
      </div>
    </section>
  );
}
