import React from "react";
import {
  Eye,
  Flame,
  HeartHandshake,
  Utensils,
  ShoppingBag,
  BedDouble,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = {
  Eye,
  Flame,
  HeartHandshake,
  Utensils,
  ShoppingBag,
  BedDouble,
};

const defaultActionLabels = {
  darshan: "Book Free Slot",
  pooja: "Explore Rituals",
  donations: "Donate Online",
  annabhog: "View Timings",
  prasad: "Order Prasad",
  accommodation: "Check Rooms",
  info: "Read More",
};

export default function ServiceCard({ service, onNavigate }) {
  const IconComponent = iconMap[service.icon] || Eye;
  const { translations } = useLanguage();

  // Find translated service entry if available
  const serviceCards = translations?.services?.cards || [];
  const cardData = serviceCards.find((c) => c.id === service.id);

  const title = cardData?.title || service.title;
  const description = cardData?.description || service.description || service.subtitle;
  const actionText = cardData?.actionText || defaultActionLabels[service.id] || "Learn More";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate?.(service.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate?.(service.id);
        }
      }}
      className="bg-white rounded-[20px] border border-[#C79A3B]/30 hover:border-[#C79A3B]/70 shadow-[0_2px_12px_rgba(74,16,39,0.04)] hover:shadow-[0_8px_24px_rgba(74,16,39,0.09)] transition-all duration-300 flex flex-row items-stretch h-[116px] sm:h-[120px] group cursor-pointer text-left relative overflow-hidden select-none hover:-translate-y-0.5"
    >
      {/* 1. Large Edge-to-Edge Image Section (42% Width, 100% Height — 2.4x larger visual area) */}
      <div className="relative w-[40%] sm:w-[42%] shrink-0 h-full overflow-hidden bg-[#F0E3D0]">
        <img
          src={service.image}
          alt={service.title}
          onError={(e) => {
            if (service.fallback && e.currentTarget.src !== service.fallback) {
              e.currentTarget.src = service.fallback;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle Warm Vignette Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

        {/* Decorative subtle right hairline separator */}
        <div className="absolute top-0 right-0 bottom-0 w-px bg-[#C79A3B]/30 z-10" />
      </div>

      {/* 2. Content Section (58% Width) */}
      <div className="flex-1 p-3 sm:p-3.5 flex flex-col justify-between min-w-0 bg-gradient-to-br from-[#FFFDF9] to-white">
        {/* Title Row with Icon */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded-md bg-[#FFF8ED] border border-[#C79A3B]/40 flex items-center justify-center text-[#6F1837] shrink-0 shadow-2xs group-hover:bg-[#6F1837] group-hover:text-white transition-colors duration-200">
              <IconComponent className="w-3 h-3" />
            </div>
            <h3 className="font-serif font-bold text-[14.5px] sm:text-[15.5px] text-[#1A121E] group-hover:text-[#6F1837] transition-colors leading-snug truncate">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[11.5px] sm:text-xs font-medium text-[#443948] leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom Action Micro-Link */}
        <div className="flex items-center justify-between pt-1 border-t border-[#F0E3D0]/70 mt-1">
          <span className="text-[11px] font-bold text-[#A87920] group-hover:text-[#6F1837] transition-colors flex items-center gap-1">
            {actionText}
          </span>
          <div className="w-5 h-5 rounded-full bg-[#FAF4E9] group-hover:bg-[#6F1837] text-[#C79A3B] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
