import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  User,
  Phone,
  ArrowRight,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function AccommodationPage({ onNavigate }) {
  const { t } = useLanguage();
  // Navigation: 'facility' (main card) | 'requests' (my requests list)
  const [activeTab, setActiveTab] = useState("facility");

  // Enquiry modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);

  // Selected request details modal
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    devoteeName: "",
    mobileNumber: "",
    checkInDate: (() => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    })(),
    checkOutDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    })(),
    guestsCount: 2,
    additionalMessage: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // User's submitted requests stored in localStorage (no fabricated sample bookings)
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_accommodation_requests_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("mts_accommodation_requests_v3", JSON.stringify(requests));
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [requests]);

  const validateForm = () => {
    const errors = {};
    if (!formData.devoteeName.trim()) {
      errors.devoteeName = "Devotee name is required.";
    } else if (formData.devoteeName.trim().length < 3) {
      errors.devoteeName = "Name must be at least 3 characters.";
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, "");
    if (!cleanMobile) {
      errors.mobileNumber = "10-digit mobile number is required.";
    } else if (cleanMobile.length !== 10) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
    } else if (!/^[6-9]/.test(cleanMobile)) {
      errors.mobileNumber = "Mobile number must start with 6, 7, 8, or 9.";
    }

    if (!formData.checkInDate) {
      errors.checkInDate = "Check-in date is required.";
    }
    if (!formData.checkOutDate) {
      errors.checkOutDate = "Check-out date is required.";
    } else if (formData.checkOutDate < formData.checkInDate) {
      errors.checkOutDate = "Check-out date must be after check-in date.";
    }

    if (!formData.guestsCount || formData.guestsCount < 1) {
      errors.guestsCount = "Please specify number of guests.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newEnquiry = {
      id: `MTS-ACC-${randomNum}`,
      devoteeName: formData.devoteeName.trim(),
      mobile: `+91 ${formData.mobileNumber.replace(/\D/g, "")}`,
      checkIn: formData.checkInDate,
      checkOut: formData.checkOutDate,
      guestsCount: Number(formData.guestsCount),
      additionalMessage: formData.additionalMessage.trim(),
      status: "Pending",
      submittedAt: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setRequests((prev) => [newEnquiry, ...prev]);
    setSubmittedEnquiry(newEnquiry);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setSubmittedEnquiry(null);
    setFormData({
      devoteeName: "",
      mobileNumber: "",
      checkInDate: new Date().toISOString().split("T")[0],
      checkOutDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
      })(),
      guestsCount: 2,
      additionalMessage: "",
    });
    setFormErrors({});
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-emerald-50 text-emerald-900 border-emerald-300",
          icon: CheckCircle2,
          label: "Approved",
        };
      case "Rejected":
        return {
          bg: "bg-rose-50 text-rose-900 border-rose-300",
          icon: AlertCircle,
          label: "Regretted",
        };
      default:
        return {
          bg: "bg-amber-50 text-amber-900 border-amber-300",
          icon: Clock,
          label: "Pending",
        };
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
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
        <span className="text-[#6F1837] font-semibold">{t("nav.accommodation", "Temple Accommodation")}</span>
      </nav>

      {/* Compact Page Header with Tab Switcher */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837] tracking-tight">
              {t("accommodation.title", "Temple Accommodation")}
            </h1>
            <p className="text-xs sm:text-[13px] text-[#665D6A] mt-0.5">
              {t("accommodation.subtitle", "Find temple-managed accommodation facilities for your pilgrimage.")}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 shadow-2xs self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("facility")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "facility"
                  ? "bg-[#6F1837] text-white shadow-xs"
                  : "text-[#665D6A] hover:text-[#6F1837]"
              }`}
            >
              Accommodation Facility
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("requests")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "requests"
                  ? "bg-[#6F1837] text-white shadow-xs"
                  : "text-[#665D6A] hover:text-[#6F1837]"
              }`}
            >
              <span>My Requests</span>
              {requests.length > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                    activeTab === "requests"
                      ? "bg-white/20 text-white"
                      : "bg-[#6F1837] text-white"
                  }`}
                >
                  {requests.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: PRIMARY ACCOMMODATION FACILITY CARD
          ========================================================================= */}
      {activeTab === "facility" && (
        <div className="bg-white rounded-2xl border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] overflow-hidden select-none">
          <div className="flex flex-col md:flex-row">
            {/* Left Section: Accommodation Photograph (~40% desktop width) */}
            <div className="md:w-2/5 shrink-0 relative bg-[#F0E3D0] min-h-[220px] md:min-h-[280px]">
              <img
                src="/assets/accommodation.jpg"
                alt="Mata Tripura Sundari Temple Pilgrim Dormitory"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Section: Information Section (~60% desktop width) */}
            <div className="md:w-3/5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837] tracking-tight">
                  Temple Pilgrim Dormitory
                </h2>

                <p className="text-xs sm:text-[13px] text-[#443948] leading-relaxed mt-2.5">
                  Temple dormitory accommodation established as part of the September 2025 temple redevelopment, intended to serve visiting devotees.
                </p>

                {/* Compact Verified Information Points */}
                <ul className="mt-4 space-y-2 text-xs sm:text-[12.5px] text-[#554959]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C79A3B] shrink-0" />
                    <span>Temple-managed dormitory.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C79A3B] shrink-0" />
                    <span>Availability confirmed by temple administration.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C79A3B] shrink-0" />
                    <span>Allocation and applicable rates disclosed by temple office.</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA */}
              <div className="mt-6 pt-4 border-t border-[#F0E3D0]/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEnquiryOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs sm:text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-98"
                >
                  <span>Enquire About Accommodation</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: MY REQUESTS
          ========================================================================= */}
      {activeTab === "requests" && (
        <div className="space-y-3 select-none">
          {requests.length === 0 ? (
            /* Clean Empty State */
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] text-center space-y-3">
              <div className="w-11 h-11 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center justify-center text-[#C79A3B] mx-auto">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#6F1837]">
                  No Accommodation Requests
                </h3>
                <p className="text-xs text-[#665D6A] mt-1 max-w-sm mx-auto">
                  You have not submitted any accommodation enquiries yet. Click below to submit an enquiry.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="mt-1 px-5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                Enquire About Accommodation
              </button>
            </div>
          ) : (
            /* Request Cards List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {requests.map((req) => {
                const badge = getStatusBadge(req.status);
                const BadgeIcon = badge.icon;
                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl p-4 border border-[#C79A3B]/30 shadow-[0_2px_10px_rgba(74,16,39,0.04)] hover:shadow-[0_4px_16px_rgba(74,16,39,0.07)] transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {/* Top: Request ID & Status */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0E3D0]/80">
                        <span className="font-mono text-[13px] font-bold text-[#6F1837] tracking-wider">
                          {req.id}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold border ${badge.bg}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                      </div>

                      {/* Devotee Name */}
                      <div className="mt-2.5">
                        <h4 className="font-serif text-[15px] font-bold text-[#1A121E]">
                          {req.devoteeName}
                        </h4>
                        <p className="text-[11px] text-[#665D6A]">
                          Temple Pilgrim Dormitory
                        </p>
                      </div>

                      {/* Dates & Guests */}
                      <div className="mt-3 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#C79A3B]/20 text-[11px] grid grid-cols-2 gap-2 text-[#443948]">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Check-in</span>
                          <strong>{req.checkIn}</strong>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Check-out</span>
                          <strong>{req.checkOut}</strong>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-[#F0E3D0]/60 flex items-center justify-between text-[10.5px]">
                          <span>Guests: <strong>{req.guestsCount}</strong></span>
                          <span>Mobile: <strong>{req.mobile}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action: View Details */}
                    <div className="pt-2 border-t border-[#F0E3D0]/80 flex items-center justify-between text-[11px]">
                      <span className="text-[10px] text-[#877E8A]">
                        {req.submittedAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(req)}
                        className="font-bold text-[#6F1837] hover:text-[#A87920] flex items-center gap-0.5 transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          ACCOMMODATION ENQUIRY FORM MODAL
          ========================================================================= */}
      {isEnquiryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-[#C79A3B]/40 shadow-2xl space-y-4 select-none relative max-h-[92vh] overflow-y-auto custom-scrollbar">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={handleCloseEnquiry}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FFF8ED] hover:bg-[#FAF4E9] border border-[#C79A3B]/35 flex items-center justify-center text-[#6F1837] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submittedEnquiry ? (
              /* Success Confirmation View */
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 pb-3 border-b border-[#F0E3D0]/80">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#6F1837]">
                      Enquiry Submitted Successfully
                    </h3>
                    <p className="text-[11px] text-[#665D6A]">
                      Reference ID: <strong className="text-[#6F1837]">{submittedEnquiry.id}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#C79A3B]/25 text-xs space-y-2 text-[#443948]">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Devotee Name</span>
                      <strong>{submittedEnquiry.devoteeName}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Mobile Number</span>
                      <strong>{submittedEnquiry.mobile}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Check-in</span>
                      <strong>{submittedEnquiry.checkIn}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Check-out</span>
                      <strong>{submittedEnquiry.checkOut}</strong>
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-[#F0E3D0]/70 text-[10.5px] text-[#665D6A]">
                    Guests: <strong>{submittedEnquiry.guestsCount}</strong> • Status: <strong className="text-amber-800">Pending Review</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFF9EE] border border-[#C79A3B]/25 text-[11px] text-[#665D6A] leading-relaxed">
                  <strong>Notice:</strong> This enquiry has been logged with the Temple Administration Office. Submitting an enquiry does not constitute a confirmed reservation. Official allocation and rates are confirmed by the temple office upon arrival.
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseEnquiry}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF8ED] border border-[#C79A3B]/35 text-xs font-semibold text-[#665D6A] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseEnquiry();
                      setActiveTab("requests");
                    }}
                    className="px-5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    View in My Requests
                  </button>
                </div>
              </div>
            ) : (
              /* Enquiry Form */
              <form onSubmit={handleSubmitEnquiry} className="space-y-3.5">
                <div className="pr-6">
                  <h3 className="font-serif text-lg font-bold text-[#6F1837]">
                    Accommodation Enquiry
                  </h3>
                  <p className="text-[11.5px] text-[#665D6A] mt-0.5">
                    Temple Pilgrim Dormitory stay request
                  </p>
                </div>

                {/* Devotee Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D2430] uppercase tracking-wide mb-1">
                      Devotee Name <span className="text-[#C83B32]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-[#877E8A] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Full name"
                        value={formData.devoteeName}
                        onChange={(e) => {
                          setFormData({ ...formData, devoteeName: e.target.value });
                          if (formErrors.devoteeName) setFormErrors({ ...formErrors, devoteeName: null });
                        }}
                        className={`w-full pl-8 pr-3 py-2 rounded-xl bg-[#FFFDF9] border text-xs text-[#2D2430] focus:outline-none focus:ring-1 focus:ring-[#6F1837] ${
                          formErrors.devoteeName ? "border-rose-400 bg-rose-50/20" : "border-[#C79A3B]/35"
                        }`}
                      />
                    </div>
                    {formErrors.devoteeName && (
                      <span className="text-[10px] text-rose-600 font-medium mt-0.5 block">
                        {formErrors.devoteeName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2D2430] uppercase tracking-wide mb-1">
                      Mobile Number <span className="text-[#C83B32]">*</span>
                    </label>
                    <div className="relative">
                      <span className="text-xs font-bold text-[#6F1837] absolute left-3 top-2">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.mobileNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, "") });
                          if (formErrors.mobileNumber) setFormErrors({ ...formErrors, mobileNumber: null });
                        }}
                        className={`w-full pl-10 pr-3 py-2 rounded-xl bg-[#FFFDF9] border text-xs text-[#2D2430] focus:outline-none focus:ring-1 focus:ring-[#6F1837] ${
                          formErrors.mobileNumber ? "border-rose-400 bg-rose-50/20" : "border-[#C79A3B]/35"
                        }`}
                      />
                    </div>
                    {formErrors.mobileNumber && (
                      <span className="text-[10px] text-rose-600 font-medium mt-0.5 block">
                        {formErrors.mobileNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Check-in & Check-out Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D2430] uppercase tracking-wide mb-1">
                      Check-in Date <span className="text-[#C83B32]">*</span>
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.checkInDate}
                      onChange={(e) => {
                        setFormData({ ...formData, checkInDate: e.target.value });
                        if (formErrors.checkInDate) setFormErrors({ ...formErrors, checkInDate: null });
                      }}
                      className={`w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border text-xs text-[#2D2430] focus:outline-none focus:ring-1 focus:ring-[#6F1837] ${
                        formErrors.checkInDate ? "border-rose-400 bg-rose-50/20" : "border-[#C79A3B]/35"
                      }`}
                    />
                    {formErrors.checkInDate && (
                      <span className="text-[10px] text-rose-600 font-medium mt-0.5 block">
                        {formErrors.checkInDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2D2430] uppercase tracking-wide mb-1">
                      Check-out Date <span className="text-[#C83B32]">*</span>
                    </label>
                    <input
                      type="date"
                      min={formData.checkInDate || new Date().toISOString().split("T")[0]}
                      value={formData.checkOutDate}
                      onChange={(e) => {
                        setFormData({ ...formData, checkOutDate: e.target.value });
                        if (formErrors.checkOutDate) setFormErrors({ ...formErrors, checkOutDate: null });
                      }}
                      className={`w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border text-xs text-[#2D2430] focus:outline-none focus:ring-1 focus:ring-[#6F1837] ${
                        formErrors.checkOutDate ? "border-rose-400 bg-rose-50/20" : "border-[#C79A3B]/35"
                      }`}
                    />
                    {formErrors.checkOutDate && (
                      <span className="text-[10px] text-rose-600 font-medium mt-0.5 block">
                        {formErrors.checkOutDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-[11px] font-bold text-[#2D2430] uppercase tracking-wide mb-1">
                    Number of Guests <span className="text-[#C83B32]">*</span>
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#C79A3B]/35 text-xs text-[#2D2430] focus:outline-none focus:ring-1 focus:ring-[#6F1837]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest / Devotee" : "Guests / Devotees"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-[11px] font-bold text-[#2D2430] uppercase tracking-wide mb-1">
                    Additional Message <span className="text-[#877E8A] font-normal normal-case">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Expected arrival time or special assistance requirement"
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FFFDF9] border border-[#C79A3B]/35 text-xs text-[#2D2430] placeholder:text-[#A096A4] focus:outline-none focus:ring-1 focus:ring-[#6F1837]"
                  />
                </div>

                {/* Clear Disclaimer */}
                <p className="text-[10.5px] text-[#665D6A] leading-relaxed bg-[#FFF9EE] p-2.5 rounded-xl border border-[#C79A3B]/25">
                  This enquiry allows the temple administration to plan allocations. Submitting this form does not guarantee a confirmed reservation.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseEnquiry}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF8ED] border border-[#C79A3B]/35 text-xs font-semibold text-[#665D6A] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW DETAILS MODAL (FOR MY REQUESTS)
          ========================================================================= */}
      {selectedRequest && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 border border-[#C79A3B]/40 shadow-2xl space-y-4 select-none relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FFF8ED] hover:bg-[#FAF4E9] border border-[#C79A3B]/35 flex items-center justify-center text-[#6F1837] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B] bg-[#FFF8ED] px-2 py-0.5 rounded-full border border-[#C79A3B]/30">
                Accommodation Enquiry Details
              </span>
              <h3 className="font-serif text-lg font-bold text-[#6F1837] mt-1">
                {selectedRequest.id}
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#C79A3B]/25 text-xs space-y-2 text-[#443948]">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Devotee Name</span>
                  <strong>{selectedRequest.devoteeName}</strong>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Mobile</span>
                  <strong>{selectedRequest.mobile}</strong>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Check-in</span>
                  <strong>{selectedRequest.checkIn}</strong>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#877E8A] block">Check-out</span>
                  <strong>{selectedRequest.checkOut}</strong>
                </div>
              </div>
              <div className="pt-2 border-t border-[#F0E3D0]/70 flex items-center justify-between text-[11px]">
                <span>Number of Guests: <strong>{selectedRequest.guestsCount}</strong></span>
                <span className="text-amber-800 font-bold">Status: {selectedRequest.status}</span>
              </div>
              {selectedRequest.additionalMessage && (
                <div className="pt-1.5 border-t border-[#F0E3D0]/70 text-[10.5px]">
                  <span className="text-[#877E8A] block">Message:</span>
                  <p className="italic text-[#554959]">{selectedRequest.additionalMessage}</p>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#FFF9EE] border border-[#C79A3B]/25 text-[10.5px] text-[#665D6A] leading-relaxed">
              <strong>Temple Office Notice:</strong> Enquiries are reviewed by the temple administration. Please present your reference ID and original photo ID at the temple office upon arrival.
            </div>

            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-1.5 rounded-xl bg-[#6F1837] text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}