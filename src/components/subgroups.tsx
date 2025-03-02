import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Subgroup = ({ subgroupName, description, imageUrl }: { subgroupName: string; description: string, imageUrl: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
      <motion.div ref={ref} style={{ y, scale, opacity }} className="flex justify-center items-center bg-zinc-900 p-4 rounded-lg shadow-lg mb-20 w-1/2 mx-auto">
          <div className="text-center">
              <img src={imageUrl} alt={subgroupName} width={500} height={200} className="mx-auto rounded-lg" />
              <h2 className="mt-4 text-xl font-semibold text-white pb-2">{subgroupName}</h2>
              <p className="text-white">{description}</p>
          </div>
      </motion.div>
  );
};

export const Subgroups = () => {

  return (
      <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-20">Explore Subgroups</h1>
          <div className="overflow-hidden w-full">
              {[
                  { team: 'ADCS', description: 'Attitude Determination & Control Systems (ADCS) is responsible for identifying and maintaining the proper orientation of PVDX as it orbits in space, by collecting data from onboard sensors such as magnetometers and combining them with knowledge of previous states.', imageUrl: '/subgroups/adcs-photo.jpg' },
                  { team: 'Avionics', description: "Avionics is responsible for all the electronic hardware aboard the CubeSat. This involves developing all aspects of the satellite's power system, from the solar panels, and batteries, all the way to distribution and sensing.", imageUrl: '/images/avionics.jpg' },
                  { team: 'Flight Software', description: 'Tasked with hardware-software integration, merging PVDX’s complex array of sensors and actuators into a central operating system that manages the transfer of information between the satellite and the ground station.' },
                  { team: 'Ground Software', description: 'Tasked with producing a web-app to allow student interaction with PVDX, managing our own website, and building a ground station to communicate with PVDx once in orbit.' },
                  { team: 'Operations', description: 'Handles fundraising, sponsorships, orders, and events for the organization.' },
                  { team: 'R&D', description: "Focuses on unique, space-related research projects outside the scope of BSE's bigger projects. Last year, R&D competed in the Plant the Moon Challenge, experimenting with cacti growth in lunar highlight and mare simulant, and winning the award for Best Analysis of Data." },
                  { team: 'Structures', description: 'Designs, manufactures and tests a majority of the components of the physical satellite. There are many independent projects operating within the structures subgroup: chassis, arm mechanism, internal structures, external structures and testing.', imageUrl: '/subgroups/structures-photo.jpg' },
              ].map((group, index) => (
                  <Subgroup key={index} subgroupName={group.team} description={group.description} imageUrl={group.imageUrl}/>
              ))}
          </div>
          <div className="text-center mt-12">
              <p className="text-lg text-gray-700">Interested in joining one of the subgroups? Reach out to us!</p>
          </div>
      </div>
  );
};
