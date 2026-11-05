/**
 * Mata Tripura Sundari Temple — Crowd Heat Map & Visitor Guidance Data
 * Matabari, Udaipur, Tripura
 * 
 * Devotee-facing visitor crowd assistance data.
 * IMPORTANT: Strictly illustrative demo simulation data for devotee orientation.
 * NOT actual live sensor, camera, or CCTV detection data.
 */

export const DEMO_NOTICE = "Demo Crowd Data — Not Live";
export const DEMO_DISCLAIMER =
  "Illustrative visitor density and wait-time estimations for pilgrimage planning. Official automated sensor tracking is planned under the temple digitalization initiative.";

/**
 * Crowd status level configuration
 */
export const crowdLevels = {
  low: {
    key: "low",
    label: "Less Crowded",
    color: "#16A34A",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-300",
    badgeBg: "bg-emerald-100",
    fillColor: "rgba(34, 197, 94, 0.28)",
    strokeColor: "#16A34A",
    dotColor: "bg-emerald-500",
  },
  moderate: {
    key: "moderate",
    label: "Moderate",
    color: "#D97706",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-300",
    badgeBg: "bg-amber-100",
    fillColor: "rgba(245, 158, 11, 0.32)",
    strokeColor: "#D97706",
    dotColor: "bg-amber-500",
  },
  high: {
    key: "high",
    label: "Crowded",
    color: "#DC2626",
    bgColor: "bg-rose-50",
    textColor: "text-rose-800",
    borderColor: "border-rose-300",
    badgeBg: "bg-rose-100",
    fillColor: "rgba(239, 68, 68, 0.35)",
    strokeColor: "#DC2626",
    dotColor: "bg-rose-500",
  },
};

/**
 * 9 Key Temple Zones across the Matabari campus
 */
export const templeZones = [
  {
    id: "sanctum",
    name: "Main Tripura Sundari Shrine",
    shortName: "Sanctum",
    icon: "Landmark",
    category: "Sacred Shrine",
    locationDesc: "Authentic 1501 CE Kurma Peeth sanctum. West-facing main entrance & North exit door.",
    svg: {
      type: "rect",
      x: 390,
      y: 220,
      width: 140,
      height: 120,
      rx: 16,
    },
    labelPos: { x: 460, y: 280 },
    states: {
      morning: {
        level: "high",
        occupancy: 82,
        waitTime: "25–35 mins",
        tip: "Morning Mangala Aarti phase sees maximum devotee rush. Move steadily through the barricades.",
      },
      afternoon: {
        level: "moderate",
        occupancy: 48,
        waitTime: "10–15 mins",
        tip: "Ideal time for peaceful darshan with minimal queue waiting inside the sanctum.",
      },
      evening: {
        level: "high",
        occupancy: 78,
        waitTime: "30–40 mins",
        tip: "Sandhya Aarti crowd peaks between 06:30 PM – 07:45 PM. Senior devotees advised to use Gate 1 ramp.",
      },
    },
  },
  {
    id: "queue_complex",
    name: "Covered Darshan Queue Complex",
    shortName: "Queue Complex",
    icon: "Users",
    category: "Visitor Movement",
    locationDesc: "Sheltered steel queue railings along the West-to-North shrine parikrama approach.",
    svg: {
      type: "rect",
      x: 270,
      y: 230,
      width: 100,
      height: 100,
      rx: 12,
    },
    labelPos: { x: 320, y: 280 },
    states: {
      morning: {
        level: "high",
        occupancy: 75,
        waitTime: "20–30 mins queue",
        tip: "Queue moving at normal flow. Drinking water stations available at every 40-meter mark.",
      },
      afternoon: {
        level: "low",
        occupancy: 30,
        waitTime: "5–8 mins queue",
        tip: "Queue railings are mostly clear. Fast access directly toward the West entrance door.",
      },
      evening: {
        level: "moderate",
        occupancy: 65,
        waitTime: "15–25 mins queue",
        tip: "Moderate queue buildup for the evening Sandhya deepa darshan.",
      },
    },
  },
  {
    id: "natmandir",
    name: "Natmandir Prayer Pavilion",
    shortName: "Natmandir",
    icon: "Building2",
    category: "Congregational Hall",
    locationDesc: "Open-sided columned pavilion North of the sanctum for kirtan, sitting & silent prayer.",
    svg: {
      type: "rect",
      x: 390,
      y: 90,
      width: 140,
      height: 100,
      rx: 12,
    },
    labelPos: { x: 460, y: 140 },
    states: {
      morning: {
        level: "moderate",
        occupancy: 55,
        waitTime: "Walk-in seating",
        tip: "Devotees gathering for morning bhajans. Space available for peaceful sitting along outer bays.",
      },
      afternoon: {
        level: "low",
        occupancy: 22,
        waitTime: "Ample open space",
        tip: "Quiet and airy hall; excellent for resting after darshan under ceiling fans.",
      },
      evening: {
        level: "moderate",
        occupancy: 58,
        waitTime: "Walk-in seating",
        tip: "Evening aarti singing begins at 06:45 PM. Devotees may sit facing the sanctum portal.",
      },
    },
  },
  {
    id: "kalyansagar_promenade",
    name: "Kalyansagar Lake & Ghats",
    shortName: "Kalyan Sagar",
    icon: "Waves",
    category: "Sacred Lake & Walkway",
    locationDesc: "Historic 6.4-acre sacred lake directly East of temple. Shaded promenade, ghats & turtle feeding points.",
    svg: {
      type: "path",
      d: "M 570 80 Q 750 60 760 210 Q 770 380 730 420 Q 640 440 570 410 Q 550 250 570 80 Z",
    },
    labelPos: { x: 660, y: 250 },
    states: {
      morning: {
        level: "low",
        occupancy: 28,
        waitTime: "Open promenade",
        tip: "Pleasant morning breeze. Devotees feeding holy Bostami turtles puffed rice (muri) at the main ghat.",
      },
      afternoon: {
        level: "low",
        occupancy: 18,
        waitTime: "Very peaceful",
        tip: "Serene lakeside walkway with shady banyan trees and seating benches. Relaxing experience.",
      },
      evening: {
        level: "moderate",
        occupancy: 52,
        waitTime: "Open access",
        tip: "Devotees lighting clay diyas along the stone steps at sunset. Camera photography welcome.",
      },
    },
  },
  {
    id: "welcome_gate",
    name: "Main Welcome Arch & West Plaza",
    shortName: "Welcome Gate",
    icon: "DoorOpen",
    category: "Entrance & Security",
    locationDesc: "Primary pedestrian entrance approach from the highway. Security frisking & shoe stands.",
    svg: {
      type: "rect",
      x: 100,
      y: 230,
      width: 130,
      height: 100,
      rx: 12,
    },
    labelPos: { x: 165, y: 280 },
    states: {
      morning: {
        level: "moderate",
        occupancy: 58,
        waitTime: "2–4 mins security check",
        tip: "Free footwear counter operating smoothly. Keep bags compact for quick metal detector passage.",
      },
      afternoon: {
        level: "low",
        occupancy: 25,
        waitTime: "Instant entry",
        tip: "Very light entry traffic; zero delay at the security checkpoint and footwear counter.",
      },
      evening: {
        level: "moderate",
        occupancy: 62,
        waitTime: "3–5 mins security check",
        tip: "Steady arrival of local and outstation pilgrims for evening temple illumination.",
      },
    },
  },
  {
    id: "prasad_bhog",
    name: "Annabhog Hall & Prasad Counter",
    shortName: "Annabhog Hall",
    icon: "Utensils",
    category: "Community Dining",
    locationDesc: "Devotee dining hall South of sanctum serving blessed Khichuri bhog daily from 11:30 AM to 02:30 PM.",
    svg: {
      type: "rect",
      x: 390,
      y: 370,
      width: 140,
      height: 80,
      rx: 12,
    },
    labelPos: { x: 460, y: 410 },
    states: {
      morning: {
        level: "low",
        occupancy: 20,
        waitTime: "Bhog coupon booking open",
        tip: "Hall opens at 11:30 AM. Bhog coupons can be booked early at the trust counter.",
      },
      afternoon: {
        level: "high",
        occupancy: 85,
        waitTime: "15–20 mins batch seating",
        tip: "Peak dining hour. Seating organized in continuous orderly batches of 200 devotees.",
      },
      evening: {
        level: "low",
        occupancy: 15,
        waitTime: "Closed for night",
        tip: "Lunch bhog concluded. Evening dry prasad packets available at the kiosk outside.",
      },
    },
  },
  {
    id: "peda_market",
    name: "GI Matabari Peda & Puja Arcade",
    shortName: "Peda Arcade",
    icon: "ShoppingBag",
    category: "Offerings & Souvenirs",
    locationDesc: "Authorized heritage dairy stalls selling certified Matabari Milk Peda, red chunri, sindoor & flowers.",
    svg: {
      type: "rect",
      x: 230,
      y: 360,
      width: 130,
      height: 90,
      rx: 12,
    },
    labelPos: { x: 295, y: 405 },
    states: {
      morning: {
        level: "moderate",
        occupancy: 50,
        waitTime: "3–5 mins per stall",
        tip: "Freshly made hot milk peda available. Look for official Trust GI certified signage.",
      },
      afternoon: {
        level: "low",
        occupancy: 28,
        waitTime: "Immediate service",
        tip: "Stalls are calm. Easy to sample and pack boxed sweets for travel.",
      },
      evening: {
        level: "moderate",
        occupancy: 60,
        waitTime: "4–6 mins per stall",
        tip: "Devotees purchasing evening prasad offerings before entering the sanctum.",
      },
    },
  },
  {
    id: "visitor_facilities",
    name: "Pilgrim Facilities & Restrooms",
    shortName: "Facilities & Restrooms",
    icon: "ShieldCheck",
    category: "Visitor Amenities",
    locationDesc: "Clean public restrooms, drinking RO water coolers, cloakroom & primary first-aid center.",
    svg: {
      type: "rect",
      x: 100,
      y: 90,
      width: 130,
      height: 100,
      rx: 12,
    },
    labelPos: { x: 165, y: 140 },
    states: {
      morning: {
        level: "low",
        occupancy: 25,
        waitTime: "No queue",
        tip: "Water stations and clean restrooms operating with continuous maintenance attendants.",
      },
      afternoon: {
        level: "low",
        occupancy: 18,
        waitTime: "No queue",
        tip: "Clean and uncrowded. Cloakroom luggage deposit counter has zero wait.",
      },
      evening: {
        level: "low",
        occupancy: 30,
        waitTime: "Minimal (< 2 mins)",
        tip: "All pilgrim amenities accessible. Volunteer helpdesk stationed near the arch.",
      },
    },
  },
  {
    id: "lake_parking",
    name: "Pilgrim Parking & Transport Bay",
    shortName: "Lake Parking Bay",
    icon: "Car",
    category: "Transport & Parking",
    locationDesc: "Designated 4-wheeler & 2-wheeler parking slots on the outer lake bank with auto-rickshaw stand.",
    svg: {
      type: "rect",
      x: 230,
      y: 470,
      width: 480,
      height: 48,
      rx: 10,
    },
    labelPos: { x: 470, y: 494 },
    states: {
      morning: {
        level: "moderate",
        occupancy: 55,
        waitTime: "Ample slots available",
        tip: "North Lake parking has over 60 free bays available. Managed by traffic volunteers.",
      },
      afternoon: {
        level: "low",
        occupancy: 32,
        waitTime: "Easy parking",
        tip: "Plenty of shaded parking slots near the western perimeter wall.",
      },
      evening: {
        level: "moderate",
        occupancy: 64,
        waitTime: "Park in Outer Bay 2",
        tip: "Parking bays filling up for evening illumination. Arrive 20 mins prior.",
      },
    },
  },
];

/**
 * Dynamic Guidance Presets by Time of Day
 */
export const demoTimePresets = [
  {
    id: "morning",
    label: "Morning Peak (07:00 AM – 10:30 AM)",
    shortLabel: "Morning Aarti",
    timeWindow: "07:00 AM – 10:30 AM",
    overallStatus: "moderate",
    overallLabel: "Moderate Pilgrim Flow",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    darshanQueueWait: "20–35 mins",
    darshanQueueStatus: "Normal Steady Flow",
    recommendedTime: "02:00 PM – 04:00 PM (Lighter Flow)",
    recommendation:
      "Darshan queue is currently at normal morning flow. Consider visiting the serene Kalyansagar lake promenade or enjoying morning peda stalls while the main queue clears.",
    lastUpdated: "Demo simulation • 08:45 AM snapshot",
  },
  {
    id: "afternoon",
    label: "Afternoon Lull (01:00 PM – 04:30 PM)",
    shortLabel: "Afternoon (Optimal)",
    timeWindow: "01:00 PM – 04:30 PM",
    overallStatus: "low",
    overallLabel: "Lighter Crowd (Optimal Visit)",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    darshanQueueWait: "10–15 mins",
    darshanQueueStatus: "Smooth Fast Darshan",
    recommendedTime: "Current Window (01:00 PM – 04:30 PM)",
    recommendation:
      "Excellent time for darshan! Wait times are minimal across the sanctum and covered queue. Annabhog hall is open South of the sanctum.",
    lastUpdated: "Demo simulation • 02:15 PM snapshot",
  },
  {
    id: "evening",
    label: "Evening Aarti Peak (06:00 PM – 08:30 PM)",
    shortLabel: "Evening Sandhya Aarti",
    timeWindow: "06:00 PM – 08:30 PM",
    overallStatus: "high",
    overallLabel: "High Devotee Turnout",
    badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
    darshanQueueWait: "30–45 mins",
    darshanQueueStatus: "Aarti Queue Buildup",
    recommendedTime: "Tomorrow 01:30 PM – 04:00 PM",
    recommendation:
      "Sanctum and main plaza are crowded for Sandhya Aarti and lake lamp lighting. Senior citizens are advised to use Gate 1 dedicated accessibility ramp.",
    lastUpdated: "Demo simulation • 07:10 PM snapshot",
  },
];

/**
 * Returns complete crowd snapshot for a given time preset
 */
export function getCrowdSnapshot(presetId = "morning") {
  const preset =
    demoTimePresets.find((p) => p.id === presetId) || demoTimePresets[0];

  const enrichedZones = templeZones.map((z) => {
    const state = z.states[preset.id] || z.states.morning;
    return {
      ...z,
      currentLevel: state.level,
      occupancy: state.occupancy,
      waitTime: state.waitTime,
      tip: state.tip,
    };
  });

  const lessCrowdedZones = enrichedZones.filter((z) => z.currentLevel === "low");
  const moderateZones = enrichedZones.filter((z) => z.currentLevel === "moderate");
  const crowdedZones = enrichedZones.filter((z) => z.currentLevel === "high");

  return {
    preset,
    zones: enrichedZones,
    counts: {
      low: lessCrowdedZones.length,
      moderate: moderateZones.length,
      high: crowdedZones.length,
      total: enrichedZones.length,
    },
    lessCrowdedZones,
    moderateZones,
    crowdedZones,
  };
}

