import { defineField, defineType } from "sanity";

export const pricingSection = defineType({
  name: "pricingSection",
  title: "💰 Pricing Section",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "Pricing", description: "عنوان قسم الأسعار بالإنجليزي." }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "الأسعار", description: "عنوان قسم الأسعار بالعربي." }),
    defineField({ name: "subtitle_en", title: "Subtitle (English)", type: "string", description: "وصف القسم بالإنجليزي." }),
    defineField({ name: "subtitle_ar", title: "Subtitle (Arabic)", type: "string", description: "وصف القسم بالعربي." }),
    defineField({
      name: "plans", title: "Pricing Plans", type: "array", description: "ضيف باقات أسعارك هنا.",
      of: [{
        type: "object", name: "plan", fields: [
          defineField({ name: "name_en", title: "Plan Name (EN)", type: "string", description: "اسم الباقة بالإنجليزي. مثال: Pro Plan" }),
          defineField({ name: "name_ar", title: "Plan Name (AR)", type: "string", description: "اسم الباقة بالعربي. مثال: الباقة الاحترافية" }),
          defineField({ name: "price", title: "Display Price (Text)", type: "string", description: "النص اللي هيظهر (مثال: Custom أو $499)" }),
          defineField({ name: "numericPrice", title: "Numeric Price (للحسبة)", type: "number", description: "اكتب الرقم فقط هنا (مثلاً: 1200) عشان السيستم يحوله تلقائي." }),
          defineField({ name: "period_en", title: "Period (EN)", type: "string", description: "المدة بالإنجليزي. مثال: per month أو per project" }),
          defineField({ name: "period_ar", title: "Period (AR)", type: "string", description: "المدة بالعربي. مثال: شهرياً أو لكل مشروع" }),
          defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 2, description: "وصف الباقة بالإنجليزي." }),
          defineField({ name: "description_ar", title: "Description (AR)", type: "text", rows: 2, description: "وصف الباقة بالعربي." }),
          defineField({
            name: "features", title: "Features", type: "array", description: "مميزات الباقة.",
            of: [{
              type: "object", fields: [
                defineField({ name: "text_en", title: "Feature (EN)", type: "string" }),
                defineField({ name: "text_ar", title: "Feature (AR)", type: "string" }),
                defineField({ name: "included", title: "Included", type: "boolean", initialValue: true }),
              ]
            }]
          }),
          defineField({ name: "highlighted", title: "Highlight (Most Popular)", type: "boolean", initialValue: false }),
          defineField({ name: "ctaText_en", title: "CTA Text (EN)", type: "string", initialValue: "Get Started" }),
          defineField({ name: "ctaText_ar", title: "CTA Text (AR)", type: "string", initialValue: "ابدأ الآن" }),
          defineField({ name: "ctaLink", title: "CTA Link", type: "string", initialValue: "#contact" }),
        ], preview: { select: { title: "name_en", subtitle: "price" } }
      }]
    }),
  ],
  preview: { prepare() { return { title: "💰 Pricing Section" }; } },
});