import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { getSkills } from "@/data/portfolio";
import type { Skill } from "@/types/portfolio";

function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getSkills().then(setSkills).catch(() => setError("Unable to load the tech stack."));
  }, []);

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <Section id="skills" eyebrow="Tech stack" title="The tools I use to turn ideas into working products.">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : skills.length === 0 ? (
        <p className="text-[#4a4253]/70">No skills available yet.</p>
      ) : (
        <>
          <Reveal className="cosmic-panel rounded-[1.7rem] p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="hud-label text-primary">Toolkit / current focus</p>
                <p className="mt-2 text-sm text-[#4a4253]/78">{skills.length} tools across {categories.length} categories.</p>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-primary/12 bg-primary/[0.05] px-3.5 py-2">
                <span className="signal-dot" />
                <span className="hud-label text-[#342845]/72">Actively learning</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {categories.map((category, categoryIndex) => {
              const categorySkills = skills.filter((skill) => skill.category === category);

              return (
                <Reveal
                  key={category}
                  delay={Math.min(categoryIndex * 60, 240)}
                  className="cosmic-panel group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/25 sm:p-7"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4 border-b border-[#302140]/10 pb-4">
                      <div>
                        <p className="hud-number text-[10px] font-bold text-primary">0{categoryIndex + 1}</p>
                        <h3 className="mt-1 text-lg font-black text-[#15121b]">{category}</h3>
                      </div>
                      <span className="hud-label text-[#4a4253]/65">{categorySkills.length} skills</span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.name}
                          className="group/skill rounded-full border border-[#302140]/10 bg-[#f4f1f8] px-3.5 py-2 text-xs font-bold text-[#2b2332]/82 transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/[0.06] hover:text-[#15121b]"
                          title={skill.level ? skill.level + (skill.yearsOfExperience ? " · " + skill.yearsOfExperience + "y" : "") : undefined}
                        >
                          <span className="mr-1.5 inline-block size-1 rounded-full bg-primary align-middle" />
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </>
      )}
    </Section>
  );
}

export default Skills;
