import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import About from "@/sections/About";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
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

  return (
    <>
      <Hero />

      <section className="space-section">
        <div className="space-container px-5 py-8 sm:px-7 lg:px-10">
          <Reveal>
            <div className="cosmic-panel rounded-[1.8rem] p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:px-2">
                <div className="flex items-center gap-2.5">
                  <span className="signal-dot" />
                  <span className="hud-label text-[#3f3549]/72">Portfolio snapshot</span>
                </div>
                <span className="hud-number text-[10px] font-bold text-[#4a4253]/58">Current overview</span>
              </div>

              <div className="mt-4 grid grid-cols-2 divide-x divide-[#302140]/10 sm:grid-cols-4">
                {[
                  [String(projects.length).padStart(2, "0"), "Projects", "Selected & active"],
                  [String(skills.length).padStart(2, "0"), "Tools", "Current toolkit"],
                  [String(experiences.length).padStart(2, "0"), "Roles", "Hands-on experience"],
                  [String(education.length).padStart(2, "0"), "Degree", "Academic foundation"],
                ].map(([number, title, description]) => (
                  <div key={title} className="px-3 py-4 first:pl-1 last:pr-1 sm:px-6">
                    <p className="hud-number text-2xl font-black text-primary sm:text-3xl">{number}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#201924]/84">{title}</p>
                    <p className="mt-1 text-[10px] leading-5 text-[#564d60]/78 sm:text-xs">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <About />

      <section className="space-section">
        <div className="space-container px-5 py-8 sm:px-7 lg:px-10">
          <Reveal>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["01", "Currently building", "GY-O-REAL E-Commerce"],
                ["02", "Exploring", "Real-world product validation with FoodFoundry"],
                ["03", "Open to", "Internships, collaboration, and meaningful work"],
              ].map(([number, title, text]) => (
                <div key={number} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/25">
                  <div className="flex items-center justify-between gap-3">
                    <span className="hud-number text-[9px] font-bold text-primary">{number}</span>
                    <span className="signal-dot" />
                  </div>
                  <p className="mt-4 hud-label text-[#4a4253]/72">{title}</p>
                  <p className="mt-1.5 text-sm font-bold text-[#15121b]">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="space-section mission-section">
        <div className="nebula right-[-10rem] top-[-6rem] size-[32rem]" />
        <div className="space-container px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <div>
                <div className="hud-label flex items-center gap-3 text-primary"><span className="signal-dot" />Selected work</div>
                <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.055em] text-white sm:text-5xl">
                  A closer look at what I build.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <a href="/projects" className="text-sm font-bold text-white/62 transition hover:text-primary">
                View project archive ↗
              </a>
            </Reveal>
          </div>

          {currentProject ? (
            <Reveal delay={140} className="mt-8">
              <div
                className="cosmic-panel overflow-hidden rounded-[2.2rem]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[27rem] overflow-hidden bg-black sm:min-h-[33rem]">
                    <div key={currentProject.slug} className="project-slide absolute inset-0">
                      {currentProject.imageUrl ? (
                        <img src={currentProject.imageUrl} alt={currentProject.title} className="size-full object-cover" loading="lazy" />
                      ) : (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(124,58,237,0.62),transparent_28%),linear-gradient(145deg,#130c1e,#04030a_72%)]" />
                          <div className="absolute left-[10%] top-[16%] h-px w-2/5 bg-gradient-to-r from-primary/70 to-transparent" />
                          <div className="absolute right-[-5rem] bottom-[-5rem] size-72 rounded-full border border-white/10" />
                          <div className="absolute right-[-1rem] bottom-[-1rem] size-52 rounded-full border border-primary/20" />
                          <div className="absolute right-[16%] top-[16%] size-40 rounded-full bg-primary/8 blur-3xl" />
                          <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">
                            <div className="flex items-center justify-between">
                              <span className="hud-label text-white/46">Project / {String(active + 1).padStart(2, "0")}</span>
                              <span className="rounded-full border border-primary/22 bg-primary/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-primary">{currentProject.status}</span>
                            </div>
                            <div>
                              <p className="max-w-xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white sm:text-6xl">{currentProject.title}</p>
                              <p className="mt-4 max-w-md text-sm leading-6 text-white/62">{currentProject.shortDescription}</p>
                            </div>
                            <div className="hud-label text-white/38">Project preview</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-x-6 bottom-5 flex items-center gap-2">
                      {showcaseProjects.map((project, index) => (
                        <button
                          key={project.slug}
                          type="button"
                          aria-label={"Show " + project.title}
                          onClick={() => setActive(index)}
                          className={index === active
                            ? "h-1.5 w-12 rounded-full bg-primary shadow-[0_0_12px_rgba(124,58,237,0.6)]"
                            : "h-1.5 w-2.5 rounded-full bg-white/30 transition hover:bg-white/60"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-11">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="hud-label text-primary">Project overview</p>
                          <h3 key={currentProject.slug} className="project-copy-slide mt-2 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">{currentProject.title}</h3>
                        </div>
                        <span className="hud-number text-[10px] text-white/40">{String(active + 1).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")}</span>
                      </div>

                      <p key={currentProject.slug} className="project-copy-slide mt-5 max-w-xl text-sm leading-7 text-white/64">
                        {currentProject.description || currentProject.shortDescription}
                      </p>

                      {currentProject.status === "ongoing" && typeof currentProject.progress === "number" && (
                        <div className="mt-7">
                          <div className="mb-2 flex justify-between hud-label text-white/48">
                            <span>Build progress</span><span>{currentProject.progress}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/12">
                            <div className="h-full rounded-full bg-primary shadow-[0_0_16px_rgba(124,58,237,0.6)] transition-all duration-700" style={{ width: currentProject.progress + "%" }} />
                          </div>
                        </div>
                      )}

                      <div className="mt-7 flex flex-wrap gap-2">
                        {currentProject.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold text-white/68">{technology}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
                      <a href={"/projects/" + encodeURIComponent(currentProject.slug)} className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5">
                        Open project ↗
                      </a>
                      <div className="flex gap-2">
                        <button type="button" aria-label="Previous project" disabled={showcaseProjects.length < 2} onClick={() => setActive((value) => (value - 1 + showcaseProjects.length) % showcaseProjects.length)} className="grid size-9 place-items-center rounded-full border border-white/12 text-sm text-white/70 transition hover:border-primary/30 hover:text-primary disabled:opacity-30">←</button>
                        <button type="button" aria-label="Next project" disabled={showcaseProjects.length < 2} onClick={() => setActive((value) => (value + 1) % showcaseProjects.length)} className="grid size-9 place-items-center rounded-full border border-white/12 text-sm text-white/70 transition hover:border-primary/30 hover:text-primary disabled:opacity-30">→</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 text-white/58">Projects will appear here once the portfolio data is available.</div>
          )}
        </div>
      </section>

      <section className="space-section mission-section">
        <div className="space-container px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
          <Reveal>
            <div className="cosmic-panel overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_82%_15%,rgba(124,58,237,0.16),transparent_28rem),linear-gradient(145deg,#10081a,#05030a)] p-7 sm:p-10 lg:p-12">
              <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="hud-label text-primary">Get in touch</p>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.055em] text-white sm:text-5xl">Let’s build something worth remembering.</h2>
                  <p className="mt-5 max-w-xl leading-7 text-white/64">Open to internship opportunities, collaborations, and conversations about software, ideas, and the work behind them.</p>
                </div>
                <a href="/contact" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5">Contact me ↗</a>
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
