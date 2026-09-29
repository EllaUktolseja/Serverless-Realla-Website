import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getEducations, getExperiences } from "@/data/portfolio";
import type { Education, Experience as ExperienceData } from "@/types/portfolio";

function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void Promise.all([getExperiences(), getEducations()])
      .then(([experienceData, educationData]) => {
        setExperiences(experienceData);
        setEducation(educationData);
      })
      .catch(() => setError("Unable to load background data."));
  }, []);

  return (
    <Section id="experience" eyebrow="Experience & education" title="The work and learning behind the projects.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-3 border-b border-border/80 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Experience</p>
                <h3 className="mt-2 text-xl font-black tracking-tight">Hands-on work.</h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-muted-foreground">{String(experiences.length).padStart(2, "0")} roles</span>
            </div>

            {experiences.length === 0 ? (
              <p className="text-muted-foreground">No experience data available yet.</p>
            ) : (
              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <article key={experience.company + experience.position + experience.startDate} className="group relative border-l border-border pl-6">
                    <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/10 transition group-hover:ring-primary/20" />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-primary">0{index + 1}</p>
                        <h3 className="mt-1 text-lg font-black tracking-tight">{experience.position}</h3>
                        <p className="mt-1 text-sm font-semibold text-muted-foreground">{experience.company}</p>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {new Date(experience.startDate).getFullYear()} —{" "}
                        {experience.current ? "Present" : experience.endDate ? new Date(experience.endDate).getFullYear() : "—"}
                      </p>
                    </div>
                    {experience.location && <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{experience.location}</p>}
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{experience.description}</p>
                    {experience.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {experience.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] font-bold text-muted-foreground">{technology}</span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-primary/8 blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 border-b border-border/80 pb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Education</p>
                  <h3 className="mt-2 text-xl font-black tracking-tight">Academic foundation.</h3>
                </div>
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-black text-primary">Student</span>
              </div>

              <div className="mt-7 space-y-7">
                {education.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No education data available yet.</p>
                ) : (
                  education.map((item) => (
                    <article key={item.institution + item.degree}>
                      <h4 className="text-lg font-black">{item.degree}</h4>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">{item.institution}</p>
                      {item.field && <p className="mt-1 text-sm text-muted-foreground">{item.field}</p>}
                      <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Study period</p>
                        <p className="mt-1 text-sm font-bold">
                          {new Date(item.startDate).getFullYear()} — {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                        </p>
                      </div>
                      {item.description && <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>}
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

export default Experience;
