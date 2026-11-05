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
