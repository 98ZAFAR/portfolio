import React from 'react';

export default function SkillsSection() {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js',
    'Node.js', 'Tailwind CSS', 'VHDL', 'Graph Theory'
  ];

  return (
    <section
      className={`
        w-full max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8
        bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
        text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
        rounded-xl shadow-lg py-12
      `}
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          My <span className="text-[var(--color-primary)]">Skills</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are a few technologies and concepts I’ve been working with recently.
        </p>
      </div>

      {/* Skill Badges */}
      <ul className="mt-8 flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <li
            key={skill}
            className={`
              flex items-center justify-center
              bg-[var(--color-bg-light)]/80 dark:bg-[var(--color-bg-dark)]/80
              border-2 border-[var(--color-border)] dark:border-[var(--color-border)]
              rounded-full px-5 py-2
              hover:bg-[var(--color-primary)] hover:text-white
              transition-colors duration-200
            `}
          >
            <span className="font-medium">{skill}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
