import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/data/portfolio";
import type { Project, ProjectStatus } from "@/types/portfolio";

const statusMeta: Record<ProjectStatus, { label: string; className: string }> = {
  completed: { label: "Completed", className: "border-white/10 bg-white/[0.04] text-white/70" },
  ongoing: { label: "In development", className: "border-primary/22 bg-primary/10 text-primary" },
  planning: { label: "Planning", className: "border-white/10 bg-black/30 text-white/38" },
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.imageUrl) {
    return <img src={project.imageUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />;
  }

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,oklch(0.62_0.30_300_/_0.70),transparent_32%),linear-gradient(145deg,#140b1f,#05030a_75%)]" />
      <div className="absolute -right-14 -bottom-16 size-64 rounded-full border border-white/8" />
      <div className="absolute right-3 bottom-[-1.5rem] size-44 rounded-full border border-primary/20" />
      <div className="absolute left-8 top-10 h-px w-2/5 bg-gradient-to-r from-primary/70 to-transparent" />
      <div className="absolute inset-5 rounded-[1.6rem] border border-white/8" />
      <div className="absolute left-10 bottom-10 size-24 rounded-full bg-primary/10 blur-2xl" />
    </div>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getProjects()
      .then((items) => setProjects([...items].sort((a, b) => a.sortOrder - b.sortOrder)))
      .catch(() => setError("Unable to load projects."));
  }, []);

  return (
    <>
      <section className="space-section mission-section min-h-screen">
        <div className="nebula pointer-events-none right-[-12rem] top-20 size-[32rem]" />
        <div className="space-container px-5 py-14 sm:px-7 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <Reveal>
              <div>
                <div className="hud-label flex items-center gap-3 text-primary"><span className="signal-dot" />Project archive / 01</div>
                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.075em] text-white sm:text-6xl lg:text-8xl">
                  Projects with a reason to exist.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="cosmic-panel rounded-[1.6rem] p-5 sm:p-6">
                <p className="hud-label text-primary">Archive note</p>
                <p className="mt-3 text-sm leading-7 text-white/44">
                  Completed work, active builds, and ideas still taking shape — each project is a snapshot of how I approach problems and build things.
                </p>
              </div>
            </Reveal>
          </div>

          {error ? (
            <p className="mt-12 text-sm text-destructive">{error}</p>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const status = statusMeta[project.status] ?? statusMeta.planning;

                return (
                  <Reveal key={project.slug} delay={Math.min(index * 50, 250)}>
                    <a
                      href={"/projects/" + encodeURIComponent(project.slug)}
                      className="group block overflow-hidden rounded-[2rem] border border-white/8 bg-[#08060d]/88 shadow-2xl shadow-black/25 transition duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-primary/10"
                    >
                      <div className="relative min-h-80 overflow-hidden">
                        <ProjectVisual project={project} />
                        <div className="scanline relative flex min-h-80 flex-col justify-between p-6">
                          <div className="flex items-center justify-between gap-3">
                            <span className="hud-number text-[10px] font-bold text-white/35">{String(index + 1).padStart(2, "0")} / ARCHIVE</span>
                            <span className={"rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] " + status.className}>{status.label}</span>
                          </div>
                          <div>
                            <p className="hud-label text-white/28">{project.slug}</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">{project.title}</h2>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">{project.shortDescription}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/8 p-6">
                        {project.status === "ongoing" && typeof project.progress === "number" && (
                          <div className="mb-5">
                            <div className="mb-2 flex justify-between hud-label text-white/28">
                              <span>Build progress</span><span>{project.progress}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                              <div className="h-full rounded-full bg-primary shadow-[0_0_12px_oklch(0.69_0.28_300_/_0.6)]" style={{ width: project.progress + "%" }} />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((technology) => (
                            <span key={technology} className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[10px] font-bold text-white/38">{technology}</span>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5 text-xs font-black">
                          <span className="text-white/72">Open case file</span>
                          <span className="text-primary transition-transform group-hover:translate-x-1">Details →</span>
                        </div>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          )}

          {!error && projects.length === 0 && (
            <p className="mt-10 text-sm text-white/35">No projects available yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProjectsPage;
