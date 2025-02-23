import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { TeamProps, SocialNetworksProps } from "./types/team";
import teamList from "./member-info";

interface TeamComponentProps {
  subgroup?: string;
}

export const Team = ({ subgroup }: TeamComponentProps) => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      case "Facebook":
        return <Facebook size="20" />;
      case "Instagram":
        return <Instagram size="20" />;
      default:
        return null;
    }
  };

  // Filter the team list based on the subgroup prop.
  const filteredTeam = subgroup
    ? teamList.filter((member: TeamProps) => member.subgroup === subgroup)
    : teamList;

  // Sort the filteredTeam by first name (case-insensitive).
  // If you want to sort by the entire name, simply replace
  // the split logic with `a.name.toLowerCase().localeCompare(b.name.toLowerCase())`.
  const sortedTeam = [...filteredTeam].sort((a, b) => {
    const [firstNameA] = a.name.split(" ");
    const [firstNameB] = b.name.split(" ");
    return firstNameA.toLowerCase().localeCompare(firstNameB.toLowerCase());
  });

  return (
    <div className="pt-12">
      {subgroup && (
        <h2 className="text-center text-3xl font-bold mt-4 mb-8">
          {subgroup}
        </h2>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {sortedTeam.map(({ imageUrl, name, position, socialNetworks }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 300,
              duration: 0.5,
            }}
          >
            <Card className="h-[180px] bg-muted/50 relative mt-8 flex flex-col justify-center items-center">
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {socialNetworks.map(({ name, url }: SocialNetworksProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
