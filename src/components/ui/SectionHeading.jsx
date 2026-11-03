import React from "react";

export default function SectionHeading({
  title,
  subtitle,
  icon: Icon,
  showDivider = true,
  action,
  className = "",
}) {
  return (
    <div className={`flex items-center justify-between gap-3 mb-2.5 ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-5.5 h-5.5 rounded-full bg-[#C79A3B]/15 flex items-center justify-center text-[#C79A3B] shrink-0">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <h2 className="font-serif text-base sm:text-lg lg:text-[20px] font-bold text-[#6F1837] tracking-tight">
            {title}
          </h2>
        </div>

        {subtitle && (
          <span className="text-xs sm:text-[12.5px] text-[#544A57] font-semibold hidden sm:inline">
            {subtitle}
          </span>
        )}
      </div>

      {showDivider && (
        <div className="hidden lg:flex items-center flex-1 max-w-[180px] mx-2 opacity-75">
          <img
            src="/assets/lotus-divider.svg"
            alt="Lotus Divider"
            className="w-full h-3 object-contain"
          />
        </div>
      )}

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
