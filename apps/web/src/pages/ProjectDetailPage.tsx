import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import { getProjectBySlug } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectDetailPageProps {
  slug: string;
}

const statusMeta = {
  completed: {
    label: "Completed",
    tone: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    description: "The primary scope has been delivered and the project is presented as completed work.",
  },
  ongoing: {
    label: "In development",
    tone: "bg-primary/10 text-primary border-primary/20",
    description: "The project is actively evolving, so the snapshot below reflects the current build stage.",
  },
  planning: {
    label: "Planning",
    tone: "bg-amber-500/10 text-amber-700 border-amber-500/20",
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
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="animate-pulse rounded-[2rem] border border-border bg-card p-8">
            <div className="h-3 w-24 rounded-full bg-muted" />
            <div className="mt-5 h-12 max-w-2xl rounded-2xl bg-muted" />
            <div className="mt-4 h-5 max-w-xl rounded-full bg-muted" />
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <a href="/projects" className="text-sm font-semibold text-primary">← Back to projects</a>
          <div className="mt-10 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Project</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Project not found</h1>
            <p className="mt-4 leading-7 text-muted-foreground">
              {error ?? "This project does not exist or is no longer available."}
            </p>
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
      <article>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10 lg:py-16">
          <a href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <span>←</span> Back to projects
          </a>

          <header className="relative mt-9 overflow-hidden rounded-[2.4rem] border border-border bg-card px-6 py-8 shadow-sm sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 size-32 -translate-x-1/2 translate-y-20 rounded-full border border-primary/10" />

            <div className="relative flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                Project / {String(project.sortOrder).padStart(2, "0")}
              </p>
              <span className={status.tone + " rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"}>
                {status.label}
              </span>
            </div>

            <div className="relative mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {project.shortDescription}
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-muted/45 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Build snapshot</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{status.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-card p-3">
                    <p className="text-lg font-black">{project.technologies.length}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Core tools</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <p className="text-lg font-black">{milestones.length || "—"}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Milestones</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                  Live demo ↗
                </a>
              )}
              {project.repositoryUrl && (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-bold transition hover:border-primary/30 hover:bg-primary/5">
                  GitHub ↗
                </a>
              )}
            </div>
          </header>

          <div className="mt-6 overflow-hidden rounded-[2.2rem] border border-border bg-muted shadow-sm">
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="aspect-[16/7] w-full object-cover" />
            ) : (
              <div className="relative flex aspect-[16/7] min-h-72 items-end overflow-hidden bg-[radial-gradient(circle_at_80%_20%,oklch(0.63_0.23_293_/_0.5),transparent_34%),linear-gradient(135deg,oklch(0.18_0.04_286),oklch(0.08_0.02_286))] p-7 sm:p-10">
                <div className="pointer-events-none absolute right-[12%] top-[18%] size-52 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute right-[16%] top-[27%] size-36 rounded-full border border-primary/25" />
                <div className="relative max-w-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Realla / case study</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{project.title}</p>
                  <p className="mt-3 max-w-xl leading-7 text-white/60">{status.description}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">About</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">The project</h2>
            </div>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">{project.description}</p>
          </div>

          {project.status === "ongoing" && (
            <>
              <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-9">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Delivery snapshot</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Where the project is now.</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Progress is tied to concrete development milestones, so it communicates implementation maturity rather than an arbitrary completion score.
                    </p>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Current snapshot</p>
                    <p className="mt-1 text-xl font-black">{progress}%</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary shadow-[0_0_18px_oklch(0.52_0.24_293_/_0.35)] transition-all duration-700"
                      style={{ width: progress + "%" }}
                    />
                  </div>

                  {project.currentFocus && project.currentFocus.length > 0 && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {project.currentFocus.map((item, index) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl border border-border/80 bg-muted/35 p-4">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-black text-primary">{index + 1}</span>
                          <span className="text-sm font-semibold leading-6">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {milestones.length > 0 && (
                <div className="mt-12 grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Milestones</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">Development path</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {completedMilestones} of {milestones.length} milestones completed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {milestones.map((milestone, index) => {
                      const isCurrent = index === currentMilestoneIndex;

                      return (
                        <div
                          key={milestone.title}
                          className={[
                            "rounded-2xl border p-5 transition-all",
                            milestone.completed
                              ? "border-primary/15 bg-primary/[0.035]"
                              : isCurrent
                                ? "border-primary/30 bg-card shadow-sm"
                                : "border-border bg-card",
                          ].join(" ")}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={[
                                "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-black",
                                milestone.completed
                                  ? "bg-primary text-primary-foreground"
                                  : isCurrent
                                    ? "border border-primary/30 bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground",
                              ].join(" ")}
                            >
                              {milestone.completed ? "✓" : index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-black">{milestone.title}</h3>
                                {isCurrent && (
                                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-primary">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{milestone.description}</p>
                            </div>
                          </div>
                        </div>
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
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Project brief</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">Project goal</h2>
                  </div>
                  <p className="text-base leading-8 text-muted-foreground sm:text-lg">{project.goal}</p>
                </div>
              )}

              {project.scope && project.scope.length > 0 && (
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Scope</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">What we plan to build</h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.scope.map((item) => (
                      <div key={item} className="rounded-2xl border border-border bg-card p-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/25">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.timeline && project.timeline.length > 0 && (
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Timeline</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">Project roadmap</h2>
                  </div>
                  <div className="space-y-0">
                    {project.timeline.map((item, index) => (
                      <div key={item.phase} className="relative border-l border-border pb-8 pl-7 last:pb-0">
                        <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <h3 className="font-bold">{index + 1}. {item.phase}</h3>
                          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{item.duration}</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-12 grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Stack</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Technologies</h2>
            </div>
            <div className="flex flex-wrap content-start gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/20 hover:bg-primary/5">
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-border bg-foreground p-7 text-background sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Explore more</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">See the rest of the work.</h2>
              </div>
              <a href="/projects" className="inline-flex w-fit rounded-full bg-background px-5 py-2.5 text-sm font-black text-foreground transition hover:-translate-y-0.5">
                View all projects ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

export default ProjectDetailPage;
