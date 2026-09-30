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

  return (
    <Section id="contact" eyebrow="Contact" title="Open a channel.">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="cosmic-panel overflow-hidden rounded-[2rem]">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-black">
              {profile?.imageUrl ? (
                <img src={profile.imageUrl} alt={profileName} className="size-full object-cover object-top transition duration-700 hover:scale-[1.02]" loading="lazy" />
              ) : (
                <div className="grid size-full place-items-center text-sm text-white/70">Profile photo</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-primary/6" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                <span className="hud-label rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-white/82 backdrop-blur">Profile / 01</span>
                <span className="hud-label rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary backdrop-blur">Online</span>
              </div>
            </div>

            <div className="relative p-6 sm:p-7">
              <p className="hud-label text-primary">Profile</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#15121b]">{profileName}</h3>
              <p className="mt-1 text-sm font-semibold text-[#15121b]/72">{profileHeadline}</p>
              <p className="mt-5 text-sm leading-7 text-[#3f3747]/82">A computer science student who enjoys turning ideas into thoughtful digital experiences, learning through hands-on projects, and building things that are useful in the real world.</p>
              {profile?.location && <p className="mt-5 hud-label text-[#4a4253]/72">{profile.location}</p>}
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal className="cosmic-panel rounded-[2rem] p-7 sm:p-10">
            <div className="relative">
              <div className="flex items-center gap-2.5">
                <span className="signal-dot" />
                <span className="hud-label text-primary">Let’s talk</span>
              </div>
              <h3 className="mt-4 max-w-xl text-3xl font-black tracking-[-0.055em] text-[#15121b] sm:text-4xl">Opportunities, ideas, and things worth building.</h3>
              <p className="mt-5 max-w-xl leading-7 text-[#3f3747]/82">Whether it’s an internship opportunity, collaboration, project discussion, or a professional introduction, these channels go directly to me.</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile?.email && (
              <Reveal className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/25">
                <a href={"mailto:" + profile.email} className="block">
                  <p className="hud-label text-primary">Email / 01</p>
                  <p className="mt-3 break-all text-sm font-bold text-[#15121b]">{profile.email}</p>
                  <p className="mt-2 text-xs leading-5 text-[#4a4253]/70">Send a direct message ↗</p>
                </a>
              </Reveal>
            )}

            {profile?.linkedinUrl && (
              <Reveal delay={60} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/25">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="block">
                  <p className="hud-label text-primary">LinkedIn / 02</p>
                  <p className="mt-3 text-sm font-bold text-[#15121b]">Connect professionally ↗</p>
                  <p className="mt-2 text-xs leading-5 text-[#4a4253]/70">Experience, education, and network</p>
                </a>
              </Reveal>
            )}

            {profile?.githubUrl && (
              <Reveal delay={120} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/25">
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="block">
                  <p className="hud-label text-primary">GitHub / 03</p>
                  <p className="mt-3 text-sm font-bold text-[#15121b]">Explore my work ↗</p>
                  <p className="mt-2 text-xs leading-5 text-[#4a4253]/70">Projects, code, and experiments</p>
                </a>
              </Reveal>
            )}

            {profile?.whatsappUrl && (
              <Reveal delay={180} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/25">
                <a href={profile.whatsappUrl} target="_blank" rel="noreferrer" className="block">
                  <p className="hud-label text-primary">WhatsApp / 04</p>
                  <p className="mt-3 text-sm font-bold text-[#15121b]">Start a quick chat ↗</p>
                  <p className="mt-2 text-xs leading-5 text-[#4a4253]/70">A direct conversation channel</p>
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
