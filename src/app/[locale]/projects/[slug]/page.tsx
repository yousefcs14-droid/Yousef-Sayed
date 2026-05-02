import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { client } from "../../../../../sanity/lib/client";
import { projectBySlugQuery } from "../../../../../sanity/lib/queries";
import urlBuilder from "@sanity/image-url";

const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations("projectDetail");
  
  // 1. جلب البيانات (تأكد أن الـ Query في ملف queries.ts يحتوي على كلمة tools)
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) notFound();

  const projectTitle = project.title || "Project Details";
  const categoryName = project.category?.replace("-", " ") || "Design";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-24 pb-20 transition-colors duration-500">
        <div className="mx-auto max-w-6xl px-6">
          
          {/* Back to Projects */}
          <div className="mb-8 animate-fade-in">
            <Link href={`/${locale}/#projects`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
              <ArrowLeft size={16} className={locale === "ar" ? "rotate-180" : ""} /> 
              {t("backToProjects")}
            </Link>
          </div>

          {/* 2. Featured Image (Rounded like the image) */}
          {project.thumbnail && (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-2xl animate-fade-in-up">
              <Image 
                src={urlFor(project.thumbnail).url()} 
                alt={projectTitle} 
                fill 
                className="object-cover" 
                priority 
              />
            </div>
          )}

          {/* 3. Project Info */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
              {categoryName}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">
              {projectTitle}
            </h1>

            {/* عرض البرامج (Tools) - الحل هنا */}
            {project.tools && project.tools.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tools.map((tool: string) => (
                  <span key={tool} className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                    {tool}
                  </span>
                ))}
              </div>
            )}
            
            {/* الوصف */}
            <p className="text-zinc-400 text-lg leading-relaxed max-w-4xl whitespace-pre-wrap">
              {locale === "ar" ? project.description_ar : project.description_en}
            </p>
          </div>

          {/* 4. Gallery Section (4 columns like the image) */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="font-heading text-2xl font-bold mb-10 text-zinc-100">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.gallery.map((img: any, i: number) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                    <Image 
                      src={urlFor(img).url()} 
                      alt={`${projectTitle} gallery ${i}`} 
                      fill 
                      className="object-cover hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}