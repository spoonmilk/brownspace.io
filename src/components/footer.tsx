export const Footer = () => {
  return (
    <footer id="footer">
      <div className="horizon w-11/12 mx-auto" />
      <section className="container py-16 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-8">
          <img src="/bse_logo.png" alt="Brown Space Engineering Logo" className="h-10 w-auto" />
          <img src="/brownengn.png" alt="Brown School of Engineering Logo" className="h-8 w-auto dark:hidden" />
          <img src="/brownengn_whtxt.png" alt="Brown School of Engineering Logo" className="h-8 w-auto hidden dark:block" />
          <a href="https://github.com/BrownSpaceEngineering" target="_blank" rel="noopener noreferrer">
            <img src="/github-mark.svg" alt="GitHub Logo" className="h-8 w-auto dark:invert opacity-70 hover:opacity-100 transition-opacity" />
          </a>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="signal-dot" />
          <p className="mono text-xs">BROWN SPACE ENGINEERING — PROVIDENCE, RI</p>
        </div>
      </section>
    </footer>
  );
};
