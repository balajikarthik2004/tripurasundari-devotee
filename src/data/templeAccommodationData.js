/**
 * Mata Tripura Sundari Temple — Official Accommodation Data
 * Exclusively for temple-managed facilities. Not a commercial lodging directory.
 * 
 * Verified Source Information:
 * - Dormitories are part of the redeveloped temple complex opened in September 2025.
 * - Individual rooms are proposed facilities and not currently operational.
 */

export const templeAccommodationOverview = {
  title: "Temple Devotee Accommodation",
  subtitle: "Official pilgrimage lodging managed directly by the Mata Tripura Sundari Temple Trust",
  location: "Matabari Temple Complex, Udaipur, Tripura 799114",
  officialNotice:
    "Pilgrim dormitories were commissioned under the temple redevelopment project opened in September 2025. Individual pilgrim rooms are proposed future facilities and are not currently operational.",
  disclaimer:
    "This portal facilitates preliminary accommodation enquiries for devotee planning. Submitting an enquiry does not constitute an instant confirmed booking. Allocation is formalized by the Temple Administration Office upon physical arrival and ID verification.",
};

export const verifiedDormitoryFacility = {
  id: "dormitory",
  name: "Mata Tripura Sundari Pilgrim Dormitory",
  badge: "Operational Facility",
  statusBadge: "Opened Sept 2025",
  type: "Subsidized Pilgrim Dormitory",
  image: "/assets/accommodation.jpg",
  description:
    "Clean, peaceful dormitory halls opened during the September 2025 redevelopment of the Mata Tripura Sundari shrine. Built to serve visiting devotees, sadhus, and families with essential shelter close to the sacred sanctum.",
  pricingNote: "Subsidized Pilgrim Rate — Disclosed by Temple Office upon allocation",
  capacityNote: "Bed allocation administered on-site based on daily devotee registry",
  timingsNote: "Synchronized with temple gates and daily pooja schedule (4:00 AM – 10:00 PM)",
  locationNote: "Within the inner temple redevelopment precinct, 150m from Kalyan Sagar",
  verifiedFeatures: [
    "Dedicated Gents and Ladies Dormitory Sections",
    "Clean Bedding and Purified Drinking Water (RO)",
    "Hygienic Shared Restroom and Wash Facilities",
    "24/7 Temple Security Surveillance & Assistance",
  ],
  rules: [
    "Original Government Photo ID (Aadhaar / Voter ID / Passport) mandatory for all occupants.",
    "Alcohol, tobacco, gambling, and non-vegetarian items strictly prohibited across the premises.",
    "Quiet hours observed between 10:30 PM and 04:00 AM in harmony with shrine ritual discipline.",
    "Baggage must be kept responsibly; devotees must follow the temple warden's guidelines.",
  ],
};

export const proposedFacilities = [
  {
    id: "proposed-rooms",
    name: "Pilgrim Guest Rooms (Yatri Nivas)",
    badge: "Proposed Facility",
    statusBadge: "Under Phased Planning",
    type: "Individual Rooms (Non-Operational)",
    description:
      "Individual family and senior citizen rooms are proposed under the upcoming development phases of the temple master plan. These rooms are not yet commissioned for public booking.",
    statusDetail: "Awaiting administrative completion, official tariff fixation, and formal commissioning by the temple board.",
  },
  {
    id: "proposed-senior",
    name: "Senior Citizen & Divyangjan Rest Centre",
    badge: "Proposed Facility",
    statusBadge: "Under Review",
    type: "Specialized Assisted Facility",
    description:
      "A specialized ground-level rest unit designed with accessible ramps and priority care for elderly and specially-abled pilgrims visiting the holy peetha.",
    statusDetail: "Architectural specifications under trust review. Devotees may submit priority enquiries for future availability.",
  },
];

export const accommodationRequirementOptions = [
  {
    id: "dormitory",
    label: "Temple Dormitory (Operational)",
    description: "Standard bed in devotee dormitory hall opened in Sept 2025",
    isOperational: true,
  },
  {
    id: "elderly-priority",
    label: "Senior Citizen Devotee Assistance (Dormitory Ground Level)",
    description: "Dormitory ground-level preference for pilgrims aged 60+",
    isOperational: true,
  },
  {
    id: "group-pilgrimage",
    label: "Pilgrim Group / Yatri Sangha (5+ Devotees)",
    description: "Multi-bed collective dormitory request for bhajan mandalis or group yatris",
    isOperational: true,
  },
  {
    id: "proposed-rooms-enquiry",
    label: "Proposed Individual Rooms (General Future Enquiry)",
    description: "Non-operational proposed rooms — enquiry logged for future notifications",
    isOperational: false,
  },
];

export const initialSampleEnquiries = [
  {
    id: "MTS-ACC-8021",
    devoteeName: "Debashis Bhattacharjee",
    mobile: "+91 98621 54320",
    checkIn: "2026-11-04",
    checkOut: "2026-11-05",
    guestsCount: 2,
    requirement: "Temple Dormitory (Operational)",
    status: "Approved",
    adminNotes:
      "Dormitory bed allocation provisionally approved for 2 pilgrims. Please report at the Temple Administration Office near North Gate before 07:00 PM with original Aadhaar cards.",
    submittedAt: "28 Oct 2026, 11:20 AM",
    reportingDesk: "Temple Administration Office, Reception Desk No. 2",
    contactDesk: "+91 3821 222244 (Temple Office Ext. 104)",
  },
  {
    id: "MTS-ACC-7894",
    devoteeName: "Smt. Kalyani Roy",
    mobile: "+91 94361 88210",
    checkIn: "2026-11-12",
    checkOut: "2026-11-14",
    guestsCount: 4,
    requirement: "Temple Dormitory (Operational)",
    status: "Pending",
    adminNotes:
      "Enquiry received and queued in the daily devotee accommodation roster. Temple office review is conducted 48 hours prior to the requested check-in date.",
    submittedAt: "29 Oct 2026, 03:45 PM",
    reportingDesk: "Temple Administration Office",
    contactDesk: "+91 3821 222244 (Temple Office)",
  },
  {
    id: "MTS-ACC-6520",
    devoteeName: "Rakesh Majumder",
    mobile: "+91 97740 12903",
    checkIn: "2026-10-31",
    checkOut: "2026-11-01",
    guestsCount: 6,
    requirement: "Proposed Individual Rooms (General Future Enquiry)",
    status: "Rejected",
    adminNotes:
      "Individual rooms are proposed facilities and not currently operational. Devotee is kindly advised to submit an enquiry for the operational Temple Dormitory or consult on-site administration.",
    submittedAt: "26 Oct 2026, 09:15 AM",
    reportingDesk: "Temple Administration Office",
    contactDesk: "+91 3821 222244 (Temple Office)",
  },
];

