import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
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
    <Section id="experience" eyebrow="Background systems" title="The work and learning behind the projects.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="cosmic-panel rounded-[2rem] p-6 sm:p-8">
            <div className="relative">
              <div className="mb-7 flex items-center justify-between gap-3 border-b border-white/8 pb-5">
                <div>
                  <p className="hud-label text-primary">Experience</p>
                  <h3 className="mt-2 text-xl font-black text-white">Hands-on work.</h3>
                </div>
                <span className="hud-number text-[10px] font-bold text-white/25">{String(experiences.length).padStart(2, "0")} roles</span>
              </div>

              {experiences.length === 0 ? (
                <p className="text-white/35">No experience data available yet.</p>
              ) : (
                <div className="space-y-9">
                  {experiences.map((experience, index) => (
                    <article key={experience.company + experience.position + experience.startDate} className="group relative border-l border-white/10 pl-6">
                      <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/10 transition group-hover:ring-primary/20" />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="hud-number text-[10px] font-bold text-primary">0{index + 1}</p>
                          <h3 className="mt-1 text-lg font-black text-white">{experience.position}</h3>
                          <p className="mt-1 text-sm font-semibold text-white/45">{experience.company}</p>
                        </div>
                        <p className="hud-label text-white/28">
                          {new Date(experience.startDate).getFullYear()} — {experience.current ? "Present" : experience.endDate ? new Date(experience.endDate).getFullYear() : "—"}
                        </p>
                      </div>
                      {experience.location && <p className="mt-3 hud-label text-white/23">{experience.location}</p>}
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/43">{experience.description}</p>
                      {experience.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/8 bg-white/[0.018] px-3 py-1 text-[11px] font-bold text-white/36">{technology}</span>)}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={90} className="cosmic-panel rounded-[2rem] p-6 sm:p-8">
            <div className="relative">
              <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
                <div>
                  <p className="hud-label text-primary">Education</p>
                  <h3 className="mt-2 text-xl font-black text-white">Academic foundation.</h3>
                </div>
                <span className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-primary">Student</span>
              </div>

              <div className="mt-7 space-y-8">
                {education.length === 0 ? (
                  <p className="text-sm text-white/35">No education data available yet.</p>
                ) : (
                  education.map((item, index) => (
                    <article key={item.institution + item.degree}>
                      <p className="hud-number text-[10px] font-bold text-primary">0{index + 1}</p>
                      <h4 className="mt-2 text-lg font-black text-white">{item.degree}</h4>
                      <p className="mt-1 text-sm font-semibold text-white/45">{item.institution}</p>
                      {item.field && <p className="mt-1 text-sm text-white/35">{item.field}</p>}
                      <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.018] p-4">
                        <p className="hud-label text-primary">Study period</p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {new Date(item.startDate).getFullYear()} — {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                        </p>
                      </div>
                      {item.description && <p className="mt-4 text-sm leading-6 text-white/40">{item.description}</p>}
                    </article>
                  ))
                )}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </Section>
  );
}

export default Experience;
