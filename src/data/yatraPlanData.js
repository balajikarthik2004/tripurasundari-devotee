/**
 * Mata Tripura Sundari Temple - AI Pilgrimage Companion Data
 * Matabari, Udaipur, Gomati District, Tripura
 * 
 * Demonstration data for prototype journey planning.
 * Real travel times and rituals are illustrative planning estimates.
 */

export const quickOriginCities = [
  { city: "Agartala", state: "Tripura", distance: "55 km (~1.5 hrs)" },
  { city: "Kolkata", state: "West Bengal", distance: "Flight to Agartala + Cab" },
  { city: "Guwahati", state: "Assam", distance: "Train / Flight to Agartala" },
  { city: "Silchar", state: "Assam", distance: "Train / Highway Route" },
  { city: "Dhaka", state: "Bangladesh", distance: "Akhaura ICP Border Cross" },
  { city: "New Delhi", state: "Delhi", distance: "Direct Flight to Agartala" },
  { city: "Bengaluru", state: "Karnataka", distance: "Connecting Flight to Agartala" },
];

export const transportModes = [
  { id: "car", label: "Car / Private Taxi", icon: "Car", desc: "Door-to-door convenience via NH-8 highway" },
  { id: "train", label: "Indian Railways", icon: "Train", desc: "Agartala to Udaipur Railway Station (UDPU)" },
  { id: "bus", label: "Public / TRTC Bus", icon: "Bus", desc: "Frequent bus services from Nagerjala Bus Stand" },
  { id: "flight", label: "Flight + Road", icon: "Plane", desc: "Arrive at MBB Airport (IXA), Agartala + taxi" },
  { id: "undecided", label: "Not Decided", icon: "HelpCircle", desc: "Explore options during preparation" },
];

export const travelPaces = [
  { id: "relaxed", label: "Relaxed", desc: "Unrushed darshan, serene lake parikrama, rest breaks" },
  { id: "balanced", label: "Balanced", desc: "Covers sanctum darshan, prasad, and heritage comfortably" },
  { id: "flexible", label: "Flexible", desc: "Spontaneous timings adjusted to queue conditions" },
];

export const pilgrimageInterests = [
  { id: "darshan", label: "Mata Tripura Sundari Darshan", desc: "Sacred inner sanctum blessings & archana" },
  { id: "kalyan_sagar", label: "Kalyan Sagar & Turtle Darshan", desc: "Parikrama of sacred 6.4-acre lake" },
  { id: "heritage", label: "Temple Heritage & History", desc: "500-year Ek-Ratna sanctum built in 1501 CE" },
  { id: "annabhog", label: "Temple Traditions & Annabhog", desc: "Partaking in blessed afternoon temple prasad" },
  { id: "peda", label: "Matabari Peda Tasting", desc: "GI-tagged traditional sweet of condensed milk" },
  { id: "festivals", label: "Festivals & Evening Aarti", desc: "Sandhya Aarti, Deepotsav lamps & devotional chants" },
  { id: "family", label: "Relaxed Family Pilgrimage", desc: "Comfortable pauses, senior seating & kid-safe pace" },
];

export const matabariHighlights = [
  {
    id: "sanctum",
    title: "Mata Tripura Sundari Sanctum",
    subtitle: "51 Shakti Peethas \u2022 Kurma Peeth",
    description: "Built in 1501 CE by Maharaja Dhanya Manikya, housing Maa Kali as Shoroshi. Devotees offer red hibiscus and prayers at the divine lotus feet.",
    image: "/assets/hero/temple-exterior.jpg",
    relevance: "Main pilgrimage objective; general darshan is free daily 04:00 AM \u2013 10:00 PM.",
    navTarget: "darshan",
  },
  {
    id: "lake",
    title: "Kalyan Sagar Sacred Lake",
    subtitle: "6.4 Acres \u2022 Bostami Turtles",
    description: "Spread over 6.4 acres immediately behind the temple, home to hundreds of rare sacred Bostami turtles and large fishes revered by pilgrims.",
    image: "/assets/kalyan-sagar.jpg",
    relevance: "Devotees perform lake parikrama, offering puffed rice (muri) while respecting conservation rules.",
    navTarget: "info",
  },
  {
    id: "peda",
    title: "GI-Tagged Matabari Peda",
    subtitle: "Geographical Indication \u2022 500-Year Tradition",
    description: "Crafted exclusively from pure boiled cow milk and sugar into golden brown pedas, offered as sacred bhog and carried home as divine prasad.",
    image: "/assets/matabari-peda.jpg",
    relevance: "Essential devotional offering available at traditional certified stalls around the temple gate.",
    navTarget: "prasad",
  },
  {
    id: "architecture",
    title: "Ek-Ratna Bengal-Tripuri Architecture",
    subtitle: "Historical Heritage \u2022 Tortoise Mound",
    description: "Distinctive square sanctum with curved Char-Chala roof surmounted by a conical dome, constructed atop a mound resembling the back of a tortoise (Kurma).",
    image: "/assets/hero/temple-heritage.jpg",
    relevance: "Architectural treasure showcasing composite medieval Tripuri craftsmanship.",
    navTarget: "info",
  },
];

export const defaultChecklist = [
  // Before Departure
  { id: "chk-1", category: "beforeDeparture", label: "Confirm travel tickets & transport to Agartala / Udaipur", checked: true },
  { id: "chk-2", category: "beforeDeparture", label: "Carry government Photo IDs (Aadhaar / Voter ID / Passport)", checked: true },
  { id: "chk-3", category: "beforeDeparture", label: "Check Yatri Nivas or local hotel accommodation", checked: false },
  { id: "chk-4", category: "beforeDeparture", label: "Carry cash in modest denominations for local peda & offering stalls", checked: true },
  
  // Temple Visit Preparation
  { id: "chk-5", category: "templeVisit", label: "Review official temple timings (Morning: 04:00 AM \u2013 01:00 PM | Evening: 03:00 PM \u2013 10:00 PM)", checked: true },
  { id: "chk-6", category: "templeVisit", label: "Prepare modest traditional attire suitable for sacred sanctum entry", checked: false },
  { id: "chk-7", category: "templeVisit", label: "Keep slip-on footwear for quick deposit at designated shoe counter", checked: false },
  { id: "chk-8", category: "templeVisit", label: "Review Kalyan Sagar eco-rules (Do not feed non-approved items to turtles)", checked: true },

  // Family & Senior Preparation
  { id: "chk-9", category: "familyPrep", label: "Pack prescribed medicines, water bottles, and weather-appropriate shawls", checked: false },
  { id: "chk-10", category: "familyPrep", label: "Plan slower queue pace and resting breaks near Natmandap for seniors", checked: true },
  { id: "chk-11", category: "familyPrep", label: "Note temple inquiry counter and security post location at Gate 1", checked: false },
];

export const travelReminders = [
  {
    title: "Temple Timings & Ritual Hours",
    text: "Sanctum opens 04:00 AM for Mangala Aarti. Bhog offering break occurs from 01:00 PM to 03:00 PM during which the sanctum doors remain closed.",
    severity: "info",
  },
  {
    title: "Free General Darshan",
    text: "General queue darshan is entirely free for all devotees. No paid VIP ticket is mandatory to seek the blessings of Maa Tripura Sundari.",
    severity: "devotional",
  },
  {
    title: "Kalyan Sagar Conservation Protocol",
    text: "Bostami softshell turtles are endangered. Please do not feed fried food, plastic wrappers, or non-approved items into the sacred waters.",
    severity: "alert",
  },
  {
    title: "Footwear & Belongings Management",
    text: "Complimentary shoe custody counters operate near Main Entrance Gate No. 1. Leather belts and large bags are advised to be left in vehicle/cloakroom.",
    severity: "info",
  },
];

/**
 * Generator function returning a customized demo itinerary
 */
export function generateDemoItinerary(preferences) {
  const isOneDay = preferences.visitDuration === "one-day";
  const hasSeniors = Number(preferences.seniors || 0) > 0;
  const origin = preferences.originCity || "Agartala";
  const mode = preferences.travelMode || "car";

  if (isOneDay) {
    return {
      type: "1-Day Sacred Yatra",
      summary: `Day-long pilgrimage from ${origin} to Matabari designed for ${preferences.totalDevotees || 2} devotee(s) with ${preferences.pace || "balanced"} pacing.`,
      days: [
        {
          dayNumber: 1,
          dateLabel: preferences.startDate || "Pilgrimage Day",
          title: "Complete Matabari Darshan & Heritage Yatra",
          items: [
            {
              time: "06:30 AM",
              activity: "Departure from " + origin,
              duration: "1.5 \u2013 2 hrs",
              category: "Travel",
              description: `Begin journey towards Matabari, Udaipur via NH-8 ${mode === "train" ? "by scenic railway" : "by road"}. Morning breeze offers a refreshing start.`,
              tips: "Start early to avoid Udaipur highway traffic and reach before mid-morning temple rush.",
            },
            {
              time: "08:30 AM",
              activity: "Arrival at Matabari & Footwear Deposit",
              duration: "30 mins",
              category: "Preparation",
              description: "Arrive at temple vicinity. Deposit footwear at Gate 1 counter, freshen up, and procure fresh red hibiscus garland and peda offering.",
              tips: "Authorized peda shops are located along the front paved courtyard.",
            },
            {
              time: "09:00 AM",
              activity: "General Darshan of Maa Tripura Sundari",
              duration: "1 hr \u2013 1.5 hrs",
              category: "Darshan",
              description: "Enter sanctum queue via covered queue shed. Seek darshan of Maa Kali in Shoroshi form atop the Kurma Peeth. Offer archana and receive charanamrita.",
              tips: hasSeniors ? "Senior devotees can request queue assistance from sebaits near the Natmandap gate." : "Keep offerings ready in cane basket for the priest.",
            },
            {
              time: "10:45 AM",
              activity: "Kalyan Sagar Parikrama & Turtle Darshan",
              duration: "45 mins",
              category: "Sacred Lake",
              description: "Walk down the stone ghats of the 6.4-acre Kalyan Sagar. Offer reverent pranam to the sacred Bostami softshell turtles and observe peaceful waters.",
              tips: "Stay on the stone paved ghat steps; do not touch the turtles directly.",
            },
            {
              time: "11:45 AM",
              activity: "Temple Complex Heritage & Natmandap",
              duration: "45 mins",
              category: "Heritage",
              description: "Explore the 16th-century Ek-Ratna Char-Chala masonry, inscriptions of Maharaja Dhanya Manikya, and the traditional courtyard.",
              tips: "Photography is restricted inside the inner Garbhagriha.",
            },
            {
              time: "12:30 PM",
              activity: "Mahaprasad / Annabhog Lunch",
              duration: "1 hr",
              category: "Prasad",
              description: "Partake in traditional blessed Annabhog (khichuri, labra, payesh) at the temple Annadanam hall or nearby authentic Bengali bhojanalaya.",
              tips: "Annabhog coupons are issued at the administrative counter before 11:30 AM.",
            },
            {
              time: "02:00 PM",
              activity: "Rest & Matabari Peda Tasting",
              duration: "1 hr",
              category: "Rest & Sweet",
              description: "Rest under the shaded banyan pavilions. Sample freshly warm GI-tagged Matabari pedas packed with authentic cardamom and pure mawa aroma.",
              tips: "Ask for airtight gift boxes if carrying peda for relatives.",
            },
            {
              time: "03:30 PM",
              activity: "Optional Visit to Udaipur Heritage (Bhubaneswari Temple)",
              duration: "1.5 hrs",
              category: "Exploration",
              description: "Visit nearby 17th-century Bhubaneswari Temple on the banks of Gomati River, immortalized in Rabindranath Tagore's 'Rajarshi'.",
              tips: "Located just 3 km from Matabari; easily accessible by auto-rickshaw.",
            },
            {
              time: "05:00 PM",
              activity: "Return Journey to " + origin,
              duration: "1.5 \u2013 2 hrs",
              category: "Return",
              description: `Conclude sacred yatra with divine blessings and journey back safely to ${origin}.`,
              tips: "Ensure all souvenirs, holy red thread (raksha sutra), and prasad boxes are safely stored.",
            },
          ],
        },
      ],
    };
  }

  // Multi-Day Itinerary (2 Days)
  return {
    type: "2-Day Devotional Pilgrimage",
    summary: `Complete devotional retreat from ${origin} to Matabari designed for ${preferences.totalDevotees || 2} devotee(s) featuring both Morning Darshan and Sandhya Aarti.`,
    days: [
      {
        dayNumber: 1,
        dateLabel: preferences.startDate || "Day 1",
        title: "Journey, Arrival, Twilight Darshan & Sandhya Aarti",
        items: [
          {
            time: "09:00 AM",
            activity: "Departure from " + origin,
            duration: "2 hrs",
            category: "Travel",
            description: `Scenic journey towards Udaipur, Tripura through Gomati district greenery.`,
            tips: "Carry valid photo ID for Yatri Nivas check-in.",
          },
          {
            time: "11:30 AM",
            activity: "Arrival & Check-in at Yatri Nivas / Hotel",
            duration: "1 hr",
            category: "Stay",
            description: "Check in to devotee accommodation, wash up, unpack, and take brief rest.",
            tips: "Temple Yatri Nivas is located within short walking distance of Gate 1.",
          },
          {
            time: "01:00 PM",
            activity: "Pure Vegetarian Satvik Lunch",
            duration: "1 hr",
            category: "Prasad",
            description: "Traditional satvik thali meal at Udaipur town or temple bhojanalaya.",
            tips: "Keep meals light before evening temple visit.",
          },
          {
            time: "03:30 PM",
            activity: "Explore Kalyan Sagar & Lake Ghats",
            duration: "1.5 hrs",
            category: "Sacred Lake",
            description: "Serene lakeside parikrama during gentle afternoon light. Feed sacred fish and observe the historic temple reflection.",
            tips: "The stone steps can be slippery; hold handrails.",
          },
          {
            time: "05:30 PM",
            activity: "Evening General Darshan & Sandhya Aarti",
            duration: "2 hrs",
            category: "Devotion",
            description: "Witness the magnificent Sandhya Deepotsav with reverberating dhak drums, conch shells, and divine camphor aarti.",
            tips: "Arrive at Natmandap by 05:45 PM for an unobstructed view of the evening aarti.",
          },
          {
            time: "08:00 PM",
            activity: "Devotional Bazaar & Matabari Peda",
            duration: "1 hr",
            category: "Prasad",
            description: "Stroll along temple market lit by earthen lamps. Collect holy vermilion, brass diyas, and authentic GI pedas.",
            tips: "Stalls accept UPI payments readily.",
          },
        ],
      },
      {
        dayNumber: 2,
        dateLabel: preferences.returnDate || "Day 2",
        title: "Mangala Aarti, Heritage Exploration & Return",
        items: [
          {
            time: "05:00 AM",
            activity: "Morning Mangala Darshan & Chandi Archana",
            duration: "1.5 hrs",
            category: "Darshan",
            description: "Early morning darshan during peaceful dawn silence. Devotees participate in morning archana chanting.",
            tips: "Early morning queues are the shortest of the day.",
          },
          {
            time: "07:30 AM",
            activity: "Pilgrim Breakfast & Morning Walk",
            duration: "1 hr",
            category: "Refreshment",
            description: "Enjoy hot tea, luchi and alur dom at local tea stalls.",
            tips: "Bengali breakfast stalls near the lake provide fresh offerings.",
          },
          {
            time: "09:00 AM",
            activity: "Heritage Tour: Tepania Eco Park & Bhubaneswari Temple",
            duration: "2 hrs",
            category: "Heritage",
            description: "Visit ancient Bhubaneswari temple ruins and scenic Gomati river banks before departure.",
            tips: "Great photography spots for traditional architecture.",
          },
          {
            time: "11:30 AM",
            activity: "Yatri Nivas Check-out & Annabhog Prasad",
            duration: "1.5 hrs",
            category: "Prasad",
            description: "Collect belongings, take blessed midday Annabhog, and prepare for return journey.",
            tips: "Carry blessed sindoor and peda safely.",
          },
          {
            time: "01:30 PM",
            activity: "Return Journey to " + origin,
            duration: "2 hrs",
            category: "Return",
            description: `Depart Matabari with hearts filled with the divine grace of Maa Tripura Sundari.`,
            tips: "Safe travels back home.",
          },
        ],
      },
    ],
  };
}
