import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  Sparkles,
  CheckCircle2,
  Clock,
  Car,
  Train,
  Bus,
  Plane,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Printer,
  Share2,
  Heart,
  ShieldCheck,
  Info,
  ChevronRight,
  Check,
  SlidersHorizontal,
  Flame,
  Plus,
  X,
  Building2,
  Waves,
  ShoppingBag,
  SquareParking,
  FileText,
  Map,
} from "lucide-react";
import HowToReachSection from "../components/guide/HowToReachSection";
import TempleCrowdMap from "../components/guide/TempleCrowdMap";
import TempleMapSection from "../components/guide/TempleMapSection";
import FacilitiesSection from "../components/guide/FacilitiesSection";
import GuidelinesSection from "../components/guide/GuidelinesSection";
import {
  quickOriginCities,
  transportModes,
  travelPaces,
  pilgrimageInterests,
  matabariHighlights,
  defaultChecklist,
  travelReminders,
  generateDemoItinerary,
} from "../data/yatraPlanData";
import { useLanguage } from "../context/LanguageContext";

const iconMap = {
  Car,
  Train,
  Bus,
  Plane,
  HelpCircle,
};

export default function VisitGuidePage({ onNavigate, initialTab = "reach" }) {
  const { t } = useLanguage();
  // Active Guide Tab: 'reach' | 'map' | 'parking' | 'facilities' | 'guidelines' | 'planner'
  const [activeTab, setActiveTab] = useState(initialTab || "reach");

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
      if (initialTab === "planner") {
        setViewState("planner");
      }
    }
  }, [initialTab]);

  // Page mode: 'planner' | 'generating' | 'result'
  const [viewState, setViewState] = useState("planner");

  // Multi-step planner: 1 to 5
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [originCity, setOriginCity] = useState("Agartala");
  const [originState, setOriginState] = useState("Tripura");
  const [pinCode, setPinCode] = useState("");

  const [visitDuration, setVisitDuration] = useState("one-day");
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split("T")[0];
  });
  const [isFlexibleDates, setIsFlexibleDates] = useState(false);

  // Group
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [mobilityAssistance, setMobilityAssistance] = useState(false);

  // Preferences
  const [travelMode, setTravelMode] = useState("car");
  const [budgetTier, setBudgetTier] = useState("Moderate (\u20B91,500 \u2013 \u20B93,000)");
  const [pace, setPace] = useState("balanced");
  const [accommodation, setAccommodation] = useState("not-required");
  const [journeyStyle, setJourneyStyle] = useState("family");

  // Interests & Special requests
  const [selectedInterests, setSelectedInterests] = useState([
    "darshan",
    "kalyan_sagar",
    "heritage",
    "peda",
  ]);
  const [specialConsiderations, setSpecialConsiderations] = useState("");

  // Result & Checklist State
  const [itinerary, setItinerary] = useState(() =>
    generateDemoItinerary({
      originCity: "Agartala",
      originState: "Tripura",
      visitDuration: "one-day",
      startDate: "2026-11-05",
      returnDate: "2026-11-05",
      totalDevotees: 3,
      adults: 2,
      children: 0,
      seniors: 1,
      mobilityAssistance: true,
      travelMode: "car",
      pace: "balanced",
    })
  );
  const [selectedDayTab, setSelectedDayTab] = useState(1);
  const [resultSubTab, setResultSubTab] = useState("itinerary");
  const [checklist, setChecklist] = useState(defaultChecklist);
  const [newChecklistText, setNewChecklistText] = useState("");
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const totalDevotees = adults + children + seniors;

  const handleToggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleToggleChecklist = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddCustomChecklist = (e) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      category: "beforeDeparture",
      label: newChecklistText.trim(),
      checked: false,
    };
    setChecklist((prev) => [newItem, ...prev]);
    setNewChecklistText("");
    setShowAddChecklist(false);
  };

  const checkedCount = checklist.filter((item) => item.checked).length;
  const totalCount = checklist.length;
  const readinessScore = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const handleGeneratePlan = () => {
    setViewState("generating");
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      const generated = generateDemoItinerary({
        originCity,
        originState,
        visitDuration,
        startDate,
        returnDate,
        totalDevotees,
        adults,
        children,
        seniors,
        mobilityAssistance,
        travelMode,
        budgetTier,
        pace,
        accommodation,
        journeyStyle,
        selectedInterests,
        specialConsiderations,
      });
      setItinerary(generated);
      setSelectedDayTab(1);
      setViewState("result");
    }, 1200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Mata Tripura Sundari Pilgrimage Plan",
        text: `Pilgrimage Plan to Mata Tripura Sundari Temple from ${originCity}. Readiness Score: ${readinessScore}%.`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToPlanner = () => {
    setActiveTab("planner");
    setViewState("planner");
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToGuide = () => {
    onNavigate?.("info");
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2430] text-[#FFF8ED] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-[#C79A3B]/40 text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          Yatra Plan link copied to clipboard!
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PRACTICAL VISITOR'S GUIDE & PILGRIMAGE COMPANION OVERVIEW             */}
      {/* ========================================================================= */}
      <div className="space-y-4 select-none animate-in fade-in duration-200 pb-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[11px] text-[#877E8A] px-1 select-none"
        >
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
          >
            <span className="group-hover:underline">{t("nav.home", "Home")}</span>
          </button>
          <span className="text-[#C79A3B]">•</span>
          <span className="text-[#6F1837] font-semibold">
            {t("nav.guide", "Visit Guide")}
          </span>
          <span className="text-[#C79A3B]">•</span>
          <span className="text-[#845212] capitalize">
            {activeTab === "reach"
              ? "How to Reach"
              : activeTab === "planner"
                ? "AI Yatra"
                : activeTab === "guidelines"
                  ? "Guidelines & Dress Code"
                  : activeTab === "facilities"
                    ? "Pilgrim Facility"
                    : activeTab === "crowd"
                      ? "Heat Map"
                      : "Campus Map"}
          </span>
        </nav>

        {/* Section Navigation Tabs: Full Width, Premium Segmented Style */}
        <div className="w-full bg-[#FFFDF8] p-1.5 rounded-2xl border border-[#DEC077]/70 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 select-none">
          {[
            { id: "reach", label: "How to Reach", icon: Car },
            { id: "planner", label: "AI Yatra", icon: Sparkles },
            { id: "guidelines", label: "Guidelines & Dress Code", icon: FileText },
            { id: "facilities", label: "Pilgrim Facility", icon: ShieldCheck },
            { id: "crowd", label: "Heat Map", icon: Users },
            { id: "map", label: "Campus Map", icon: Map },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (typeof window !== "undefined") {
                    window.location.hash = `guide?tab=${tab.id}`;
                  }
                }}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-1.5 sm:px-2 rounded-xl text-[11px] xl:text-xs font-bold transition-all whitespace-nowrap cursor-pointer text-center w-full ${isActive
                    ? "bg-[#6F1837] text-white shadow-xs ring-1 ring-[#DEC077]"
                    : "bg-white text-[#5D5460] border border-[#E7CE96]/70 hover:border-[#6F1837] hover:text-[#6F1837]"
                  }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#DFC17B]" : "text-[#C79A3B]"
                    }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Render Active Tab Content */}
        {activeTab === "reach" && (
          <HowToReachSection onSelectPlanner={scrollToPlanner} />
        )}

        {/* AI Yatra Planner Form rendered directly below navigation bar */}
        {activeTab === "planner" && viewState === "planner" && (
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-[#DEC077]/70 shadow-xs p-5 sm:p-7 space-y-5 select-none animate-in fade-in duration-200">
            {/* Header */}
            <div className="shrink-0 space-y-1 pb-3 border-b border-[#F0E3D0]">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2430] leading-tight">
                    AI Pilgrimage Companion
                  </h1>
                  <p className="text-xs sm:text-[13px] text-[#7A6448] mt-0.5">
                    Personalized 5-step journey planner for Mata Tripura Sundari Temple
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#6F1837] px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/40 shadow-2xs">
                    Step {currentStep} of 5
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-[#F0E3D0] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#6F1837] to-[#C79A3B] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-[#5D5460]">
                <span className={currentStep >= 1 ? "text-[#6F1837] font-bold" : ""}>1. Origin</span>
                <span className={currentStep >= 2 ? "text-[#6F1837] font-bold" : ""}>2. Dates</span>
                <span className={currentStep >= 3 ? "text-[#6F1837] font-bold" : ""}>3. Travelers</span>
                <span className={currentStep >= 4 ? "text-[#6F1837] font-bold" : ""}>4. Preferences</span>
                <span className={currentStep >= 5 ? "text-[#6F1837] font-bold" : ""}>5. Interests</span>
              </div>
            </div>

            {/* Step Form Content */}
            <div className="pt-2">
              {/* STEP 1: ORIGIN */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider block">
                      Step 1 of 5
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2430]">
                      Where does your journey begin?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5D5460] mt-0.5">
                      Enter your starting city or select a common departure point.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        Starting City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#C79A3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={originCity}
                          onChange={(e) => setOriginCity(e.target.value)}
                          placeholder="e.g. Agartala, Kolkata, Guwahati"
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#C79A3B]/40 focus:border-[#6F1837] focus:ring-1 focus:ring-[#6F1837] text-sm text-[#2D2430] outline-hidden bg-[#FFFDF9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        State / Region
                      </label>
                      <input
                        type="text"
                        value={originState}
                        onChange={(e) => setOriginState(e.target.value)}
                        placeholder="e.g. Tripura, West Bengal, Assam"
                        className="w-full h-11 px-3.5 rounded-xl border border-[#C79A3B]/40 focus:border-[#6F1837] focus:ring-1 focus:ring-[#6F1837] text-sm text-[#2D2430] outline-hidden bg-[#FFFDF9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        PIN Code (Optional)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="6-digit postal PIN code"
                        className="w-full h-11 px-3.5 rounded-xl border border-[#C79A3B]/40 focus:border-[#6F1837] focus:ring-1 focus:ring-[#6F1837] text-sm text-[#2D2430] outline-hidden bg-[#FFFDF9]"
                      />
                    </div>
                  </div>

                  {/* Quick Selection Chips */}
                  <div className="space-y-2 pt-3 border-t border-[#F0E3D0]/80">
                    <span className="text-xs font-semibold text-[#5D5460]">
                      Frequent Departure Hubs:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickOriginCities.map((item) => (
                        <button
                          key={item.city}
                          type="button"
                          onClick={() => {
                            setOriginCity(item.city);
                            setOriginState(item.state);
                          }}
                          className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            originCity.toLowerCase() === item.city.toLowerCase()
                              ? "bg-[#6F1837] text-[#FFF8ED] border-[#6F1837] font-bold shadow-xs"
                              : "bg-[#FFF8ED] text-[#2D2430] border-[#C79A3B]/40 hover:border-[#6F1837] hover:bg-[#FFF5E6]"
                          }`}
                        >
                          {item.city} ({item.state})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DATES */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider block">
                      Step 2 of 5
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2430]">
                      When are you planning to visit?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5D5460] mt-0.5">
                      Choose visit duration and tentative pilgrimage dates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#FFF8ED] border border-[#C79A3B]/40 max-w-xl">
                    <button
                      type="button"
                      onClick={() => setVisitDuration("one-day")}
                      className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        visitDuration === "one-day"
                          ? "bg-[#6F1837] text-[#FFF8ED] shadow-sm"
                          : "text-[#2D2430] hover:text-[#6F1837]"
                      }`}
                    >
                      1-Day Sacred Darshan
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisitDuration("multi-day")}
                      className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        visitDuration === "multi-day"
                          ? "bg-[#6F1837] text-[#FFF8ED] shadow-sm"
                          : "text-[#2D2430] hover:text-[#6F1837]"
                      }`}
                    >
                      Multi-Day Pilgrimage (2+ Days)
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        Journey Start Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#C79A3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            if (e.target.value > returnDate) {
                              setReturnDate(e.target.value);
                            }
                          }}
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#C79A3B]/40 focus:border-[#6F1837] text-sm text-[#2D2430] outline-hidden bg-[#FFFDF9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        Return Date {visitDuration === "one-day" ? "(Same Day)" : ""}
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#C79A3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          disabled={visitDuration === "one-day"}
                          value={visitDuration === "one-day" ? startDate : returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={startDate}
                          className={`w-full h-11 pl-10 pr-3 rounded-xl border border-[#C79A3B]/40 text-sm text-[#2D2430] outline-hidden ${
                            visitDuration === "one-day" ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "focus:border-[#6F1837] bg-[#FFFDF9]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-[13px] text-[#2D2430] pt-1">
                    <input
                      type="checkbox"
                      checked={isFlexibleDates}
                      onChange={(e) => setIsFlexibleDates(e.target.checked)}
                      className="w-4 h-4 rounded text-[#6F1837] accent-[#6F1837]"
                    />
                    <span>My pilgrimage dates are flexible by +/- 1-2 days based on crowd flow.</span>
                  </label>
                </div>
              )}

              {/* STEP 3: TRAVELERS */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider block">
                      Step 3 of 5
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2430]">
                      Who will be joining your pilgrimage?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5D5460] mt-0.5">
                      Configure group composition for appropriate seating, rest, and queue advice.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#FFF8ED] rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/35 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-[#2D2430]">Adults</h4>
                        <p className="text-xs text-[#5D5460] mt-0.5">Age 12 and above</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-9 h-9 rounded-xl bg-white border border-[#C79A3B]/50 font-bold text-[#6F1837] hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer text-sm flex items-center justify-center shadow-2xs"
                        >
                          -
                        </button>
                        <span className="font-serif text-xl font-bold text-[#2D2430]">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(15, adults + 1))}
                          className="w-9 h-9 rounded-xl bg-white border border-[#C79A3B]/50 font-bold text-[#6F1837] hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer text-sm flex items-center justify-center shadow-2xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FFF8ED] rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/35 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-[#2D2430]">Children</h4>
                        <p className="text-xs text-[#5D5460] mt-0.5">Age below 12</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-9 h-9 rounded-xl bg-white border border-[#C79A3B]/50 font-bold text-[#6F1837] hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer text-sm flex items-center justify-center shadow-2xs"
                        >
                          -
                        </button>
                        <span className="font-serif text-xl font-bold text-[#2D2430]">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(Math.min(10, children + 1))}
                          className="w-9 h-9 rounded-xl bg-white border border-[#C79A3B]/50 font-bold text-[#6F1837] hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer text-sm flex items-center justify-center shadow-2xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FFF8ED] rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/35 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-[#2D2430]">Senior Citizens</h4>
                        <p className="text-xs text-[#5D5460] mt-0.5">Age 60 and above</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setSeniors(Math.max(0, seniors - 1))}
                          className="w-9 h-9 rounded-xl bg-white border border-[#C79A3B]/50 font-bold text-[#6F1837] hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer text-sm flex items-center justify-center shadow-2xs"
                        >
                          -
                        </button>
                        <span className="font-serif text-xl font-bold text-[#2D2430]">{seniors}</span>
                        <button
                          type="button"
                          onClick={() => setSeniors(Math.min(10, seniors + 1))}
                          className="w-9 h-9 rounded-xl bg-white border border-[#C79A3B]/50 font-bold text-[#6F1837] hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer text-sm flex items-center justify-center shadow-2xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F0E3D0]/60 border border-[#C79A3B]/30 text-xs sm:text-sm">
                    <span className="font-semibold text-[#2D2430]">
                      Total Devotees in Yatra:
                    </span>
                    <span className="font-serif text-base font-bold text-[#6F1837]">
                      {totalDevotees} Pilgrim{totalDevotees > 1 ? "s" : ""}
                    </span>
                  </div>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED]/50 transition-colors cursor-pointer text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      checked={mobilityAssistance}
                      onChange={(e) => setMobilityAssistance(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-[#6F1837] accent-[#6F1837] shrink-0"
                    />
                    <div>
                      <span className="font-bold text-[#2D2430] block">
                        Mobility Assistance or Slower Pace Needed
                      </span>
                      <span className="text-xs text-[#5D5460] leading-normal block mt-0.5">
                        Includes ramps, shaded sitting points near Natmandap, and extended darshan buffer times.
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {/* STEP 4: PREFERENCES */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider block">
                      Step 4 of 5
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2430]">
                      How would you like to travel?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5D5460] mt-0.5">
                      Select your preferred travel mode and pilgrimage pace.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2430] uppercase mb-2">
                      Preferred Travel Mode
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {transportModes.map((item) => {
                        const Icon = iconMap[item.icon] || Car;
                        const isSelected = travelMode === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setTravelMode(item.id)}
                            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                              isSelected
                                ? "bg-[#6F1837] text-[#FFF8ED] border-[#6F1837] shadow-sm"
                                : "bg-[#FFF8ED] text-[#2D2430] border-[#C79A3B]/40 hover:border-[#6F1837] hover:bg-[#FFF5E6]"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? "text-[#C79A3B]" : "text-[#6F1837]"}`} />
                            <span className="text-xs font-bold truncate max-w-full">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2430] uppercase mb-2">
                      Travel Pace
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {travelPaces.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPace(item.id)}
                          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            pace === item.id
                              ? "bg-[#6F1837] text-[#FFF8ED] border-[#6F1837] font-bold shadow-sm"
                              : "bg-[#FFF8ED] text-[#2D2430] border-[#C79A3B]/40 hover:border-[#6F1837] hover:bg-[#FFF5E6]"
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-bold block">{item.label}</span>
                          <span className="text-xs opacity-80 block font-normal mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        Accommodation Need
                      </label>
                      <select
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-[#C79A3B]/40 text-xs sm:text-sm text-[#2D2430] outline-hidden focus:border-[#6F1837] bg-[#FFFDF9]"
                      >
                        <option value="required">Yatri Nivas / Room Required</option>
                        <option value="not-required">Not Required (Day Visit)</option>
                        <option value="undecided">Undecided / Exploring</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2430] uppercase mb-1.5">
                        Journey Style
                      </label>
                      <select
                        value={journeyStyle}
                        onChange={(e) => setJourneyStyle(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-[#C79A3B]/40 text-xs sm:text-sm text-[#2D2430] outline-hidden focus:border-[#6F1837] bg-[#FFFDF9]"
                      >
                        <option value="family">Family Pilgrimage</option>
                        <option value="individual">Individual / Solo Devotee</option>
                        <option value="group">Group / Seva Mandal Yatra</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: INTERESTS */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider block">
                      Step 5 of 5
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2430]">
                      What would you like to experience at Matabari?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5D5460] mt-0.5">
                      Select spiritual and cultural experiences for your customized itinerary.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
                    {pilgrimageInterests.map((item) => {
                      const isChecked = selectedInterests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleToggleInterest(item.id)}
                          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                            isChecked
                              ? "bg-[#FFF8ED] border-[#6F1837] shadow-xs ring-1 ring-[#6F1837]/30"
                              : "bg-white border-[#C79A3B]/30 hover:border-[#C79A3B] hover:bg-[#FFFDF9]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border mt-0.5 ${
                              isChecked
                                ? "bg-[#6F1837] border-[#6F1837] text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs sm:text-sm font-bold text-[#2D2430] block">
                              {item.label}
                            </span>
                            <span className="text-xs text-[#5D5460] block mt-1 leading-relaxed">
                              {item.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="block text-xs font-bold text-[#2D2430] uppercase">
                      Special Considerations (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialConsiderations}
                      onChange={(e) => setSpecialConsiderations(e.target.value)}
                      placeholder="e.g. Gotra Archana, wheelchair access, infants, special dietary preferences..."
                      className="w-full h-11 px-3.5 rounded-xl border border-[#C79A3B]/40 focus:border-[#6F1837] text-xs sm:text-sm text-[#2D2430] outline-hidden bg-[#FFFDF9]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Controls - Docked at Bottom */}
            <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-[#F0E3D0] shrink-0">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl border border-[#C79A3B]/40 text-[#6F1837] font-semibold text-xs sm:text-sm hover:bg-[#FFF8ED] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab("reach")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#DEC077]/70 text-[#6F1837] font-semibold text-xs hover:bg-[#FFF8ED] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>View How to Reach</span>
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#4A1027] text-[#FFF8ED] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-[#C79A3B]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGeneratePlan}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#C79A3B] to-[#B38728] hover:from-[#d8a846] hover:to-[#C79A3B] text-[#2D2430] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#6F1837]" />
                  <span>Generate My Yatra Plan</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. DEVOTIONAL GENERATING STATE                                           */}
        {/* ========================================================================= */}
        {activeTab === "planner" && viewState === "generating" && (
          <div className="max-w-xl mx-auto py-16 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#C79A3B]/20 animate-ping" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6F1837] to-[#4A1027] border-2 border-[#C79A3B] flex items-center justify-center shadow-xl">
                <Flame className="w-10 h-10 text-[#C79A3B] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6F1837]">
                Preparing Your Sacred Journey...
              </h2>
              <p className="font-serif text-[#C79A3B] text-sm">
                {"\u0965 \u091C\u092F \u092E\u093E\u0901 \u0924\u094D\u0930\u093F\u092A\u0941\u0930\u093E \u0938\u0941\u0928\u094D\u0926\u0930\u0940 \u0965"}
              </p>
              <p className="text-xs sm:text-sm text-[#5D5460] max-w-md mx-auto">
                Bringing your travel preferences together to create a comfortable, serene pilgrimage plan for {originCity} to Matabari.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/40 text-xs text-[#6F1837] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C79A3B]" />
              Synthesizing Darshan schedule, Kalyan Sagar parikrama & checklist...
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. PERSONALIZED YATRA PLAN RESULTS PAGE                                   */}
        {/* ========================================================================= */}
        {activeTab === "planner" && viewState === "result" && itinerary && (
          <div className="space-y-6 animate-in fade-in duration-300 py-2 pr-1">
            {/* Journey Overview Hero Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A1027] via-[#6F1837] to-[#36081B] text-[#FFF8ED] p-6 sm:p-8 border border-[#C79A3B]/35 shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C79A3B]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#C79A3B]/20 border border-[#C79A3B]/40 text-[#C79A3B] text-xs font-semibold uppercase tracking-wider">
                      {itinerary.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-medium">
                      Prototype Demonstration Preview
                    </span>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF8ED]">
                    {"Your Yatra Plan: " + originCity + " \u2192 Matabari"}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#FFF8ED]/85 max-w-2xl leading-relaxed">
                    {itinerary.summary}
                  </p>

                  <p className="font-serif text-[#C79A3B] text-sm italic">
                    {"\u201C" + "May Maa Tripura Sundari bless your journey with peace, health, and spiritual fulfillment." + "\u201D"}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[#FFF8ED]">
                      {"\uD83D\uDCC5 " + startDate + (visitDuration === "multi-day" ? " to " + returnDate : " (1 Day)")}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[#FFF8ED]">
                      {"\uD83D\uDC65 " + totalDevotees + " Devotee" + (totalDevotees > 1 ? "s" : "") + " (" + adults + "A" + (children > 0 ? " \u2022 " + children + "C" : "") + (seniors > 0 ? " \u2022 " + seniors + "S" : "") + ")"}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[#FFF8ED]">
                      {"\uD83D\uDE97 Mode: " + travelMode.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[#FFF8ED]">
                      {"\u2696\uFE0F Pace: " + pace.charAt(0).toUpperCase() + pace.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      setViewState("planner");
                      setCurrentStep(1);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#FFF8ED] text-xs font-semibold transition-all cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>Edit Preferences</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#FFF8ED] text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>Print Itinerary</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C79A3B] hover:bg-[#B38728] text-[#2D2430] text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Yatra Plan</span>
                  </button>

                  <button
                    onClick={() => {
                      setViewState("planner");
                      setCurrentStep(1);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 text-[11px] text-[#FFF8ED]/70 hover:text-white pt-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Start New Yatra</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Yatra Readiness Score Banner */}
            <div className="bg-white rounded-2xl p-5 border border-[#C79A3B]/30 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-[#FFF8ED] border-4 border-[#C79A3B] flex items-center justify-center shrink-0">
                  <span className="font-serif text-lg font-bold text-[#6F1837]">
                    {readinessScore}%
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2430]">
                      Yatra Readiness Tracker
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${readinessScore >= 80
                          ? "bg-emerald-100 text-emerald-800"
                          : readinessScore >= 50
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {readinessScore >= 80
                        ? "Almost Ready"
                        : readinessScore >= 50
                          ? "In Progress"
                          : "Preparation Needed"}
                    </span>
                  </div>
                  <p className="text-xs text-[#5D5460] mt-0.5 max-w-xl">
                    {checkedCount} of {totalCount} pilgrimage preparation items checked. Click items in the Preparation Checklist below to update your status.
                  </p>
                  <p className="text-[10px] text-[#8C827A] italic mt-0.5">
                    {"\u201CPractical preparation tracker based on your travel checklist. Does not quantify personal faith or devotion.\u201D"}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <button
                  onClick={() => setResultSubTab("checklist")}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FFF8ED] hover:bg-[#F0E3D0] border border-[#C79A3B]/40 text-[#6F1837] text-xs font-bold transition-colors cursor-pointer"
                >
                  View & Complete Checklist
                </button>
              </div>
            </div>

            {/* Results Navigation Tabs */}
            <div className="flex border-b border-[#F0E3D0] gap-4">
              <button
                onClick={() => setResultSubTab("itinerary")}
                className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${resultSubTab === "itinerary"
                    ? "border-[#6F1837] text-[#6F1837]"
                    : "border-transparent text-[#5D5460] hover:text-[#2D2430]"
                  }`}
              >
                <Clock className="w-4 h-4 text-[#C79A3B]" />
                <span>Timeline & Darshan Schedule</span>
              </button>

              <button
                onClick={() => setResultSubTab("checklist")}
                className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${resultSubTab === "checklist"
                    ? "border-[#6F1837] text-[#6F1837]"
                    : "border-transparent text-[#5D5460] hover:text-[#2D2430]"
                  }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#C79A3B]" />
                <span>Travel Checklist ({checkedCount}/{totalCount})</span>
              </button>

              <button
                onClick={() => setResultSubTab("discovery")}
                className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${resultSubTab === "discovery"
                    ? "border-[#6F1837] text-[#6F1837]"
                    : "border-transparent text-[#5D5460] hover:text-[#2D2430]"
                  }`}
              >
                <Compass className="w-4 h-4 text-[#C79A3B]" />
                <span>Discover Matabari & Reminders</span>
              </button>
            </div>

            {/* TAB 1: ITINERARY */}
            {resultSubTab === "itinerary" && (
              <div className="space-y-6">
                {itinerary.days.length > 1 && (
                  <div className="flex items-center gap-2">
                    {itinerary.days.map((day) => (
                      <button
                        key={day.dayNumber}
                        onClick={() => setSelectedDayTab(day.dayNumber)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${selectedDayTab === day.dayNumber
                            ? "bg-[#6F1837] text-[#FFF8ED] border-[#6F1837] shadow-xs"
                            : "bg-white text-[#2D2430] border-[#C79A3B]/30 hover:border-[#6F1837]"
                          }`}
                      >
                        Day {day.dayNumber}: {day.dateLabel}
                      </button>
                    ))}
                  </div>
                )}

                {itinerary.days
                  .filter((d) => (itinerary.days.length > 1 ? d.dayNumber === selectedDayTab : true))
                  .map((day) => (
                    <div key={day.dayNumber} className="space-y-4">
                      <div className="bg-[#FFF8ED] p-4 rounded-2xl border border-[#C79A3B]/30 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider">
                            Day {day.dayNumber} Focus
                          </span>
                          <h3 className="font-serif text-lg font-bold text-[#6F1837]">
                            {day.title}
                          </h3>
                        </div>
                        <span className="text-xs text-[#5D5460] font-medium">
                          Illustrative Planning Estimates
                        </span>
                      </div>

                      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C79A3B]/40 space-y-6 ml-3 sm:ml-4 py-2">
                        {day.items.map((item, idx) => (
                          <div key={idx} className="relative group">
                            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white border-2 border-[#6F1837] flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#C79A3B]" />
                            </div>

                            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/30 shadow-xs hover:border-[#6F1837]/60 transition-all space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-serif text-sm font-bold text-[#6F1837] px-2.5 py-0.5 rounded-md bg-[#FFF8ED] border border-[#C79A3B]/40">
                                    {item.time}
                                  </span>
                                  <span className="text-[11px] font-semibold text-[#8C827A] px-2 py-0.5 rounded-md bg-gray-100">
                                    {item.duration}
                                  </span>
                                  <span className="text-[11px] font-bold text-[#C79A3B] uppercase tracking-wider">
                                    {item.category}
                                  </span>
                                </div>
                              </div>

                              <h4 className="font-serif text-base font-bold text-[#2D2430]">
                                {item.activity}
                              </h4>

                              <p className="text-xs text-[#5D5460] leading-relaxed">
                                {item.description}
                              </p>

                              {item.tips && (
                                <div className="pt-2">
                                  <div className="text-[11px] bg-[#FFF8ED] text-[#4A1027] px-3 py-1.5 rounded-lg border border-[#C79A3B]/30 flex items-start gap-1.5">
                                    <Info className="w-3.5 h-3.5 text-[#C79A3B] shrink-0 mt-0.5" />
                                    <span><strong>Pilgrim Tip:</strong> {item.tips}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* TAB 2: CHECKLIST */}
            {resultSubTab === "checklist" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8ED] p-4 rounded-2xl border border-[#C79A3B]/35">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#6F1837]">
                      Travel Preparation Checklist
                    </h3>
                    <p className="text-xs text-[#5D5460]">
                      Tick completed preparations to automatically update your Yatra Readiness Score.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddChecklist(!showAddChecklist)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#C79A3B]/40 text-[#6F1837] text-xs font-bold hover:bg-[#6F1837] hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>

                    <button
                      onClick={() => {
                        setChecklist((prev) => prev.map((item) => ({ ...item, checked: true })));
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#C79A3B]/40 text-xs font-semibold text-[#2D2430] hover:border-[#6F1837] cursor-pointer"
                    >
                      Mark All
                    </button>
                  </div>
                </div>

                {showAddChecklist && (
                  <form
                    onSubmit={handleAddCustomChecklist}
                    className="bg-white p-3.5 rounded-xl border border-[#C79A3B]/50 flex items-center gap-2 animate-in fade-in"
                  >
                    <input
                      type="text"
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      placeholder="Enter custom packing or travel reminder..."
                      className="flex-1 text-xs text-[#2D2430] px-3 py-2 border border-[#C79A3B]/30 rounded-lg outline-hidden focus:border-[#6F1837]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#6F1837] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#4A1027]"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddChecklist(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-4.5 border border-[#C79A3B]/30 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#F0E3D0] pb-2">
                      <Car className="w-4 h-4 text-[#C79A3B]" />
                      <h4 className="font-serif text-sm font-bold text-[#2D2430]">
                        Before Departure
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {checklist
                        .filter((item) => item.category === "beforeDeparture")
                        .map((item) => (
                          <label
                            key={item.id}
                            className="flex items-start gap-2.5 cursor-pointer text-xs select-none group"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => handleToggleChecklist(item.id)}
                              className="w-4 h-4 mt-0.5 rounded text-[#6F1837] accent-[#6F1837]"
                            />
                            <span
                              className={
                                item.checked
                                  ? "text-gray-400 line-through"
                                  : "text-[#2D2430] group-hover:text-[#6F1837]"
                              }
                            >
                              {item.label}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4.5 border border-[#C79A3B]/30 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#F0E3D0] pb-2">
                      <Sparkles className="w-4 h-4 text-[#C79A3B]" />
                      <h4 className="font-serif text-sm font-bold text-[#2D2430]">
                        Temple Visit Preparation
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {checklist
                        .filter((item) => item.category === "templeVisit")
                        .map((item) => (
                          <label
                            key={item.id}
                            className="flex items-start gap-2.5 cursor-pointer text-xs select-none group"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => handleToggleChecklist(item.id)}
                              className="w-4 h-4 mt-0.5 rounded text-[#6F1837] accent-[#6F1837]"
                            />
                            <span
                              className={
                                item.checked
                                  ? "text-gray-400 line-through"
                                  : "text-[#2D2430] group-hover:text-[#6F1837]"
                              }
                            >
                              {item.label}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4.5 border border-[#C79A3B]/30 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#F0E3D0] pb-2">
                      <Users className="w-4 h-4 text-[#C79A3B]" />
                      <h4 className="font-serif text-sm font-bold text-[#2D2430]">
                        Family & Seniors
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {checklist
                        .filter((item) => item.category === "familyPrep")
                        .map((item) => (
                          <label
                            key={item.id}
                            className="flex items-start gap-2.5 cursor-pointer text-xs select-none group"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => handleToggleChecklist(item.id)}
                              className="w-4 h-4 mt-0.5 rounded text-[#6F1837] accent-[#6F1837]"
                            />
                            <span
                              className={
                                item.checked
                                  ? "text-gray-400 line-through"
                                  : "text-[#2D2430] group-hover:text-[#6F1837]"
                              }
                            >
                              {item.label}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DISCOVERY */}
            {resultSubTab === "discovery" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-bold text-[#2D2430]">
                    Official Travel Reminders
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {travelReminders.map((rem, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl p-4 border border-[#C79A3B]/30 shadow-xs space-y-1.5"
                      >
                        <div className="flex items-center gap-2 text-[#6F1837] font-bold text-xs">
                          <Info className="w-4 h-4 text-[#C79A3B]" />
                          <span>{rem.title}</span>
                        </div>
                        <p className="text-xs text-[#5D5460] leading-relaxed">
                          {rem.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-serif text-base font-bold text-[#2D2430]">
                    Pilgrimage Landmarks at Matabari
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {matabariHighlights.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl overflow-hidden border border-[#C79A3B]/30 shadow-xs flex flex-col justify-between"
                      >
                        <div className="h-36 overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute bottom-2 left-2 text-[11px] font-bold text-white font-serif">
                            {item.title}
                          </span>
                        </div>
                        <div className="p-3 text-xs space-y-2">
                          <p className="text-[#5D5460] text-[11px] line-clamp-2">
                            {item.description}
                          </p>
                          {item.navTarget && (
                            <button
                              onClick={() => onNavigate(item.navTarget)}
                              className="text-[#6F1837] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Section</span>
                              <ChevronRight className="w-3 h-3 text-[#C79A3B]" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* end of result block */}

        {/* Tab 3: Guidelines & Dress Code */}
        {activeTab === "guidelines" && <GuidelinesSection />}

        {/* Tab 4: Pilgrim Facility */}
        {activeTab === "facilities" && <FacilitiesSection />}

        {/* Tab 5: Heat Map */}
        {activeTab === "crowd" && <TempleCrowdMap />}

        {/* Tab 6: Campus Map */}
        {activeTab === "map" && <TempleMapSection />}
      </div>
    </div>
  );
}
