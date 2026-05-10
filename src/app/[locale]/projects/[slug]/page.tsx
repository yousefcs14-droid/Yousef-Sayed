import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { client } from "../../../../../sanity/lib/client";
import { projectBySlugQuery } from "../../../../../sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import BackButton from "@/components/ui/back-button"; 

/* eslint-disable @typescript-eslint/no-explicit-any */
function getEmbedUrl(url: string) {
  if (!url) return "";
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  if (ytMatch && ytMatch[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations("projectDetail");
  const project = await client.fetch(projectBySlugQuery, { slug: slug });

  if (!project) notFound();

  const caseStudy = locale === "ar" ? project.caseStudy_ar : project.caseStudy_en;

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        <BackButton locale={locale} text={t("backToProjects")} />

        {/* غلاف المشروع */}
        {project.thumbnail?.asset?.url && (
          <div className="mt-12 rounded-[2.5rem] overflow-hidden border border-border/20 bg-surface/30 p-4 md:p-8 shadow-2xl">
            <Image src={project.thumbnail.asset.url} alt={project.title || "Cover"} width={1920} height={1080} className="w-full h-auto rounded-2xl object-contain max-h-[75vh]" priority />
          </div>
        )}

        {/* الرأس والمعلومات */}
        <div className="mt-16 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-text-secondary text-xs font-bold uppercase tracking-widest">
            <span>{project.category}</span>
            {project.date && (
              <>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{new Date(project.date).getFullYear()}</span>
              </>
            )}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-heading font-bold">{project.title}</h1>
          
          {/* الأدوات (Tools) */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {project.tools.map((tool: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border/40 shadow-sm">
                  {tool.icon?.asset?.url && (
                    <Image src={tool.icon.asset.url} alt={tool.name || "Icon"} width={18} height={18} className="object-contain" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-tight">{tool.name}</span>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-4xl whitespace-pre-wrap">
            {locale === "ar" ? project.description_ar : project.description_en}
          </p>
        </div>

        {/* محتوى دراسة الحالة (Case Study) */}
        {caseStudy && (
          <div className="mt-20 prose prose-lg dark:prose-invert max-w-4xl prose-img:rounded-3xl prose-headings:font-heading">
            <PortableText value={caseStudy} />
          </div>
        )}

        {/* المعرض المدمج القابل للترتيب (صور وفيديوهات) */}
        {project.mediaGallery && project.mediaGallery.length > 0 && (
          <div className="mt-24">
            <div className={project.detailsLayout === "grid" ? "columns-1 md:columns-2 gap-8" : "flex flex-col gap-12"}>
              {project.mediaGallery.map((item: any, idx: number) => {
                
                // لو العنصر فيديو
                if (item._type === "videoElement" && item.url) {
                  return (
                    <div key={item._key || idx} className="rounded-3xl overflow-hidden border border-border/10 bg-surface/20 shadow-md break-inside-avoid mb-8">
                      <div className="aspect-video bg-black">
                        <iframe src={getEmbedUrl(item.url)} className="w-full h-full" allowFullScreen></iframe>
                      </div>
                    </div>
                  );
                }
                
                // لو العنصر صورة
                if (item._type === "image" && item.asset?.url) {
                  return (
                    <div key={item._key || idx} className="rounded-3xl overflow-hidden border border-border/10 bg-surface/20 shadow-md break-inside-avoid mb-8">
                      <Image src={item.asset.url} alt={`Gallery Item ${idx}`} width={1400} height={1000} className="w-full h-auto" />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}