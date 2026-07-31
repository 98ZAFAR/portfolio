const projects = [
  {
    title: "Disposable Email Service",
    description:
      "Built a disposable email platform by engineering a custom SMTP server to receive, parse, and securely store temporary emails.",
    details: {
      longDescription:
        "Built a disposable email platform by engineering a custom SMTP server to receive, parse, and securely store temporary emails.\n• Developed secure REST APIs using Express, PostgreSQL, and JWT for mailbox management, authentication, and session handling.\n• Improved performance using Upstash Redis caching, integrated Cloudinary for file attachments, and automated mailbox cleanup with CRON jobs.",
      techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "SMTP"],
      illustration: {
        color: "#FB6339",
        icon: "mail",
        pattern: "boxes",
      }
    },
  },
  {
    title: "Automated Security Posture Platform",
    description:
      "Engineered a 9-service microservices platform for automated security assessments across repositories, cloud infrastructure, dependencies, TLS endpoints, and secrets.",
    details: {
      longDescription:
        "Engineered a 9-service microservices platform for automated security assessments across repositories, cloud infrastructure, dependencies, TLS endpoints, and secrets.\n• Designed a weighted risk correlation engine that aggregated findings from multiple security scanners to generate prioritized attack paths.\n• Built a real-time SOC dashboard featuring live scan telemetry, AI-assisted vulnerability analysis, automated PDF reporting, and secure WebSocket-based remote VM agents.",
      techStack: ["Node.js", "FastAPI", "Next.js", "MongoDB", "Redis"],
      illustration: {
        color: "#B497CF",
        icon: "security",
        pattern: "waves",
      }
    },
  },
  {
    title: "Miorish - E-commerce Platform",
    description:
      "An e-commerce website where I'm currently in partnership, designing its frontend using Next.js.",
    details: {
      longDescription:
        "Partnered to design and develop the frontend of Miorish, a modern e-commerce platform. Built with Next.js to deliver a seamless shopping experience with responsive design, optimized performance, and intuitive user interfaces.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      illustration: {
        color: "#8BC34A",
        icon: "shopping_cart",
        pattern: "dots",
      }
    },
  },
  {
    title: "PixelBank - ML Coding Platform",
    description:
      "A machine learning coding platform where I worked as a frontend developer with my freelancing team using ReactJS.",
    details: {
      longDescription:
        "Collaborated as a frontend developer in a freelancing team to build PixelBank, a comprehensive ML coding platform. Developed user interfaces and interactive components using ReactJS to provide seamless coding experience for machine learning enthusiasts.",
      techStack: ["React", "JavaScript", "HTML", "CSS"],
      illustration: {
        color: "#03A9F4",
        icon: "code_blocks",
        pattern: "grid",
      }
    },
  },
  {
    title: "GMP Rentals - Property Rental Website",
    description:
      "A property rental website where I worked as a frontend developer with my team using ReactJS.",
    details: {
      longDescription:
        "Worked as a frontend developer in a collaborative team environment to develop GMP Rentals, a comprehensive property rental platform. Built responsive user interfaces and interactive features using ReactJS to enhance user experience for property browsing and rental management.",
      techStack: ["React", "JavaScript", "HTML", "CSS"],
      illustration: {
        color: "#FFC107",
        icon: "real_estate_agent",
        pattern: "lines",
      }
    },
  },
  {
    title: "Realtime Chat App",
    description:
      "A MERN-based realtime chat application with Socket.io integration, featuring user authentication, private and group chats, and responsive design.",
    details: {
      longDescription:
        "Built with Node.js, Express, MongoDB, and React, this chat app allows users to create private or group conversations in realtime. Implemented JWT-based authentication and deployed on Vercel.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      illustration: {
        color: "#E91E63",
        icon: "forum",
        pattern: "circles",
      }
    },
  },
  {
    title: "Pen-Mail",
    description:
      "A pen-pal application inspired by Slowly, featuring delayed message delivery based on geographic distance and collectible stamps.",
    details: {
      longDescription:
        "Developed using the MERN stack, Pen-Mail connects users as pen-pals and simulates postal delays. Implemented matchmaking algorithm, inbox/outbox system, and a virtual stamp collection feature.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      illustration: {
        color: "#9C27B0",
        icon: "drafts",
        pattern: "hexagons",
      }
    },
  },
  {
    title: "Fundraising Platform",
    description:
      "Built a full-stack crowdfunding platform using the MERN stack, enabling users to create fundraising campaigns, securely donate, and track campaign progress in real time.",
    details: {
      longDescription:
        "Developed a full-stack crowdfunding platform that enables individuals and organizations to create, manage, and share fundraising campaigns. The platform features secure user authentication, campaign management, donation processing. It includes responsive user dashboards, campaign discovery with search and filters. Built using the MERN stack with a focus on scalability, security, and an intuitive user experience.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      illustration: {
        color: "#4CAF50",
        icon: "volunteer_activism",
        pattern: "waves",
      }
    },
  },
];

export default projects;
