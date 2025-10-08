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
import { Contact } from '@/components/Contact';
import projects from '@/utils/projects';

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="
          min-h-screen
          w-full max-w-full
          bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
          text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
          flex flex-col items-center
          px-4 py-28 overflow-x-hidden
        "
      >
        <Hero />
        <Projects projects={projects} />
        <SkillsSection />
        <TechCarousel />
        <ExperienceSection />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}