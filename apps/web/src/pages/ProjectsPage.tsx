import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import { getProjects } from "@/data/portfolio";
import type { Project, ProjectStatus } from "@/types/portfolio";

const statusMeta: Record<ProjectStatus, { label: string }> = {
  completed: { label: "Completed" },
  ongoing: { label: "Ongoing" },
  planning: { label: "Planning" },
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.imageUrl) {
    return <img src={project.imageUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />;
  }
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,oklch(0.6_0.22_293),transparent_30%),linear-gradient(145deg,oklch(0.22_0.03_286),oklch(0.10_0.02_286))]" />
      <div className="absolute -right-10 bottom-[-5rem] size-56 rounded-full border border-white/10" />
      <div className="absolute inset-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm" />
    </>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getProjects().then((items) => setProjects([...items].sort((a, b) => a.sortOrder - b.sortOrder))).catch(() => setError("Unable to load projects."));
  }, []);

  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-primary"><span className="size-1.5 rounded-full bg-primary" />Selected work / 01</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl lg:text-8xl">Projects with a reason to exist.</h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">Completed work, active builds, and ideas still taking shape — snapshots of how I approach problems and build things.</p>
          </div>

          {error ? <p className="mt-12 text-sm text-destructive">{error}</p> : (
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const status = statusMeta[project.status] ?? { label: "Project" };
                return (
                  <a key={project.slug} href={`/projects/${encodeURIComponent(project.slug)}`} className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="relative min-h-80 overflow-hidden bg-foreground">
                      <ProjectVisual project={project} />
                      <div className="relative flex min-h-80 flex-col justify-between p-6">
                        <div className="flex items-center justify-between">
                          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur">{String(index + 1).padStart(2, "0")} / {status.label}</span>
                          <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-black/15 text-sm text-white backdrop-blur transition group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-white/45">{project.slug}</p>
                          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">{project.title}</h2>
                          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{project.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      {project.status === "ongoing" && typeof project.progress === "number" && (
                        <div className="mb-6">
                          <div className="mb-2 flex justify-between text-[10px] font-black uppercase tracking-wider text-muted-foreground"><span>Progress</span><span>{project.progress}%</span></div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} /></div>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((technology) => <span key={technology} className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-bold text-muted-foreground">{technology}</span>)}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-xs font-black">
                        <span>View project</span><span className="text-primary transition-transform group-hover:translate-x-1">Details →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
          {!error && projects.length === 0 && <p className="mt-10 text-muted-foreground">No projects available yet.</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProjectsPage;
