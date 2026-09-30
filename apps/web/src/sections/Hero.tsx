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
      <div className="nebula pointer-events-none -right-20 top-24 size-[30rem]" />
      <div className="nebula pointer-events-none left-[-12rem] top-[45%] size-[26rem]" />
      <div className="hero-orbit pointer-events-none absolute right-[3%] top-20 size-96 rounded-full border border-primary/12" />
      <div className="hero-orbit hero-orbit-delay pointer-events-none absolute right-[7%] top-28 size-72 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute right-[15%] top-16 hidden size-2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.75)] lg:block" />

      <div className="space-container grid items-center gap-12 px-5 py-14 sm:px-7 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/[0.07] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary backdrop-blur-xl">
              <span className="signal-dot" />
              On duty / open to internships
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-8 hud-label text-white/34">{headline} / On duty</p>
          </Reveal>

          <Reveal delay={130}>
            <h1 className="mt-5 max-w-4xl text-[3.35rem] font-black leading-[0.88] tracking-[-0.085em] text-white sm:text-6xl lg:text-[6.2rem]">
              Bridging Ideas
              <span className="block bg-[linear-gradient(105deg,#fff_10%,oklch(0.79_0.16_300)_48%,oklch(0.61_0.26_325))] bg-clip-text text-transparent">
                to Digital Experiences.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={210}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/53 sm:mt-8 sm:text-lg sm:leading-8">
              Hi, I’m <span className="font-semibold text-white">{name}</span>. {bio}
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/projects" className="hud-button inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-[0_18px_45px_oklch(0.69_0.28_300_/_0.18)] transition hover:-translate-y-1">
                Explore projects <span aria-hidden>↗</span>
              </a>
              <a href="/experience" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-white/75 transition hover:-translate-y-1 hover:border-primary/25 hover:text-white">
                View experience <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>

        </div>

        <Reveal delay={180} className="mx-auto w-full max-w-[22rem] lg:max-w-[25rem]">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="absolute inset-[-1.2rem] rounded-[2.7rem] border border-primary/10" />
              <div className="absolute inset-[-2.6rem] rounded-full border border-primary/8" />
              <div className="cosmic-panel relative rounded-[2.3rem] p-2">
                <div className="relative overflow-hidden rounded-[1.9rem] bg-black">
                  <img
                    src={profile?.imageUrl ?? ""}
                    alt={name}
                    className="aspect-[4/5] w-full object-cover object-top transition duration-1000 hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(89,46,140,0.03),transparent_38%,rgba(0,0,0,0.8))]" />
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    <span className="hud-label rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-white/50 backdrop-blur">
                      Profile
                    </span>
                    <span className="hud-label rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary backdrop-blur">
                      On duty
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="hud-label text-white/35">Current focus</p>
                        <p className="mt-1 text-lg font-black text-white">Building, learning, iterating.</p>
                      </div>
                      <div className="text-right">
                        <p className="hud-label text-white/25">Status</p>
                        <p className="mt-1 text-xs font-black text-primary">ON DUTY</p>
                      </div>
                    </div>
                  </div>
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
