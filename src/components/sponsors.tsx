import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Sponsors = () => {
  return (
    <div>
      <div className="container px-4 py-12 md:py-24">
        <div className="section-tag justify-center mb-4">Partners</div>
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Sponsors</h1>
          <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl/relaxed">
            Thank you to our sponsors, who enable us to continue making space accessible.
          </p>
        </div>
      </div>

      <div className="container px-4 pb-12 md:pb-24">
        <div className="horizon mb-12" />
        <div className="flex flex-wrap justify-center gap-8">
          <a href="https://engineering.brown.edu/">
            <SponsorCard
              tier="School Sponsor"
              img="/sponsor_logos/soe_logo.jpg"
              imgAlt="Brown School of Engineering"
              scale={1.2}
              desc="The School of Engineering at Brown University offers degrees in a wide variety of engineering disciplines and emphasizes the power of interdisciplinary thought."
            />
          </a>
          <a href="https://www.onshape.com/en/">
            <SponsorCard
              tier="Platinum"
              img="/sponsor_logos/onshape_logo.png"
              imgAlt="Onshape"
              desc="Onshape is a cloud-native product development platform that delivers professional-grade CAD capabilities with next-generation product data management (PDM), powering agile design processes at lower costs."
            />
          </a>
          <a href="https://cubecom.space/connect/#text-form">
            <SponsorCard
              tier="Platinum"
              img="/sponsor_logos/cubecom_logo.jpg"
              imgAlt="CUBECOM"
              scale={0.8}
              desc="CUBECOM designs, develops and manufactures reliable communication sub-systems for satellites, with a range of high datarate antennas and transmitters."
            />
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 mt-16">
          <div className="horizon w-48" />
          <Button
            variant="outline"
            size="sm"
            className="text-sm mono tracking-widest border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors"
            onClick={() => {
              window.location.href =
                "https://drive.google.com/file/d/1dP9w72XERuV0gbTzaK4wEZiP7xyGBAXr/view?usp=sharing";
            }}
          >
            SPONSOR US
          </Button>
        </div>
      </div>
    </div>
  );
};

const SponsorCard = ({
  tier,
  img,
  imgAlt,
  scale = 1,
  desc,
}: {
  tier: string;
  img: string;
  imgAlt: string;
  scale?: number;
  desc?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
      className="w-full h-full"
    >
      <Card className="w-full max-w-xs glow-border rounded-lg overflow-hidden flex flex-col h-full">
        <CardHeader className="flex justify-center py-4 bg-muted/50">
          <p className="mono text-xs text-primary tracking-widest text-center">{tier.toUpperCase()}</p>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center p-6">
          <img
            src={img}
            width="200"
            alt={imgAlt}
            className="object-contain object-center"
            style={{ scale: `${scale}` }}
          />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-end p-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">{desc}</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
