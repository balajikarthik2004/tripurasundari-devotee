import React, { useState, useEffect, useRef } from "react";
import TempleHero from "../components/dashboard/TempleHero";
import EssentialInfo from "../components/dashboard/EssentialInfo";
import TempleServices from "../components/dashboard/TempleServices";
import MatabariHeritage from "../components/dashboard/MatabariHeritage";
import VisitGuide from "../components/dashboard/VisitGuide";
import LatestUpdates from "../components/dashboard/LatestUpdates";

export default function Dashboard({ onNavigate }) {
  const [heritageHeight, setHeritageHeight] = useState(null);
  const heritageRef = useRef(null);

  useEffect(() => {
    if (!heritageRef.current) return;
    const updateHeight = () => {
      if (heritageRef.current) {
        setHeritageHeight(heritageRef.current.offsetHeight);
      }
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(heritageRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-4.5 animate-in fade-in duration-300">
      {/* 1. Temple Hero Banner with Dynamic Carousel */}
      <TempleHero onNavigate={onNavigate} />

      {/* 2. Redesigned Essential Information Section (3 categories: Timings, Darshan, Crowd) */}
      <EssentialInfo onNavigate={onNavigate} />

      {/* 3. Redesigned Temple Services (6 cards in balanced 3-col desktop / 2-col mobile grid) */}
      <TempleServices onNavigate={onNavigate} />

      {/* 4. Lower Dashboard: Discover Matabari Heritage + Plan Your Visit + Latest Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start pt-1">
        {/* Left Column (5 cols): Discover the Heritage of Matabari (Kalyan Sagar + Matabari Peda) */}
        <div ref={heritageRef} className="lg:col-span-5 self-start">
          <MatabariHeritage onNavigate={onNavigate} />
        </div>

        {/* Middle Column (3 cols): Plan Your Visit (Aligned with Heritage height) */}
        <div className="lg:col-span-3 self-start">
          <VisitGuide onNavigate={onNavigate} targetHeight={heritageHeight} />
        </div>

        {/* Right Column (4 cols): Latest Announcements (Aligned with Heritage height) */}
        <div className="lg:col-span-4 self-start">
          <LatestUpdates onNavigate={onNavigate} targetHeight={heritageHeight} />
        </div>
      </div>
    </div>
  );
}
