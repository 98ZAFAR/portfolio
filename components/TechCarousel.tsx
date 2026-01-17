'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const techStackTop = [
  { name: 'React', logo: '/logos/react.svg', color: 'primary' },
  { name: 'Next.js', logo: '/logos/nextjs.svg', color: 'primary' },
  { name: 'Tailwind CSS', logo: '/logos/tailwind.svg', color: 'primary' },
  { name: 'MongoDB', logo: '/logos/mongodb.svg', color: 'primary' },
  { name: 'GitHub', logo: '/logos/github.svg', color: 'primary' },
];

const techStackBottom = [
  { name: 'Node.js', logo: '/logos/nodejs.svg', color: 'accent' },
  { name: 'Express', logo: '/logos/express.svg', color: 'accent' },
  { name: 'MySQL', logo: '/logos/mysql.svg', color: 'accent' },
  { name: 'Postman', logo: '/logos/postman.svg', color: 'accent' },
];

export default function TechCarousel() {

  return (
    <section className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-2">
          Tech <span className="text-[var(--color-primary)]">Stack</span>
        </h2>
        <p className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] opacity-70">
          Technologies I work with
        </p>
      </motion.div>

      {/* Roadmap Style Layout */}
      <div className="relative max-w-5xl mx-auto overflow-x-auto">
        {/* Top Row */}
        <div className="flex justify-center items-start gap-2 xs:gap-3 sm:gap-6 md:gap-10 lg:gap-12 mb-8 min-w-max px-4">
          {techStackTop.map((tech, idx) => (
            <motion.div
              key={`top-${tech.name}`}
              className="flex flex-col items-center flex-shrink-0"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Label */}
              <div className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] mb-2 sm:mb-4 text-center uppercase tracking-wider h-6 sm:h-8 flex items-center max-w-[60px] xs:max-w-[70px] sm:max-w-none">
                {tech.name}
              </div>
              
              {/* Circular Badge */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Outer Ring */}
                <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[var(--color-primary)] p-1 shadow-lg">
                  {/* Inner White Circle */}
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-200 flex items-center justify-center border-2 sm:border-4 border-white dark:border-[var(--color-bg-dark)]">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-transform duration-300"
                    />
                  </div>
                </div>
                
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center items-start gap-2 xs:gap-4 sm:gap-5 md:gap-8 lg:gap-14 min-w-max px-4">
          {techStackBottom.map((tech, idx) => (
            <motion.div
              key={`bottom-${tech.name}`}
              className="flex flex-col items-center flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
            >
              {/* Circular Badge */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                
                {/* Outer Ring */}
                <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[var(--color-accent)] p-1 shadow-lg">
                  {/* Inner White Circle */}
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-200 flex items-center justify-center border-2 sm:border-4 border-white dark:border-[var(--color-bg-dark)]">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-transform duration-300"
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Label */}
              <div className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] mt-2 sm:mt-4 text-center uppercase tracking-wider max-w-[60px] xs:max-w-[70px] sm:max-w-none">
                {tech.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
