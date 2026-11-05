import React, { useState } from "react";
import { Clock, Check } from "lucide-react";

export default function DarshanSlotSelector({
  selectedDate,
  slots = [],
  selectedSlot,
  onSelectSlot,
  selectedCategory,
}) {
  const [periodFilter, setPeriodFilter] = useState("All");

  const formattedDate = selectedDate.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const filteredSlots =
    periodFilter === "All"
      ? slots
      : slots.filter((slot) => slot.period === periodFilter);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none flex flex-col justify-between h-full">
      <div>
        {/* Compact Header: Selected Date & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#F0E3D0]">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C79A3B] block leading-none">
                AVAILABLE SLOTS
              </span>
              {selectedCategory && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FFF4DF] text-[#8C5D17] border border-[#E8CE95]">
                  {selectedCategory.name}
                </span>
              )}
            </div>
            <h3 className="font-serif text-[14px] sm:text-[15px] font-bold text-[#6F1837] tracking-tight mt-0.5">
              {formattedDate}
            </h3>
          </div>

          {/* Time Period Filter Pills */}
          <div className="flex items-center gap-1 self-start sm:self-center bg-[#FAF4E9] p-0.5 rounded-lg border border-[#C79A3B]/20">
            {["All", "Morning", "Afternoon", "Evening"].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setPeriodFilter(period)}
                className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold transition-all cursor-pointer ${
                  periodFilter === period
                    ? "bg-[#6F1837] text-white shadow-2xs"
                    : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const isBooked = slot.status === "booked";
            const isUnavailable = slot.status === "unavailable";
            const isFillingFast = slot.status === "filling_fast";
            const isDisabled = isBooked || isUnavailable;

            return (
              <div
                key={slot.id}
                role="button"
                tabIndex={isDisabled ? -1 : 0}
                onClick={() => !isDisabled && onSelectSlot(slot)}
                onKeyDown={(e) => {
                  if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelectSlot(slot);
                  }
                }}
                className={`px-2.5 py-1.5 rounded-xl border transition-all text-left flex flex-col justify-center h-[52px] sm:h-[54px] ${
                  isDisabled
                    ? "opacity-40 cursor-not-allowed bg-slate-50 border-slate-200"
                    : isSelected
                    ? "bg-[#FFF8ED] border-[#6F1837] ring-1.5 ring-[#6F1837] shadow-xs cursor-pointer"
                    : "bg-white border-[#C79A3B]/30 hover:border-[#C79A3B]/70 hover:bg-[#FAF4E9]/40 cursor-pointer shadow-2xs"
                }`}
              >
                {/* Line 1: Time + Status Badge */}
                <div className="flex items-center justify-between gap-1 leading-none">
                  <div className="flex items-center gap-1 font-bold text-[11.5px] text-[#6F1837]">
                    <Clock className="w-3 h-3 text-[#C79A3B] shrink-0" />
                    <span>{slot.time}</span>
                  </div>

                  {/* Compact Status Pill */}
                  {isBooked ? (
                    <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      Booked
                    </span>
                  ) : isUnavailable ? (
                    <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                      Closed
                    </span>
                  ) : isFillingFast ? (
                    <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-300">
                      Fast
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-300">
                      Open
                    </span>
                  )}
                </div>

                {/* Line 2: Slot Name + Capacity/Selection */}
                <div className="flex items-center justify-between gap-1 mt-1 text-[10px] leading-tight">
                  <span className="font-serif font-bold text-[#2D2430] truncate">
                    {slot.label}
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[#877E8A] text-[9.5px]">
                      {!isDisabled ? `${slot.capacityLeft} left` : "0 left"}
                    </span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-[#6F1837] border-[#6F1837] text-white"
                          : "border-[#C79A3B]/40 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSlots.length === 0 && (
          <div className="p-4 text-center text-xs text-[#877E8A] bg-[#FFF8ED] rounded-xl border border-[#C79A3B]/20">
            No slots found for this time period on the selected date.
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="pt-2 mt-2 border-t border-[#F0E3D0] flex items-center justify-between text-[10px] text-[#877E8A]">
        <span>Tap any open slot to reserve free pass</span>
        <span className="text-[#6F1837] font-semibold">{filteredSlots.length} Slots Available</span>
      </div>
    </div>
  );
}
