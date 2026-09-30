import { useEffect, useState, type MouseEvent } from "react";

const links = [
  ["/", "Home"],
  ["/experience", "Experience"],
  ["/tech-stack", "Tech Stack"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("/") || href.includes("://")) return;
    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function isActive(href: string) {
    return pathname === href || (href === "/projects" && pathname.startsWith("/projects/"));
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={[
          "relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 overflow-hidden rounded-2xl border px-2 transition-all duration-500 pointer-events-auto",
          scrolled
            ? "min-h-14 border-[#2f1b46]/10 bg-white/88 shadow-xl shadow-[#35214d]/10 backdrop-blur-xl"
            : "min-h-16 border-[#2f1b46]/10 bg-white/78 shadow-lg shadow-[#35214d]/8 backdrop-blur-xl",
        ].join(" ")}
      >
        <div className="prism-sheen pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-x-5 bottom-0 z-20 h-px overflow-hidden bg-[#2f1b46]/10">
          <div
            className="h-full origin-left bg-primary shadow-[0_0_16px_oklch(0.69_0.28_300_/_0.8)] transition-[width] duration-150"
            style={{ width: scrollProgress + "%" }}
          />
        </div>

        <a
          href="/"
          onClick={(event) => navigate(event, "/")}
          className="group relative z-10 flex shrink-0 items-center gap-3 px-2.5"
        >
          <span className="relative grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-sm font-black text-primary shadow-[0_0_24px_oklch(0.69_0.28_300_/_0.16)] transition duration-300 group-hover:scale-105">
            <span className="absolute inset-1.5 rounded-full border border-primary/35" />
            R
          </span>
          <span>
            <span className="block text-[14px] font-black tracking-[-0.02em] text-[#160f20]">Realla<span className="text-primary">.</span></span>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/30 sm:block">Software engineering / on duty</span>
          </span>
        </a>

        <div className="relative z-10 hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-1 rounded-xl border border-[#2f1b46]/10 bg-[#3f245c]/[0.035] p-1">
            {links.map(([href, label]) => {
              const active = isActive(href);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(event) => navigate(event, href)}
                  className={[
                    "relative rounded-lg px-3.5 py-2 text-[11px] font-bold transition-all lg:px-4",
                    active
                      ? "bg-primary/8 text-[#160f20] shadow-[inset_0_0_0_1px_rgba(124,58,237,0.06)]"
                      : "text-[#160f20]/50 hover:bg-[#3f245c]/[0.035] hover:text-[#160f20]",
                  ].join(" ")}
                >
                  {label}
                  {active && <span className="absolute inset-x-4 -bottom-0.5 mx-auto h-px rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#160f20]/48 xl:flex">
            <span className="signal-dot" />
            On duty
          </div>
        </div>

        <a
          href="/contact"
          onClick={(event) => navigate(event, "/contact")}
          className="hud-button relative z-10 hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[11px] font-black text-primary-foreground shadow-[0_12px_30px_oklch(0.69_0.28_300_/_0.18)] transition hover:-translate-y-0.5 lg:inline-flex"
        >
          Contact me <span aria-hidden>↗</span>
        </a>

        <button
          type="button"
          className="relative z-10 inline-flex rounded-xl border border-[#2f1b46]/10 bg-[#3f245c]/[0.035] px-3.5 py-2.5 text-[11px] font-black text-[#160f20] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="pointer-events-auto relative mx-auto mt-2 max-w-7xl rounded-2xl border border-primary/15 bg-white/96 p-2 shadow-xl shadow-[#35214d]/12 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(event) => navigate(event, href)}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-bold transition",
                  isActive(href) ? "bg-primary/8 text-primary" : "text-[#160f20]/55 hover:bg-[#3f245c]/[0.035] hover:text-[#160f20]",
                ].join(" ")}
              >
                {label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(event) => navigate(event, "/contact")}
              className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-black text-primary-foreground"
            >
              Contact me ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
