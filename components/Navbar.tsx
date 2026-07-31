'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import StaggeredMenu from './StaggeredMenu';
import Image from 'next/image';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Tech', href: '#tech' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 py-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className={`glass rounded-full px-4 md:px-8 border border-border flex items-center justify-between gap-4 md:gap-8 w-full md:w-auto md:max-w-fit transition-all duration-500 ${
            isScrolled ? 'py-2 scale-[0.97]' : 'py-3.5'
          }`}
        >
          <a href="#hero" className="flex items-center gap-2 magnetic-target group cursor-pointer z-50 shrink-0">
            <div className="w-8 h-8 flex items-center justify-center text-bg font-bold font-display-sm group-hover:scale-110 transition-transform">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={50}
                height={50}
                className='bg-primary rounded-full'
              />
            </div>
            <span className="hidden sm:inline font-display-lg text-headline-md font-bold tracking-widest text-text group-hover:text-primary transition-colors">
              Portfolio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, ease: "easeOut" as const }}
                className="relative px-4 py-2 text-text-secondary hover:text-primary rounded-full hover:bg-surface/60 transition-all duration-300 font-body-md text-body-md cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-8 shrink-0">
            <a
              href="#contact"
              className="hidden sm:block bg-primary text-bg px-6 py-2 rounded-full font-body-md font-bold hover:bg-primary-light hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Hire Me
            </a>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center justify-center z-50">
              <StaggeredMenu
                items={[
                  { label: 'Work', ariaLabel: 'Work', link: '#projects' },
                  { label: 'Tech', ariaLabel: 'Tech', link: '#tech' },
                  { label: 'About', ariaLabel: 'About', link: '#about' },
                ]}
                socialItems={[
                  { label: 'GitHub', link: 'https://github.com/m-zafar1' },
                  { label: 'LinkedIn', link: 'https://linkedin.com/in/mohammadzafar' },
                  { label: 'Resume', link: '/resume.pdf' }
                ]}
              />
            </div>
          </div>
        </motion.nav>
      </header>
    </>
  );
}
