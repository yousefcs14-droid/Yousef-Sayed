"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={`${className} flex flex-wrap`}>
        {words.map((word, i) => {
          const start = (i / words.length) * 0.8 + delay * 0.1;
          const end = start + 0.3;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </Tag>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <span className="me-[0.3em] inline-block overflow-hidden">
      <motion.span className="inline-block" style={{ opacity, y }}>
        {children}
      </motion.span>
    </span>
  );
}
