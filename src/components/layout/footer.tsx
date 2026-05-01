"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/magnetic-button";

// المسار اتظبط صح 100% هنا
import { client } from "../../../sanity/lib/client";
import { siteSettingsQuery } from "../../../sanity/lib/queries";

const getIcon = (platform: string) => {
  const className = "w-5 h-5 transition-colors group-hover:text-primary text-text-muted";
  switch (platform?.toLowerCase()) {
    case "behance":
      return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.881v1.733h-8.006c.057 1.628 1.227 2.75 2.815 2.75 1.586 0 2.352-.83 2.644-1.769h2.371zm-4.225-3.391c-.056-1.381-1.054-2.193-2.196-2.193-1.144 0-2.072.812-2.148 2.193h4.344zm-13.336-1.503c1.788 0 3.024-1.282 3.024-2.915 0-1.636-1.236-2.92-3.024-2.92h-5.965v11.758h6.241c1.84 0 3.197-1.332 3.197-3.048 0-1.633-1.127-2.618-2.316-2.825 1.488-.205 2.508-1.391 2.508-3.025v-.025c0-1.543-1.04-2.853-2.668-3v3.003h-2.128zm0 4.417h-2.128v-3.004h2.128c1.077 0 1.776.711 1.776 1.504 0 .791-.699 1.5-1.776 1.5zm-.507-6.074h-1.621v-2.738h1.621c.961 0 1.564.587 1.564 1.366 0 .783-.603 1.372-1.564 1.372z" /></svg>;
    case "dribbble":
      return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path></svg>;
    case "linkedin":
      return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
    case "instagram":
      return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
    default:
      return null;
  }
};

export default function Footer() {
  const t = useTranslations("footer");
  
  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await client.fetch(siteSettingsQuery);
        if (data && data.socialLinks) {
          setSocials(data.socialLinks);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocials();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border mt-10">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative w-full">
          
          <div className="z-10 text-center md:text-left">
            <p className="text-text-muted text-sm font-medium">
              {t("copyright", { year })}
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 md:absolute md:left-1/2 md:-translate-x-1/2 z-0">
            {socials.map((social, index) => (
              <motion.a
                key={social._key || index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 flex items-center justify-center"
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {getIcon(social.platform)}
                <span className="sr-only">{social.platform}</span>
              </motion.a>
            ))}
          </div>

          <div className="z-10">
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors group font-medium"
            >
              <span>{t("backToTop")}</span>
              <motion.div
                className="bg-border/30 p-1.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowUp size={14} />
              </motion.div>
            </MagneticButton>
          </div>

        </div>
      </div>
    </footer>
  );
}