import React from "react";
import {
  Droplets,
  HeartPulse,
  Accessibility,
  Luggage,
  Footprints,
  Baby,
  Utensils,
  Store,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

const amenitiesList = [
  {
    icon: Droplets,
    title: "Pure Drinking Water",
    location: "Main Courtyard & Parikrama",
    desc: "Free chilled RO filtered water stations available across the complex.",
    badge: "Free",
  },
  {
    icon: Footprints,
    title: "Footwear Cloakroom",
    location: "Gate A & Gate C",
    desc: "Safe shoe token counter with dedicated token management.",
    badge: "Free",
  },
  {
    icon: Luggage,
    title: "Luggage & Locker Rooms",
    location: "Visitor Center (West Archway)",
    desc: "Secure biometric lockers for outstation luggage, bags, and valuables.",
    badge: "Free",
  },
  {
    icon: Accessibility,
    title: "Wheelchair & Ramps",
    location: "North Ramp Corridor",
    desc: "Free assisted wheelchairs and gentle ramps for elderly and Divyang.",
    badge: "Assisted",
  },
  {
    icon: HeartPulse,
    title: "First Aid & Medical Post",
    location: "Admin Block (Near Gate A)",
    desc: "24/7 on-duty paramedical staff with oxygen and emergency response.",
    badge: "24/7 Support",
  },
  {
    icon: Baby,
    title: "Feeding & Child Care",
    location: "Visitor Lounge (West)",
    desc: "Clean private nursing rooms with baby care amenities and hot water.",
    badge: "Sanitized",
  },
  {
    icon: Utensils,
    title: "Annabhog Dining Hall",
    location: "South Pavilion (520 seats)",
    desc: "Free sacred prasad meal distributed daily from 12:30 PM – 02:30 PM.",
    badge: "Nitya Seva",
  },
  {
    icon: Store,
    title: "Official Prasad Counters",
    location: "Courtyard & North Exit",
    desc: "Authentic Matabari Peda prasad and puja samagri with trust billing receipts.",
    badge: "Verified",
  },
];

export default function FacilitiesSection() {
  return (
    <div className="space-y-3.5 animate-in fade-in duration-200 select-none">
      {/* 1. Header Strip */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FFFDF8] to-[#FFF6E5] border border-[#DEC077]/70 p-3 sm:p-3.5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FDF0D5] to-[#F5D899] border border-[#DEC077] flex items-center justify-center text-[#6F1837] shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#6F1837]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading font-bold text-sm sm:text-base text-[#6F1837] truncate">
              Pilgrim Facilities & Care Amenities
            </h2>
            <p className="text-[11px] text-[#7A6448] truncate">
              Provided free by Mata Tripura Sundari Temple Trust for comfortable darshan.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-[10.5px] font-bold whitespace-nowrap shrink-0">
          ● 100% Free Pilgrim Support
        </span>
      </div>

      {/* 2. Compact 4x2 Amenities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {amenitiesList.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#E7CE96]/70 p-3 shadow-xs hover:border-[#DEC077] transition-all flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between pb-1.5 border-b border-[#F5E8D0]">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF8ED] border border-[#DEC077]/60 flex items-center justify-center text-[#6F1837]">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xs sm:text-[13px] text-[#6F1837] mt-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#5D5460] mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>

              <div className="pt-1.5 border-t border-[#F5E8D0] flex items-center gap-1 text-[10px] text-[#7A6448]">
                <MapPin className="w-3 h-3 text-[#C79A3B] shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Compact 24/7 Helpline Strip */}
      <div className="rounded-2xl bg-gradient-to-r from-[#6F1837] to-[#4A1027] px-4 py-2.5 text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[#DFC17B] shrink-0">
            <HeartPulse className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#FFF8ED] mr-2">24/7 Pilgrim Emergency Helpline:</span>
            <span className="text-xs text-[#DFC17B] font-mono font-bold">+91 381 232 4567 / 1800-345-0088</span>
          </div>
        </div>
        <span className="text-[11px] text-[#F0E3D0] italic">
          Free wheelchair assistance & ambulance on request at West Gopuram
        </span>
      </div>
    </div>
  );
}
