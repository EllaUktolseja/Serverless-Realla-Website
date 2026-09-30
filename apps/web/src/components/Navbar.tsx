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

  const missionPage =
    pathname === "/tech-stack" ||
    pathname === "/projects" ||
    pathname.startsWith("/projects/");

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

  const navText = missionPage ? "text-white/72" : "text-[#231c2b]/62";
  const navHover = missionPage ? "hover:bg-white/[0.05] hover:text-white" : "hover:bg-[#3f245c]/[0.05] hover:text-[#15121b]";
  const shell = missionPage
    ? (scrolled ? "border-white/10 bg-[#05030a]/92 shadow-xl shadow-black/30" : "border-white/10 bg-[#08060d]/82 shadow-lg shadow-black/20")
    : (scrolled ? "border-[#302140]/10 bg-white/92 shadow-xl shadow-[#35214d]/10" : "border-[#302140]/10 bg-white/82 shadow-lg shadow-[#35214d]/7");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className={"relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 overflow-hidden rounded-2xl border px-2 backdrop-blur-xl transition-all duration-300 pointer-events-auto " + shell}>
        <div className="pointer-events-none absolute inset-x-5 bottom-0 z-20 h-px bg-current/10">
          <div className="h-full origin-left bg-primary shadow-[0_0_12px_rgba(124,58,237,0.8)] transition-[width] duration-150" style={{ width: scrollProgress + "%" }} />
        </div>

        <a href="/" onClick={(event) => navigate(event, "/")} className="group relative z-10 flex shrink-0 items-center gap-3 px-2.5">
          <span className="relative grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-sm font-black text-primary transition group-hover:scale-105">
            <span className="absolute inset-1.5 rounded-full border border-primary/35" />
            R
          </span>
          <span>
            <span className={"block text-[14px] font-black tracking-[-0.02em] " + (missionPage ? "text-white" : "text-[#15121b]")}>Realla<span className="text-primary">.</span></span>
            <span className={"hidden font-mono text-[8px] uppercase tracking-[0.18em] sm:block " + (missionPage ? "text-white/38" : "text-[#15121b]/44")}>Software engineering / on duty</span>
          </span>
        </a>

        <div className="relative z-10 hidden items-center gap-4 md:flex">
          <nav className={"flex items-center gap-1 rounded-xl border p-1 " + (missionPage ? "border-white/10 bg-white/[0.035]" : "border-[#302140]/10 bg-[#3f245c]/[0.035]")}>
            {links.map(([href, label]) => {
              const active = isActive(href);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(event) => navigate(event, href)}
                  aria-current={active ? "page" : undefined}
                  className={"relative rounded-lg px-3.5 py-2 text-[11px] font-bold transition-all lg:px-4 " + (active
                    ? "bg-primary/10 text-primary"
                    : navText + " " + navHover)}
                >
                  {label}
                  {active && <span className="absolute inset-x-4 -bottom-0.5 mx-auto h-px rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.8)]" />}
                </a>
              );
            })}
          </nav>

          <div className={"hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] xl:flex " + (missionPage ? "text-white/42" : "text-[#15121b]/46")}>
            <span className="signal-dot" />
            On duty
          </div>
        </div>

        <a
          href="/contact"
          onClick={(event) => navigate(event, "/contact")}
          className="hud-button relative z-10 hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[11px] font-black text-white shadow-[0_10px_28px_rgba(124,58,237,0.20)] lg:inline-flex"
        >
          Contact me <span aria-hidden>↗</span>
        </a>

        <button
          type="button"
          className={"relative z-10 inline-flex rounded-xl border px-3.5 py-2.5 text-[11px] font-black md:hidden " + (missionPage ? "border-white/10 bg-white/[0.035] text-white" : "border-[#302140]/10 bg-[#3f245c]/[0.04] text-[#15121b]")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className={"pointer-events-auto relative mx-auto mt-2 max-w-7xl rounded-2xl border p-2 shadow-xl backdrop-blur-2xl md:hidden " + (missionPage
            ? "border-white/10 bg-[#08060d]/96 shadow-black/30"
            : "border-[#302140]/10 bg-white/96 shadow-[#35214d]/10")}
        >
          <div className="flex flex-col gap-1">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(event) => navigate(event, href)}
                aria-current={isActive(href) ? "page" : undefined}
                className={"rounded-xl px-4 py-3 text-sm font-bold transition " + (isActive(href)
                  ? "bg-primary/10 text-primary"
                  : (missionPage ? "text-white/72 hover:bg-white/[0.05] hover:text-white" : "text-[#15121b]/58 hover:bg-[#3f245c]/[0.04] hover:text-[#15121b]"))}
              >
                {label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(event) => navigate(event, "/contact")}
              className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-black text-white"
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
