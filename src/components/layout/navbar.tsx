"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import LanguageToggle from "@/components/ui/language-toggle";
import MagneticButton from "@/components/animations/magnetic-button";

const navLinks = [
  { key: "home", href: "#hero" },
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setHidden(currentY > lastScrollY.current && currentY > 300);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              isScrolled ? "glass-strong" : ""
            }`}
          >
            {/* Logo */}
            <MagneticButton
              as="a"
              href="#hero"
              className="font-heading text-xl font-bold text-text-primary tracking-tight"
              onClick={() => scrollTo("#hero")}
            >
              YS<span className="text-primary">.</span>
            </MagneticButton>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-xl hover:bg-surface-hover font-medium"
                >
                  {t(link.key)}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? t("close") : t("menu")}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex items-center justify-center"
          >
            <motion.nav
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-3xl font-heading font-bold text-text-primary hover:text-primary transition-colors"
                >
                  {t(link.key)}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
