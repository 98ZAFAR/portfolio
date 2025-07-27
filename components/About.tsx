import React from 'react'

export default function About() {
    return (
        <section className="max-w-2xl text-center mt-20 space-y-4">
            <h2 className="text-3xl font-bold">
                About <span className="text-[var(--color-primary)]">Me</span>
            </h2>
            <p className="text-lg leading-relaxed">
                I’m currently a third‑year IT student passionate about AI, ML, and web development.
                I love tackling problems end‑to‑end, from research and prototyping through to production.
            </p>
            <a
                href="/contact"
                className="
              inline-block mt-4 px-6 py-3 rounded-full
              border-2 border-[var(--color-primary)]
              text-[var(--color-primary)] font-medium
              hover:bg-[var(--color-primary)] hover:text-white
              transition-all duration-200
            "
            >
                Let’s Talk
            </a>
        </section>
    )
}
