"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Mail } from "lucide-react"; 
import MagneticButton from "@/components/animations/magnetic-button";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 2.8, 
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function AnimatedName({ name, locale }: { name: string; locale: string }) {
  if (locale === "ar") {
    const words = name.split(" ");
    return (
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-text-primary mb-6 leading-none"
      >
        {words.map((word, wi) => (
          <React.Fragment key={wi}>
            <motion.span
              variants={charVariants}
              className={`inline-block ${wi === words.length - 1 ? "text-primary" : ""}`}
              style={{ perspective: 400 }}
            >
              {word}
            </motion.span>
            {wi < words.length - 1 && <span className="inline-block w-[0.3em]">{"\u00A0"}</span>}
          </React.Fragment>
        ))}
      </motion.h1>
    );
  }

  const chars = name.split("");
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-text-primary mb-6 leading-none"
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className={`inline-block ${char === " " ? "w-[0.25em]" : ""} ${
            char === "S" && i > 7 ? "text-primary" : ""
          }`}
          style={{ perspective: 400 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Hero({ data }: { data?: any }) {
  const t = useTranslations("hero");
  const locale = useLocale();

  const greeting = (locale === "ar" ? data?.greeting_ar : data?.greeting_en) || t("greeting");
  const name = (locale === "ar" ? data?.name_ar : data?.name) || t("name");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  
  const cta = (locale === "ar" ? data?.ctaText_ar : data?.ctaText_en) || t("cta");
  const ctaLink = data?.ctaLink || "#projects";
  const contactText = locale === "ar" ? "تواصل معي" : "Let's Talk";
  const showScrollHint = data?.showScrollHint ?? true;

  const scrollToSection = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // التعديل هنا: خلينا الخلفية transparent عشان إضاءة الأورورا تبان من ورا
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Content Wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="text-text-secondary text-lg md:text-xl mb-4 font-medium"
        >
          {greeting}
        </motion.p>

        <AnimatedName name={name} locale={locale} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="text-text-secondary text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton
            as="button"
            onClick={() => scrollToSection(ctaLink)}
            className="btn-primary text-lg px-10 py-4 w-full sm:w-auto rounded-full shadow-lg shadow-primary/20"
            data-cursor="view"
            strength={0.3}
          >
            {cta}
          </MagneticButton>

          <MagneticButton
            as="button"
            onClick={() => scrollToSection("#contact")}
            className="group relative flex items-center justify-center gap-3 px-10 py-4 w-full sm:w-auto rounded-full border border-border/60 bg-surface/30 hover:bg-surface text-text-primary backdrop-blur-md transition-all duration-300 text-lg font-medium shadow-xl"
            data-cursor="view"
            strength={0.2}
          >
            <Mail size={20} className="text-primary group-hover:scale-110 transition-transform" />
            <span>{contactText}</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer hidden md:flex z-20"
          onClick={() => scrollToSection(ctaLink)}
        >
          <span className="text-text-muted text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
            {t("scrollHint") || (locale === "ar" ? "اسحب لأسفل" : "Scroll to explore")}
          </span>

          <div className="relative w-[26px] h-[42px] rounded-full border-2 border-text-muted/20 flex justify-center p-1.5 bg-background/20 backdrop-blur-[2px]">
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                opacity: [1, 0.4, 1] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut" 
              }}
              className="w-1 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
            />
          </div>
          
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/30 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}