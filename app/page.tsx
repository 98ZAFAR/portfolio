'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Tech from '@/components/Tech';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import { Contact } from '@/components/Contact';
import Cursor from '@/components/Cursor';
import ThreeBackground from '@/components/ThreeBackground';
import projects from '@/utils/projects';

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Cursor />
      <Navbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <About />
        <Tech />
        <Projects projects={projects} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}