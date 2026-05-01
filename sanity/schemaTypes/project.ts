import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hoverVideo",
      title: "Hover Video Preview URL",
      type: "url",
      description: "URL to a short video that plays on hover (Vimeo/YouTube/direct MP4)",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Graphic Design", value: "graphic-design" },
          { title: "Video Editing", value: "video-editing" },
          { title: "UI/UX Design", value: "ui-ux" },
          { title: "Motion Graphics", value: "motion-graphics" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_en",
      title: "Description (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description_ar",
      title: "Description (Arabic)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "videoEmbed",
      title: "Video Embed URL",
      type: "url",
      description: "Main project video (YouTube/Vimeo embed URL)",
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "caseStudy_en",
      title: "Case Study / Design Process (English)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "caseStudy_ar",
      title: "Case Study / Design Process (Arabic)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tools",
      title: "Tools Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "thumbnail", subtitle: "category" },
  },
});
