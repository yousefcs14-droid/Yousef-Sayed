import { defineField, defineType } from "sanity";

export const pricingSection = defineType({
  name: "pricingSection",
  title: "💰 Pricing Section",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "Pricing",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "الأسعار",
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
      name: "plans",
      title: "Pricing Plans",
      type: "array",
      of: [
        {
          type: "object",
          name: "plan",
          fields: [
            defineField({ name: "name_en", title: "Plan Name (EN)", type: "string" }),
            defineField({ name: "name_ar", title: "Plan Name (AR)", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string", description: "e.g. $499 or Custom" }),
            defineField({ name: "period_en", title: "Period (EN)", type: "string", description: "e.g. per project, per month" }),
            defineField({ name: "period_ar", title: "Period (AR)", type: "string" }),
            defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 2 }),
            defineField({ name: "description_ar", title: "Description (AR)", type: "text", rows: 2 }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "text_en", title: "Feature (EN)", type: "string" }),
                    defineField({ name: "text_ar", title: "Feature (AR)", type: "string" }),
                    defineField({ name: "included", title: "Included", type: "boolean", initialValue: true }),
                  ],
                },
              ],
            }),
            defineField({ name: "highlighted", title: "Highlight (Most Popular)", type: "boolean", initialValue: false }),
            defineField({ name: "ctaText_en", title: "CTA Text (EN)", type: "string", initialValue: "Get Started" }),
            defineField({ name: "ctaText_ar", title: "CTA Text (AR)", type: "string", initialValue: "ابدأ الآن" }),
            defineField({ name: "ctaLink", title: "CTA Link", type: "string", initialValue: "#contact" }),
          ],
          preview: {
            select: { title: "name_en", subtitle: "price" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "💰 Pricing Section" };
    },
  },
});
