import React from 'react'

export default function About() {
    return (
        <section id='about' className="max-w-2xl text-center mt-20 space-y-4">
            <h2 className="text-3xl font-bold">
                About <span className="text-[var(--color-primary)]">Me</span>
            </h2>
            <p className="text-lg leading-relaxed">
                I'm a passionate and curious engineering student specializing in Information Technology at IIEST Shibpur, expected to graduate in 2027. I actively work on full-stack web development projects using the MERN stack and have a strong foundation in C++, Python, and JavaScript. Beyond academics, I'm involved in building impactful tech solutions—from mental health platforms to coding fundraising websites—and love exploring areas like machine learning and system design. Always eager to learn, collaborate, and solve real-world problems through code.
            </p>
            <a
                href="#contact"
                className="
              inline-block mt-4 px-6 py-3 rounded-full
              border-2 border-[var(--color-primary)]
              text-[var(--color-primary)] font-medium
              hover:bg-[var(--color-primary)] hover:text-white
              transition-all duration-200
            "
            >
                Let's Talk
            </a>
        </section>
    )
}
