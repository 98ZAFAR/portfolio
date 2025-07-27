'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import SkillsSection from '@/components/Skills';
import TechCarousel from '@/components/TechCarousel';
import ExperienceSection from '@/components/Experience';
import Footer from '@/components/Footer';

const projects = [
  {
    title: 'Alumni Connect Platform',
    description: 'An AI‑driven platform to connect students with alumni mentors in real time.',
    imgSrc: '/projects/alumni-connect.png',
    href: '#',
    details: {
      longDescription: `Built for the Rajasthan Technical Education Department hackathon, this platform leverages NLP to match student queries to alumni expertise. Features include live chat, scheduled video calls, and a searchable mentor directory.`,
      images: [
        '/projects/alumni-1.png',
        '/projects/alumni-2.png',
        '/projects/alumni-3.png',
      ],
      techStack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'TensorFlow.js'],
      repoLink: 'https://github.com/yourusername/alumni-connect',
      liveLink: 'https://alumni-connect.example.com',
    },
  },
  {
    title: 'Real‑Time Chat App',
    description: 'A scalable chat application with rooms, typing indicators, and read receipts.',
    imgSrc: '/projects/chat-app.png',
    href: '#',
    details: {
      longDescription: `This chat app uses WebSockets (Socket.io) to enable real-time messaging. Users can create rooms, see when others are typing, and get live delivery/read confirmations. Deployed on DigitalOcean with Docker containers.`,
      images: [
        '/projects/chat-1.png',
        '/projects/chat-2.png',
      ],
      techStack: ['React', 'Node.js', 'Socket.io', 'Express', 'MongoDB'],
      repoLink: 'https://github.com/yourusername/chat-app',
      liveLink: 'https://chat-app.example.com',
    },
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio showcasing projects, blog posts, and skills.',
    imgSrc: '/projects/portfolio.png',
    href: '#',
    details: {
      longDescription: `My own portfolio built with Next.js and Tailwind CSS. Includes dark mode toggle, animated sections, and a contact form. Content is statically generated for maximum performance.`,
      images: [
        '/projects/portfolio-1.png',
        '/projects/portfolio-2.png',
        '/projects/portfolio-3.png',
      ],
      techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      repoLink: 'https://github.com/yourusername/portfolio',
      liveLink: 'https://yourdomain.com',
    },
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="
          min-h-screen
          bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
          text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
          flex flex-col items-center
          px-4 py-28
        "
      >
        <Hero />
        <Projects projects={projects} />
        <SkillsSection />
        <TechCarousel />
        <ExperienceSection />
        <About />
        <Footer />
      </main>
    </>
  );
}