import { defineField, defineType } from "sanity";

export const experienceSection = defineType({
  name: "experienceSection",
  title: "💼 Experience Section",
  type: "object",
  fields: [
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", initialValue: "Experience & Skills", description: "عنوان القسم بالإنجليزي. مثال: Experience" }),
    defineField({ name: "heading_ar", title: "Heading (Arabic)", type: "string", initialValue: "الخبرات والمهارات", description: "عنوان القسم بالعربي. مثال: مسيرتي المهنية" }),
    defineField({ name: "showTechStack", title: "Show Tech Stack Badges", type: "boolean", initialValue: true, description: "إظهار أو إخفاء أسماء التقنيات اللي اشتغلت بيها جوه كل وظيفة." }),
    defineField({ name: "showTimeline", title: "Show Timeline", type: "boolean", initialValue: true, description: "إظهار أو إخفاء خط الزمن اللي بيربط الوظائف ببعض." }),
  ],
  preview: { prepare() { return { title: "💼 Experience Section" }; } },
});