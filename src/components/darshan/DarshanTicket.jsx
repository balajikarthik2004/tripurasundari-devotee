import React from "react";
import { Download, Printer, CheckCircle2, ShieldCheck, Ticket, Calendar, Clock, User, Phone, Users, Sparkles, ArrowRight } from "lucide-react";

export default function DarshanTicket({ booking, onViewMyBookings, onBookAnother }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simulated instant text/ticket receipt download for prototype
    const ticketContent = `========================================================
MATA TRIPURA SUNDARI TEMPLE, MATABARI, TRIPURA
PROTOTYPE FREE DARSHAN CONFIRMATION TICKET
========================================================
Booking Reference: ${booking.bookingReference}
Primary Devotee:   ${booking.devoteeName}
Mobile Number:     ${booking.mobileNumber}
Number of Persons: ${booking.devoteesCount} Devotee(s)
Darshan Date:      ${booking.darshanDate}
Time Slot:         ${booking.timeSlot} (${booking.slotLabel})
Booking Status:    ${booking.status}
Booking Fee:       ${booking.fee}
Issued At:         ${booking.bookingTimestamp}
========================================================
NOTICE: Prototype confirmation for demonstration purposes.
General darshan is 100% free at the temple complex.
========================================================`;

    const blob = new Blob([ticketContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Darshan-Ticket-${booking.bookingReference}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/40 shadow-[0_8px_30px_rgba(74,16,39,0.08)] select-none space-y-6 max-w-2xl mx-auto">
      {/* Success Badge */}
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm animate-in zoom-in-75 duration-300">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-300">
            Booking Confirmed • Free General Darshan
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837] tracking-tight mt-1.5">
            Your Darshan Pass is Ready
          </h2>
          <p className="text-xs text-[#5D5460]">
            May Maa Tripura Sundari bless your pilgrimage with peace and prosperity.
          </p>
        </div>
      </div>

      {/* The Digital Pass / Ticket Card */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#C79A3B]/40 bg-gradient-to-b from-[#FFFDF9] to-[#FFF8ED] shadow-sm">
        {/* Top Header of Ticket */}
        <div className="bg-[#4A1027] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#C79A3B]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#C79A3B]/40 p-1 flex items-center justify-center shrink-0">
              <img
                src="/assets/temple-logo.svg"
                alt="Emblem"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#FFF8ED] leading-tight">
                Mata Tripura Sundari Temple
              </h3>
              <p className="text-[10px] text-[#D6AD52] tracking-wider uppercase">
                Matabari, Udaipur, Tripura • Kurma Peeth
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] uppercase tracking-widest text-[#D8C2CA] block">
              Reference ID
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#DFC17B]">
              {booking.bookingReference}
            </span>
          </div>
        </div>

        {/* Ticket Body with Details & QR Code */}
        <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          {/* Details (7 cols) */}
          <div className="sm:col-span-8 space-y-3 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#877E8A] block">
                Primary Devotee
              </span>
              <span className="font-serif text-sm sm:text-base font-bold text-[#2D2430]">
                {booking.devoteeName}
              </span>
              <span className="text-[11px] text-[#665D6A] block">
                {booking.mobileNumber}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#F0E3D0]">
              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#877E8A] block">
                  Darshan Date
                </span>
                <span className="font-bold text-[#6F1837] text-xs">
                  {booking.darshanDate}
                </span>
              </div>

              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#877E8A] block">
                  Time Window
                </span>
                <span className="font-bold text-[#6F1837] text-xs block">
                  {booking.timeSlot}
                </span>
                <span className="text-[10px] text-[#877E8A]">
                  {booking.slotLabel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#F0E3D0]">
              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#877E8A] block">
                  Total Devotees
                </span>
                <span className="font-bold text-[#2D2430] text-xs">
                  {booking.devoteesCount} Person(s)
                </span>
              </div>

              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#877E8A] block">
                  Darshan Fee
                </span>
                <span className="font-bold text-emerald-700 text-xs">
                  ₹0 (Free Pass)
                </span>
              </div>
            </div>
          </div>

          {/* QR Code Container (4 cols) */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-[#C79A3B]/30 shadow-2xs text-center">
            {/* High Clarity Synthetic QR Code SVG */}
            <div className="w-28 h-28 p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#4A1027]">
                {/* 3 Position Detection Patterns */}
                <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="2" />
                <rect x="9" y="9" width="18" height="18" fill="white" rx="1" />
                <rect x="13" y="13" width="10" height="10" fill="currentColor" rx="1" />

                <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="2" />
                <rect x="73" y="9" width="18" height="18" fill="white" rx="1" />
                <rect x="77" y="13" width="10" height="10" fill="currentColor" rx="1" />

                <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="2" />
                <rect x="9" y="73" width="18" height="18" fill="white" rx="1" />
                <rect x="13" y="77" width="10" height="10" fill="currentColor" rx="1" />

                {/* Timing patterns and simulated QR matrix cells */}
                <rect x="36" y="9" width="6" height="6" fill="currentColor" />
                <rect x="46" y="9" width="6" height="6" fill="currentColor" />
                <rect x="56" y="9" width="6" height="6" fill="currentColor" />

                <rect x="36" y="21" width="6" height="6" fill="currentColor" />
                <rect x="50" y="21" width="6" height="6" fill="currentColor" />

                <rect x="9" y="36" width="6" height="6" fill="currentColor" />
                <rect x="21" y="36" width="6" height="6" fill="currentColor" />
                <rect x="36" y="36" width="6" height="6" fill="currentColor" />
                <rect x="50" y="36" width="6" height="6" fill="currentColor" />
                <rect x="64" y="36" width="6" height="6" fill="currentColor" />
                <rect x="78" y="36" width="6" height="6" fill="currentColor" />

                <rect x="15" y="50" width="6" height="6" fill="currentColor" />
                <rect x="36" y="50" width="6" height="6" fill="currentColor" />
                <rect x="50" y="50" width="6" height="6" fill="currentColor" />
                <rect x="64" y="50" width="6" height="6" fill="currentColor" />
                <rect x="85" y="50" width="6" height="6" fill="currentColor" />

                <rect x="36" y="64" width="6" height="6" fill="currentColor" />
                <rect x="50" y="64" width="6" height="6" fill="currentColor" />
                <rect x="71" y="64" width="6" height="6" fill="currentColor" />
                <rect x="85" y="64" width="6" height="6" fill="currentColor" />

                <rect x="36" y="78" width="6" height="6" fill="currentColor" />
                <rect x="57" y="78" width="6" height="6" fill="currentColor" />
                <rect x="71" y="78" width="6" height="6" fill="currentColor" />
              </svg>
            </div>
            <span className="font-mono text-[9px] text-[#877E8A] mt-1.5 block">
              Scan at Temple Gate
            </span>
          </div>
        </div>

        {/* Prototype Disclaimer on Ticket Footer */}
        <div className="bg-[#FAF4E9] px-4 py-2 border-t border-[#C79A3B]/30 text-center">
          <p className="text-[9.5px] text-[#665D6A]">
            * Prototype confirmation for demonstration purposes. General Darshan at Mata Tripura Sundari Temple is completely free and requires no mandatory payment.
          </p>
        </div>
      </div>

      {/* Ticket Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837] shadow-2xs transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#C79A3B]" />
          <span>Print Pass</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837] shadow-2xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#C79A3B]" />
          <span>Download Pass</span>
        </button>

        <button
          type="button"
          onClick={onViewMyBookings}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-xs font-semibold text-white shadow-2xs transition-all cursor-pointer"
        >
          <Ticket className="w-4 h-4 text-[#DFC17B]" />
          <span>View in My Bookings</span>
        </button>

        <button
          type="button"
          onClick={onBookAnother}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#665D6A] hover:text-[#6F1837] transition-colors cursor-pointer"
        >
          <span>Book Another Slot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Future Capabilities Note */}
      <div className="p-3 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/25 text-center text-[10.5px] text-[#665D6A]">
        <strong>Future Capability:</strong> Automatic WhatsApp & SMS digital pass dispatch will be activated with official temple portal gateway integration.
      </div>
    </div>
  );
}

