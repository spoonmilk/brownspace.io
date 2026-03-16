import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MemberCard,
  MemberCardDescription,
  MemberCardHeader,
  MemberCardTitle,
} from "@/components/ui/member-card";

interface ArticleProps {
  title: string;
  summary: string;
  imageSrc: string;
  link: string;
  index: string;
}

const articleList: ArticleProps[] = [
  {
    title: "PVDX",
    index: "01",
    summary:
      "The primary mission of the Perovskite Visuals and Degradation eXperiment is to test next-generation, highly efficient perovskite solar cells in low-Earth orbit in collaboration with the Padture lab.",
    imageSrc: "/projects/PVDX.png",
    link: "https://www.brown.edu/news/2021-04-21/cubesat",
  },
  {
    title: "EQUiSat",
    index: "02",
    summary:
      "Our EQUISat project was a 1U CubeSat designed and built by students, launched in 2018 with the mission of testing a battery technology that had never flown in space.",
    imageSrc: "/projects/Equisat.png",
    link: "https://en.wikipedia.org/wiki/EQUiSat",
  },
  {
    title: "SBUDNIC",
    index: "03",
    summary:
      "The SBUDNIC 3U CubeSat, launched in 2022, demonstrated a practical, low-cost drag sail to cut down on space debris.",
    imageSrc: "/projects/marco-sbudnic.jpg",
    link: "https://www.sbudnic.space/home",
  },
];

export const Projects = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -250px 0px" });
  const cardControls = useAnimation();

  useEffect(() => {
    if (inView) cardControls.start("visible");
  }, [inView, cardControls]);

  const handleCardClick = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.location.href = link;
    } else {
      navigate(link);
    }
  };

  return (
    <section ref={ref} className="container scale-90 py-0">
      <div className="flex flex-col items-center text-center">
        <div className="section-tag justify-center mb-4">Projects</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Learn All About Our Projects
        </h2>

        <div className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-8">
            {articleList.map(({ title, summary, imageSrc, link, index }: ArticleProps, i) => (
              <motion.div
                key={i}
                className={`w-full max-w-md mx-auto cursor-pointer ${
                  i === 2 ? "lg:hidden md:hidden xl:block" : ""
                }`}
                initial="hidden"
                animate={cardControls}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleCardClick(link)}
              >
                <MemberCard className="w-full h-[450px] flex flex-col group glow-border overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={title}
                      className="w-full h-48 object-cover rounded-t-lg grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
                    />
                    {/* Index badge */}
                    <div className="absolute top-3 right-3 mono text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
                      {index}
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-lg" />
                  </div>
                  <MemberCardHeader className="flex-1 p-4 flex flex-col gap-y-4">
                    <div className="flex items-center gap-2">
                      <span className="signal-dot" />
                      <MemberCardTitle className="text-lg font-semibold">{title}</MemberCardTitle>
                    </div>
                    <div className="horizon" />
                    <MemberCardDescription className="text-sm text-muted-foreground text-left leading-relaxed">
                      {summary}
                    </MemberCardDescription>
                  </MemberCardHeader>
                </MemberCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
