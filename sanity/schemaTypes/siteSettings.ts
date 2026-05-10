import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "⚙️ Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "navigation", title: "🔗 Navbar & Logo" },
    { name: "footer", title: "👇 Footer Texts & Image" },
    { name: "themeColors", title: "🎨 Theme Colors" },
    { name: "social", title: "📱 Social & Contact" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    /* ═══ GENERAL ═══ */
    defineField({ name: "siteTitle", title: "Site Title", type: "string", group: "general", description: "اسم موقعك اللي بيظهر في التاب فوق في المتصفح. مثال: Youssef Portfolio" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string", group: "general", description: "رقم الواتساب الأساسي بكود الدولة. مثال: 201012345678" }),
    
    // 🔴 إعدادات التسعير الذكي 🔴
    defineField({
      name: "enableDynamicPricing",
      title: "تفعيل التسعير التلقائي (حسب الدولة)؟",
      type: "boolean",
      group: "general",
      initialValue: true,
      description: "لو فعلته، الموقع هيحول السعر لعملة العميل لوحده بناءً على مكانه."
    }),
    defineField({
      name: "baseCurrency",
      title: "العملة الأساسية (اللي بتكتب بيها الأسعار)",
      type: "string",
      group: "general",
      options: { list: [{ title: "جنيه مصري (EGP)", value: "EGP" }, { title: "دولار أمريكي (USD)", value: "USD" }], layout: "radio" },
      initialValue: "EGP",
      hidden: ({ parent }) => !parent?.enableDynamicPricing,
    }),

    /* ═══ NAVBAR & LOGO ═══ */
    defineField({
      name: "logoType", title: "Logo Type", type: "string", group: "navigation", description: "اختار عاوز اللوجو يظهر كاسم (نص) ولا كصورة",
      options: { list: [{ title: "Text (اسم نصي)", value: "text" }, { title: "Image (صورة اللوجو)", value: "image" }], layout: "radio" }, initialValue: "text",
    }),
    defineField({ name: "logoText", title: "Logo Text", type: "string", group: "navigation", hidden: ({ parent }) => parent?.logoType !== "text" }),
    
    defineField({ name: "logoImageLight_en", title: "Logo (English - Light)", type: "image", group: "navigation", hidden: ({ parent }) => parent?.logoType !== "image" }),
    defineField({ name: "logoImageDark_en", title: "Logo (English - Dark)", type: "image", group: "navigation", hidden: ({ parent }) => parent?.logoType !== "image" }),
    defineField({ name: "logoImageLight_ar", title: "Logo (Arabic - Light)", type: "image", group: "navigation", hidden: ({ parent }) => parent?.logoType !== "image" }),
    defineField({ name: "logoImageDark_ar", title: "Logo (Arabic - Dark)", type: "image", group: "navigation", hidden: ({ parent }) => parent?.logoType !== "image" }),
    
    defineField({
      name: "navLinks", title: "Navigation Links (Navbar)", type: "array", group: "navigation",
      of: [{
        type: "object", fields: [
          { name: "title_en", title: "Title (English)", type: "string" },
          { name: "title_ar", title: "Title (Arabic)", type: "string" },
          { name: "href", title: "Link Target", type: "string", description: "مثال: #projects" },
        ], preview: { select: { title: 'title_en', subtitle: 'href' } }
      }]
    }),

    /* ═══ FOOTER ═══ */
    defineField({
      name: "footerLogoType", title: "Footer Branding Type", type: "string", group: "footer", description: "اختار عاوز الفوتر يعرض جملة ولا لوجو",
      options: { list: [{ title: "Text (جملة/نص)", value: "text" }, { title: "Image (صورة/لوجو)", value: "image" }], layout: "radio" }, initialValue: "text",
    }),
    
    defineField({ name: "footerText_en", title: "Footer Phrase (English)", type: "string", group: "footer", hidden: ({ parent }) => parent?.footerLogoType !== "text" }),
    defineField({ name: "footerText_ar", title: "Footer Phrase (Arabic)", type: "string", group: "footer", hidden: ({ parent }) => parent?.footerLogoType !== "text" }),

    defineField({ name: "footerImageLight_en", title: "Footer Logo (EN - Light)", type: "image", group: "footer", hidden: ({ parent }) => parent?.footerLogoType !== "image" }),
    defineField({ name: "footerImageDark_en", title: "Footer Logo (EN - Dark)", type: "image", group: "footer", hidden: ({ parent }) => parent?.footerLogoType !== "image" }),
    defineField({ name: "footerImageLight_ar", title: "Footer Logo (AR - Light)", type: "image", group: "footer", hidden: ({ parent }) => parent?.footerLogoType !== "image" }),
    defineField({ name: "footerImageDark_ar", title: "Footer Logo (AR - Dark)", type: "image", group: "footer", hidden: ({ parent }) => parent?.footerLogoType !== "image" }),

    defineField({
      name: "showCopyright", title: "Show Copyright Text? (إظهار حقوق النشر؟)", type: "boolean", group: "footer", initialValue: true, description: "قفل الزرار ده هيخفي سطر الحقوق بالكامل من الموقع."
    }),
    defineField({ name: "copyrightText_en", title: "Copyright Text (English)", type: "string", group: "footer", hidden: ({ parent }) => parent?.showCopyright === false }),
    defineField({ name: "copyrightText_ar", title: "Copyright Text (Arabic)", type: "string", group: "footer", hidden: ({ parent }) => parent?.showCopyright === false }),
    
    defineField({ name: "backToTopText_en", title: "Back To Top (English)", type: "string", group: "footer" }),
    defineField({ name: "backToTopText_ar", title: "Back To Top (Arabic)", type: "string", group: "footer" }),

    /* ═══ THEME COLORS ═══ */
    defineField({ name: "lightBackground", title: "Light Mode — Background", type: "color", group: "themeColors", options: { disableAlpha: true } }),
    defineField({ name: "lightPrimary", title: "Light Mode — Primary", type: "color", group: "themeColors", options: { disableAlpha: true } }),
    defineField({ name: "darkBackground", title: "Dark Mode — Background", type: "color", group: "themeColors", options: { disableAlpha: true } }),
    defineField({ name: "darkPrimary", title: "Dark Mode — Primary", type: "color", group: "themeColors", options: { disableAlpha: true } }),
    
    /* ═══ SEO ═══ */
    defineField({ name: "metaDescription_en", title: "Meta Description (EN)", type: "text", rows: 2, group: "seo" }),
    defineField({ name: "metaDescription_ar", title: "Meta Description (AR)", type: "text", rows: 2, group: "seo" }),
    defineField({ name: "keywords_en", title: "Keywords (EN)", type: "string", group: "seo" }),
    defineField({ name: "keywords_ar", title: "Keywords (AR)", type: "string", group: "seo" }),
    defineField({ name: "ogImage", title: "Share Image (صورة المشاركة)", type: "image", group: "seo" }),

    /* ═══ SOCIAL LINKS ═══ */
    defineField({
      name: "socialLinks", title: "Social Media Links", type: "array", group: "social",
      of: [{
        type: "object", fields: [
          { name: "platform", title: "Platform Name", type: "string" },
          { name: "url", title: "URL", type: "url" },
          defineField({ name: "iconOff", title: "Icon (Normal State)", type: "image", options: { hotspot: true } }),
          defineField({ name: "iconOn", title: "Icon (Hover State)", type: "image", options: { hotspot: true } }),
        ]
      }]
    }),
  ],
});