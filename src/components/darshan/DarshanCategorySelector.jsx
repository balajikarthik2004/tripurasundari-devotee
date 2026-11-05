import React, { useState } from "react";
import {
  Users,
  Sparkles,
  Accessibility,
  Baby,
  ShieldCheck,
  Check,
  Info,
  Clock,
  ArrowRight,
  X,
  FileText,
  Building2,
} from "lucide-react";
import { darshanCategories, protocolCategoryInfo } from "../../data/darshanSlots";

const iconMap = {
  Users,
  Sparkles,
  Accessibility,
  Baby,
};

export default function DarshanCategorySelector({
  selectedCategoryId = "general",
  onSelectCategory,
}) {
  const [showProtocolModal, setShowProtocolModal] = useState(false);

  return (
    <div className="space-y-3.5 select-none animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-0.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B68A36] block">
            Step 1 • Choose Darshan Category
          </span>
          <h2 className="font-heading font-bold text-base sm:text-lg text-[#681B37] tracking-tight">
            Select Darshan Booking Category
          </h2>
        </div>
        <span className="text-xs text-[#7A6448] hidden sm:block">
          General darshan is 100% free daily for all pilgrims
        </span>
      </div>

      {/* Four Visually Balanced Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 items-stretch">
        {darshanCategories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Users;
          const isSelected = selectedCategoryId === cat.id;

          return (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectCategory(cat.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCategory(cat.id);
                }
              }}
              className={`rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer flex flex-col justify-between relative text-left ${
                isSelected
                  ? "bg-[#FFF9EF] border-[#B68A36] shadow-sm ring-2 ring-[#B68A36]/30"
                  : cat.id === "special"
                  ? "bg-white border-[#E2BC6B]/60 hover:border-[#B68A36] hover:bg-[#FFFDF8]"
                  : "bg-white border-slate-200 hover:border-[#B68A36]/60 hover:bg-[#FFFDF8]"
              }`}
            >
              {/* Selected Floating Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#681B37] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
              )}

              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center gap-2 pb-2.5 border-b border-[#F5E8D0]">
                  <div
                    className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? "bg-[#681B37] text-[#FFF9EF] border-[#681B37]"
                        : "bg-[#FFF4E0] text-[#681B37] border-[#E2BC6B]/60"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-bold text-[12px] sm:text-[12.5px] lg:text-[13px] text-[#681B37] leading-snug line-clamp-2 min-h-[32px] flex items-center">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-[#7A6448] font-medium block truncate mt-0.5">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11.5px] text-[#5D5460] mt-2.5 leading-snug line-clamp-3">
                  {cat.description}
                </p>

                {/* Price Label & Conditions */}
                <div className="mt-3 p-2 rounded-xl bg-[#FFFDF8] border border-[#F2E5D0] flex items-center justify-between gap-1">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#8C5D17] uppercase block">
                      Booking Fee
                    </span>
                    <span className="font-heading font-bold text-sm text-[#55132D]">
                      {cat.price === 0 ? "Free (₹0)" : cat.priceLabel}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block text-[9.5px] font-bold px-1.5 py-0.5 rounded-full border ${cat.badgeColor}`}
                    >
                      {cat.badge}
                    </span>
                    <span className="text-[9.5px] text-[#7A6448] block mt-0.5">
                      {cat.dailyQuota} Slots/Day
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button / Select Indicator */}
              <div className="mt-3.5 pt-2 border-t border-[#F5E8D0] flex items-center justify-between gap-1">
                <span className="text-[10px] font-medium text-[#7A6448] truncate max-w-[55%]">
                  {cat.shortGate || cat.entryGate}
                </span>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all shrink-0 ${
                    isSelected
                      ? "bg-[#681B37] text-white shadow-2xs"
                      : "bg-[#FAF4E9] text-[#681B37] hover:bg-[#681B37] hover:text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Category"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restricted Protocol Banner (VIP / State Protocol Darshan) */}
      <div className="rounded-xl bg-[#FFFDF8] border border-[#E2BC6B]/50 p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#B68A36] shrink-0" />
          <div>
            <span className="font-bold text-[#681B37] inline-block mr-1">
              VIP & State Protocol Darshan:
            </span>
            <span className="text-[#665D6A]">
              Strictly restricted to constitutional guests & authorized administration. Not available for commercial purchase.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowProtocolModal(true)}
          className="text-[11px] font-bold text-[#B68A36] hover:text-[#681B37] hover:underline whitespace-nowrap self-start sm:self-center cursor-pointer"
        >
          View Protocol Policy →
        </button>
      </div>

      {/* Protocol Information Modal */}
      {showProtocolModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-[#B68A36] shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#F5E8D0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFF4E0] border border-[#E2BC6B] flex items-center justify-center text-[#681B37]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#681B37]">
                    {protocolCategoryInfo.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-[#8C5D17] uppercase">
                    {protocolCategoryInfo.badge}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProtocolModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#423846] leading-relaxed">
              <p>{protocolCategoryInfo.description}</p>

              <div className="p-3 rounded-xl bg-[#FFFDF8] border border-[#F2E5D0] space-y-1">
                <span className="font-bold text-[#681B37] block">
                  Eligibility & Verification:
                </span>
                <p className="text-[11.5px] text-[#5D5460]">
                  {protocolCategoryInfo.eligibility}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-[11px] space-y-0.5">
                <span className="font-bold block">Temple Trust Notification:</span>
                <p>{protocolCategoryInfo.notice}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowProtocolModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#681B37] text-white text-xs font-bold hover:bg-[#852044] transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

