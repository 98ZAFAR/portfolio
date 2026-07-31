'use client';

import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: "2025 - 2026",
    role: "Advanced Developer",
    description: "Architected and delivered complex applications across diverse technology stacks, including React Native, Next.js, and FastAPI. Embraced a stack-agnostic approach with a strong focus on applying advanced system design principles to build scalable, high-performance solutions.",
    color: "text-primary",
    bgColor: "bg-primary"
  },
  {
    year: "2024 - 2025",
    role: "Intermediate Developer",
    description: "Elevated my expertise through extensive real-world project experience and team collaboration to deliver client solutions. Transitioned into full-stack development using the MERN stack, taking ownership of both frontend and backend architectures.",
    color: "text-sand-light",
    bgColor: "bg-sand-light"
  },
  {
    year: "2023 - 2024",
    role: "Beginner Developer",
    description: "Began my journey in software development by mastering core frontend technologies including HTML, CSS, and JavaScript. Built and deployed a series of responsive web projects to establish a strong foundational showcase.",
    color: "text-secondary",
    bgColor: "bg-secondary"
  }
];

const milestoneVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
};

export default function Experience() {
  return (
    <section className="py-section-gap bg-bg-secondary" id="experience">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-stack-lg">
          <span className="text-primary font-label-sm text-label-sm uppercase tracking-[0.2em] mb-4 block">Timeline</span>
          <h2 className="font-display-lg text-display-lg text-text">Evolution of Craft</h2>
        </div>

        <div className="relative max-w-5xl mx-auto mt-20">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px timeline-line opacity-30 hidden md:block"></div>

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={milestoneVariants}
                className="relative mb-16 md:mb-24"
              >
                {/* Node on Timeline */}
                <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full ${milestone.bgColor} shadow-[0_0_15px_rgba(251,99,57,0.5)] z-10`}></div>
                
                <div className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Empty space for the opposite side */}
                  <div className="hidden md:block w-5/12"></div>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-5/12 relative">
                    <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: 'rgba(251, 99, 57, 0.05)' }}></div>
                      <div className="relative z-10">
                        <div className={`font-label-sm text-label-sm font-bold mb-2 ${milestone.color}`}>{milestone.year}</div>
                        <h3 className="font-headline-md text-headline-md text-text mb-4">{milestone.role}</h3>
                        <p className="text-text-secondary">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
