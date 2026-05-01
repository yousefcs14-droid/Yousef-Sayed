import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "bio_en",
      title: "Bio (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bio_ar",
      title: "Bio (Arabic)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "profileVideoLoop",
      title: "Profile Video Loop URL",
      type: "url",
      description: "URL to a looping profile video",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            { name: "label_en", title: "Label (English)", type: "string" },
            { name: "label_ar", title: "Label (Arabic)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "cvFile",
      title: "CV / Resume File",
      type: "file",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Section" };
    },
  },
});
