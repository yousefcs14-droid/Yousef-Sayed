import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "📬 Contact Section",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "Let's Work Together", description: "عنوان القسم بالإنجليزي." }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "لنعمل معاً", description: "عنوان القسم بالعربي." }),
    defineField({ name: "subtitle_en", title: "Subtitle (English)", type: "string", description: "وصف تحت العنوان بالإنجليزي." }),
    defineField({ name: "subtitle_ar", title: "Subtitle (Arabic)", type: "string", description: "وصف تحت العنوان بالعربي." }),
    defineField({ name: "whatsappOverride", title: "WhatsApp Number Override", type: "string", description: "لو عاوز رقم واتساب مختلف للقسم ده بس، اكتبه هنا. لو سبته فاضي هياخد الرقم من إعدادات الموقع الأساسية." }),
    defineField({ name: "showServiceDropdown", title: "Show Service Type Dropdown", type: "boolean", initialValue: true, description: "إظهار أو إخفاء قائمة اختيار الخدمة في نموذج المراسلة." }),
  ],
  preview: { prepare() { return { title: "📬 Contact Section" }; } },
});