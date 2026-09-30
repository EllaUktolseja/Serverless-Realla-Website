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
      .catch(() => setError("Unable to load experience data."));
  }, []);

  return (
    <Section id="experience" eyebrow="Experience" title="The work and learning behind the projects.">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="cosmic-panel rounded-[2rem] p-6 sm:p-8">
            <div className="relative">
              <div className="mb-7 flex items-center justify-between gap-3 border-b border-[#302140]/10 pb-5">
                <div>
                  <p className="hud-label text-primary">Experience</p>
                  <h3 className="mt-2 text-xl font-black text-[#15121b]">Hands-on work.</h3>
                </div>
                <span className="hud-number text-[10px] font-bold text-[#15121b]/54">{String(experiences.length).padStart(2, "0")} roles</span>
              </div>

              {experiences.length === 0 ? (
                <p className="text-[#15121b]/62">No experience data available yet.</p>
              ) : (
                <div className="space-y-9">
                  {experiences.map((experience, index) => (
                    <article key={experience.company + experience.position + experience.startDate} className="group relative border-l border-[#302140]/12 pl-6">
                      <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/10 transition group-hover:ring-primary/20" />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="hud-number text-[10px] font-bold text-primary">0{index + 1}</p>
                          <h3 className="mt-1 text-lg font-black text-[#15121b]">{experience.position}</h3>
                          <p className="mt-1 text-sm font-semibold text-[#15121b]/72">{experience.company}</p>
                        </div>
                        <p className="hud-label text-[#4a4253]/72">
                          {new Date(experience.startDate).getFullYear()} — {experience.current ? "Present" : experience.endDate ? new Date(experience.endDate).getFullYear() : "—"}
                        </p>
                      </div>
                      {experience.location && <p className="mt-3 hud-label text-[#4a4253]/68">{experience.location}</p>}
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3f3747]/82">{experience.description}</p>
                      {experience.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.technologies.map((technology) => (
                            <span key={technology} className="rounded-full border border-[#302140]/10 bg-[#3f245c]/[0.035] px-3 py-1 text-[11px] font-bold text-[#3a3041]/72">
                              {technology}
                            </span>
                          ))}
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
              <div className="flex items-start justify-between gap-4 border-b border-[#302140]/10 pb-5">
                <div>
                  <p className="hud-label text-primary">Education</p>
                  <h3 className="mt-2 text-xl font-black text-[#15121b]">Academic foundation.</h3>
                </div>
                <span className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-primary">Student</span>
              </div>

              <div className="mt-7 space-y-8">
                {education.length === 0 ? (
                  <p className="text-sm text-[#15121b]/60">No education data available yet.</p>
                ) : (
                  education.map((item, index) => (
                    <article key={item.institution + item.degree}>
                      <p className="hud-number text-[10px] font-bold text-primary">0{index + 1}</p>
                      <h4 className="mt-2 text-lg font-black text-[#15121b]">{item.degree}</h4>
                      <p className="mt-1 text-sm font-semibold text-[#15121b]/70">{item.institution}</p>
                      {item.field && <p className="mt-1 text-sm text-[#4a4253]/72">{item.field}</p>}
                      <div className="mt-4 rounded-xl border border-[#302140]/10 bg-[#f3f0f7] p-4">
                        <p className="hud-label text-primary">Study period</p>
                        <p className="mt-1 text-sm font-bold text-[#15121b]">
                          {new Date(item.startDate).getFullYear()} — {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                        </p>
                      </div>
                      {item.description && <p className="mt-4 text-sm leading-6 text-[#3f3747]/80">{item.description}</p>}
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
