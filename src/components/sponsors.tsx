import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"  // Ensure Card component from Shadcn UI
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export const Sponsors = () => {
  return (
    <div>
      <div>
        <div className="container px-4 py-12 md:py-24">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Sponsors</h1>
            <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Thank you to our sponsors, who enable us to continue making space accessible.
            </p>
          </div>
        </div>
      </div>
      <div className="container px-4 pb-12 md:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <a href="https://engineering.brown.edu/">
            <SponsorCard tier="School Sponsor" img="/sponsor_logos/soe_logo.jpg" imgAlt="Brown School of Engineering" scale={1.2} desc="The School of Engineering at Brown University offers degrees in a wide variety of engineering disciplines and emphasizes the power of interdisciplinary thought."/>
          </a>
          <a href="https://www.onshape.com/en/">
            <SponsorCard tier="Platinum" img="/sponsor_logos/onshape_logo.png" imgAlt="Onshape" desc="Onshape is a cloud-native product development platform that delivers professional-grade CAD capabilities with next-generation product data management (PDM), powering agile design processes at lower costs."/>
          </a>
          <a href="https://cubecom.space/connect/#text-form">
            <SponsorCard tier="Platinum" img="/sponsor_logos/cubecom_logo.jpg" imgAlt="CUBECOM" scale={0.8} desc="CUBECOM designs, develops and manufactures reliable communication sub-systems for satellites, with a range of high datarate antennas and transmitters."/>
          </a>
        </div>
        <div className="flex justify-center mt-16">
          <Button variant="outline" size="sm" className="text-lg" onClick={() => {
              window.location.href='https://drive.google.com/file/d/1dP9w72XERuV0gbTzaK4wEZiP7xyGBAXr/view?usp=sharing';
          }}>
            Sponsor Us!
          </Button>
        </div>
      </div>
    </div>
  )
}


const SponsorCard = ({ tier, img, imgAlt, scale=1, desc }: {tier: string, img: string, imgAlt: string, scale?: number, desc?: string}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="w-full h-full"
    >
      <Card className="w-full max-w-xs border shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1  dark:hover:z-10 dark:focus-visible:ring-gray-300 flex flex-col h-full">
        <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">{tier}</h2>
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
