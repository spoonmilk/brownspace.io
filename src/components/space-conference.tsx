import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { motion } from "framer-motion";

import { Instagram } from 'lucide-react';


const ISC = () => {
    return (
        <div className="mt-12">
            <h1 className="purple-fancy-title text-center text-8xl fade-in">Ivy Space Conference</h1>
            <div className="flex mt-8 w-3/4 mx-auto">
                <img src="Ivy Space Coalition.png"></img>
                <div className="bg-white"></div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                    type: "ease",
                    stiffness: 0,
                    duration: 0.5,
                    }}
                >
                    <Card className="bg-muted/50 relative mt-8 flex flex-col  items-center">
                        <CardTitle>
                            <h2 className="text-4xl mt-8 text-center isc-title">Join us for the 4th annual iteration!</h2>
                        </CardTitle>
                        
                        <p className="text-2xl mt-8"><span>Where: </span><span className="font-bold">Brown University</span></p>
                        <p className="text-2xl mt-8"><span>Dates: </span><span className="font-bold">April 5-6, 2025</span></p>
                        <p className="text-xl text-center mx-8 mt-8 font-semibold">
                            Want to join universities across the Ivy League and in the Boston area for two days of run panels, research discussions, and showcases?
                        </p>
                        <p className="text-xl text-center mx-8 mt-2 font-semibold">
                            Reach out to your University rocketry or cubesat club and have them contact us!
                        </p>
                        <div className="flex flex-row">
                            <p className="text-xl text-center ml-8 mr-2 my-8 font-semibold"> Reach out to us at <a href="https://www.instagram.com/ivyspaceco/">@ivyspaceco</a></p>
                            <a href="https://www.instagram.com/ivyspaceco/">
                                <Instagram className="mt-8 ml-0 text-pink-600 hover:text-pink-700"/>
                            </a>
                        </div>
                        
                    </Card>

                </motion.div>
            </div>
            <div className="speakers mt-12">
                <h1 className="red-fancy-title text-center text-6xl mb-8">Schedule</h1>
                <h1 className="red-fancy-title text-center text-6xl mb-8">Featuring Speakers From</h1>
                <div className="flex flex-row justify-center items-center mx-20">
                    <SectionCard name="speaker 1" img="member_images/gabriel-chen.jpg" imgAlt="placeholder" desc="gabe from brown" />
                    <SectionCard name="speaker 1" img="member_images/gabriel-chen.jpg" imgAlt="placeholder" desc="gabe from brown" />
                    <SectionCard name="speaker 1" img="member_images/gabriel-chen.jpg" imgAlt="placeholder" desc="gabe from brown" />
                    <SectionCard name="speaker 1" img="member_images/gabriel-chen.jpg" imgAlt="placeholder" desc="gabe from brown" />
                </div>
            </div>
        </div>

    )
}

const SectionCard = ({ name, img, imgAlt, scale=1, desc }: {name: string, img: string, imgAlt: string, scale?: number, desc?: string}) => {
    return (
      <motion.div
        whileHover={{
          scale: 1.01,
          transition: { type: "spring", stiffness: 300 }
        }}
        className="w-full h-full"
      >
        <Card className="w-full max-w-xs border shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1  dark:hover:z-10 dark:focus-visible:ring-gray-300 flex flex-col h-full">
          <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">{name}</h2>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center p-4">
            <img
              src={img}
              width="200"
              alt={imgAlt}
              className="object-contain object-center"
              style={{scale: `${scale}`}}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-end p-4">
            <p className="text-sm text-center">{desc}</p>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

export default ISC;