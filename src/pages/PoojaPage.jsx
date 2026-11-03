import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Ticket, Eye, ShieldCheck, Heart, Info, X } from "lucide-react";
import { poojaCategories, poojaList } from "../data/templePortalData";
import { useLanguage } from "../context/LanguageContext";

export default function PoojaPage({ onNavigate }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("catalogue"); // 'catalogue' | 'my-bookings'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [detailsModalPooja, setDetailsModalPooja] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Ritual & Date, 2: Devotee Info, 3: Review, 4: Confirmed

  // Form state
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [formData, setFormData] = useState({
    devoteeName: "",
    gotra: "",
    mobile: "",
    attendanceMode: "In-Person", // 'In-Person' | 'In-Absentia (Sankalp)'
    specialPrayer: "",
  });
  const [errors, setErrors] = useState({});

  // Bookings list in prototype state
  const [myBookings, setMyBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_pooja_bookings");
      return saved ? JSON.parse(saved) : [
        {
          id: "MTS-2026-SEVA-4819",
          poojaName: "Nitya Chandi Path & Archana",
          date: "15 Nov 2026",
          devoteeName: "Praneeth Ganithala",
          gotra: "Kashyapa",
          mobile: "+91 98765 43210",
          attendanceMode: "In-Person",
          price: 501,
          status: "Confirmed (Prototype)",
          timestamp: "30 Oct 2026, 10:15 AM"
        }
      ];
    } catch {
      return [];
    }
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("mts_pooja_bookings", JSON.stringify(myBookings));
    } catch {
      // ignore
    }
  }, [myBookings]);

  const filteredPoojas = selectedCategory === "All"
    ? poojaList
    : poojaList.filter(p => p.category === selectedCategory);

  const handleStartBooking = (pooja) => {
    setSelectedPooja(pooja);
    setBookingStep(1);
    setActiveTab("book");
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.devoteeName.trim()) errs.devoteeName = "Devotee name is required";
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length !== 10) {
      errs.mobile = "Valid 10-digit mobile number required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = () => {
    const refId = `MTS-2026-SEVA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: refId,
      poojaName: selectedPooja.name,
      date: new Date(bookingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      devoteeName: formData.fullName || formData.devoteeName,
      gotra: formData.gotra || "Kashyapa / Not Specified",
      mobile: `+91 ${formData.mobile}`,
      attendanceMode: formData.attendanceMode,
      price: selectedPooja.price,
      status: "Confirmed (Prototype)",
      timestamp: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    setMyBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setBookingStep(4);
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
      {/* Devotional Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#877E8A] px-1 select-none">
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
        >
          <span className="group-hover:underline">{t("nav.home", "Home")}</span>
        </button>
        <span className="text-[#C79A3B]">•</span>
        <span className="text-[#6F1837] font-semibold">{t("nav.pooja", "Pooja & Seva")}</span>
      </nav>

      {/* Header Banner */}
      <header className="bg-white rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-6 sm:py-5 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/30 text-[9.5px] font-bold uppercase tracking-wider text-[#C79A3B]">
              <Sparkles className="w-3 h-3 text-[#C79A3B]" />
              <span>SACRED TEMPLE RITUALS & ARCHANA</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6F1837] tracking-tight">
              {t("pooja.title", "Pooja & Seva Offerings")}
            </h1>
            <p className="text-xs sm:text-[13px] text-[#5D5460] leading-relaxed">
              {t("pooja.subtitle", "Offer your sincere prayers and participate in the sacred Vedic and Tantric rituals of Maa Tripura Sundari at Matabari.")}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <div className="inline-flex p-1 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 shadow-2xs">
              <button
                type="button"
                onClick={() => { setActiveTab("catalogue"); setBookingStep(1); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "catalogue" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>Available Rituals</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("my-bookings")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer relative ${
                  activeTab === "my-bookings" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <Ticket className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>My Seva Bookings ({myBookings.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notice Banner regarding Rates */}
      <div className="bg-[#FFF9EE] rounded-xl px-3.5 py-2.5 border border-[#C79A3B]/30 text-[11px] text-[#665D6A] flex items-center gap-2 select-none">
        <AlertCircle className="w-4 h-4 text-[#C79A3B] shrink-0" />
        <span>
          <strong>Notice on Seva Offerings:</strong> Ritual schedules and dakshina amounts shown on this portal prototype reflect configurable estimates subject to official confirmation by the Tripura Sundari Temple Trust.
        </span>
      </div>

      {/* TAB 1: CATALOGUE VIEW */}
      {activeTab === "catalogue" && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {poojaCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#6F1837] text-white shadow-xs"
                    : "bg-white text-[#665D6A] border border-[#C79A3B]/30 hover:border-[#6F1837] hover:text-[#6F1837]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pooja Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPoojas.map((pooja) => (
              <div
                key={pooja.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#C79A3B]/30 shadow-2xs hover:shadow-md hover:border-[#C79A3B]/70 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Image Banner */}
                <div className="relative h-40 overflow-hidden bg-[#F0E3D0]">
                  <img
                    src={pooja.image}
                    alt={pooja.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#6F1837]/90 text-white backdrop-blur-xs border border-[#C79A3B]/40">
                    {pooja.category}
                  </span>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="font-serif font-bold text-base text-white leading-snug drop-shadow-sm">
                      {pooja.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-[#5D5460] leading-relaxed line-clamp-2">
                    {pooja.shortDesc}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-[#665D6A] bg-[#FFF8ED]/70 p-2.5 rounded-xl border border-[#C79A3B]/20">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[#877E8A]">
                        <Clock className="w-3 h-3 text-[#C79A3B]" /> Timings:
                      </span>
                      <span className="font-semibold text-[#2D2430]">{pooja.timings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#877E8A]">{t("pooja.estimatedFee", "Estimated Seva Fee")}:</span>
                      <span className="font-sans font-bold tabular-nums text-sm text-[#6F1837]">
                        ₹{pooja.price} <span className="text-[10px] font-medium text-[#877E8A]">{t("common.approx", "(Approx)")}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setDetailsModalPooja(pooja)}
                      className="flex-1 py-2 px-3 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t("common.viewDetails", "Details")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartBooking(pooja)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all cursor-pointer"
                    >
                      <span>{t("pooja.bookSeva", "Book Seva")}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKING WORKFLOW */}
      {activeTab === "book" && selectedPooja && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-sm max-w-2xl mx-auto space-y-5">
          {/* Stepper Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E3D0]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B] block">
                STEP {bookingStep} OF 3
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#6F1837]">
                {bookingStep === 1 && `Select Date for ${selectedPooja.name}`}
                {bookingStep === 2 && "Devotee & Sankalpa Details"}
                {bookingStep === 3 && "Review Seva Booking"}
                {bookingStep === 4 && "Seva Booking Confirmed"}
              </h2>
            </div>
            {bookingStep < 4 && (
              <button
                type="button"
                onClick={() => setActiveTab("catalogue")}
                className="text-xs text-[#877E8A] hover:text-[#6F1837] cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          {/* STEP 1: Date & Time Selection */}
          {bookingStep === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                  <img src={selectedPooja.image} alt={selectedPooja.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#6F1837]">{selectedPooja.name}</h4>
                  <p className="text-xs text-[#5D5460]">{selectedPooja.timings} • Approx. ₹{selectedPooja.price}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1.5">
                  Select Seva Date <span className="text-[#C83B32]">*</span>
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/40 focus:border-[#6F1837] focus:outline-none"
                />
                <p className="text-[10.5px] text-[#877E8A] mt-1">
                  Sevas are conducted daily during morning and evening temple ritual hours.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1.5">
                  Attendance Mode <span className="text-[#C83B32]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["In-Person", "In-Absentia (Sankalp)"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendanceMode: mode })}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        formData.attendanceMode === mode
                          ? "bg-[#FFF8ED] border-[#6F1837] text-[#6F1837] ring-1 ring-[#6F1837]"
                          : "bg-white border-[#C79A3B]/30 text-[#665D6A] hover:bg-[#FAF4E9]"
                      }`}
                    >
                      {mode}
                      <span className="block text-[10px] font-normal text-[#877E8A] mt-0.5">
                        {mode === "In-Person" ? "Participate directly at Matabari" : "Priests chant your Gotra at Garbhagriha"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Continue to Devotee Info</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Devotee & Sankalpa Information */}
          {bookingStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1">
                  Primary Devotee Name (for Sankalp) <span className="text-[#C83B32]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Subhashish Debbarma"
                  value={formData.devoteeName}
                  onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/40 focus:border-[#6F1837] focus:outline-none"
                />
                {errors.devoteeName && <p className="text-[10px] text-[#C83B32] mt-1">{errors.devoteeName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D2430] mb-1">
                    Gotra (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kashyapa / Sandilya"
                    value={formData.gotra}
                    onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/40 focus:border-[#6F1837] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2430] mb-1">
                    Mobile Number <span className="text-[#C83B32]">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                    className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/40 focus:border-[#6F1837] focus:outline-none"
                  />
                  {errors.mobile && <p className="text-[10px] text-[#C83B32] mt-1">{errors.mobile}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1">
                  Specific Prayer / Occasion (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday, Anniversary, Health, New Enterprise"
                  value={formData.specialPrayer}
                  onChange={(e) => setFormData({ ...formData, specialPrayer: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/40 focus:border-[#6F1837] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setBookingStep(1)}
                  className="px-4 py-2 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => { if (validateForm()) setBookingStep(3); }}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review Seva Summary */}
          {bookingStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FFF9EE] border border-[#C79A3B]/30 space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Ritual:</span>
                  <span className="font-bold text-[#6F1837]">{selectedPooja.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Date of Seva:</span>
                  <span className="font-semibold text-[#2D2430]">{bookingDate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Devotee Name:</span>
                  <span className="font-semibold text-[#2D2430]">{formData.devoteeName} ({formData.gotra || "Gotra not specified"})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Attendance:</span>
                  <span className="font-semibold text-[#2D2430]">{formData.attendanceMode}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-[#2D2430]">Estimated Seva Fee:</span>
                  <span className="font-sans font-bold tabular-nums text-[#6F1837]">₹{selectedPooja.price} <span className="text-xs font-normal text-[#877E8A]">(Payable at Counter / Prototype)</span></span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[10.5px] text-amber-800">
                <strong>Demonstration Note:</strong> This is a prototype reservation. No actual transaction will occur. Your booking receipt will be generated instantly for demonstration.
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="px-4 py-2 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Confirm Seva Booking</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed Receipt */}
          {bookingStep === 4 && confirmedBooking && (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  SEVA BOOKING CONFIRMED (PROTOTYPE)
                </span>
                <h3 className="font-serif text-xl font-bold text-[#6F1837] mt-1.5">
                  Blessings of Maa Tripura Sundari
                </h3>
                <p className="text-xs text-[#5D5460]">
                  Your seva sankalpa has been registered under reference: <strong>{confirmedBooking.id}</strong>
                </p>
              </div>

              <div className="bg-[#FFF9EE] p-4 rounded-xl border border-[#C79A3B]/30 text-xs text-left space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Booking ID:</span>
                  <span className="font-mono font-bold text-[#6F1837]">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Ritual:</span>
                  <span className="font-semibold text-[#2D2430]">{confirmedBooking.poojaName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Scheduled Date:</span>
                  <span className="font-semibold text-[#2D2430]">{confirmedBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Devotee:</span>
                  <span className="font-semibold text-[#2D2430]">{confirmedBooking.devoteeName}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("my-bookings")}
                  className="px-5 py-2.5 rounded-xl bg-[#6F1837] text-white text-xs font-semibold shadow-2xs hover:bg-[#882245]"
                >
                  View in My Seva Bookings
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPooja(null); setBookingStep(1); setActiveTab("catalogue"); }}
                  className="px-5 py-2.5 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
                >
                  Book Another Seva
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY BOOKINGS VIEW */}
      {activeTab === "my-bookings" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C79A3B]/30 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E3D0]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#6F1837]">
                My Seva & Pooja Bookings ({myBookings.length})
              </h3>
              <p className="text-xs text-[#877E8A]">
                View active seva appointments and prototype confirmations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setActiveTab("catalogue"); setBookingStep(1); }}
              className="px-3.5 py-1.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-semibold"
            >
              + Book New Seva
            </button>
          </div>

          {myBookings.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#877E8A]">
              No pooja bookings found. Tap "+ Book New Seva" to schedule a ritual.
            </div>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#FFF9EE]/70 rounded-xl p-4 border border-[#C79A3B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#6F1837] bg-white px-2 py-0.5 rounded border border-[#C79A3B]/25">
                        {b.id}
                      </span>
                      <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {b.status}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#2D2430]">{b.poojaName}</h4>
                    <p className="text-xs text-[#5D5460]">
                      Date: <strong>{b.date}</strong> • Devotee: <strong>{b.devoteeName}</strong> ({b.gotra}) • {b.attendanceMode}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-sans font-bold tabular-nums text-sm text-[#6F1837] block">₹{b.price}</span>
                    <span className="text-[10px] text-[#877E8A]">Booked on: {b.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RITUAL DETAILS MODAL */}
      {detailsModalPooja && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 border border-[#C79A3B]/40 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-[#F0E3D0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B]">
                  {detailsModalPooja.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#6F1837] leading-snug">
                  {detailsModalPooja.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailsModalPooja(null)}
                className="p-1 rounded-lg text-[#877E8A] hover:text-[#2D2430] hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
              <img src={detailsModalPooja.image} alt={detailsModalPooja.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 text-xs text-[#5D5460]">
              <div>
                <h4 className="font-bold text-[#2D2430] mb-0.5">Spiritual Significance:</h4>
                <p className="leading-relaxed">{detailsModalPooja.significance}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#2D2430] mb-0.5">Ritual Procedure:</h4>
                <p className="leading-relaxed">{detailsModalPooja.procedure}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#2D2430] mb-0.5">Offerings & Prasad Included:</h4>
                <p className="leading-relaxed">{detailsModalPooja.itemsIncluded}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/25">
                <span className="font-sans font-bold tabular-nums text-[#6F1837] block">Estimated Seva Fee: ₹{detailsModalPooja.price}</span>
                <span className="text-[10px] text-[#877E8A]">{detailsModalPooja.rateNotice}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#F0E3D0]">
              <button
                type="button"
                onClick={() => setDetailsModalPooja(null)}
                className="px-4 py-2 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const pooja = detailsModalPooja;
                  setDetailsModalPooja(null);
                  handleStartBooking(pooja);
                }}
                className="px-5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold"
              >
                Book This Seva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

