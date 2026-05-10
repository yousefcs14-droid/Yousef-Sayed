"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl"; 
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import LanguageToggle from "@/components/ui/language-toggle";

interface NavLink {
  title_en: string;
  title_ar: string;
  href: string;
}

export default function Navbar({ navLinks = [], settings }: { navLinks?: NavLink[], settings?: any }) {
  const locale = useLocale(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); 

  const defaultLinks = [
    { title_en: "Home", title_ar: "الرئيسية", href: "#hero" },
    { title_en: "Projects", title_ar: "أعمالي", href: "#projects" },
    { title_en: "About", title_ar: "من أنا", href: "#about" },
    { title_en: "Experience", title_ar: "خبراتي", href: "#experience" },
    { title_en: "Contact", title_ar: "تواصل معي", href: "#contact" },
  ];

  const finalLinks = navLinks && navLinks.length > 0 ? navLinks : defaultLinks;

  const logoType = settings?.logoType || "image"; 
  const logoText = settings?.logoText || "Youssef."; 
  
  // سحب الـ 4 لوجوهات من الداش بورد
  const logoLightUrl_en = settings?.logoImageLight_en?.asset?.url || "/logo-light.png"; 
  const logoDarkUrl_en = settings?.logoImageDark_en?.asset?.url || "/logo-dark.png"; 
  const logoLightUrl_ar = settings?.logoImageLight_ar?.asset?.url || "/logo-light.png"; 
  const logoDarkUrl_ar = settings?.logoImageDark_ar?.asset?.url || "/logo-dark.png"; 

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 2800); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${locale}${href}`;
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: !hasLoaded ? -100 : 0, opacity: !hasLoaded ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${isScrolled ? "py-3" : "py-5"}`}
      >
        <nav className="mx-auto max-w-7xl px-6">
          <div className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${isScrolled ? "glass-strong border border-white/5 dark:border-white/10 shadow-2xl shadow-black/10" : ""}`}>
            
            <motion.a href="#hero" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative flex items-center justify-start cursor-pointer" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}>
              {logoType === "text" ? (
                <span className="text-xl md:text-2xl font-black tracking-tighter text-text-primary whitespace-nowrap py-1">
                  {logoText}
                </span>
              ) : (
                <div className="flex items-center">
                  {/* تم التصغير هنا إلى h-6 للموبايل و h-8 للديسكتوب */}
                  {locale === "ar" ? (
                    <>
                      <img src={logoLightUrl_ar} alt="Logo Arabic Light" className="h-6 md:h-8 w-auto object-contain dark:hidden" />
                      <img src={logoDarkUrl_ar} alt="Logo Arabic Dark" className="h-6 md:h-8 w-auto object-contain hidden dark:block" />
                    </>
                  ) : (
                    <>
                      <img src={logoLightUrl_en} alt="Logo English Light" className="h-6 md:h-8 w-auto object-contain dark:hidden" />
                      <img src={logoDarkUrl_en} alt="Logo English Dark" className="h-6 md:h-8 w-auto object-contain hidden dark:block" />
                    </>
                  )}
                </div>
              )}
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              {finalLinks.map((link, index) => (
                <button key={index} onClick={() => scrollTo(link.href)} className="relative group px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-xl hover:bg-surface-hover font-medium overflow-hidden">
                  <span className="relative z-10">{locale === "ar" ? link.title_ar : link.title_en}</span>
                  <span className="absolute bottom-1.5 left-1/2 w-0 h-[2px] bg-primary -translate-x-1/2 transition-all duration-300 group-hover:w-1/2 rounded-full opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />

              <motion.button className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary border border-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={18} strokeWidth={2.5} /></motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={18} strokeWidth={2.5} /></motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed inset-0 z-[99] bg-background/90 flex items-center justify-center">
            <motion.nav className="flex flex-col items-center gap-6">
              {finalLinks.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.button initial={{ opacity: 0, y: 50, rotateX: -20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: 30, rotateX: 20 }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} onClick={() => scrollTo(link.href)} className="text-4xl font-heading font-black text-text-primary hover:text-primary transition-colors tracking-tight">
                    {locale === "ar" ? link.title_ar : link.title_en}
                  </motion.button>
                </div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}