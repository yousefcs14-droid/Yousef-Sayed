import { defineField, defineType } from "sanity";

export const experienceSection = defineType({
  name: "experienceSection",
  title: "💼 Experience Section",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "Experience & Skills",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "الخبرات والمهارات",
    }),
    defineField({
      name: "showTechStack",
      title: "Show Tech Stack Badges",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showTimeline",
      title: "Show Timeline",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "💼 Experience Section" };
    },
  },
});
