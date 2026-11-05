/**
 * Mata Tripura Sundari Temple — Darshan Slots, Categories & Availability Data
 * Matabari, Udaipur, Tripura
 * 
 * Reusable data model supporting multi-category darshan bookings:
 * 1. General Darshan (Free standard queue)
 * 2. Special Entry Darshan (Priority queue, limited quota)
 * 3. Senior Citizen & Divyangjan (Assisted accessibility, ramp access)
 * 4. VIP / Protocol Darshan (Restricted administrative workflow)
 */

export const templeTimingInfo = {
  openTime: "04:00 AM",
  closeTime: "10:00 PM",
  dailySchedule: "04:00 AM – 10:00 PM (Daily Rituals)",
  disclaimer:
    "Documented daily rituals run approx. 04:00 AM – 10:00 PM (subject to official temple administration verification).",
  specialNotice:
    "Extended round-the-clock darshan operates during Diwali Mela and Amavasya occasions.",
};

/**
 * Public Darshan Categories
 */
export const darshanCategories = [
  {
    id: "general",
    name: "General Darshan",
    subtitle: "Regular Pilgrim Queue",
    shortName: "General",
    icon: "Users",
    price: 0,
    priceLabel: "Free",
    priceSubtext: "Standard access for all devotees",
    badge: "Standard Option",
    badgeColor: "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]",
    description: "100% free daily darshan access through the main covered general queue complex.",
    dailyQuota: 1280,
    entryGate: "Gate 1 (Main Entrance)",
    shortGate: "Gate 1 (Main)",
    reportingWindow: "Report 15 minutes before your time slot at Gate 1",
    eligibility: "Open to all pilgrims without any restriction or fee",
    isPublic: true,
    isEnabled: true,
    requiresApproval: false,
    capacityMultiplier: 1.0,
    defaultCapacity: 150,
  },
  {
    id: "special",
    name: "Special Entry Darshan",
    subtitle: "Priority Entry Facility",
    shortName: "Special Entry",
    icon: "Sparkles",
    price: 100,
    priceLabel: "₹100",
    priceSubtext: "per devotee (Illustrative)",
    badge: "Priority Queue",
    badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    description: "Expedited darshan through a dedicated priority queue, subject to daily temple quota.",
    dailyQuota: 240,
    entryGate: "Gate 2 (Special Entry Counter)",
    shortGate: "Gate 2 (Priority)",
    reportingWindow: "Report 15 minutes before your time slot at Gate 2 Counter",
    eligibility: "Configurable facility subject to temple administration approval",
    isPublic: true,
    isEnabled: true,
    requiresApproval: false,
    capacityMultiplier: 0.2,
    defaultCapacity: 30,
    conditions: "Illustrative pricing for demonstration. Subject to official temple notification.",
  },
  {
    id: "senior_divyangjan",
    name: "Senior Citizen & Divyangjan",
    subtitle: "Assisted Accessibility",
    shortName: "Senior / Divyangjan",
    icon: "Accessibility",
    price: 0,
    priceLabel: "Free",
    priceSubtext: "Accessibility assistance provided",
    badge: "Ramp & Seva Support",
    badgeColor: "bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]",
    description: "Dedicated accessible queue with wheelchair ramp access from Gate 1 and volunteer assistance.",
    dailyQuota: 180,
    entryGate: "Gate 1 (Accessibility Ramp)",
    shortGate: "Gate 1 (Ramp)",
    reportingWindow: "Report at Gate 1 Helpdesk for priority ramp escort",
    eligibility: "Devotees aged 60+ or Differently-Abled (Divyangjan) + 1 accompanying attendant",
    isPublic: true,
    isEnabled: true,
    requiresApproval: false,
    capacityMultiplier: 0.15,
    defaultCapacity: 20,
    conditions: "Please present Age proof (Aadhaar / Voter ID) or Disability Card at the Helpdesk.",
  },
  {
    id: "infant_family",
    name: "Infant & Expectant Mothers",
    subtitle: "Matri & Shishu Care",
    shortName: "Infants & Mothers",
    icon: "Baby",
    price: 0,
    priceLabel: "Free",
    priceSubtext: "Child below 5 yrs / Expectant",
    badge: "Toddler & Mother Care",
    badgeColor: "bg-[#FCE7F3] text-[#9D174D] border-[#FBCFE8]",
    description: "Dedicated expedited queue for expectant mothers and parents carrying infants or toddlers under 5 years.",
    dailyQuota: 160,
    entryGate: "Gate 1 (Matri Shishu Counter)",
    shortGate: "Gate 1 (Matri)",
    reportingWindow: "Report 15 minutes before your time slot at Gate 1 Family Helpdesk",
    eligibility: "Expectant mothers or parents carrying infant/child below 5 years (Max 3 persons: Parents + Child)",
    isPublic: true,
    isEnabled: true,
    requiresApproval: false,
    capacityMultiplier: 0.12,
    defaultCapacity: 16,
    conditions: "Please keep child's birth certificate, hospital card or age proof handy if requested.",
  },
];

/**
 * Restricted Administrative Category: VIP / Protocol Darshan
 */
export const protocolCategoryInfo = {
  id: "protocol",
  name: "VIP / Protocol Darshan",
  badge: "Restricted Administrative Workflow",
  description:
    "Strictly restricted to official government state guests, constitutional dignitaries, and authorized temple trustees.",
  eligibility: "Authorized government requisition or Temple Trust Executive Magistrate approval.",
  notice:
    "Not available for public online purchase. Requires prior administrative requisition with official departmental verification. No commercial fast-track access permitted.",
  actionLabel: "View Protocol Requisition Guidelines",
};

export const baseSlotTemplates = [
  {
    id: "slot-01",
    label: "Morning Darshan",
    time: "05:00 AM – 06:30 AM",
    period: "Morning",
    capacityTotal: 150,
  },
  {
    id: "slot-02",
    label: "Pratah Kaal Darshan",
    time: "06:30 AM – 08:00 AM",
    period: "Morning",
    capacityTotal: 200,
  },
  {
    id: "slot-03",
    label: "Mangala Aarti Phase",
    time: "08:00 AM – 09:30 AM",
    period: "Morning",
    capacityTotal: 200,
  },
  {
    id: "slot-04",
    label: "Mid-Morning Darshan",
    time: "09:30 AM – 11:30 AM",
    period: "Morning",
    capacityTotal: 250,
  },
  {
    id: "slot-05",
    label: "Madhyanha Darshan",
    time: "12:30 PM – 02:00 PM",
    period: "Afternoon",
    capacityTotal: 180,
  },
  {
    id: "slot-06",
    label: "Aparanha Darshan",
    time: "02:00 PM – 03:30 PM",
    period: "Afternoon",
    capacityTotal: 180,
  },
  {
    id: "slot-07",
    label: "Pre-Sandhya Darshan",
    time: "03:30 PM – 05:00 PM",
    period: "Afternoon",
    capacityTotal: 200,
  },
  {
    id: "slot-08",
    label: "Sandhya Aarti Darshan",
    time: "05:00 PM – 06:30 PM",
    period: "Evening",
    capacityTotal: 250,
  },
  {
    id: "slot-09",
    label: "Deepotsav Darshan",
    time: "06:30 PM – 08:00 PM",
    period: "Evening",
    capacityTotal: 250,
  },
  {
    id: "slot-10",
    label: "Shayan Aarti Phase",
    time: "08:00 PM – 09:30 PM",
    period: "Evening",
    capacityTotal: 150,
  },
];

/**
 * Returns available slots for a given Date and Darshan Category
 * Ensures distinct, category-specific capacities and availability states.
 */
export function getSlotsForDate(date, categoryId = "general") {
  if (!date) return [];

  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const category =
    darshanCategories.find((c) => c.id === categoryId) || darshanCategories[0];
  const multiplier = category.capacityMultiplier || 1.0;

  return baseSlotTemplates.map((template, idx) => {
    // Category-specific total slot capacity
    const categoryCapacityTotal = Math.max(
      10,
      Math.round(template.capacityTotal * multiplier)
    );

    // Hash seed incorporating date, slot index, and category to give independent values
    const categorySeedOffset =
      categoryId === "special" ? 43 : categoryId === "senior_divyangjan" ? 79 : 17;
    const seed =
      (dayOfMonth * 11 + idx * 17 + dayOfWeek * 7 + categorySeedOffset) % 100;

    let status = "available";
    let capacityLeft = Math.floor(
      categoryCapacityTotal * (0.35 + (seed / 100) * 0.55)
    );

    if (isWeekend && (idx === 2 || idx === 7 || idx === 8)) {
      // Weekend peak hours
      if (seed > 65) {
        status = "booked";
        capacityLeft = 0;
      } else {
        status = "filling_fast";
        capacityLeft = Math.max(
          categoryId === "general" ? 8 : 3,
          Math.floor(categoryCapacityTotal * 0.15)
        );
      }
    } else if (seed > 88) {
      status = "booked";
      capacityLeft = 0;
    } else if (seed > 68) {
      status = "filling_fast";
      capacityLeft = Math.max(
        categoryId === "general" ? 12 : 4,
        Math.floor(categoryCapacityTotal * 0.18)
      );
    } else if (seed < 5 && idx === 0) {
      status = "unavailable";
      capacityLeft = 0;
    }

    const bookedCount = Math.max(0, categoryCapacityTotal - capacityLeft);

    return {
      ...template,
      categoryId,
      categoryName: category.name,
      capacityTotal: categoryCapacityTotal,
      capacityLeft,
      bookedCount,
      status, // 'available' | 'filling_fast' | 'booked' | 'unavailable'
      dateString: date.toISOString().split("T")[0],
    };
  });
}

/**
 * Returns date booking metadata for calendar rendering
 */
export function getDateBookingStatus(date, today = new Date(), categoryId = "general") {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (d < now) {
    return { isPast: true, status: "disabled", label: "Past" };
  }

  const diffDays = Math.round((d - now) / (1000 * 60 * 60 * 24));

  // 60-day advance booking window
  if (diffDays > 60) {
    return { isPast: false, status: "future", label: "Not Open Yet" };
  }

  // Weekend high footfall
  if (d.getDay() === 0 || d.getDay() === 6) {
    return { isPast: false, status: "filling_fast", label: "Filling Fast" };
  }

  return { isPast: false, status: "available", label: "Available" };
}

/**
 * Initial sample bookings for demonstration in "My Bookings"
 */
export const initialSampleBookings = [
  {
    id: "MTS-2026-DAR-8921",
    bookingReference: "MTS-2026-DAR-8921",
    categoryId: "general",
    categoryName: "General Darshan",
    devoteeName: "Praneeth Ganithala",
    mobileNumber: "+91 98765 43210",
    devoteesCount: 2,
    darshanDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    rawDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    timeSlot: "08:00 AM – 09:30 AM",
    slotLabel: "Mangala Aarti Phase",
    bookingTimestamp: "29 Oct 2026, 11:30 AM",
    status: "Confirmed",
    fee: "₹0 (Free Darshan)",
    isPrototype: true,
  },
  {
    id: "MTS-2026-DAR-4102",
    bookingReference: "MTS-2026-DAR-4102",
    categoryId: "special",
    categoryName: "Special Entry Darshan",
    devoteeName: "Suniti Roy",
    mobileNumber: "+91 94361 22890",
    devoteesCount: 1,
    darshanDate: new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    rawDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    timeSlot: "09:30 AM – 11:30 AM",
    slotLabel: "Mid-Morning Darshan",
    bookingTimestamp: "01 Nov 2026, 04:15 PM",
    status: "Confirmed",
    fee: "₹100 (Special Entry)",
    isPrototype: true,
  },
];
