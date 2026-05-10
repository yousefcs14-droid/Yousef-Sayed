import { defineField, defineType } from "sanity";

export const projectsGridSection = defineType({
  name: "projectsGridSection",
  title: "📐 Projects Grid",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "Selected Work", description: "عنوان قسم المشاريع بالإنجليزي." }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "أعمال مختارة", description: "عنوان قسم المشاريع بالعربي." }),
    defineField({ name: "subtitle_en", title: "Subtitle (English)", type: "string", description: "وصف قصير تحت عنوان المشاريع بالإنجليزي." }),
    defineField({ name: "subtitle_ar", title: "Subtitle (Arabic)", type: "string", description: "وصف قصير تحت عنوان المشاريع بالعربي." }),
    defineField({
      name: "categories", title: "Filter Categories", type: "array", description: "ضيف أقسام الفلترة هنا (زي: موشن جرافيك، تصميم شعارات). قسم 'الكل / All' مضاف تلقائياً.",
      of: [{
        type: "object", fields: [
          { name: "title_en", title: "Category Name (English)", type: "string", description: "اسم الفلتر بالإنجليزي. مثال: UI/UX" },
          { name: "title_ar", title: "Category Name (Arabic)", type: "string", description: "اسم الفلتر بالعربي. مثال: واجهات مستخدم" },
          { name: "value", title: "Value (e.g. graphic-design)", type: "string", description: "كود الفلتر (لازم يكون حروف إنجليزي بدون مسافات). مثال: ui-ux" },
        ], preview: { select: { title: 'title_en', subtitle: 'value' } }
      }]
    }),
    defineField({ name: "showFilters", title: "Show Category Filters", type: "boolean", initialValue: true, description: "إظهار أو إخفاء أزرار الفلترة اللي فوق المشاريع." }),
    defineField({ name: "maxProjects", title: "Max Projects to Display", type: "number", initialValue: 0, description: "أقصى عدد مشاريع يظهر في الصفحة دي (اكتب 0 عشان يظهر كل المشاريع)." }),
    defineField({ name: "layout", title: "Grid Layout", type: "string", description: "شكل ترتيب شبكة المشاريع. (Bento: أحجام مختلفة، Grid: متساوي، Masonry: متداخل)", options: { list: [{ title: "Bento (Asymmetric)", value: "bento" }, { title: "Uniform Grid", value: "grid" }, { title: "Masonry", value: "masonry" }] }, initialValue: "bento" }),
  ],
  preview: { prepare() { return { title: "📐 Projects Grid" }; } },
});