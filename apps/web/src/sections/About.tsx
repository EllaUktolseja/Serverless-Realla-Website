import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getProfile } from "@/data/portfolio";
import type { Profile } from "@/types/portfolio";

const focusAreas = [
  ["01", "Build & learn", "Turn ideas into working products and learn from the process."],
  ["02", "Full-stack thinking", "Move comfortably between interfaces, APIs, and data."],
  ["03", "Own the details", "Care about polish, usability, and the details people notice."],
] as const;

function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  return (
    <Section
      id="about"
      eyebrow="About me"
      title="Curious about how things work — and how to make them better."
      className="bg-[#111016] text-white [&>div]:py-16 [&>div]:lg:py-20"
    >
      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/[0.055] sm:p-8 lg:p-9">
          <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-primary/12 blur-3xl transition duration-700 group-hover:bg-primary/20" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full border border-primary/15" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">Currently</span>
              </div>
              <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-primary">CS / 2026</span>
            </div>

            <div className="mt-7 grid gap-7 md:grid-cols-[1.15fr_0.85fr] md:gap-9">
              <div>
                <p className="max-w-2xl text-xl font-semibold leading-8 tracking-[-0.02em] text-white/90 sm:text-2xl sm:leading-9">
                  {profile?.bio || "I’m a computer science student who enjoys turning ideas into working software."}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Curious by default", "Hands-on builder", "Always learning"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-bold text-white/80 transition-colors hover:border-primary/30 hover:bg-primary/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">What matters</p>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    I’m early in my professional journey, so this portfolio is about showing the work, the thinking behind it, and what I’m learning along the way.
                  </p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-white/85">Based in {profile?.location || "Bekasi, Indonesia"}</p>
                  <p className="mt-1 text-xs text-white/45">Open to learning, collaboration, and new opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 p-6 sm:p-8 lg:p-7">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_bottom,transparent,oklch(0.52_0.24_293_/_0.13),transparent)]" />
          <div className="relative">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">How I work</p>
                <h3 className="mt-2 text-xl font-black tracking-tight text-white">From concept to craft.</h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-white/30">03</span>
            </div>

            <div className="divide-y divide-white/10">
              {focusAreas.map(([number, title, description]) => (
                <div key={number} className="group grid gap-3 py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
                  <span className="font-mono text-[10px] font-bold text-primary">{number}</span>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-black text-white">{title}</h4>
                      <span className="text-xs text-white/25 transition duration-300 group-hover:translate-x-1 group-hover:text-primary">↗</span>
                    </div>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="/experience" className="mt-1 inline-flex items-center rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold text-white/80 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-white">
              See the journey ↗
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default About;
