import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "👤 About Section",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "About Me", description: "عنوان القسم بالإنجليزي. مثال: About Me" }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "عني", description: "عنوان القسم بالعربي. مثال: من أنا" }),
    defineField({ name: "subtitle_en", title: "Subtitle (English)", type: "text", rows: 3, description: "نص فرعي يشرح القسم بالإنجليزي." }),
    defineField({ name: "subtitle_ar", title: "Subtitle (Arabic)", type: "text", rows: 3, description: "نص فرعي يشرح القسم بالعربي." }),
    defineField({ name: "profileImage", title: "Profile Image", type: "image", options: { hotspot: true }, description: "ارفع صورتك الشخصية هنا عشان تظهر في الموقع." }),
    defineField({ name: "cvFile", title: "CV / Resume File", type: "file", description: "ارفع ملف السيرة الذاتية (CV) بصيغة PDF هنا لزرار التحميل.", options: { accept: ".pdf" } }),
    defineField({ name: "showStats", title: "Show Statistics", type: "boolean", initialValue: true, description: "إظهار أو إخفاء أرقام الإحصائيات (زي سنوات الخبرة)." }),
    defineField({
      name: "statistics", title: "Statistics Items", type: "array", description: "ضيف الأرقام بتاعتك هنا. (اضغط Add item)", hidden: ({ parent }) => !parent?.showStats,
      of: [{
        type: "object", fields: [
          { name: "value", title: "Value (e.g. 5+)", type: "string", description: "الرقم نفسه. مثال: +5 أو 50+" },
          { name: "label_en", title: "Label (English)", type: "string", description: "اسم الإحصائية بالإنجليزي. مثال: Years Experience" },
          { name: "label_ar", title: "Label (Arabic)", type: "string", description: "اسم الإحصائية بالعربي. مثال: سنوات خبرة" },
        ], preview: { select: { title: 'value', subtitle: 'label_en' } }
      }]
    }),
    defineField({ name: "showVideo", title: "Show Profile Image / Visual", type: "boolean", initialValue: true, description: "زرار تشغيل أو إخفاء مساحة الصورة/الفيديو بالكامل." }),
  ],
  preview: { prepare() { return { title: "👤 About Section" }; } },
});