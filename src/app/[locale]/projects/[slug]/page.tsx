"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import MagneticButton from "@/components/animations/magnetic-button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Demo project detail — CMS will replace this
const project = {
  title: "LUXE Brand Identity",
  category: "Graphic Design",
  date: "2025",
  description: "Complete brand identity system for a luxury fashion house. The project included logo design, typography system, color palette, stationery design, packaging, and brand guidelines.",
  thumbnail: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  ],
  tools: ["Photoshop", "Illustrator", "InDesign"],
};

export default function ProjectDetailPage() {
  const t = useTranslations("projectDetail");

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Back Link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#projects" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8">
              <ArrowLeft size={18} /> {t("backToProjects")}
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12">
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" sizes="100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>

          {/* Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="lg:col-span-2">
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-primary mb-4">{project.title}</h1>
              <p className="text-text-secondary text-lg leading-relaxed">{project.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="space-y-6">
              <div>
                <span className="text-text-muted text-xs uppercase tracking-widest">{t("category")}</span>
                <p className="text-text-primary font-medium mt-1">{project.category}</p>
              </div>
              <div>
                <span className="text-text-muted text-xs uppercase tracking-widest">{t("date")}</span>
                <p className="text-text-primary font-medium mt-1">{project.date}</p>
              </div>
              <div>
                <span className="text-text-muted text-xs uppercase tracking-widest">{t("tools")}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gallery */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-20">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">{t("gallery")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-20 pt-10 border-t border-border">
            <MagneticButton as="a" href="#" className="text-text-secondary hover:text-primary transition-colors font-medium">
              ← {t("prevProject")}
            </MagneticButton>
            <MagneticButton as="a" href="#" className="text-text-secondary hover:text-primary transition-colors font-medium">
              {t("nextProject")} →
            </MagneticButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
