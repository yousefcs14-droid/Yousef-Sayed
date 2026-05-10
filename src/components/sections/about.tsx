"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Download } from "lucide-react";
import TextReveal from "@/components/animations/text-reveal";

// 1. العداد الذكي
function AnimatedCounter({ text }: { text: string }) {
  const match = text.match(/(\d+)(\D*)/);
  if (!match) return <span>{text}</span>;

  const num = parseInt(match[1], 10);
  const suffix = match[2] || "";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      animate(count, num, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
    }
  }, [count, inView, num]);

  return (
    <span ref={ref} className="inline-flex items-center justify-center">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function About({ data }: { data?: any }) {
  const t = useTranslations("about");
  const locale = useLocale();

  const heading = (locale === "ar" ? data?.heading_ar : data?.heading_en) || t("title");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  const showStats = data?.showStats ?? true;
  const showVideo = data?.showVideo ?? true;
  
  // الصورة والـ CV من الداش بورد
  const profileImageUrl = data?.profileImage?.asset?.url;
  const cvLink = data?.cvFile?.asset?.url || "#";

  // داتا الإحصائيات (دايناميك من الداش بورد، ولو فاضية بتعرض داتا افتراضية)
  const statsData = data?.statistics?.length > 0 
    ? data.statistics.map((stat: any) => ({
        number: stat.value,
        label: locale === "ar" ? stat.label_ar : stat.label_en
      }))
    : [
        { number: "5+", label: locale === "ar" ? "سنوات خبرة" : "Years Experience" },
        { number: "50+", label: locale === "ar" ? "مشروع مكتمل" : "Projects Completed" },
        { number: "30+", label: locale === "ar" ? "عميل سعيد" : "Happy Clients" },
      ];

  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl font-bold text-text-primary justify-center">
            {heading}
          </TextReveal>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        </div>

        {/* Content */}
        <div className={`grid grid-cols-1 ${showVideo ? "lg:grid-cols-2" : ""} gap-12 lg:gap-20 items-center`}>
          
          {/* Visual Side */}
          {showVideo && (
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.95 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative group">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card p-1">
                <div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-surface relative">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10" />
                  
                  {/* عرض الصورة الشخصية */}
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center bg-background/50 backdrop-blur-sm" animate={{ scale: [1, 1.05, 1], borderColor: ["rgba(99,102,241,0.2)", "rgba(139,92,246,0.6)", "rgba(99,102,241,0.2)"] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                        <span className="font-heading text-4xl font-bold text-primary">YS</span>
                      </motion.div>
                    </div>
                  )}

                  {/* زرار تحميل السيرة الذاتية */}
                  {cvLink !== "#" && (
                    <motion.a href={cvLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-text-primary font-medium shadow-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group/btn" whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                      <Download size={18} className="text-primary group-hover/btn:animate-bounce" />
                      <span className="text-sm whitespace-nowrap">{locale === "ar" ? "تحميل السيرة الذاتية" : "Download CV"}</span>
                    </motion.a>
                  )}

                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
            </motion.div>
          )}

          {/* Bio Text Side */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
            <div className="space-y-6">
              {t("bio").split("\n\n").map((paragraph, i) => (
                <TextReveal key={i} as="p" className="text-text-secondary text-lg leading-relaxed" delay={i * 0.2}>
                  {paragraph}
                </TextReveal>
              ))}
            </div>

            {/* الإحصائيات */}
            {showStats && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }} className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                {statsData.map((stat: any, i: number) => (
                  <div key={i} className="text-center group">
                    <span className="font-heading text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-500 inline-block drop-shadow-sm">
                      <AnimatedCounter text={stat.number} />
                    </span>
                    <p className="text-text-secondary font-medium text-sm mt-2 transition-colors duration-300 group-hover:text-text-primary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}