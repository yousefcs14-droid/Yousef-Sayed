import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "📬 Contact Section",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "Let's Work Together",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "لنعمل معاً",
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
      name: "whatsappOverride",
      title: "WhatsApp Number Override (leave empty to use global setting)",
      type: "string",
    }),
    defineField({
      name: "showServiceDropdown",
      title: "Show Service Type Dropdown",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "📬 Contact Section" };
    },
  },
});
