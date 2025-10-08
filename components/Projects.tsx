'use client';

import React from 'react';
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
  return (
    <section
      id="projects"
      className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        Featured <span className="text-[var(--color-accent)]">Projects</span>
      </h2>

      <div className="flex flex-col gap-12">
        {projects.map((proj, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.article
              key={proj.title}
              className="bg-[var(--color-bg-light)] dark:bg-[var(--color-darkbg)] rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div
                className={`flex flex-col md:flex-row ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <a href={proj.href} target="_blank" rel="noopener noreferrer">
                    <img
                      src={proj.imgSrc}
                      alt={proj.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-semibold text-white drop-shadow-lg">
                      {proj.title}
                    </h3>
                  </a>
                </div>

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
                      {proj.details.images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${proj.title} screenshot ${i + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {proj.details.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-darkbg)]/50 text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {proj.details.liveLink && (
                      <a
                        href={proj.details.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors duration-200 text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                    {proj.details.repoLink && (
                      <a
                        href={proj.details.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm"
                      >
                        View Code
                      </a>
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
