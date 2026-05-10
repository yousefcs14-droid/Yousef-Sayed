"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl"; 
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Footer({ socials = [], settings }: { socials?: any[], settings?: any }) {
  const t = useTranslations("footer");
  const locale = useLocale(); 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  if (!isMounted) return null;

  // سحب حالة زرار الحقوق من الداش بورد (الافتراضي شغال لو مش متحدد)
  const showCopyright = settings?.showCopyright !== false; 

  const copyrightText = locale === "ar" ? settings?.copyrightText_ar : settings?.copyrightText_en;
  const finalCopyright = copyrightText || t("copyright", { year: "" }).replace("{year}", "");

  const backToTopText = locale === "ar" ? settings?.backToTopText_ar : settings?.backToTopText_en;
  const finalBackToTop = backToTopText || t("backToTop");

  const footerLogoType = settings?.footerLogoType || "text"; 
  const footerText = locale === "ar" ? settings?.footerText_ar : settings?.footerText_en; 
  
  const footerImgLight_en = settings?.footerImageLight_en?.asset?.url;
  const footerImgDark_en = settings?.footerImageDark_en?.asset?.url;
  const footerImgLight_ar = settings?.footerImageLight_ar?.asset?.url;
  const footerImgDark_ar = settings?.footerImageDark_ar?.asset?.url;

  return (
    <footer className="relative border-t border-border/50 mt-auto w-full bg-transparent z-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 w-full">
          
          <div className="flex flex-col items-center md:items-start gap-3 order-2 md:order-1">
            
            {footerLogoType === "text" && footerText && (
              <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
                {footerText}
              </h3>
            )}

            {footerLogoType === "image" && (
              <div className="flex items-center">
                {locale === "ar" ? (
                  <>
                    {footerImgLight_ar && <img src={footerImgLight_ar} alt="Footer Logo AR Light" className="h-10 md:h-12 w-auto object-contain dark:hidden" />}
                    {footerImgDark_ar && <img src={footerImgDark_ar} alt="Footer Logo AR Dark" className="h-10 md:h-12 w-auto object-contain hidden dark:block" />}
                  </>
                ) : (
                  <>
                    {footerImgLight_en && <img src={footerImgLight_en} alt="Footer Logo EN Light" className="h-10 md:h-12 w-auto object-contain dark:hidden" />}
                    {footerImgDark_en && <img src={footerImgDark_en} alt="Footer Logo EN Dark" className="h-10 md:h-12 w-auto object-contain hidden dark:block" />}
                  </>
                )}
              </div>
            )}

            {/* شرط إظهار الحقوق */}
            {showCopyright && (
              <div className="text-text-muted text-[13px] font-bold tracking-tight whitespace-nowrap">
                {/* شلنا الـ © عشان متتكررش لو إنت كاتبها بإيدك، ولو سايبها فاضية هتظهر بتاعت الترجمة */}
                {copyrightText ? finalCopyright : `© ${year} — ${finalCopyright}`}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="flex items-center gap-4">
              {socials.map((social, index) => {
                const iconOffUrl = social?.iconOff?.asset?.url;
                const iconOnUrl = social?.iconOn?.asset?.url;

                return (
                  <motion.a
                    key={social._key || index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center bg-transparent"
                    whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                  >
                    {(iconOffUrl || iconOnUrl) ? (
                      <div className="relative w-9 h-9 flex items-center justify-center">
                        {iconOffUrl && (
                          <img src={iconOffUrl} alt={social.platform} className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                        )}
                        {iconOnUrl && (
                          <img src={iconOnUrl} alt={`${social.platform} hover`} className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    ) : (
                      <span className="text-[14px] font-black text-text-secondary uppercase group-hover:text-primary transition-colors">
                        {social.platform?.substring(0, 2)}
                      </span>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center md:justify-end order-3">
            <button onClick={scrollToTop} className="flex items-center gap-3 group bg-transparent border-none cursor-pointer">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted group-hover:text-primary transition-colors">
                {finalBackToTop}
              </span>
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all"
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              >
                <ArrowUp size={16} strokeWidth={3} className="text-text-secondary group-hover:text-white transition-colors" />
              </motion.div>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}