import React, { useState, useEffect } from "react";
import { Heart, ShieldCheck, Download, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, User, Phone, Mail, FileText, QrCode, CreditCard, Building2, Sparkles, Utensils, Shield, Fish } from "lucide-react";
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
    const newDonation = {
      id: refId,
      donorName: formData.fullName,
      purpose: selectedPurpose.title,
      amount: amount,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      paymentMode: `${paymentMode} (Prototype)`,
      status: "Successful (Prototype)",
      taxExemption: formData.is80GRequested ? "80G Provisional Claim" : "General Devotional Offering",
      timestamp: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    setDonationHistory(prev => [newDonation, ...prev]);
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
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* STEP 1: Select Purpose & Amount */}
          {step === 1 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-sm space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#6F1837] mb-1">
                  1. Select Devotional Seva Purpose
                </h3>
                <p className="text-xs text-[#5D5460]">
                  Choose which temple initiative you would like to support with your sacred offering.
                </p>
              </div>

              {/* Purpose Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {donationPurposes.map((p) => {
                  const Icon = iconMap[p.icon] || Heart;
                  const isSelected = selectedPurpose.id === p.id;
                  return (
                    <div
                      key={p.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => { setSelectedPurpose(p); setAmount(p.recommendedAmounts[1]); }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? "bg-[#FFF8ED] border-[#6F1837] ring-1.5 ring-[#6F1837] shadow-xs"
                          : "bg-white border-[#C79A3B]/30 hover:border-[#C79A3B]/70 hover:bg-[#FAF4E9]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected ? "bg-[#6F1837] text-[#DFC17B] border-[#6F1837]" : "bg-[#FFF8ED] text-[#6F1837] border-[#C79A3B]/30"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs sm:text-[13px] text-[#2D2430] leading-tight">
                          {p.title}
                        </h4>
                        <p className="text-[10.5px] text-[#5D5460] mt-0.5 line-clamp-2">
                          {p.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Amount Selection */}
              <div className="pt-2 border-t border-[#F0E3D0] space-y-3">
                <div>
                  <h4 className="font-bold text-xs text-[#2D2430] mb-0.5">
                    Select Offering Amount (INR)
                  </h4>
                  <p className="text-[11px] text-[#877E8A]">
                    Every rupee directly supports temple sevas. Custom amounts are always welcomed.
                  </p>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2">
                  {selectedPurpose.recommendedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        amount === amt && !customAmount
                          ? "bg-[#6F1837] text-white shadow-xs"
                          : "bg-[#FFF8ED] text-[#6F1837] border border-[#C79A3B]/40 hover:bg-[#FAF4E9]"
                      }`}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div className="pt-1">
                  <div className="relative max-w-xs">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#6F1837]">
                      ₹
                    </span>
                    <input
                      type="text"
                      placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full h-10 pl-8 pr-3 rounded-xl border border-[#C79A3B]/40 text-xs font-bold text-[#2D2430] bg-[#FFF8ED]/30 focus:border-[#6F1837] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#F0E3D0]">
                <div className="text-xs">
                  <span className="text-[#877E8A]">Contribution: </span>
                  <span className="font-sans font-bold tabular-nums text-base text-[#6F1837]">₹{amount.toLocaleString("en-IN")}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
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
                  <span className="text-[#877E8A]">Donor:</span>
                  <span className="font-semibold text-[#2D2430]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#F0E3D0] font-bold text-sm">
                  <span className="text-[#2D2430]">Total Donation:</span>
                  <span className="font-sans font-bold tabular-nums text-[#6F1837]">₹{amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10.5px] text-amber-800">
                <strong>Prototype Demo:</strong> No live banking charge is made. Clicking below will instantly produce an authentic devotional e-receipt for demonstration.
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
                  <span>Simulate Payment & Generate Receipt</span>
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
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6F1837] bg-white px-2 py-0.5 rounded border border-[#C79A3B]/25">
                      {d.id}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {d.status}
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

