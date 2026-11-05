import React from "react";
import {
  Car,
  Train,
  Plane,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { reachData } from "../../data/visitGuideData";

export default function HowToReachSection({ onSelectPlanner }) {
  return (
    <div className="space-y-3.5 animate-in fade-in duration-200 select-none">
      {/* 1. Quick Location & Geographic Summary Strip */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FFFDF8] to-[#FFF6E5] border border-[#DEC077]/70 p-3 sm:p-3.5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FDF0D5] to-[#F5D899] border border-[#DEC077] flex items-center justify-center text-[#6F1837] shrink-0 shadow-2xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-heading font-bold text-sm sm:text-base text-[#6F1837] truncate">
                {reachData.summary.location}
              </h2>
              <p className="text-[11px] text-[#7A6448] truncate">
                Coordinates: {reachData.summary.coordinates} • 3.5 km from Udaipur Central
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-2.5 py-1 rounded-lg bg-white border border-[#E7CE96] text-[11px] shadow-2xs">
              <span className="text-[#845212] font-semibold text-[10px] uppercase mr-1">Agartala:</span>
              <span className="font-bold text-[#6F1837]">55 km (~1h 15m)</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-white border border-[#E7CE96] text-[11px] shadow-2xs">
              <span className="text-[#845212] font-semibold text-[10px] uppercase mr-1">Rail Station:</span>
              <span className="font-bold text-[#6F1837]">UDPU (3.5 km)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sleek, Balanced AI Yatra Planner Action Bar */}
      {onSelectPlanner && (
        <div className="rounded-xl bg-gradient-to-r from-[#6F1837] via-[#5A142D] to-[#420C1D] border border-[#DEC077]/80 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xs flex items-center justify-between gap-3 text-[#FFF8ED]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#DFC17B]/20 border border-[#DFC17B]/60 flex items-center justify-center text-[#DFC17B] shrink-0 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif text-xs sm:text-[14.5px] font-bold text-[#FFF8ED] leading-none truncate">
              Plan Your Customized Travel & Darshan Itinerary
            </h3>
          </div>

          <button
            type="button"
            onClick={onSelectPlanner}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#DFC17B] to-[#D4992B] hover:from-[#f0b64b] hover:to-[#E5A93C] text-[#2D101C] font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all duration-150 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2D101C] group-hover:rotate-12 transition-transform" />
            <span>Plan with AI Yatra</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#2D101C] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* 3. Three Transit Modes (Road, Rail, Air) - Crisp, Punchy Key Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Road */}
        <div className="rounded-2xl bg-white border border-[#E7CE96]/70 shadow-xs p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#F5E8D0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/70 flex items-center justify-center text-[#6F1837]">
                  <Car className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#6F1837]">
                  By Road (NH-8)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                Most Popular
              </span>
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs text-[#423846]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">NH-8 Highway:</strong> Smooth 4-lane drive from Agartala (55 km, ~1h 15m).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">State Buses:</strong> Every 15–20 mins from Nagerjala Bus Stand (₹60–₹90).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Taxis & Cabs:</strong> Direct to temple gate (₹1,200–₹1,800). Shared: ₹80.</span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#F5E8D0] text-[10.5px] text-[#7A6448] italic">
            Tip: Dedicated parking available at South & Lakeside lots.
          </div>
        </div>

        {/* Rail */}
        <div className="rounded-2xl bg-white border border-[#E7CE96]/70 shadow-xs p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#F5E8D0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/70 flex items-center justify-center text-[#6F1837]">
                  <Train className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#6F1837]">
                  By Train (Indian Rail)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                Fast & Cheap
              </span>
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs text-[#423846]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Station:</strong> Udaipur Tripura (UDPU) — just 3.5 km away (10m drive).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Frequency:</strong> Frequent DEMU trains from Agartala (45–55 mins, ₹30–₹70).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Local Transit:</strong> E-rickshaws available 24/7 (₹20 shared / ₹80 reserved).</span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#F5E8D0] text-[10.5px] text-[#7A6448] italic">
            Tip: Morning train arrives in time for 10:30 AM Madhyanha Bhog.
          </div>
        </div>

        {/* Air */}
        <div className="rounded-2xl bg-white border border-[#E7CE96]/70 shadow-xs p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#F5E8D0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/70 flex items-center justify-center text-[#6F1837]">
                  <Plane className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#6F1837]">
                  By Air (Flights)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]">
                Outstation
              </span>
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs text-[#423846]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Airport:</strong> MBB Airport Agartala (IXA) — 65 km (~1h 30m drive).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Flights:</strong> Non-stop flights from Kolkata (45m), Guwahati, Delhi.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span><strong className="text-[#6F1837]">Airport Taxi:</strong> Official prepaid counter at arrival terminal direct to temple.</span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#F5E8D0] text-[10.5px] text-[#7A6448] italic">
            Tip: Same-day darshan pilgrimage is easy via morning flights.
          </div>
        </div>
      </div>

      {/* 4. Compact Key Hub Distances (4-column row instead of heavy table) */}
      <div className="rounded-2xl bg-white border border-[#E7CE96]/70 p-3 sm:p-3.5 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#F5E8D0]">
          <span className="text-[10px] font-bold text-[#845212] uppercase tracking-wider">
            Quick Distance Guide to Temple Gate
          </span>
          {onSelectPlanner && (
            <button
              type="button"
              onClick={onSelectPlanner}
              className="text-xs font-bold text-[#6F1837] hover:text-[#912048] flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#C79A3B]" />
              <span>Full Route Planner →</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            { hub: "Agartala City", dist: "55 km", time: "1h 15m", via: "NH-8 Highway" },
            { hub: "UDPU Railway Stn", dist: "3.5 km", time: "10 mins", via: "Temple Road" },
            { hub: "MBB Airport (IXA)", dist: "65 km", time: "1h 30m", via: "NH-8 Bypass" },
            { hub: "Sabroom (Border)", dist: "75 km", time: "1h 45m", via: "NH-8 South" },
          ].map((item, i) => (
            <div key={i} className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F0E3D0] text-center">
              <span className="font-bold text-xs text-[#6F1837] block truncate">{item.hub}</span>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#226738] font-bold mt-0.5">
                <span>{item.dist}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{item.time}</span>
              </div>
              <span className="text-[9.5px] text-[#7A6448] block truncate mt-0.5">{item.via}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
