import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "👤 About Section",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "About Me",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "عني",
    }),
    defineField({
      name: "subtitle_en",
      title: "Subtitle (English)",
      type: "string",
    }),
    defineField({
      name: "subtitle_ar",
      title: "Subtitle (Arabic)",
      type: "string",
    }),
    defineField({
      name: "showStats",
      title: "Show Statistics",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showVideo",
      title: "Show Profile Video / Visual",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "👤 About Section" };
    },
  },
});
