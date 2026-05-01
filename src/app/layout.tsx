import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youssef Sayed — Designer & Visual Storyteller",
  description: "Crafting visual stories through design, motion & video.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
