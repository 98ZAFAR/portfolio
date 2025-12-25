'use client';

import Link from "next/link";
import React from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    return (
        <motion.section 
            ref={ref}
            id="about" 
            className="max-w-2xl text-center mt-20 space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h2 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                About <span className="text-[var(--color-primary)]">Me</span>
            </motion.h2>
            <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                I&apos;m a passionate and curious engineering student specializing in Information Technology at IIEST Shibpur, expected to graduate in 2027. I actively work on full-stack web development projects using the MERN stack and have a strong foundation in C++, Python, and JavaScript. Beyond academics, I&apos;m involved in building impactful tech solutions—from mental health platforms to coding fundraising websites—and love exploring areas like machine learning and system design. Always eager to learn, collaborate, and solve real-world problems through code.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <Link
                    href="#contact"
                    className="
                      inline-block mt-4 px-6 py-3 rounded-full
                      border-2 border-[var(--color-primary)]
                      text-[var(--color-primary)] font-medium
                      hover:bg-[var(--color-primary)] hover:text-white
                      hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]
                      transition-all duration-300
                      transform hover:scale-105 active:scale-95
                    "
                >
                    Let&apos;s Talk
                </Link>
            </motion.div>
        </motion.section>
    );
}
