"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import TextReveal from "@/components/animations/text-reveal";

const categories = [
  { key: "filterAll", value: "all" },
  { key: "filterGraphic", value: "graphic-design" },
  { key: "filterVideo", value: "video-editing" },
  { key: "filterUiux", value: "ui-ux" },
  { key: "filterMotion", value: "motion-graphics" },
];

// Bento grid layout classes for varied aspect ratios
const bentoLayouts = [
  "md:col-span-2 md:row-span-2",   // Large
  "md:col-span-1 md:row-span-1",   // Small
  "md:col-span-1 md:row-span-2",   // Tall
  "md:col-span-1 md:row-span-1",   // Small
  "md:col-span-2 md:row-span-1",   // Wide
  "md:col-span-1 md:row-span-1",   // Small
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProjectsGrid({ data }: { data?: any }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState("all");

  const heading = (locale === "ar" ? data?.heading_ar : data?.heading_en) || t("title");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  const showFilters = data?.showFilters ?? true;
  const maxProjects = data?.maxProjects || 0;

  // هنا خلينا الكود يسحب المشاريع الحقيقية من الداتا بتاعتك
  const realProjects = data?.projects || [];

  let filtered =
    activeFilter === "all"
      ? realProjects
      : realProjects.filter((p: any) => p.category === activeFilter);
      
  if (maxProjects > 0) {
    filtered = filtered.slice(0, maxProjects);
  }

  return (
    <section id="projects" className="section-spacing relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <TextReveal
            as="h2"
            className="font-heading text-4xl md:text-6xl font-bold text-text-primary justify-center"
          >
            {heading}
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary text-lg mt-4 max-w-lg mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Filter Tabs */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.value
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "glass text-text-secondary hover:text-text-primary"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {t(cat.key)}
              </motion.button>
            ))}
          </div>
        )}

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project: any, i: number) => {
              // بنحدد الداتا بناءً على اللغة (عربي أو إنجليزي)
              const projectTitle = locale === "ar" ? project.title_ar || project.title : project.title;
              const projectDescription = locale === "ar" ? project.description_ar : project.description_en;
              // بنجيب رابط الصورة الحقيقي من سانيتي
              const imageUrl = project.thumbnail?.asset?.url || project.thumbnail || "";

              return (
                <motion.article
                  key={project._id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative rounded-2xl overflow-hidden project-card-media ${
                    bentoLayouts[i % bentoLayouts.length]
                  }`}
                  data-cursor="view"
                >
                  {/* Thumbnail */}
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={projectTitle || "Project"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
                      {project.category?.replace("-", " ") || "Project"}
                    </span>
                    <h3 className="text-white font-heading text-xl md:text-2xl font-bold">
                      {projectTitle}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 line-clamp-2">
                      {projectDescription}
                    </p>
                  </div>

                  {/* Glassmorphism border on hover */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-2xl transition-all duration-500" />
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}