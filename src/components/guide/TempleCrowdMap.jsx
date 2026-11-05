import React, { useState } from "react";
import {
  Users,
  Clock,
  Sparkles,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Waves,
  ShieldCheck,
  Building2,
  Utensils,
  Maximize2,
} from "lucide-react";
import { DEMO_NOTICE } from "../../data/crowdHeatmapData";

// Corridor telemetry data corresponding to the authentic architectural heatmap
const corridorData = [
  {
    id: "west_gopuram",
    name: "West Gopuram",
    label: "West Gopuram (Main Gate)",
    wait: "35 min",
    inflow: "+48/min",
    devotees: "1,420 / 1,800",
    load: 79,
    status: "high",
    color: "#EF4444",
    strokeClass: "stroke-rose-500",
    description: "Main covered pilgrim queue moving through the West Entrance Archway into the sacred sanctum.",
    recommendation: "Peak morning inflow. For faster access, senior citizens and families with infants should use North Ramp.",
  },
  {
    id: "special_pass",
    name: "Special Pass",
    label: "Special Entry Corridor",
    wait: "15 min",
    inflow: "+16/min",
    devotees: "580 / 900",
    load: 64,
    status: "moderate",
    color: "#F59E0B",
    strokeClass: "stroke-amber-500",
    description: "Expedited queue through the northern pavilion approach directly entering the sanctum vestibule.",
    recommendation: "Moderate steady movement. Counter tokens currently issuing for immediate time blocks.",
  },
  {
    id: "north_ramp",
    name: "North Ramp",
    label: "Assisted Ramp (Gate 1)",
    wait: "8 min",
    inflow: "+8/min",
    devotees: "240 / 600",
    load: 40,
    status: "low",
    color: "#10B981",
    strokeClass: "stroke-emerald-500",
    description: "Dedicated barrier-free ramp connecting directly to the sanctum's North door for senior citizens & divyangjan.",
    recommendation: "Smooth and uncrowded. Complimentary wheelchair volunteers stationed at the entrance.",
  },
  {
    id: "lake_ghat",
    name: "Lake Ghat & Annadanam",
    label: "Kalyan Sagar Ghat & Annadanam",
    wait: "10 min",
    inflow: "+22/min",
    devotees: "415 / 800",
    load: 52,
    status: "moderate",
    color: "#0EA5E9",
    strokeClass: "stroke-sky-500",
    description: "Scenic stone-stepped ghat walkway leading to sacred turtle feeding points and Annadanam dining pavilion.",
    recommendation: "Pleasant lakeside breeze. Ideal peaceful spot to visit while awaiting your darshan slot.",
  },
];

export default function TempleCrowdMap() {
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'corridors' | 'sanctum'
  const [selectedCorridor, setSelectedCorridor] = useState("all");
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeTelemetry =
    corridorData.find((c) => c.id === selectedCorridor) || corridorData[0];

  return (
    <div className="space-y-3 select-none animate-in fade-in duration-300">
      <style>{`
        @keyframes movingWaveRed {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes movingWaveAmber {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes movingWaveTeal {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes movingWaveBlue {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes radarRipple {
          0% { r: 6px; opacity: 0.95; }
          65% { opacity: 0.45; }
          100% { r: 24px; opacity: 0; }
        }
        @keyframes radarRippleLarge {
          0% { r: 8px; opacity: 0.9; }
          65% { opacity: 0.35; }
          100% { r: 32px; opacity: 0; }
        }
        .anim-wave-red {
          animation: movingWaveRed 1.6s linear infinite;
        }
        .anim-wave-amber {
          animation: movingWaveAmber 2.0s linear infinite;
        }
        .anim-wave-teal {
          animation: movingWaveTeal 2.2s linear infinite;
        }
        .anim-wave-blue {
          animation: movingWaveBlue 2.0s linear infinite;
        }
        .anim-ripple {
          animation: radarRipple 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
        }
        .anim-ripple-delay-1 {
          animation: radarRipple 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
          animation-delay: 0.65s;
        }
        .anim-ripple-delay-2 {
          animation: radarRipple 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
          animation-delay: 1.3s;
        }
        .anim-ripple-large {
          animation: radarRippleLarge 2.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
        }
        .anim-ripple-large-delay {
          animation: radarRippleLarge 2.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
          animation-delay: 1.1s;
        }
      `}</style>

      {/* 1. Ultra-Compact Header Bar */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FFF9EE] to-[#FFF6E5] border border-[#DEC077]/70 rounded-2xl px-4 py-2.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B68A36]">
                Devotee Heat Map & Corridor Telemetry
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Wave Simulation</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[9.5px] font-medium">
                <Info className="w-2.5 h-2.5 text-amber-700" />
                <span>{DEMO_NOTICE}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="font-heading font-bold text-base sm:text-lg text-[#681B37] tracking-tight">
                Mata Tripura Sundari Temple Premises Crowd Heatmap
              </h2>
              <span className="hidden md:inline text-xs text-[#7A6448]">
                • Live moving waves show queue density & wait times
              </span>
            </div>
          </div>

          {/* Quick Filter Pills & View Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xl border border-[#E7CE96] shadow-2xs">
              {[
                { id: "all", label: "All" },
                { id: "corridors", label: "Corridors" },
                { id: "sanctum", label: "Sanctum" },
              ].map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.id);
                      if (f.id === "all") setSelectedCorridor("all");
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#681B37] text-white shadow-2xs"
                        : "text-[#5D5460] hover:text-[#681B37] hover:bg-[#FFF9EE]"
                    }`}
                  >
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xl border border-[#E7CE96] shadow-2xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                className="w-6 h-6 rounded-lg hover:bg-[#FFF8ED] text-[#681B37] flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.1))}
                className="w-6 h-6 rounded-lg hover:bg-[#FFF8ED] text-[#681B37] flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setSelectedCorridor("all");
                }}
                className="w-6 h-6 rounded-lg hover:bg-[#FFF8ED] text-[#681B37] flex items-center justify-center transition-colors cursor-pointer"
                title="Reset View"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Well-Balanced 12-Col Layout: Edge-to-Edge Map (7 cols) + Telemetry (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Left (7 cols): Authentic Architectural Plan with Zero Empty Space */}
        <div className="lg:col-span-7 bg-[#FFFDF9] rounded-2xl border border-[#DEC077]/70 p-2 sm:p-2.5 shadow-xs flex flex-col justify-between overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 px-1 border-b border-[#F0E3D0]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#55132D]">
                Premises Crowd Heatmap • Live Flow
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9.5px] text-[#7A6448] font-mono">
              <span className="hidden sm:inline">SCALE 1:500m</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-emerald-800">ACTIVE TELEMETRY</span>
            </div>
          </div>

          {/* Map Canvas with Edge-to-Edge Architectural Blueprint */}
          <div className="relative w-full rounded-xl overflow-hidden border border-[#D5C19F] bg-[#EFE9DC] shadow-inner flex items-center justify-center">
            <svg
              viewBox="0 0 915 634"
              className="w-full h-auto block select-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
                transition: "transform 0.25s ease-out",
              }}
            >
              <defs>
                {/* Glow Filters for Moving Waves */}
                <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#EF4444" floodOpacity="0.85" />
                </filter>
                <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.85" />
                </filter>
                <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.85" />
                </filter>
                <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0EA5E9" floodOpacity="0.85" />
                </filter>
              </defs>

              {/* 1. Base Authentic Architectural Blueprint Image */}
              <image
                href="/assets/matabari-crowd-heatmap.jpg"
                x="0"
                y="0"
                width="915"
                height="634"
                preserveAspectRatio="none"
              />

              {/* 2. Interactive SVG Overlays for Dynamic Waves & Beacons */}

              {/* === CORRIDOR 1 (RED): WEST GOPURAM -> MAIN SANCTUM === */}
              {activeFilter !== "sanctum" && (
                <g
                  id="corridor-west-gopuram"
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={selectedCorridor === "all" || selectedCorridor === "west_gopuram" ? 1 : 0.2}
                  onClick={() => setSelectedCorridor(selectedCorridor === "west_gopuram" ? "all" : "west_gopuram")}
                >
                  {/* Heat Aura Glow */}
                  <path
                    d="M 138 367 L 275 367 Q 380 367 470 335 L 600 322"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.3"
                  />
                  {/* Animated Flowing Red Wave */}
                  <path
                    d="M 138 367 L 275 367 Q 380 367 470 335 L 600 322"
                    stroke="#DC2626"
                    strokeWidth="5"
                    strokeDasharray="14 14"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glowRed)"
                    className="anim-wave-red"
                  />

                  {/* Pulsing Concentric Radar Rings at West Gopuram */}
                  <g transform="translate(138, 367)">
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#EF4444" strokeWidth="2" className="anim-ripple" />
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#EF4444" strokeWidth="2" className="anim-ripple-delay-1" />
                    <circle cx="0" cy="0" r="6" fill="#DC2626" stroke="#FFF" strokeWidth="2" />
                  </g>
                </g>
              )}

              {/* === CORRIDOR 2 (AMBER): SPECIAL PASS CURVING INTO SANCTUM === */}
              {activeFilter !== "sanctum" && (
                <g
                  id="corridor-special-pass"
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={selectedCorridor === "all" || selectedCorridor === "special_pass" ? 1 : 0.2}
                  onClick={() => setSelectedCorridor(selectedCorridor === "special_pass" ? "all" : "special_pass")}
                >
                  {/* Heat Aura Glow */}
                  <path
                    d="M 175 258 Q 330 240 460 270 L 595 320"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.3"
                  />
                  {/* Animated Flowing Amber Wave */}
                  <path
                    d="M 175 258 Q 330 240 460 270 L 595 320"
                    stroke="#D97706"
                    strokeWidth="4"
                    strokeDasharray="12 12"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glowAmber)"
                    className="anim-wave-amber"
                  />

                  {/* Pulsing Radar Ring at Special Pass Start */}
                  <g transform="translate(175, 258)">
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#F59E0B" strokeWidth="1.8" className="anim-ripple" />
                    <circle cx="0" cy="5" r="5" fill="#D97706" stroke="#FFF" strokeWidth="1.5" />
                  </g>
                </g>
              )}

              {/* === CORRIDOR 3 (GREEN): NORTH RAMP -> SANCTUM === */}
              {activeFilter !== "sanctum" && (
                <g
                  id="corridor-north-ramp"
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={selectedCorridor === "all" || selectedCorridor === "north_ramp" ? 1 : 0.2}
                  onClick={() => setSelectedCorridor(selectedCorridor === "north_ramp" ? "all" : "north_ramp")}
                >
                  {/* Heat Aura Glow */}
                  <path
                    d="M 480 120 Q 480 180 500 230 Q 525 285 595 320"
                    stroke="#10B981"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.3"
                  />
                  {/* Animated Flowing Green Wave */}
                  <path
                    d="M 480 120 Q 480 180 500 230 Q 525 285 595 320"
                    stroke="#059669"
                    strokeWidth="4"
                    strokeDasharray="10 12"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glowTeal)"
                    className="anim-wave-teal"
                  />

                  {/* Pulsing Radar Rings at North Ramp */}
                  <g transform="translate(480, 120)">
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#10B981" strokeWidth="2" className="anim-ripple" />
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#10B981" strokeWidth="2" className="anim-ripple-delay-1" />
                    <circle cx="0" cy="0" r="6" fill="#059669" stroke="#FFF" strokeWidth="2" />
                  </g>
                </g>
              )}

              {/* === CORRIDOR 4 (BLUE): SANCTUM COURTYARD -> LAKE & ANNADANAM === */}
              {activeFilter !== "sanctum" && (
                <g
                  id="corridor-lake-ghat"
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={selectedCorridor === "all" || selectedCorridor === "lake_ghat" ? 1 : 0.2}
                  onClick={() => setSelectedCorridor(selectedCorridor === "lake_ghat" ? "all" : "lake_ghat")}
                >
                  {/* Heat Aura Glow */}
                  <path
                    d="M 605 325 Q 675 380 735 440 Q 770 480 765 520 Q 745 570 650 575 L 540 575"
                    stroke="#0EA5E9"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.3"
                  />
                  {/* Animated Flowing Blue Wave */}
                  <path
                    d="M 605 325 Q 675 380 735 440 Q 770 480 765 520 Q 745 570 650 575 L 540 575"
                    stroke="#0284C7"
                    strokeWidth="4"
                    strokeDasharray="12 14"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glowBlue)"
                    className="anim-wave-blue"
                  />

                  {/* Pulsing Radar Rings at Annadanam Hall */}
                  <g transform="translate(540, 575)">
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#0EA5E9" strokeWidth="2" className="anim-ripple" />
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#0EA5E9" strokeWidth="2" className="anim-ripple-delay-1" />
                    <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFF" strokeWidth="2" />
                  </g>
                </g>
              )}

              {/* === CENTRAL MAIN SANCTUM ACTIVE RADAR (Heartbeat of the Mandir) === */}
              {activeFilter !== "corridors" && (
                <g id="sanctum-active-beacon" transform="translate(605, 320)">
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#DC2626" strokeWidth="2" className="anim-ripple-large" />
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#B68A36" strokeWidth="1.5" className="anim-ripple-large-delay" />
                  <circle cx="0" cy="0" r="7" fill="#DC2626" stroke="#FFF" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>

          {/* Footnote Guide */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1.5 text-[10px] text-[#7A6448]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-semibold text-[#681B37]">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Moving waves denote flow direction & speed</span>
              </span>
            </div>
            <span className="italic">
              Tap any corridor to isolate telemetry
            </span>
          </div>
        </div>

        {/* Right (5 cols): Live Darshan Flow & Corridor Telemetry (Height Balanced) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          {/* 1. Live Darshan Flow Summary Card */}
          <div className="bg-white rounded-2xl border border-[#DEC077]/70 p-2.5 sm:p-3 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between pb-1 border-b border-[#F0E3D0]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <h4 className="font-heading font-bold text-xs text-[#681B37] tracking-wider uppercase">
                  Live Darshan Flow
                </h4>
              </div>
              <span className="font-mono text-[10.5px] text-[#877E8A]">01:02 PM</span>
            </div>

            {/* Peak Wait & Inflow Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-1.5 rounded-xl bg-[#FFF9EF] border border-[#F2E5D0]">
                <span className="text-[9px] font-bold text-[#8C5D17] uppercase block">
                  Peak Wait
                </span>
                <span className="font-heading font-bold text-lg text-[#681B37] block">
                  35 MIN
                </span>
                <span className="text-[9.5px] text-[#7A6448] font-medium block">
                  West Gate
                </span>
              </div>

              <div className="p-1.5 rounded-xl bg-[#FFF9EF] border border-[#F2E5D0]">
                <span className="text-[9px] font-bold text-[#8C5D17] uppercase block">
                  Inflow Rate
                </span>
                <span className="font-heading font-bold text-lg text-[#D97706] block">
                  +48/min
                </span>
                <span className="text-[9.5px] text-amber-700 font-semibold block">
                  High Volume
                </span>
              </div>
            </div>

            {/* Total Devotees Capacity Bar */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="text-[#6B5E62] font-medium">Total Devotees on Campus:</span>
                <span className="font-bold text-[#2D2430]">2,655 / 5,500</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-500"
                  style={{ width: "48%" }}
                />
              </div>
            </div>
          </div>

          {/* 2. Corridor Telemetry List & Dynamic Recommendation Note */}
          <div className="bg-white rounded-2xl border border-[#DEC077]/70 p-2.5 sm:p-3 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between pb-1 border-b border-[#F0E3D0]">
              <span className="font-heading font-bold text-[11px] text-[#681B37] uppercase tracking-wider">
                Corridor Telemetry
              </span>
              <span className="text-[9.5px] text-[#7A6448] italic">
                Select to focus
              </span>
            </div>

            <div className="space-y-1">
              {corridorData.map((corridor) => {
                const isSelected = selectedCorridor === corridor.id;
                return (
                  <div
                    key={corridor.id}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setSelectedCorridor(isSelected ? "all" : corridor.id)
                    }
                    className={`px-2 py-1 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-[#FFF9EF] border-[#681B37] shadow-sm ring-1 ring-[#681B37]/30"
                        : "bg-[#FFFDF9] border-[#E8DCC8] hover:border-[#DEC077] hover:bg-[#FFFDF6]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: corridor.color }}
                        />
                        <span className="font-bold text-[11px] text-[#2D2430]">
                          {corridor.name}
                        </span>
                      </div>
                      <span className="font-heading font-bold text-xs text-[#681B37]">
                        {corridor.wait}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9.5px] text-[#6B5E62] mt-0.5">
                      <span>{corridor.devotees} devotees</span>
                      <span
                        className="font-bold"
                        style={{ color: corridor.color }}
                      >
                        {corridor.load}% load
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${corridor.load}%`,
                          backgroundColor: corridor.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Embedded Visitor Guidance Note */}
            <div className="bg-[#FFF9EF] rounded-xl border border-[#DEC077]/70 p-2 space-y-0.5 mt-1.5">
              <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#681B37]">
                <Sparkles className="w-3 h-3 text-[#B68A36]" />
                <span>Visitor Guidance Note:</span>
              </div>
              <p className="text-[10px] text-[#423846] leading-relaxed">
                {activeTelemetry.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
