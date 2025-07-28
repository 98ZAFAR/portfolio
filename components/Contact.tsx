import React from 'react';

export function Contact() {
  return (
    <section
      id="contact"
      className="py-16 bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-darkbg)]/50 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        Get in <span className="text-[var(--color-accent)]">Touch</span>
      </h2>
      <form className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition resize-none"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-accent)] transition-colors duration-200 text-sm"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
