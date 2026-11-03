import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { heritageExperiences } from "../../data/dashboardData";
import { Compass, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function MatabariHeritage() {
  const { t } = useLanguage();

  return (
    <section aria-label="Discover the Heritage of Matabari" className="flex flex-col">
      <SectionHeading
        title={t("heritage.heading", "Discover the Heritage of Matabari")}
        subtitle={t("heritage.subtitle", "Experience the unique spiritual and cultural heritage of this sacred place")}
        icon={Compass}
        showDivider={false}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 items-stretch">
        {heritageExperiences.map((exp, index) => {
          const cardKey = index === 0 ? "card1" : "card2";
          const cardTitle = t(`heritage.${cardKey}.title`, exp.title);
          const cardDesc = t(`heritage.${cardKey}.description`, exp.description);
          const cardAction = t(`heritage.${cardKey}.actionText`, exp.note || "Explore");

          return (
            <div
              key={exp.id}
              role="button"
              tabIndex={0}
              className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_6px_20px_rgba(74,16,39,0.08)] hover:border-[#C79A3B]/60 transition-all duration-200 flex flex-col justify-between h-full group cursor-pointer text-left relative select-none"
            >
              {/* Image Banner */}
              <div className="relative w-full h-[115px] sm:h-[125px] rounded-xl overflow-hidden bg-[#F0E3D0] border border-[#C79A3B]/20 mb-2.5 shrink-0">
                <img
                  src={exp.image}
                  alt={cardTitle}
                  onError={(e) => {
                    if (exp.fallback && e.currentTarget.src !== exp.fallback) {
                      e.currentTarget.src = exp.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Information */}
              <div className="flex flex-col justify-between pt-1 flex-1">
                <div>
                  <h3 className="font-serif font-bold text-[16px] sm:text-[17px] text-[#6F1837] tracking-tight group-hover:text-[#C83B32] transition-colors leading-snug">
                    {cardTitle}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] font-medium text-[#382E3B] leading-relaxed line-clamp-3 mt-1.5">
                    {cardDesc}
                  </p>
                </div>

                {/* Action Chevron */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#F0E3D0]/70">
                  <span className="text-[11px] text-[#5C5060] font-semibold group-hover:text-[#6F1837] transition-colors">
                    {cardAction}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center justify-center text-[#C83B32] group-hover:bg-[#6F1837] group-hover:text-white transition-colors shadow-2xs">
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
