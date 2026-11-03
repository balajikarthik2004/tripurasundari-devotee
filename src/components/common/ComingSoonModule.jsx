import React from "react";
import { Sparkles, Calendar, ArrowLeft, ArrowRight, ShieldCheck, Heart, Info, Bed, ShoppingBag, MapPin, CalendarDays } from "lucide-react";
import { navigationItems } from "../../data/dashboardData";

const iconMap = {
  pooja: { icon: Sparkles, phase: "Phase 3", title: "Pooja & Seva Bookings", desc: "Online pooja booking, archana sankalp, and special seva schedules for Maa Tripura Sundari are being prepared in our upcoming portal phase." },
  donations: { icon: Heart, phase: "Phase 3", title: "Devotee E-Hundi & Donations", desc: "Official temple e-Hundi, Annabhog nitya seva donations, and 80G tax-exempt charitable contributions will be accessible soon." },
  prasad: { icon: ShoppingBag, phase: "Phase 4", title: "Matabari Peda & Prasad Store", desc: "GI-tagged Matabari Peda online dispatch, sacred bhog booking, and authentic temple memorabilia store." },
  accommodation: { icon: Bed, phase: "Phase 4", title: "Yatri Nivas & Guest House", desc: "Devotee accommodation bookings, room reservation inquiries, and dormitory facilities at Matabari complex." },
  info: { icon: Info, phase: "Phase 3", title: "Temple History & Administration", desc: "500-year history of Dhanya Manikya, temple architecture details, Trust Board notices, and rituals guide." },
  events: { icon: CalendarDays, phase: "Phase 3", title: "Events & Sacred Festivals", desc: "Annual Diwali Mela festival guide, Navaratri calendar, Amavasya timings, and cultural programs." },
  guide: { icon: MapPin, phase: "Phase 3", title: "Devotee Pilgrimage Guide", desc: "Transportation guides from Agartala, nearest railway connectivity, Kalyan Sagar guidelines, and local amenities." },
};

export default function ComingSoonModule({ navId = "pooja", onNavigate }) {
  const currentItem = navigationItems.find((n) => n.id === navId) || { label: "Temple Service" };
  const config = iconMap[navId] || {
    icon: Sparkles,
    phase: "Upcoming Phase",
    title: currentItem.label,
    desc: "This section is part of the comprehensive Mata Tripura Sundari portal development roadmap.",
  };

  const Icon = config.icon;

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C79A3B]/30 shadow-[0_4px_24px_rgba(74,16,39,0.06)] text-center relative overflow-hidden">
        {/* Top Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C79A3B] via-[#DFC17B] to-[#C79A3B]" />

        {/* Phase Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/35 text-[#6F1837] text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C79A3B] animate-pulse" />
          <span>{config.phase} • Devotee Portal Feature</span>
        </div>

        {/* Icon Circle */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FFF8ED] to-[#F0E3D0] border border-[#C79A3B]/40 flex items-center justify-center text-[#6F1837] shadow-inner">
          <Icon className="w-8 h-8 text-[#6F1837]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6F1837] mb-2 tracking-tight">
          {config.title}
        </h2>

        {/* Sanskrit greeting */}
        <p className="font-serif text-sm font-semibold text-[#C79A3B] mb-4">
          ॥ जय माँ त्रिपुरा सुन्दरी ॥
        </p>

        {/* Description */}
        <p className="text-sm text-[#5D5460] leading-relaxed max-w-lg mx-auto mb-8">
          {config.desc} Meanwhile, Free General Darshan passes can be booked instantly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.("darshan")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#DFC17B]" />
            <span>Book Free Darshan Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FFF8ED] text-[#6F1837] border border-[#C79A3B]/40 hover:border-[#C79A3B] text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

