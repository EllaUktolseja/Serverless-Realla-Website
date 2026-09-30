import type {
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/portfolio";

const profile: Profile = {
  name: "Gabriella Uktolseja",
  headline: "Undergraduate Software Engineer",
  bio: "Computer science student building full-stack web applications with TypeScript, React, Node.js, and modern backend tooling. I enjoy learning by turning ideas into products.",
  email: "agatha.uktolseja@gmail.com",
  location: "Bekasi, Indonesia",
  imageUrl: "/images/profilePict.jpg",
  linkedinUrl: "https://www.linkedin.com/in/ellauktolseja/",
  githubUrl: "https://github.com/EllaUktolseja",
  whatsappUrl: "https://wa.me/6285710304280",
};

const experiences: Experience[] = [
  {
    company: "BINUS University",
    position: "Part-Time Laboratory Assistant Bekasi",
    employmentType: "Part Time",
    location: "Bekasi, Indonesia",
    startDate: "2025-09-09",
    endDate: "2026-09-09",
    current: false,
    description:
      "Worked on full-stack web features, API integration, database-backed workflows, and developer tooling while learning production engineering practices.",
    technologies: ["Java", "Python", "C"],
  },
  {
    company: "BINUS University",
    position: "Freshman Chaperone",
    employmentType: "Volunteer",
    location: "Bekasi, Indonesia",
    startDate: "2025-06-13",
    endDate: "2025-07-03",
    current: false,
    description:
      "Built and iterated on portfolio, e-commerce, and community product prototypes with a focus on clean architecture and practical user flows.",
    technologies: [],
  },
];

const educations: Education[] = [
  {
    institution: "BINUS University",
    degree: "Sarjana Komputer (S.Kom)",
    field: "Computer Science",
    startDate: "2023-09-08",
    endDate: "2028-08-08",
    description:
      "Studying software engineering, databases, algorithms, distributed systems, and web application development.",
  },
];

const skills: Skill[] = [
  { name: "C", category: "Languages", level: "Working", yearsOfExperience: 3, sortOrder: 1 },
  { name: "Java", category: "Languages", level: "Learning", yearsOfExperience: 1, sortOrder: 2 },
  { name: "JavaScript", category: "Languages", level: "Learning", yearsOfExperience: 1, sortOrder: 3 },
  { name: "Python", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 4 },
  { name: "TypeScript", category: "Languages", level: "Learning", yearsOfExperience: 1, sortOrder: 5 },
  { name: "HTML", category: "Frontend", level: "Working", yearsOfExperience: 1, sortOrder: 6 },
  { name: "React", category: "Frontend", level: "Learning", yearsOfExperience: 1, sortOrder: 7 },
  { name: "Next.js", category: "Frontend", level: "Learning", yearsOfExperience: 1, sortOrder: 8 },
  { name: "CSS", category: "Frontend", level: "Working", yearsOfExperience: 1, sortOrder: 9 },
  { name: "Tailwind CSS", category: "Frontend", level: "Learning", yearsOfExperience: 1, sortOrder: 10 },
  { name: "Node.js", category: "Backend", level: "Learning", yearsOfExperience: 1, sortOrder: 11 },
  { name: "Express", category: "Backend", level: "Learning", yearsOfExperience: 1, sortOrder: 12 },
  { name: "NestJS", category: "Backend", level: "Learning", yearsOfExperience: 1, sortOrder: 13 },
  { name: "MongoDB", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 14 },
  { name: "PostgreSQL", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 15 },
  { name: "Prisma", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 16 },
  { name: "Docker", category: "Tools", level: "Learning", yearsOfExperience: 1, sortOrder: 17 },
  { name: "Git & GitHub", category: "Tools", level: "Working", yearsOfExperience: 2, sortOrder: 18 },
];


const projects: Project[] = [
  {
    title: "Realla Web",
    slug: "realla-web",
    status: "completed",
    shortDescription:
      "Production-oriented full-stack personal portfolio platform for professional identity, projects, experience, and direct connections.",
    description:
      "Production-oriented full-stack personal portfolio platform built with React, TypeScript, Vite, Tailwind CSS, Express, MongoDB, and Docker. The platform provides dedicated sections for experience, education, technical skills, projects, project case studies, and direct contact. Portfolio content is served through a REST API, while contact submissions are persisted in MongoDB and delivered through Gmail SMTP.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Docker",
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    liveUrl: "",
    featured: true,
    sortOrder: 1,
  },

  {
    title: "GY-O-REAL E-Commerce",
    slug: "gy-o-real-e-commerce",
    status: "ongoing",
    shortDescription:
      "Full-stack e-commerce platform with a scalable monorepo architecture, database-backed API, and modern storefront.",
    description:
      "Full-stack e-commerce platform being developed as a scalable monorepo with a Next.js storefront and NestJS backend. The architecture separates frontend, backend, shared UI primitives, shared TypeScript contracts, and project configuration. The planned platform includes product management, inventory, authentication, orders, checkout, Stripe payments, automated testing, CI/CD, and production deployment using PostgreSQL and Prisma.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Stripe",
    ],
    progress: 55,
    currentFocus: [
      "Product and category API foundations are working",
      "Web storefront integration is being connected to the backend",
      "Next up: auth, cart, orders, and checkout",
    ],
    milestones: [
      { title: "Monorepo foundation", description: "Workspace structure, app boundaries, shared packages, and project configuration.", completed: true },
      { title: "NestJS API foundation", description: "Application bootstrap, validation, CORS, API conventions, and developer tooling.", completed: true },
      { title: "PostgreSQL + Prisma", description: "Database connection, Prisma service, schema migration, and data-layer foundation.", completed: true },
      { title: "Catalog CRUD", description: "Category and product CRUD flows are in place for the first commerce domain.", completed: true },
      { title: "Commerce flows", description: "Authentication, cart, orders, inventory, checkout, and Stripe integration remain.", completed: false },
      { title: "Production hardening", description: "Automated testing, CI/CD, observability, and production deployment.", completed: false },
    ],
    repositoryUrl:
      "https://github.com/EllaUktolseja/GY-O-REAL-E-Commerce",
    liveUrl: "",
    featured: true,
    sortOrder: 2,
  },

  {
    title: "FoodFoundry",
    slug: "foodfoundry",
    status: "ongoing",
    shortDescription:
      "Community-focused cookie showcase and feedback platform designed for real-world product validation.",
    description:
      "Community-focused web platform designed to introduce cookie products to a community and collect structured real-world feedback. The planned system combines a modern web interface with a backend API and database layer to support product presentation, feedback collection, and market validation workflows.",
    technologies: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    progress: 10,
    currentFocus: [
      "Initial product direction and community feedback workflow",
      "Frontend and backend architecture are being shaped",
      "Next up: product presentation and feedback collection flow",
    ],
    milestones: [
      { title: "Repository setup", description: "Initial repository and project structure are established.", completed: true },
      { title: "Product experience", description: "Shape the cookie showcase, product messaging, and visitor journey.", completed: false },
      { title: "Feedback workflow", description: "Design the structured feedback experience around real community interactions.", completed: false },
      { title: "API + database", description: "Implement the backend and persistence layer for feedback and product data.", completed: false },
      { title: "Deployment", description: "Validate the end-to-end flow and prepare the platform for real usage.", completed: false },
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/FoodFoundry",
    liveUrl: "",
    featured: true,
    sortOrder: 3,
  },

  {
    title: "Food Waste",
    slug: "food-waste",
    status: "completed",
    shortDescription:
      "Food-waste marketplace prototype designed to connect users with discounted surplus food.",
    description:
      "Food-waste marketplace prototype focused on reducing food waste by creating a digital marketplace for surplus food. The concept targets Indonesian Gen Z users through a mobile-first experience centered around product discovery, affordable food access, and sustainable consumption.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "Go",
    ],
    repositoryUrl: "",
    liveUrl: "",
    featured: false,
    sortOrder: 4,
  },

  {
    title: "Veritas",
    slug: "veritas",
    status: "completed",
    shortDescription:
      "Machine learning platform for detecting potentially misleading and fake news content.",
    description:
      "Web-based fake news detection platform using NLP and machine learning models to analyze digital news content. The system supports manual article analysis and URL-based content extraction, with a machine learning pipeline built around BERT and Logistic Regression. The project also includes preprocessing, deduplication, model training, prediction workflows, and Docker-based deployment.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Flask",
      "BERT",
      "Logistic Regression",
      "BeautifulSoup",
      "Docker",
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/Veritas",
    liveUrl: "",
    featured: false,
    sortOrder: 5,
  },

  {
    title: "Affili.io",
    slug: "affilio",
    status: "completed",
    shortDescription:
      "Market intelligence platform for affiliate marketers to monitor trends and evaluate product opportunities.",
    description:
      "Market intelligence platform designed for affiliate marketers to monitor product trends, evaluate market opportunities, and support data-driven promotional decisions. The system concept includes market overview, product value scanning, trend alerts, financial simulation for ROI estimation, and social media hashtag tracking.",
    technologies: [
      "Next.js",
      "React",
      "Alibaba/AliExpress API",
      "Vercel",
      "Paylabs",
    ],
    repositoryUrl:
      "https://github.com/EllaUktolseja/Affili.io-Alibaba",
    liveUrl: "",
    featured: false,
    sortOrder: 6,
  },

  {
    title: "JobSeek",
    slug: "jobseek",
    status: "completed",
    shortDescription:
      "Machine learning job recommendation application for matching users with relevant job opportunities.",
    description:
      "Interactive machine learning application designed to recommend relevant job opportunities based on available job data. The project uses a trained recommendation model and a Streamlit interface, with support for externally hosted model and dataset files for deployment.",
    technologies: [
      "Python",
      "Streamlit",
      "Machine Learning",
      "Pandas",
      "Scikit-learn",
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/AIJobSeeker",
    liveUrl: "",
    featured: false,
    sortOrder: 7,
  },
  {
    title: "Gradia",
    slug: "gradia",
    status: "planning",
    shortDescription:
      "AI-powered grading assistant designed to streamline assessment and academic evaluation workflows.",
    description:
      "Planned AI-powered grading platform designed to assist educators and academic users with assessment workflows. The future system is intended to support structured submission handling, automated evaluation assistance, grading insights, and centralized assessment management.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Gemini API",
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/Gradia",
    liveUrl: "",
    featured: false,
    sortOrder: 8,
  },

  {
    title: "Rewoven",
    slug: "rewoven",
    status: "planning",
    shortDescription:
      "Planned digital platform exploring technology-driven workflows around reuse, transformation, and sustainable products.",
    description:
      "Planned software project exploring how digital technology can support reuse and transformation workflows around products and materials. The future platform is intended to evolve into a structured application with a dedicated user experience, backend services, and data-driven workflows.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/Rewoven",
    liveUrl: "",
    featured: false,
    sortOrder: 9,
  },

  {
    title: "ChainPulse",
    slug: "chainpulse",
    status: "planning",
    shortDescription:
      "Planned monitoring platform focused on operational visibility, service health, and real-time system insights.",
    description:
      "Planned monitoring-oriented software platform designed to provide centralized operational visibility across services and application workflows. The future system is intended to evolve around dashboards, service monitoring, system health indicators, event tracking, and operational insights.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
    ],
    repositoryUrl: "https://github.com/EllaUktolseja/Chainpulse",
    liveUrl: "",
    featured: false,
    sortOrder: 10,
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
