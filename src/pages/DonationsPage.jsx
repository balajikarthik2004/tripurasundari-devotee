import React, { useState, useEffect } from "react";
import {
  Heart,
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  QrCode,
  CreditCard,
  Building2,
  Sparkles,
  Utensils,
  Shield,
  Fish,
  CalendarDays,
  CalendarClock,
  RefreshCw,
  Check,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { donationPurposes } from "../data/templePortalData";
import { useLanguage } from "../context/LanguageContext";

const iconMap = {
  Utensils,
  Shield,
  Sparkles,
  Fish,
  Heart,
};

export default function DonationsPage({ onNavigate }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("donate"); // 'donate' | 'history'
  const [selectedPurpose, setSelectedPurpose] = useState(donationPurposes[0]);
  const [amount, setAmount] = useState(1100);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI"); // 'UPI' | 'Card' | 'NetBanking'
  const [step, setStep] = useState(1); // 1: Amount & Purpose, 2: Donor Info, 3: Payment Mode, 4: Receipt

  // Donation frequency: 'one_time' | 'recurring' | 'pledge'
  const [frequency, setFrequency] = useState("one_time");
  // If recurring: 'monthly' | 'quarterly' | 'annually'
  const [recurringCycle, setRecurringCycle] = useState("monthly");
  // If pledge:
  const [pledgeDate, setPledgeDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [pledgeOccasion, setPledgeOccasion] = useState("Birthday / Special Occasion");

  // Donor Details
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    panNumber: "",
    is80GRequested: false,
  });
  const [errors, setErrors] = useState({});

  // Donation history in prototype storage
  const [donationHistory, setDonationHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_donations_history");
      return saved ? JSON.parse(saved) : [
        {
          id: "MTS-2026-DON-7812",
          donorName: "Praneeth Ganithala",
          purpose: "Annabhog / Nitya Annadanam",
          amount: 2100,
          frequency: "one_time",
          frequencyLabel: "One-time Offering",
          date: "28 Oct 2026",
          paymentMode: "UPI (Simulated)",
          status: "Completed (Prototype)",
          taxExemption: "80G Applicable (Pending Trust Verification)"
        }
      ];
    } catch {
      return [];
    }
  });

  const [confirmedDonation, setConfirmedDonation] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("mts_donations_history", JSON.stringify(donationHistory));
    } catch {
      // ignore
    }
  }, [donationHistory]);

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    if (val) setAmount(Number(val));
  };

  const validateDonorInfo = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required for receipt generation";
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length !== 10) {
      errs.mobile = "Valid 10-digit mobile number required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCompleteDonation = () => {
    const refId = `MTS-2026-DON-${Math.floor(1000 + Math.random() * 9000)}`;
    const frequencyLabel =
      frequency === "one_time"
        ? "One-time Offering"
        : frequency === "recurring"
        ? `Recurring (${recurringCycle.toUpperCase()} Auto-debit)`
        : `Sacred Pledge (Due: ${new Date(pledgeDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })})`;

    const newDonation = {
      id: refId,
      donorName: formData.fullName,
      purpose: selectedPurpose.title,
      amount: amount,
      frequency: frequency,
      frequencyLabel: frequencyLabel,
      recurringCycle: frequency === "recurring" ? recurringCycle : null,
      pledgeDate: frequency === "pledge" ? pledgeDate : null,
      pledgeOccasion: frequency === "pledge" ? pledgeOccasion : null,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      paymentMode:
        frequency === "pledge"
          ? "Pledge Sankalp (Pay on Due Date)"
          : `${paymentMode} (${frequency === "recurring" ? "Autopay Mandate" : "Simulated"})`,
      status: frequency === "pledge" ? "Pledged (Active Sankalp)" : "Completed (Prototype)",
      taxExemption: formData.is80GRequested ? "80G Provisional Claim" : "General Devotional Offering",
      timestamp: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    setDonationHistory((prev) => [newDonation, ...prev]);
    setConfirmedDonation(newDonation);
    setStep(4);
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
        <span className="text-[#6F1837] font-semibold">{t("nav.donations", "Donations")}</span>
      </nav>

      {/* Header Banner */}
      <header className="bg-white rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-6 sm:py-5 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/30 text-[9.5px] font-bold uppercase tracking-wider text-[#C79A3B]">
              <Heart className="w-3 h-3 text-[#C83B32]" />
              <span>VOLUNTARY TEMPLE SEVA & DANA</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6F1837] tracking-tight">
              {t("donations.title", "Offer Your Contribution")}
            </h1>
            <p className="text-xs sm:text-[13px] text-[#5D5460] leading-relaxed">
              {t("donations.subtitle", "Your devout contribution helps sustain daily Annabhog, sacred rituals, terracotta temple preservation, and holy lake ecology at Matabari.")}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <div className="inline-flex p-1 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 shadow-2xs">
              <button
                type="button"
                onClick={() => { setActiveTab("donate"); setStep(1); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "donate" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>{t("donations.donateOnline", "Make a Donation")}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "history" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>Donation Receipts ({donationHistory.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Notice */}
      <div className="bg-[#FFF9EE] rounded-xl px-3.5 py-2.5 border border-[#C79A3B]/30 text-[11px] text-[#665D6A] flex items-center gap-2 select-none">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          <strong>Devotional Trust:</strong> Contributions are 100% voluntary. All digital payments and receipts shown in this phase are prototype demonstrations prior to live gateway activation.
        </span>
      </div>

      {activeTab === "donate" && (
        <div className="space-y-4 max-w-5xl mx-auto">
          {/* STEP 1: Frequency, Purpose & Amount (Ultra-Low Scroll 2-Column Layout) */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Column (7 cols): Donation Frequency + Purpose Selection */}
              <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#C79A3B]/30 shadow-xs space-y-4">
                {/* 1. Donation Frequency (Matches Reference Design) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2430]">
                    <CalendarDays className="w-4 h-4 text-[#D92D20]" />
                    <span className="text-sm font-heading text-[#681B37]">
                      Donation Frequency
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* One-time Option */}
                    <button
                      type="button"
                      onClick={() => setFrequency("one_time")}
                      className={`h-14 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        frequency === "one_time"
                          ? "bg-[#D92D20] text-white border-[#D92D20] shadow-xs ring-2 ring-[#D92D20]/30"
                          : "bg-white text-[#2D2430] border-[#E8DCC8] hover:border-[#D92D20]/60 hover:bg-[#FFFDF9]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          frequency === "one_time"
                            ? "bg-white/20 text-white"
                            : "bg-rose-50 text-[#D92D20]"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-xs sm:text-[13px] block leading-tight">
                          One-time
                        </span>
                        <span
                          className={`text-[10px] block truncate ${
                            frequency === "one_time" ? "text-rose-100" : "text-[#7A6448]"
                          }`}
                        >
                          Single offering
                        </span>
                      </div>
                    </button>

                    {/* Recurring Option */}
                    <button
                      type="button"
                      onClick={() => setFrequency("recurring")}
                      className={`h-14 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        frequency === "recurring"
                          ? "bg-[#D92D20] text-white border-[#D92D20] shadow-xs ring-2 ring-[#D92D20]/30"
                          : "bg-white text-[#2D2430] border-[#E8DCC8] hover:border-[#D92D20]/60 hover:bg-[#FFFDF9]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          frequency === "recurring"
                            ? "bg-white/20 text-white"
                            : "bg-rose-50 text-[#D92D20]"
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-xs sm:text-[13px] block leading-tight">
                          Recurring
                        </span>
                        <span
                          className={`text-[10px] block truncate ${
                            frequency === "recurring" ? "text-rose-100" : "text-[#7A6448]"
                          }`}
                        >
                          Automatic auto-debit
                        </span>
                      </div>
                    </button>

                    {/* Pledge Option */}
                    <button
                      type="button"
                      onClick={() => setFrequency("pledge")}
                      className={`h-14 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        frequency === "pledge"
                          ? "bg-[#D92D20] text-white border-[#D92D20] shadow-xs ring-2 ring-[#D92D20]/30"
                          : "bg-white text-[#2D2430] border-[#E8DCC8] hover:border-[#D92D20]/60 hover:bg-[#FFFDF9]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          frequency === "pledge"
                            ? "bg-white/20 text-white"
                            : "bg-rose-50 text-[#D92D20]"
                        }`}
                      >
                        <CalendarClock className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-xs sm:text-[13px] block leading-tight">
                          Pledge
                        </span>
                        <span
                          className={`text-[10px] block truncate ${
                            frequency === "pledge" ? "text-rose-100" : "text-[#7A6448]"
                          }`}
                        >
                          Choose amount & date
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Sub-options for Recurring */}
                  {frequency === "recurring" && (
                    <div className="p-2.5 rounded-xl bg-[#FFF9EE] border border-[#E2BC6B]/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-[#8C5D17]">
                          Cycle:
                        </span>
                        {[
                          { id: "monthly", label: "Monthly" },
                          { id: "quarterly", label: "Quarterly (3 Mo)" },
                          { id: "annually", label: "Annual" },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setRecurringCycle(c.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              recurringCycle === c.id
                                ? "bg-[#681B37] text-white shadow-2xs"
                                : "bg-white text-[#5D5460] border border-[#E8DCC8] hover:bg-[#FFFDF9]"
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                      <span className="text-[10.5px] text-[#7A6448] italic">
                        Debited on 5th of every cycle • Cancel anytime
                      </span>
                    </div>
                  )}

                  {/* Sub-options for Pledge */}
                  {frequency === "pledge" && (
                    <div className="p-2.5 rounded-xl bg-[#FFF9EE] border border-[#E2BC6B]/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-[#8C5D17] block mb-1">
                          Pledge Target Date
                        </label>
                        <input
                          type="date"
                          value={pledgeDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setPledgeDate(e.target.value)}
                          className="w-full h-8 px-2.5 rounded-lg border border-[#DEC077] text-xs font-semibold text-[#2D2430] bg-white focus:outline-none focus:ring-1 focus:ring-[#681B37]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-[#8C5D17] block mb-1">
                          Occasion (Sankalp)
                        </label>
                        <select
                          value={pledgeOccasion}
                          onChange={(e) => setPledgeOccasion(e.target.value)}
                          className="w-full h-8 px-2 rounded-lg border border-[#DEC077] text-xs font-semibold text-[#2D2430] bg-white focus:outline-none focus:ring-1 focus:ring-[#681B37]"
                        >
                          <option>Birthday / Special Occasion</option>
                          <option>Marriage Anniversary</option>
                          <option>Diwali Mela Festival</option>
                          <option>Chaitra / Sharad Navratri</option>
                          <option>Pitri Shradh / Remembrance</option>
                          <option>New Year Devotional Sankalp</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Select Devotional Seva Purpose (Compact Low-Scroll Grid) */}
                <div className="pt-2 border-t border-[#F0E3D0] space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-xs sm:text-[13px] text-[#681B37]">
                      Select Devotional Seva Purpose
                    </h3>
                    <span className="text-[10.5px] text-[#7A6448]">
                      5 sacred initiatives
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {donationPurposes.map((p) => {
                      const Icon = iconMap[p.icon] || Heart;
                      const isSelected = selectedPurpose.id === p.id;
                      return (
                        <div
                          key={p.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setSelectedPurpose(p);
                            setAmount(p.recommendedAmounts[1]);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                            isSelected
                              ? "bg-[#FFF8ED] border-[#681B37] ring-1.5 ring-[#681B37] shadow-xs"
                              : "bg-white border-[#E8DCC8] hover:border-[#DEC077] hover:bg-[#FFFDF9]"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? "bg-[#681B37] text-[#DFC17B] border-[#681B37]"
                                : "bg-[#FFF8ED] text-[#681B37] border-[#C79A3B]/30"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-heading font-bold text-xs text-[#2D2430] leading-tight truncate">
                              {p.title}
                            </h4>
                            <p className="text-[10px] text-[#5D5460] mt-0.5 truncate">
                              {p.subtitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Offering Amount & Summary Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#C79A3B]/30 shadow-xs space-y-3.5">
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#2D2430] mb-0.5">
                    Select Offering Amount (INR)
                  </h4>
                  <p className="text-[10.5px] text-[#877E8A]">
                    Every rupee directly supports temple sevas.
                  </p>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedPurpose.recommendedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        amount === amt && !customAmount
                          ? "bg-[#681B37] text-white shadow-xs"
                          : "bg-[#FFF8ED] text-[#6F1837] border border-[#C79A3B]/40 hover:bg-[#FAF4E9]"
                      }`}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#6F1837]">
                      ₹
                    </span>
                    <input
                      type="text"
                      placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full h-9 pl-7 pr-3 rounded-xl border border-[#C79A3B]/40 text-xs font-bold text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Offering Summary Box */}
                <div className="p-3 rounded-xl bg-[#FFF9EE] border border-[#DEC077]/70 text-xs space-y-2">
                  <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                    <span className="text-[#7A6448]">Selected Seva:</span>
                    <span className="font-bold text-[#681B37] text-right truncate max-w-[60%]">
                      {selectedPurpose.title}
                    </span>
                  </div>

                  <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                    <span className="text-[#7A6448]">Type:</span>
                    <span className="font-bold text-[#D92D20]">
                      {frequency === "one_time"
                        ? "One-time"
                        : frequency === "recurring"
                        ? `Recurring (${recurringCycle})`
                        : `Pledge (${pledgeOccasion.split("/")[0]})`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-[#2D2430] font-bold">
                      {frequency === "recurring"
                        ? "Amount per cycle:"
                        : frequency === "pledge"
                        ? "Pledged Amount:"
                        : "Total Contribution:"}
                    </span>
                    <span className="font-heading font-extrabold text-base sm:text-lg text-[#681B37]">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* 80G Tax Badge */}
                <div className="flex items-center gap-1.5 text-[10.5px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Eligible for Section 80G Tax Exemption Certificate.</span>
                </div>

                {/* Continue CTA */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 rounded-xl bg-[#681B37] hover:bg-[#882245] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-98 transition-all"
                >
                  <span>Continue to Donor Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Donor Details */}
          {step === 2 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#6F1837] mb-1">
                  2. Devotee & Donor Information
                </h3>
                <p className="text-xs text-[#5D5460]">
                  Required for official receipt generation in accordance with temple administrative norms.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1">
                  Donor Full Name <span className="text-[#C83B32]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#C79A3B] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Anamika Debnath"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                  />
                </div>
                {errors.fullName && <p className="text-[10px] text-[#C83B32] mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D2430] mb-1">
                    Mobile Number <span className="text-[#C83B32]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#C79A3B] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                    />
                  </div>
                  {errors.mobile && <p className="text-[10px] text-[#C83B32] mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2430] mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#C79A3B] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="For e-receipt PDF dispatch"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D2430] mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Udaipur, Tripura"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2430] mb-1">
                    PAN Card (Optional for 80G Tax Exemption)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                    className="w-full h-10 px-3 rounded-xl border border-[#C79A3B]/40 text-xs uppercase text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk80g"
                  checked={formData.is80GRequested}
                  onChange={(e) => setFormData({ ...formData, is80GRequested: e.target.checked })}
                  className="rounded text-[#6F1837] focus:ring-[#6F1837]"
                />
                <label htmlFor="chk80g" className="text-xs text-[#5D5460] cursor-pointer">
                  Request Section 80G tax receipt certificate (subject to final official Trust endorsement).
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#F0E3D0]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => { if (validateDonorInfo()) setStep(3); }}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method Selection */}
          {step === 3 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#6F1837] mb-1">
                  3. Select Payment Method (Prototype)
                </h3>
                <p className="text-xs text-[#5D5460]">
                  The audit proposes a unified aggregator prioritizing UPI, RuPay, and Net Banking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "UPI", label: "UPI Instant Transfer", desc: "Google Pay, PhonePe, Paytm, BHIM", icon: QrCode },
                  { id: "Card", label: "Debit / Credit Card", desc: "RuPay, Visa, MasterCard", icon: CreditCard },
                  { id: "NetBanking", label: "Net Banking", desc: "SBI, PNB, HDFC, All Indian Banks", icon: Building2 },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMode(m.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFF8ED] border-[#6F1837] ring-1.5 ring-[#6F1837] text-[#6F1837]"
                          : "bg-white border-[#C79A3B]/30 text-[#665D6A] hover:bg-[#FAF4E9]"
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-2 text-[#C79A3B]" />
                      <span className="font-bold text-xs block text-[#2D2430]">{m.label}</span>
                      <span className="text-[10px] text-[#877E8A] leading-tight block mt-0.5">{m.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 rounded-xl bg-[#FFF9EE] border border-[#C79A3B]/30 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Purpose:</span>
                  <span className="font-semibold text-[#2D2430]">{selectedPurpose.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Donation Type:</span>
                  <span className="font-bold text-[#D92D20]">
                    {frequency === "one_time"
                      ? "One-time Offering"
                      : frequency === "recurring"
                      ? `Recurring (${recurringCycle.toUpperCase()} Auto-debit)`
                      : `Sacred Pledge (Due: ${pledgeDate})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Donor:</span>
                  <span className="font-semibold text-[#2D2430]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#F0E3D0] font-bold text-sm">
                  <span className="text-[#2D2430]">
                    {frequency === "recurring"
                      ? "Amount per cycle:"
                      : frequency === "pledge"
                      ? "Pledged Amount (Pay on Due Date):"
                      : "Total Donation:"}
                  </span>
                  <span className="font-sans font-bold tabular-nums text-[#6F1837]">₹{amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10.5px] text-amber-800">
                <strong>Prototype Demo:</strong> No live banking charge is made. Clicking below will instantly register your devotional offering and produce an authentic e-receipt / pledge certificate.
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#F0E3D0]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteDonation}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <span>
                    {frequency === "pledge"
                      ? "Confirm Sacred Pledge (Pay ₹0 Today)"
                      : frequency === "recurring"
                      ? "Authorize Recurring Seva Mandate"
                      : "Simulate Payment & Generate Receipt"}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Donation Receipt */}
          {step === 4 && confirmedDonation && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#C79A3B]/40 shadow-md text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  OFFERING RECEIVED • JAI MAA TRIPURA SUNDARI
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#6F1837] mt-1">
                  Thank You for Your Sacred Contribution
                </h3>
                <p className="text-xs text-[#5D5460]">
                  Official Temple Trust e-Receipt generated under Reference ID: <strong>{confirmedDonation.id}</strong>
                </p>
              </div>

              <div className="bg-[#FFF9EE] p-5 rounded-2xl border border-[#C79A3B]/35 text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Receipt No:</span>
                  <span className="font-mono font-bold text-[#6F1837]">{confirmedDonation.id}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Donor Name:</span>
                  <span className="font-semibold text-[#2D2430]">{confirmedDonation.donorName}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Purpose:</span>
                  <span className="font-semibold text-[#2D2430]">{confirmedDonation.purpose}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Donation Type:</span>
                  <span className="font-bold text-[#D92D20]">{confirmedDonation.frequencyLabel}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#F0E3D0]">
                  <span className="text-[#877E8A]">Contribution:</span>
                  <span className="font-sans font-bold tabular-nums text-base text-[#6F1837]">₹{confirmedDonation.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-[#877E8A]">Status:</span>
                  <span className="font-bold text-emerald-700">{confirmedDonation.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("history")}
                  className="px-5 py-2.5 rounded-xl bg-[#6F1837] text-white text-xs font-semibold shadow-2xs hover:bg-[#882245]"
                >
                  View in Donation History
                </button>
                <button
                  type="button"
                  onClick={() => { setStep(1); setCustomAmount(""); }}
                  className="px-5 py-2.5 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
                >
                  Make Another Donation
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DONATION HISTORY */}
      {activeTab === "history" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C79A3B]/30 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E3D0]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#6F1837]">
                My Donation Receipts ({donationHistory.length})
              </h3>
              <p className="text-xs text-[#877E8A]">
                Historical records of voluntary contributions made under this account.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setActiveTab("donate"); setStep(1); }}
              className="px-3.5 py-1.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-semibold"
            >
              + Make New Offering
            </button>
          </div>

          <div className="space-y-3">
            {donationHistory.map((d) => (
              <div
                key={d.id}
                className="bg-[#FFF9EE]/70 rounded-xl p-4 border border-[#C79A3B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#6F1837] bg-white px-2 py-0.5 rounded border border-[#C79A3B]/25">
                      {d.id}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {d.status}
                    </span>
                    <span className="text-[9.5px] font-bold text-[#991B1B] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                      {d.frequencyLabel || "One-time Offering"}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#2D2430]">{d.purpose}</h4>
                  <p className="text-xs text-[#5D5460]">
                    Donor: <strong>{d.donorName}</strong> • Mode: {d.paymentMode} • {d.taxExemption}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-sans font-bold tabular-nums text-base text-[#6F1837] block">₹{d.amount.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-[#877E8A]">Date: {d.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

