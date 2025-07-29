'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Experience = {
  date: string;
  title: string;
  desc: string;
};

function ExperienceItem({ exp, isEven, delay }: { exp: Experience; isEven: boolean; delay: number }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className={`
        relative w-full flex flex-col md:flex-row
        ${isEven ? 'md:justify-end md:pr-8' : 'md:justify-start md:pl-8'}
        mb-12
      `}
    >
      {/* Dot on the timeline */}
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
        transition={{ duration: 0.6, delay }}
      >
        <div className="text-sm text-gray-500 dark:text-gray-400">{exp.date}</div>
        <h3 className="text-xl font-semibold mt-1">{exp.title}</h3>
        <p className="mt-2 text-sm leading-snug">{exp.desc}</p>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const experiences: Experience[] = [
    {
      date: 'Dec 2024 - Jan 2025',
      title: 'SIH Hackathon',
      desc: 'Built an AI‑powered alumni platform for Rajasthan Technical Education Dept with my team. Got selected at college level.',
    },
    {
      date: 'Apr 2025 - May 2025',
      title: 'AI/ML Mini Project',
      desc: 'Developed a machine learning model for predicting emotional quotient through facial expressions with help from my team.',
    },
    {
      date: 'Jun 2025 - Jul 2025',
      title: 'Freelance Web Developer',
      desc: 'Worked on various web development projects, focusing on creating responsive and user-friendly websites for clients in a team environment.',
    },
    {
      date: 'Jul 2025 - Jul 2025',
      title: 'JPMC Code for Good',
      desc: 'Participated in a hackathon focused on developing solutions for social impact. Worked on a project that empowers rural women leadership and artisans.',
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
        {/* Vertical progress line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-[var(--color-border)] -translate-x-1/2 z-0 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2 }}
        />

        {experiences.map((exp, idx) => (
          <ExperienceItem
            key={idx}
            exp={exp}
            isEven={idx % 2 === 0}
            delay={idx * 0.2}
          />
        ))}
      </div>
    </section>
  );
}
