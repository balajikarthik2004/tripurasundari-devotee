import React, { useState, useRef, useEffect } from "react";
import { Search, Sun, Globe, User, Menu, ChevronDown, Check } from "lucide-react";
import { weatherSample } from "../../data/dashboardData";
import { useLanguage } from "../../context/LanguageContext";

export default function Topbar({ onToggleMobileMenu }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const { language, setLanguage, currentLanguage, supportedLanguages, t } = useLanguage();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langOpen]);

  return (
    <header className="sticky top-0 z-30 bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#C79A3B]/20 px-4 sm:px-6 lg:px-8 py-2 transition-all duration-200">
      <div className="flex items-center justify-between gap-3 sm:gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile Menu Toggle + Search Box */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-lg">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-white text-[#4A1027] border border-[#C79A3B]/30 hover:bg-[#FAF4E9] transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>

          {/* Search Input Field */}
          <div className="relative w-full min-w-0 flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#665D6A]">
              <Search className="w-3.5 h-3.5 text-[#877E8A]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("common.searchPlaceholder", "Search temple services, darshan...")}
              className="w-full min-w-0 h-9 pl-9 pr-3 bg-white rounded-full text-xs text-[#2D2430] placeholder-[#877E8A] border border-[#C79A3B]/25 focus:border-[#6F1837] focus:outline-none focus:ring-2 focus:ring-[#6F1837]/15 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Right: Weather + Language + Login/Register */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Weather Display (Static Sample Data) */}
          <div
            className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full bg-white border border-[#C79A3B]/20 shadow-2xs cursor-default select-none"
            title="Sample illustrative weather data"
          >
            <div className="w-4.5 h-4.5 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Sun className="w-3 h-3 text-amber-500" />
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[#2D2430] flex items-center gap-1 text-[11.5px] leading-tight font-sans">
                <span>{weatherSample.temp}</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#665D6A]" />
              </div>
              <div className="text-[9.5px] text-[#665D6A] leading-none">
                {t("common.weatherLabel", weatherSample.city)}
              </div>
            </div>
          </div>

          {/* Language Selector (Active Multilingual Switcher) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 sm:gap-2 h-9 px-2.5 sm:px-3 rounded-full bg-white border border-[#C79A3B]/30 hover:border-[#6F1837] text-xs font-semibold text-[#2D2430] transition-all cursor-pointer shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6F1837]/20"
              aria-expanded={langOpen}
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#6F1837]" />
              <span className="text-xs font-semibold tracking-tight text-[#6F1837]">
                {currentLanguage.nativeLabel}
              </span>
              <span className="hidden xl:inline text-[11px] text-[#877E8A] font-normal">
                ({currentLanguage.label})
              </span>
              <ChevronDown className={`w-3 h-3 text-[#665D6A] transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Language Dropdown Menu */}
            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#C79A3B]/35 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
                <div className="px-3 py-1.5 border-b border-[#F0E3D0]/70 text-[10px] font-bold uppercase tracking-wider text-[#877E8A] flex items-center justify-between">
                  <span>{t("common.language", "Select Language")}</span>
                  <span className="text-[#C79A3B] text-[9px]">Mata Tripura Sundari</span>
                </div>

                <div className="p-1 space-y-0.5">
                  {supportedLanguages.map((item) => {
                    const isSelected = language === item.code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLanguage(item.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs ${
                          isSelected
                            ? "bg-[#FFF8ED] text-[#6F1837] font-bold border border-[#C79A3B]/30 shadow-2xs"
                            : "text-[#2D2430] hover:bg-[#FAF4E9]/60 font-medium"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-[13px] leading-tight">
                            {item.nativeLabel}
                          </span>
                          <span className="text-[10px] text-[#877E8A] font-normal">
                            {item.label}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#6F1837] text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Login / Register Button */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-9 px-2.5 sm:px-3.5 rounded-full bg-[#6F1837] hover:bg-[#882245] active:bg-[#4A1027] text-white text-xs font-medium shadow-2xs hover:shadow transition-all duration-200 cursor-pointer shrink-0"
          >
            <User className="w-3.5 h-3.5 text-[#DFC17B]" />
            <span className="font-medium hidden md:inline">
              {t("common.loginRegister", "Login / Register")}
            </span>
            <span className="font-medium hidden sm:inline md:hidden">
              {t("common.login", "Login")}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
