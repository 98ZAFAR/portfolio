'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import SkillsSection from '@/components/Skills';
import TechCarousel from '@/components/TechCarousel';
import ExperienceSection from '@/components/Experience';
import Footer from '@/components/Footer';
import { Contact } from '@/components/Contact';

const projects = [
  {
    "title": "Realtime Chat App",
    "description": "A MERN-based realtime chat application with Socket.io integration, featuring user authentication, private and group chats, and responsive design.",
    "imgSrc": "/images/chatin_4.png",
    "href": "https://your-chat-app.herokuapp.com",
    "details": {
      "longDescription": "Built with Node.js, Express, MongoDB, and React, this chat app allows users to create private or group conversations in realtime. Implemented JWT-based authentication and deployed on Heroku.",
      "images": [
        "/images/chatin_2.png",
        "/images/chatin_3.png"
      ],
      "techStack": [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io"
      ],
      "repoLink": "https://github.com/98ZAFAR/chat-in",
      "liveLink": "https://chatin.zafardev.me"
    }
  },
  {
    "title": "Pen‑Mail (Slowly Clone)",
    "description": "A pen‑pal application inspired by Slowly, featuring delayed message delivery based on geographic distance and collectible stamps.",
    "imgSrc": "/images/pen-mail.png",
    "href": "https://pen-mail.vercel.app",
    "details": {
      "longDescription": "Developed using the MERN stack, Pen‑Mail connects users as pen‑pals and simulates postal delays. Implemented matchmaking algorithm, inbox/outbox system, and a virtual stamp collection feature.",
      "images": [
        "/images/penmail-screenshot1.png",
        "/images/penmail-screenshot2.png"
      ],
      "techStack": [
        "React",
        "Node.js",
        "Express",
        "MongoDB"
      ],
      "repoLink": "https://github.com/98ZAFAR/pen-mail",
    }
  },
  {
    "title": "Blogging Website",
    "description": "A full-featured blogging platform with user authentication, post creation/editor, and search/filter capabilities.",
    "imgSrc": "/images/blogging.png",
    "href": "https://my-blog-app.com",
    "details": {
      "longDescription": "This blogging site allows users to register, write, edit, and delete posts. Built with Node.js and MySQL using Sequelize, and styled with Tailwind CSS. Deployed on AWS.",
      "images": [
        "/images/blog-screenshot1.png",
        "/images/blog-screenshot2.png"
      ],
      "techStack": [
        "React",
        "Node.js",
        "Express",
        "MySQL",
        "Sequelize",
        "Tailwind CSS"
      ],
      "repoLink": "https://github.com/98ZAFAR/BloggingProjectBackend",
    }
  }
];


export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="
          min-h-screen
          bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
          text-[var(--color-fg-light)] dark:text-[var(--color-fg-dark)]
          flex flex-col items-center
          px-4 py-28
        "
      >
        <Hero />
        <Projects projects={projects} />
        <SkillsSection />
        <TechCarousel />
        <ExperienceSection />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}