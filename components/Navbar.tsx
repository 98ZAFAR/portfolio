'use client';

import React, { useState } from 'react';
import ToggleTheme from './ToggleTheme';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Home', 'About', 'Projects', 'Contact'];

  const linkClasses =
    `block px-4 py-2 font-medium
     text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
     relative before:absolute before:bottom-0 before:left-0
     before:h-0.5 before:w-full before:scale-x-0
     before:origin-left before:transition-transform before:duration-300
     hover:before:scale-x-100 before:bg-[var(--color-accent)]
     transition-colors`;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 overflow-x-hidden" data-scroll="smooth">
        <nav
          className="
            relative flex items-center justify-between max-w-6xl mx-auto
            px-4 sm:px-6 py-4 bg-[var(--color-bg-light)]/70 dark:bg-[var(--color-bg-dark)]/70
            backdrop-blur-lg border-b border-[var(--color-border)]
            transition-colors duration-300 rounded-b-lg
          "
        >
          {/* SVG blob */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-20 animate-spin-slow">
            {/* ...your SVG as before... */}
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="
              relative z-10 text-2xl md:text-3xl font-extrabold
              pl-2
              text-[var(--color-primary)]
              hover:text-[var(--color-accent)]
              transition-colors duration-200
            "
          >
            Portfolio
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex space-x-2 z-10">
            {links.map(label => (
              <li key={label} className={linkClasses}>
                <Link href={label === 'Home' ? '/' : `#${label.toLowerCase()}`}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                className="
                  inline-block px-5 py-2 rounded-full
                  bg-[var(--color-primary)] text-white font-semibold
                  hover:bg-[var(--color-accent)] transition-colors
                "
              >
                Get in Touch
              </Link>
            </li>
          </ul>

          {/* Theme toggle + social + hamburger */}
          <div className="flex items-center space-x-4 z-10">
            <div className="hidden lg:flex lg:justify-center lg:items-center space-x-3 text-xl">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume"
                className="flex justify-center items-center gap-1 text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:text-[var(--color-accent)] transition-colors"
              >
                <FiDownload />
                <p className='text-md'>Resume</p>
              </Link>
              <ToggleTheme />

              <Link
                href="https://github.com/98ZAFAR"
                aria-label="GitHub"
                className="text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:text-[var(--color-accent)] transition-colors"
              >
                <FiGithub />
              </Link>
              <Link
                href="https://linkedin.com/in/mohammad-zafar-bb62aa169/"
                aria-label="LinkedIn"
                className="text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:text-[var(--color-accent)] transition-colors"
              >
                <FiLinkedin />
              </Link>
            </div>

            <div className='block lg:hidden'>
              <ToggleTheme />
            </div>
            <button
              onClick={() => setMenuOpen(open => !open)}
              className="
                lg:hidden p-2 rounded-md
                text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
                hover:bg-[var(--color-border)]/20 transition-colors
              "
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDE PANEL */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64
          bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
          shadow-xl transform transition-transform duration-300 z-50
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        data-scroll="smooth"
      >
        {/* Close button inside the sidebar */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="
              p-2 rounded-md
              text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
              hover:bg-[var(--color-border)]/20 transition-colors
            "
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center h-full pt-20">
          {links.map(label => (
            <Link
              key={label}
              href={label === 'Home' ? '/' : `#${label.toLowerCase()}`}
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
            className="flex justify-center items-center text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:text-[var(--color-accent)] transition-colors"
          >
            <FiDownload />
            <p className={linkClasses}>Resume</p>
          </Link>

          <div className="mt-auto mb-8 px-4 flex space-x-4 text-2xl">
            <Link
              href="https://github.com/98ZAFAR"
              aria-label="GitHub"
              className="text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:text-[var(--color-accent)] transition-colors"
            >
              <FiGithub />
            </Link>
            <Link
              href="https://linkedin.com/in/mohammad-zafar-bb62aa169/"
              aria-label="LinkedIn"
              className="text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)] hover:text-[var(--color-accent)] transition-colors"
            >
              <FiLinkedin />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
