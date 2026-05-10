import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "🏠 Hero Section",
  type: "object",
  fields: [
    defineField({ name: "greeting_en", title: "Greeting (English)", type: "string", initialValue: "Hello, I'm", description: "الترحيب فوق اسمك بالإنجليزي. مثال: Hello, I'm" }),
    defineField({ name: "greeting_ar", title: "Greeting (Arabic)", type: "string", initialValue: "مرحباً، أنا", description: "الترحيب فوق اسمك بالعربي. مثال: مرحباً، أنا" }),
    defineField({ name: "name", title: "Display Name", type: "string", initialValue: "Youssef Sayed", description: "اسمك الكبير بالإنجليزي. مثال: Youssef Sayed" }),
    defineField({ name: "name_ar", title: "Display Name (Arabic)", type: "string", initialValue: "يوسف سيد", description: "اسمك الكبير بالعربي. مثال: يوسف سيد" }),
    defineField({ name: "subtitle_en", title: "Subtitle (English)", type: "string", initialValue: "Crafting Visual Stories through Design, Motion & Video", description: "وصف تخصصك بالإنجليزي. مثال: UI/UX & Motion Designer" }),
    defineField({ name: "subtitle_ar", title: "Subtitle (Arabic)", type: "string", initialValue: "أصيغ قصصاً بصرية من خلال التصميم والحركة والفيديو", description: "وصف تخصصك بالعربي." }),
    defineField({ name: "ctaText_en", title: "CTA Button Text (English)", type: "string", initialValue: "View My Work", description: "الكلمة اللي على الزرار بالإنجليزي. مثال: View Projects" }),
    defineField({ name: "ctaText_ar", title: "CTA Button Text (Arabic)", type: "string", initialValue: "شاهد أعمالي", description: "الكلمة اللي على الزرار بالعربي. مثال: تصفح أعمالي" }),
    defineField({ name: "ctaLink", title: "CTA Link", type: "string", initialValue: "#projects", description: "رابط الزرار (بينزل العميل لفين). مثال: #projects أو #contact" }),
    defineField({ name: "showScrollHint", title: "Show Scroll Hint", type: "boolean", initialValue: true, description: "تشغيل أو إيقاف أيقونة الماوس المتحركة اللي بتنبه العميل ينزل لتحت." }),
  ],
  preview: { prepare() { return { title: "🏠 Hero Section" }; } },
});