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

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-border/80 bg-background/80 px-3 shadow-lg shadow-foreground/[0.03] backdrop-blur-2xl sm:px-4">
        <a href="/" onClick={(event) => navigate(event, "/")} className="group flex shrink-0 items-center gap-3 px-2">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-sm font-black text-background shadow-sm transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">R</span>
          <span className="text-[15px] font-black tracking-[-0.02em]">Realla<span className="text-primary">.</span></span>
        </a>

        <nav className="hidden items-center gap-1 rounded-xl bg-muted/70 p-1 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={(event) => navigate(event, href)}
              className={`relative rounded-lg px-3.5 py-2 text-[12px] font-bold transition-all lg:px-4 ${isActive(href) ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {label}
              {isActive(href) && <span className="absolute inset-x-3 -bottom-0.5 mx-auto h-px bg-primary" />}
            </a>
          ))}
        </nav>

        <a href="/contact" onClick={(event) => navigate(event, "/contact")}
          className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-black text-primary-foreground shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 lg:inline-flex">
          Let’s connect <span>↗</span>
        </a>

        <button type="button" className="inline-flex rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-black md:hidden"
          aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl md:hidden">
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
