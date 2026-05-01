import { defineField, defineType } from "sanity";

export const softwareMarqueeSection = defineType({
  name: "softwareMarqueeSection",
  title: "🔧 Software Marquee",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "Tools I Use",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "الأدوات التي أستخدمها",
    }),
    defineField({
      name: "tools",
      title: "Software / Tools",
      type: "array",
      of: [
        {
          type: "object",
          name: "tool",
          fields: [
            defineField({ name: "name", title: "Tool Name", type: "string" }),
            defineField({ 
              name: "icon", 
              title: "Tool Icon/Logo", 
              type: "image", 
              options: { hotspot: true } 
            }),
            // --- الحقول الجديدة اللى ضفناها هنا ---
            defineField({
              name: "level",
              title: "Experience Level (%)",
              type: "number",
              description: "Enter your skill level from 0 to 100",
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: "color",
              title: "Brand Color (Hex)",
              type: "string",
              description: "Example: #31A8FF (Use Hex code for best results)",
            }),
          ],
          preview: {
            select: { title: "name", media: "icon" },
          },
        },
      ],
    }),
    defineField({
      name: "speed",
      title: "Scroll Speed (pixels per second)",
      type: "number",
      initialValue: 40,
      description: "Higher = faster scroll",
    }),
    defineField({
      name: "showHeading",
      title: "Show Heading",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "🔧 Software Marquee" };
    },
  },
});