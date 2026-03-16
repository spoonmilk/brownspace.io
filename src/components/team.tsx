import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

// ── Sanity client ─────────────────────────────────────────────────────────────

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

function urlFor(source: object) {
  return builder.image(source).width(200).height(200).fit("crop").url();
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface SanityMember {
  _id: string;
  name: string;
  position?: string;
  subgroups: string[];
  linkedin?: string;
  photo: object;
}

// ── GROQ query ────────────────────────────────────────────────────────────────
// Fetch all members that belong to the requested subgroup.
// Members can belong to multiple subgroups (array field), so we use the `in`
// operator to match.

const MEMBER_QUERY = `
  *[_type == "member" && $subgroup in subgroups] | order(name asc) {
    _id,
    name,
    position,
    subgroups,
    linkedin,
    photo
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

interface TeamProps {
  subgroup: string;
}

export const Team = ({ subgroup }: TeamProps) => {
  const [members, setMembers] = useState<SanityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<SanityMember[]>(MEMBER_QUERY, { subgroup })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch members:", err);
        setError("Could not load members.");
        setLoading(false);
      });
  }, [subgroup]);

  // ── Loading state
  if (loading) {
    return (
      <div className="pt-12">
        <h2 className="text-center text-3xl font-bold mt-4 mb-8">{subgroup}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              className="h-[180px] bg-muted/50 animate-pulse relative mt-8"
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Error state
  if (error) {
    return (
      <div className="pt-12">
        <h2 className="text-center text-3xl font-bold mt-4 mb-8">{subgroup}</h2>
        <p className="text-center text-destructive">{error}</p>
      </div>
    );
  }

  // ── Empty state — hide the section entirely if no members
  if (members.length === 0) return null;

  // ── Render
  return (
    <div className="pt-12">
      <h2 className="text-center text-3xl font-bold mt-4 mb-8">{subgroup}</h2>

      <div className={`gap-8 gap-y-10 ${
        members.length < 4
          ? "flex flex-wrap justify-center"
          : "grid md:grid-cols-2 lg:grid-cols-4"
      }`}>
        {members.map((member) => (
          <motion.div
            key={member._id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={members.length < 4 ? "w-[calc(25%-1.5rem)] min-w-[180px]" : ""}
          >
            <Card className="h-[180px] bg-muted/50 relative mt-8 flex flex-col">
              <CardHeader className="flex-1 flex flex-col justify-end items-center pb-5 pt-14">
                {member.photo && (
                  <img
                    src={urlFor(member.photo)}
                    alt={member.name}
                    className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                  />
                )}
                <CardTitle className="text-center leading-tight">{member.name}</CardTitle>
                {/* Always render position line — empty string reserves the space */}
                <CardDescription className="text-primary text-center h-4 whitespace-nowrap">
                  {member.position ?? ""}
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-center items-center h-10 pt-0">
                {member.linkedin ? (
                  <a
                    rel="noreferrer noopener"
                    href={member.linkedin}
                    target="_blank"
                    aria-label={`${member.name} LinkedIn`}
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    <Linkedin size={20} />
                  </a>
                ) : (
                  /* Invisible placeholder keeps footer height consistent */
                  <div className="h-9 w-9" />
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
