import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageSrc: "/2024.png",
    link: "https://en.wikipedia.org/wiki/EQUiSat",
  },
  {
    title: "EQUiSat",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageSrc: "/2024.png",
    link: "https://en.wikipedia.org/wiki/EQUiSat",
  },
  {
    title: "SBUDNIC",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageSrc: "/2024.png",
    link: "https://en.wikipedia.org/wiki/EQUiSat",
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
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Learn All About Our Past Projects</h2>

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
                <Card className="w-full h-[450px] flex flex-col group">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:filter-none group-hover:grayscale-0 filter grayscale transition duration-300 ease-in-out overflow-hidden"
                  />
                  <CardHeader className="flex-1 p-4 flex flex-col justify-between space-y-2">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    <CardDescription className="text-md mt-2 text-muted-foreground overflow-hidden text-ellipsis">
                      {summary}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Second row: Centered with two articles */}
          <div className="hidden xl:col-span-3 xl:flex xl:justify-center xl:gap-8">
            {articleList.slice(3, 5).map(({ title, summary, imageSrc, link }: ArticleProps, index) => (
              <motion.div
                key={index + 3}
                className="w-full max-w-md cursor-pointer"
                initial="hidden"
                animate={cardControls}
                whileHover={{ scale: 1.05 }} // Hover effect
                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Spring animation
                variants={cardVariants[(index + 1) % 3]} // Cycle variants differently
                onClick={() => handleCardClick(link)}
              >
                <Card className="w-full h-[450px] flex flex-col group">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:filter-none group-hover:grayscale-0 filter grayscale transition duration-300 ease-in-out overflow-hidden"
                  />
                  <CardHeader className="flex-1 p-4 flex flex-col justify-between space-y-2">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    <CardDescription className="text-md mt-2 text-muted-foreground overflow-hidden text-ellipsis">
                      {summary}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
