/**
 * Mata Tripura Sundari Temple Trust — Devotee Membership Schemes
 * Matabari, Udaipur, Gomati District, Tripura
 */

export const MEMBERSHIP_TIERS = [
  {
    id: "annual",
    alias: "sevadhari",
    name: "Annual Seva Member",
    nameBengali: "বার্ষিক সেবা সদস্য",
    badge: "1 Year",
    fee: 2100,
    feeLabel: "₹2,100",
    duration: "1 Year",
    darshanPasses: 4,
    familyMembersCovered: 2,
    popular: false,
    benefits: [
      "4 Fast-Track Darshan Passes per year",
      "Annual Sankalpa Archana on chosen date",
      "Consecrated Prasad box sent by post",
      "Section 80G Tax Exemption Certificate",
    ],
  },
  {
    id: "silver",
    alias: "kalyani",
    name: "Silver Patron (5 Years)",
    nameBengali: "রজত পৃষ্ঠপোষক (৫ বছর)",
    badge: "5 Years",
    fee: 11000,
    feeLabel: "₹11,000",
    duration: "5 Years",
    darshanPasses: 12,
    familyMembersCovered: 4,
    popular: true,
    benefits: [
      "12 Fast-Track Family Darshan Passes/year",
      "1 Day Annadanam Seva in family name",
      "Consecrated Sri Yantra & Annual Prasad",
      "10% Yatri Niwas concession & 80G Receipt",
    ],
  },
  {
    id: "gold",
    alias: "rajarajeshwari",
    name: "Gold Lifetime Patron",
    nameBengali: "স্বর্ণ আজীবন পৃষ্ঠপোষক",
    badge: "Lifetime",
    fee: 51000,
    feeLabel: "₹51,000",
    duration: "Lifetime",
    darshanPasses: 50,
    familyMembersCovered: 6,
    popular: false,
    benefits: [
      "VIP Fast-Track Darshan assistance for family",
      "Annual Kalyan Arati & Chandi Path Sankalpa",
      "Pure Silver Souvenir Coin & Mata Chunari",
      "20% Yatri Niwas concession & 80G Receipt",
    ],
  },
  {
    id: "platinum",
    alias: "poshak",
    name: "Platinum Benefactor",
    nameBengali: "প্লাটিনাম প্রধান পৃষ্ঠপোষক",
    badge: "Permanent",
    fee: 100000,
    feeLabel: "₹1,00,000+",
    duration: "Permanent",
    darshanPasses: 100,
    familyMembersCovered: 8,
    popular: false,
    benefits: [
      "Name on Temple Trust Donor Wall (Tamra Patra)",
      "Full Sanctum VIP Protocol & Priest Liaison",
      "3 Days annual complimentary Yatri Niwas stay",
      "Gold-plated Sri Yantra & Trust Assembly Invitee",
    ],
  },
];

export const INITIAL_DEVOTEE_MEMBERSHIP = {
  memberId: "MTS-MEM-2026-1088",
  tierId: "silver",
  tierName: "Silver Patron (5 Years)",
  devoteeName: "Subhash Chandra Debbarma",
  gotra: "Kashyapa",
  nakshatra: "Rohini",
  mobile: "+91 98765 43210",
  email: "subhash.debbarma@tripura.gov.in",
  address: "House 24, Palace Compound, Agartala, Tripura 799001",
  panNumber: "ABCDE1234F",
  joiningDate: "15 Jan 2026",
  validUntil: "14 Jan 2031",
  duration: "5 Years",
  totalContribution: 11000,
  darshanPassesTotal: 12,
  darshanPassesUsed: 3,
  familyMembers: [
    { name: "Ananya Debbarma", relation: "Spouse", gotra: "Kashyapa" },
    { name: "Rohit Debbarma", relation: "Son", gotra: "Kashyapa" },
    { name: "Meenakshi Debbarma", relation: "Daughter", gotra: "Kashyapa" },
  ],
  sankalpaDate: "2026-10-24",
  sankalpaOccasion: "Family Well-being & Birthday of Spouse",
  assignedPriest: "Pt. Bhabatosh Bhattacharya",
  prasadKitStatus: "Dispatched",
  prasadTrackingNumber: "SP-IN-TR9483021",
  courierPartner: "India Post Speed Post",
  status: "Active",
};

export const MEMBERSHIP_FAQS = [
  {
    q: "What is the Temple Devotee Membership Scheme?",
    a: "An official patronage initiative by the Mata Tripura Sundari Temple Trust (Gomati District Administration) to support temple heritage, Vedic rituals, and Annadanam, providing devotees with prioritized darshan and sanctum services.",
  },
  {
    q: "How do Fast-Track Darshan Passes work?",
    a: "Members use allotted annual tokens to book direct VIP entry passes via the portal, bypassing regular pilgrim lines.",
  },
  {
    q: "How is the Annual Sankalpa performed?",
    a: "On your designated family date (birthday/anniversary), temple priests perform special archana at the sanctum with your Gotra and Nakshatra chanting.",
  },
  {
    q: "Is the contribution tax-exempt?",
    a: "Yes. All contributions are eligible for 50% deduction under Section 80G of the Indian Income Tax Act. Official receipts can be downloaded instantly.",
  },
];
