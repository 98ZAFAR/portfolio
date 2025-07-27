import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer
      className="
        w-full mt-20 px-4 sm:px-6 lg:px-8
        bg-[var(--color-bg-light)]/70 dark:bg-[var(--color-bg-dark)]/70
        backdrop-blur-lg border-t border-[var(--color-border)]
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Footer nav links */}
        <ul className="flex space-x-4 text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
          {['Home','About','Projects','Contact'].map((label) => (
            <li key={label} className="hover:text-[var(--color-accent)] transition-colors">
              <a href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social icons */}
        <div className="flex space-x-4 text-xl text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
          <a
            href="https://github.com/98ZAFAR"
            aria-label="GitHub"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/mohammad-zafar-bb62aa169/"
            aria-label="LinkedIn"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <FiLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]">
          © {new Date().getFullYear()} <span className="font-semibold">Mohammad Zafar</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
