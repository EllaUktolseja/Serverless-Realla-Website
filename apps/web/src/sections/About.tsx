import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getProfile } from "@/data/portfolio";
import type { Profile } from "@/types/portfolio";

function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  return (
    <Section id="about" eyebrow="About me" title="Curious about how things work — and how to make them better.">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/8 blur-3xl transition duration-700 group-hover:bg-primary/14" />
          <div className="relative">
            <p className="max-w-3xl text-xl font-semibold leading-8 tracking-[-0.02em] sm:text-2xl sm:leading-9">
              {profile?.bio || "I’m a computer science student who enjoys turning ideas into working software."}
            </p>
            <p className="mt-7 max-w-2xl leading-7 text-muted-foreground">
              I’m early in my professional journey, so this portfolio is less about claiming expertise and more about showing the work: what I build, how I think through problems, and what I’m learning along the way.
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              {["Curious by default", "Hands-on builder", "Always learning"].map((item) => (
                <span key={item} className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-bold">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["01", "Build & learn", "Turn concepts into working products."],
            ["02", "Full-stack", "Move across UI, APIs, and data."],
            ["03", "Own the details", "Care about quality beyond the screen."],
          ].map(([number, title, description]) => (
            <div key={number} className="group rounded-[1.5rem] border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <span className="font-mono text-[10px] font-bold text-primary">{number}</span>
              <h3 className="mt-4 text-base font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              <span className="mt-5 block text-right text-xs text-muted-foreground transition group-hover:text-primary">↗</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default About;
