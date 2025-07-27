'use client';

import React, { useState, useEffect } from 'react';

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
  }, []);

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
    <section className="max-w-3xl text-center space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold flex justify-center">
        <span>
          <span>{prefix}</span>
          <span className="text-[var(--color-primary)]">{namePortion}</span>
          <span className={`inline-block w-[1ch] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
            |
          </span>
        </span>
      </h1>

      <p className="text-xl md:text-2xl leading-relaxed">
        I’m a <span className="font-semibold">Full‑Stack Developer</span> specializing in building
        beautiful, performant web applications. Welcome to my portfolio!
      </p>

      <a
        href="#projects"
        className="
          inline-block mt-4 px-6 py-3 rounded-full
          bg-[var(--color-primary)] text-white font-medium
          hover:bg-[var(--color-accent)]
          transition-colors duration-200
        "
      >
        View My Work
      </a>
    </section>
  );
}
