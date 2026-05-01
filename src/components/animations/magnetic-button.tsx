"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  "data-cursor"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = motion[as] as React.ComponentType<Record<string, unknown>>;

  return (
    <div
      ref={ref}
      className="magnetic-wrap"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <Component
        className={className}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
