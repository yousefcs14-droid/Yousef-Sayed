"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/animations/magnetic-button";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      // التعديل هنا: خلينا الاسم يستنى 2.8 ثانية عشان يظهر بعد الاسبلاش
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
    // For Arabic: animate the full name as a unit to avoid RTL character reordering issues
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

  // For English: animate character by character
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

  // CMS override → fallback to i18n translations
  const greeting = (locale === "ar" ? data?.greeting_ar : data?.greeting_en) || t("greeting");
  const name = (locale === "ar" ? data?.name_ar : data?.name) || t("name");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  const cta = (locale === "ar" ? data?.ctaText_ar : data?.ctaText_en) || t("cta");
  const ctaLink = data?.ctaLink || "#projects";
  const showScrollHint = data?.showScrollHint ?? true;

  const scrollTo = () => {
    const el = document.querySelector(ctaLink);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // التعديل: الترحيب هيظهر بعد 2.6 ثانية (وقت ما الاسبلاش بيبدأ يختفي)
          transition={{ duration: 0.6, delay: 2.6 }}
          className="text-text-secondary text-lg md:text-xl mb-4 font-medium"
        >
          {greeting}
        </motion.p>

        {/* Name */}
        <AnimatedName name={name} locale={locale} />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // التعديل: الوصف هيظهر بعد 3.5 ثانية عشان يدي فرصة للاسم يظهر قبله
          transition={{ duration: 0.8, delay: 3.5 }}
          className="text-text-secondary text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // التعديل: الزرار بيظهر بعد 3.8 ثانية
          transition={{ duration: 0.8, delay: 3.8 }}
        >
          <MagneticButton
            as="button"
            onClick={scrollTo}
            className="btn-primary text-lg px-8 py-4"
            data-cursor="view"
            strength={0.4}
          >
            {cta}
          </MagneticButton>
        </motion.div>

        {/* Scroll Hint */}
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // التعديل: السهم اللي تحت بيظهر آخر حاجة خالص بعد 4.5 ثانية
            transition={{ delay: 4.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-text-muted text-xs uppercase tracking-widest">
              {t("scrollHint")}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown size={20} className="text-text-muted" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}