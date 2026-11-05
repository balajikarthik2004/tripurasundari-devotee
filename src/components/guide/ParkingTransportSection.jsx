import React from "react";
import {
  SquareParking,
  Car,
  Bus,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  Info,
} from "lucide-react";
import { parkingData } from "../../data/visitGuideData";

export default function ParkingTransportSection() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Overview Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FFFDF8] to-[#FFF6E5] border border-[#DEC077]/70 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FDF0D5] to-[#F5D899] border border-[#DEC077] flex items-center justify-center text-[#6F1837] shrink-0 shadow-xs">
              <SquareParking className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#C79A3B] uppercase tracking-wider block">
                Pilgrim Transit & Parking
              </span>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#6F1837]">
                Designated Parking Lots & Local Transit
              </h2>
              <p className="text-xs text-[#6B5E62] mt-0.5 max-w-xl">
                {parkingData.overview}
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-xs font-bold whitespace-nowrap self-start sm:self-center">
            ● 100% Free Parking
          </span>
        </div>
      </div>

      {/* 2. Three Dedicated Parking Lot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {parkingData.lots.map((lot) => (
          <div
            key={lot.id}
            className="rounded-2xl bg-white border border-[#E7CE96]/70 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F5E8D0]">
                <div className="w-8 h-8 rounded-lg bg-[#FAF4E9] border border-[#DEC077]/70 flex items-center justify-center text-[#6F1837]">
                  <Car className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${lot.badgeColor}`}
                >
                  {lot.badge}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-[#6F1837] mt-3">
                {lot.name}
              </h3>

              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-[#FFFDF8] border border-[#F2E5D0]">
                  <span className="font-bold text-[#845212] block text-[10.5px] uppercase">
                    Walking Distance
                  </span>
                  <span className="text-[#423846] font-medium block mt-0.5">
                    {lot.distance}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#FFFDF8] border border-[#F2E5D0]">
                  <span className="font-bold text-[#845212] block text-[10.5px] uppercase">
                    Capacity
                  </span>
                  <span className="text-[#423846] font-medium block mt-0.5">
                    {lot.capacity}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#DCFCE7]/40 border border-[#86EFAC]/50">
                  <span className="font-bold text-[#166534] block text-[10.5px] uppercase">
                    Parking Fee
                  </span>
                  <span className="text-[#166534] font-bold block mt-0.5">
                    {lot.fee}
                  </span>
                </div>

                {lot.evCharging && (
                  <div className="p-2 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center gap-2 text-xs text-[#1E40AF]">
                    <Zap className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span className="text-[11px] font-medium leading-tight">
                      {lot.evCharging}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Lot Amenities */}
            <div className="mt-4 pt-3 border-t border-[#F5E8D0]">
              <span className="text-[10px] font-bold text-[#845212] uppercase tracking-wider block mb-1.5">
                Amenities Available:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {lot.amenities.map((am, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[10.5px] bg-[#FAF4E9] border border-[#E7CE96] px-2 py-0.5 rounded-md text-[#5A333E]"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#16A34A]" />
                    {am}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Local Transit & Standard Auto-Rickshaw Fare Guide */}
      <div className="rounded-2xl bg-white border border-[#E7CE96]/70 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5E8D0]">
          <div>
            <span className="text-[10px] font-bold text-[#C79A3B] uppercase tracking-wider block">
              Official Local Transit Guide
            </span>
            <h3 className="font-heading font-bold text-base text-[#6F1837]">
              Pre-Fixed Standard Auto & E-Rickshaw Fares
            </h3>
          </div>
          <span className="text-xs text-[#7A6448] italic hidden sm:block">
            Verified standard rates for pilgrim convenience
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {parkingData.localTransit.map((tr, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#FFFDF8] border border-[#F2E5D0] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-[#845212] uppercase block">
                  Route
                </span>
                <span className="font-semibold text-xs text-[#423846] block mt-0.5">
                  {tr.from} → Temple Gate
                </span>
                <span className="text-[11px] text-[#6B5E62] block mt-1">
                  Mode: <strong>{tr.mode}</strong>
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F5E8D0] flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-[#6F1837] text-sm">
                  {tr.fare}
                </span>
                <span className="text-[11px] text-[#226738] bg-[#DCFCE7] px-2 py-0.5 rounded-md font-medium">
                  {tr.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

