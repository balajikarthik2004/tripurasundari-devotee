import React from "react";
import { User, Phone, Users, ShieldCheck, AlertCircle, Accessibility, Sparkles, Check, Baby } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function DevoteeDetailsForm({
  formData,
  onChange,
  errors = {},
  selectedCategory,
}) {
  const { t } = useLanguage();

  const handleDevoteeCountChange = (count) => {
    onChange({ ...formData, devoteesCount: count });
  };

  const isSeniorCategory = selectedCategory?.id === "senior_divyangjan";
  const isSpecialCategory = selectedCategory?.id === "special";
  const isInfantCategory = selectedCategory?.id === "infant_family";

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#C79A3B]/30 shadow-[0_4px_16px_rgba(74,16,39,0.04)] select-none space-y-4">
      {/* Header */}
      <div className="pb-3 border-b border-[#F0E3D0]">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B] block">
            STEP 2 OF 3 • {t("darshan.step2", "DEVOTEE DETAILS")}
          </span>
          {selectedCategory && (
            <span
              className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border ${selectedCategory.badgeColor}`}
            >
              {selectedCategory.name}
            </span>
          )}
        </div>
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#6F1837] tracking-tight mt-1">
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

        {/* Number of Devotees Selector */}
        <div>
          <label className="block text-xs font-bold text-[#2D2430] mb-1.5">
            Total Number of Devotees ({isSeniorCategory ? "Max 2 per pass: Devotee + 1 Attendant" : isInfantCategory ? "Max 3 per pass: Parents + Infant" : "Maximum 6 per pass"})
          </label>
          <div className="grid grid-cols-6 gap-2">
            {(isSeniorCategory ? [1, 2] : isInfantCategory ? [1, 2, 3] : [1, 2, 3, 4, 5, 6]).map((num) => (
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

        {/* Category Specific Infant & Expectant Mothers Options */}
        {isInfantCategory && (
          <div className="p-3.5 rounded-xl bg-[#FDF2F8] border border-[#FBCFE8] space-y-2">
            <div className="flex items-center gap-2">
              <Baby className="w-4 h-4 text-[#BE185D]" />
              <span className="font-bold text-xs text-[#9D174D]">
                Matri & Shishu Care Facility
              </span>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[#831843] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.needsPramStorage || false}
                onChange={(e) =>
                  onChange({ ...formData, needsPramStorage: e.target.checked })
                }
                className="mt-0.5 rounded text-[#BE185D] focus:ring-[#BE185D]"
              />
              <span className="leading-snug">
                Request stroller / baby pram storage & feeder room access near Gate 1 Helpdesk.
              </span>
            </label>

            <p className="text-[10.5px] text-[#701A75] leading-tight pt-1 border-t border-[#FCE7F3]">
              Note: Dedicated shaded express queue lane for expecting mothers and children below 5 years.
            </p>
          </div>
        )}

        {/* Category Specific Accessibility Options: Senior Citizen & Divyangjan */}
        {isSeniorCategory && (
          <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-[#1D4ED8]" />
              <span className="font-bold text-xs text-[#1E40AF]">
                Accessibility Support Services
              </span>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[#1E3A8A] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.needsWheelchair || false}
                onChange={(e) =>
                  onChange({ ...formData, needsWheelchair: e.target.checked })
                }
                className="mt-0.5 rounded text-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              <span className="leading-snug">
                Request complimentary wheelchair & ramp volunteer at Gate 1 Helpdesk.
              </span>
            </label>

            <p className="text-[10.5px] text-[#475569] leading-tight pt-1 border-t border-[#DBEAFE]">
              Note: Devotees are requested to carry proof of age (Aadhaar/Voter ID) or Disability Card at the time of entry.
            </p>
          </div>
        )}

        {/* Category Specific Pricing Breakdown: Special Entry */}
        {isSpecialCategory && (
          <div className="p-3.5 rounded-xl bg-[#FEF3C7]/60 border border-[#FDE68A] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-[#92400E]">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>Special Entry Fee Calculation</span>
              </div>
              <span className="font-heading font-bold text-sm text-[#78350F]">
                ₹{100 * (formData.devoteesCount || 1)}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-[#78350F]">
              <span>Rate: ₹100 × {formData.devoteesCount || 1} Devotee(s)</span>
              <span className="font-medium">Priority Queue Access</span>
            </div>

            <p className="text-[10px] text-[#92400E]/80 italic pt-1 border-t border-[#FCD34D]/60">
              Note: Special Entry pricing is an illustrative prototype configuration. No credit card or active gateway is required for this demo.
            </p>
          </div>
        )}

        {/* Standard Free Assurance for General Darshan */}
        {!isSpecialCategory && !isSeniorCategory && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] leading-snug">
              <strong>100% Free General Darshan:</strong> No credit card, payment gateway or registration fee required.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
