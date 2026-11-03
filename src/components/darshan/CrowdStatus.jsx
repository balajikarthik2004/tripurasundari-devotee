import React from "react";
import { Users, Info } from "lucide-react";

export default function CrowdStatus() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border border-[#C79A3B]/30 shadow-2xs select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        {/* Left: Heading & Description */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FFF8ED] border border-[#C79A3B]/35 flex items-center justify-center text-[#6F1837] shadow-2xs shrink-0">
            <Users className="w-3.5 h-3.5 text-[#C79A3B]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-serif font-bold text-xs sm:text-[13px] text-[#6F1837] leading-tight">
              Crowd & Queue Management Information
            </h4>
            <p className="text-[10.5px] sm:text-[11px] text-[#5D5460] mt-0.5 leading-snug">
              Official live queue tracking and automated wait time indicators are planned under the temple DEVI digitalization initiative. General darshan queue entry is open and free every day.
            </p>
          </div>
        </div>

        {/* Right: Clean Status Badge */}
        <div className="shrink-0 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8ED] text-[#6F1837] border border-[#C79A3B]/35 text-[10.5px] font-semibold">
            <Info className="w-3 h-3 text-[#C79A3B]" />
            <span>Digital Queue Integration Planned</span>
          </span>
        </div>
      </div>
    </div>
  );
}
