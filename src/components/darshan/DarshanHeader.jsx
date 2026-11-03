import React from "react";
import { Ticket, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function DarshanHeader({ activeTab, onTabChange, bookingsCount = 0 }) {
  const { t } = useLanguage();

  return (
    <header className="bg-white rounded-2xl sm:rounded-3xl px-4 py-3.5 sm:px-6 sm:py-4 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 lg:gap-6">
        {/* Left: Title & Description */}
        <div className="space-y-1 min-w-0 max-w-2xl">
          <h1 className="font-serif text-xl sm:text-2xl lg:text-[23px] font-extrabold text-[#6F1837] tracking-tight leading-snug">
            {t("darshan.headerTitle", "Book Your Darshan")}
          </h1>

          <p className="text-[11.5px] sm:text-xs text-[#5D5460] leading-snug">
            {t("darshan.headerDesc", "Plan your visit to seek divine blessings of Maa Tripura Sundari. General darshan is 100% open and free for all pilgrims without compulsory charges.")}
          </p>
        </div>

        {/* Right: Quick Tab Switcher (Book Darshan vs My Bookings) */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
          <div className="inline-flex p-1 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 shadow-2xs">
            <button
              type="button"
              onClick={() => onTabChange("book")}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "book"
                  ? "bg-[#6F1837] text-white shadow-xs"
                  : "text-[#665D6A] hover:text-[#6F1837]"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeTab === "book" ? "text-[#DFC17B]" : "text-[#C79A3B]"}`} />
              <span>{t("darshan.tabBook", "Book Darshan")}</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("my-bookings")}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer relative ${
                activeTab === "my-bookings"
                  ? "bg-[#6F1837] text-white shadow-xs"
                  : "text-[#665D6A] hover:text-[#6F1837]"
              }`}
            >
              <Ticket className={`w-3.5 h-3.5 ${activeTab === "my-bookings" ? "text-[#DFC17B]" : "text-[#C79A3B]"}`} />
              <span>{t("darshan.tabMyBookings", "My Bookings")}</span>
              {bookingsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#C83B32] text-white">
                  {bookingsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
