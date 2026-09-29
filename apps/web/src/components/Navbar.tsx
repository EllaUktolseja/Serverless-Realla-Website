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
          "relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 overflow-hidden rounded-[1.35rem] border px-2 transition-all duration-500 pointer-events-auto backdrop-saturate-150",
          scrolled
            ? "min-h-14 border-white/60 bg-card/62 shadow-2xl shadow-foreground/[0.08] backdrop-blur-2xl"
            : "min-h-16 border-border/80 bg-background/78 shadow-lg shadow-foreground/[0.04] backdrop-blur-xl",
        ].join(" ")}
      >
        <div className="prism-sheen pointer-events-none absolute inset-0 opacity-80" />
        <div className="pointer-events-none absolute inset-x-5 bottom-0 z-20 h-px overflow-hidden bg-white/10">
          <div
            className="h-full origin-left bg-primary shadow-[0_0_12px_var(--primary)] transition-[width] duration-150"
            style={{ width: scrollProgress + "%" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.52_0.24_293_/_0.45),transparent)]" />

        <a href="/" onClick={(event) => navigate(event, "/")} className="group relative z-10 flex shrink-0 items-center gap-3 px-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-sm font-black text-background shadow-sm transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">R</span>
          <span className="text-[15px] font-black tracking-[-0.02em]">Realla<span className="text-primary">.</span></span>
        </a>

        <nav className="relative z-10 hidden items-center gap-1 rounded-xl border border-white/45 bg-white/35 p-1 shadow-inner backdrop-blur md:flex dark:bg-white/5">
          {links.map(([href, label]) => {
            const active = isActive(href);

            return (
              <a key={href} href={href} onClick={(event) => navigate(event, href)}
                className={[
                  "relative rounded-lg px-3.5 py-2 text-[12px] font-bold transition-all lg:px-4",
                  active ? "bg-card/90 text-foreground shadow-sm" : "text-muted-foreground hover:bg-card/40 hover:text-foreground",
                ].join(" ")}
              >
                {label}
                {active && <span className="absolute inset-x-3 -bottom-0.5 mx-auto h-px rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />}
              </a>
            );
          })}
        </nav>

        <a href="/contact" onClick={(event) => navigate(event, "/contact")}
          className="relative z-10 hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-black text-primary-foreground shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 lg:inline-flex">
          Let’s connect <span>↗</span>
        </a>

        <button type="button" className="relative z-10 inline-flex rounded-xl border border-border/80 bg-card/75 px-3.5 py-2.5 text-xs font-black backdrop-blur md:hidden"
          aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="pointer-events-auto relative mx-auto mt-2 max-w-7xl rounded-2xl border border-border/80 bg-background/92 p-2 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={(event) => navigate(event, href)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${isActive(href) ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                {label}
              </a>
            ))}
            <a href="/contact" onClick={(event) => navigate(event, "/contact")}
              className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-black text-primary-foreground">
              Let’s connect ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
