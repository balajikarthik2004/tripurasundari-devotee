import React from "react";
import { User, Phone, Users, ShieldCheck, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function DevoteeDetailsForm({
  formData,
  onChange,
  errors = {},
}) {
  const { t } = useLanguage();

  const handleDevoteeCountChange = (count) => {
    onChange({ ...formData, devoteesCount: count });
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#C79A3B]/30 shadow-[0_4px_16px_rgba(74,16,39,0.04)] select-none space-y-4">
      {/* Header */}
      <div className="pb-3 border-b border-[#F0E3D0]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B] block">
          STEP 2 OF 3 • {t("darshan.step2", "DEVOTEE DETAILS")}
        </span>
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#6F1837] tracking-tight">
          {t("darshan.step2", "Devotee & Contact Information")}
        </h3>
        <p className="text-xs text-[#5D5460] mt-0.5">
          Enter primary devotee contact details to receive your digital QR Darshan ticket.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#2D2430] mb-1">
            {t("darshan.fullName", "Primary Devotee Full Name")} <span className="text-[#C83B32]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#877E8A]">
              <User className="w-4 h-4 text-[#C79A3B]" />
            </div>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => onChange({ ...formData, fullName: e.target.value })}
              placeholder={t("darshan.fullNamePlaceholder", "e.g. Ramesh Chandra Debbarma")}
              className={`w-full h-10 pl-9 pr-3 rounded-xl text-xs text-[#2D2430] bg-[#FFF8ED]/50 border transition-all focus:outline-none focus:ring-2 focus:ring-[#6F1837]/20 ${
                errors.fullName ? "border-[#C83B32] bg-rose-50/30" : "border-[#C79A3B]/30 focus:border-[#6F1837]"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[10.5px] text-[#C83B32] mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-bold text-[#2D2430] mb-1">
            {t("darshan.mobileNumber", "Mobile Number")} <span className="text-[#C83B32]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#877E8A]">
              <Phone className="w-4 h-4 text-[#C79A3B]" />
            </div>
            <div className="absolute inset-y-0 left-8 pl-1 flex items-center pointer-events-none text-xs font-bold text-[#6F1837]">
              +91
            </div>
            <input
              type="tel"
              maxLength={10}
              value={formData.mobileNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                onChange({ ...formData, mobileNumber: val });
              }}
              placeholder="9876543210"
              className={`w-full h-10 pl-16 pr-3 rounded-xl text-xs text-[#2D2430] bg-[#FFF8ED]/50 border transition-all focus:outline-none focus:ring-2 focus:ring-[#6F1837]/20 ${
                errors.mobileNumber ? "border-[#C83B32] bg-rose-50/30" : "border-[#C79A3B]/30 focus:border-[#6F1837]"
              }`}
            />
          </div>
          {errors.mobileNumber ? (
            <p className="text-[10.5px] text-[#C83B32] mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.mobileNumber}</span>
            </p>
          ) : (
            <p className="text-[10px] text-[#877E8A] mt-1">
              Your 10-digit mobile number for QR verification at temple entrance.
            </p>
          )}
        </div>

        {/* Number of Devotees Selector (1 to 6) */}
        <div>
          <label className="block text-xs font-bold text-[#2D2430] mb-1.5">
            Total Number of Devotees (Maximum 6 per ticket)
          </label>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDevoteeCountChange(num)}
                className={`h-9 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  formData.devoteesCount === num
                    ? "bg-[#6F1837] text-white border-[#6F1837] shadow-2xs"
                    : "bg-[#FAF4E9] text-[#2D2430] border-[#C79A3B]/30 hover:bg-[#FFF8ED]"
                }`}
              >
                <span>{num}</span>
                {num === 1 && <span className="text-[9px] font-normal hidden sm:inline">(Self)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Free Assurance Pill */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] leading-snug">
            <strong>100% Free Booking:</strong> No credit card, payment gateway or Aadhaar details required.
          </span>
        </div>
      </div>
    </div>
  );
}

