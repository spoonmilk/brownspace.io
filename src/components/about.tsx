import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import NumberTicker from "@/components/ui/number-ticker"; // Assuming correct import path
import Globe from "./ui/globe";
import { Separator } from "./ui/separator";

export const About = () => {
  interface statsProps {
    quantity: number;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: 892,
      description: "Engineering Hours",
    },
    {
      quantity: 32,
      description: "Members",
    },
    {
      quantity: 3,
      description: "Satellites",
    },
    {
      quantity: 6,
      description: "Teams",
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -50% 0px" });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, duration: 1 } },
  };

  return (
    <motion.section
      id="about"
      className="container pb-32 pt-16 scale-90"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <div className="bg-muted/0 border rounded-lg py-12">
        <motion.div
          className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12"
          variants={fadeUpVariants}
        >
          <motion.div
            className="w-[auto] lg:w-[1000px] min-w-[200px] justify-center object-contain rounded-lg"
            variants={fadeUpVariants}
          >
            <Globe />
          </motion.div>

          <motion.div className="bg-green-0 flex flex-col justify-between" variants={fadeUpVariants}>
            <div className="pb-6">
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                variants={fadeUpVariants}
              >
                About Brown Space Engineering
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground mt-4 line-clamp-5"
                variants={fadeUpVariants}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna libero, pretium congue tincidunt eu, sodales eu tortor. Morbi malesuada dapibus ante eu sodales. Ut cursus erat sed auctor vestibulum. Vivamus facilisis metus nunc. Etiam erat lectus, dapibus id sollicitudin vitae, dapibus eu leo.
              </motion.p>
            </div>

            <motion.section id="statistics" variants={fadeUpVariants} className="hidden lg:block">
              <div className="grid grid-cols-4 gap-8">
                {stats.map(({ quantity, description }: statsProps) => (
                  <motion.div
                    key={description}
                    className="space-y-2 text-center"
                    variants={fadeUpVariants}
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold ">
                      <NumberTicker value={quantity} />+
                    </h2>
                    <p className="text-xl text-muted-foreground">{description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
        <Separator className="my-4 lg:hidden w-[90%] mx-auto" />
        <motion.section id="statistics" variants={fadeUpVariants} className="pt-8 lg:hidden">
              <div className="grid grid-cols-4 gap-8">
                {stats.map(({ quantity, description }: statsProps) => (
                  <motion.div
                    key={description}
                    className="space-y-2 text-center"
                    variants={fadeUpVariants}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold ">
                      <NumberTicker value={quantity} />+
                    </h2>
                    <p className="text-xl text-muted-foreground">{description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
      </div>
    </motion.section>
  );
};
