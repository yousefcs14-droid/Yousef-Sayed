"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import TextReveal from "@/components/animations/text-reveal";

// --- البيانات الاحتياطية (3 خبرات) ---
const defaultExperiences = [
  {
    company_en: "Creative Design Studio",
    company_ar: "استوديو التصميم الإبداعي",
    role_en: "Senior Graphic Designer",
    role_ar: "مصمم جرافيك أول",
    startDate: "2023",
    endDate: null,
    current: true,
    description_en: "Leading brand identity projects and managing design teams.",
    description_ar: "قيادة مشاريع الهوية البصرية وإدارة فرق التصميم.",
    tools: ["Photoshop", "Illustrator"]
  },
  {
    company_en: "Tech Solutions Agency",
    company_ar: "وكالة الحلول التقنية",
    role_en: "UI/UX Designer",
    role_ar: "مصمم واجهات",
    startDate: "2021",
    endDate: "2023",
    current: false,
    description_en: "Designed user-centric interfaces for mobile and web platforms.",
    description_ar: "تصميم واجهات تركز على المستخدم للهواتف والويب.",
    tools: ["Figma", "Adobe XD"]
  },
  {
    company_en: "Media Production House",
    company_ar: "دار الإنتاج الإعلامي",
    role_en: "Motion Artist",
    role_ar: "فنان موشن جرافيك",
    startDate: "2019",
    endDate: "2021",
    current: false,
    description_en: "Created 2D/3D animations for social media campaigns.",
    description_ar: "إنشاء رسوم متحركة للإعلانات وحملات التواصل.",
    tools: ["After Effects", "Premiere"]
  }
];

export default function Experience({ data }: { data?: any }) {
  const t = useTranslations("experience");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const experiences = data?.experiences?.length > 0 ? data.experiences : defaultExperiences;

  // --- أنيميشن الخط (Progress Line) ---
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="section-spacing relative" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-4xl px-6">
        
        {/* العناوين */}
        <div className="mb-12 text-center">
          <TextReveal as="h2" className="font-heading text-3xl md:text-4xl font-bold text-text-primary justify-center flex">
            {(isRtl ? data?.heading_ar : data?.heading_en) || t("title")}
          </TextReveal>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-text-secondary text-sm md:text-base mt-3 max-w-lg mx-auto">
            {(isRtl ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle")}
          </motion.p>
        </div>

        {/* منطقة التايم لاين */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          
          {/* 1. الخط الخلفي "الباهت" (The Path) */}
          <div className="absolute w-[2px] bg-slate-200 dark:bg-white/10 top-0 bottom-0 start-0 md:start-6" />

          {/* 2. الخط الملون "المتحرك" (Animated Progress) */}
          <motion.div 
            style={{ scaleY }}
            className="absolute w-[2px] bg-primary top-0 bottom-0 start-0 md:start-6 origin-top shadow-[0_0_10px_var(--primary-glow)]" 
          />

          <div className="space-y-10">
            {experiences.map((exp: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative ps-8 md:ps-16"
              >
                {/* النقطة - تم تحسين شكلها لتتفاعل مع الأنيميشن */}
                <div className="absolute start-0 md:start-[19px] top-2 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]" />
                
                {/* الكارت */}
                <div className="glass-card p-5 md:p-6 hover:bg-white/[0.03] transition-all duration-300 border border-white/5 relative group overflow-hidden">
                  {/* تأثير لمعة خفيفة عند الـ Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                          {isRtl ? exp.role_ar : exp.role_en}
                        </h3>
                        <p className="text-primary/90 text-sm font-medium">
                          {isRtl ? exp.company_ar : exp.company_en}
                        </p>
                      </div>
                      <span className="text-text-muted text-[10px] font-bold bg-surface-hover px-3 py-1 rounded-md border border-white/5">
                        {exp.startDate} — {exp.current ? t("present") : exp.endDate}
                      </span>
                    </div>
                    
                    <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
                      {isRtl ? exp.description_ar : exp.description_en}
                    </p>

                    {/* الأدوات */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tools?.map((tool: string) => (
                        <span key={tool} className="px-2 py-0.5 text-[9px] uppercase font-bold rounded bg-primary/5 text-primary/70 border border-primary/10">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}