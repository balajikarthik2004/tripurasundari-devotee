/**
 * Mata Tripura Sundari Temple — Unified Devotee Portal Data
 * Matabari, Udaipur, Tripura (One of the 51 Shakti Peethas)
 * 
 * Factual data strictly aligned with temple audit findings and official documentation.
 * Rates, dates, and schedules are configurable and clearly distinguish verified facts
 * from prototype demonstration data.
 */

/* =========================================================================
   1. POOJA & SEVA DATA
   ========================================================================= */
export const poojaCategories = ["All", "Daily Sevas", "Special Archanas", "Annabhog Offerings", "Festival Rituals"];

export const poojaList = [
  {
    id: "pooja-01",
    name: "Nitya Chandi Path & Archana",
    category: "Daily Sevas",
    image: "/assets/pooja.jpg",
    shortDesc: "Daily sacred recitation of Sri Sri Chandi with vermilion archana for divine peace.",
    significance: "Chandi Path invocation to Maa Tripura Sundari invokes divine protection, wisdom, and inner strength for the devotee and family.",
    duration: "45 mins",
    timings: "07:30 AM – 09:00 AM (Daily)",
    price: 501,
    isPriceVerified: false,
    rateNotice: "Illustrative prototype rate (Subject to official temple trust confirmation)",
    effectiveDate: "April 2026",
    procedure: "Devotee's Gotra and Name are chanted by temple sevayats during morning arati sankalp.",
    itemsIncluded: "Raktachandan, red hibiscus garland, sacred vermilion, bel leaves, and sanctified charanamrita.",
    rules: "Traditional Indian attire recommended. Devotees may attend in person or receive sankalp prasad."
  },
  {
    id: "pooja-02",
    name: "Maha Bhog & Annadanam Seva",
    category: "Annabhog Offerings",
    image: "/assets/annabhog.jpg",
    shortDesc: "Sponsor daily sacred Mahaprasad offered to Maa and distributed to visiting pilgrims.",
    significance: "Annabhog at Matabari is a revered tradition sustaining visiting devotees, sadhus, and the needy in the divine presence of Maa.",
    duration: "Full Afternoon Bhog Phase",
    timings: "12:00 PM – 01:30 PM",
    price: 1100,
    isPriceVerified: false,
    rateNotice: "Configurable seva offering (Subject to official verification)",
    effectiveDate: "April 2026",
    procedure: "Special afternoon khichuri, payesh, and vegetable bhog offered to the deity followed by pilgrim distribution.",
    itemsIncluded: "Full day bhog sponsorship, special receipt, and sealed dry prasad pack.",
    rules: "Advance booking of at least 24 hours requested for kitchen preparation."
  },
  {
    id: "pooja-03",
    name: "Shodashopachara Puja & Aarti",
    category: "Special Archanas",
    image: "/assets/pooja.jpg",
    shortDesc: "16-step elaborate Vedic ritual offering to Maa Tripura Sundari with panchamrita snana.",
    significance: "One of the most elaborate tantric and vedic pujas performed in the sanctum sanctorum for health and prosperity.",
    duration: "1 Hour 15 mins",
    timings: "09:30 AM – 11:00 AM",
    price: 2100,
    isPriceVerified: false,
    rateNotice: "Tentative prototype pricing",
    effectiveDate: "April 2026",
    procedure: "16 sacred offerings including Asana, Padya, Arghya, Snana, Vastra, Gandh, Pushpa, Dhoop, Deepa, and Naivedya.",
    itemsIncluded: "Personalised Sankalpa for family members, coconut offering, and blessed Angavastra.",
    rules: "Devotees should be present 15 minutes before the scheduled time in pristine traditional clothes."
  },
  {
    id: "pooja-04",
    name: "Deepotsav Sandhya Aarti Seva",
    category: "Festival Rituals",
    image: "/assets/diwali-diyas.jpg",
    shortDesc: "Lighting of 108 ghee lamps around the sanctum during evening twilight Aarti.",
    significance: "Deepa daan at Matabari dispels spiritual darkness and commemorates the celestial radiance of Maa Tripurasundari.",
    duration: "30 mins",
    timings: "06:30 PM – 07:15 PM",
    price: 751,
    isPriceVerified: false,
    rateNotice: "Prototype estimation",
    effectiveDate: "April 2026",
    procedure: "Pure desi cow ghee lamps placed symmetrically along the historic tiered terracotta shikhara perimeter.",
    itemsIncluded: "108 Brass & earthen lamps, pure cow ghee, camphor, and evening aarti darshan entry.",
    rules: "Participating devotees gather at the Natmandap courtyard by 06:00 PM."
  },
  {
    id: "pooja-05",
    name: "Kalyan Sagar Kurma & Jal Seva",
    category: "Daily Sevas",
    image: "/assets/kalyan-sagar.jpg",
    shortDesc: "Ecological and sacred offering dedicated to the ancient Kurma (turtle) heritage of Kalyan Sagar.",
    significance: "Matabari is known as Kurma Peetha; feeding and preserving the sacred aquatic life of Kalyan Sagar is a sacred conservation seva.",
    duration: "Flexible (Daytime)",
    timings: "08:00 AM – 05:00 PM",
    price: 251,
    isPriceVerified: false,
    rateNotice: "Proposed community seva fee",
    effectiveDate: "April 2026",
    procedure: "Devotees offer approved organic grain and puffed rice feed at designated feeding ghats under sevayat supervision.",
    itemsIncluded: "Sanctified aquatic feed packet and Kalyan Sagar ecological blessing card.",
    rules: "Strictly prohibited: synthetic plastics, bread, or unauthorized food items in the lake."
  }
];

/* =========================================================================
   2. DONATIONS DATA
   ========================================================================= */
export const donationPurposes = [
  {
    id: "annadanam",
    title: "Annabhog / Nitya Annadanam",
    subtitle: "Daily free meal distribution to visiting pilgrims and the destitute",
    icon: "Utensils",
    recommendedAmounts: [501, 1100, 2500, 5000, 11000],
    desc: "Every day, hundreds of pilgrims partake in consecrated Mahaprasad at Matabari. Your contribution ensures that no devotee leaves Maa's abode hungry."
  },
  {
    id: "maintenance",
    title: "Temple Maintenance & Sanctum Preservation",
    subtitle: "Preservation of 500-year-old historic terracotta architecture and complex hygiene",
    icon: "Shield",
    recommendedAmounts: [500, 1000, 2000, 5000, 10000],
    desc: "Supports round-the-clock sanitation, queue infrastructure maintenance, heritage brick preservation, and water filtration facilities."
  },
  {
    id: "festivals",
    title: "Diwali Mela & Sacred Festivals Fund",
    subtitle: "Supports lighting, security, medical aid, and crowd management during major melas",
    icon: "Sparkles",
    recommendedAmounts: [1000, 2100, 5100, 11000, 25000],
    desc: "The historic Diwali Mela at Udaipur draws over 200,000 pilgrims. Donations directly fund drinking water kiosks, lighting, and queue safety."
  },
  {
    id: "kalyan_lake",
    title: "Kalyan Sagar Heritage & Turtle Conservation",
    subtitle: "Official preservation fund for the sacred lake and endemic Bostami turtles",
    icon: "Fish",
    recommendedAmounts: [251, 501, 1001, 2501, 5001],
    desc: "Dedicated to ecological water treatment, organic aeration, embankment stabilization, and protection of the critically endangered sacred turtles."
  },
  {
    id: "general",
    title: "General Temple E-Hundi Donation",
    subtitle: "Unrestricted devotional offering to Mata Tripura Sundari Temple Trust",
    icon: "Heart",
    recommendedAmounts: [101, 251, 501, 1100, 2100],
    desc: "Voluntary offering allocated by the official temple administrative board towards urgent temple welfare and daily sevas."
  }
];

/* =========================================================================
   3. PRASAD & TEMPLE STORE DATA
   ========================================================================= */
export const prasadCategories = ["All", "Matabari Peda", "Temple Bhog", "Devotional Keepsakes", "Puja Items"];

export const prasadItems = [
  {
    id: "prasad-01",
    name: "Authentic Matabari Peda (500g)",
    category: "Matabari Peda",
    price: 320,
    image: "/assets/matabari-peda.jpg",
    rating: "4.9",
    isGITagged: true,
    shortDesc: "Tripura's famous GI-tagged traditional milk sweet prepared with pure condensed milk and caramelized sugar.",
    significance: "Famous across India, Matabari Peda has been offered as the principal sweet naivedya to Maa Tripura Sundari for centuries.",
    shelfLife: "20 Days (Air-sealed box)",
    ingredients: "Pure cow milk khoya (mawa), unrefined cane sugar, green cardamom.",
    packaging: "Sealed hygienic tamper-evident devotional box.",
    availability: "In Stock",
    fulfillmentNotice: "Pickup from Temple Counter / Local Courier dispatch within Tripura."
  },
  {
    id: "prasad-02",
    name: "Royal Matabari Peda Gift Pack (1 kg)",
    category: "Matabari Peda",
    price: 600,
    image: "/assets/matabari-peda.jpg",
    rating: "5.0",
    isGITagged: true,
    shortDesc: "Special ceremonial 1 kg gift box of freshly prepared Matabari Peda for family distribution.",
    significance: "Ideal for festive occasions, home pujas, and gifting blessed prasad to relatives and loved ones.",
    shelfLife: "20 Days",
    ingredients: "Pure cow milk khoya, sugar, aromatic cardamom.",
    packaging: "Embossed golden temple gift box.",
    availability: "In Stock",
    fulfillmentNotice: "Temple counter pickup or dispatch."
  },
  {
    id: "prasad-03",
    name: "Maha Bhog Dry Prasad Kit",
    category: "Temple Bhog",
    price: 250,
    image: "/assets/prasad-dry-fruits.jpg",
    rating: "4.9",
    isGITagged: false,
    shortDesc: "Consecrated dry prasad including Panchamrit batasha, roasted dry fruits, and sacred mishri.",
    significance: "Sanctified during the daily noon Rajbhog arati before the holy feet of Maa Tripureshwari.",
    shelfLife: "45 Days",
    ingredients: "Almonds, cashews, raisins, rock sugar (mishri), elaichi dana.",
    packaging: "Moisture-proof sacred pouch.",
    availability: "In Stock",
    fulfillmentNotice: "Pickup or mail order."
  },
  {
    id: "prasad-04",
    name: "Mata Tripura Sundari Sindoor & Raksha Sutra",
    category: "Devotional Keepsakes",
    price: 150,
    image: "/assets/pooja.jpg",
    rating: "4.9",
    isGITagged: false,
    shortDesc: "Sacred vermilion blessed at the Garbhagriha along with the sacred red protective thread.",
    significance: "Traditional Shakti Peetha blessing symbolizing longevity, peace, and spiritual protection.",
    shelfLife: "Perpetual",
    ingredients: "Natural herbal raktachandan sindoor, purified cotton thread.",
    packaging: "Brass-embossed container.",
    availability: "In Stock",
    fulfillmentNotice: "Available at all temple counters."
  },
  {
    id: "prasad-05",
    name: "Handcrafted Terracotta Temple Diya Set (Pack of 12)",
    category: "Puja Items",
    price: 200,
    image: "/assets/terracotta-temple-diyas.jpg",
    rating: "4.7",
    isGITagged: false,
    shortDesc: "Locally handcrafted earthen diyas made by traditional Udaipur artisans for home aarti.",
    significance: "Crafted using the clay from the Gomati river valley, echoing the ancient architecture of Matabari.",
    shelfLife: "Reusable",
    ingredients: "Natural fired terracotta clay.",
    packaging: "Cushioned protective cardboard box.",
    availability: "In Stock",
    fulfillmentNotice: "Counter pickup recommended."
  },
  {
    id: "prasad-06",
    name: "Kalyan Sagar Sacred Kurma Seva Bhog (Dhan-er Khai)",
    category: "Temple Bhog",
    price: 120,
    image: "/assets/kalyan-sagar-kurma-bhog.jpg",
    rating: "4.9",
    isGITagged: false,
    shortDesc: "Blessed white puffed rice (Khai) prepared for offering to the sacred Bostami turtles of Kalyan Sagar.",
    significance: "Devotees observe the historic 500-year Kurma Seva ritual at Kalyan Sagar lake, seeking divine blessings, peace, and spiritual harmony.",
    shelfLife: "30 Days",
    ingredients: "Sun-dried indigenous paddy puffed rice (Dhan-er Khai), sacred tulsi leaves.",
    packaging: "Eco-friendly sealed earthen craft paper bag.",
    availability: "In Stock",
    fulfillmentNotice: "Temple counter & Kalyan Sagar ghat kiosk."
  },
  {
    id: "prasad-07",
    name: "Consecrated Tripura Sundari Sri Yantra Plaque",
    category: "Devotional Keepsakes",
    price: 450,
    image: "/assets/tripura-sundari-yantra.jpg",
    rating: "5.0",
    isGITagged: false,
    shortDesc: "Intricately etched Panchadhatu brass Sri Yantra sanctified before Maa Tripura Sundari for altar worship.",
    significance: "The supreme geometric representation of Devi Tripura Sundari, energized during special Shakti Peetha abhishekham rituals for prosperity.",
    shelfLife: "Perpetual",
    ingredients: "Panchadhatu alloy brass, sanctified crimson sindoor bindu.",
    packaging: "Devotional velvet-lined gift case.",
    availability: "In Stock",
    fulfillmentNotice: "Temple Counter Pickup & Speed Post."
  },
  {
    id: "prasad-08",
    name: "Sacred Brass Pancha Pradip Aarti Lamp",
    category: "Puja Items",
    price: 380,
    image: "/assets/pancha-pradip-diya.jpg",
    rating: "4.8",
    isGITagged: false,
    shortDesc: "Traditional handcrafted 5-wick ceremonial brass Aarti lamp with engraved lotus motifs.",
    significance: "Specially crafted for traditional Sandhya Aarti rituals, spreading divine illumination and purifying sacred household ambiance.",
    shelfLife: "Lifelong Reusable",
    ingredients: "Pure solid bell-metal brass.",
    packaging: "Hardbound cushioned box.",
    availability: "In Stock",
    fulfillmentNotice: "Temple Counter Pickup & Speed Post."
  },
  {
    id: "prasad-09",
    name: "Consecrated Temple Annabhog Dry Mahaprasad",
    category: "Temple Bhog",
    price: 180,
    image: "/assets/annabhog.jpg",
    rating: "5.0",
    isGITagged: false,
    shortDesc: "Special consecrated dry bhog sanctified during the Rajbhog offering to Maa Tripura Sundari.",
    significance: "Blessed in the ancient sanctum sanctorum during midday Rajbhog seva, imbued with the divine grace of the Mother.",
    shelfLife: "30 Days",
    ingredients: "Govindobhog rice grains, pure cow ghee, sacred tulsi, caramelized jaggery batasha.",
    packaging: "Sealed sacred tin container.",
    availability: "In Stock",
    fulfillmentNotice: "Available at all temple prasad counters."
  }
];

/* =========================================================================
   4. ACCOMMODATION DATA
   ========================================================================= */
export const accommodationCategories = ["All", "Devotee Rooms", "Family Suites", "Pilgrim Dormitory", "Community Halls"];

export const accommodationList = [
  {
    id: "acc-01",
    name: "Matabari Yatri Nivas — Standard Room",
    category: "Devotee Rooms",
    image: "/assets/accommodation.jpg",
    capacity: "2 Adults + 1 Child",
    tariff: "₹650 / night (Illustrative)",
    isTariffVerified: false,
    tariffNotice: "Legacy government / trust tariff subject to administrative confirmation",
    amenities: ["Twin Beds", "Attached Western Bathroom", "Ceiling Fan", "24hr Running Water", "Devotee Assistance Desk"],
    shortDesc: "Clean, peaceful standard rooms situated within 200 meters of the temple outer gateway.",
    rules: "Valid Government Photo ID required at check-in. Alcohol and non-vegetarian food strictly prohibited."
  },
  {
    id: "acc-02",
    name: "Matabari Yatri Nivas — AC Family Suite",
    category: "Family Suites",
    image: "/assets/accommodation.jpg",
    capacity: "4 Adults + 2 Children",
    tariff: "₹1,400 / night (Illustrative)",
    isTariffVerified: false,
    tariffNotice: "Indicative room tariff subject to official revision",
    amenities: ["Air Conditioning", "Two Double Beds", "Attached Bath with Geyser", "Power Backup", "Safe Parking"],
    shortDesc: "Comfortable air-conditioned family suite ideal for elder pilgrims and family groups.",
    rules: "Prior advance booking recommended for festival periods like Diwali Mela and Navaratri."
  },
  {
    id: "acc-03",
    name: "Maa Tripurasundari Pilgrim Dormitory",
    category: "Pilgrim Dormitory",
    image: "/assets/accommodation.jpg",
    capacity: "Individual Bed in 12-Bed Hall",
    tariff: "₹150 / bed / night (Illustrative)",
    isTariffVerified: false,
    tariffNotice: "Subsidized pilgrim rate (Prototype data)",
    amenities: ["Clean Mattress & Bedding", "Shared Hygienic Washrooms", "Lockers Available", "CCTV Security"],
    shortDesc: "Subsidized, secure accommodation tailored for solo devotees, sadhus, and budget pilgrims.",
    rules: "Lockers provided for belongings; devotees must carry their own locks."
  },
  {
    id: "acc-04",
    name: "Yatri Community Hall & Satsang Bhavan",
    category: "Community Halls",
    image: "/assets/accommodation.jpg",
    capacity: "Groups of 30 – 60 Devotees",
    tariff: "₹3,500 / day (Illustrative)",
    isTariffVerified: false,
    tariffNotice: "Group rate for spiritual organizations (Subject to trust approval)",
    amenities: ["Large Carpeted Hall", "Separate Gents & Ladies Toilets", "Water Purifier", "Sound System for Bhajans"],
    shortDesc: "Spacious community hall available for pilgrim groups, bhajan mandalis, and religious assemblies.",
    rules: "Requires written request and approval from Temple Trust Administration."
  }
];

/* =========================================================================
   5. TEMPLE INFORMATION DATA
   ========================================================================= */
export const templeHistoryMilestones = [
  {
    year: "1501 CE",
    title: "Consecration by Maharaja Dhanya Manikya",
    desc: "King Dhanya Manikya, ruler of the Manikya dynasty of Tripura, established the temple following a divine dream command directing him to install Maa Tripura Sundari on this hillock (Matabari)."
  },
  {
    year: "15th Century",
    title: "Padapeetha Shakti Peetha Recognition",
    desc: "According to the sacred Pithamala and Mahapithanirupana scriptures, the right foot ('Padapitha') of Devi Sati fell on this sacred tortoise-shaped mound, sanctifying it as one of the 51 Shakti Peethas."
  },
  {
    year: "1681 CE",
    title: "Restoration by Maharaja Rama Manikya",
    desc: "Following a lightning strike, the temple dome and terracotta structure were carefully restored by Maharaja Rama Manikya, preserving the distinctive Char-Chala architectural harmony."
  },
  {
    year: "19th Century",
    title: "Formalization of Nitya Annabhog & Trust Administration",
    desc: "Royal patronage established perpetual grants for daily prasad distribution and ritual worship, passing peacefully into democratic Trust administration following Tripura's accession to the Indian Union in 1949."
  },
  {
    year: "Present Day",
    title: "National Pilgrimage Center & PRASAD Scheme Development",
    desc: "Recognized as a premier spiritual pilgrimage hub of Northeast India, undergoing holistic modernization with covered queue complexes, visitor facilitation centers, and heritage lake conservation."
  }
];

export const templeGalleryImages = [
  { src: "/assets/hero/temple-exterior.jpg", title: "Historic Terracotta Shikhara", desc: "Daylight view of the Kurma Peeth sanctum dome" },
  { src: "/assets/kalyan-sagar.jpg", title: "Sacred Kalyan Sagar", desc: "6.4 acre holy lake holding ancient turtle sanctuary" },
  { src: "/assets/hero/temple-evening.jpg", title: "Evening Sandhya Arati Ambience", desc: "Sacred twilight illumination of Matabari" },
  { src: "/assets/diwali-mela.jpg", title: "Historic Diwali Mela", desc: "Annual gathering of over 200,000 devotees" },
  { src: "/assets/matabari-peda.jpg", title: "GI-Tagged Matabari Peda", desc: "Heritage sacred milk sweet naivedya" },
  { src: "/assets/annabhog.jpg", title: "Nitya Annabhog Mahaprasad", desc: "Traditional midday consecration" }
];

/* =========================================================================
   6. EVENTS & FESTIVALS DATA
   ========================================================================= */
export const eventsList = [
  {
    id: "evt-01",
    name: "Matabari Diwali Mela",
    classification: "Flagship Annual Celebration",
    category: "Flagship Celebration",
    image: "/assets/events/matabari-diwali-mela.jpg",
    dateDisplay: "November 6–8, 2026",
    dateNotice: "Reported schedule; subject to Temple Trust confirmation",
    seasonalPeriod: "Kartika Amavasya (Autumn / Oct–Nov)",
    location: "Mata Tripura Sundari Temple, Matabari, Udaipur, Tripura",
    status: "Upcoming (Reported Schedule)",
    isFeatured: true,
    isDiwaliComponent: false,
    shortDesc: "Tripura's five-century-old flagship spiritual gathering, where over 200,000 pilgrims congregate to illuminate 100,000+ earthen diyas, participate in midnight Shyama Kali puja, and perform sacred deepa daan.",
    fullDesc: "Established by Maharaja Dhanya Manikya in the early 16th century, the historic Matabari Diwali Mela is one of Eastern India's largest and most sacred religious congregations. The entire terracotta temple hillock and the banks of Kalyan Sagar are illuminated by thousands of earthen lamps, while sacred Chandi Yagnas, Harinam Sankirtans, and traditional pujas run continuously.",
    rituals: [
      "Illumination of over 100,000 earthen oil lamps along sanctum terraces and lake ghats",
      "Midnight Tantric Shyama Kali Mahapuja in the sacred 500-year Garbhagriha",
      "Continuous 72-hour Harinam Sankirtan and Chandi Yagna at Natmandap",
      "Sacred snan in Kalyan Sagar and Kurma Seva offerings"
    ],
    visitorInstructions: "Special designated pedestrian zones, satellite parking at Udaipur bypass, and free transit for elderly devotees managed by Gomati District Administration and Temple Trust."
  },
  {
    id: "evt-02",
    name: "Durga Puja (Sharadiya Mahotsav)",
    classification: "Seasonal Devotional Celebration",
    category: "Seasonal Celebration",
    image: "/assets/events/matabari-durga-puja.jpg",
    dateDisplay: "Dates to be announced (Autumn 2026)",
    dateNotice: "Schedule follows regional astronomical Panjika calendar",
    seasonalPeriod: "Ashwina Shukla Paksha (Autumn / Sept–Oct)",
    location: "Mata Tripura Sundari Temple, Matabari",
    status: "Seasonal Period",
    isFeatured: false,
    isDiwaliComponent: false,
    shortDesc: "Nine days of solemn Devi worship observed with daily Vedic Chandi Path, sacred Kumari Puja on Maha Ashtami, traditional dhak drum beats, and holy pushpanjali offerings.",
    fullDesc: "Sharadiya Durga Puja at this 500-year-old Shakti Peetha is celebrated with profound tantric and vedic reverence. Each morning, sevayats perform kalash sthapana and Chandi recitations, culminating in the auspicious Kumari Puja and special sandhya aartis that draw devotees from across the region.",
    rituals: [
      "Ghatasthapana & daily ceremonial Chandi Path recitation",
      "Traditional Dhaki presentations and reverberating shankha aarti",
      "Sacred Kumari Puja observed on Maha Ashtami",
      "Aparajita Puja, sacred sindoor blessings, and Vijaya Dashami prasad"
    ],
    visitorInstructions: "Peak pilgrim attendance occurs on Maha Ashtami and Navami. Early morning darshan queue slots are recommended."
  },
  {
    id: "evt-03",
    name: "Kali Puja (Shyama Puja)",
    classification: "Deepotsav Sacred Ritual",
    category: "Deepotsav Ritual",
    image: "/assets/events/matabari-kali-puja.jpg",
    dateDisplay: "November 7, 2026 (Midnight Amavasya)",
    dateNotice: "Associated with Diwali celebrations; reported schedule",
    seasonalPeriod: "Kartika Amavasya (Midnight Celebration)",
    location: "Garbhagriha, Mata Tripura Sundari Temple",
    status: "Associated with Diwali",
    isFeatured: false,
    isDiwaliComponent: true,
    shortDesc: "An intrinsic midnight ritual of Diwali Mela, featuring elaborate tantric invocations, 108 red hibiscus flower garlands, pancha pradip aarti, and special bhog inside the Garbhagriha.",
    fullDesc: "Celebrated in deep spiritual association with Diwali Mela, the sacred Shyama Kali Puja takes place on the darkest night of Kartika Amavasya. Devotees witness the unique synthesis of Tripura Sundari and Shyama Kali worship, symbolizing the dissolution of darkness and the awakening of inner divine light.",
    rituals: [
      "Midnight Tantric Mahapuja conducted by senior temple sevayats",
      "Offering of 108 fresh red hibiscus garlands (jaba phool) and sacred raktachandan",
      "Multi-tiered brass Pancha Pradip deepa arati",
      "Special midnight khichuri naivedya and charanamrita distribution"
    ],
    visitorInstructions: "Conducted as an intrinsic sacred component of Diwali Mela. Midnight sanctum access is regulated through designated queuing corridors."
  },
  {
    id: "evt-04",
    name: "Tripureshwari Dance & Music Festival",
    classification: "Cultural Programme (Organized during Diwali Mela)",
    category: "Cultural Programme",
    image: "/assets/events/tripureshwari-cultural-dance.jpg",
    dateDisplay: "November 6–8, 2026 (Evenings)",
    dateNotice: "Organized as part of Diwali Mela cultural evenings",
    seasonalPeriod: "Diwali Mela Cultural Evenings",
    location: "Temple Natmandap & Open-Air Stage, Matabari",
    status: "Part of Diwali Mela",
    isFeatured: false,
    isDiwaliComponent: true,
    shortDesc: "A prestigious cultural programme conducted during Diwali Mela featuring classical Manipuri and Kathak devotional dances, devotional vocal recitals, and traditional instrumental sangeet.",
    fullDesc: "Organized under the patronage of Tripura Tourism and the Department of Information & Cultural Affairs during the Diwali Mela, this festival showcases eminent regional and national classical artists. Performances are offered as cultural seva dedicated to Maa Tripura Sundari.",
    rituals: [
      "Devotional Indian classical dance recitals (Manipuri Ras & Kathak)",
      "Bhakti sangeet, devotional flute, and classical vocal renditions",
      "Traditional Tripura folk cultural presentations",
      "Felicitation of veteran folk artists and devotional musicians"
    ],
    visitorInstructions: "Open to all pilgrims and visitors at the open-air cultural pavilion. Seating is on a first-come, first-served basis."
  },
  {
    id: "evt-05",
    name: "Traditional Cultural Fair & Exhibition",
    classification: "Exhibition & Fair (Part of Diwali Mela)",
    category: "Exhibition & Fair",
    image: "/assets/events/matabari-mela-fair.jpg",
    dateDisplay: "November 6–8, 2026 (Continuous)",
    dateNotice: "Comprehensive artisan fair held during Diwali Mela",
    seasonalPeriod: "Diwali Mela Fairgrounds",
    location: "Temple Precinct & Surrounding Grounds, Udaipur",
    status: "Part of Diwali Mela",
    isFeatured: false,
    isDiwaliComponent: true,
    shortDesc: "The vibrant rural exhibition integral to Diwali Mela, bringing together traditional bamboo and cane artisans, handloom weavers, terracotta potters, and fresh Matabari peda sweetmakers.",
    fullDesc: "Spanning the pathways leading to the sacred hillock, the Traditional Cultural Fair is an authentic showcase of Tripura's rich indigenous craft heritage. Thousands of families explore local artisan products, savor authentic culinary delicacies, and experience the warm hospitality of Udaipur.",
    rituals: [
      "Exhibition of handcrafted Tripura bamboo, cane, and handloom textiles",
      "Live preparation and distribution of authentic GI-tagged Matabari Peda",
      "Government rural development and heritage craft demonstration stalls",
      "Community cultural displays and children's traditional entertainment zones"
    ],
    visitorInstructions: "Operates continuously during the 3 days of Diwali Mela. Footwear deposits, drinking water stations, and lost-and-found booths are stationed throughout."
  },
  {
    id: "evt-06",
    name: "Mangal Aarti at Kalyan Sagar",
    classification: "Special Devotional Programme",
    category: "Devotional Programme",
    image: "/assets/events/kalyan-sagar-mangal-aarti.jpg",
    dateDisplay: "Daily at Dawn (Special Festival Congregations)",
    dateNotice: "Regular sacred schedule; enhanced during major tithis",
    seasonalPeriod: "Year-Round (Dawn Twilight: 04:30 AM – 05:30 AM)",
    location: "Sacred Stone Ghats, Kalyan Sagar Lake, Matabari",
    status: "Daily Sacred Programme",
    isFeatured: false,
    isDiwaliComponent: false,
    shortDesc: "A serene dawn devotional gathering on the historic stone ghats of Kalyan Sagar, where pilgrims release floating earthen leaf lamps and offer reverence to the sacred Bostami turtles.",
    fullDesc: "As dawn breaks over the tranquil waters of Kalyan Sagar, temple sevayats lead the Mangal Aarti with conch shells and sacred morning hymns. Devotees participate in 'Deepa Daan', placing glowing leaf lamps upon the lake, which reflect the morning amber sky and the sacred temple dome.",
    rituals: [
      "Dawn Mangal Aarti with conch shells, incense, and brass lamps",
      "Sacred Deepa Daan: floating biodegradable leaf lamps on Kalyan Sagar",
      "Kurma Seva: reverent viewing and organic grain feeding of sacred turtles",
      "Morning peaceful parikrama along the stone-paved lake perimeter"
    ],
    visitorInstructions: "Free general access. Devotees are strictly reminded to use only biodegradable leaf lamps and never dispose plastic or unauthorized feed into the holy lake."
  }
];

export const officialAnnouncements = [
  {
    id: "ann-01",
    title: "Official Verification Notice on Puja Rates",
    date: "Current Season",
    category: "Administration",
    content: "All pooja, seva, and accommodation tariffs shown on this digital portal prototype reflect configurable estimates and are subject to final publication by the Tripura Sundari Temple Trust."
  },
  {
    id: "ann-02",
    title: "Kalyan Sagar Conservation Advisory",
    date: "Permanent Notice",
    category: "Visitor Notice",
    content: "Pilgrims are strictly requested not to throw plastic, soap, or synthetic food into Kalyan Sagar. Only certified puffed rice feed may be given at authorized ghats."
  },
  {
    id: "ann-03",
    title: "Upcoming Diwali Mela Parking & Shuttle Arrangements",
    date: "Advance Notice",
    category: "Festival Update",
    content: "Designated satellite parking zones will be activated at Udaipur bypass with free electric battery rickshaws for senior citizens and differently-abled devotees."
  }
];

