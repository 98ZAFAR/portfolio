'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ExperienceSection() {
  const experiences = [
    {
      date: 'Jul 2024 – Present',
      title: 'GovTech Hackathon',
      desc: 'Built an AI‑powered alumni platform for Rajasthan Technical Education Dept.',
    },
    {
      date: 'Mar 2024 – Jun 2024',
      title: 'Intern @ Tech Startup',
      desc: 'Developed Next.js dashboard & real‑time data visualizations.',
    },
    {
      date: 'Sep 2023 – Feb 2024',
      title: 'Undergrad Research',
      desc: 'Published a paper on VHDL optimization techniques.',
    },
  ];

  return (
    <section
      className="
        w-full mt-20 px-4 sm:px-6 lg:px-8
        bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
        text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
      "
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        My <span className="text-[var(--color-primary)]">Journey</span>
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical progress line behind cards */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-[var(--color-border)] -translate-x-1/2 z-0 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />

        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

          return (
            <div
              key={idx}
              ref={ref}
              className={`
                relative w-full flex flex-col md:flex-row
                ${isEven ? 'md:justify-end md:pr-8' : 'md:justify-start md:pl-8'}
                mb-12
              `}
            >
              {/* Dot slightly above the card */}
              <motion.div
                className="absolute left-1/2 -top-2 w-4 h-4 rounded-full bg-[var(--color-accent)] -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              />

              {/* Card */}
              <motion.div
                className={`
                  relative z-10
                  bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
                  border border-[var(--color-border)] rounded-lg p-6
                  shadow-md hover:shadow-lg transition-shadow duration-200
                  w-full md:w-2/3
                `}
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">{exp.date}</div>
                <h3 className="text-xl font-semibold mt-1">{exp.title}</h3>
                <p className="mt-2 text-sm leading-snug">{exp.desc}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
