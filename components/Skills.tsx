'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SkillsSection() {
  const skills = [
    'C++', 'JavaScript', 'TypeScript', 'React', 'Next.js',
    'Node.js', 'Tailwind CSS', 'Python', 'React Native', 'MySQL',
  ];

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={`
        w-full max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8
        bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
        text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
        rounded-xl shadow-lg py-12
      `}
    >
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold">
          My <span className="text-[var(--color-primary)]">Skills</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are a few technologies and concepts I&apos;ve been working with recently.
        </p>
      </motion.div>

      {/* Skill Badges */}
      <ul className="mt-8 flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            whileHover={{ 
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center justify-center
              bg-[var(--color-bg-light)]/80 dark:bg-[var(--color-bg-dark)]/80
              border-2 border-[var(--color-border)] dark:border-[var(--color-border)]
              rounded-full px-5 py-2
              hover:bg-[var(--color-primary)] hover:text-white
              hover:border-[var(--color-primary)]
              hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]
              transition-all duration-300 cursor-pointer
              group
            `}
          >
            <span className="font-medium">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
