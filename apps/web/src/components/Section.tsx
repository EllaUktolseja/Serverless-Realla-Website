import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

function Section({ id, eyebrow, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={"space-section starlight-section " + className}>
      <div className="pointer-events-none absolute -right-40 top-10 size-[28rem] rounded-full bg-primary/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-[linear-gradient(90deg,oklch(0.69_0.28_300_/_0.45),transparent)]" />
      <div className="space-container px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-6 border-b border-white/8 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            {eyebrow && (
              <div className="hud-label flex items-center gap-3 text-primary">
                <span className="signal-dot" />
                {eyebrow}
              </div>
            )}
            <h2 className="mt-4 text-3xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          <span className="hud-label text-[#160f20]/55">Realla / personal portfolio</span>
        </div>
        <div className="pt-9">{children}</div>
      </div>
    </section>
  );
}

export default Section;
