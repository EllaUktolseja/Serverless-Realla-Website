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
  const bio = profile?.bio ?? "I build thoughtful full-stack web applications while continuously strengthening my software engineering fundamentals.";

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/70 bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,oklch(0.62_0.25_293_/_0.18),transparent_30%),radial-gradient(circle_at_8%_52%,oklch(0.78_0.12_293_/_0.09),transparent_25%)]" />
      <div className="hero-orbit pointer-events-none absolute right-[2%] top-24 -z-10 size-80 rounded-full border border-primary/10" />
      <div className="hero-orbit hero-orbit-delay pointer-events-none absolute right-[6%] top-28 -z-10 size-60 rounded-full border border-primary/10" />

      <div className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <Reveal>
            <div className="animate-pulse-ring inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/75 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" />
              Open to internship opportunities
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground sm:mt-8 sm:text-sm">
              {headline}
            </p>
          </Reveal>

          <Reveal delay={130}>
            <h1 className="mt-4 max-w-4xl text-[3.05rem] font-black leading-[0.9] tracking-[-0.075em] sm:text-6xl lg:text-[5.45rem]">
              Bridging Ideas
              <span className="block bg-[linear-gradient(100deg,oklch(0.46_0.28_293),oklch(0.62_0.25_320))] bg-clip-text text-transparent">
                to Digital Experiences.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={210}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg">
              Hi, I’m <span className="font-semibold text-foreground">{name}</span>. {bio}
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
              <a href="/projects" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background shadow-xl shadow-foreground/10 transition-all hover:-translate-y-1 hover:shadow-2xl">
                Explore projects <span aria-hidden>↗</span>
              </a>
              <a href="/contact" className="inline-flex items-center rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-bold transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5">
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-10 grid max-w-2xl grid-cols-1 border-y border-border/80 py-5 sm:mt-12 sm:grid-cols-3">
              {[
                ["01", "Full-stack", "Web development"],
                ["02", "TypeScript", "Primary language"],
                ["03", "Hands-on", "Build & learn"],
              ].map(([number, title, description], index) => (
                <div
                  key={number}
                  className={
                    index === 1
                      ? "border-border/80 py-4 sm:border-x sm:px-5 sm:py-0 lg:px-8"
                      : index === 0
                        ? "pb-4 sm:pr-5 sm:pb-0 lg:pr-8"
                        : "pt-4 sm:pl-5 sm:pt-0 lg:pl-8"
                  }
                >
                  <p className="text-[10px] font-bold text-primary">{number}</p>
                  <p className="mt-2 text-sm font-bold sm:text-base">{title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="mx-auto w-full max-w-[19rem] lg:max-w-[21rem]">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3.25rem] bg-primary/14 blur-3xl" />
            <div className="relative rounded-[2.75rem] border border-foreground/10 bg-foreground p-2 shadow-2xl shadow-primary/15">
              <div className="relative overflow-hidden rounded-[2.35rem] bg-black">
                <img
                  src={profile?.imageUrl ?? ""}
                  alt={name}
                  className="aspect-[4/5] w-full object-cover object-top transition duration-1000 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-primary/10" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-white backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/50">Current chapter</p>
                      <p className="mt-1 text-sm font-bold">Learning by building.</p>
                    </div>
                    <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-black text-white">01</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Based in</p>
              <p className="mt-1 text-sm font-bold">{profile?.location ?? "Bekasi, Indonesia"}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
