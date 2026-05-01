"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <motion.button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3 h-10 rounded-full glass text-text-primary hover:border-primary transition-colors text-sm font-medium"
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <Languages size={16} />
      <span className="font-heading text-xs uppercase tracking-wider">
        {locale === "en" ? "ع" : "EN"}
      </span>
    </motion.button>
  );
}
