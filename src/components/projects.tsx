import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MemberCard, MemberCardDescription, MemberCardHeader, MemberCardTitle } from '@/components/ui/member-card'

interface ArticleProps {
  title: string;
  summary: string;
  imageSrc: string;
  link: string;
}

const articleList: ArticleProps[] = [
  {
    title: "PVDX",
    summary:
      "The primary mission of the Perovskite Visuals and Degradation eXperiment is to test next-generation, highly efficient perovskite solar cells in low-Earth orbit in collaboration with the Padture lab.",
    imageSrc: "/projects/PVDX.png",
    link: "https://www.brown.edu/news/2021-04-21/cubesat",
  },
  {
    title: "EQUiSat",
    summary:
      "Our EQUISat project was a 1U CubeSat designed and built by students, launched in 2018 with the mission of testing a battery technology that had never flown in space. ",
    imageSrc: "/projects/Equisat.png",
    link: "https://en.wikipedia.org/wiki/EQUiSat",
  },
  {
    title: "SBUDNIC",
    summary:
      "The SPUDNIC 3U CubeSat, launched in 2022, demonstrated a practical, low-cost drag sail to cut down on space debris.",
    imageSrc: "/projects/marco-sbudnic.jpg",
    link: "https://www.sbudnic.space/home",
  },
  
];

export const Projects = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true , margin: "0px 0px -250px 0px"});

  const cardControls = useAnimation();

  useEffect(() => {
    if (inView) {
      cardControls.start("visible");
    }
  }, [inView, cardControls]);

  // Motion Variants
  const cardVariants = [
    {
      hidden: { opacity: 0, x: -100 }, // From the left
      visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", duration: 1 },
      },
    },
    {
      hidden: { opacity: 0, x: 100 }, // From the right
      visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", duration: 1 },
      },
    },
    {
      hidden: { opacity: 0, y: 100 }, // From the bottom
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 1 },
      },
    },
  ];

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
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Learn All About Our Projects</h2>

        <div className="flex flex-col gap-8 w-full">
          {/* First row: Centered with three articles */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-8">
            {articleList.slice(0, 3).map(({ title, summary, imageSrc, link }: ArticleProps, index) => (
              <motion.div
                key={index}
                className={`w-full max-w-md mx-auto cursor-pointer ${index === 2 ? "lg:hidden md:hidden xl:block" : ""}`}
                initial="hidden"
                animate={cardControls}
                whileHover={{ scale: 1.05 }} // Hover effect
                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Spring animation
                variants={cardVariants[index % 3]} // Cycle through the variants
                onClick={() => handleCardClick(link)}
              >
                <MemberCard className="w-full h-[450px] flex flex-col group">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:filter-none group-hover:grayscale-0 filter grayscale transition duration-300 ease-in-out overflow-hidden"
                  />
                  <MemberCardHeader className="flex-1 p-4 flex flex-col gap-y-12">
                    <MemberCardTitle className="text-lg font-semibold">{title}</MemberCardTitle>
                    <MemberCardDescription className="text-md text-muted-foreground overflow-hidden text-ellipsis">
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
