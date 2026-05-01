import { defineField, defineType } from "sanity";

export const projectsGridSection = defineType({
  name: "projectsGridSection",
  title: "📐 Projects Grid",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "Selected Work",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "أعمال مختارة",
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
      name: "showFilters",
      title: "Show Category Filters",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "maxProjects",
      title: "Max Projects to Display (0 = show all)",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "layout",
      title: "Grid Layout",
      type: "string",
      options: {
        list: [
          { title: "Bento (Asymmetric)", value: "bento" },
          { title: "Uniform Grid", value: "grid" },
          { title: "Masonry", value: "masonry" },
        ],
      },
      initialValue: "bento",
    }),
  ],
  preview: {
    prepare() {
      return { title: "📐 Projects Grid" };
    },
  },
});
