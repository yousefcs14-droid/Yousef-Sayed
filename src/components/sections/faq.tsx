"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import TextReveal from "@/components/animations/text-reveal";

interface FaqItem {
  question_en?: string;
  question_ar?: string;
  answer_en?: string;
  answer_ar?: string;
}

interface Props {
  data?: {
    heading_en?: string;
    heading_ar?: string;
    items?: FaqItem[];
  };
}

const fallbackItems: FaqItem[] = [
  {
    question_en: "What services do you offer?",
    question_ar: "ما الخدمات التي تقدمها؟",
    answer_en: "I offer Graphic Design, Video Editing, UI/UX Design, and Motion Graphics services. Each project is customized to meet your specific needs.",
    answer_ar: "أقدم خدمات تصميم الجرافيك، مونتاج الفيديو، تصميم واجهات المستخدم، وموشن جرافيكس. كل مشروع مخصص لتلبية احتياجاتك.",
  },
  {
    question_en: "How long does a typical project take?",
    question_ar: "كم يستغرق المشروع عادةً؟",
    answer_en: "Project timelines vary based on complexity. A logo design may take 1-2 weeks, while a full brand identity could take 4-6 weeks.",
    answer_ar: "تختلف المدة حسب التعقيد. قد يستغرق تصميم الشعار أسبوع إلى أسبوعين، بينما الهوية البصرية الكاملة قد تستغرق 4-6 أسابيع.",
  },
  {
    question_en: "Do you offer revisions?",
    question_ar: "هل تقدم مراجعات؟",
    answer_en: "Yes! All packages include revisions. The number depends on the plan you choose, with unlimited revisions available in the Professional tier.",
    answer_ar: "نعم! جميع الباقات تشمل مراجعات. يعتمد العدد على الباقة المختارة، مع مراجعات غير محدودة في الباقة الاحترافية.",
  },
  {
    question_en: "What is your payment process?",
    question_ar: "ما هي طريقة الدفع؟",
    answer_en: "I typically require a 50% deposit upfront, with the remaining balance due upon project completion and approval.",
    answer_ar: "عادةً أطلب دفعة مقدمة بنسبة 50%، والمبلغ المتبقي عند إتمام المشروع والموافقة عليه.",
  },
];

export default function FAQ({ data }: Props) {
  const locale = useLocale();
  const heading = locale === "ar" ? data?.heading_ar : data?.heading_en;
  const items = data?.items?.length ? data.items : fallbackItems;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-spacing relative">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <TextReveal as="h2" className="font-heading text-4xl md:text-6xl font-bold text-text-primary justify-center">
            {heading || (locale === "ar" ? "الأسئلة الشائعة" : "FAQ")}
          </TextReveal>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => {
            const question = locale === "ar" ? item.question_ar : item.question_en;
            const answer = locale === "ar" ? item.answer_ar : item.answer_en;
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-start"
                >
                  <span className="font-heading font-semibold text-text-primary text-lg pe-4">
                    {question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-primary"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
