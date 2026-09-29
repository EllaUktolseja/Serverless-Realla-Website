function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-7 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-sm font-black tracking-tight">Realla<span className="text-primary">.</span></p>
          <p className="mt-1 text-xs text-muted-foreground">Building ideas into digital experiences.</p>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold text-muted-foreground">
          <span>© {new Date().getFullYear()} Gabriella Uktolseja</span>
          <a href="#hero" className="transition-colors hover:text-primary">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
