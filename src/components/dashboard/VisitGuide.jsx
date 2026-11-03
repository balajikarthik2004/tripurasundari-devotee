import React from "react";
import {
  MapPin,
  Map,
  SquareParking,
  ShieldAlert,
  FileText,
  ChevronRight,
  Compass,
} from "lucide-react";
import { visitGuideItems } from "../../data/dashboardData";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = {
  Car: MapPin,
  Map,
  SquareParking,
  ShieldAlert,
  FileText,
};

const guideTitleTranslations = {
  reach: { bn: "কীভাবে পৌঁছাবেন", hi: "कैसे पहुँचें", en: "How to Reach" },
  map: { bn: "মন্দির মানচিত্র", hi: "मंदिर मानचित्र", en: "Temple Map" },
  parking: { bn: "পার্কিং ও পরিবহন", hi: "पार्किंग एवं परिवहन", en: "Parking & Transport" },
  guidelines: { bn: "নির্দেশিকা ও পোশাক বিধি", hi: "नियम एवं पोशाक संहिता", en: "Guidelines & Dress Code" },
  helpline: { bn: "তীর্থযাত্রী হেল্পলাইন", hi: "तीर्थयात्री सहायता केंद्र", en: "Helpline & Support" },
};

export default function VisitGuide({ onNavigate, targetHeight }) {
  const { t, language } = useLanguage();

  return (
    <div
      style={targetHeight ? { height: `${targetHeight}px` } : undefined}
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_6px_20px_rgba(74,16,39,0.08)] transition-all duration-200 flex flex-col justify-between select-none box-border w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-[#F0E3D0]/80 shrink-0">
        <div className="w-6.5 h-6.5 rounded-lg bg-[#FFF8ED] border border-[#C79A3B]/40 flex items-center justify-center text-[#6F1837]">
          <Compass className="w-4 h-4 text-[#6F1837]" />
        </div>
        <div>
          <h3 className="font-serif text-[16px] sm:text-[17px] font-bold text-[#6F1837] tracking-tight">
            {t("visitGuide.heading", "Plan Your Visit")}
          </h3>
        </div>
      </div>

      {/* Guide Links */}
      <div className="flex-1 flex flex-col justify-between py-0.5">
        {visitGuideItems.map((item) => {
          const IconComponent = iconMap[item.icon] || MapPin;
          const translatedTitle = guideTitleTranslations[item.id]?.[language] || item.title;

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onNavigate?.("guide")}
              className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF8ED] transition-colors duration-150 cursor-pointer text-left border border-transparent hover:border-[#C79A3B]/25"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6.5 h-6.5 rounded-lg bg-[#FAF4E9] group-hover:bg-white border border-[#C79A3B]/25 flex items-center justify-center text-[#C79A3B] group-hover:text-[#6F1837] shrink-0 transition-colors shadow-2xs">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13px] font-bold text-[#1A121E] group-hover:text-[#6F1837] transition-colors truncate">
                  {translatedTitle}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-[#C79A3B] group-hover:text-[#6F1837] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
