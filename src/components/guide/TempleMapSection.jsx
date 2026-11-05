import React, { useState } from "react";
import {
  Landmark,
  Compass,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info,
  Navigation,
  Utensils,
  Droplets,
  Waves,
  Car,
  Footprints,
  Hotel,
} from "lucide-react";

const campusMarkers = [
  {
    id: "sanctum",
    name: "Garbhagriha (Main Sanctum)",
    subtitle: "Maa Tripura Sundari (1501 CE)",
    category: "Sanctum Core",
    badge: "Estd. 1501 CE",
    icon: Landmark,
    x: 52.8,
    y: 47.8,
    desc: "The consecrated Ek-Ratna Char-chala shrine enshrining Maa Tripura Sundari on holy Kurmapitha hillock.",
    timings: "04:00 AM – 10:00 PM Daily",
    rules: "Traditional Devotional Attire Mandatory • Photography Strictly Prohibited Inside",
    type: "sanctum",
  },
  {
    id: "singh_dwar",
    name: "Singh Dwar (Gate 1)",
    subtitle: "Primary West Entrance Archway",
    category: "Entrance",
    badge: "West Gate",
    icon: Navigation,
    x: 17.5,
    y: 47.2,
    desc: "Main pedestrian entrance connected to NH-8 Udaipur Highway with security check and shoe counters.",
    timings: "04:00 AM – 10:00 PM",
    rules: "Footwear deposit mandatory before inner gate",
    type: "gate",
  },
  {
    id: "help_desk",
    name: "Pilgrim Help Desk",
    subtitle: "Devotee Facilitation & Token Desk",
    category: "Assistance",
    badge: "24/7 Seva",
    icon: Info,
    x: 27.2,
    y: 47.2,
    desc: "Multilingual information desk for darshan slot verification, wheelchairs, and elderly priority pass.",
    timings: "05:00 AM – 09:30 PM",
    rules: "Free information & assistance for all visiting pilgrims",
    type: "service",
  },
  {
    id: "yatri_niwas",
    name: "Yatri Niwas Pilgrim Complex",
    subtitle: "Pilgrim Dormitories & Guest Cottages",
    category: "Accommodation",
    badge: "Trust Cottages",
    icon: Hotel,
    x: 29.5,
    y: 25.0,
    desc: "Safe guest suites and affordable AC/non-AC pilgrim dormitories managed directly by temple administration.",
    timings: "24/7 Check-in with valid Govt ID",
    rules: "Online & offline spot booking subject to availability",
    type: "stay",
  },
  {
    id: "ro_water",
    name: "Purified RO Water Kiosk",
    subtitle: "24/7 Chilled Drinking Water",
    category: "Amenity",
    badge: "100% Free",
    icon: Droplets,
    x: 36.8,
    y: 36.0,
    desc: "Ultraviolet-treated hygienic chilled drinking water kiosks available continuously for devotees.",
    timings: "24 Hours Continuous",
    rules: "Free drinking water for all devotees",
    type: "amenity",
  },
  {
    id: "restrooms",
    name: "Pilgrim Sanitation & Restrooms",
    subtitle: "Modern Clean Restrooms & Divyangjan",
    category: "Amenity",
    badge: "Sanitized",
    icon: ShieldCheck,
    x: 35.8,
    y: 64.0,
    desc: "Modern sanitary complexes with wheelchair-friendly accessible stalls and dedicated baby-care rooms.",
    timings: "04:00 AM – 10:00 PM",
    rules: "Maintained free of cost by temple sanitation wing",
    type: "amenity",
  },
  {
    id: "parking",
    name: "West Parking Terminal (Lot B)",
    subtitle: "Two-Wheelers, Cars & Tourist Coaches",
    category: "Parking",
    badge: "CCTV Monitored",
    icon: Car,
    x: 16.2,
    y: 72.0,
    desc: "Designated organized parking grounds directly off NH-8 highway with battery e-rickshaw shuttle to gate.",
    timings: "24/7 Monitored",
    rules: "Standard nominal parking rates apply",
    type: "parking",
  },
  {
    id: "annapurna_hall",
    name: "Sri Annapurna Hall (Annabhog)",
    subtitle: "Consecrated Mahaprasad Dining",
    category: "Prasad Seva",
    badge: "Free Daily Meals",
    icon: Utensils,
    x: 61.8,
    y: 27.5,
    desc: "520-seat dining hall serving hot Satvik Annabhog (khichuri, labra, payesh) daily to visiting devotees.",
    timings: "12:30 PM – 02:30 PM Daily",
    rules: "First-come seated distribution • Cleanliness strictly observed",
    type: "food",
  },
  {
    id: "prasad_stalls",
    name: "Matabari Peda & Prasad Stalls",
    subtitle: "GI Tag Certified Heritage Peda",
    category: "Prasad Counter",
    badge: "GI Certified",
    icon: Sparkles,
    x: 52.5,
    y: 70.0,
    desc: "Government-authorized cooperative stalls selling genuine wood-fire condensed milk Matabari Peda.",
    timings: "06:00 AM – 09:30 PM",
    rules: "Trust printed receipt issued with every purchase",
    type: "prasad",
  },
  {
    id: "purva_dwar",
    name: "Purva Dwar (Gate 2)",
    subtitle: "East Gate to Kalyan Sagar Steps",
    category: "Lake Gate",
    badge: "Ghat Corridor",
    icon: Navigation,
    x: 71.0,
    y: 47.0,
    desc: "Eastward stone-paved portal leading pilgrims from the inner parikrama down to Kalyan Sagar Ghats.",
    timings: "04:30 AM – 09:00 PM",
    rules: "Stepped access corridor • Hold handrails while descending",
    type: "gate",
  },
  {
    id: "turtle_deck",
    name: "Kalyan Sagar Turtle Deck",
    subtitle: "Bostami Turtle Ecological Sanctuary",
    category: "Sacred Lake",
    badge: "Endangered Species",
    icon: Waves,
    x: 86.0,
    y: 37.0,
    desc: "Designated observation pavilion for the revered 500-year-old freshwater Bostami softshell turtles.",
    timings: "Sunrise to Sunset",
    rules: "Feeding allowed only with official puffed rice (muri) • No plastics",
    type: "lake",
  },
  {
    id: "bathing_ghats",
    name: "Kalyan Sagar Bathing Ghats",
    subtitle: "Sacred Stone Stepped Tirtha Ghat",
    category: "Sacred Lake",
    badge: "Holy Tirtha",
    icon: Footprints,
    x: 82.5,
    y: 56.5,
    desc: "Historic stone-stepped ghat on the eastern flank for holy achaman, prayer rituals, and serene lake views.",
    timings: "05:00 AM – 07:00 PM",
    rules: "Soaps, detergents, and plastic strictly prohibited by forest & trust orders",
    type: "lake",
  },
];

export default function TempleMapSection() {
  const [selectedMarkerId, setSelectedMarkerId] = useState("sanctum");

  const activeMarker =
    campusMarkers.find((m) => m.id === selectedMarkerId) || campusMarkers[0];

  const IconComponent = activeMarker.icon || Landmark;

  return (
    <div className="space-y-3 animate-in fade-in duration-200 select-none">
      {/* 1. Full-Width Rectangular Map Frame */}
      <div className="relative w-full rounded-2xl bg-white border border-[#DEC077]/70 shadow-sm overflow-hidden box-border">
        {/* Map Image Container */}
        <div className="relative w-full aspect-[1024/599] overflow-hidden bg-[#FAF6EE]">
          <img
            src="/assets/matabari-campus-map.jpg"
            alt="Mata Tripura Sundari Temple Campus Schematic Map"
            className="w-full h-full object-contain object-center block"
          />

          {/* Interactive Clickable Hotspots overlaying markers */}
          {campusMarkers.map((marker) => {
            const isSelected = selectedMarkerId === marker.id;

            return (
              <button
                key={marker.id}
                type="button"
                onClick={() => setSelectedMarkerId(marker.id)}
                title={`${marker.name} (${marker.category})`}
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute cursor-pointer transition-all duration-200 z-20 group focus:outline-none`}
              >
                {/* Hotspot Outer Target & Pulse */}
                <div className="relative flex items-center justify-center">
                  {isSelected && (
                    <span className="absolute w-8 h-8 rounded-full bg-[#E5A93C]/40 animate-ping pointer-events-none" />
                  )}
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all shadow-md ${
                      isSelected
                        ? "bg-[#6F1837] text-white ring-2 ring-[#DFC17B] scale-115"
                        : "bg-white/90 text-[#6F1837] border border-[#DEC077] hover:scale-110 hover:bg-[#6F1837] hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelected ? "bg-[#DFC17B]" : "bg-[#6F1837]"
                      }`}
                    />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Landmark Details Card (Inspector) */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-white to-[#FFFDF9] border border-[#DEC077]/70 p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-[#F5E8D0]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#6F1837] text-[#DFC17B] flex items-center justify-center shrink-0 shadow-2xs">
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#6F1837] truncate">
                  {activeMarker.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FFF8ED] text-[#845212] border border-[#DEC077] shrink-0">
                  {activeMarker.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#7A6448] truncate">
                {activeMarker.subtitle} • Category: {activeMarker.category}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#423846] bg-[#FFF8ED] px-2.5 py-1 rounded-lg border border-[#F0E3D0]">
              <Clock className="w-3 h-3 text-[#C79A3B]" />
              <span>{activeMarker.timings}</span>
            </div>
          </div>
        </div>

        {/* Description & Rules in Clean Single Row / Compact Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 text-xs">
          <div className="md:col-span-7 text-[#5D5460] leading-snug">
            {activeMarker.desc}
          </div>
          <div className="md:col-span-5 flex items-start gap-1.5 text-[11px] text-[#845212] bg-[#FFFDF9] p-2 rounded-xl border border-[#F0E3D0]/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
            <span className="font-medium leading-tight">
              <strong>Pilgrim Guidance:</strong> {activeMarker.rules}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Quick Facility Filter Chips (Click to focus marker on map) */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar select-none py-0.5">
        <span className="text-[10px] font-bold text-[#845212] uppercase tracking-wider shrink-0 mr-1">
          Quick POI Focus:
        </span>
        {campusMarkers.map((m) => {
          const isSelected = selectedMarkerId === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMarkerId(m.id)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-[#6F1837] text-white shadow-2xs ring-1 ring-[#DEC077]"
                  : "bg-white text-[#5D5460] border border-[#E7CE96]/70 hover:border-[#6F1837] hover:text-[#6F1837]"
              }`}
            >
              {m.name.split(" ")[0]} {m.name.includes("(") ? m.name.split("(")[0].trim() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
