"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // التايمر بتاعك زي ما هو 2.8 ثانية
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          // التعديل السحري هنا:
          // bg-[#FAFAFA] أو bg-white للايت مود
          // dark:bg-[#0F0E0E] للدارك مود
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0F0E0E]"
        >
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            
            {/* الاسبلاش بتاع اللايت مود (بيختفي في الدارك) */}
            <Image
              src="/splash-light.gif" 
              alt="Loading..."
              fill
              className="object-contain dark:hidden"
              priority
              unoptimized 
            />

            {/* الاسبلاش بتاع الدارك مود (بيظهر بس في الدارك) */}
            <Image
              src="/splash-dark.gif" 
              alt="Loading..."
              fill
              className="object-contain hidden dark:block"
              priority
              unoptimized 
            />
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}