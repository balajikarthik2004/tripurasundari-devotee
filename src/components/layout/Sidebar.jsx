import React from "react";
import {
  Home,
  Calendar,
  Flame,
  Heart,
  ShoppingBag,
  Bed,
  Info,
  CalendarDays,
  Map,
} from "lucide-react";
import { navigationItems, templeInfo } from "../../data/dashboardData";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = {
  Home,
  Eye: Calendar,
  Flame,
  Heart,
  ShoppingBag,
  Bed,
  Info,
  CalendarDays,
  MapPin: Map,
};

export default function Sidebar({ activeItem = "home", onSelectItem, isMobile = false, onCloseMobile }) {
  const { t, isBengali } = useLanguage();

  const greeting = isBengali
    ? t("common.bengaliGreeting", "॥ জয় মা ত্রিপুরেশ্বরী ॥")
    : t("common.sanskritGreeting", "॥ जय माँ त्रिपुरा सुन्दरी ॥");

  return (
    <aside
      className={`h-full flex flex-col justify-between bg-gradient-to-b from-[#4A1027] to-[#64132F] text-[#FFF8ED] select-none ${
        isMobile ? "w-72" : "w-[250px]"
      } shadow-[4px_0_24px_rgba(45,36,48,0.18)] relative overflow-hidden`}
    >
      {/* Brand Section — Compact, refined, devotional */}
      <div className="relative z-10 pt-3 pb-1.5 px-3.5 shrink-0">
        <button
          type="button"
          onClick={() => {
            onSelectItem?.("home");
            if (isMobile) onCloseMobile?.();
          }}
          className="w-full flex flex-col items-center text-center cursor-pointer group focus:outline-none"
        >
          {/* Temple Emblem Logo */}
          <div className="w-9 h-9 p-1 mb-1 rounded-xl bg-[#70203A]/50 flex items-center justify-center border border-[#C79A3B]/30 shadow-inner group-hover:border-[#C79A3B] transition-colors">
            <img
              src="/assets/temple-logo.svg"
              alt="Mata Tripura Sundari Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Temple Name */}
          <h1 className="font-serif text-[15px] font-bold tracking-tight text-[#FFF8ED] leading-snug group-hover:text-[#DFC17B] transition-colors">
            {t("common.templeName", templeInfo.name)}
          </h1>

          {/* Location */}
          <p className="text-[9.5px] font-bold tracking-widest uppercase text-[#DFC17B] mt-0.5">
            {t("common.templeLocation", templeInfo.location)}
          </p>

          {/* Delicate Antique Gold Divider */}
          <div className="w-20 h-2 my-1 opacity-70">
            <img
              src="/assets/lotus-divider.svg"
              alt="Divider"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
        </button>
      </div>

      {/* Navigation Section — Decreased to 13.5-14px font, 18px icons, ~38px row height */}
      <nav
        className={`relative z-10 flex-1 min-h-0 px-2.5 flex flex-col justify-evenly ${
          isMobile ? "overflow-y-auto py-2" : "overflow-hidden py-0.5"
        }`}
        aria-label="Main Navigation"
      >
        {navigationItems.map((item) => {
          const IconComponent = iconMap[item.icon] || Info;
          const isActive = item.id === activeItem;
          const translatedLabel = t(`nav.${item.id}`, item.label);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectItem?.(item.id);
                if (isMobile) onCloseMobile?.();
              }}
              className={`w-full h-[38px] flex items-center gap-3 px-3 rounded-lg text-[14px] font-semibold transition-all duration-200 group text-left cursor-pointer relative ${
                isActive
                  ? "bg-[#70203A] text-[#FFF8ED] font-bold shadow-xs"
                  : "text-[#E2D2D8] hover:text-[#FFF8ED] hover:bg-[#70203A]/45"
              }`}
              title={translatedLabel}
            >
              {/* Active antique-gold left indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#D6AD52] rounded-r-full shadow-[0_0_6px_rgba(214,173,82,0.8)]" />
              )}

              {/* Icon (18px) */}
              <div
                className={`w-[18px] h-[18px] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isActive
                    ? "text-[#D6AD52] scale-105"
                    : "text-[#E2D2D8]/80 group-hover:text-[#D6AD52] group-hover:scale-105"
                }`}
              >
                <IconComponent className="w-[18px] h-[18px]" />
              </div>

              {/* Label (14px bold text) */}
              <span className="truncate flex-1 tracking-normal leading-none font-semibold">
                {translatedLabel}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Devotional Footer — Anchored to bottom with enhanced prominence and typography */}
      <div className="relative z-10 pt-3 pb-3.5 px-4 border-t border-[#70203A]/60 text-center bg-[#4A1027]/80 shrink-0">
        <div className="w-6 h-3 mx-auto mb-1.5 opacity-90">
          <img
            src="/assets/temple-ornament.svg"
            alt="Lotus Motif"
            className="w-full h-full object-contain filter brightness-110"
          />
        </div>

        {/* Prominent Devotional Greeting */}
        <p className="font-serif text-[14px] sm:text-[15px] font-bold text-[#DFC17B] tracking-wider drop-shadow-2xs">
          {greeting}
        </p>
        <p className="text-[11.5px] sm:text-[12px] font-medium text-[#E2D2D8]/85 tracking-wide mt-0.5">
          {t("common.kurmaPeeth", "Matabari Kurma Peeth")}
        </p>
      </div>
    </aside>
  );
}
