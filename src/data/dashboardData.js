/**
 * Mata Tripura Sundari Temple — Devotee Portal Data
 * Matabari, Udaipur, Tripura (One of the 51 Shakti Peethas)
 * 
 * Note: Timings, crowd figures, and festival dates are prototype preview data
 * subject to official temple administration confirmation.
 */

export const templeInfo = {
  name: "Mata Tripura Sundari Temple",
  shortName: "Tripura Sundari",
  tagline: "One of the 51 Shakti Peethas",
  location: "Matabari, Udaipur, Tripura",
  fullLocation: "Matabari, Udaipur, Gomati District, Tripura 799114",
  description:
    "Seek the divine blessings of Maa Tripura Sundari, where faith, tradition and devotion meet in a timeless abode.",
  blessingQuote:
    "May Maa Tripura Sundari bless you with peace, prosperity and well-being.",
  sanskritGreeting: "॥ जय माँ त्रिपुरा सुन्दरी ॥",
  bengaliGreeting: "॥ জয় মা ত্রিপুরেশ্বরী ॥",
};

export const navigationItems = [
  { id: "home", label: "Home", icon: "Home", active: true, href: "#" },
  { id: "darshan", label: "Darshan", icon: "Eye", active: false, href: "#" },
  { id: "pooja", label: "Pooja & Seva", icon: "Flame", active: false, href: "#" },
  { id: "donations", label: "Donations", icon: "Heart", active: false, href: "#" },
  { id: "prasad", label: "Prasad & Store", icon: "ShoppingBag", active: false, href: "#" },
  { id: "accommodation", label: "Accommodation", icon: "Bed", active: false, href: "#" },
  { id: "info", label: "Temple Information", icon: "Info", active: false, href: "#" },
  { id: "events", label: "Events & Festivals", icon: "CalendarDays", active: false, href: "#" },
  { id: "guide", label: "Visit Guide", icon: "MapPin", active: false, href: "#" },
];

export const heroSlides = [
  {
    id: "exterior",
    title: "Main Temple Exterior",
    subtitle: "Sacred Daylight View",
    image: "/assets/hero/temple-exterior.jpg",
    fallback: "/assets/temple-hero-wide.jpg",
    alt: "Mata Tripura Sundari Temple Shikhara in Daylight",
  },
  {
    id: "evening",
    title: "Spiritual Temple Atmosphere",
    subtitle: "Evening Devotional Ambience",
    image: "/assets/hero/temple-evening.jpg",
    fallback: "/assets/temple-hero-wide.jpg",
    alt: "Mata Tripura Sundari Temple illuminated in Evening Twilight",
  },
  {
    id: "heritage",
    title: "Temple Heritage and Architecture",
    subtitle: "500-Year Historic Sanctum",
    image: "/assets/hero/temple-heritage.jpg",
    fallback: "/assets/temple-hero.jpg",
    alt: "Historic Ek-Ratna Architecture of Mata Tripura Sundari Temple",
  },
];

export const essentialStats = [
  {
    id: "timings",
    icon: "Clock",
    category: "TEMPLE TIMINGS",
    title: "Temple Timings",
    value: "04:00 AM – 10:00 PM",
    badge: "Daily",
    badgeType: "neutral",
    subtitle: "Mangala Aarti 04:30 AM • Sandhya Aarti 07:00 PM",
    linkText: "View Schedule",
  },
  {
    id: "slots",
    icon: "CalendarCheck",
    category: "DARSHAN SLOTS",
    title: "Available Free Slots",
    value: "1,280",
    unit: "Slots Open Today",
    badge: "Booking Open",
    badgeType: "live",
    subtitle: "100% Free booking across 12 daily time windows",
    linkText: "Book Free Slot",
  },
  {
    id: "wait-time",
    icon: "Hourglass",
    category: "DARSHAN WAIT TIME",
    title: "Queue Wait Time",
    value: "20 – 35",
    unit: "mins queue wait",
    badge: "Normal Flow",
    badgeType: "live",
    subtitle: "Current estimated queue time for general darshan",
    linkText: "Queue Details",
  },
];

export const templeServices = [
  {
    id: "darshan",
    title: "Darshan Booking",
    description: "Plan your temple visit and explore darshan information.",
    image: "/assets/darshan.jpg",
    icon: "Eye",
    tag: "Free Access",
  },
  {
    id: "pooja",
    title: "Pooja & Seva",
    description: "Explore available rituals and special poojas.",
    image: "/assets/pooja.jpg",
    icon: "Flame",
    tag: "Rituals",
  },
  {
    id: "donations",
    title: "Donations",
    description: "Support temple services through official channels.",
    image: "/assets/donations.jpg",
    icon: "HeartHandshake",
    tag: "80G Benefit",
  },
  {
    id: "annabhog",
    title: "Annabhog",
    description: "Learn about Annabhog and sponsorship options.",
    image: "/assets/annabhog.jpg",
    fallback: "/assets/prasad.jpg",
    icon: "Utensils",
    tag: "Coupons 8–10 AM",
  },
  {
    id: "prasad",
    title: "Prasad & Store",
    description: "Explore GI-tagged peda and other devotional products.",
    image: "/assets/matabari-peda.jpg",
    fallback: "/assets/prasad.jpg",
    icon: "ShoppingBag",
    tag: "GI Certified",
  },
  {
    id: "accommodation",
    title: "Accommodation",
    description: "View information about rooms and facilities.",
    image: "/assets/accommodation.jpg",
    icon: "BedDouble",
    tag: "Dharamshala",
  },
];

export const heritageExperiences = [
  {
    id: "kalyan-sagar",
    title: "Kalyan Sagar",
    subtitle: "Sacred Lake & Bostami Turtle Habitat",
    image: "/assets/kalyan-sagar.jpg",
    fallback: "/assets/temple-hero-wide.jpg",
    description:
      "The 500-year-old sacred 6.4-acre lake on the temple's eastern flank, home to revered Bostami turtles (N-nigricans) and sacred fish. A serene sanctuary of ecological and spiritual devotion.",
    highlights: ["Sacred Bathing Ghats", "Bostami Turtles", "Kurma Peeth Legend"],
    note: "Kurma Seva proposed for eco-conservation",
  },
  {
    id: "matabari-peda",
    title: "Matabari Peda",
    subtitle: "Tripura's GI-Tagged Sacred Sweet",
    image: "/assets/matabari-peda.jpg",
    fallback: "/assets/prasad.jpg",
    description:
      "Crafted exclusively from pure milk and sugar through traditional slow-reduction by local artisans for over a century. Awarded Geographical Indication (GI) status in 2024 as Tripura's signature prasad.",
    highlights: ["GI-Tagged 2024", "Pure Milk & Sugar", "86 Dedicated Stalls"],
    note: "Explore prasad and sacred products",
  },
];

export const upcomingFestival = {
  tag: "UPCOMING FESTIVAL",
  title: "Diwali Mela",
  duration: "Date to be announced",
  dateNote: "Official dates to be confirmed by administration",
  description:
    "Experience the grand celebration of Matabari Diwali Mela with special poojas, Deepotsav illuminating Kalyan Sagar, and traditional cultural fairs.",
  actionText: "View Festival Details",
  image: "/assets/diwali-diyas.jpg",
  isSample: false,
};

export const visitGuideItems = [
  {
    id: "reach",
    title: "How to Reach",
    subtitle: "55 km from Agartala • Road NH-8 & Udaipur Rail (UDPU)",
    icon: "Car",
    action: "Directions",
  },
  {
    id: "map",
    title: "Temple Map",
    subtitle: "Sanctum Sanctorum, Kalyan Sagar Ghats, Prasad Counter",
    icon: "Map",
    action: "View Map",
  },
  {
    id: "parking",
    title: "Parking Information",
    subtitle: "Designated pilgrim vehicle parking with shuttle access",
    icon: "SquareParking",
    action: "Parking Info",
  },
  {
    id: "facilities",
    title: "Facilities (Water, Toilets, Medical)",
    subtitle: "RO drinking water stations, sanitized restrooms, first aid post",
    icon: "ShieldAlert",
    action: "Facilities",
  },
  {
    id: "guidelines",
    title: "Important Guidelines",
    subtitle: "Devotional dress code, mobile restrictions inside sanctum",
    icon: "FileText",
    action: "Guidelines",
  },
];

export const officialAnnouncements = [
  {
    id: 1,
    category: "Schedule",
    badgeType: "announcement",
    title: "Special Puja Schedule for Festive Amavasya",
    description: "Please follow official ritual timings and queue management rules announced for upcoming festive Amavasya darshan.",
    date: "Current Season",
    image: "/assets/temple-hero.jpg",
    action: "darshan",
    isOfficial: true,
  },
  {
    id: 2,
    category: "Festival",
    badgeType: "festival",
    title: "Diwali Mela 2026 Preparations Underway",
    description: "Preparations for the historic Matabari Diwali Mela and evening lighting of 51,000 earthen diyas has commenced.",
    date: "Oct / Nov Season",
    image: "/assets/diwali-diyas.jpg",
    action: "events",
    isOfficial: false,
  },
  {
    id: 3,
    category: "Transit",
    badgeType: "info",
    title: "New Dedicated Parking & Battery Shuttles",
    description: "Clean eco-friendly battery shuttle service is now operational between the outer tourist parking and the North gate.",
    date: "Visitor Update",
    image: "/assets/temple-shuttle.jpg",
    action: "guide",
    isOfficial: true,
  },
  {
    id: 4,
    category: "Ecology",
    badgeType: "conservation",
    title: "Kalyan Sagar Turtle Feeding & Ghat Safety",
    description: "Devotees are requested to offer only approved puffed rice at designated ghats to protect the endangered Bostami turtles.",
    date: "Conservation Notice",
    image: "/assets/kalyan-sagar.jpg",
    action: "info",
    isOfficial: true,
  },
];

export const weatherSample = {
  city: "Udaipur, Tripura",
  temp: "34°C",
  condition: "Sunny & Pleasant",
  note: "Sample illustrative weather",
};
