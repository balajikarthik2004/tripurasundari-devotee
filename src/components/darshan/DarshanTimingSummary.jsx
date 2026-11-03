import React from "react";
import { Sun, Moon, Clock, AlertCircle } from "lucide-react";
import { templeTimingInfo } from "../../data/darshanSlots";
import { useLanguage } from "../../context/LanguageContext";

export default function DarshanTimingSummary() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#FFF9EE] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 border border-[#C79A3B]/30 shadow-2xs select-none">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 xl:gap-3">
        {/* Core Timings Strip: 2 cols on mobile with Rituals full-width, 3 cols / inline row on tablet/desktop */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2.5">
          {/* Temple Opens */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#C79A3B]/25 shadow-2xs">
            <div className="w-4.5 h-4.5 rounded-md bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center justify-center text-amber-600 shrink-0">
              <Sun className="w-2.5 h-2.5 text-amber-500" />
            </div>
            <div className="leading-tight">
              <span className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#877E8A] block">
                {t("darshan.opens", "Opens")}
              </span>
              <span className="font-sans font-bold tabular-nums text-[12px] sm:text-[13px] text-[#6F1837]">
                {templeTimingInfo.openTime}
              </span>
            </div>
          </div>

          <span className="hidden sm:inline text-[#C79A3B]/30">•</span>

          {/* Temple Closes */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#C79A3B]/25 shadow-2xs">
            <div className="w-4.5 h-4.5 rounded-md bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center justify-center text-[#6F1837] shrink-0">
              <Moon className="w-2.5 h-2.5 text-[#6F1837]" />
            </div>
            <div className="leading-tight">
              <span className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#877E8A] block">
                {t("darshan.closes", "Closes")}
              </span>
              <span className="font-sans font-bold tabular-nums text-[12px] sm:text-[13px] text-[#6F1837]">
                {templeTimingInfo.closeTime}
              </span>
            </div>
          </div>

          <span className="hidden sm:inline text-[#C79A3B]/30">•</span>

          {/* Continuous Ritual Schedule */}
          <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#C79A3B]/25 shadow-2xs">
            <div className="w-4.5 h-4.5 rounded-md bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center justify-center text-[#C83B32] shrink-0">
              <Clock className="w-2.5 h-2.5 text-[#C83B32]" />
            </div>
            <div className="leading-tight">
              <span className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#877E8A] block">
                {t("darshan.dailyRituals", "Daily Rituals")}
              </span>
              <span className="font-sans font-bold tabular-nums text-[12px] sm:text-[13px] text-[#2D2430]">
                04:00 AM – 10:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Verification Note */}
        <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] text-[#665D6A] bg-white/70 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg border border-[#C79A3B]/20 shrink-0 self-start xl:self-center">
          <AlertCircle className="w-3 h-3 text-[#C79A3B] shrink-0" />
          <span className="leading-tight">
            Documented daily rituals (approx. 4 AM – 10 PM) subject to official verification.
          </span>
        </div>
      </div>
    </div>
  );
}
