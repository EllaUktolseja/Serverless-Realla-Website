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
    <Section id="contact" className="starlight-section" eyebrow="Contact" title="Open a channel.">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="cosmic-panel overflow-hidden rounded-[2rem]">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-black">
              {profile?.imageUrl ? (
                <img src={profile.imageUrl} alt={profileName} className="size-full object-cover object-top transition duration-1000 hover:scale-[1.02]" />
              ) : (
                <div className="grid size-full place-items-center text-sm text-[#160f20]/30">Profile photo</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-primary/6" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="hud-label rounded-full border border-[#2f1b46]/10 bg-black/35 px-3 py-1.5 text-[#160f20]/68 backdrop-blur">Profile / 01</span>
                <span className="hud-label rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary backdrop-blur">Online</span>
              </div>
            </div>

            <div className="relative p-6 sm:p-7">
              <p className="hud-label text-primary">Profile</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#160f20]">{profileName}</h3>
              <p className="mt-1 text-sm font-semibold text-[#160f20]/45">{profileHeadline}</p>
              <p className="mt-5 text-sm leading-7 text-[#160f20]/68">A computer science student who enjoys turning ideas into thoughtful digital experiences, learning through hands-on projects, and building things that are useful in the real world.</p>
              {profile?.location && <p className="mt-5 hud-label text-[#160f20]/55">Coordinates / {profile.location}</p>}
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal className="cosmic-panel scanline rounded-[2rem] bg-[radial-gradient(circle_at_82%_10%,rgba(139,92,246,0.12),transparent_30rem),linear-gradient(145deg,#ffffff,#f7f3fc)] p-7 sm:p-10">
            <div className="relative">
              <div className="flex items-center gap-2.5">
                <span className="signal-dot" />
                <span className="hud-label text-primary">Transmission ready</span>
              </div>
              <h3 className="mt-4 max-w-xl text-3xl font-black tracking-[-0.055em] text-[#160f20] sm:text-4xl">Let’s talk about opportunities, ideas, and things worth building.</h3>
              <p className="mt-5 max-w-xl leading-7 text-[#2f223e]/68">Whether it’s an internship opportunity, collaboration, project discussion, or a professional introduction, these channels go directly to me.</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile?.email && (
              <Reveal className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/22">
                <a href={"mailto:" + profile.email} className="block">
                  <p className="hud-label text-primary">Email / 01</p>
                  <p className="mt-3 break-all text-sm font-bold text-[#160f20]">{profile.email}</p>
                  <p className="mt-2 text-xs leading-5 text-[#160f20]/52">Send a direct message ↗</p>
                </a>
              </Reveal>
            )}

            {profile?.linkedinUrl && (
              <Reveal delay={60} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/22">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="block">
                  <p className="hud-label text-primary">LinkedIn / 02</p>
                  <p className="mt-3 text-sm font-bold text-[#160f20]">Connect professionally ↗</p>
                  <p className="mt-2 text-xs leading-5 text-[#160f20]/28">Experience, education, and network</p>
                </a>
              </Reveal>
            )}

            {profile?.githubUrl && (
              <Reveal delay={120} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/22">
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="block">
                  <p className="hud-label text-primary">GitHub / 03</p>
                  <p className="mt-3 text-sm font-bold text-[#160f20]">Explore my work ↗</p>
                  <p className="mt-2 text-xs leading-5 text-[#160f20]/28">Projects, code, and experiments</p>
                </a>
              </Reveal>
            )}

            {profile?.whatsappUrl && (
              <Reveal delay={180} className="cosmic-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/22">
                <a href={profile.whatsappUrl} target="_blank" rel="noreferrer" className="block">
                  <p className="hud-label text-primary">WhatsApp / 04</p>
                  <p className="mt-3 text-sm font-bold text-[#160f20]">Start a quick chat ↗</p>
                  <p className="mt-2 text-xs leading-5 text-[#160f20]/28">A direct conversation channel</p>
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
