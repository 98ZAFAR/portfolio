'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Project = {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
  details: {
    longDescription: string;
    images: string[];
    techStack: string[];
    repoLink?: string;
    liveLink?: string;
  };
};

export default function Projects({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Featured <span className="text-[var(--color-accent)]">Projects</span>
      </motion.h2>

      <div className="flex flex-col gap-12">
        {projects.map((proj, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.article
              key={proj.title}
              className="bg-[var(--color-bg-light)] dark:bg-[var(--color-darkbg)] rounded-xl shadow-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div
                className={`flex flex-col md:flex-row ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <motion.div 
                  className="md:w-1/2 h-64 md:h-auto relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={proj.href} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full">
                    {proj.imgSrc && proj.imgSrc !== "/" ? (
                      <Image
                        src={proj.imgSrc}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <span className="text-[var(--color-secondary)] font-semibold">No Image Available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 group-hover:from-black/60 transition-all duration-300" />
                    <motion.h3 
                      className="absolute bottom-4 left-4 text-2xl font-semibold text-white drop-shadow-lg z-20"
                      animate={{ 
                        y: hoveredIndex === idx ? -5 : 0,
                        scale: hoveredIndex === idx ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {proj.title}
                    </motion.h3>
                  </a>
                </motion.div>

                {/* Details */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
                      {proj.description}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
                      {proj.details.longDescription}
                    </p>

                    {/* Screenshots */}
                    <div className="grid grid-cols-2 gap-2">
                      {proj.details.images
                        .filter(src => src && src !== "/")
                        .map((src, i) => (
                          <div key={i} className="relative w-full h-24">
                            <Image
                              src={src}
                              alt={`${proj.title} screenshot ${i + 1}`}
                              fill
                              className="object-cover rounded-md"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                      {proj.details.images.filter(src => src && src !== "/").length === 0 && (
                        <div className="col-span-2 text-center text-sm text-gray-500 py-4">
                          Screenshots coming soon...
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {proj.details.techStack.map((tech, techIdx) => (
                        <motion.span
                          key={tech}
                          className="text-xs font-medium bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-darkbg)]/50 text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] px-3 py-1 rounded-full hover:bg-[var(--color-primary)] hover:text-white cursor-default transition-all duration-200"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIdx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {proj.details.liveLink && (
                      <motion.a
                        href={proj.details.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(99,102,241,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {proj.details.repoLink && (
                      <motion.a
                        href={proj.details.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}

        <motion.article
          className="bg-[var(--color-bg-light)] dark:bg-[var(--color-darkbg)] rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: projects.length * 0.1 }}
        >
        </motion.article>

        {/* Repeat similar blocks for Pen-Mail and Blogging Website */}
      </div>
    </section>
  );
}
