"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import TextReveal from "@/components/animations/text-reveal";
import Link from "next/link"; 

const categories = [
  { key: "filterAll", value: "all" },
  { key: "filterGraphic", value: "graphic-design" },
  { key: "filterVideo", value: "video-editing" },
  { key: "filterUiux", value: "ui-ux" },
  { key: "filterMotion", value: "motion-graphics" },
];

export default function ProjectsGrid({ data }: { data?: any }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState("all");

  const heading = (locale === "ar" ? data?.heading_ar : data?.heading_en) || t("title");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  const showFilters = data?.showFilters ?? true;
  const maxProjects = data?.maxProjects || 0;

  const realProjects = data?.projects || [];

  let filtered =
    activeFilter === "all"
      ? realProjects
      : realProjects.filter((p: any) => p.category === activeFilter);
      
  if (maxProjects > 0) {
    filtered = filtered.slice(0, maxProjects);
  }

  return (
    <section id="projects" className="section-spacing relative bg-background transition-colors duration-300">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <TextReveal as="h2" className="font-heading text-4xl md:text-5xl font-bold text-text-primary justify-center">
            {heading}
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary text-base mt-4 max-w-lg mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Filter Tabs */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat.value
                    ? "bg-primary border-primary text-white" 
                    : "bg-transparent border-border text-text-secondary hover:text-text-primary hover:border-text-primary"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {t(cat.key)}
              </motion.button>
            ))}
          </div>
        )}

        {/* Uniform Grid Layout */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project: any, i: number) => {
              const projectTitle = locale === "ar" ? project.title_ar || project.title : project.title;
              const imageUrl = project.thumbnail?.asset?.url || project.thumbnail || "";
              const projectSlug = project.slug?.current || project.slug || "";
              const categoryName = project.category?.replace("-", " ") || "Project";

              return (
                <motion.article
                  key={project._id || i}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                >
                  {/* Top: Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={projectTitle || "Project"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    )}
                    
                    {/* Hover Overlay Background (Dark Gradient always looks better on images) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                      <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5">
                        {categoryName}
                      </span>
                      <h3 className="text-white font-bold text-base md:text-lg leading-tight line-clamp-2">
                        {projectTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom: Fixed Title Bar (Responsive to Theme) */}
                  <div className="px-5 py-4 w-full bg-surface dark:bg-[#111111] border-t border-border relative z-10">
                    <h4 className="text-sm font-bold text-text-primary line-clamp-1">
                      {projectTitle}
                    </h4>
                  </div>

                  {/* Link Covering the entire card */}
                  {projectSlug && (
                    <Link 
                      href={`/${locale}/projects/${projectSlug}`} 
                      className="absolute inset-0 z-50 cursor-pointer"
                    >
                      <span className="sr-only">View {projectTitle}</span>
                    </Link>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}