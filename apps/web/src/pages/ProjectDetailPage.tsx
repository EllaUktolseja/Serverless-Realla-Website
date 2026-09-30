import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import Footer from "@/sections/Footer";
import { getProjectBySlug } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectDetailPageProps {
  slug: string;
}

const statusMeta = {
  completed: {
    label: "Completed",
    className: "border-[#3b3344]/12 bg-[#f2eff6] text-[#433a4b]",
    description: "The main scope has been delivered and is presented here as completed work.",
  },
  ongoing: {
    label: "In development",
    className: "border-primary/22 bg-primary/[0.08] text-primary",
    description: "The project is actively evolving, so this page reflects its current build stage.",
  },
  planning: {
    label: "Planning",
    className: "border-[#3b3344]/12 bg-white text-[#6a6272]",
    description: "The concept and scope are being shaped before active implementation begins.",
  },
} as const;

function ProjectVisual({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <img
        src={project.imageUrl}
        alt={project.title}
        className="aspect-[16/9] w-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative flex aspect-[16/9] min-h-72 items-end overflow-hidden bg-[radial-gradient(circle_at_78%_20%,rgba(124,58,237,0.62),transparent_30%),linear-gradient(145deg,#160d21,#05030a_80%)] p-7 sm:p-10">
      <div className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute right-8 bottom-0 size-48 rounded-full border border-primary/22" />
      <div className="pointer-events-none absolute left-[10%] top-[18%] h-px w-2/5 bg-gradient-to-r from-primary/70 to-transparent" />
      <div className="pointer-events-none absolute inset-6 rounded-[1.5rem] border border-white/10" />
      <div className="relative max-w-2xl">
        <p className="hud-label text-white/55">Project visual</p>
        <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">{project.title}</p>
      </div>
    </div>
  );
}

function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProject() {
      setLoading(true);
      setError(null);

      try {
        const item = await getProjectBySlug(slug);
        if (active) setProject(item);
      } catch (requestError: unknown) {
        if (active) {
          setProject(null);
          setError(requestError instanceof Error ? requestError.message : "Unable to load project.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProject();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <section className="space-section">
          <div className="space-container px-5 py-16 sm:px-7 lg:px-10 lg:py-20">
            <div className="cosmic-panel animate-pulse rounded-[2rem] p-8">
              <div className="h-3 w-28 rounded-full bg-[#e7e2ec]" />
              <div className="mt-6 h-14 max-w-2xl rounded-2xl bg-[#e7e2ec]" />
              <div className="mt-5 h-5 max-w-xl rounded-full bg-[#e7e2ec]" />
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <section className="space-section min-h-[70vh]">
          <div className="space-container px-5 py-16 sm:px-7 lg:px-10 lg:py-20">
            <a href="/projects" className="text-sm font-semibold text-primary">← Back to projects</a>
            <div className="mt-10 max-w-xl">
              <p className="hud-label text-primary">Navigation error</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#15121b] sm:text-6xl">Project not found</h1>
              <p className="mt-4 leading-7 text-[#4a4253]/78">{error ?? "This project does not exist or is no longer available."}</p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const status = statusMeta[project.status];
  const progress = Math.max(0, Math.min(100, project.progress ?? 0));
  const milestones = project.milestones ?? [];
  const completedMilestones = milestones.filter((milestone) => milestone.completed).length;
  const currentMilestoneIndex = milestones.findIndex((milestone) => !milestone.completed);

  return (
    <>
      <article className="space-section">
        <div className="nebula right-[-10rem] top-10 size-[30rem]" />

        <div className="space-container px-5 py-8 sm:px-7 lg:px-10 lg:py-12">
          <a href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a4253]/70 transition hover:text-primary">
            <span>←</span> Back to projects
          </a>

          <Reveal>
            <header className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
              <div className="cosmic-panel rounded-[2.4rem] p-7 sm:p-9 lg:p-11">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="hud-label text-primary">Project / {String(project.sortOrder).padStart(2, "0")}</p>
                  <span className={"rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] " + status.className}>
                    {status.label}
                  </span>
                </div>

                <div className="mt-7 max-w-4xl">
                  <h1 className="text-4xl font-black leading-[0.94] tracking-[-0.065em] text-[#15121b] sm:text-6xl lg:text-7xl">
                    {project.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-[#3f3747]/82 sm:text-lg sm:leading-8">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow-[0_14px_32px_rgba(124,58,237,0.18)] transition hover:-translate-y-0.5">
                      Live demo ↗
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-[#302140]/12 bg-white px-5 py-2.5 text-sm font-bold text-[#2b2332]/82 transition hover:-translate-y-0.5 hover:border-primary/25 hover:text-[#15121b]">
                      View GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="mission-card rounded-[2.4rem] p-7 sm:p-9">
                <p className="hud-label text-primary">At a glance</p>
                <p className="mt-3 text-sm leading-6 text-white/68">{status.description}</p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="hud-number text-2xl font-black text-white">{project.technologies.length}</p>
                    <p className="mt-1 hud-label text-white/48">Core tools</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="hud-number text-2xl font-black text-white">{milestones.length || "—"}</p>
                    <p className="mt-1 hud-label text-white/48">Milestones</p>
                  </div>
                </div>

                {project.status === "ongoing" && typeof project.progress === "number" && (
                  <div className="mt-7">
                    <div className="flex items-center justify-between">
                      <p className="hud-label text-white/55">Build progress</p>
                      <p className="hud-number text-sm font-black text-primary">{progress}%</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/12">
                      <div className="h-full rounded-full bg-primary" style={{ width: progress + "%" }} />
                    </div>
                  </div>
                )}
              </div>
            </header>
          </Reveal>

          <Reveal delay={80}>
            <div className="cosmic-panel mt-5 overflow-hidden rounded-[2.4rem] p-2">
              <ProjectVisual project={project} />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-[#302140]/10 pt-10 lg:grid-cols-[0.42fr_1.58fr]">
            <Reveal>
              <div>
                <p className="hud-label text-primary">01 / Overview</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#15121b]">What this project is about.</h2>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <p className="max-w-3xl text-base leading-8 text-[#3f3747]/84 sm:text-lg">{project.description}</p>
            </Reveal>
          </div>

          {project.status === "ongoing" && project.currentFocus && project.currentFocus.length > 0 && (
            <Reveal className="mt-12 rounded-[2rem] border border-primary/14 bg-primary/[0.045] p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl">
                  <p className="hud-label text-primary">02 / Current focus</p>
                  <h2 className="mt-2 text-2xl font-black text-[#15121b] sm:text-3xl">What I’m working on now.</h2>
                  <p className="mt-3 text-sm leading-6 text-[#4a4253]/78">The current build is anchored to concrete development work rather than a generic progress label.</p>
                </div>

                <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                  {project.currentFocus.map((item, index) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-[#302140]/10 bg-white/75 p-4">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-black text-primary">{index + 1}</span>
                      <span className="text-sm font-semibold leading-6 text-[#2c2533]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {milestones.length > 0 && (
            <div className="mt-14 grid gap-10 border-t border-[#302140]/10 pt-10 lg:grid-cols-[0.42fr_1.58fr]">
              <Reveal>
                <div>
                  <p className="hud-label text-primary">{project.status === "ongoing" ? "03" : "02"} / Milestones</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[#15121b]">How the work moves forward.</h2>
                  <p className="mt-3 text-sm leading-6 text-[#4a4253]/75">{completedMilestones} of {milestones.length} completed.</p>
                </div>
              </Reveal>

              <div className="space-y-3">
                {milestones.map((milestone, index) => {
                  const isCurrent = index === currentMilestoneIndex;

                  return (
                    <Reveal key={milestone.title} delay={Math.min(index * 40, 180)}>
                      <div
                        className={[
                          "rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-primary/20",
                          milestone.completed
                            ? "border-primary/14 bg-primary/[0.035]"
                            : isCurrent
                              ? "border-primary/22 bg-white"
                              : "border-[#302140]/10 bg-white/70",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={[
                              "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-black",
                              milestone.completed
                                ? "bg-primary text-white"
                                : isCurrent
                                  ? "border border-primary/25 bg-primary/10 text-primary"
                                  : "bg-[#eeebf2] text-[#61596a]",
                            ].join(" ")}
                          >
                            {milestone.completed ? "✓" : index + 1}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-black text-[#15121b]">{milestone.title}</h3>
                              {isCurrent && (
                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-primary">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="mt-1.5 text-sm leading-6 text-[#4a4253]/78">{milestone.description}</p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}

          {project.status === "planning" && project.goal && (
            <div className="mt-14 grid gap-10 border-t border-[#302140]/10 pt-10 lg:grid-cols-[0.42fr_1.58fr]">
              <Reveal>
                <div>
                  <p className="hud-label text-primary">02 / Goal</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[#15121b]">What I want to achieve.</h2>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <p className="max-w-3xl text-base leading-8 text-[#3f3747]/84 sm:text-lg">{project.goal}</p>
              </Reveal>
            </div>
          )}

          {project.status === "planning" && project.scope && project.scope.length > 0 && (
            <div className="mt-14 grid gap-10 border-t border-[#302140]/10 pt-10 lg:grid-cols-[0.42fr_1.58fr]">
              <Reveal>
                <div>
                  <p className="hud-label text-primary">03 / Scope</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[#15121b]">What I plan to build.</h2>
                </div>
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.scope.map((item, index) => (
                  <Reveal key={item} delay={Math.min(index * 45, 180)} className="rounded-2xl border border-[#302140]/10 bg-white p-5 text-sm font-semibold text-[#2c2533] transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_14px_35px_rgba(45,27,65,0.06)]">
                    <span className="hud-number mr-3 text-[10px] text-primary">0{index + 1}</span>{item}
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {project.status === "planning" && project.timeline && project.timeline.length > 0 && (
            <div className="mt-14 grid gap-10 border-t border-[#302140]/10 pt-10 lg:grid-cols-[0.42fr_1.58fr]">
              <Reveal>
                <div>
                  <p className="hud-label text-primary">04 / Timeline</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[#15121b]">Project roadmap.</h2>
                </div>
              </Reveal>
              <div className="space-y-0">
                {project.timeline.map((item, index) => (
                  <Reveal key={item.phase} delay={Math.min(index * 45, 180)}>
                    <div className="relative border-l border-[#302140]/12 pb-8 pl-7 last:pb-0">
                      <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="font-bold text-[#15121b]">{index + 1}. {item.phase}</h3>
                        <span className="hud-label text-primary">{item.duration}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#4a4253]/78">{item.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 grid gap-10 border-t border-[#302140]/10 pt-10 lg:grid-cols-[0.42fr_1.58fr]">
            <Reveal>
              <div>
                <p className="hud-label text-primary">Stack</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#15121b]">Technologies.</h2>
              </div>
            </Reveal>
            <Reveal delay={60} className="flex flex-wrap content-start gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-[#302140]/10 bg-[#f4f1f8] px-3.5 py-2 text-sm font-semibold text-[#3a3041]/82 transition hover:border-primary/20 hover:bg-primary/[0.06] hover:text-[#15121b]">
                  {technology}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal className="mission-card mt-14 rounded-[2rem] p-7 sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="hud-label text-primary">More work</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">See the rest of the projects.</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">Browse the portfolio and open another project.</p>
              </div>
              <a href="/projects" className="inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-black text-black transition hover:-translate-y-0.5">
                Back to projects ↗
              </a>
            </div>
          </Reveal>
        </div>
      </article>

      <Footer />
    </>
  );
}

export default ProjectDetailPage;
