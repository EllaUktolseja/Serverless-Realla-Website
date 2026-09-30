import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import { getProfile } from "@/data/portfolio";
import type { Profile } from "@/types/portfolio";

function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  const name = profile?.name ?? "Gabriella Uktolseja";
  const headline = profile?.headline ?? "Undergraduate Software Engineer";
  const bio =
    profile?.bio ??
    "I build thoughtful full-stack web applications while continuously strengthening my software engineering fundamentals.";

  return (
    <section id="hero" className="space-section min-h-[calc(100svh-5.5rem)]">
      <div className="nebula pointer-events-none -right-16 top-20 size-[28rem]" />
      <div className="nebula pointer-events-none left-[-12rem] top-[52%] size-[24rem]" />
      <div className="hero-orbit pointer-events-none absolute right-[5%] top-20 size-96 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute right-[13%] top-32 hidden size-2 rounded-full bg-primary lg:block" />

      <div className="space-container grid items-center gap-10 px-5 py-14 sm:px-7 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/[0.07] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
              <span className="signal-dot" />
              On duty / open to internships
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-8 hud-label text-[#4a4253]/65">{headline} / On duty</p>
          </Reveal>

          <Reveal delay={130}>
            <h1 className="mt-5 max-w-4xl text-[3.35rem] font-black leading-[0.9] tracking-[-0.085em] text-[#15121b] sm:text-6xl lg:text-[6.2rem]">
              Bridging Ideas
              <span className="block bg-[linear-gradient(105deg,#15121b_5%,#6d28d9_55%,#a21caf)] bg-clip-text text-transparent">
                to Digital Experiences.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={210}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#4a4253]/78 sm:mt-8 sm:text-lg sm:leading-8">
              Hi, I’m <span className="font-semibold text-[#15121b]">{name}</span>. {bio}
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/projects" className="hud-button inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-[0_16px_36px_rgba(124,58,237,0.18)]">
                Explore projects <span aria-hidden>↗</span>
              </a>
              <a href="/experience" className="inline-flex items-center gap-2 rounded-full border border-[#302140]/12 bg-white/60 px-5 py-3 text-sm font-bold text-[#2a2230]/78 transition hover:-translate-y-0.5 hover:border-primary/25 hover:text-[#15121b]">
                View experience <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="mx-auto w-full max-w-[22rem] lg:max-w-[24rem]">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-9 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-[-1.1rem] rounded-[2.6rem] border border-primary/10" />
            <div className="cosmic-panel relative rounded-[2.2rem] bg-[#09070e] p-2">
              <div className="relative overflow-hidden rounded-[1.85rem] bg-black">
                {profile?.imageUrl ? (
                  <img
                    src={profile.imageUrl}
                    alt={name}
                    className="aspect-[4/5] w-full object-cover object-top transition duration-700 hover:scale-[1.02]"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                ) : (
                  <div className="flex aspect-[4/5] items-end bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.35),transparent_35%),linear-gradient(145deg,#171021,#05030a)] p-6">
                    <span className="hud-label text-white/55">Profile image unavailable</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,18,58,0.02),transparent_35%,rgba(0,0,0,0.82))]" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                  <span className="hud-label rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-white/78 backdrop-blur">Profile</span>
                  <span className="hud-label rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary backdrop-blur">On duty</span>
                </div>

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/12 bg-black/52 p-4 backdrop-blur-xl">
                  <p className="hud-label text-white/48">Current focus</p>
                  <p className="mt-1 text-lg font-black text-white">Building, learning, iterating.</p>
                  <div className="mt-3 h-px bg-white/10" />
                  <p className="mt-3 text-xs font-semibold text-white/58">{profile?.location ?? "Bekasi, Indonesia"}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
