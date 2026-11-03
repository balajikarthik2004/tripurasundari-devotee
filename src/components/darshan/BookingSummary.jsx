import React from "react";
import { Calendar, Clock, User, Phone, Users, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function BookingSummary({
  selectedDate,
  selectedSlot,
  formData,
  onConfirm,
  onBack,
  isSubmitting = false,
}) {
  const formattedDate = selectedDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C79A3B]/30 shadow-[0_4px_16px_rgba(74,16,39,0.04)] select-none space-y-5">
      {/* Header */}
      <div className="pb-3 border-b border-[#F0E3D0]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B] block">
              STEP 3 OF 3 • REVIEW & CONFIRM
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#6F1837] tracking-tight">
              Darshan Booking Summary
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            Free Darshan Pass
          </span>
        </div>
      </div>

      {/* Summary Matrix */}
      <div className="bg-[#FFF9EE] rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/30 space-y-3">
        {/* Temple Name */}
        <div className="flex items-start justify-between pb-2.5 border-b border-[#F0E3D0] text-xs">
          <span className="text-[#665D6A]">Temple:</span>
          <span className="font-serif font-bold text-[#6F1837] text-right">
            Mata Tripura Sundari Temple, Matabari
          </span>
        </div>

        {/* Selected Date */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F0E3D0] text-xs">
          <span className="text-[#665D6A] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C79A3B]" />
            <span>Darshan Date:</span>
          </span>
          <span className="font-bold text-[#2D2430] text-right">{formattedDate}</span>
        </div>

        {/* Time Slot */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F0E3D0] text-xs">
          <span className="text-[#665D6A] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C79A3B]" />
            <span>Selected Slot:</span>
          </span>
          <div className="text-right">
            <span className="font-bold text-[#6F1837] block">{selectedSlot?.time}</span>
            <span className="text-[10px] text-[#877E8A]">{selectedSlot?.label}</span>
          </div>
        </div>

        {/* Devotee Info */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F0E3D0] text-xs">
          <span className="text-[#665D6A] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#C79A3B]" />
            <span>Primary Devotee:</span>
          </span>
          <span className="font-bold text-[#2D2430]">{formData.fullName}</span>
        </div>

        {/* Mobile Number */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F0E3D0] text-xs">
          <span className="text-[#665D6A] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#C79A3B]" />
            <span>Mobile:</span>
          </span>
          <span className="font-bold text-[#2D2430]">+91 {formData.mobileNumber}</span>
        </div>

        {/* Total Devotees */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F0E3D0] text-xs">
          <span className="text-[#665D6A] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C79A3B]" />
            <span>Total Devotees:</span>
          </span>
          <span className="font-bold text-[#6F1837]">{formData.devoteesCount} Person(s)</span>
        </div>

        {/* Booking Fee */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[#2D2430] font-bold">Total Booking Fee:</span>
          <span className="font-sans text-base font-bold text-emerald-700">₹0 (Free)</span>
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FAF4E9] text-xs font-semibold text-[#665D6A] transition-all cursor-pointer"
        >
          Modify Selection
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onConfirm}
          className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#6F1837] hover:bg-[#882245] active:bg-[#4A1027] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 text-[#DFC17B]" />
          <span>Confirm Free Darshan Booking</span>
          <ArrowRight className="w-4 h-4 text-[#DFC17B] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

