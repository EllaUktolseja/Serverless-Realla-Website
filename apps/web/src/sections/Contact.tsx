import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { getProfile } from "@/data/portfolio";
import type { Profile } from "@/types/portfolio";

function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  const profileName = profile?.name ?? "Gabriella Uktolseja";
  const profileHeadline = profile?.headline ?? "Undergraduate Software Engineer";

  const channels = [
    profile?.email
      ? {
          label: "Email",
          number: "01",
          title: profile.email,
          description: "For internship opportunities, introductions, and project conversations.",
          href: "mailto:" + profile.email,
        }
      : null,
    profile?.linkedinUrl
      ? {
          label: "LinkedIn",
          number: "02",
          title: "Connect professionally",
          description: "Experience, education, and professional network.",
          href: profile.linkedinUrl,
        }
      : null,
    profile?.githubUrl
      ? {
          label: "GitHub",
          number: "03",
          title: "Explore my work",
          description: "Projects, source code, and experiments.",
          href: profile.githubUrl,
        }
      : null,
    profile?.whatsappUrl
      ? {
          label: "WhatsApp",
          number: "04",
          title: "Start a conversation",
          description: "A direct channel for a quick professional chat.",
          href: profile.whatsappUrl,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    number: string;
    title: string;
    description: string;
    href: string;
  }>;

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s make the next conversation easy.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="cosmic-panel overflow-hidden rounded-[2.2rem]">
          <div className="relative bg-[#09070e] p-2">
            <div className="pointer-events-none absolute inset-[-5rem] rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute right-8 top-8 size-36 rounded-full border border-primary/20" />
            <div className="relative overflow-hidden rounded-[1.9rem] bg-black">
              {profile?.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt={profileName}
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="grid aspect-[4/5] place-items-center text-sm text-white/70">Profile photo</div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                <span className="hud-label rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-white/82 backdrop-blur">Profile</span>
                <span className="hud-label rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary backdrop-blur">Available</span>
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <p className="hud-label text-white/55">Gabriella / software engineering</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">{profileName}</h3>
                <p className="mt-1 text-sm font-semibold text-white/72">{profileHeadline}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="hud-label text-primary">Based in</p>
              <span className="hud-label text-[#4a4253]/58">{profile?.location ?? "Bekasi, Indonesia"}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#3f3747]/82">
              I’m open to internship opportunities, collaboration, and conversations around products, software, and the work behind them.
            </p>
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal className="cosmic-panel rounded-[2.2rem] p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="signal-dot" />
                <span className="hud-label text-primary">Open channel</span>
              </div>
              <span className="hud-number text-[10px] font-bold text-[#4a4253]/55">Direct contact</span>
            </div>

            <h3 className="mt-5 max-w-2xl text-3xl font-black tracking-[-0.055em] text-[#15121b] sm:text-4xl">
              One good conversation can start a lot.
            </h3>
            <p className="mt-5 max-w-xl leading-7 text-[#3f3747]/82">
              Choose the channel that fits. No forms, no middle layer — just a direct way to reach me.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((channel, index) => (
              <Reveal key={channel.label} delay={index * 60} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/25">
                <a
                  href={channel.href}
                  target={channel.label === "Email" ? undefined : "_blank"}
                  rel={channel.label === "Email" ? undefined : "noreferrer"}
                  className="block"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="hud-label text-primary">{channel.label} / {channel.number}</p>
                    <span className="grid size-8 place-items-center rounded-full border border-[#302140]/10 bg-[#f4f1f8] text-sm font-black text-[#3b3344] transition group-hover:border-primary/20 group-hover:bg-primary/[0.08] group-hover:text-primary">
                      ↗
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-black text-[#15121b]">{channel.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#4a4253]/72">{channel.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
