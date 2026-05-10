import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Project Title", type: "string", validation: (Rule) => Rule.required(), description: "اسم المشروع. مثال: تطبيق توصيل طعام" }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required(), description: "اضغط Generate عشان يعمل رابط للمشروع تلقائي." }),
    defineField({ name: "category", title: "Category Value", type: "string", validation: (Rule) => Rule.required(), description: "تصنيف المشروع (لازم يطابق الكود اللي كتبته في السكاشن). مثال: ui-ux" }),
    defineField({ name: "date", title: "Project Date", type: "date", description: "تاريخ عمل المشروع." }),
    defineField({ name: "thumbnail", title: "Main Thumbnail (Cover)", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required(), description: "صورة الغلاف الرئيسية للمشروع." }),
    
    defineField({
      name: "hoverType", title: "Hover Preview Type", type: "string", description: "إيه اللي يحصل لما الماوس ييجي على صورة المشروع؟",
      options: { list: [{ title: "None (صورة ثابتة)", value: "none" }, { title: "Video (تشغيل فيديو)", value: "video" }, { title: "Image Slider (تقليب صور)", value: "slider" }], layout: "radio" }, initialValue: "none"
    }),
    defineField({ name: "hoverVideo", title: "Hover Video (MP4)", type: "file", options: { accept: "video/mp4" }, hidden: ({ document }) => document?.hoverType !== "video", description: "ارفع فيديو قصير يشتغل تلقائي (يفضل خفيف)." }),
    
    defineField({ name: "description_en", title: "Short Description (EN)", type: "text", rows: 3, description: "وصف قصير عن المشروع بالإنجليزي." }),
    defineField({ name: "description_ar", title: "Short Description (AR)", type: "text", rows: 3, description: "وصف قصير عن المشروع بالعربي." }),
    
    defineField({ name: "mediaGallery", title: "Media Gallery", type: "array", description: "معرض الصور والفيديوهات اللي جوه صفحة المشروع نفسها.",
      of: [
        { type: "image", title: "صورة", options: { hotspot: true } },
        { type: "object", name: "videoElement", title: "رابط فيديو", fields: [{ name: "url", title: "YouTube / Vimeo URL", type: "url", description: "حط رابط الفيديو هنا." }], preview: { select: { title: "url" }, prepare({title}) { return { title: `🎬 Video: ${title}` } } } }
      ]
    }),
    defineField({ name: "featured", title: "Mark as Featured", type: "boolean", initialValue: false, description: "علم صح هنا لو عاوز المشروع ده يظهر كـ 'مميز' في الصفحة الرئيسية." }),
  ],
  preview: { select: { title: "title", media: "thumbnail", subtitle: "category" } },
});