import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import open_source from "../assets/open-source.svg";
import collaborative from "../assets/collaborative.svg";
import cutting_edge from "../assets/cutting-edge.svg";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Open Source", 
    description:
      "BSE is committed to making space accessible, with all of our projects being open source and available to the public.",
    icon: <img src={ open_source } className="w-[25px] h-auto opacity dark:invert" />,
  },
  {
    title: "Collaborative",
    description:
      "Our subgroups are comprised of students from all disciplines and experience levels, united under a passion for spaceflight.",
    icon: <img src={ collaborative } className="w-[30px] h-auto dark:invert" />,
  },
  {
    title: "Cutting Edge",
    description:
      "From novel control algorithms to compliant deployment systems, we push the limits of student engineering.",
    icon: <img src={ cutting_edge } className="w-[30px] h-auto dark:invert" />,
  },
];

function Model() {
  const { scene } = useGLTF("/pvdsmall.glb"); 
  const ref = useRef<any>();

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as any).isMesh && (child as any).material) {
        const material = (child as any).material;
        material.metalness = 0.8;
        material.roughness = 0.4;
        material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; 
    }
  });

  return (
    <primitive 
      object={scene}
      ref={ref}
      scale={300}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const controls = useAnimation();
  const [grayscale, setGrayscale] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setTimeout(() => setGrayscale(true), 2000); // Grayscale applied 2 seconds after animations
    }
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className="container pb-32 scale-90">
      <motion.div
        className="grid lg:grid-cols-[650px,1fr] gap-8 place-items-center overflow-visible"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.6 } },
        }}
      >
        {/* Text Content */}
        <motion.div
          className="w-full z-[45]"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ type: "spring", stiffness: 200, duration: 2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Brown University's Largest Undergraduate Engineering Club
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 padding-bottom-8">
            Brown Space Engineering is a student-run spaceflight engineering club committed to a philosophy
            of accessibility, inclusion, do-it-yourself learning. The largest engineering club at Brown, BSE involves
            students of all disciplines, experience levels, and backgrounds in the design, construction, and operation of
            CubeSats and other space-related engineering projects.
          </p>
          <div className="flex flex-row gap-8 items-start">
            <div className="flex flex-col gap-4">
              {serviceList.map(({ icon, title, description }: ServiceProps) => (
                <motion.div
                  key={title}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { scale: 1.01, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, duration: 2 } },
                    hover: { scale: 1.05, filter: "grayscale(0%)", transition: { type: "spring", stiffness: 300 } },
                    unhover: { scale: 1, filter: "grayscale(100%)", transition: { type: "spring", stiffness: 300 } },
                  }}
                  whileHover="hover"
                  animate={grayscale ? "unhover" : controls}
                  initial="hidden"
                >
                  <Card>
                    <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-2 max-h-[135px]">
                      <div className="mt-0.5 bg-primary/20 p-1.5 mr-2 rounded-2xl">
                        {icon}
                      </div>
                      <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="text-md mt-2 line-clamp-2">
                          {description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <Canvas 
          className="hidden w-full max-w-[300px] md:min-w-[700px] lg:max-w-[700px] lg:block absolute top-[50px]"
          camera={{ position: [110, 110, 120], fov: 50 }} // Initial camera position
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          {/* Add an environment for realistic reflections */}
          <Environment preset="studio" background={false} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls target={[0, 0, 0]} />
        </Canvas>
      </motion.div>
    </section>
  );
};
