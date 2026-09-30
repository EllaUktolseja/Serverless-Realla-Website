import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import Footer from "@/sections/Footer";
import { getProjects } from "@/data/portfolio";
import type { Project, ProjectStatus } from "@/types/portfolio";

const statusMeta: Record<ProjectStatus, { label: string; className: string }> = {
  completed: { label: "Completed", className: "border-[#3b3344]/12 bg-[#f2eff6] text-[#433a4b]" },
  ongoing: { label: "In development", className: "border-primary/22 bg-primary/[0.08] text-primary" },
  planning: { label: "Planning", className: "border-[#3b3344]/12 bg-white text-[#6a6272]" },
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.imageUrl) {
    return <img src={project.imageUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />;
  }

  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(124,58,237,0.62),transparent_28%),linear-gradient(145deg,#160d21,#05030a_78%)]">
      <div className="absolute -right-14 -bottom-16 size-64 rounded-full border border-white/10" />
      <div className="absolute right-4 bottom-[-1.5rem] size-44 rounded-full border border-primary/22" />
      <div className="absolute left-8 top-10 h-px w-2/5 bg-gradient-to-r from-primary/70 to-transparent" />
      <div className="absolute inset-5 rounded-[1.5rem] border border-white/10" />
      <div className="absolute left-10 bottom-10 size-24 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute left-7 bottom-7">
        <p className="hud-label text-white/52">Project visual</p>
      </div>
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
      <section className="space-section min-h-screen">
        <div className="nebula right-[-10rem] top-24 size-[30rem]" />
        <div className="space-container px-5 py-14 sm:px-7 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <Reveal>
              <div>
                <div className="hud-label flex items-center gap-3 text-primary">
                  <span className="signal-dot" />
                  Projects / selected work
                </div>
                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.075em] text-[#15121b] sm:text-6xl lg:text-8xl">
                  Work built to solve something.
                </h1>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="cosmic-panel rounded-[1.6rem] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="hud-label text-primary">Project index</p>
                  <span className="hud-number text-[10px] font-bold text-[#4a4253]/58">{String(projects.length).padStart(2, "0")} total</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#3f3747]/80">
                  A mix of completed work, active builds, and ideas still taking shape — all part of the same learning journey.
                </p>
              </div>
            </Reveal>
          </div>

          {error ? (
            <p className="mt-12 text-sm text-red-600">{error}</p>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const status = statusMeta[project.status] ?? statusMeta.planning;

                return (
                  <Reveal key={project.slug} delay={Math.min(index * 45, 220)}>
                    <a
                      href={"/projects/" + encodeURIComponent(project.slug)}
                      className="group block overflow-hidden rounded-[2rem] border border-[#302140]/10 bg-white shadow-[0_18px_50px_rgba(45,27,65,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_24px_60px_rgba(76,29,149,0.12)]"
                    >
                      <div className="relative min-h-72 overflow-hidden bg-[#09070e] sm:min-h-80">
                        <ProjectVisual project={project} />

                        <div className="relative flex min-h-72 flex-col justify-between p-6 sm:min-h-80">
                          <div className="flex items-center justify-between gap-3">
                            <span className="hud-number rounded-full bg-black/28 px-2.5 py-1 text-[10px] font-bold text-white/68 backdrop-blur">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className={"rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] " + status.className}>
                              {status.label}
                            </span>
                          </div>

                          <div>
                            <p className="hud-label text-white/55">{project.slug}</p>
                            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">{project.title}</h2>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">{project.shortDescription}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {project.status === "ongoing" && typeof project.progress === "number" && (
                          <div className="mb-5">
                            <div className="mb-2 flex justify-between hud-label text-[#4a4253]/72">
                              <span>Build progress</span><span>{project.progress}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-[#e6e1eb]">
                              <div className="h-full rounded-full bg-primary" style={{ width: project.progress + "%" }} />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((technology) => (
                            <span key={technology} className="rounded-full border border-[#302140]/10 bg-[#f4f1f8] px-3 py-1.5 text-[10px] font-bold text-[#413747]/75">
                              {technology}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-[#302140]/10 pt-5 text-xs font-black">
                          <span className="text-[#15121b]">View project</span>
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
            <p className="mt-10 text-sm text-[#4a4253]/70">No projects available yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProjectsPage;
