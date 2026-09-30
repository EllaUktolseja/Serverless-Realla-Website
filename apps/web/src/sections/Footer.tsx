function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030309]">
      <div className="space-container flex flex-col gap-5 px-5 py-8 sm:px-7 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-lg border border-primary/20 bg-primary/8 font-mono text-[10px] font-black text-primary">R</span>
            <p className="text-sm font-black tracking-tight text-white">Realla<span className="text-primary">.</span></p>
          </div>
          <p className="mt-2 text-xs text-white/48">Building ideas into digital experiences.</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/42">
          <span>© {new Date().getFullYear()} Gabriella Uktolseja</span>
          <a href="#hero" className="transition-colors hover:text-primary">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
