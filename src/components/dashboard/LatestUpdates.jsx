import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bell, ArrowRight, Sparkles, Pause, Play } from "lucide-react";
import { officialAnnouncements } from "../../data/dashboardData";
import { useLanguage } from "../../context/LanguageContext";

export default function LatestAnnouncements({ onNavigate, targetHeight }) {
  const { t, isBengali, isHindi } = useLanguage();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const setRef = useRef(null);
  const currentYRef = useRef(0);
  const singleSetHeightRef = useRef(0);

  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicated 3 sets for seamless infinite scrolling loop
  const announcementsList = [
    ...officialAnnouncements,
    ...officialAnnouncements,
    ...officialAnnouncements,
  ];

  // Measure the height of a single set of announcements
  const updateSingleSetHeight = useCallback(() => {
    if (setRef.current) {
      const height = setRef.current.offsetHeight;
      if (height > 0) {
        singleSetHeightRef.current = height;
      }
    }
  }, []);

  useEffect(() => {
    updateSingleSetHeight();
    const ro = new ResizeObserver(updateSingleSetHeight);
    if (setRef.current) ro.observe(setRef.current);
    return () => ro.disconnect();
  }, [updateSingleSetHeight]);

  // Smooth continuous requestAnimationFrame animation loop
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let animId;
    let lastTime = performance.now();
    const speed = 26; // pixels per second for comfortable, readable auto-scrolling

    const step = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const singleH = singleSetHeightRef.current;
      if (!isPaused && !isHovered && trackRef.current && singleH > 0) {
        currentYRef.current += speed * delta;
        if (currentYRef.current >= singleH) {
          currentYRef.current %= singleH;
        }
        trackRef.current.style.transform = `translate3d(0, -${currentYRef.current}px, 0)`;
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, isHovered]);

  // Manual wheel scroll support
  const handleWheel = (e) => {
    const singleH = singleSetHeightRef.current;
    if (singleH > 0) {
      currentYRef.current += e.deltaY * 0.5;
      if (currentYRef.current < 0) {
        currentYRef.current = (currentYRef.current % singleH) + singleH;
      } else if (currentYRef.current >= singleH) {
        currentYRef.current %= singleH;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, -${currentYRef.current}px, 0)`;
      }
    }
  };

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case "announcement":
        return "bg-amber-50 text-amber-900 border-amber-300/80";
      case "festival":
        return "bg-rose-50 text-rose-900 border-rose-300/80";
      case "info":
        return "bg-sky-50 text-sky-900 border-sky-300/80";
      case "conservation":
        return "bg-emerald-50 text-emerald-900 border-emerald-300/80";
      default:
        return "bg-amber-50 text-amber-900 border-amber-300/80";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={targetHeight ? { height: `${targetHeight}px` } : undefined}
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_6px_20px_rgba(74,16,39,0.08)] transition-all duration-200 flex flex-col justify-between select-none box-border w-full overflow-hidden"
    >
      {/* 1. Header: Fixed height, non-scrolling */}
      <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-[#F0E3D0]/80 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 rounded-lg bg-[#FFF8ED] border border-[#C79A3B]/40 flex items-center justify-center text-[#6F1837] shadow-2xs relative">
            <Bell className="w-3.5 h-3.5 text-[#6F1837]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-[16px] sm:text-[17px] font-bold text-[#6F1837] tracking-tight">
              {t("updates.heading", "Latest Announcements")}
            </h3>
          </div>
        </div>

        {/* Live Status & Interactive Pause/Play Toggle */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF8ED] hover:bg-[#FAF4E9] border border-[#C79A3B]/35 text-[10px] font-bold text-[#6F1837] transition-colors cursor-pointer shadow-2xs shrink-0"
        >
          {isPaused ? (
            <>
              <Play className="w-2.5 h-2.5 text-[#C79A3B] fill-[#C79A3B]" />
              <span>{isBengali ? "চালু" : isHindi ? "आरंभ" : "Resume"}</span>
            </>
          ) : (
            <>
              <Pause className="w-2.5 h-2.5 text-[#C79A3B] fill-[#C79A3B]" />
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isBengali ? "সরাসরি" : isHindi ? "सक्रिय" : "Live"}
              </span>
            </>
          )}
        </button>
      </div>

      {/* 2. Scrolling Viewport: flex: 1, min-height: 0, overflow: hidden */}
      <div
        onWheel={handleWheel}
        className="flex-1 min-h-0 relative overflow-hidden my-0.5"
      >
        {/* Subtle Top & Bottom Fade Overlays */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white to-transparent z-10" />

        {/* Moving Track */}
        <div ref={trackRef} className="flex flex-col will-change-transform">
          {/* Reference Set (measured for loop calculation) */}
          <div ref={setRef} className="flex flex-col gap-2 pb-2">
            {officialAnnouncements.map((item) => (
              <div
                key={`ref-${item.id}`}
                role="button"
                tabIndex={0}
                onClick={() => onNavigate?.(item.action || "darshan")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate?.(item.action || "darshan");
                  }
                }}
                className="p-2 rounded-xl bg-[#FFFDF9] hover:bg-[#FFF8ED] border border-[#C79A3B]/25 hover:border-[#C79A3B]/60 transition-colors duration-150 group cursor-pointer text-left shadow-2xs shrink-0"
              >
                {/* Badge + Date */}
                <div className="flex items-center justify-between gap-1.5 mb-0.5">
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold tracking-wide border ${getBadgeStyle(
                      item.badgeType
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[9.5px] font-semibold text-[#665D6A]">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-[12.5px] font-bold text-[#1A121E] group-hover:text-[#6F1837] transition-colors leading-tight line-clamp-1">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-[10px] font-medium text-[#443948] leading-tight line-clamp-1 mt-0.5">
                  {item.description}
                </p>

                {/* View Details Link */}
                <div className="flex items-center justify-end gap-1 pt-0.5 mt-0.5 border-t border-[#F0E3D0]/50 text-[9.5px] font-bold text-[#A87920] group-hover:text-[#6F1837] transition-colors">
                  <span>{t("common.viewDetails", "View Details")}</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate Sets for seamless infinite looping */}
          {announcementsList.slice(officialAnnouncements.length).map((item, idx) => (
            <div
              key={`dup-${item.id}-${idx}`}
              className="pb-2"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => onNavigate?.(item.action || "darshan")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate?.(item.action || "darshan");
                  }
                }}
                className="p-2 rounded-xl bg-[#FFFDF9] hover:bg-[#FFF8ED] border border-[#C79A3B]/25 hover:border-[#C79A3B]/60 transition-colors duration-150 group cursor-pointer text-left shadow-2xs shrink-0"
              >
                {/* Badge + Date */}
                <div className="flex items-center justify-between gap-1.5 mb-0.5">
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold tracking-wide border ${getBadgeStyle(
                      item.badgeType
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[9.5px] font-semibold text-[#665D6A]">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-[12.5px] font-bold text-[#1A121E] group-hover:text-[#6F1837] transition-colors leading-tight line-clamp-1">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-[10px] font-medium text-[#443948] leading-tight line-clamp-1 mt-0.5">
                  {item.description}
                </p>

                {/* View Details Link */}
                <div className="flex items-center justify-end gap-1 pt-0.5 mt-0.5 border-t border-[#F0E3D0]/50 text-[9.5px] font-bold text-[#A87920] group-hover:text-[#6F1837] transition-colors">
                  <span>{t("common.viewDetails", "View Details")}</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Footer: Fixed height, non-scrolling */}
      <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-[#F0E3D0]/80 shrink-0">
        <span className="text-[9.5px] font-bold text-[#6F1837] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C79A3B]" />
          <span>Official Temple Board</span>
        </span>
        <span className="text-[9px] font-medium text-[#877E8A]">
          {isPaused ? "Paused" : "Auto-scrolls • Pause on hover"}
        </span>
      </div>
    </div>
  );
}