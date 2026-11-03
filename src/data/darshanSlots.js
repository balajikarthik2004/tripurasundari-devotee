/**
 * Mata Tripura Sundari Temple — Darshan Slots & Availability Data
 * Matabari, Udaipur, Tripura
 * 
 * Configurable prototype data model ready for future backend API integration.
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
 * Returns available slots for a given Date object with realistic dynamic status
 */
export function getSlotsForDate(date) {
  if (!date) return [];

  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  return baseSlotTemplates.map((template, idx) => {
    // Generate pseudo-realistic, date-dependent slot capacity
    const seed = (dayOfMonth * 7 + idx * 13 + dayOfWeek * 5) % 100;

    let status = "available";
    let capacityLeft = Math.floor(template.capacityTotal * (0.3 + (seed / 100) * 0.6));

    if (isWeekend && (idx === 2 || idx === 7 || idx === 8)) {
      // Weekend peak hours fill faster
      if (seed > 60) {
        status = "booked";
        capacityLeft = 0;
      } else {
        status = "filling_fast";
        capacityLeft = Math.max(8, Math.floor(template.capacityTotal * 0.12));
      }
    } else if (seed > 88) {
      status = "booked";
      capacityLeft = 0;
    } else if (seed > 65) {
      status = "filling_fast";
      capacityLeft = Math.max(12, Math.floor(template.capacityTotal * 0.15));
    } else if (seed < 4 && idx === 0) {
      status = "unavailable";
      capacityLeft = 0;
    }

    return {
      ...template,
      status, // 'available' | 'filling_fast' | 'booked' | 'unavailable'
      capacityLeft,
      dateString: date.toISOString().split("T")[0],
    };
  });
}

/**
 * Returns date booking metadata (isAvailable, isFillingFast, isHoliday, etc.)
 */
export function getDateBookingStatus(date, today = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (d < now) {
    return { isPast: true, status: "disabled", label: "Past" };
  }

  const diffDays = Math.round((d - now) / (1000 * 60 * 60 * 24));

  // Max 60 days advance prototype booking window
  if (diffDays > 60) {
    return { isPast: false, status: "future", label: "Not Open Yet" };
  }

  // Weekends have high footfall
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
];

