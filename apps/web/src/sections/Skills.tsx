import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getSkills } from "@/data/portfolio";
import type { Skill } from "@/types/portfolio";

function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getSkills().then(setSkills).catch(() => setError("Unable to load skills."));
  }, []);

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <Section id="skills" eyebrow="Toolkit" title="Technologies I use to turn ideas into software.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : skills.length === 0 ? (
        <p className="text-muted-foreground">No skills available yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter((skill) => skill.category === category);

            return (
              <div key={category} className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
                <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-primary/6 blur-2xl transition duration-500 group-hover:bg-primary/10" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4 border-b border-border/80 pb-4">
                    <div>
                      <p className="font-mono text-[10px] font-bold text-primary">0{categoryIndex + 1}</p>
                      <h3 className="mt-1 text-lg font-black tracking-tight">{category}</h3>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{categorySkills.length} skills</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/5"
                        title={skill.level ? skill.level + (skill.yearsOfExperience ? " · " + skill.yearsOfExperience + "y" : "") : undefined}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

export default Skills;
