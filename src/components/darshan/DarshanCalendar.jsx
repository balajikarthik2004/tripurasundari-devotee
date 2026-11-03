import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { getDateBookingStatus } from "../../data/darshanSlots";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DarshanCalendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  const [currentViewDate, setCurrentViewDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const viewYear = currentViewDate.getFullYear();
  const viewMonth = currentViewDate.getMonth();

  // Navigation handlers
  const goToPreviousMonth = () => {
    if (viewYear === today.getFullYear() && viewMonth <= today.getMonth()) return;
    setCurrentViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const goToNextMonth = () => {
    const maxFuture = new Date(today.getFullYear(), today.getMonth() + 2, 1);
    if (currentViewDate >= maxFuture) return;
    setCurrentViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Calculate calendar grid days
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(viewYear, viewMonth - 1, daysInPrevMonth - i);
    calendarCells.push({ date: d, isCurrentMonth: false, ...getDateBookingStatus(d, today) });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const d = new Date(viewYear, viewMonth, day);
    calendarCells.push({ date: d, isCurrentMonth: true, ...getDateBookingStatus(d, today) });
  }

  // Next month leading days to complete full grid
  const remainingCells = (7 - (calendarCells.length % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
    const d = new Date(viewYear, viewMonth + 1, day);
    calendarCells.push({ date: d, isCurrentMonth: false, ...getDateBookingStatus(d, today) });
  }

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4.5 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none flex flex-col justify-between h-full">
      <div>
        {/* Calendar Header with Month Navigation */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#F0E3D0]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFF8ED] border border-[#C79A3B]/35 flex items-center justify-center text-[#6F1837] shadow-2xs shrink-0">
              <CalendarIcon className="w-3.5 h-3.5 text-[#6F1837]" />
            </div>
            <div>
              <h2 className="font-serif text-[14px] sm:text-[15px] font-bold text-[#6F1837] tracking-tight leading-tight">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <span className="text-[10px] text-[#877E8A] block leading-none">
                Select date for Free Darshan
              </span>
            </div>
          </div>

          {/* Previous / Next Month Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
              className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed border-gray-200 text-gray-400"
                  : "bg-white hover:bg-[#FFF8ED] border-[#C79A3B]/35 text-[#6F1837] shadow-2xs active:scale-95"
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Next month"
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white hover:bg-[#FFF8ED] border border-[#C79A3B]/35 text-[#6F1837] shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
          {DAYS_OF_WEEK.map((dayName, idx) => (
            <div
              key={dayName}
              className={`text-[10px] font-bold uppercase tracking-wider py-0.5 ${
                idx === 0 ? "text-[#C83B32]" : "text-[#877E8A]"
              }`}
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((cell, idx) => {
            const isSelected = isSameDay(cell.date, selectedDate);
            const isToday = isSameDay(cell.date, today);
            const isPast = cell.isPast;
            const isCurrentMonth = cell.isCurrentMonth;
            const isFillingFast = !isPast && cell.status === "filling_fast";

            return (
              <button
                key={idx}
                type="button"
                disabled={isPast || !isCurrentMonth}
                onClick={() => {
                  if (!isPast && isCurrentMonth) {
                    onSelectDate(cell.date);
                  }
                }}
                className={`relative rounded-lg p-0.5 h-[36px] sm:h-[38px] flex flex-col items-center justify-center transition-all text-xs font-semibold ${
                  !isCurrentMonth
                    ? "opacity-20 cursor-default bg-transparent"
                    : isPast
                    ? "opacity-35 cursor-not-allowed bg-slate-50 text-slate-400"
                    : isSelected
                    ? "bg-[#6F1837] text-white shadow-xs ring-2 ring-[#C79A3B] z-10 cursor-pointer"
                    : isToday
                    ? "bg-[#FFF8ED] text-[#6F1837] border border-[#C79A3B] hover:border-[#6F1837] hover:bg-[#FFF2DE] cursor-pointer"
                    : isFillingFast
                    ? "bg-amber-50/70 text-[#2D2430] border border-amber-200/80 hover:border-amber-400 hover:bg-amber-100/50 cursor-pointer"
                    : "bg-emerald-50/40 text-[#2D2430] border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
                }`}
              >
                {/* Day Number */}
                <span className={`text-[11.5px] sm:text-[12px] font-bold leading-none ${isSelected ? "text-white" : ""}`}>
                  {cell.date.getDate()}
                </span>

                {/* Status Dot / Indicator */}
                {isCurrentMonth && !isPast && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {isSelected ? (
                      <span className="w-1 h-1 rounded-full bg-[#DFC17B]" />
                    ) : isToday ? (
                      <span className="w-1 h-1 rounded-full bg-[#6F1837]" />
                    ) : isFillingFast ? (
                      <span className="w-1 h-1 rounded-full bg-amber-500" />
                    ) : (
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Legend at Bottom */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2.5 mt-2.5 border-t border-[#F0E3D0] text-[10px] text-[#665D6A]">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 border border-emerald-600 shadow-2xs" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 border border-amber-600 shadow-2xs" />
            <span>Filling Fast</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400" />
            <span>Past / Closed</span>
          </div>
        </div>

        <div className="text-[9.5px] text-[#C79A3B] font-semibold flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#C79A3B]" />
          <span>General Darshan Free</span>
        </div>
      </div>
    </div>
  );
}
