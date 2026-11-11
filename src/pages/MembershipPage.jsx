import React, { useState, useEffect } from "react";
import {
  Crown,
  ShieldCheck,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  CreditCard,
  QrCode,
  ArrowRight,
  Gift,
  Check,
  Truck,
  Award,
  Flame,
  Printer,
  Copy,
} from "lucide-react";
import {
  MEMBERSHIP_TIERS,
  INITIAL_DEVOTEE_MEMBERSHIP,
  MEMBERSHIP_FAQS,
} from "../data/membershipData";
import { useLanguage } from "../context/LanguageContext";

export default function MembershipPage({ onNavigate }) {
  const { t, isBengali } = useLanguage();

  // Tab: 'my-membership' | 'tiers' | 'enroll' | 'faqs'
  const [activeTab, setActiveTab] = useState("my-membership");

  // Devotee Membership state from localStorage or default
  const [membership, setMembership] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_membership_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DEVOTEE_MEMBERSHIP;
  });

  useEffect(() => {
    try {
      localStorage.setItem("mts_membership_data", JSON.stringify(membership));
    } catch (e) {
      console.error(e);
    }
  }, [membership]);

  // Enrollment Wizard state (3 simple steps)
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(MEMBERSHIP_TIERS[1]);
  const [formData, setFormData] = useState({
    devoteeName: "Subhash Chandra Debbarma",
    gotra: "Kashyapa",
    nakshatra: "Rohini",
    mobile: "9876543210",
    email: "subhash.debbarma@tripura.gov.in",
    address: "House 24, Palace Compound, Agartala, Tripura 799001",
    panNumber: "ABCDE1234F",
    sankalpaOccasion: "Family Well-being",
    sankalpaDate: "2026-10-24",
    paymentMode: "UPI",
    familyMembers: [
      { name: "Ananya Debbarma", relation: "Spouse" },
      { name: "Rohit Debbarma", relation: "Son" },
    ],
  });

  // Fast-track booking state
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passDate, setPassDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [passTimeSlot, setPassTimeSlot] = useState("Morning (09:00 AM - 11:00 AM)");
  const [passCount, setPassCount] = useState(2);
  const [passBooked, setPassBooked] = useState(null);

  // 80G modal state
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Complete enrollment
  const handleEnrollSubmit = () => {
    const newMemberId = `MTS-MEM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const joinDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    const validityYears = (selectedTier.id === "annual" || selectedTier.id === "sevadhari") ? 1 : (selectedTier.id === "silver" || selectedTier.id === "kalyani") ? 5 : 99;
    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + validityYears);
    const validUntilStr = selectedTier.duration === "Lifetime" || selectedTier.duration === "Permanent"
      ? selectedTier.duration
      : expDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    const newRecord = {
      memberId: newMemberId,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      devoteeName: formData.devoteeName,
      gotra: formData.gotra,
      nakshatra: formData.nakshatra,
      mobile: formData.mobile.startsWith("+91") ? formData.mobile : `+91 ${formData.mobile}`,
      email: formData.email,
      address: formData.address,
      panNumber: formData.panNumber,
      joiningDate: joinDate,
      validUntil: validUntilStr,
      duration: selectedTier.duration,
      totalContribution: selectedTier.fee,
      darshanPassesTotal: selectedTier.darshanPasses,
      darshanPassesUsed: 0,
      familyMembers: formData.familyMembers,
      sankalpaDate: formData.sankalpaDate,
      sankalpaOccasion: formData.sankalpaOccasion,
      assignedPriest: "Pt. Bhabatosh Bhattacharya",
      prasadKitStatus: "Preparing for Dispatch",
      prasadTrackingNumber: `SP-TR-${Math.floor(1000000 + Math.random() * 9000000)}`,
      courierPartner: "India Post Speed Post",
      status: "Active",
    };

    setMembership(newRecord);
    setWizardStep(4);
  };

  const handleBookPass = () => {
    if (membership.darshanPassesTotal - membership.darshanPassesUsed < passCount) {
      alert("Insufficient pass balance.");
      return;
    }
    setMembership({
      ...membership,
      darshanPassesUsed: membership.darshanPassesUsed + Number(passCount),
    });
    setPassBooked({
      code: `FTP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: passDate,
      slot: passTimeSlot,
      count: passCount,
    });
  };

  const handleCopyCard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Mata Tripura Sundari Temple Trust\nMember ID: ${membership.memberId}\nName: ${membership.devoteeName}\nTier: ${membership.tierName}\nValid Until: ${membership.validUntil}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-12">
      {/* 1. Header Section */}
      <section className="bg-gradient-to-r from-[#4A1027] via-[#5C1431] to-[#4A1027] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-[#C79A3B]/30 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DFC17B] uppercase tracking-wider mb-1">
              <Crown className="w-3.5 h-3.5" />
              <span>{isBengali ? "মা ত্রিপুরেশ্বরী দেবোত্তর ট্রাস্ট" : "Mata Tripura Sundari Temple Trust"}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF8ED]">
              {isBengali ? "ভক্ত সেবা মণ্ডল ও সদস্যপদ" : "Devotee Patronage & Membership"}
            </h1>
            <p className="text-xs sm:text-sm text-[#EADECF] mt-1 max-w-xl">
              Annual and lifetime patronage supporting daily Nitya Seva, Annadanam, and temple heritage.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveTab("enroll");
                setWizardStep(1);
              }}
              className="px-4 py-2 bg-[#DFC17B] hover:bg-[#C79A3B] text-[#4A1027] font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Enroll / Upgrade</span>
            </button>
            <button
              onClick={() => setActiveTab("my-membership")}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#DFC17B]" />
              <span>My Member Card</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Navigation Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-white rounded-xl p-1.5 border border-stone-200 shadow-2xs flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {[
            { id: "my-membership", label: "My Member Portal", icon: User },
            { id: "tiers", label: "Tiers & Privileges", icon: Award },
            { id: "enroll", label: "Enroll Online", icon: Crown },
            { id: "faqs", label: "Trust Guidelines", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#55132D] text-white shadow-2xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-[#E2BC6B]" : ""}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* ========================================================
            TAB: MY MEMBERSHIP
           ======================================================== */}
        {activeTab === "my-membership" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Top Row: Digital ID Card + Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Sacred Digital ID Card */}
              <div className="lg:col-span-7 bg-gradient-to-br from-[#4A1027] via-[#5F1433] to-[#3B071E] rounded-2xl p-5 text-white border-2 border-[#E2BC6B]/80 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#E2BC6B]/30 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-black/30 border border-[#E2BC6B]/50 p-1 flex items-center justify-center">
                        <img
                          src="/assets/temple-logo.svg"
                          alt="Temple Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-[#FFF8ED]">
                          Mata Tripura Sundari Temple Trust
                        </h3>
                        <p className="text-[10px] text-[#DFC17B] uppercase tracking-wide">
                          Matabari, Udaipur • Devotee Patron Card
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DFC17B] text-[#4A1027] uppercase">
                      {membership.tierName}
                    </span>
                  </div>

                  {/* Devotee Info */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-8 space-y-1.5">
                      <span className="text-[10px] uppercase text-[#EADECF]/70 font-semibold block">
                        Patron Devotee
                      </span>
                      <h4 className="font-serif font-bold text-lg text-white">
                        {membership.devoteeName}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="text-white/60 text-[10px] block">Gotra</span>
                          <span className="font-semibold text-[#DFC17B]">{membership.gotra}</span>
                        </div>
                        <div>
                          <span className="text-white/60 text-[10px] block">Member ID</span>
                          <span className="font-mono font-bold text-white">{membership.memberId}</span>
                        </div>
                        <div>
                          <span className="text-white/60 text-[10px] block">Valid Until</span>
                          <span className="font-medium text-emerald-300">{membership.validUntil}</span>
                        </div>
                        <div>
                          <span className="text-white/60 text-[10px] block">Status</span>
                          <span className="font-medium text-emerald-300">● {membership.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4 flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 border border-[#E2BC6B]/30 text-center">
                      <div className="w-16 h-16 bg-white p-1 rounded-lg">
                        <QrCode className="w-full h-full text-stone-900" />
                      </div>
                      <span className="text-[8.5px] text-[#DFC17B] font-mono mt-1">TRUST VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-white/70">
                    Contribution: ₹{membership.totalContribution.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyCard}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3 text-[#DFC17B]" />
                      <span>{copiedLink ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1 bg-[#DFC17B] hover:bg-[#C79A3B] text-[#4A1027] font-bold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Fast-Track Passes Quota & 80G Card */}
              <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                {/* Passes Card */}
                <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                        Fast-Track VIP Darshan Passes
                      </span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-stone-900">
                          {membership.darshanPassesTotal - membership.darshanPassesUsed}
                        </span>
                        <span className="text-xs text-stone-500">
                          of {membership.darshanPassesTotal} passes left
                        </span>
                      </div>
                    </div>
                    <span className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                      <Calendar className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="mt-2.5 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#55132D] h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          ((membership.darshanPassesTotal - membership.darshanPassesUsed) /
                            membership.darshanPassesTotal) *
                            100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[11.5px] text-stone-600">
                    Bypasses general queue for devotee and registered family members.
                  </p>

                  <button
                    onClick={() => {
                      setPassBooked(null);
                      setIsPassModalOpen(true);
                    }}
                    className="mt-3 w-full py-2 bg-[#55132D] hover:bg-[#681B37] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Fast-Track Pass</span>
                  </button>
                </div>

                {/* 80G Receipt Card */}
                <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block leading-tight">
                        80G Tax Exemption Receipt
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Section 80G compliant receipt
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTaxModal(true)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Row: Annual Puja + Prasad Dispatch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Annual Sankalpa Pooja */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-600" />
                    <h4 className="font-bold text-xs text-stone-900">Annual Sanctum Sankalpa Puja</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Scheduled
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date:</span>
                    <span className="font-bold text-stone-900">{membership.sankalpaDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Occasion:</span>
                    <span>{membership.sankalpaOccasion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Officiating Priest:</span>
                    <span className="font-semibold text-[#55132D]">{membership.assignedPriest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Chanted Gotra:</span>
                    <span>{membership.gotra} Gotra</span>
                  </div>
                </div>
              </div>

              {/* Consecrated Prasad Dispatch */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-xs text-stone-900">Annual Mahaprasad Dispatch</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {membership.prasadKitStatus}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Carrier:</span>
                    <span className="font-semibold">{membership.courierPartner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Tracking ID:</span>
                    <span className="font-mono font-bold text-[#55132D]">{membership.prasadTrackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Destination:</span>
                    <span className="truncate max-w-[200px] text-stone-600">{membership.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registered Family Members */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#55132D]" />
                  <h4 className="font-bold text-xs text-stone-900">
                    Family Beneficiaries ({membership.familyMembers?.length || 0})
                  </h4>
                </div>
                <span className="text-[11px] text-stone-500">
                  Included under {membership.tierName} passes
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {membership.familyMembers?.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-stone-900 block">{m.name}</span>
                      <span className="text-[11px] text-stone-500">{m.relation}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Covered
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: TIERS & PRIVILEGES
           ======================================================== */}
        {activeTab === "tiers" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MEMBERSHIP_TIERS.map((tier) => {
                const isCurrent = membership?.tierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`bg-white rounded-2xl p-4 border flex flex-col justify-between transition-all ${
                      tier.popular
                        ? "border-[#DFC17B] shadow-md ring-1 ring-[#DFC17B]/40"
                        : "border-stone-200 shadow-2xs"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          {tier.badge}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Your Tier
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-base text-stone-900 mt-2">
                        {tier.name}
                      </h3>

                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-xl font-bold text-[#55132D]">{tier.feeLabel}</span>
                        <span className="text-xs text-stone-500">/ {tier.duration}</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                        {tier.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11.5px] leading-tight">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <button
                        onClick={() => {
                          setSelectedTier(tier);
                          setActiveTab("enroll");
                          setWizardStep(1);
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          tier.popular
                            ? "bg-[#DFC17B] hover:bg-[#C79A3B] text-[#4A1027]"
                            : "bg-[#55132D] hover:bg-[#681B37] text-white"
                        }`}
                      >
                        {isCurrent ? "Extend Tier" : "Select Tier"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: ENROLLMENT WIZARD (CLEAN 3-STEP)
           ======================================================== */}
        {activeTab === "enroll" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs animate-in fade-in duration-200">
            {/* Step Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <span className="font-serif font-bold text-base text-stone-900">
                Enroll in Bhakta Mandal
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Step {wizardStep} of 3
              </span>
            </div>

            {/* STEP 1: TIER SELECTION */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600">Select your preferred membership tier:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedTier.id === tier.id
                          ? "border-[#55132D] bg-[#55132D]/5"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-stone-900">{tier.name}</span>
                        <span className="font-bold text-xs text-[#55132D]">{tier.feeLabel}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        {tier.darshanPasses} Fast-Track Passes • {tier.duration}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-5 py-2 bg-[#55132D] text-white text-xs font-bold rounded-xl hover:bg-[#681B37] cursor-pointer"
                  >
                    Continue to Details →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DEVOTEE INFO */}
            {wizardStep === 2 && (
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.devoteeName}
                      onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Gotra *</label>
                    <input
                      type="text"
                      value={formData.gotra}
                      onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">PAN Card (for 80G)</label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-700 mb-1">Shipping Address (for Prasad)</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Annual Sankalpa Date</label>
                    <input
                      type="date"
                      value={formData.sankalpaDate}
                      onChange={(e) => setFormData({ ...formData, sankalpaDate: e.target.value })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Sankalpa Purpose</label>
                    <input
                      type="text"
                      value={formData.sankalpaOccasion}
                      onChange={(e) => setFormData({ ...formData, sankalpaOccasion: e.target.value })}
                      className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-5 py-2 bg-[#55132D] text-white font-bold rounded-xl hover:bg-[#681B37] cursor-pointer"
                  >
                    Proceed to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT & CONFIRMATION */}
            {wizardStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Tier:</span>
                    <span className="font-bold text-stone-900">{selectedTier.name} ({selectedTier.duration})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Devotee:</span>
                    <span className="font-semibold">{formData.devoteeName} ({formData.gotra} Gotra)</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-1.5 font-bold text-[#55132D]">
                    <span>Total Offering:</span>
                    <span>{selectedTier.feeLabel}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Select Payment Mode:</label>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {["UPI / QR", "Credit/Debit Card", "Net Banking"].map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border cursor-pointer font-semibold ${
                          idx === 0 ? "border-[#55132D] bg-[#55132D]/5 text-[#55132D]" : "border-stone-200 text-stone-600"
                        }`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 font-bold rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleEnrollSubmit}
                    className="px-6 py-2 bg-[#DFC17B] hover:bg-[#C79A3B] text-[#4A1027] font-bold rounded-xl cursor-pointer shadow-2xs"
                  >
                    Complete Offering & Issue Card
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {wizardStep === 4 && (
              <div className="text-center py-4 space-y-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-lg">
                  ✓
                </div>
                <h3 className="font-bold text-stone-900 text-base">Membership Successfully Enrolled!</h3>
                <p className="text-xs text-stone-600">
                  Member ID: <strong className="font-mono text-[#55132D]">{membership.memberId}</strong>
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => setActiveTab("my-membership")}
                    className="px-5 py-2 bg-[#55132D] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#681B37]"
                  >
                    View My Member Card
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB: GUIDELINES & FAQS
           ======================================================== */}
        {activeTab === "faqs" && (
          <div className="max-w-2xl mx-auto space-y-3 animate-in fade-in duration-200">
            {MEMBERSHIP_FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs">
                <h4 className="font-bold text-xs text-stone-900 flex items-start gap-1.5">
                  <span className="text-[#55132D] font-bold">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="mt-1 text-xs text-stone-600 pl-4 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FAST-TRACK PASS BOOKING MODAL */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-stone-200 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-900 text-sm">Book Fast-Track Pass</span>
              <button
                onClick={() => setIsPassModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {passBooked ? (
              <div className="text-center py-2 space-y-2">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-sm">
                  ✓
                </div>
                <h4 className="font-bold text-stone-900">Pass Confirmed!</h4>
                <p className="font-mono text-[#55132D] font-bold text-sm">{passBooked.code}</p>
                <p className="text-stone-500 text-[11px]">
                  {passBooked.date} • {passBooked.slot} ({passBooked.count} Devotees)
                </p>
                <button
                  onClick={() => setIsPassModalOpen(false)}
                  className="w-full mt-2 py-1.5 bg-[#55132D] text-white rounded-lg font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-0.5">Darshan Date</label>
                  <input
                    type="date"
                    value={passDate}
                    onChange={(e) => setPassDate(e.target.value)}
                    className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-0.5">Time Slot</label>
                  <select
                    value={passTimeSlot}
                    onChange={(e) => setPassTimeSlot(e.target.value)}
                    className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200 text-stone-700"
                  >
                    <option value="Morning (09:00 AM - 11:00 AM)">Morning (09:00 AM - 11:00 AM)</option>
                    <option value="Afternoon (12:00 PM - 02:00 PM)">Afternoon (12:00 PM - 02:00 PM)</option>
                    <option value="Evening (05:30 PM - 07:30 PM)">Evening (05:30 PM - 07:30 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-0.5">Number of Devotees</label>
                  <select
                    value={passCount}
                    onChange={(e) => setPassCount(Number(e.target.value))}
                    className="w-full h-8 px-2.5 bg-stone-50 rounded-lg border border-stone-200 text-stone-700"
                  >
                    <option value={1}>1 Devotee</option>
                    <option value={2}>2 Devotees</option>
                    <option value={3}>3 Devotees</option>
                    <option value={4}>4 Devotees</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleBookPass}
                    className="w-full py-2 bg-[#55132D] text-white font-bold rounded-xl hover:bg-[#681B37] cursor-pointer"
                  >
                    Confirm Pass
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 80G RECEIPT MODAL */}
      {showTaxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl border border-stone-200 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-900 text-sm">80G Donation Receipt</span>
              <button
                onClick={() => setShowTaxModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5 font-mono text-[11px] text-stone-700">
              <div className="text-center pb-1 border-b border-stone-200">
                <p className="font-bold text-stone-900">MATA TRIPURA SUNDARI TEMPLE TRUST</p>
                <p className="text-[10px] text-stone-500">Matabari, Udaipur, Gomati District, Tripura</p>
                <p className="text-[10px] text-stone-500">80G Reg: CIT/AGT/80G/2018-19/T-402</p>
              </div>
              <p>Receipt No: MTS-80G-{membership.memberId}</p>
              <p>Donor: {membership.devoteeName}</p>
              <p>PAN: {membership.panNumber || "N/A"}</p>
              <p>Amount: ₹{membership.totalContribution.toLocaleString()}</p>
              <p>Purpose: {membership.tierName} Patron Fund</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-1.5 bg-[#55132D] text-white font-bold rounded-lg hover:bg-[#681B37] cursor-pointer"
              >
                Print Receipt
              </button>
              <button
                onClick={() => setShowTaxModal(false)}
                className="px-3 py-1.5 bg-stone-100 text-stone-700 font-bold rounded-lg cursor-pointer"
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
