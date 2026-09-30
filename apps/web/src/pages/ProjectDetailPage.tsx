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
    tone: "border-white/12 bg-white/[0.05] text-white/80",
    description: "The main scope has been delivered and is presented here as completed work.",
  },
  ongoing: {
    label: "In development",
    tone: "border-primary/24 bg-primary/10 text-primary",
    description: "The project is actively evolving, so this page reflects its current build stage.",
  },
  planning: {
    label: "Planning",
    tone: "border-white/12 bg-black/25 text-white/58",
    description: "The concept and scope are being shaped before active implementation begins.",
  },
} as const;

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
        <section className="space-section mission-section">
          <div className="space-container px-5 py-16 sm:px-7 lg:px-10 lg:py-20">
            <div className="cosmic-panel animate-pulse rounded-[2rem] p-8">
              <div className="h-3 w-28 rounded-full bg-white/10" />
              <div className="mt-6 h-14 max-w-2xl rounded-2xl bg-white/10" />
              <div className="mt-5 h-5 max-w-xl rounded-full bg-white/10" />
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
        <section className="space-section mission-section">
          <div className="space-container px-5 py-16 sm:px-7 lg:px-10 lg:py-20">
            <a href="/projects" className="text-sm font-semibold text-primary">← Back to projects</a>
            <div className="mt-10 max-w-xl">
              <p className="hud-label text-primary">Navigation error</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Project not found</h1>
              <p className="mt-4 leading-7 text-white/66">{error ?? "This project does not exist or is no longer available."}</p>
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
      <article className="space-section mission-section">
        <div className="nebula right-[-10rem] top-12 size-[34rem]" />
        <div className="space-container px-5 py-10 sm:px-7 lg:px-10 lg:py-14">
          <a href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white/62 transition hover:text-primary">
            <span>←</span> Back to projects
          </a>

          <Reveal>
            <header className="cosmic-panel mt-8 overflow-hidden rounded-[2.4rem] p-6 sm:p-9 lg:p-12">
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="hud-label text-primary">Project / {String(project.sortOrder).padStart(2, "0")}</p>
                  <span className={"rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] " + status.tone}>{status.label}</span>
                </div>

                <div className="mt-7 grid gap-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
                  <div>
                    <h1 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">{project.title}</h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/66 sm:text-lg sm:leading-8">{project.shortDescription}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    <p className="hud-label text-primary">Project status</p>
                    <p className="mt-2 text-sm leading-6 text-white/66">{status.description}</p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                        <p className="hud-number text-lg font-black text-white">{project.technologies.length}</p>
                        <p className="mt-1 hud-label text-white/46">Core tools</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                        <p className="hud-number text-lg font-black text-white">{milestones.length || "—"}</p>
                        <p className="mt-1 hud-label text-white/46">Milestones</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow-[0_14px_32px_rgba(124,58,237,0.20)]">Live demo ↗</a>
                  )}
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/[0.035] px-5 py-2.5 text-sm font-bold text-white/78 transition hover:border-primary/30 hover:text-white">GitHub ↗</a>
                  )}
                </div>
              </div>
            </header>
          </Reveal>

          <Reveal delay={80}>
            <div className="cosmic-panel mt-6 overflow-hidden rounded-[2.2rem]">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="aspect-[16/7] w-full object-cover" loading="lazy" />
              ) : (
                <div className="relative flex aspect-[16/7] min-h-72 items-end overflow-hidden bg-[radial-gradient(circle_at_80%_18%,rgba(124,58,237,0.62),transparent_34%),linear-gradient(135deg,#150b20,#05030a_78%)] p-7 sm:p-10">
                  <div className="pointer-events-none absolute right-[11%] top-[15%] size-56 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute right-[15%] top-[24%] size-38 rounded-full border border-primary/22" />
                  <div className="pointer-events-none absolute left-[10%] bottom-[16%] h-px w-2/5 bg-gradient-to-r from-primary/70 to-transparent" />
                  <div className="relative max-w-2xl">
                    <p className="hud-label text-white/46">Project visual</p>
                    <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">{project.title}</p>
                    <p className="mt-3 max-w-xl leading-7 text-white/62">{status.description}</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
            <Reveal>
              <div>
                <p className="hud-label text-primary">01 / Overview</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">The project</h2>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <p className="text-base leading-8 text-white/68 sm:text-lg">{project.description}</p>
            </Reveal>
          </div>

          {project.status === "ongoing" && (
            <>
              <Reveal className="cosmic-panel mt-12 rounded-[2rem] p-6 sm:p-8 lg:p-9">
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-xl">
                    <p className="hud-label text-primary">02 / Progress</p>
                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Where the project is now.</h2>
                    <p className="mt-3 text-sm leading-6 text-white/62">Progress is tied to concrete development milestones so the current stage is easy to understand.</p>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-primary/18 bg-primary/[0.07] px-5 py-4 text-right">
                    <p className="hud-label text-primary">Current</p>
                    <p className="mt-1 hud-number text-2xl font-black text-white">{progress}%</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="h-2 overflow-hidden rounded-full bg-white/12">
                    <div className="h-full rounded-full bg-primary shadow-[0_0_18px_rgba(124,58,237,0.60)]" style={{ width: progress + "%" }} />
                  </div>

                  {project.currentFocus && project.currentFocus.length > 0 && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {project.currentFocus.map((item, index) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-black text-primary">{index + 1}</span>
                          <span className="text-sm font-semibold leading-6 text-white/78">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>

              {milestones.length > 0 && (
                <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
                  <Reveal>
                    <div>
                      <p className="hud-label text-primary">03 / Milestones</p>
                      <h2 className="mt-2 text-2xl font-black text-white">Development path</h2>
                      <p className="mt-3 text-sm leading-6 text-white/58">{completedMilestones} of {milestones.length} completed.</p>
                    </div>
                  </Reveal>

                  <div className="space-y-3">
                    {milestones.map((milestone, index) => {
                      const isCurrent = index === currentMilestoneIndex;
                      return (
                        <Reveal key={milestone.title} delay={Math.min(index * 40, 180)}>
                          <div className={[
                            "rounded-2xl border p-5 transition hover:border-primary/24",
                            milestone.completed ? "border-primary/16 bg-primary/[0.04]" : isCurrent ? "border-primary/26 bg-white/[0.03]" : "border-white/10 bg-white/[0.018]",
                          ].join(" ")}>
                            <div className="flex items-start gap-4">
                              <span className={[
                                "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-black",
                                milestone.completed ? "bg-primary text-white" : isCurrent ? "border border-primary/25 bg-primary/10 text-primary" : "bg-white/8 text-white/50",
                              ].join(" ")}>
                                {milestone.completed ? "✓" : index + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-black text-white">{milestone.title}</h3>
                                  {isCurrent && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-primary">Current</span>}
                                </div>
                                <p className="mt-1.5 text-sm leading-6 text-white/62">{milestone.description}</p>
                              </div>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {project.status === "planning" && (
            <>
              {project.goal && (
                <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
                  <Reveal><div><p className="hud-label text-primary">02 / Goal</p><h2 className="mt-2 text-2xl font-black text-white">Project goal</h2></div></Reveal>
                  <Reveal delay={70}><p className="text-base leading-8 text-white/68 sm:text-lg">{project.goal}</p></Reveal>
                </div>
              )}

              {project.scope && project.scope.length > 0 && (
                <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
                  <Reveal><div><p className="hud-label text-primary">03 / Scope</p><h2 className="mt-2 text-2xl font-black text-white">What I plan to build</h2></div></Reveal>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.scope.map((item, index) => (
                      <Reveal key={item} delay={Math.min(index * 45, 180)} className="rounded-2xl border border-white/10 bg-white/[0.018] p-5 text-sm font-semibold text-white/78 transition hover:-translate-y-0.5 hover:border-primary/24">
                        <span className="hud-number mr-3 text-[10px] text-primary">0{index + 1}</span>{item}
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {project.timeline && project.timeline.length > 0 && (
                <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
                  <Reveal><div><p className="hud-label text-primary">04 / Timeline</p><h2 className="mt-2 text-2xl font-black text-white">Project roadmap</h2></div></Reveal>
                  <div className="space-y-0">
                    {project.timeline.map((item, index) => (
                      <Reveal key={item.phase} delay={Math.min(index * 45, 180)}>
                        <div className="relative border-l border-white/12 pb-8 pl-7 last:pb-0">
                          <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <h3 className="font-bold text-white">{index + 1}. {item.phase}</h3>
                            <span className="hud-label text-primary">{item.duration}</span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-white/62">{item.description}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1.45fr]">
            <Reveal><div><p className="hud-label text-primary">Stack</p><h2 className="mt-2 text-2xl font-black text-white">Technologies</h2></div></Reveal>
            <Reveal delay={70} className="flex flex-wrap content-start gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-sm font-semibold text-white/72 transition hover:border-primary/24 hover:bg-primary/[0.06] hover:text-white">{technology}</span>
              ))}
            </Reveal>
          </div>

          <Reveal className="cosmic-panel mt-12 rounded-[2rem] p-7 sm:p-9">
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="hud-label text-primary">More work</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">See the rest of the projects.</h2>
              </div>
              <a href="/projects" className="inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-black text-black transition hover:-translate-y-0.5">Back to projects ↗</a>
            </div>
          </Reveal>
        </div>
      </article>

      <Footer />
    </>
  );
}

export default ProjectDetailPage;
