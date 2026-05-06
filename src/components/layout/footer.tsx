"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/magnetic-button";

export default function Footer({ socials = [] }: { socials?: any[] }) {
  const t = useTranslations("footer");
  
  // حارس البوابة: بيمنع الفوتر يظهر وقت التحميل
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  // لو الصفحة لسه بتحمل، متطبعش أي حاجة (عشان نمنع النطة نهائياً)
  if (!isMounted) {
    return null;
  }

  return (
    <footer className="relative border-t border-black/[0.08] dark:border-white/[0.1] mt-auto w-full bg-background z-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 w-full">
          
          {/* 1. الحقوق */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="text-zinc-500 dark:text-zinc-400 text-[13px] font-bold tracking-tight whitespace-nowrap">
              © {year} — {t("copyright", { year: "" }).replace("{year}", "")}
            </div>
          </div>

          {/* 2. الأيقونات - أنيميشن طلقة (0.1 ثانية) */}
          <div className="flex justify-center items-center gap-4 order-1 md:order-2">
            {socials.map((social, index) => {
              const iconUrl = social?.iconImage?.asset?.url;

              return (
                <motion.a
                  key={social._key || index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 flex items-center justify-center rounded-full 
                             bg-zinc-200/50 dark:bg-white/[0.07] 
                             border border-black/10 dark:border-white/10
                             transition-colors duration-100 hover:bg-primary"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 1000, damping: 15 }}
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md bg-primary/30 transition-opacity duration-100" />
                  {iconUrl ? (
                    <img 
                      src={iconUrl} 
                      alt={social.platform} 
                      className="w-5 h-5 z-10 brightness-110 contrast-125 transition-all duration-100" 
                    />
                  ) : (
                    <span className="text-[10px] font-black z-10 text-black dark:text-white">
                      {social.platform?.substring(0, 2)}
                    </span>
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* 3. زر العودة للأعلى */}
          <div className="flex justify-center md:justify-end order-3">
            <MagneticButton as="button" onClick={scrollToTop} className="flex items-center gap-3 group">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-primary transition-colors">
                {t("backToTop")}
              </span>
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-black/10 dark:border-white/20 flex items-center justify-center group-hover:bg-primary transition-all"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 1000 }}
              >
                <ArrowUp size={16} strokeWidth={3} className="text-zinc-600 dark:text-zinc-400 group-hover:text-white transition-colors" />
              </motion.div>
            </MagneticButton>
          </div>

        </div>
      </div>
    </footer>
  );
}