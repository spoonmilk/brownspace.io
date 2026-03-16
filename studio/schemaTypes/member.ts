import { defineField, defineType } from "sanity";

export const memberSchema = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Leadership Position",
      type: "string",
      description: "Optional title (e.g. President, Lead Engineer)",
    }),
    defineField({
      name: "subgroups",
      title: "Subgroup Memberships",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Club Presidents", value: "Club Presidents" },
          { title: "ADCS", value: "ADCS" },
          { title: "Avionics", value: "Avionics" },
          { title: "Communications", value: "Communications"},
          { title: "Flight Software", value: "Flight Software" },
          { title: "Ground Software", value: "Ground Software" },
          { title: "Operations", value: "Operations" },
          { title: "R&D", value: "R&D" },
          { title: "Robotics", value: "Robotics"},
          { title: "Structures", value: "Structures" },
        ],
        // layout: "tags",
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Optional LinkedIn profile link",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).warning(
          "Please provide a valid https URL"
        ),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    // Populated automatically by Apps Script — do not edit manually.
    defineField({
      name: "formResponseId",
      title: "Google Form Response ID",
      type: "string",
      description: "Auto-populated by the Google Form integration. Do not edit.",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "photo",
    },
  },
});
