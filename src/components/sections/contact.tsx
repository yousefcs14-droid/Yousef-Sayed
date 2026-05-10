"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import TextReveal from "@/components/animations/text-reveal";
import MagneticButton from "@/components/animations/magnetic-button";

// التعديل: حطينا رقمك بالكود الدولي لمصر (20+) عشان الواتساب يشتغل صح
const WHATSAPP_NUMBER = "201142545272"; 

const schema = z.object({
  name: z.string().min(1, "required"),
  email: z.string().email("invalidEmail"),
  service: z.string().min(1, "required"),
  message: z.string().min(1, "required"),
});

type FormData = z.infer<typeof schema>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Contact({ data }: { data?: any }) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [sent, setSent] = useState(false);

  const heading = (locale === "ar" ? data?.heading_ar : data?.heading_en) || t("title");
  const subtitle = (locale === "ar" ? data?.subtitle_ar : data?.subtitle_en) || t("subtitle");
  const showServiceDropdown = data?.showServiceDropdown ?? true;
  
  // بياخد الرقم من السانتي لو موجود، لو مش موجود بياخد الرقم بتاعك اللي فوق
  const currentWhatsappNumber = data?.whatsappOverride || WHATSAPP_NUMBER;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: FormData) => {
    // رسالة الواتساب متنسقة جاهزة
    const text = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}${showServiceDropdown ? `%0A*Service:* ${formData.service}` : ''}%0A*Message:* ${formData.message}`;
    const url = `https://wa.me/${currentWhatsappNumber}?text=${text}`;
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const services = [
    { value: "graphic-design", label: t("serviceGraphic") },
    { value: "video-editing", label: t("serviceVideo") },
    { value: "ui-ux", label: t("serviceUiux") },
    { value: "motion-graphics", label: t("serviceMotion") },
    { value: "other", label: t("serviceOther") },
  ];

  const inputBase = "w-full px-5 py-4 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted text-sm transition-all duration-300 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none";

  return (
    <section id="contact" className="section-spacing relative">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl font-bold text-text-primary justify-center">
            {heading}
          </TextReveal>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-text-secondary text-lg mt-4 max-w-lg mx-auto">
            {subtitle}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input {...register("name")} placeholder={t("name")} className={inputBase} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{t(errors.name.message as string)}</p>}
              </div>
              <div>
                <input {...register("email")} type="email" placeholder={t("email")} className={inputBase} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{t(errors.email.message as string)}</p>}
              </div>
            </div>

            {showServiceDropdown && (
              <div>
                <select {...register("service")} className={`${inputBase} appearance-none cursor-pointer`} defaultValue="">
                  <option value="" disabled>{t("servicePlaceholder")}</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{t(errors.service.message as string)}</p>}
              </div>
            )}

            <div>
              <textarea {...register("message")} rows={5} placeholder={t("messagePlaceholder")} className={`${inputBase} resize-none`} />
              {errors.message && <p className="text-red-500 text-xs mt-1">{t(errors.message.message as string)}</p>}
            </div>

            <div className="flex justify-center pt-4">
              <MagneticButton as="button" type="submit" className="btn-primary text-base px-10 py-4 flex items-center gap-2" data-cursor="view" strength={0.3}>
                {sent ? (
                  <><CheckCircle size={18} /> <span>{t("successTitle") || "Sent!"}</span></>
                ) : (
                  <><Send size={18} /> <span>{t("send") || "Send Message"}</span></>
                )}
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}