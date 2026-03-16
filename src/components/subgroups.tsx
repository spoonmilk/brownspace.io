import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const subgroupData = [
  {
    team: "ADCS",
    label: "01",
    description:
      "Attitude Determination & Control Systems (ADCS) is responsible for identifying and maintaining the proper orientation of PVDX as it orbits in space, by collecting data from onboard sensors such as magnetometers and combining them with knowledge of previous states.",
    imageUrl: "/subgroups/adcs-photo.jpg",
  },
  {
    team: "Avionics",
    label: "02",
    description:
      "Avionics is responsible for PVDX's electrical systems. From solar panels to compute boards, Avionics members have stake in the operations of every aspect of PVDX.",
    imageUrl: "/subgroups/avionics_photo.png",
  },
  {
    team: "Flight Software",
    label: "03",
    description:
      "Flight Software (FSW) is tasked with hardware-software integration, merging PVDX's complex array of sensors and actuators into a central operating system (PVDxOS) that manages satellite internal systems, communicates with BSE's ground station, and facilitates PVDX's scientific goals.",
    imageUrl: "/subgroups/fsw-photo.JPEG",
  },
  {
    team: "Ground Software",
    label: "04",
    description:
      "Ground Software (GSW) is tasked with facilitating ground-space communication for PVDX, developing a web app to allow student interaction with PVDX, and handling BSE's web presence. Members learn to work with \"the fullest stack\" — from web development to high frequency radio communication.",
    imageUrl: "/subgroups/gsw-photo.jpg",
  },
  {
    team: "Operations",
    label: "05",
    description:
      "Handles fundraising, sponsorships, orders, and events for the organization.",
    imageUrl: "/subgroups/operations-photo.jpg",
  },
  {
    team: "R&D",
    label: "06",
    description:
      "Focuses on unique, space-related research projects outside the scope of BSE's bigger projects. Last year, R&D competed in the Plant the Moon Challenge, experimenting with cacti growth in lunar highlight and mare simulant, and winning the award for Best Analysis of Data.",
    imageUrl: "logo.png",
  },
  {
    team: "Structures",
    label: "07",
    description:
      "Designs, manufactures and tests a majority of the components of the physical satellite. There are many independent projects operating within the structures subgroup: chassis, arm mechanism, internal structures, external structures and testing.",
    imageUrl: "/subgroups/structures-photo.jpg",
  },
];

const Subgroup = ({
  subgroupName,
  label,
  description,
  imageUrl,
}: {
  subgroupName: string;
  label: string;
  description: string;
  imageUrl: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className="flex justify-center items-center mb-20 w-3/4 md:w-1/2 mx-auto"
    >
      <div className="w-full border glow-border rounded-lg overflow-hidden bg-card">
        <div className="relative">
          <img
            src={imageUrl}
            alt={subgroupName}
            width={500}
            height={200}
            className="w-full h-144 object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Label badge */}
          <div className="absolute top-3 left-3 mono text-xs text-white/60 bg-black/40 px-2 py-1 rounded">
            SBG-{label}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="signal-dot" />
            <h2 className="text-xl font-bold">{subgroupName}</h2>
          </div>
          <div className="horizon mb-3" />
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const Subgroups = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-16 mt-10">
        <div className="section-tag justify-center mb-4">Subgroups</div>
        <h1 className="text-3xl font-bold">Explore Subgroups</h1>
      </div>

      <div className="overflow-hidden w-full">
        {subgroupData.map((group, index) => (
          <Subgroup
            key={index}
            subgroupName={group.team}
            label={group.label}
            description={group.description}
            imageUrl={group.imageUrl}
          />
        ))}
      </div>

      <div className="text-center mt-4 mb-12">
        <div className="horizon w-48 mx-auto mb-4" />
        <p className="mono text-sm text-muted-foreground">
          INTERESTED IN JOINING? REACH OUT TO US.
        </p>
      </div>
    </div>
  );
};
