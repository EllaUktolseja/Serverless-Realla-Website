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
    <section id={id} className={`relative border-b border-border/70 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-5 border-b border-border/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            {eyebrow && (
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                {eyebrow}
              </div>
            )}
            <h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-0.045em] sm:text-4xl lg:text-5xl">{title}</h2>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Realla / portfolio</span>
        </div>
        <div className="pt-10">{children}</div>
      </div>
    </section>
  );
}

export default Section;
