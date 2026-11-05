import React from "react";
import { Users, Clock, Compass, ArrowRight, Info, Sparkles } from "lucide-react";
import { getCrowdSnapshot, DEMO_NOTICE } from "../../data/crowdHeatmapData";

export default function CrowdStatus({ onViewCrowdMap }) {
  const snapshot = getCrowdSnapshot("morning");

  return (
    <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FFF9EE] to-[#FFF6E5] rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border border-[#DEC077]/70 shadow-2xs select-none">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Heading, Badge & Live Preview Indicators */}
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#FFF4E0] border border-[#E2BC6B] flex items-center justify-center text-[#6F1837] shadow-2xs shrink-0 mt-0.5 sm:mt-0">
            <Compass className="w-4 h-4 text-[#B68A36]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#6F1837] leading-tight">
                Temple Crowd Status & Visitor Guidance
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                <Info className="w-2.5 h-2.5 text-amber-700" />
                <span>{DEMO_NOTICE}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-1 flex-wrap text-xs text-[#5D5460]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-bold text-[#8C5D17]">
                  {snapshot.preset.overallLabel}
                </span>
              </span>

              <span className="text-[#DEC077] hidden sm:inline">•</span>

              <span className="flex items-center gap-1 text-[11.5px]">
                <Clock className="w-3 h-3 text-[#B68A36]" />
                <span>Queue Wait:</span>
                <span className="font-bold text-[#681B37]">
                  {snapshot.preset.darshanQueueWait}
                </span>
              </span>

              <span className="text-[#DEC077] hidden sm:inline">•</span>

              <span className="flex items-center gap-1 text-[11.5px] text-[#15803D]">
                <Sparkles className="w-3 h-3 text-[#16A34A]" />
                <span className="text-[#5D5460]">Best Window:</span>
                <span className="font-semibold text-[#15803D]">
                  {snapshot.preset.recommendedTime.split("(")[0]}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: CTA Button to open full interactive map */}
        <div className="shrink-0 self-start lg:self-center">
          <button
            type="button"
            onClick={onViewCrowdMap}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#681B37] text-[#681B37] hover:text-white border border-[#B68A36]/60 hover:border-[#681B37] text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer group active:scale-98"
          >
            <Compass className="w-3.5 h-3.5 text-[#B68A36] group-hover:text-white transition-colors" />
            <span>Interactive Crowd Map</span>
            <ArrowRight className="w-3 h-3 text-[#B68A36] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}
