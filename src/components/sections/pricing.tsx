"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Check, X } from "lucide-react";
import TextReveal from "@/components/animations/text-reveal";
import MagneticButton from "@/components/animations/magnetic-button";
import DynamicPrice from "@/components/ui/dynamic-price";

interface Feature {
  text_en?: string;
  text_ar?: string;
  included?: boolean;
}

interface Plan {
  name_en?: string;
  name_ar?: string;
  price?: string;
  numericPrice?: number; // 🔴 ضفنا دي هنا عشان الإيرور الأحمر يروح
  period_en?: string;
  period_ar?: string;
  description_en?: string;
  description_ar?: string;
  features?: Feature[];
  highlighted?: boolean;
  ctaText_en?: string;
  ctaText_ar?: string;
  ctaLink?: string;
}

interface Props {
  data?: {
    heading_en?: string;
    heading_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    plans?: Plan[];
  };
  settings?: any;
}

export default function Pricing({ data, settings }: Props) {
  const locale = useLocale();
  const heading = locale === "ar" ? data?.heading_ar : data?.heading_en;
  const subtitle = locale === "ar" ? data?.subtitle_ar : data?.subtitle_en;
  const plans = data?.plans || [];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-spacing relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl font-bold text-text-primary justify-center">
            {heading || (locale === "ar" ? "الأسعار" : "Pricing")}
          </TextReveal>
          {subtitle && (
            <motion.p initial={{ opacity: 0 }} className="text-text-secondary text-lg mt-4 max-w-lg mx-auto">
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const name = locale === "ar" ? plan.name_ar : plan.name_en;
            const period = locale === "ar" ? plan.period_ar : plan.period_en;
            const desc = locale === "ar" ? plan.description_ar : plan.description_en;
            const cta = locale === "ar" ? plan.ctaText_ar : plan.ctaText_en;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`glass-card p-8 flex flex-col relative ${plan.highlighted ? "border-primary ring-1 ring-primary/20" : ""}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase">
                    {locale === "ar" ? "الأفضل" : "Popular"}
                  </div>
                )}

                <h3 className="font-heading text-xl font-bold text-text-primary">{name}</h3>
                
                <div className="mt-4 mb-2">
                  <DynamicPrice 
                    amount={plan.numericPrice} 
                    fallbackPrice={plan.price || ""} 
                    settings={settings} 
                  />
                  {period && <span className="text-text-muted text-sm ms-1">/ {period}</span>}
                </div>
                
                {desc && <p className="text-text-secondary text-sm mb-6">{desc}</p>}

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features?.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm">
                      {f.included ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-text-muted" />}
                      <span className={f.included ? "" : "line-through text-text-muted"}>
                        {locale === "ar" ? f.text_ar : f.text_en}
                      </span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  as="button"
                  onClick={() => scrollTo(plan.ctaLink || "#contact")}
                  className={`w-full justify-center ${plan.highlighted ? "btn-primary" : "btn-outline"}`}
                >
                  {cta}
                </MagneticButton>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}