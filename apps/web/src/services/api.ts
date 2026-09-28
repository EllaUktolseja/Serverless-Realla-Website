import type {
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/portfolio";

/**
 * Static portfolio data for the frontend deployment.
 * No runtime API, serverless function, or database is required.
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

const skills: Skill[] = [
  { name: "TypeScript", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 1 },
  { name: "JavaScript", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 2 },
  { name: "React", category: "Frontend", level: "Working", yearsOfExperience: 2, sortOrder: 3 },
  { name: "Next.js", category: "Frontend", level: "Learning", yearsOfExperience: 1, sortOrder: 4 },
  { name: "Tailwind CSS", category: "Frontend", level: "Working", yearsOfExperience: 2, sortOrder: 5 },
  { name: "Node.js", category: "Backend", level: "Working", yearsOfExperience: 2, sortOrder: 6 },
  { name: "Express", category: "Backend", level: "Working", yearsOfExperience: 1, sortOrder: 7 },
  { name: "NestJS", category: "Backend", level: "Learning", yearsOfExperience: 1, sortOrder: 8 },
  { name: "MongoDB", category: "Databases", level: "Working", yearsOfExperience: 1, sortOrder: 9 },
  { name: "PostgreSQL", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 10 },
  { name: "Prisma", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 11 },
  { name: "Docker", category: "Tools", level: "Working", yearsOfExperience: 1, sortOrder: 12 },
  { name: "Git & GitHub", category: "Tools", level: "Working", yearsOfExperience: 2, sortOrder: 13 },
];

const projects: Project[] = [
  {
    title: "Realla Web",
    slug: "realla-web",
    status: "ongoing",
    shortDescription: "Personal portfolio website focused on professional identity and direct connections.",
    description:
      "Personal portfolio website focused on professional identity, experience, projects, and direct connections.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    liveUrl: "",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "GY-O-REAL E-Commerce",
    slug: "gy-o-real-e-commerce",
    status: "ongoing",
    shortDescription: "Full-stack e-commerce platform with a modern storefront and database-backed API.",
    description:
      "Full-stack e-commerce project with a modern storefront, REST API, PostgreSQL, Prisma, and Docker-based development.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    repositoryUrl: "https://github.com/EllaUktolseja/GY-O-REAL-E-Commerce",
    liveUrl: "",
    featured: true,
    sortOrder: 2,
  },
  {
    title: "FoodFoundry",
    slug: "foodfoundry",
    status: "ongoing",
    shortDescription: "Community-focused cookie showcase and feedback platform.",
    description:
      "Community-focused cookie showcase and feedback platform designed around real-world product validation.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    repositoryUrl: "https://github.com/EllaUktolseja/FoodFoundry",
    liveUrl: "",
    featured: true,
    sortOrder: 3,
  },
  {
    title: "Meatloop",
    slug: "meatloop",
    status: "completed",
    shortDescription: "Food-waste marketplace prototype for Indonesian Gen Z users.",
    description:
      "Food-waste marketplace prototype designed for Indonesian Gen Z users with a focused mobile-first interface.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    repositoryUrl: "",
    liveUrl: "",
    featured: false,
    sortOrder: 4,
  },
  {
    title: "Supply Chain Monitor",
    slug: "supply-chain-monitor",
    status: "planning",
    shortDescription: "Monitoring-oriented project exploring operational visibility and dashboards.",
    description:
      "Monitoring-oriented software project exploring dashboards, service workflows, and operational visibility.",
    technologies: ["React", "TypeScript", "Node.js"],
    repositoryUrl: "",
    liveUrl: "",
    featured: false,
    sortOrder: 5,
  },
];

export const getProfile = () => Promise.resolve(profile);

export const getExperiences = () => Promise.resolve(experiences);

export const getEducations = () => Promise.resolve(educations);

export const getSkills = () => Promise.resolve(skills);

export const getProjects = () =>
  Promise.resolve([...projects].sort((a, b) => a.sortOrder - b.sortOrder));

export const getProjectBySlug = (slug: string) => {
  const project = projects.find((item) => item.slug === slug);
  return project
    ? Promise.resolve(project)
    : Promise.reject(new Error("Project not found."));
};
