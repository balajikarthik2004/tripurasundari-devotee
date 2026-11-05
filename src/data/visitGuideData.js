/**
 * Comprehensive Practical Visit Guide Data
 * Mata Tripura Sundari Temple, Matabari, Udaipur, Tripura
 * 
 * Provides verified information for:
 * 1. How to Reach (Road, Rail, Air, Local Connectivity)
 * 2. Temple Campus Map & Layout
 * 3. Parking & Transport Facilities
 * 4. Pilgrim Facilities & Amenities (Water, Restrooms, Medical, Lockers)
 * 5. Guidelines & Devotional Dress Code
 */

export const reachData = {
  summary: {
    location: "Matabari, Udaipur, Gomati District, Tripura 799114",
    coordinates: "23.5132° N, 91.5036° E",
    nearestCity: "Udaipur (3.5 km)",
    stateCapital: "Agartala (55 km via NH-8)",
    travelTimeAgartala: "Approx. 1 hr 15 mins by car/taxi",
  },
  modes: [
    {
      id: "road",
      title: "By Road (NH-8 Highway)",
      badge: "Most Popular",
      badgeColor: "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]",
      desc: "Smooth 4-lane highway connectivity from Agartala to Udaipur along NH-8 (Agartala-Sabroom Highway).",
      details: [
        { label: "State Buses", value: "TRTC & private buses run every 15–20 mins from Nagerjala Bus Stand, Agartala (Fare: ₹60–₹90)." },
        { label: "Private Taxis / Cabs", value: "Available from Agartala city and airport directly to Matabari temple gate (Fare: ₹1,200–₹1,800)." },
        { label: "Shared Jeeps / Cruisers", value: "Depart frequently from Battala / Nagerjala to Udaipur Central (Fare: ₹80 per seat)." },
      ],
      tip: "Starting early between 06:00 AM – 08:00 AM provides comfortable scenic driving with morning darshan.",
    },
    {
      id: "rail",
      title: "By Train (Indian Railways)",
      badge: "Economical & Fast",
      badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      desc: "Udaipur Tripura Railway Station (UDPU) is situated just 3.5 km from the temple.",
      details: [
        { label: "Nearest Station", value: "Udaipur Tripura (UDPU) — 3.5 km (10 mins drive)." },
        { label: "Train Frequency", value: "Regular DEMU / Express trains connect Agartala (AGTL) to Sabroom via Udaipur (approx. 45–55 mins, ₹30–₹70)." },
        { label: "Station Transit", value: "Auto-rickshaws and eco-friendly e-rickshaws are available 24/7 outside the station (₹20 shared / ₹80 reserved)." },
      ],
      tip: "Morning DEMU from Agartala arrives conveniently before 09:00 AM, allowing participation in Madhyanha Bhog.",
    },
    {
      id: "air",
      title: "By Air (Flights)",
      badge: "For Outstation Devotees",
      badgeColor: "bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]",
      desc: "Maharaja Bir Bikram (MBB) International Airport in Agartala (IXA) connects major Indian metro cities.",
      details: [
        { label: "Nearest Airport", value: "MBB Airport, Agartala (IXA) — 65 km (approx. 1 hr 30 mins drive)." },
        { label: "Direct Connections", value: "Direct non-stop daily flights from Kolkata, Guwahati, New Delhi, Bengaluru, and Chennai." },
        { label: "Airport Taxi Service", value: "Prepaid taxi counters and pre-booked private rentals available at arrival terminal direct to Matabari." },
      ],
      tip: "Kolkata to Agartala flight takes only 45 minutes; combine with a prepaid cab for a smooth half-day pilgrimage.",
    },
  ],
  distances: [
    { city: "Agartala (State Capital)", distance: "55 km", time: "1 hr 15 mins", via: "NH-8 Highway" },
    { city: "Udaipur Town Center", distance: "3.5 km", time: "8 mins", via: "Matabari Road" },
    { city: "MBB Airport (IXA)", distance: "65 km", time: "1 hr 30 mins", via: "Agartala Bypass & NH-8" },
    { city: "Kailashahar (Unakoti)", distance: "190 km", time: "5 hrs", via: "NH-8 & NH-208" },
    { city: "Sabroom (South Border)", distance: "78 km", time: "1 hr 40 mins", via: "NH-8 Highway" },
    { city: "Dhaka (Bangladesh)", distance: "145 km", time: "4 hrs", via: "Akhaura ICP Border Cross" },
  ],
};

export const templeMapData = {
  title: "Temple Campus Layout & Landmark Zones",
  subtitle: "Explore the sacred 500-year Kurma Peeth sanctum complex and Kalyan Sagar",
  landmarks: [
    {
      id: "sanctum",
      name: "Main Sanctum (Garbhagriha)",
      category: "Sanctum",
      badge: "Core Holy Shrine",
      desc: "Built 1501 CE by Maharaja Dhanya Manikya atop sacred tortoise-shaped Kurma Peeth. Enshrines Maa Kali as Shoroshi (Tripura Sundari) along with Chhoto-Ma idol.",
      timings: "04:00 AM – 10:00 PM",
      dressCodeRequired: true,
      icon: "Landmark",
    },
    {
      id: "natmandir",
      name: "Natmandir & Assembly Hall",
      category: "Prayer Hall",
      badge: "Covered Pavilion",
      desc: "Spacious pillared devotional pavilion directly facing the Garbhagriha for congregational prayers, kirtans, and awaiting aarti.",
      timings: "Open all day during temple hours",
      dressCodeRequired: true,
      icon: "Building2",
    },
    {
      id: "kalyan_sagar",
      name: "Kalyan Sagar Sacred Lake",
      category: "Sacred Water",
      badge: "6.4 Acres Tirtha",
      desc: "Historic sacred lake immediately adjoining the temple. Revered home to ancient Bostami softshell turtles. Pilgrim bathing ghats located along western bank.",
      timings: "Sunrise to Sunset",
      dressCodeRequired: false,
      icon: "Waves",
    },
    {
      id: "bhog_ghar",
      name: "Annabhog & Bhog Distribution",
      category: "Prasad",
      badge: "Bhog Coupons 8–10 AM",
      desc: "Consecrated afternoon Mahaprasad hall. Devotees receive freshly prepared khichuri bhog, payesh, and seasonal preparations.",
      timings: "Bhog served 11:30 AM – 02:00 PM",
      dressCodeRequired: false,
      icon: "Utensils",
    },
    {
      id: "peda_stalls",
      name: "GI Matabari Peda Stalls",
      category: "Prasad & Sweets",
      badge: "GI Certified Heritage",
      desc: "Government-certified cooperative counters selling authentic caramelized milk peda prepared strictly with pure cow milk and sugar.",
      timings: "06:00 AM – 09:30 PM",
      dressCodeRequired: false,
      icon: "ShoppingBag",
    },
    {
      id: "queue_complex",
      name: "Pilgrim Queue Complex & Footwear Stand",
      category: "Pilgrim Services",
      badge: "100% Free Service",
      desc: "Covered weather-protected queue lanes with stainless steel railings, RO water dispensers, misting cooling fans, and safe free shoe lockers.",
      timings: "Continuous during temple hours",
      dressCodeRequired: false,
      icon: "Users",
    },
    {
      id: "admin_office",
      name: "Temple Trust Office & Seva Booking",
      category: "Administration",
      badge: "Official Receipts",
      desc: "Official counter for Special Puja bookings, 80G tax-exempt donation certificates, and temple queries.",
      timings: "08:00 AM – 08:00 PM",
      dressCodeRequired: false,
      icon: "FileCheck",
    },
    {
      id: "medical_aid",
      name: "First Aid & Emergency Center",
      category: "Medical & Safety",
      badge: "24/7 Paramedics",
      desc: "Medical post with on-duty paramedics, emergency oxygen, first aid medicines, wheelchair issuance, and ambulance bay.",
      timings: "24 Hours Operational",
      dressCodeRequired: false,
      icon: "ShieldAlert",
    },
  ],
};

export const parkingData = {
  overview: "The temple administration provides designated, well-monitored parking facilities within short walking distance of the sanctum, supplemented by eco-friendly shuttle e-rickshaws.",
  lots: [
    {
      id: "p1",
      name: "P1 Main Pilgrim Parking (South Gate)",
      badge: "Closest to Main Gate",
      badgeColor: "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]",
      distance: "120 meters (2-minute shaded walk)",
      capacity: "250 Four-Wheelers • 500 Two-Wheelers",
      fee: "100% Free (Temple Trust Managed)",
      evCharging: "4 Level-2 22kW AC EV Charging Stations available",
      amenities: ["CCTV 24/7 Security", "RO Drinking Water", "Public Restrooms", "Shaded tree canopy"],
    },
    {
      id: "p2",
      name: "P2 Tourist Bus & Heavy Vehicle Depot (Bypass)",
      badge: "For Large Groups & Buses",
      badgeColor: "bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]",
      distance: "400 meters (Free shuttle available)",
      capacity: "60 Tourist Buses & Maxi Cabs",
      fee: "100% Free for registered pilgrim groups",
      evCharging: "Fast DC Bus Charger available",
      amenities: ["Dedicated Driver Resting Pavilion", "Restrooms", "Free E-Rickshaw Shuttle to Gate 1"],
    },
    {
      id: "p3",
      name: "P3 North Gate Drop-off & Senior Priority Bay",
      badge: "Senior Citizens & Divyangjan",
      badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      distance: "Directly adjacent to North Ramp Entrance",
      capacity: "30 Vehicles (Priority Pass Required)",
      fee: "Free for mobility-assisted pilgrims",
      evCharging: "Standard AC points",
      amenities: ["Direct Wheelchair Ramp access", "Volunteer assistance", "No steps required"],
    },
  ],
  localTransit: [
    { from: "Udaipur Railway Station (UDPU)", mode: "Shared E-Rickshaw", fare: "₹20 / person", time: "10 mins" },
    { from: "Udaipur Railway Station (UDPU)", mode: "Reserved Auto-Rickshaw", fare: "₹80 – ₹100", time: "8 mins" },
    { from: "Udaipur Central Bus Stand", mode: "Shared E-Rickshaw", fare: "₹15 / person", time: "7 mins" },
    { from: "Udaipur Town Hotels", mode: "Cycle Rickshaw / E-Rickshaw", fare: "₹30 – ₹50", time: "10–12 mins" },
  ],
};

export const facilitiesData = {
  title: "On-Campus Pilgrim Amenities & Support",
  subtitle: "Designed to provide comfort, sanitation, and safety for all devotees",
  amenities: [
    {
      id: "water",
      title: "Purified RO Drinking Water",
      icon: "Droplets",
      badge: "Free 24/7",
      desc: "6 automated multi-spout stainless steel drinking water kiosks equipped with commercial RO and UV filtration, serving both chilled and ambient water.",
      location: "Queue Hall, Kalyan Sagar Ghat, Entrance Promenade, and Natmandir exit.",
    },
    {
      id: "restrooms",
      title: "Sanitized Restrooms & Washrooms",
      icon: "Sparkles",
      badge: "Regularly Sanitized",
      desc: "Separate high-hygiene restroom complexes for men and women, featuring modern sanitation, running water, and dedicated Divyangjan accessible cubicles.",
      location: "Near P1 Parking, Kalyan Sagar West Ghat, and Annabhog Bhavan.",
    },
    {
      id: "medical",
      title: "24/7 First Aid & Medical Dispensary",
      icon: "HeartPulse",
      badge: "Doctor / Paramedic on Duty",
      desc: "Equipped with essential emergency medicines, automated BP/sugar monitors, emergency oxygen cylinders, burn kits, and 108 Emergency Ambulance standby.",
      location: "Adjoining Administrative Office near Police Assistance Post.",
    },
    {
      id: "wheelchair",
      title: "Wheelchair & Senior Mobility Support",
      icon: "Accessibility",
      badge: "Complimentary Service",
      desc: "Free standard and motorized wheelchairs available on request with dedicated paved ramp pathways leading from Gate 1 directly into the Natmandir.",
      location: "Information & Helpdesk Counter at Gate 1.",
    },
    {
      id: "cloakroom",
      title: "Free Luggage Locker & Cloakroom",
      icon: "Luggage",
      badge: "Secure Deposit",
      desc: "Devotees travelling with backpacks, suitcases, and digital gadgets can safely deposit belongings in tokenized lockers before joining the sanctum queue.",
      location: "Left wing of Main Entrance Gate 1.",
    },
    {
      id: "shoe_stall",
      title: "Free Pilgrim Footwear Depository",
      icon: "Footprints",
      badge: "Token System",
      desc: "Managed shoe depository with organized numbered pigeon-holes. Please collect your brass or token card when depositing footwear.",
      location: "Entrance gates 1 and 2.",
    },
    {
      id: "baby_care",
      title: "Mother & Baby Feeding Room",
      icon: "Baby",
      badge: "Private & Air-Cooled",
      desc: "Quiet, air-conditioned mother-and-child feeding lounge with comfortable chairs, diaper changing table, and warm water facility.",
      location: "Adjacent to Yatri Rest Pavilion.",
    },
    {
      id: "lost_found",
      title: "Lost & Found / Pilgrim Helpline",
      icon: "Megaphone",
      badge: "Public Address System",
      desc: "Central public address system operating in Bengali, Hindi, and English for missing person announcements, lost valuables, and general assistance.",
      location: "Central Temple Administration Tower.",
    },
  ],
};

export const guidelinesData = {
  title: "Devotional Guidelines & Temple Dress Code",
  subtitle: "Upholding the sacred traditions, sanctity, and reverence of Mata Tripura Sundari",
  dressCode: {
    title: "Prescribed Devotional Attire",
    importance: "Mata Tripura Sundari Temple is a revered historic Shakti Peetha. Devotees are requested to wear modest, respectful traditional Indian attire.",
    men: {
      allowed: ["Dhoti and Kurta", "Pyjama and Kurta", "Formal full trousers with shirt/t-shirt"],
      prohibited: ["Shorts / Bermuda", "Sleeveless vests / tank tops", "Torn or offensive graphic clothing", "Lungis inside inner sanctum"],
    },
    women: {
      allowed: ["Saree with blouse", "Salwar Kameez with dupatta", "Churidar / Kurtis / modest traditional attire"],
      prohibited: ["Short dresses or miniskirts", "Sleeveless tops", "Torn jeans or transparent fabrics"],
    },
  },
  rules: [
    {
      id: "photography",
      title: "Photography Restrictions",
      badge: "Strictly Enforced",
      badgeColor: "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]",
      desc: "Photography and videography are strictly prohibited inside the inner Garbhagriha to maintain sacred sanctity. General photography in the outer complex and Kalyan Sagar is allowed.",
      icon: "CameraOff",
    },
    {
      id: "mobiles",
      title: "Mobile Phones on Silent",
      badge: "Devotional Silence",
      badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      desc: "Please switch mobile phones to silent mode or switch off before entering the Natmandir and queue. Free safe lockers are available at Gate 1.",
      icon: "SmartphoneNfc",
    },
    {
      id: "lake_care",
      title: "Sacred Kalyan Sagar & Turtle Care",
      badge: "Ecological Conservation",
      badgeColor: "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]",
      desc: "Never throw plastic bags, soaps, shampoo, or chemical items into the sacred lake. To feed the holy Bostami turtles, only purchase approved puffed rice (muri) from authorized vendors.",
      icon: "Waves",
    },
    {
      id: "offerings",
      title: "Pure Puja Offerings & Receipts",
      badge: "Official Trust Verification",
      badgeColor: "bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]",
      desc: "Devotees may offer fresh red hibiscus garlands, pure peda, and incense. Please beware of unauthorized touts and always collect computerized official receipts for all sevas.",
      icon: "ReceiptCheck",
    },
    {
      id: "cleanliness",
      title: "Cleanliness & Swachh Mandir",
      badge: "Plastic-Free Complex",
      badgeColor: "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]",
      desc: "The entire 5-acre temple complex is a single-use plastic-free, tobacco-free, and gutkha-free sacred zone. Please use designated color-coded waste bins.",
      icon: "Trash2",
    },
  ],
};

