import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Bell,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  Filter,
  Flame,
  Music,
  ShoppingBag,
  Compass
} from "lucide-react";
import { eventsList, officialAnnouncements } from "../data/templePortalData";
import { useLanguage } from "../context/LanguageContext";

export default function EventsPage({ onNavigate }) {
  const { t } = useLanguage();
  // Filter tab: 'all' | 'flagship' | 'diwali-mela' | 'announcements'
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const featuredFestival = eventsList.find((e) => e.isFeatured) || eventsList[0];

  const filteredEvents = eventsList.filter((item) => {
    if (activeFilter === "flagship") {
      return !item.isDiwaliComponent;
    }
    if (activeFilter === "diwali-mela") {
      return item.isDiwaliComponent || item.id === "evt-01";
    }
    return true; // 'all'
  });

  const handleToggleReminder = (eventId, eventTitle) => {
    if (reminders.includes(eventId)) {
      setReminders((prev) => prev.filter((id) => id !== eventId));
      showToast(`Reminder cleared for ${eventTitle}`);
    } else {
      setReminders((prev) => [...prev, eventId]);
      showToast(`Calendar notification preference saved for ${eventTitle}`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-300">
      {/* Devotional Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#877E8A] px-1 select-none">
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
        >
          <span className="group-hover:underline">{t("nav.home", "Home")}</span>
        </button>
        <span className="text-[#C79A3B]">•</span>
        <span className="text-[#6F1837] font-semibold">{t("nav.events", "Events & Festivals")}</span>
      </nav>

      {/* Page Header */}
      <header className="bg-white rounded-2xl sm:rounded-3xl px-5 py-3.5 sm:px-6 sm:py-4 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h1 className="font-serif text-xl sm:text-2xl font-extrabold text-[#6F1837] tracking-tight leading-tight">
              Festivals & Sacred Celebrations
            </h1>
            <p className="text-xs text-[#5D5460]">
              Explore the five-century spiritual congregations, seasonal Shakti festivals, and Diwali Mela programmes celebrated at Matabari.
            </p>
          </div>

          {/* Quick Filter Switcher */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-0.5 lg:pb-0 custom-scrollbar">
            <div className="inline-flex p-1 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-[#6F1837] text-white shadow-xs"
                    : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                All Occasions ({eventsList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("flagship")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === "flagship"
                    ? "bg-[#6F1837] text-white shadow-xs"
                    : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                Major Festivals
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("diwali-mela")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === "diwali-mela"
                    ? "bg-[#6F1837] text-white shadow-xs"
                    : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                Diwali Mela Programmes
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("announcements")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === "announcements"
                    ? "bg-[#6F1837] text-white shadow-xs"
                    : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                Trust Notices ({officialAnnouncements.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="p-3 bg-[#FFF8ED] border border-[#C79A3B]/50 rounded-xl text-xs text-[#6F1837] flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. PROMINENT EDITORIAL HERO CARD: MATABARI DIWALI MELA (WARM LIGHT IVORY HERITAGE PANEL) */}
      {activeFilter !== "announcements" && featuredFestival && (
        <section
          aria-label="Featured Festival: Matabari Diwali Mela"
          className="relative rounded-3xl overflow-hidden border border-[#DCC9AD] shadow-[0_4px_24px_rgba(104,27,55,0.06)] bg-[#F7EBDD] select-none transition-all group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[290px] lg:min-h-[310px]">
            {/* Left: Authentic Celebration Photograph (Kept Naturally Bright & Clear) */}
            <div className="lg:col-span-6 relative overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-full">
              <img
                src={featuredFestival.image}
                alt="Matabari Diwali Mela Celebration at night"
                className="w-full h-full object-cover object-[18%_center] group-hover:scale-102 transition-transform duration-700"
              />
              {/* Subtle seam transition only at the boundary */}
              <div className="hidden lg:block absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-[#F7EBDD]/30 pointer-events-none" />
            </div>

            {/* Right: Editorial Information in Warm Light Ivory (#F7EBDD) */}
            <div className="lg:col-span-6 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-3 bg-[#F7EBDD]">
              <div className="space-y-2.5">
                {/* Clean Editorial Metadata Badge */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-[#FFF7EE] text-[#B68A36] border border-[#B68A36]/40 shadow-2xs">
                    Flagship Annual Celebration
                  </span>
                  <span className="text-[#B68A36] text-[11px] font-semibold">
                    • 500-Year Sacred Tradition
                  </span>
                </div>

                {/* Festival Title in Deep Temple Burgundy (#681B37) */}
                <h2 className="font-serif text-2xl lg:text-[28px] font-bold text-[#681B37] tracking-tight leading-tight">
                  {featuredFestival.name}
                </h2>

                {/* Balanced, Poetic Short Description in Warm Charcoal-Brown (#66564D) */}
                <p className="text-xs text-[#66564D] leading-relaxed max-w-lg font-medium">
                  Tripura's premier five-century spiritual congregation illuminating over 100,000 earthen diyas along Kalyan Sagar with midnight Shyama Kali puja and sacred deepa daan.
                </p>

                {/* Two-Column Balanced Key Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="w-3.5 h-3.5 text-[#B68A36] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#3D271D] block">November 6–8, 2026</span>
                      <span className="text-[10px] text-[#8C6D46] italic">Subject to Trust confirmation</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B68A36] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#3D271D] block truncate">Mata Tripura Sundari Temple</span>
                      <span className="text-[10px] text-[#7A6960] block">Matabari, Udaipur, Tripura</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Subtle Beige Divider (#DCC9AD) */}
              <div className="pt-2.5 border-t border-[#DCC9AD] flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(featuredFestival)}
                  className="px-4.5 py-2 rounded-xl bg-[#E4C477] hover:bg-[#D9B55E] text-[#3D271D] font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-98 border border-[#B68A36]/30"
                >
                  <span>Explore Festival</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3D271D]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleReminder(featuredFestival.id, featuredFestival.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    reminders.includes(featuredFestival.id)
                      ? "bg-emerald-700 text-white border-emerald-600"
                      : "bg-white/80 hover:bg-white text-[#681B37] border-[#DCC9AD]"
                  }`}
                >
                  <Bell className="w-3.5 h-3.5 text-[#B68A36]" />
                  <span>{reminders.includes(featuredFestival.id) ? "Reminder Set" : "Notify Schedule"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. FESTIVAL AND EVENT COLLECTION: BALANCED 2-COLUMN EDITORIAL GRID */}
      {activeFilter !== "announcements" && (
        <section aria-label="Temple Festival Collection" className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837] tracking-tight">
              {activeFilter === "flagship"
                ? "Major Temple Celebrations"
                : activeFilter === "diwali-mela"
                ? "Programmes of Diwali Mela"
                : "Sacred Festivals & Cultural Programmes"}
            </h3>
            <span className="text-xs text-[#877E8A]">
              Showing {filteredEvents.length} Verified Entries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#C79A3B]/30 shadow-2xs hover:shadow-md hover:border-[#C79A3B]/70 transition-all flex flex-col justify-between group select-none"
              >
                {/* Event Photograph with Subtle Hover Zoom */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-600 brightness-[1.02] contrast-[1.04]"
                  />
                  {/* Subtle lower gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Classification Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-[#6F1837] text-white border border-[#C79A3B]/40 shadow-xs">
                      {event.classification}
                    </span>
                  </div>

                  {/* Seasonal Period & Schedule Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-medium text-[11px] sm:text-xs drop-shadow-sm flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#DFC17B]" />
                      <span>{event.dateDisplay}</span>
                    </span>
                    <span className="text-[10px] font-semibold text-[#DFC17B] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20">
                      {event.seasonalPeriod.split("(")[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Editorial Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-[#2D2430] group-hover:text-[#6F1837] transition-colors leading-snug">
                      {event.name}
                    </h4>
                    <p className="text-xs text-[#5D5460] leading-relaxed line-clamp-3">
                      {event.shortDesc}
                    </p>
                  </div>

                  {/* Card Footer: Metadata & View Details Action */}
                  <div className="pt-3 border-t border-[#F0E3D0] flex items-center justify-between text-xs">
                    <span className="text-[#877E8A] text-[11px] flex items-center gap-1 truncate max-w-[55%]">
                      <MapPin className="w-3 h-3 text-[#C79A3B] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="px-4 py-2 rounded-xl bg-[#FFF8ED] hover:bg-[#6F1837] text-[#6F1837] hover:text-white border border-[#C79A3B]/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 group-hover:shadow-xs shrink-0"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C79A3B] group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. OFFICIAL TEMPLE TRUST ANNOUNCEMENTS */}
      {activeFilter === "announcements" && (
        <section aria-label="Official Temple Announcements" className="bg-white rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-2xs space-y-5">
          <div className="space-y-1 pb-3 border-b border-[#F0E3D0]">
            <h3 className="font-serif text-xl font-bold text-[#6F1837]">
              Official Temple Trust Notices & Advisories
            </h3>
            <p className="text-xs text-[#877E8A]">
              Authentic announcements verified by the Mata Tripura Sundari Temple Trust and District Administration.
            </p>
          </div>

          <div className="space-y-3.5">
            {officialAnnouncements.map((ann) => (
              <div key={ann.id} className="p-4 sm:p-4.5 rounded-2xl bg-[#FFF8ED] border border-[#C79A3B]/35 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-bold text-[#6F1837] uppercase bg-white px-2.5 py-0.5 rounded-full border border-[#C79A3B]/30">
                    {ann.category}
                  </span>
                  <span className="text-[11px] text-[#877E8A]">{ann.date}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#2D2430]">{ann.title}</h4>
                <p className="text-xs text-[#5D5460] leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. EVENT DETAILS MODAL (MEANINGFUL DETAIL VIEW) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#C79A3B]/40 shadow-2xl flex flex-col custom-scrollbar">
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0 bg-slate-900">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.name}
                className="w-full h-full object-cover object-center brightness-[1.02] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-[#6F1837] text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#DFC17B] text-[#3D0A1C]">
                  {selectedEvent.classification}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFF8ED] leading-tight">
                  {selectedEvent.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 space-y-5 text-xs text-[#5D5460]">
              {/* Schedule & Location Card */}
              <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 space-y-2 select-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#877E8A] block">Ceremonial Schedule</span>
                    <span className="font-serif font-bold text-sm text-[#6F1837]">{selectedEvent.dateDisplay}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#877E8A] block">Location</span>
                    <span className="font-medium text-[#2D2430]">{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#C79A3B]/20 flex items-start gap-1.5 text-[11px] text-[#6F1837]">
                  <AlertCircle className="w-3.5 h-3.5 text-[#C79A3B] shrink-0 mt-0.5" />
                  <span>
                    {selectedEvent.dateNotice || "Reported dates subject to official confirmation by the Mata Tripura Sundari Temple Trust."}
                  </span>
                </div>
              </div>

              {/* Full Spiritual Significance & Description */}
              <div className="space-y-1.5">
                <h5 className="font-serif font-bold text-sm text-[#2D2430] uppercase tracking-wider">
                  Spiritual Background & Significance
                </h5>
                <p className="text-xs leading-relaxed text-[#4A414D]">
                  {selectedEvent.fullDesc}
                </p>
              </div>

              {/* Ceremonial Highlights & Rituals */}
              {selectedEvent.rituals && selectedEvent.rituals.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-serif font-bold text-sm text-[#2D2430] uppercase tracking-wider">
                    Ceremonial Observances & Sacred Rituals
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedEvent.rituals.map((ritual, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#FFF9EE]/70 p-2.5 rounded-lg border border-[#C79A3B]/20">
                        <Sparkles className="w-3.5 h-3.5 text-[#C79A3B] shrink-0 mt-0.5" />
                        <span className="text-[11.5px] leading-tight text-[#2D2430]">{ritual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visitor Instructions & Civic Advisory */}
              {selectedEvent.visitorInstructions && (
                <div className="space-y-1 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200">
                  <span className="text-[10.5px] font-bold uppercase text-amber-900 block flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-700" />
                    <span>Pilgrim Advisory & Facilities</span>
                  </span>
                  <p className="text-[11.5px] text-amber-950 leading-relaxed">
                    {selectedEvent.visitorInstructions}
                  </p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#F0E3D0] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleReminder(selectedEvent.id, selectedEvent.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    reminders.includes(selectedEvent.id)
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "bg-[#FFF8ED] hover:bg-[#6F1837] text-[#6F1837] hover:text-white border-[#C79A3B]/40"
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{reminders.includes(selectedEvent.id) ? "Reminder Registered" : "Save Event Reminder"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
