import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getProfile } from "@/services/api";
import type { Profile } from "@/types/portfolio";

function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s connect."
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10">
          <p className="text-sm font-semibold text-primary-foreground/70">
            Open to meaningful connections
          </p>
          <h3 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
            Let’s talk about opportunities, ideas, and things worth building.
          </h3>
          <p className="mt-5 max-w-xl leading-7 text-primary-foreground/75">
            Whether you want to discuss a project, an internship opportunity,
            collaboration, or simply connect professionally, you can reach me
            through any of the channels here.
          </p>

          {profile?.location && (
            <p className="mt-8 text-sm text-primary-foreground/65">
              Based in {profile.location}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary"
            >
              <p className="text-sm font-semibold text-muted-foreground">Email</p>
              <p className="mt-3 break-all font-semibold group-hover:underline">
                {profile.email}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Send me a direct message
              </p>
            </a>
          )}

          {profile?.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary"
            >
              <p className="text-sm font-semibold text-muted-foreground">LinkedIn</p>
              <p className="mt-3 font-semibold group-hover:underline">Connect professionally ↗</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Experience, education, and professional network
              </p>
            </a>
          )}

          {profile?.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary"
            >
              <p className="text-sm font-semibold text-muted-foreground">GitHub</p>
              <p className="mt-3 font-semibold group-hover:underline">Explore my work ↗</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Projects, code, and ongoing experiments
              </p>
            </a>
          )}

          {profile?.whatsappUrl && (
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary"
            >
              <p className="text-sm font-semibold text-muted-foreground">WhatsApp</p>
              <p className="mt-3 font-semibold group-hover:underline">Message me ↗</p>
              <p className="mt-2 text-sm text-muted-foreground">
                A quick way to start a conversation
              </p>
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}

export default Contact;
