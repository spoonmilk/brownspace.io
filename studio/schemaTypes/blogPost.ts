import { defineField, defineType } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL-friendly identifier for this post (auto-generated from title).",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Your name as you'd like it to appear on the post.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subgroup",
      title: "Subgroup",
      type: "string",
      description: "Optional — tag this post with a subgroup.",
      options: {
        list: [
          { title: "ADCS", value: "ADCS" },
          { title: "Avionics", value: "Avionics" },
          { title: "Flight Software", value: "Flight Software" },
          { title: "Ground Software", value: "Ground Software" },
          { title: "Operations", value: "Operations" },
          { title: "R&D", value: "R&D" },
          { title: "Structures", value: "Structures" },
          { title: "Club", value: "Club" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional header image for the post.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary shown on the blog listing page.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle: `${author} · ${date ? new Date(date).toLocaleDateString() : "No date"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
