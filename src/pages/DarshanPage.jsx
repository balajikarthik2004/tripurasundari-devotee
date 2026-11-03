import React, { useState, useEffect } from "react";
import DarshanHeader from "../components/darshan/DarshanHeader";
import DarshanCalendar from "../components/darshan/DarshanCalendar";
import DarshanSlotSelector from "../components/darshan/DarshanSlotSelector";
import DevoteeDetailsForm from "../components/darshan/DevoteeDetailsForm";
import BookingSummary from "../components/darshan/BookingSummary";
import DarshanTicket from "../components/darshan/DarshanTicket";
import MyBookings from "../components/darshan/MyBookings";
import { getSlotsForDate, initialSampleBookings } from "../data/darshanSlots";
import { ArrowRight, ArrowLeft, Check, Sparkles, Calendar, Clock, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function DarshanPage({ onNavigate }) {
  const { t } = useLanguage();

  // Tab state: 'book' | 'my-bookings'
  const [activeTab, setActiveTab] = useState("book");

  // Booking Flow Steps: 1 (Date & Slot) -> 2 (Devotee Details) -> 3 (Confirmation) -> 4 (Ticket Confirmed)
  const [bookingStep, setBookingStep] = useState(1);

  // Selected Date & Slots
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [slots, setSlots] = useState(() => getSlotsForDate(new Date()));
  const [selectedSlot, setSelectedSlot] = useState(() => {
    const initialSlots = getSlotsForDate(new Date());
    return initialSlots.find((s) => s.status === "available" || s.status === "filling_fast") || null;
  });

  // Devotee Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    devoteesCount: 1,
  });
  const [formErrors, setFormErrors] = useState({});

  // Bookings state (stored in client-side state for prototype)
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_darshan_bookings");
      return saved ? JSON.parse(saved) : initialSampleBookings;
    } catch {
      return initialSampleBookings;
    }
  });

  // Active Confirmed Ticket to display
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  // Persist bookings to localStorage for seamless refreshing during testing
  useEffect(() => {
    try {
      localStorage.setItem("mts_darshan_bookings", JSON.stringify(bookings));
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [bookings]);

  // When selected date changes, load corresponding slots
  useEffect(() => {
    const dateSlots = getSlotsForDate(selectedDate);
    setSlots(dateSlots);

    // Auto-select first available slot if currently selected slot isn't in new date
    const firstAvailable = dateSlots.find(
      (s) => s.status === "available" || s.status === "filling_fast"
    );
    setSelectedSlot(firstAvailable || null);
  }, [selectedDate]);

  // Handle Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter devotee's full name.";
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = "Name must be at least 3 characters.";
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, "");
    if (!cleanMobile) {
      errors.mobileNumber = "Please enter 10-digit mobile number.";
    } else if (cleanMobile.length !== 10) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
    } else if (!/^[6-9]/.test(cleanMobile)) {
      errors.mobileNumber = "Mobile number must start with 6, 7, 8, or 9.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToDetails = () => {
    if (!selectedSlot) return;
    setBookingStep(2);
  };

  const handleProceedToSummary = () => {
    if (validateForm()) {
      setBookingStep(3);
    }
  };

  // Generate Unique Booking Reference
  const generateBookingReference = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `MTS-2026-DAR-${randomNum}`;
  };

  // Final Confirmation
  const handleConfirmBooking = () => {
    const newBooking = {
      id: generateBookingReference(),
      bookingReference: generateBookingReference(),
      devoteeName: formData.fullName,
      mobileNumber: `+91 ${formData.mobileNumber}`,
      devoteesCount: formData.devoteesCount,
      darshanDate: selectedDate.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      rawDate: selectedDate.toISOString().split("T")[0],
      timeSlot: selectedSlot.time,
      slotLabel: selectedSlot.label,
      bookingTimestamp: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Confirmed",
      fee: "₹0 (Free Darshan)",
      isPrototype: true,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedTicket(newBooking);
    setBookingStep(4);
  };

  const handleBookAnother = () => {
    setConfirmedTicket(null);
    setBookingStep(1);
    setFormData({
      fullName: "",
      mobileNumber: "",
      devoteesCount: 1,
    });
    setFormErrors({});
  };

  const handleViewTicketFromBookings = (bookingItem) => {
    setConfirmedTicket(bookingItem);
    setActiveTab("book");
    setBookingStep(4);
  };

  return (
    <div className="space-y-4 sm:space-y-4.5 animate-in fade-in duration-300">
      {/* Devotional Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#877E8A] px-1 select-none">
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
        >
          <span className="group-hover:underline">Home</span>
        </button>
        <span className="text-[#C79A3B]">•</span>
        <span className="text-[#6F1837] font-semibold">Darshan Booking</span>
      </nav>

      {/* 1. Darshan Header (Compact 150-175px viewport height) */}
      <DarshanHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "book" && bookingStep === 4 && !confirmedTicket) {
            setBookingStep(1);
          }
        }}
        bookingsCount={bookings.length}
      />

      {/* 2. Main Body: Either "Book Darshan" Flow or "My Bookings" List */}
      {activeTab === "my-bookings" ? (
        <div className="space-y-4">
          <MyBookings
            bookings={bookings}
            onViewTicket={handleViewTicketFromBookings}
            onNewBooking={handleBookAnother}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* 3. Booking Stepper Progress Indicator (Height 64-72px, centered) */}
          {bookingStep < 4 && (
            <div className="bg-white rounded-xl sm:rounded-2xl h-16 sm:h-[68px] px-2.5 sm:px-8 border border-[#C79A3B]/30 shadow-2xs select-none flex items-center justify-center">
              <div className="flex items-center justify-between w-full max-w-xl mx-auto">
                {/* Step 1: Date & Slot */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setBookingStep(1)}
                  className={`flex items-center gap-1 sm:gap-2 transition-colors cursor-pointer shrink-0 ${
                    bookingStep === 1
                      ? "text-[#6F1837]"
                      : bookingStep > 1
                      ? "text-emerald-700"
                      : "text-[#877E8A]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                      bookingStep === 1
                        ? "bg-[#6F1837] text-white ring-2 ring-[#C79A3B] shadow-2xs"
                        : bookingStep > 1
                        ? "bg-emerald-600 text-white"
                        : "border border-gray-300 text-gray-500 bg-gray-50"
                    }`}
                  >
                    {bookingStep > 1 ? <Check className="w-3 h-3 stroke-[2.5]" /> : "1"}
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-bold">
                    <span>{t("darshan.step1", "Date & Slot")}</span>
                  </span>
                </div>

                {/* Connecting Line 1 -> 2 */}
                <div
                  className={`h-0.5 flex-1 min-w-[10px] mx-1 sm:mx-6 transition-colors ${
                    bookingStep > 1 ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />

                {/* Step 2: Devotee Details */}
                <div
                  role="button"
                  tabIndex={selectedSlot ? 0 : -1}
                  onClick={() => selectedSlot && setBookingStep(2)}
                  className={`flex items-center gap-1 sm:gap-2 transition-colors shrink-0 ${
                    bookingStep === 2
                      ? "text-[#6F1837] cursor-pointer"
                      : bookingStep > 2
                      ? "text-emerald-700 cursor-pointer"
                      : "text-[#877E8A] opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                      bookingStep === 2
                        ? "bg-[#6F1837] text-white ring-2 ring-[#C79A3B] shadow-2xs"
                        : bookingStep > 2
                        ? "bg-emerald-600 text-white"
                        : "border border-gray-300 text-gray-500 bg-gray-50"
                    }`}
                  >
                    {bookingStep > 2 ? <Check className="w-3 h-3 stroke-[2.5]" /> : "2"}
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-bold">
                    <span>{t("darshan.step2", "Devotee Details")}</span>
                  </span>
                </div>

                {/* Connecting Line 2 -> 3 */}
                <div
                  className={`h-0.5 flex-1 min-w-[10px] mx-1 sm:mx-6 transition-colors ${
                    bookingStep > 2 ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />

                {/* Step 3: Confirmation */}
                <div
                  className={`flex items-center gap-1 sm:gap-2 transition-colors shrink-0 ${
                    bookingStep === 3
                      ? "text-[#6F1837]"
                      : "text-[#877E8A] opacity-60"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                      bookingStep === 3
                        ? "bg-[#6F1837] text-white ring-2 ring-[#C79A3B] shadow-2xs"
                        : "border border-gray-300 text-gray-500 bg-gray-50"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-bold">
                    <span>{t("darshan.step3", "Confirm Pass")}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Calendar & Slot Selector (Balanced 47% : 53% Two-Column Desktop Grid) */}
          {bookingStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-[47%_53%] gap-3.5 lg:gap-4 items-stretch">
                {/* Left: Interactive Monthly Calendar */}
                <div className="h-full">
                  <DarshanCalendar
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                  />
                </div>

                {/* Right: Available Slots for Selected Date */}
                <div className="h-full">
                  <DarshanSlotSelector
                    selectedDate={selectedDate}
                    slots={slots}
                    selectedSlot={selectedSlot}
                    onSelectSlot={setSelectedSlot}
                  />
                </div>
              </div>

              {/* 5. Selected Slot Summary (Full-width horizontal card immediately below grid) */}
              <div className="bg-white rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3 border border-[#C79A3B]/30 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 min-h-[56px] select-none">
                <div className="flex items-center gap-2.5 text-xs text-[#2D2430] w-full sm:w-auto">
                  {selectedSlot ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="font-sans font-bold tabular-nums text-[#6F1837] text-[13px] sm:text-[13.5px]">
                        {selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="text-[#C79A3B]">•</span>
                      <span className="font-semibold text-[#2D2430]">{selectedSlot.label}</span>
                      <span className="text-[#665D6A]">({selectedSlot.time})</span>
                      <span className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300 ml-1">
                        ₹0 Fee (Free)
                      </span>
                    </div>
                  ) : (
                    <span className="text-[#877E8A] italic">Please select an open time slot from the schedule above to proceed</span>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={handleProceedToDetails}
                  className={`w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                    selectedSlot
                      ? "bg-[#6F1837] hover:bg-[#882245] text-white shadow-2xs cursor-pointer active:scale-98"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  }`}
                >
                  <span>{t("darshan.continueBtn", "Continue to Devotee Details")}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Devotee Details Form */}
          {bookingStep === 2 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <DevoteeDetailsForm
                formData={formData}
                onChange={setFormData}
                errors={formErrors}
              />

              {/* Navigation Actions for Step 2 */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setBookingStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t("darshan.backBtn", "Back to Slot Selection")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToSummary}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-xs font-bold text-white shadow-2xs flex items-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <span>{t("darshan.continueBtn", "Review Booking Summary")}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirmation Summary */}
          {bookingStep === 3 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <BookingSummary
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                formData={formData}
                onBack={() => setBookingStep(2)}
                onConfirm={handleConfirmBooking}
              />
            </div>
          )}

          {/* Step 4: Digital QR Ticket Confirmed */}
          {bookingStep === 4 && confirmedTicket && (
            <div className="space-y-4">
              <DarshanTicket
                booking={confirmedTicket}
                onViewMyBookings={() => setActiveTab("my-bookings")}
                onBookAnother={handleBookAnother}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
