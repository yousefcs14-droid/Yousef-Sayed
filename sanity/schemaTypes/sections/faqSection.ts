import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "❓ FAQ Section",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "Frequently Asked Questions", description: "العنوان بالإنجليزي." }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "الأسئلة الشائعة", description: "العنوان بالعربي." }),
    defineField({
      name: "items", title: "FAQ Items", type: "array", description: "ضيف الأسئلة والأجوبة هنا.",
      of: [{
        type: "object", name: "faqItem", fields: [
          defineField({ name: "question_en", title: "Question (EN)", type: "string", description: "السؤال بالإنجليزي." }),
          defineField({ name: "question_ar", title: "Question (AR)", type: "string", description: "السؤال بالعربي." }),
          defineField({ name: "answer_en", title: "Answer (EN)", type: "text", rows: 3, description: "الإجابة بالإنجليزي." }),
          defineField({ name: "answer_ar", title: "Answer (AR)", type: "text", rows: 3, description: "الإجابة بالعربي." }),
        ], preview: { select: { title: "question_en" } }
      }]
    }),
  ],
  preview: { prepare() { return { title: "❓ FAQ Section" }; } },
});