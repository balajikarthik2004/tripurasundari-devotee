import React from "react";
import { Clock, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import TempleBell from "../ui/TempleBell";

/**
 * EssentialInfo — Refined Temple Information & KPI Panel
 * 
 * Features:
 * - Elongated traditional antique-gold bells with clearly visible connected hanging chains
 * - Deeply blended with temple portal theme (Burgundy #6F1837, Antique Gold #C79A3B, Crisp White Card, Warm Ivory Accents)
 * - Proportions: Left 28% (Timings), Center 44% (Darshan Guidance), Right 28% (Available Slots)
 * - Perfectly balanced vertical rhythm, typography, and interactive touchpoints
 */
export default function EssentialInfo({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <section
      aria-label="Temple Operational & Darshan Guidance Information"
      className="relative select-none"
    >
      {/* Unified Horizontal Temple Information Card */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#C79A3B]/35 shadow-[0_4px_20px_rgba(111,24,55,0.04)] px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 overflow-hidden">
        
        {/* Traditional Temple Bells with Elongated Chains Hanging from the Gold Top Border */}
        {/* Left Bell (Upper Left) */}
        <div className="absolute top-0 left-4 sm:left-6 z-10">
          <TempleBell delaySeconds={0} height={66} />
        </div>

        {/* Right Bell (Upper Right with Timing Offset) */}
        <div className="absolute top-0 right-4 sm:right-6 z-10">
          <TempleBell delaySeconds={4.5} height={66} />
        </div>

        {/* Three Balanced Sections (28% - 44% - 28%) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 lg:gap-0 relative z-10">
          
          {/* ========================================================= */}
          {/* LEFT SECTION (28%) — Temple Timings                       */}
          {/* ========================================================= */}
          <button
            type="button"
            onClick={() => onNavigate?.("darshan")}
            className="w-full lg:w-[28%] shrink-0 flex flex-col items-center text-center px-3 py-1.5 rounded-2xl hover:bg-[#FFF8ED]/60 transition-all focus:outline-none cursor-pointer group"
          >
            {/* Category Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFF8ED] text-[#8C5D17] border border-[#DEC077]/70 shadow-2xs">
              <Clock className="w-3 h-3 text-[#C79A3B]" />
              <span>{t("stats.timings.badge", "Daily Darshan")}</span>
            </div>

            {/* Prominent Opening & Closing Timing */}
            <div className="font-serif font-bold text-lg sm:text-xl lg:text-[21px] text-[#6F1837] tracking-tight mt-1.5 whitespace-nowrap group-hover:scale-102 transition-transform">
              04:00 AM – 10:00 PM
            </div>

            {/* Subtitle Status */}
            <div className="text-[11px] text-[#5D5460] mt-1 flex items-center justify-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Temple Gates Open for Devotees</span>
            </div>
          </button>

          {/* Subtle Vertical Gold Separator (Desktop) */}
          <div
            className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-[#C79A3B]/35 to-transparent my-1.5 shrink-0"
            aria-hidden="true"
          />

          {/* ========================================================= */}
          {/* CENTER SECTION (44%) — Darshan Guidance & Live Flow       */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[44%] shrink-0 px-1 sm:px-2">
            <div
              onClick={() => onNavigate?.("darshan")}
              className="bg-gradient-to-b from-[#FFFDF9] to-[#FFF9F2] rounded-xl sm:rounded-2xl border border-[#DEC077]/70 px-4 py-2.5 sm:py-3 shadow-2xs hover:border-[#C79A3B] transition-all cursor-pointer group"
            >
              {/* Section Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#6F1837] tracking-tight">
                <Sparkles className="w-3.5 h-3.5 text-[#C79A3B]" />
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#6F1837]">
                  {t("stats.darshanGuidance.title", "Darshan Guidance & Corridor Flow")}
                </h3>
              </div>

              {/* Two Balanced Subsections with Divider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 items-center text-center mt-2 divide-y sm:divide-y-0 sm:divide-x divide-[#DEC077]/50">
                {/* Subsection 1: Current Wait Time */}
                <div className="flex flex-col items-center px-1">
                  <span className="text-[10.5px] font-semibold text-[#7A6448]">
                    {t("stats.darshanGuidance.currentWaitLabel", "Current Wait Time")}
                  </span>

                  <div className="font-heading font-bold text-base sm:text-[17px] text-[#2D2430] tracking-tight mt-0.5">
                    20–35 mins
                  </div>

                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#E8F8EE] text-[#1E7E34] border border-[#A3E6B4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E7E34] animate-pulse"></span>
                      {t("stats.darshanGuidance.normalFlow", "Normal Flow")}
                    </span>
                  </div>
                </div>

                {/* Subsection 2: Optimal Slot */}
                <div className="flex flex-col items-center px-1 pt-1.5 sm:pt-0">
                  <span className="text-[10.5px] font-semibold text-[#7A6448]">
                    {t("stats.darshanGuidance.recommendedLabel", "Optimal Darshan Slot")}
                  </span>

                  <div className="mt-0.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#FFF8ED] border border-[#DEC077] text-[#6F1837] shadow-2xs">
                      02:30 PM – 04:00 PM
                    </span>
                  </div>

                  <p className="text-[10.5px] text-[#877E8A] mt-1 font-medium leading-tight">
                    {t("stats.darshanGuidance.lighterCrowd", "Lighter crowd, serene darshan")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Vertical Gold Separator (Desktop) */}
          <div
            className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-[#C79A3B]/35 to-transparent my-1.5 shrink-0"
            aria-hidden="true"
          />

          {/* ========================================================= */}
          {/* RIGHT SECTION (28%) — Available Free Passes               */}
          {/* ========================================================= */}
          <button
            type="button"
            onClick={() => onNavigate?.("darshan")}
            className="w-full lg:w-[28%] shrink-0 flex flex-col items-center text-center px-3 py-1.5 rounded-2xl hover:bg-[#FFF8ED]/60 transition-all focus:outline-none cursor-pointer group"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{t("stats.slots.badge", "Online Passes Open")}</span>
            </div>

            {/* Prominent Slot Count */}
            <div className="font-serif font-bold text-2xl lg:text-[27px] text-[#6F1837] tracking-tight mt-1 group-hover:scale-102 transition-transform">
              1,280
            </div>

            {/* Supporting Unit Text with Arrow */}
            <p className="text-[11px] text-[#5D5460] font-medium mt-0.5 flex items-center justify-center gap-1 group-hover:text-[#6F1837] transition-colors">
              <span>{t("stats.slots.unit", "Free Darshan Slots Today")}</span>
              <ArrowRight className="w-3 h-3 text-[#C79A3B] group-hover:translate-x-0.5 transition-transform" />
            </p>
          </button>

        </div>
      </div>
    </section>
  );
}
