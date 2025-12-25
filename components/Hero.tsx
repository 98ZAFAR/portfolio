'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const beforeName = "Hey, I’m ";
  const nameText = "Mohammad Zafar";
  const fullText = beforeName + nameText;

  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let idx = 0;
    let typingInterval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        idx++;
        setDisplayed(fullText.slice(0, idx));

        if (idx === fullText.length) {
          clearInterval(typingInterval);
          // Pause when complete, then reset and restart
          pauseTimeout = setTimeout(() => {
            setDisplayed('');
            idx = 0;
            startTyping();
          }, 2000); // 2s pause at end
        }
      }, 100);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, [fullText]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  // Determine how much of beforeName vs nameText to show
  const prefix = displayed.length <= beforeName.length
    ? displayed
    : beforeName;
  const namePortion = displayed.length > beforeName.length
    ? displayed.slice(beforeName.length)
    : '';

  return (
    <section className="max-w-3xl text-center space-y-6 relative">
      {/* Floating animated blobs in background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-[var(--color-primary)]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold flex justify-center">
        <span>
          <span>{prefix}</span>
          <span className="text-[var(--color-primary)]">{namePortion}</span>
          <span className={`inline-block w-[1ch] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
            |
          </span>
        </span>
      </h1>

      <motion.p 
        className="text-xl md:text-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        I&apos;m a <span className="font-semibold">Full‑Stack Developer</span> specializing in building
        beautiful, performant web applications. Welcome to my portfolio!
      </motion.p>

      <motion.a
        href="#projects"
        className="
          inline-block mt-4 px-6 py-3 rounded-full
          bg-[var(--color-primary)] text-white font-medium
          hover:bg-[var(--color-accent)]
          transition-colors duration-200
          relative overflow-hidden group
        "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(99,102,241,0.4)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">View My Work</span>
      </motion.a>
    </section>
  );
}
