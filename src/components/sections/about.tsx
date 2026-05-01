"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import TextReveal from "@/components/animations/text-reveal";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function About({ data }: { data?: any }) {
  const t = useTranslations("about");
  const locale = useLocale();

  const heading = (locale === "ar" ? data?.heading_ar : data?.heading_en) || t("title");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  const showStats = data?.showStats ?? true;
  const showVideo = data?.showVideo ?? true;

  return (
    <section id="about" className="section-spacing relative">
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
            className="text-text-secondary text-lg mt-4"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Content — Split Layout */}
        <div className={`grid grid-cols-1 ${showVideo ? "lg:grid-cols-2" : ""} gap-12 lg:gap-20 items-center`}>
          {/* Video / Visual Side */}
          {showVideo && (
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card p-1">
              <div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-surface relative">
                {/* Placeholder gradient — will be replaced by profile video loop from CMS */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      borderColor: [
                        "rgba(99,102,241,0.3)",
                        "rgba(139,92,246,0.5)",
                        "rgba(99,102,241,0.3)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <span className="font-heading text-4xl font-bold text-primary">
                      YS
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
          </motion.div>
          )}

          {/* Bio Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {t("bio")
              .split("\n\n")
              .map((paragraph, i) => (
                <TextReveal
                  key={i}
                  as="p"
                  className="text-text-secondary text-lg leading-relaxed"
                  delay={i * 0.3}
                >
                  {paragraph}
                </TextReveal>
              ))}

            {/* Stats */}
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
              >
                {[
                  { number: "5+", label: "Years Experience" },
                  { number: "50+", label: "Projects Completed" },
                  { number: "30+", label: "Happy Clients" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <span className="font-heading text-3xl md:text-4xl font-bold text-primary">
                      {stat.number}
                    </span>
                    <p className="text-text-muted text-sm mt-1">{stat.label}</p>
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
