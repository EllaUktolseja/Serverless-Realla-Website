import { useEffect, useState } from "react";

import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Footer from "@/sections/Footer";
import Reveal from "@/components/Reveal";
import { getEducations, getExperiences, getProjects, getSkills } from "@/data/portfolio";
import type { Education, Experience, Project, Skill } from "@/types/portfolio";

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

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

  const showcaseProjects = projects.filter((project) => project.featured).slice(0, 5);
  const currentProject = showcaseProjects[active] ?? showcaseProjects[0];

  useEffect(() => {
    if (showcaseProjects.length < 2 || paused) return undefined;

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % showcaseProjects.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [showcaseProjects.length, paused]);

  useEffect(() => {
    if (active >= showcaseProjects.length && showcaseProjects.length > 0) {
      setActive(0);
    }
  }, [active, showcaseProjects.length]);

  return (
    <>
      <Hero />

      <section className="relative overflow-hidden border-b border-white/10 bg-foreground text-background">
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

      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0911] text-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.5_0.24_293_/_0.13),transparent_23rem),radial-gradient(circle_at_82%_70%,oklch(0.45_0.25_320_/_0.10),transparent_24rem)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10">
          <Reveal>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["01", "Currently building", "GY-O-REAL E-Commerce"],
                ["02", "Exploring", "Real-world product validation with FoodFoundry"],
                ["03", "Open to", "Internships, collaboration, and meaningful work"],
              ].map(([number, title, text]) => (
                <div key={number} className="group rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:bg-primary/[0.07]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] font-bold text-primary">{number}</span>
                    <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] transition-transform duration-500 group-hover:scale-150" />
                  </div>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/45">{title}</p>
                  <p className="mt-1 text-sm font-bold text-white">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,oklch(0.55_0.27_293_/_0.23),transparent_30rem)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Selected work / 01</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">A closer look at what I build.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <a href="/projects" className="text-sm font-bold text-white/60 transition hover:text-primary">View all projects ↗</a>
            </Reveal>
          </div>

          {currentProject ? (
            <Reveal delay={140} className="mt-10">
              <div
                className="overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/40"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[25rem] overflow-hidden bg-black sm:min-h-[31rem]">
                    <div key={currentProject.slug} className="project-slide absolute inset-0">
                      {currentProject.imageUrl ? (
                        <img
                          src={currentProject.imageUrl}
                          alt={currentProject.title}
                          className="size-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,oklch(0.58_0.28_293_/_0.70),transparent_31%),linear-gradient(145deg,oklch(0.15_0.03_286),oklch(0.045_0.015_286))]" />
                          <div className="absolute left-[12%] top-[18%] h-px w-2/5 bg-gradient-to-r from-primary/70 to-transparent" />
                          <div className="absolute right-[-5rem] bottom-[-5rem] size-72 rounded-full border border-white/10" />
                          <div className="absolute right-[-1rem] bottom-[-1rem] size-48 rounded-full border border-primary/20" />
                          <div className="absolute inset-6 rounded-[1.8rem] border border-white/10" />
                          <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Featured / {String(active + 1).padStart(2, "0")}</span>
                              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-primary">{currentProject.status}</span>
                            </div>
                            <div>
                              <p className="max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.07em] text-white sm:text-6xl">{currentProject.title}</p>
                              <p className="mt-4 max-w-md text-sm leading-6 text-white/50">{currentProject.shortDescription}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="absolute inset-x-6 bottom-5 flex items-center gap-2">
                      {showcaseProjects.map((project, index) => (
                        <button
                          key={project.slug}
                          type="button"
                          aria-label={`Show ${project.title}`}
                          onClick={() => setActive(index)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-12 bg-primary" : "w-2.5 bg-white/25 hover:bg-white/45"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-11">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Case study preview</p>
                          <h3 key={currentProject.slug} className="project-copy-slide mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{currentProject.title}</h3>
                        </div>
                        <span className="font-mono text-[10px] text-white/30">{String(active + 1).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")}</span>
                      </div>

                      <p key={currentProject.slug} className="project-copy-slide mt-5 max-w-xl text-sm leading-7 text-white/58">
                        {currentProject.description || currentProject.shortDescription}
                      </p>

                      {currentProject.status === "ongoing" && typeof currentProject.progress === "number" && (
                        <div className="mt-7">
                          <div className="mb-2 flex justify-between text-[10px] font-black uppercase tracking-wider text-white/40">
                            <span>Delivery snapshot</span><span>{currentProject.progress}%</span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-primary shadow-[0_0_14px_oklch(0.55_0.25_293_/_0.7)] transition-all duration-700" style={{ width: currentProject.progress + "%" }} />
                          </div>
                        </div>
                      )}

                      <div className="mt-7 flex flex-wrap gap-2">
                        {currentProject.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-white/55">{technology}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
                      <a href={`/projects/${encodeURIComponent(currentProject.slug)}`} className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5">View case study ↗</a>
                      <div className="flex gap-2">
                        <button type="button" aria-label="Previous project" disabled={showcaseProjects.length < 2} onClick={() => setActive((value) => (value - 1 + showcaseProjects.length) % showcaseProjects.length)} className="grid size-9 place-items-center rounded-full border border-white/10 text-sm text-white/70 transition hover:border-primary/30 hover:text-primary disabled:opacity-40">←</button>
                        <button type="button" aria-label="Next project" disabled={showcaseProjects.length < 2} onClick={() => setActive((value) => (value + 1) % showcaseProjects.length)} className="grid size-9 place-items-center rounded-full border border-white/10 text-sm text-white/70 transition hover:border-primary/30 hover:text-primary disabled:opacity-40">→</button>
                      </div>
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

      <section className="relative overflow-hidden border-b border-border/70 bg-[radial-gradient(circle_at_50%_0%,oklch(0.62_0.20_293_/_0.10),transparent_29rem),linear-gradient(180deg,oklch(0.96_0.008_286),oklch(0.925_0.018_286))]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.25rem] bg-black p-8 text-background shadow-2xl shadow-black/20 sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Next chapter / 03</p>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-5xl">Let’s build something worth remembering.</h2>
                  <p className="mt-5 max-w-xl leading-7 text-white/55">Open to internship opportunities, collaborations, and conversations about software, ideas, and the work behind them.</p>
                </div>
                <a href="/contact" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-1 hover:shadow-xl">Start a conversation ↗</a>
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
