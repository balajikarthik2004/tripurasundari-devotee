import React from "react";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { upcomingFestival } from "../../data/dashboardData";

export default function FestivalCard() {
  return (
    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#6F1837] via-[#5A122B] to-[#3D0A1C] text-white p-3.5 sm:p-4 shadow-sm border border-[#C79A3B]/30 flex flex-col justify-between h-full min-h-[175px] sm:min-h-[185px] group">
      {/* Background festive glowing diyas artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/diwali-diyas.jpg"
          alt="Diwali Mela Celebration"
          className="w-full h-full object-cover object-bottom opacity-35 group-hover:opacity-45 transition-opacity duration-500 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D0A1C] via-[#5A122B]/85 to-[#6F1837]/90" />
      </div>

      <div className="relative z-10 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#DFC17B] text-[#551028] shadow-2xs">
            <Sparkles className="w-2 h-2 text-[#551028]" />
            {upcomingFestival.tag}
          </span>
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
          {upcomingFestival.title}
        </h3>

        <div className="inline-flex items-center gap-1 text-[11px] text-[#DFC17B] font-medium">
          <Calendar className="w-3 h-3 text-[#DFC17B]" />
          <span>{upcomingFestival.duration}</span>
        </div>

        <p className="text-[11px] text-white/85 leading-snug line-clamp-2 max-w-sm">
          {upcomingFestival.description}
        </p>
      </div>

      <div className="relative z-10 pt-2 mt-auto">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#6F1837] hover:bg-[#FFF8ED] text-xs font-semibold shadow-2xs hover:shadow transition-all duration-200 cursor-pointer group/btn"
        >
          <span>View Festival Details</span>
          <ArrowRight className="w-3 h-3 text-[#C83B32] group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
