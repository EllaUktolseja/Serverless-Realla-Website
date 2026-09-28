import type {
  ContactInput,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/portfolio";

/**
 * Static portfolio data for the frontend deployment.
 *
 * The portfolio is intentionally deployable without a runtime API dependency.
 * This keeps the public website available even while the backend/serverless
 * function is being configured separately.
 */

const profile: Profile = {
  name: "Gabriella Uktolseja",
  headline: "Undergraduate Software Engineer",
  bio: "Computer science student building full-stack web applications with TypeScript, React, Node.js, and modern backend tooling. I enjoy learning by turning ideas into products.",
  email: "hello@example.com",
  location: "Bekasi, Indonesia",
  linkedinUrl: "https://www.linkedin.com/",
  githubUrl: "https://github.com/EllaUktolseja",
  whatsappUrl: "https://wa.me/6200000000000",
  resumeUrl: "https://example.com/resume.pdf",
};

const experiences: Experience[] = [
  {
    company: "Campus Software Lab",
    position: "Software Engineering Intern",
    employmentType: "Internship",
    location: "Jakarta, Indonesia",
    startDate: "2026-01-01",
    current: true,
    description:
      "Worked on full-stack web features, API integration, database-backed workflows, and developer tooling while learning production engineering practices.",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Independent Projects",
    position: "Full-stack Developer",
    employmentType: "Project-based",
    location: "Indonesia",
    startDate: "2025-01-01",
    endDate: "2025-12-01",
    current: false,
    description:
      "Built and iterated on portfolio, e-commerce, and community product prototypes with a focus on clean architecture and practical user flows.",
    technologies: ["React", "Next.js", "NestJS", "MongoDB"],
  },
];

const educations: Education[] = [
  {
    institution: "Your University",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    startDate: "2023-01-01",
    endDate: "2027-01-01",
    description:
      "Studying software engineering, databases, algorithms, distributed systems, and web application development.",
  },
];

const skillSeed: Array<[string, string, string, number]> = [
  ["TypeScript", "Languages", "Working", 2],
  ["JavaScript", "Languages", "Working", 2],
  ["React", "Frontend", "Working", 2],
  ["Next.js", "Frontend", "Learning", 1],
  ["Tailwind CSS", "Frontend", "Working", 2],
  ["Node.js", "Backend", "Working", 2],
  ["Express", "Backend", "Working", 1],
  ["NestJS", "Backend", "Learning", 1],
  ["MongoDB", "Databases", "Working", 1],
  ["PostgreSQL", "Databases", "Learning", 1],
  ["Prisma", "Databases", "Learning", 1],
  ["Docker", "Tools", "Working", 1],
  ["Git & GitHub", "Tools", "Working", 2],
].map(([name, category, level, yearsOfExperience], index) => ({
  name,
  category,
  level,
  yearsOfExperience,
  sortOrder: index + 1,
}));

const skills: Skill[] = skillSeed;

const projects: Project[] = [
  {
    title: "Realla Web",
    slug: "realla-web",
    status: "ongoing",
    shortDescription:
      "A modern full-stack portfolio website built to showcase experience, projects, and technical skills.",
    description:
      "Realla Web is a personal portfolio platform designed with a clean and focused interface. The project combines a React frontend with a REST API and MongoDB backend, giving the portfolio a real full-stack architecture instead of a static presentation site.",
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    technologies: ["React", "TypeScript", "Vite", "Express", "MongoDB"],
    featured: true,
    sortOrder: 1,
    progress: 70,
    currentFocus: [
      "Polishing portfolio UI",
      "Connecting project detail data",
      "Preparing production deployment",
    ],
    milestones: [
      {
        title: "Project foundation",
        description:
          "Set up the monorepo, frontend, backend, and development workflow.",
        completed: true,
      },
      {
        title: "Portfolio API",
        description:
          "Build profile, experience, education, skill, project, and contact endpoints.",
        completed: true,
      },
      {
        title: "Portfolio UI",
        description:
          "Build the responsive portfolio pages and project detail experience.",
        completed: true,
      },
      {
        title: "Production readiness",
        description:
          "Finish contact delivery, environment configuration, testing, and deployment.",
        completed: false,
      },
    ],
  },
  {
    title: "GY-O-REAL E-Commerce",
    slug: "gy-o-real-ecommerce",
    status: "ongoing",
    shortDescription:
      "A full-stack fashion e-commerce platform built around a database-backed product experience.",
    description:
      "GY-O-REAL E-Commerce is a full-stack shopping platform exploring product catalogs, categories, database-backed APIs, and a modern storefront experience.",
    repositoryUrl: "https://github.com/EllaUktolseja/GY-O-REAL-E-Commerce",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 2,
    progress: 45,
    currentFocus: [
      "Storefront implementation",
      "Product and category flows",
      "Database-backed shopping experience",
    ],
    milestones: [
      {
        title: "Repository and workspace setup",
        description: "Create the monorepo and development infrastructure.",
        completed: true,
      },
      {
        title: "Database foundation",
        description:
          "Set up PostgreSQL, Prisma, migrations, and seed data.",
        completed: true,
      },
      {
        title: "Catalog API",
        description:
          "Implement category and product CRUD endpoints.",
        completed: true,
      },
      {
        title: "Storefront",
        description:
          "Build the customer-facing product browsing and shopping flows.",
        completed: false,
      },
    ],
  },
  {
    title: "FoodFoundry",
    slug: "foodfoundry",
    status: "planning",
    shortDescription:
      "A community-focused food showcase and feedback platform for discovering customer preferences.",
    description:
      "FoodFoundry is a planned full-stack web application created to showcase food products and collect direct customer feedback. The platform is designed around a simple experience: introduce the product, let people explore it, and make it easy for visitors to share what they think.",
    repositoryUrl: "https://github.com/EllaUktolseja/FoodFoundry",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 3,
    goal:
      "Create a lightweight digital touchpoint for introducing dessert products, collecting customer feedback, and turning real community responses into useful product insights.",
    scope: [
      "Product showcase and introduction",
      "Customer feedback submission",
      "Feedback data storage and basic analysis",
      "Responsive experience for mobile-first community use",
      "Simple deployment and maintainable backend architecture",
    ],
    timeline: [
      {
        phase: "Discovery",
        duration: "Week 1",
        description:
          "Validate the target audience, product positioning, feedback questions, and success criteria.",
      },
      {
        phase: "UX & Architecture",
        duration: "Week 2",
        description:
          "Define the user journey, page structure, API contract, database schema, and visual direction.",
      },
      {
        phase: "MVP Development",
        duration: "Weeks 3–4",
        description:
          "Build the product showcase, feedback flow, backend API, database, and validation.",
      },
      {
        phase: "Testing & Iteration",
        duration: "Week 5",
        description:
          "Test the experience with real users, review feedback quality, and improve usability.",
      },
      {
        phase: "Launch",
        duration: "Week 6",
        description:
          "Deploy the MVP, introduce it to the community, and monitor early responses.",
      },
    ],
  },
  {
    title: "Meatloop",
    slug: "meatloop",
    status: "completed",
    shortDescription:
      "A food marketplace interface concept with a bold, youth-focused visual direction.",
    description:
      "Meatloop is a completed frontend exploration of a food-waste marketplace experience with bold visual hierarchy, responsive cards, and a playful interaction model.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: false,
    sortOrder: 4,
  },
  {
    title: "Supply Chain Monitor",
    slug: "supply-chain-monitor",
    status: "planning",
    shortDescription:
      "A security research dashboard concept for software supply-chain monitoring.",
    description:
      "A planned research-oriented interface for visualizing software supply-chain components, runtime signals, and anomaly indicators.",
    technologies: ["React", "TypeScript", "Node.js", "eBPF"],
    featured: false,
    sortOrder: 5,
    goal:
      "Explore a practical dashboard concept for correlating expected software supply-chain components with runtime behavioral signals.",
    scope: [
      "SBOM component overview",
      "Runtime event visualization",
      "Anomaly indicator presentation",
      "Service and dependency context",
      "Research-friendly dashboard structure",
    ],
    timeline: [
      {
        phase: "Research",
        duration: "Weeks 1–2",
        description:
          "Review the problem space, relevant telemetry, SBOM data, and research requirements.",
      },
      {
        phase: "Concept Design",
        duration: "Week 3",
        description:
          "Define the dashboard information architecture and core monitoring views.",
      },
      {
        phase: "Prototype",
        duration: "Weeks 4–6",
        description:
          "Build a proof of concept for ingesting and visualizing static and runtime signals.",
      },
      {
        phase: "Evaluation",
        duration: "Weeks 7–8",
        description:
          "Evaluate the prototype with representative scenarios and refine the presentation.",
      },
    ],
  },
];

export function getProfile(): Promise<Profile> {
  return Promise.resolve(profile);
}

export function getExperiences(): Promise<Experience[]> {
  return Promise.resolve(experiences);
}

export function getEducations(): Promise<Education[]> {
  return Promise.resolve(educations);
}

export function getSkills(): Promise<Skill[]> {
  return Promise.resolve(skills);
}

export function getProjects(): Promise<Project[]> {
  return Promise.resolve([...projects].sort((a, b) => a.sortOrder - b.sortOrder));
}

export function getProjectBySlug(slug: string): Promise<Project> {
  const project = projects.find((item) => item.slug === slug);

  return project
    ? Promise.resolve(project)
    : Promise.reject(new Error("Project not found."));
}

export function submitContact(input: ContactInput): Promise<{ message: string }> {
  const subject = input.subject?.trim() || `Portfolio contact from ${input.name}`;
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    "",
    input.message,
  ].join("\n");

  window.location.href =
    `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return Promise.resolve({ message: "Opening your email client..." });
}
