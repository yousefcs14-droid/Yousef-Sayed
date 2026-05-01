"use client";

import React, { useEffect } from "react";

interface SanityColor {
  hex?: string;
}

interface ThemeColors {
  lightBackground?: SanityColor | null;
  lightSurface?: SanityColor | null;
  lightPrimary?: SanityColor | null;
  lightTextPrimary?: SanityColor | null;
  lightTextSecondary?: SanityColor | null;
  darkBackground?: SanityColor | null;
  darkSurface?: SanityColor | null;
  darkPrimary?: SanityColor | null;
  darkTextPrimary?: SanityColor | null;
  darkTextSecondary?: SanityColor | null;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function darken(hex: string, amount: number): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function lighten(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export default function ThemeInjector({ colors }: { colors: ThemeColors | null }) {
  useEffect(() => {
    if (!colors) return;
    const root = document.documentElement;

    // Inject Light Mode variables on :root
    const lightVars: Record<string, string> = {};
    if (colors.lightBackground?.hex) lightVars["--background"] = colors.lightBackground.hex;
    if (colors.lightSurface?.hex) lightVars["--surface"] = colors.lightSurface.hex;
    if (colors.lightPrimary?.hex) {
      lightVars["--primary"] = colors.lightPrimary.hex;
      lightVars["--primary-hover"] = darken(colors.lightPrimary.hex, 20);
      lightVars["--primary-glow"] = `rgba(${hexToRgb(colors.lightPrimary.hex)}, 0.15)`;
    }
    if (colors.lightTextPrimary?.hex) lightVars["--text-primary"] = colors.lightTextPrimary.hex;
    if (colors.lightTextSecondary?.hex) lightVars["--text-secondary"] = colors.lightTextSecondary.hex;

    // Create or update a <style> tag with CSS overrides
    let styleEl = document.getElementById("cms-theme-overrides") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "cms-theme-overrides";
      document.head.appendChild(styleEl);
    }

    // Build dark mode overrides
    const darkVars: Record<string, string> = {};
    if (colors.darkBackground?.hex) darkVars["--background"] = colors.darkBackground.hex;
    if (colors.darkSurface?.hex) {
      darkVars["--surface"] = colors.darkSurface.hex;
      darkVars["--surface-hover"] = lighten(colors.darkSurface.hex, 15);
      darkVars["--border"] = lighten(colors.darkSurface.hex, 15);
    }
    if (colors.darkPrimary?.hex) {
      darkVars["--primary"] = colors.darkPrimary.hex;
      darkVars["--primary-hover"] = lighten(colors.darkPrimary.hex, 30);
      darkVars["--primary-glow"] = `rgba(${hexToRgb(colors.darkPrimary.hex)}, 0.2)`;
    }
    if (colors.darkTextPrimary?.hex) darkVars["--text-primary"] = colors.darkTextPrimary.hex;
    if (colors.darkTextSecondary?.hex) {
      darkVars["--text-secondary"] = colors.darkTextSecondary.hex;
      darkVars["--text-muted"] = darken(colors.darkTextSecondary.hex, 30);
    }

    // Generate CSS
    const lightCSS = Object.entries(lightVars).map(([k, v]) => `${k}: ${v};`).join("\n  ");
    const darkCSS = Object.entries(darkVars).map(([k, v]) => `${k}: ${v};`).join("\n  ");

    styleEl.textContent = `
:root {
  ${lightCSS}
}
.dark {
  ${darkCSS}
}`;

    // Also apply derived variables on surface-hover and border for light mode
    if (colors.lightSurface?.hex) {
      const surf = colors.lightSurface.hex;
      root.style.setProperty("--surface-hover", darken(surf, 5));
      root.style.setProperty("--border", darken(surf, 15));
    }
  }, [colors]);

  return null; // This component injects CSS, renders nothing
}
