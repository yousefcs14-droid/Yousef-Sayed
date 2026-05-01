"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import dynamic from "next/dynamic";

// بنجبر الصفحة تشتغل في المتصفح فقط
const StudioPage = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function Studio() {
  return <StudioPage config={config} />;
}