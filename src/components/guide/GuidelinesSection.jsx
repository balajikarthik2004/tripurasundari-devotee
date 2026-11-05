import React from "react";
import {
  Check,
  X,
  CameraOff,
  SmartphoneNfc,
  Waves,
  Receipt,
  Trash2,
  Sparkles,
  Footprints,
} from "lucide-react";

export default function GuidelinesSection() {
  return (
    <div className="space-y-3.5 animate-in fade-in duration-200 select-none">
      {/* 1. Header Strip */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FFFDF8] to-[#FFF6E5] border border-[#DEC077]/70 p-3 sm:p-3.5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FDF0D5] to-[#F5D899] border border-[#DEC077] flex items-center justify-center text-[#6F1837] shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#6F1837]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading font-bold text-sm sm:text-base text-[#6F1837] truncate">
              Temple Sanctity & Devotional Dress Code
            </h2>
            <p className="text-[11px] text-[#7A6448] truncate">
              Traditional attire is mandatory for sanctum darshan and inner parikrama.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[10.5px] font-bold whitespace-nowrap shrink-0">
          ● Strictly Enforced
        </span>
      </div>

      {/* 2. Dress Code Cards: Men & Women (Compact 2-col) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Men / Boys */}
        <div className="rounded-2xl bg-white border border-[#E7CE96]/70 p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#F5E8D0]">
            <span className="font-heading font-bold text-sm text-[#6F1837]">
              Devotees (Men & Boys)
            </span>
            <span className="text-[10px] text-[#7A6448]">Traditional / Modest</span>
          </div>

          <div className="space-y-1.5">
            <div>
              <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block mb-1">
                ✓ Permitted & Recommended:
              </span>
              <div className="grid grid-cols-1 gap-1 text-xs text-[#2D2430]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>Dhoti-Kurta, Pyjama-Kurta, Formal Full Trousers & Shirt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>Upper body must be covered with traditional uttariya/shawl during puja</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#F5E8D0]">
              <span className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wider block mb-1">
                ✗ Prohibited inside Sanctum:
              </span>
              <div className="grid grid-cols-1 gap-1 text-xs text-[#991B1B]">
                <div className="flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                  <span>Shorts, Bermuda, Sleeveless T-shirts, Ripped jeans, Caps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Women / Girls */}
        <div className="rounded-2xl bg-white border border-[#E7CE96]/70 p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#F5E8D0]">
            <span className="font-heading font-bold text-sm text-[#6F1837]">
              Devotees (Women & Girls)
            </span>
            <span className="text-[10px] text-[#7A6448]">Traditional / Modest</span>
          </div>

          <div className="space-y-1.5">
            <div>
              <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block mb-1">
                ✓ Permitted & Recommended:
              </span>
              <div className="grid grid-cols-1 gap-1 text-xs text-[#2D2430]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>Saree with blouse, Salwar Kameez, Chudidar with Dupatta</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>Modest traditional attire covering shoulders and ankles</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#F5E8D0]">
              <span className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wider block mb-1">
                ✗ Prohibited inside Sanctum:
              </span>
              <div className="grid grid-cols-1 gap-1 text-xs text-[#991B1B]">
                <div className="flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                  <span>Short skirts, Mini dresses, Sleeveless tops, Beachwear</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Essential Sanctity Rules (5 Compact horizontal chips/cards) */}
      <div className="rounded-2xl bg-white border border-[#E7CE96]/70 p-3 sm:p-3.5 shadow-xs">
        <span className="text-[10px] font-bold text-[#845212] uppercase tracking-wider block mb-2">
          Core Sanctum & Campus Rules
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {[
            {
              icon: CameraOff,
              title: "No Photography",
              desc: "Prohibited inside inner sanctum. Allowed in outer courtyard.",
              badge: "Strict",
            },
            {
              icon: SmartphoneNfc,
              title: "Mobiles Silent",
              desc: "Switch to silent mode before entering queue complex.",
              badge: "Silent",
            },
            {
              icon: Waves,
              title: "Sacred Lake Care",
              desc: "No soap or plastic in Kalyan Sagar. Puffed rice feeding only.",
              badge: "Eco-Law",
            },
            {
              icon: Receipt,
              title: "Official Receipts",
              desc: "Pay pooja fees only at authorized trust billing counters.",
              badge: "Trusted",
            },
            {
              icon: Footprints,
              title: "Footwear Cloakroom",
              desc: "Deposit shoes at free counters (Gate A / Gate C) before entry.",
              badge: "Free",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#F0E3D0] flex flex-col justify-between space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-6 h-6 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/50 flex items-center justify-center text-[#6F1837]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#FAF4E9] text-[#6F1837] border border-[#DEC077]/40">
                    {item.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#2D2430] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] text-[#6B5E62] leading-tight mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
