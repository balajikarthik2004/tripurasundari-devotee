import React from "react";
import { Users, Clock, BarChart3, Hourglass, Timer, Info, CalendarCheck, Ticket } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = {
  Users,
  Clock,
  BarChart3,
  Hourglass,
  Timer,
  CalendarCheck,
  Ticket,
};

export default function InfoCard({ stat, onNavigate }) {
  const IconComponent = iconMap[stat.icon] || Info;
  const { t } = useLanguage();

  const statKey = stat.id === "wait-time" ? "waitTime" : stat.id;
  const translatedTitle = t(`stats.${statKey}.title`, stat.title);
  const translatedBadge = t(`stats.${statKey}.badge`, stat.badge);
  const translatedValue = t(`stats.${statKey}.value`, stat.value);
  const translatedUnit = t(`stats.${statKey}.unit`, stat.unit);

  const handleClick = () => {
    if (stat.id === "darshan" || stat.id === "timings" || stat.id === "slots" || stat.id === "wait-time") {
      onNavigate?.("darshan");
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_6px_18px_rgba(74,16,39,0.08)] hover:border-[#C79A3B]/60 transition-all duration-200 flex flex-col justify-between h-full group select-none relative overflow-hidden cursor-pointer"
    >
      {/* Tier 1: Top Row with Icon, Title, and Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/35 flex items-center justify-center text-[#C79A3B] shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-200">
            <IconComponent className="w-4.5 h-4.5 text-[#C79A3B]" />
          </div>
          <span className="text-[13.5px] sm:text-[14px] font-bold text-[#1F1722] truncate">
            {translatedTitle}
          </span>
        </div>

        {stat.badge && (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide shrink-0 ${
              stat.badgeType === "live"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                : "bg-amber-50/90 text-amber-900 border border-amber-300/80"
            }`}
          >
            {stat.badgeType === "live" && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            )}
            {translatedBadge}
          </span>
        )}
      </div>

      {/* Tier 2: Prominent Value */}
      <div className="font-sans tabular-nums font-bold text-[#6F1837] tracking-tight leading-none mt-3 sm:mt-3.5 flex items-baseline gap-1.5">
        <span className={stat.unit ? "text-[21px] sm:text-[23px]" : "text-[17px] sm:text-[19px]"}>
          {translatedValue}
        </span>
        {translatedUnit && (
          <span className="text-xs sm:text-[13px] font-semibold text-[#4E4452] tracking-normal">
            {translatedUnit}
          </span>
        )}
      </div>
    </div>
  );
}
