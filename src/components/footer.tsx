export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <img src="icon.png" alt="Brown Space Engineering Logo" className="w-15 dark:invert" />
        <img src="brownengn.png" alt="Brown School of Engineering Logo" className="w-15 dark:hidden" />
        <img src="brownengn_whtxt.png" alt="Brown School of Engineering Logo" className="w-15 hidden dark:block" />
        <a href="https://github.com/BrownSpaceEngineering" target="_blank" rel="noopener noreferrer">
          <img src="/github-mark.svg" alt="GitHub Logo" className="w-20 dark:invert" />
        </a>
     </section>
    </footer>
  );
};
