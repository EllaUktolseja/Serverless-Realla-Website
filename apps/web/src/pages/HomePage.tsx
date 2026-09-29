import { useEffect, useState } from "react";

import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Footer from "@/sections/Footer";
import Reveal from "@/components/Reveal";
import { getProjects, getSkills, getExperiences, getEducations } from "@/data/portfolio";
import type { Education, Experience, Project, Skill } from "@/types/portfolio";

const overviewLinks = [
  { href: "/experience", number: "01", label: "Experience & Education", description: "The background behind the work." },
  { href: "/tech-stack", number: "02", label: "Tech Stack", description: "Tools and technologies I work with." },
  { href: "/projects", number: "03", label: "Projects", description: "A closer look at what I’ve built." },
  { href: "/contact", number: "04", label: "Contact", description: "Opportunities, questions, or a hello." },
];

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    void Promise.all([getProjects(), getSkills(), getExperiences(), getEducations()])
      .then(([projectData, skillData, experienceData, educationData]) => {
        setProjects(projectData);
        setSkills(skillData);
        setExperiences(experienceData);
        setEducation(educationData);
      })
      .catch(() => undefined);
  }, []);

  const currentProject = projects[active] ?? projects[0];

  return (
    <>
      <Hero />
      <section className="relative overflow-hidden border-b border-foreground/10 bg-foreground text-background">
        <div className="pointer-events-none absolute -right-28 top-0 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute left-[12%] bottom-[-5rem] size-56 rounded-full border border-primary/15" />
        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
              {[
                [String(projects.length).padStart(2, "0"), "Projects", "Selected & in progress"],
                [String(skills.length).padStart(2, "0"), "Tools", "Current toolkit"],
                [String(experiences.length).padStart(2, "0"), "Roles", "Hands-on experience"],
                [String(education.length).padStart(2, "0"), "Degree", "Academic foundation"],
              ].map(([number, title, description]) => (
                <div key={title} className="px-4 py-4 first:pl-0 last:pr-0 sm:px-7">
                  <p className="text-2xl font-black tracking-tight text-primary sm:text-3xl">{number}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white">{title}</p>
                  <p className="mt-1 text-[10px] leading-5 text-white/45 sm:text-xs">{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <About />

      <section className="relative overflow-hidden border-b border-white/10 bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,oklch(0.52_0.25_293_/_0.22),transparent_28rem)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Selected work / 01</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">A closer look at what I build.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <a href="/projects" className="text-sm font-bold text-white/60 transition hover:text-primary">View all projects ↗</a>
            </Reveal>
          </div>

          {currentProject ? (
            <Reveal delay={140} className="mt-10">
              <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-80 overflow-hidden bg-black p-7 sm:p-9">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,oklch(0.57_0.25_293_/_0.72),transparent_34%),linear-gradient(145deg,oklch(0.17_0.035_286),oklch(0.06_0.02_286))]" />
                  <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] size-48 rounded-full border border-white/10" />
                  <div className="relative flex h-full min-h-64 flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Project {String(active + 1).padStart(2, "0")}</span>
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-primary">{currentProject.status}</span>
                    </div>
                    <div>
                      <p className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl">{currentProject.title}</p>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">{currentProject.shortDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-10">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Case study preview</p>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-white">{currentProject.title}</h3>
                    </div>
                    <span className="font-mono text-[10px] text-white/35">{String(active + 1).padStart(2, "0")} / 05</span>
                  </div>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">{currentProject.description || currentProject.shortDescription}</p>

                  {currentProject.status === "ongoing" && typeof currentProject.progress === "number" && (
                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-[10px] font-black uppercase tracking-wider text-white/45"><span>Delivery snapshot</span><span>{currentProject.progress}%</span></div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-primary shadow-[0_0_14px_oklch(0.55_0.25_293_/_0.7)] transition-all duration-700" style={{ width: currentProject.progress + "%" }} />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {currentProject.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-white/55">{technology}</span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <a href={`/projects/${encodeURIComponent(currentProject.slug)}`} className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5">View case study ↗</a>
                    <div className="flex gap-2">
                      <button type="button" aria-label="Previous project" disabled={projects.length < 2} onClick={() => setActive((value) => (value - 1 + projects.length) % projects.length)} className="grid size-9 place-items-center rounded-full border border-white/10 text-sm text-white/70 transition hover:border-primary/30 hover:text-primary disabled:opacity-40">←</button>
                      <button type="button" aria-label="Next project" disabled={projects.length < 2} onClick={() => setActive((value) => (value + 1) % projects.length)} className="grid size-9 place-items-center rounded-full border border-white/10 text-sm text-white/70 transition hover:border-primary/30 hover:text-primary disabled:opacity-40">→</button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-white/50">Projects will appear here once the portfolio data is available.</div>
          )}
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Navigate / 02</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Keep exploring.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">The portfolio is intentionally split into focused views so each part of the story is easy to scan.</p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {overviewLinks.map((item, index) => (
              <Reveal key={item.href} delay={index * 70}>
                <a href={item.href} className="group relative block overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
                  <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/8 blur-2xl transition duration-500 group-hover:bg-primary/15" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] font-bold text-primary">{item.number}</span>
                    <span className="text-muted-foreground transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary">↗</span>
                  </div>
                  <h3 className="relative mt-10 text-xl font-black tracking-tight">{item.label}</h3>
                  <p className="relative mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{item.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border/70 bg-[radial-gradient(circle_at_50%_0%,oklch(0.82_0.14_293_/_0.16),transparent_28rem),linear-gradient(180deg,oklch(0.965_0.01_286),oklch(0.93_0.018_286))]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <Reveal>
            <div className="overflow-hidden rounded-[2.25rem] bg-foreground p-8 text-background shadow-2xl shadow-foreground/10 sm:p-12">
              <div className="pointer-events-none absolute" />
              <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Next chapter / 03</p>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-5xl">Let’s build something worth remembering.</h2>
                  <p className="mt-5 max-w-xl leading-7 text-white/55">Open to internship opportunities, collaborations, and conversations about software, ideas, and the work behind them.</p>
                </div>
                <a href="/contact" className="inline-flex w-fit rounded-full bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:-translate-y-1 hover:shadow-xl">Start a conversation ↗</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
