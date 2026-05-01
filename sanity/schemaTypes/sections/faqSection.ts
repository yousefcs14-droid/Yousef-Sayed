import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "❓ FAQ Section",
  type: "object",
  fields: [
    defineField({
      name: "heading_en",
      title: "Heading (English)",
      type: "string",
      initialValue: "Frequently Asked Questions",
    }),
    defineField({
      name: "heading_ar",
      title: "Heading (Arabic)",
      type: "string",
      initialValue: "الأسئلة الشائعة",
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question_en", title: "Question (EN)", type: "string" }),
            defineField({ name: "question_ar", title: "Question (AR)", type: "string" }),
            defineField({ name: "answer_en", title: "Answer (EN)", type: "text", rows: 3 }),
            defineField({ name: "answer_ar", title: "Answer (AR)", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "question_en" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "❓ FAQ Section" };
    },
  },
});
