import React, { useRef, useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heritageArticles } from "../../data/heritageArticlesData";
import { useLanguage } from "../../context/LanguageContext";

export default function MatabariHeritage({ onNavigate }) {
  const { t } = useLanguage();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Monitor scroll position to enable/disable navigation arrows
  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);

    const cardWidth = clientWidth / 2;
    if (cardWidth > 0) {
      const idx = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(idx, heritageArticles.length - 2));
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  // Smooth scroll handler
  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth / 2 + 6;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCardClick = (articleId) => {
    if (onNavigate) {
      onNavigate("info", { tab: "stories", articleId });
    } else if (typeof window !== "undefined") {
      window.location.hash = `info?tab=stories&article=${articleId}`;
    }
  };

  return (
    <div
      aria-label="Discover the Heritage of Matabari"
      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#DEC077]/70 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_6px_20px_rgba(74,16,39,0.08)] transition-all duration-200 flex flex-col justify-between h-full select-none box-border w-full"
    >
      {/* 1. Header (Identical height & style to Plan Your Visit & Latest Updates) */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#F0E3D0]/80 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/50 flex items-center justify-center text-[#6F1837] shadow-2xs shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-[#6F1837]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#6F1837] tracking-tight leading-tight truncate">
              {t("heritage.heading", "Discover the Heritage of Matabari")}
            </h3>
            <span className="text-[10px] text-[#7A6448] block leading-tight truncate">
              {t("heritage.subtitle", "Spiritual and cultural heritage stories")}
            </span>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => scroll("prev")}
            disabled={!canScrollLeft}
            aria-label="Previous articles"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? "bg-[#FFF8ED] text-[#6F1837] border border-[#DEC077] hover:bg-[#6F1837] hover:text-white hover:border-[#6F1837] shadow-2xs active:scale-95"
                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-35 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("next")}
            disabled={!canScrollRight}
            aria-label="Next articles"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? "bg-[#FFF8ED] text-[#6F1837] border border-[#DEC077] hover:bg-[#6F1837] hover:text-white hover:border-[#6F1837] shadow-2xs active:scale-95"
                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-35 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Horizontally Scrollable Carousel Displaying 2 Cards Side-by-Side */}
      <div
        ref={carouselRef}
        className="flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 custom-scrollbar -mx-0.5 px-0.5 flex-1 items-stretch"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {heritageArticles.map((article) => (
          <div
            key={article.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(article.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(article.id);
              }
            }}
            className="w-[85%] sm:w-[calc(50%-5px)] shrink-0 snap-start bg-[#FFFDF9] rounded-xl p-2.5 border border-[#DEC077]/50 hover:border-[#6F1837] hover:shadow-xs transition-all duration-200 flex flex-col justify-between group cursor-pointer text-left relative"
          >
            {/* Top Image with Category Tag */}
            <div className="relative w-full h-[115px] sm:h-[120px] rounded-lg overflow-hidden bg-[#F0E3D0] border border-[#DEC077]/35 shrink-0">
              <img
                src={article.image}
                alt={article.title}
                onError={(e) => {
                  if (article.fallback && e.currentTarget.src !== article.fallback) {
                    e.currentTarget.src = article.fallback;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-full bg-white/95 text-[#8C5D17] text-[9px] font-bold backdrop-blur-xs border border-[#DEC077]/40 shadow-2xs">
                {article.tag}
              </span>
            </div>

            {/* Middle Information */}
            <div className="flex flex-col justify-between flex-1 pt-1.5">
              <div>
                <h4 className="font-serif font-bold text-[13px] sm:text-[13.5px] text-[#6F1837] tracking-tight group-hover:text-[#C83B32] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-[10.5px] sm:text-[11px] text-[#4A3F4E] leading-relaxed line-clamp-3 mt-1 font-normal">
                  {article.shortDescription}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="flex items-center justify-between pt-1.5 border-t border-[#F0E3D0]/70 mt-1">
                <span className="text-[10.5px] font-bold text-[#6F1837] group-hover:text-[#C83B32] transition-colors">
                  Explore Story
                </span>
                <div className="w-4.5 h-4.5 rounded-full bg-[#FFF8ED] border border-[#DEC077]/50 flex items-center justify-center text-[#6F1837] group-hover:bg-[#6F1837] group-hover:text-white transition-colors shadow-2xs">
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Dots & Hint */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F0E3D0]/70 mt-1.5 text-[9.5px] text-[#7A6448] shrink-0">
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, dotIdx) => {
            const isActive = Math.floor(currentIndex / 2) === dotIdx;
            return (
              <span
                key={dotIdx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  isActive ? "w-3 bg-[#6F1837]" : "w-1 bg-[#D5C19F] opacity-60"
                }`}
              />
            );
          })}
        </div>
        <span className="italic">
          Swipe or click arrows to explore all {heritageArticles.length} stories
        </span>
      </div>
    </div>
  );
}
