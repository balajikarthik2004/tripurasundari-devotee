import React from "react";
import TempleHero from "../components/dashboard/TempleHero";
import EssentialInfo from "../components/dashboard/EssentialInfo";
import TempleServices from "../components/dashboard/TempleServices";
import MatabariHeritage from "../components/dashboard/MatabariHeritage";
import VisitGuide from "../components/dashboard/VisitGuide";
import LatestUpdates from "../components/dashboard/LatestUpdates";

export default function Dashboard({ onNavigate }) {
  return (
    <div className="space-y-4 sm:space-y-4.5 animate-in fade-in duration-300">
      {/* 1. Temple Hero Banner with Dynamic Carousel */}
      <TempleHero onNavigate={onNavigate} />

      {/* 2. Redesigned Essential Information Section (3 categories: Timings, Darshan, Crowd) */}
      <EssentialInfo onNavigate={onNavigate} />

      {/* Featured Devotee Membership Banner */}
      <div className="bg-gradient-to-r from-[#4A1027] via-[#631433] to-[#4A1027] rounded-2xl p-4 sm:p-5 text-white border border-[#E2BC6B]/40 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-black/25 border border-[#E2BC6B]/40 flex items-center justify-center p-2 shrink-0">
            <img src="/assets/temple-logo.svg" alt="Mata Tripura Sundari" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-[#FFF8ED]">
                Devotee Membership
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DFC17B] text-[#4A1027] uppercase tracking-wide">
                Temple Trust
              </span>
            </div>
            <p className="text-xs text-[#EADECF] mt-0.5 max-w-xl">
              Annual and lifetime patronage with fast-track darshan passes, annual sanctum archana, and consecrated prasad delivery.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate("membership")}
          className="px-4 py-2 bg-[#DFC17B] hover:bg-[#C79A3B] text-[#4A1027] font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer self-stretch md:self-auto justify-center"
        >
          <span>View Membership</span>
          <span>→</span>
        </button>
      </div>

      {/* 3. Redesigned Temple Services (6 cards in balanced 3-col desktop / 2-col mobile grid) */}
      <TempleServices onNavigate={onNavigate} />

      {/* 4. Lower Dashboard: Discover Matabari Heritage + Plan Your Visit + Latest Announcements (Exact Level Alignment) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch pt-1">
        {/* Left Column (5 cols): Discover the Heritage of Matabari (Carousel) */}
        <div className="lg:col-span-5 flex flex-col lg:h-[395px]">
          <MatabariHeritage onNavigate={onNavigate} />
        </div>

        {/* Middle Column (3 cols): Plan Your Visit */}
        <div className="lg:col-span-3 flex flex-col lg:h-[395px]">
          <VisitGuide onNavigate={onNavigate} />
        </div>

        {/* Right Column (4 cols): Latest Announcements */}
        <div className="lg:col-span-4 flex flex-col lg:h-[395px]">
          <LatestUpdates onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
