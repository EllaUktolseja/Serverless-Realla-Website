import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { getProfile } from "@/data/portfolio";
import type { Profile } from "@/types/portfolio";

const focusAreas = [
  ["01", "Build & learn", "Turn ideas into working products and learn from the process."],
  ["02", "Full-stack thinking", "Move between interfaces, APIs, and data without losing the bigger picture."],
  ["03", "Own the details", "Care about polish, usability, and the small things people notice."],
] as const;

function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  return (
    <Section
      id="about"
      eyebrow="Mission profile"
      title="Curious about how things work — and how to make them better."
      className="starlight-section"
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="cosmic-panel rounded-[2rem] p-6 sm:p-8 lg:p-9">
          <div className="relative">
            <div className="flex items-center justify-between border-b border-[#2f1b46]/10 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="signal-dot" />
                <span className="hud-label text-black/45">Identity / current state</span>
              </div>
              <span className="hud-number text-[10px] font-bold text-primary">CS / 2026</span>
            </div>

            <div className="mt-7 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xl font-semibold leading-8 tracking-[-0.02em] text-[#160f20]/88 sm:text-2xl sm:leading-9">
                  {profile?.bio || "I’m a computer science student who enjoys turning ideas into working software."}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Curious by default", "Hands-on builder", "Always learning"].map((item) => (
                    <span key={item} className="rounded-full border border-[#2f1b46]/10 bg-[#3f245c]/[0.035] px-3.5 py-2 text-xs font-bold text-[#261b35]/82 transition hover:border-primary/25 hover:bg-primary/8 hover:text-[#160f20]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#2f1b46]/10 bg-[#140d1d]/[0.03] p-5">
                <p className="hud-label text-primary">What matters</p>
                <p className="mt-3 text-sm leading-6 text-[#2f223e]/72">
                  I’m early in my professional journey, so this portfolio is designed to show the work, the thinking behind it, and what I’m learning along the way.
                </p>
                <div className="mt-6 border-t border-[#2f1b46]/10 pt-4">
                  <p className="text-xs font-semibold text-[#160f20]/80">Based in {profile?.location || "Bekasi, Indonesia"}</p>
                  <p className="mt-1 text-xs text-[#2f223e]/58">Open to learning, collaboration, and new opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90} className="cosmic-panel rounded-[2rem] bg-[linear-gradient(145deg,rgba(100,57,145,0.16),rgba(8,5,14,0.85))] p-6 sm:p-8">
          <div className="relative">
            <div className="flex items-end justify-between gap-4 border-b border-[#2f1b46]/10 pb-5">
              <div>
                <p className="hud-label text-primary">Operating system</p>
                <h3 className="mt-2 text-xl font-black text-white">From concept to craft.</h3>
              </div>
              <span className="hud-number text-[10px] font-bold text-[#160f20]/55">03</span>
            </div>

            <div className="divide-y divide-[#2f1b46]/10">
              {focusAreas.map(([number, title, description]) => (
                <div key={number} className="group grid gap-3 py-6 sm:grid-cols-[2.5rem_1fr]">
                  <span className="hud-number text-[10px] font-bold text-primary">{number}</span>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-black text-white">{title}</h4>
                      <span className="text-xs text-[#2f223e]/45 transition duration-300 group-hover:translate-x-1 group-hover:text-primary">↗</span>
                    </div>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#2f223e]/72">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="/experience" className="mt-1 inline-flex rounded-full border border-[#2f1b46]/10 px-4 py-2.5 text-xs font-bold text-[#261b35]/76 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/8 hover:text-white">
              Trace the journey ↗
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default About;
