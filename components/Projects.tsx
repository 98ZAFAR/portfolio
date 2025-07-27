'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const itemRefs = useRef<Array<HTMLElement | null>>([]);

    const toggleExpand = (idx: number) => {
        setExpandedIndex(expandedIndex === idx ? null : idx);
    };

    // When a project expands, scroll it into view smoothly
    useEffect(() => {
        if (expandedIndex !== null && itemRefs.current[expandedIndex]) {
            itemRefs.current[expandedIndex]!
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [expandedIndex]);

    return (
        <section
            id="projects"
            className="w-full max-w-3xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
        >
            <h2 className="text-3xl font-bold text-center mb-8">
                Featured <span className="text-[var(--color-accent)]">Projects</span>
            </h2>

            <div className="flex flex-col gap-8">
                {projects.map((proj, idx) => {
                    const isOpen = expandedIndex === idx;

                    return (
                        <motion.article
                            key={proj.title}
                            ref={(el) => { itemRefs.current[idx] = el; }}
                            className="bg-[var(--color-bg-light)] dark:bg-[var(--color-darkbg)] rounded-xl shadow-lg overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            {/* Header */}
                            <div
                                className="relative h-52 cursor-pointer"
                                onClick={() => toggleExpand(idx)}
                            >
                                <img
                                    src={proj.imgSrc}
                                    alt={proj.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 text-2xl font-semibold text-white drop-shadow-lg">
                                    {proj.title}
                                </h3>
                                <button
                                    onClick={() => toggleExpand(idx)}
                                    className="
                    absolute top-4 right-4 text-white text-2xl
                    bg-black/40 rounded-full p-1
                    hover:bg-black/60 transition
                  "
                                    aria-label={isOpen ? 'Collapse details' : 'Expand details'}
                                >
                                    {isOpen ? '–' : '+'}
                                </button>
                            </div>

                            {/* Summary */}
                            <div className="p-4">
                                <p className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
                                    {proj.description}
                                </p>
                            </div>

                            {/* Details */}
                            <motion.div
                                className="px-4 overflow-hidden"
                                initial={false}
                                animate={isOpen ? { height: 'auto', opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {isOpen && (
                                    <div className="pb-6 space-y-6">
                                        <p className="text-sm leading-relaxed text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
                                            {proj.details.longDescription}
                                        </p>

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

                                        <div className="flex flex-wrap gap-2">
                                            {proj.details.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="
                            text-xs font-medium
                            bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-darkbg)]/50
                            text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
                            px-3 py-1 rounded-full
                          "
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            {proj.details.liveLink && (
                                                <a
                                                    href={proj.details.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                            px-4 py-2 rounded-full
                            bg-[var(--color-primary)] text-white
                            hover:bg-[var(--color-accent)]
                            transition-colors duration-200 text-sm
                          "
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                            {proj.details.repoLink && (
                                                <a
                                                    href={proj.details.repoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                            px-4 py-2 rounded-full
                            border border-[var(--color-border)]
                            text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
                            hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
                            transition-colors duration-200 text-sm
                          "
                                                >
                                                    View Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
