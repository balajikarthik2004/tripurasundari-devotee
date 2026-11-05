import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Tag,
  Share2,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Calendar,
  Compass,
  Sparkles,
} from "lucide-react";
import { heritageArticles } from "../data/heritageArticlesData";

export default function HeritageArticlePage({ articleId, onNavigate }) {
  const [copied, setCopied] = useState(false);

  // Find the selected article or default to the first one
  const article =
    heritageArticles.find((a) => a.id === articleId) || heritageArticles[0];

  // Other related articles to show at the bottom
  const relatedArticles = heritageArticles.filter((a) => a.id !== article.id);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const scrollable = document.querySelector(".custom-scrollbar");
    if (scrollable) {
      scrollable.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [article.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Top Navigation Bar with Back Button & Share */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => {
            if (onNavigate) {
              onNavigate("home");
            } else if (typeof window !== "undefined") {
              window.location.hash = "home";
            }
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E8DCC8] hover:border-[#6F1837] text-[#6F1837] text-xs font-bold shadow-2xs hover:bg-[#FFF9EF] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Heritage & Stories</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8DCC8] text-xs font-semibold text-[#5D5460] hover:text-[#6F1837] hover:border-[#C79A3B] transition-all shadow-2xs cursor-pointer"
            title="Share this article"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Story"}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Article Header & Cover Banner */}
      <header className="space-y-4">
        {/* Category Tag & Reading Time */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF3DC] border border-[#DFC17B] text-[#8C5D17] text-xs font-bold tracking-wide uppercase shadow-2xs">
            <Tag className="w-3 h-3 text-[#B68A36]" />
            <span>{article.tag}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#7A6448] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#B68A36]" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#6F1837] tracking-tight leading-tight">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-sm sm:text-base font-medium text-[#7A6448]">
              {article.subtitle}
            </p>
          )}
        </div>

        {/* Large Cover Image with Frame */}
        <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#DEC077]/70 shadow-sm bg-[#F5EFE6]">
          <img
            src={article.image}
            alt={article.title}
            onError={(e) => {
              if (article.fallback && e.currentTarget.src !== article.fallback) {
                e.currentTarget.src = article.fallback;
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white/90 text-xs sm:text-sm font-medium drop-shadow-md">
            Mata Tripura Sundari Temple Heritage • Matabari, Udaipur, Tripura
          </div>
        </div>
      </header>

      {/* 3. Article Introduction Lead Paragraph */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-[#FFF9EE] to-[#FFF6E5] border border-[#DEC077]/70 shadow-xs">
        <p className="font-serif text-base sm:text-lg text-[#55132D] leading-relaxed italic">
          "{article.intro}"
        </p>
      </div>

      {/* 4. Sacred Highlights Box */}
      {article.highlights && article.highlights.length > 0 && (
        <div className="p-4 rounded-2xl bg-white border border-[#E8DCC8] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B68A36]">
            <Sparkles className="w-3.5 h-3.5 text-[#B68A36]" />
            <span>Key Sacred Highlights</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {article.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#F0E3D0] text-xs text-[#382E3B] font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Detailed Article Content Paragraphs & Subheadings */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#E8DCC8] shadow-xs space-y-6 text-[#2D2430]">
        {article.sections.map((sec, idx) => (
          <section key={idx} className="space-y-2.5 border-b border-[#F5EFE6] pb-5 last:border-b-0 last:pb-0">
            <h2 className="font-serif font-bold text-lg sm:text-xl text-[#6F1837] tracking-tight">
              {sec.heading}
            </h2>
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#4A3F4E] font-normal">
              {sec.content}
            </p>
          </section>
        ))}
      </div>

      {/* 6. Devotee Action Banner: Plan Visit / Book Darshan */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#6F1837] via-[#5C172A] to-[#4A1020] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#DFC17B]">
            Sacred Pilgrimage
          </span>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight">
            Experience the Divine Sanctity of Matabari in Person
          </h3>
          <p className="text-xs text-white/80 max-w-xl">
            Book your 100% free darshan slot, arrange Annabhog sponsorship, or explore the sacred grounds.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onNavigate) {
              onNavigate("darshan");
            } else if (typeof window !== "undefined") {
              window.location.hash = "darshan";
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-[#DEC077] hover:bg-[#DFC17B] text-[#55132D] font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
        >
          Book Free Darshan Slot →
        </button>
      </div>

      {/* 7. Related Articles Section (Continuous Discovery) */}
      <section className="space-y-3.5 pt-4">
        <div className="flex items-center justify-between pb-1 border-b border-[#DEC077]/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B68A36]" />
            <h3 className="font-serif font-bold text-lg text-[#6F1837]">
              Explore More Heritage & Temple Stories
            </h3>
          </div>
          <span className="text-xs text-[#7A6448] font-medium">
            {relatedArticles.length} additional stories
          </span>
        </div>

        {/* 3-Column Grid of Other Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {relatedArticles.slice(0, 3).map((rel) => (
            <div
              key={rel.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (onNavigate) {
                  onNavigate("article", rel.id);
                } else if (typeof window !== "undefined") {
                  window.location.hash = `article?id=${rel.id}`;
                }
              }}
              className="bg-white rounded-2xl p-3 border border-[#E8DCC8] hover:border-[#6F1837] shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group text-left"
            >
              <div>
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#DEC077]/40 mb-2.5">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    onError={(e) => {
                      if (rel.fallback && e.currentTarget.src !== rel.fallback) {
                        e.currentTarget.src = rel.fallback;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[#8C5D17] text-[9.5px] font-bold backdrop-blur-xs">
                    {rel.tag}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-sm text-[#6F1837] group-hover:text-[#C83B32] transition-colors leading-snug line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#5D5460] mt-1 line-clamp-2 leading-relaxed">
                  {rel.shortDescription}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F0E3D0] text-xs font-semibold text-[#6F1837]">
                <span>Read Story</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

