import { defineField, defineType } from "sanity";

export const softwareMarqueeSection = defineType({
  name: "softwareMarqueeSection",
  title: "🔧 Software Marquee",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "Tools I Use", description: "عنوان الشريط بالإنجليزي." }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "الأدوات التي أستخدمها", description: "عنوان الشريط بالعربي." }),
    defineField({
      name: "tools", title: "Software / Tools", type: "array", description: "ضيف البرامج هنا (اضغط Add item).",
      of: [{
        type: "object", name: "tool", fields: [
          defineField({ name: "name", title: "Tool Name", type: "string", description: "اسم البرنامج. مثال: Adobe Premiere" }),
          defineField({ name: "icon", title: "Tool Icon/Logo", type: "image", options: { hotspot: true }, description: "لوجو البرنامج (يفضل بخلفية شفافة PNG)." }),
          defineField({ name: "level", title: "Experience Level (%)", type: "number", description: "مستواك في البرنامج (من 0 لـ 100). مثال: 85", validation: (Rule) => Rule.min(0).max(100) }),
          defineField({ name: "color", title: "Brand Color (Hex)", type: "string", description: "لون البرنامج (مهم عشان تأثير الهوفر). مثال: #31A8FF" }),
        ], preview: { select: { title: "name", media: "icon" } }
      }]
    }),
    defineField({ name: "speed", title: "Scroll Speed", type: "number", initialValue: 40, description: "سرعة حركة الشريط (كل ما الرقم يكبر السرعة تزيد). يفضل 40." }),
    defineField({ name: "showHeading", title: "Show Heading", type: "boolean", initialValue: true, description: "إظهار أو إخفاء العنوان اللي فوق شريط البرامج." }),
  ],
  preview: { prepare() { return { title: "🔧 Software Marquee" }; } },
});