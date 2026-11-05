import React from "react";
import { Ticket, Calendar, Clock, User, Eye, CheckCircle2, AlertCircle, Sparkles, Plus } from "lucide-react";

export default function MyBookings({
  bookings = [],
  onViewTicket,
  onNewBooking,
}) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C79A3B]/30 shadow-[0_4px_16px_rgba(74,16,39,0.04)] select-none space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#F0E3D0]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/35 flex items-center justify-center text-[#6F1837] shadow-2xs">
              <Ticket className="w-4 h-4 text-[#6F1837]" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#6F1837] tracking-tight">
                My Darshan Passes ({bookings.length})
              </h2>
              <span className="text-[10.5px] text-[#877E8A]">
                Track, download or present your verified Free Darshan passes
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewBooking}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5 text-[#DFC17B]" />
          <span>Book New Slot</span>
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.bookingReference}
              className="bg-[#FFF9EE]/70 rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/30 hover:border-[#C79A3B]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#6F1837] bg-white px-2 py-0.5 rounded-lg border border-[#C79A3B]/25">
                    {b.bookingReference}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF4DF] text-[#8C5D17] border border-[#E8CE95]">
                    {b.categoryName || "General Darshan"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{b.status}</span>
                  </span>
                  <span className="text-[10px] text-[#877E8A]">
                    Booked on: {b.bookingTimestamp}
                  </span>
                </div>

                <div className="text-sm font-serif font-bold text-[#2D2430]">
                  {b.devoteeName} • <span className="text-xs font-sans font-normal text-[#665D6A]">{b.devoteesCount} Devotee(s)</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5D5460]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>{b.darshanDate}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#6F1837]">
                    <Clock className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>{b.timeSlot}</span>
                  </span>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onViewTicket(b)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-bold text-[#6F1837] shadow-2xs hover:shadow transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C83B32]" />
                  <span>View Pass & QR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-[#FFF9EE]/50 rounded-2xl border border-dashed border-[#C79A3B]/30 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center justify-center text-[#C79A3B]">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#6F1837]">
              No Darshan Bookings Yet
            </h3>
            <p className="text-xs text-[#877E8A] max-w-sm mx-auto mt-1">
              Select your preferred date and time slot to reserve your free Darshan pass.
            </p>
          </div>
          <button
            type="button"
            onClick={onNewBooking}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DFC17B]" />
            <span>Book Free Darshan Slot</span>
          </button>
        </div>
      )}
    </div>
  );
}

