import React from "react";
import {
  Navigation,
  Sparkles,
  FileText,
  ShieldCheck,
  Users,
  Map,
  ChevronRight,
  Compass,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const guideItems = [
  {
    id: "reach",
    title: "How to Reach",
    subtitle: "NH-8, Udaipur Rail & Parking",
    icon: Navigation,
    titles: { bn: "কীভাবে পৌঁছাবেন", hi: "कैसे पहुँचें", en: "How to Reach" },
  },
  {
    id: "planner",
    title: "AI Yatra",
    subtitle: "Personalized pilgrimage plan",
    icon: Sparkles,
    badge: "Smart",
    highlight: true,
    titles: { bn: "এআই যাত্রা", hi: "एआई यात्रा", en: "AI Yatra" },
  },
  {
    id: "guidelines",
    title: "Guidelines & Dress Code",
    subtitle: "Traditional attire & temple rules",
    icon: FileText,
    titles: { bn: "নির্দেশিকা ও পোশাক বিধি", hi: "नিয়ম एवं पोशाक संहिता", en: "Guidelines & Dress Code" },
  },
  {
    id: "facilities",
    title: "Pilgrim Facility",
    subtitle: "Water, cloakroom, shoe stand",
    icon: ShieldCheck,
    titles: { bn: "তীর্থযাত্রী সুবিধা", hi: "तीर्थयात्री सुविधा", en: "Pilgrim Facility" },
  },
  {
    id: "crowd",
    title: "Heat Map",
    subtitle: "Live corridor flow & wait times",
    icon: Users,
    badge: "Live",
    titles: { bn: "হিটম্যাপ", hi: "हीটमैप", en: "Heat Map" },
  },
  {
    id: "map",
    title: "Campus Map",
    subtitle: "Schematic orientation & POIs",
    icon: Map,
    titles: { bn: "ক্যাম্পাস মানচিত্র", hi: "परिसर मानचित्र", en: "Campus Map" },
  },
];

export default function VisitGuide({ onNavigate }) {
  const { t, language } = useLanguage();

  return (
    <div
      aria-label="Plan Your Visit"
      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#DEC077]/70 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_6px_20px_rgba(74,16,39,0.08)] transition-all duration-200 flex flex-col justify-between h-full select-none box-border w-full"
    >
      {/* 1. Header (Level-matched with Heritage & Updates) */}
      <div className="flex items-center gap-2 pb-2 mb-1 border-b border-[#F0E3D0]/80 shrink-0">
        <div className="w-6 h-6 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/50 flex items-center justify-center text-[#6F1837] shadow-2xs shrink-0">
          <Compass className="w-3.5 h-3.5 text-[#6F1837]" />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#6F1837] tracking-tight leading-tight truncate">
            {t("visitGuide.heading", "Plan Your Visit")}
          </h3>
          <span className="text-[10px] text-[#7A6448] block leading-tight truncate">
            Pilgrim navigation & facilities
          </span>
        </div>
      </div>

      {/* 2. 6 Evenly-Spaced Guide Links in Exact Requested Order */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between py-0.5">
        {guideItems.map((item) => {
          const IconComponent = item.icon;
          const translatedTitle = item.titles?.[language] || item.title;

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onNavigate?.("guide", item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNavigate?.("guide", item.id);
                }
              }}
              className={`group flex items-center justify-between p-1.5 sm:p-2 rounded-xl border transition-all duration-150 cursor-pointer text-left shadow-2xs ${
                item.highlight
                  ? "bg-gradient-to-r from-[#FFF8ED] to-[#FFF4E0] border-[#DEC077] hover:border-[#6F1837]"
                  : "bg-[#FFFDF9] hover:bg-[#FFF8ED] border-[#F0E3D0]/60 hover:border-[#DEC077]"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                    item.highlight
                      ? "bg-[#6F1837] text-white"
                      : "bg-[#FAF4E9] group-hover:bg-white border border-[#DEC077]/35 text-[#B68A36] group-hover:text-[#6F1837]"
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11.5px] sm:text-[12px] font-bold group-hover:text-[#6F1837] transition-colors leading-tight whitespace-nowrap ${
                        item.highlight ? "text-[#6F1837]" : "text-[#1A121E]"
                      }`}
                    >
                      {translatedTitle}
                    </span>
                    {item.badge && (
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[8.5px] font-bold ${
                          item.badge === "Live"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-[#FDF0D5] text-[#845212] border border-[#DEC077]"
                        }`}
                      >
                        {item.badge === "Live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[9.5px] text-[#7A6448] block leading-tight truncate">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-[#B68A36] group-hover:text-[#6F1837] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
