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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-2">
          Featured <span className="text-[var(--color-primary)]">Projects</span>
        </h2>
        <p className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] opacity-70">
          Crafting digital experiences with modern technologies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <motion.article
            key={proj.title}
            className="group relative bg-white dark:bg-[var(--color-bg-dark)] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            // onHoverStart={() => setHoveredIndex(idx)}
            // onHoverEnd={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
              {proj.imgSrc && proj.imgSrc !== "/" ? (
                <Image
                  src={proj.imgSrc}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-gray-400">No Image Available</span>
                </div>
              )}
              
              {/* Overlay on hover */}
              <motion.div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <motion.button
                  onClick={() => setSelectedProject(selectedProject === idx ? null : idx)}
                  className="px-6 py-2 bg-white dark:bg-[var(--color-bg-dark)] text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] rounded-full text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedProject === idx ? 'Show Less' : 'View Details'}
                </motion.button>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
                {proj.title}
              </h3>
              <p className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] opacity-80 mb-4 line-clamp-2">
                {proj.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.details.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 bg-[var(--color-bg-light)] dark:bg-gray-800 text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] rounded-full border border-[var(--color-border)]"
                  >
                    {tech}
                  </span>
                ))}
                {proj.details.techStack.length > 4 && (
                  <span className="text-xs px-3 py-1 text-[var(--color-primary)]">
                    +{proj.details.techStack.length - 4}
                  </span>
                )}
              </div>

              {/* Expandable Details */}
              <motion.div
                initial={false}
                animate={{
                  height: selectedProject === idx ? 'auto' : 0,
                  opacity: selectedProject === idx ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-[var(--color-border)] space-y-4">
                  <p className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] leading-relaxed">
                    {proj.details.longDescription}
                  </p>

                  {/* Additional Screenshots */}
                  {proj.details.images.filter(src => src && src !== "/").length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {proj.details.images
                        .filter(src => src && src !== "/")
                        .map((src, i) => (
                          <div key={i} className="relative w-full h-20 rounded-lg overflow-hidden border border-[var(--color-border)]">
                            <Image
                              src={src}
                              alt={`${proj.title} screenshot ${i + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                              sizes="150px"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                {proj.details.liveLink && (
                  <motion.a
                    href={proj.details.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Live Demo
                  </motion.a>
                )}
                {proj.details.repoLink && (
                  <motion.a
                    href={proj.details.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
