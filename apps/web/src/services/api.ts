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

const skills: Skill[] = [\n  { name: "TypeScript", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 1 },\n  { name: "JavaScript", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 2 },\n  { name: "React", category: "Frontend", level: "Working", yearsOfExperience: 2, sortOrder: 3 },\n  { name: "Next.js", category: "Frontend", level: "Learning", yearsOfExperience: 1, sortOrder: 4 },\n  { name: "Tailwind CSS", category: "Frontend", level: "Working", yearsOfExperience: 2, sortOrder: 5 },\n  { name: "Node.js", category: "Backend", level: "Working", yearsOfExperience: 2, sortOrder: 6 },\n  { name: "Express", category: "Backend", level: "Working", yearsOfExperience: 1, sortOrder: 7 },\n  { name: "NestJS", category: "Backend", level: "Learning", yearsOfExperience: 1, sortOrder: 8 },\n  { name: "MongoDB", category: "Databases", level: "Working", yearsOfExperience: 1, sortOrder: 9 },\n  { name: "PostgreSQL", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 10 },\n  { name: "Prisma", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 11 },\n  { name: "Docker", category: "Tools", level: "Working", yearsOfExperience: 1, sortOrder: 12 },\n  { name: "Git & GitHub", category: "Tools", level: "Working", yearsOfExperience: 2, sortOrder: 13 },\n];\n
