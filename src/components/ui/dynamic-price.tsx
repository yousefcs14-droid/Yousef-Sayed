"use client";
import React, { useState, useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface DynamicPriceProps {
  amount?: number;
  fallbackPrice: string;
  settings: any;
}

export default function DynamicPrice({ amount, fallbackPrice, settings }: DynamicPriceProps) {
  const enableDynamic = settings?.enableDynamicPricing ?? false;
  const baseCurrency = settings?.baseCurrency || "EGP";
  
  const [finalAmount, setFinalAmount] = useState<number | null>(amount ?? null);
  const [displayCurrency, setDisplayCurrency] = useState(baseCurrency);
  const [isLoading, setIsLoading] = useState(enableDynamic && !!amount);

  useEffect(() => {
    // 💡 الكشاف رقم 1
    console.log("1️⃣ الميزة مفعلة؟", enableDynamic, "| الرقم اللي جاي من السكيما:", amount, "| العملة الأساسية:", baseCurrency);

    if (!enableDynamic || amount === undefined || amount === null) {
      console.log("2️⃣ الكود وقف! السبب: الميزة مقفولة أو إنت مش كاتب رقم في خانة Numeric Price في الداش بورد.");
      setFinalAmount(amount ?? null);
      setIsLoading(false);
      return;
    }

    async function convertCurrency() {
      try {
        console.log("3️⃣ بنحاول نكلم الـ API عشان نجيب مكانك...");
        const geoRes = await fetch("https://ipwho.is/", { cache: "no-store" });
        const geoData = await geoRes.json();
        
        console.log("4️⃣ داتا العميل اللي رجعت من الـ API:", geoData);

        if (!geoData.success) {
            console.error("❌ الـ API رفض الطلب (غالباً بسبب الـ VPN):", geoData.message);
            setFinalAmount(amount ?? null);
            setIsLoading(false);
            return;
        }

        const userCurr = geoData.currency?.code;
        console.log("5️⃣ عملتك الحالية:", userCurr);

        if (!userCurr || userCurr === baseCurrency) {
          console.log("6️⃣ عملتك هي هي العملة الأساسية، مش محتاجين نحول حاجة.");
          setFinalAmount(amount ?? null);
          setIsLoading(false);
          return;
        }

        console.log("7️⃣ بنكلم البنك نجيب أسعار الصرف...");
        const ratesRes = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
        const ratesData = await ratesRes.json();
        
        const baseRate = ratesData.rates[baseCurrency];
        const userRate = ratesData.rates[userCurr];

        if (baseRate && userRate) {
          const converted = Math.round(((amount as number) / baseRate) * userRate);
          console.log(`8️⃣ الحسبة تمت بنجاح: (${amount} / ${baseRate}) * ${userRate} = ${converted} ${userCurr}`);
          setFinalAmount(converted);
          setDisplayCurrency(userCurr);
        } else {
          console.log("❌ ملقتش سعر الصرف للعملتين دول.");
          setFinalAmount(amount ?? null);
        }
      } catch (e) {
        console.error("❌ حصل إيرور كبير في الكود:", e);
        setFinalAmount(amount ?? null);
      } finally {
        setIsLoading(false);
      }
    }
    
    convertCurrency();
  }, [amount, enableDynamic, baseCurrency]);

  if (isLoading) {
    return <span className="animate-pulse bg-white/10 dark:bg-black/10 w-24 h-10 rounded-lg inline-block" />;
  }

  return (
    <div className="flex items-baseline gap-1">
      <span className="font-heading text-4xl font-bold text-text-primary">
        {finalAmount !== null ? finalAmount.toLocaleString() : fallbackPrice}
      </span>
      {finalAmount !== null && (
        <span className="text-text-muted text-sm uppercase font-bold ms-1">
          {displayCurrency}
        </span>
      )}
    </div>
  );
}