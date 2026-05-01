import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "🏠 Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "greeting_en",
      title: "Greeting (English)",
      type: "string",
      initialValue: "Hello, I'm",
    }),
    defineField({
      name: "greeting_ar",
      title: "Greeting (Arabic)",
      type: "string",
      initialValue: "مرحباً، أنا",
    }),
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      initialValue: "Youssef Sayed",
    }),
    defineField({
      name: "name_ar",
      title: "Display Name (Arabic)",
      type: "string",
      initialValue: "يوسف سيد",
    }),
    defineField({
      name: "subtitle_en",
      title: "Subtitle (English)",
      type: "string",
      initialValue: "Crafting Visual Stories through Design, Motion & Video",
    }),
    defineField({
      name: "subtitle_ar",
      title: "Subtitle (Arabic)",
      type: "string",
      initialValue: "أصيغ قصصاً بصرية من خلال التصميم والحركة والفيديو",
    }),
    defineField({
      name: "ctaText_en",
      title: "CTA Button Text (English)",
      type: "string",
      initialValue: "View My Work",
    }),
    defineField({
      name: "ctaText_ar",
      title: "CTA Button Text (Arabic)",
      type: "string",
      initialValue: "شاهد أعمالي",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link (section anchor e.g. #projects)",
      type: "string",
      initialValue: "#projects",
    }),
    defineField({
      name: "showScrollHint",
      title: "Show Scroll Hint",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: "🏠 Hero Section" };
    },
  },
});
