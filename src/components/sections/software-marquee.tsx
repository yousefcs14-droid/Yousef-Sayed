"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// --- إعدادات سانيتي ---
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zhfs6dr9",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});
const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

// --- بيانات تجريبية ---
const fallbackTools = [
  { name: "Photoshop", level: 95, color: "#31A8FF" },
  { name: "Illustrator", level: 90, color: "#FF9A00" },
  { name: "Figma", level: 98, color: "#F24E1E" },
  { name: "After Effects", level: 85, color: "#9999FF" },
  { name: "Premiere", level: 88, color: "#EA77FF" },
  { name: "Cinema 4D", level: 75, color: "#5117FD" }
];

export default function SoftwareMarquee({ data }: any) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const heading = isRtl ? data?.heading_ar : data?.heading_en;
  const tools = data?.tools?.length > 0 ? data.tools : fallbackTools;

  return (
    <section className="py-16 bg-transparent" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-6">
        
        {heading && (
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {heading}
            </h2>
            <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full" />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool: any, i: number) => {
            // --- فلتر الأمان (عشان الموشر يظهر غصب عنه) ---
            const levelValue = parseInt(tool.level) || 0; // تحويل لأرقام
            const rawColor = tool.color || "#3b82f6"; // لون افتراضي
            const finalColor = rawColor.startsWith('#') ? rawColor : `#${rawColor}`; // تصليح الـ Hex

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-white/5 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden"
              >
                
                {/* 1. الأيقونة */}
                <div className="relative w-14 h-14 mb-5 transition-transform duration-300 group-hover:scale-110">
                  {tool.icon ? (
                    <Image src={urlFor(tool.icon).url()} alt={tool.name} fill className="object-contain" />
                  ) : (
                    <div 
                      className="w-full h-full rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                      style={{ backgroundColor: finalColor }}
                    >
                      {tool.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* 2. الاسم */}
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 tracking-tight">
                  {tool.name}
                </h3>

                {/* 3. منطقة النسبة والمؤشر */}
                <div className="w-full px-2">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[9px] uppercase font-bold opacity-40">Skill Level</span>
                    <span className="text-[12px] font-black" style={{ color: finalColor }}>
                      {levelValue}%
                    </span>
                  </div>

                  {/* الـ Progress Bar */}
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${levelValue}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full absolute top-0 start-0"
                      style={{ 
                        backgroundColor: finalColor, 
                        boxShadow: `0 0 10px ${finalColor}80` 
                      }}
                    />
                  </div>
                </div>

                {/* لمسة الإضاءة الخلفية */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-[2rem] pointer-events-none"
                  style={{ backgroundColor: finalColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}