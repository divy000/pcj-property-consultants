import { KumaonLocation } from '../types';

export const kumaonLocationsData: KumaonLocation[] = [
  {
    id: "nainital",
    name: "Nainital",
    district: "Nainital District",
    altitude: "2,084 m (6,837 ft)",
    tagline: "The Legendary City of Lakes & Colonial Heritage",
    description: "The historical jewel of Kumaon, renowned for its emerald eye-shaped lake, grand colonial estates, temperate climate, and prestigious boarding schools. A perennial destination with enduring prestige and exceptional heritage appeal.",
    coordinates: { lat: 29.3919, lng: 79.4542 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Grand Colonial Heritage Cottage — Nainital (Approx. 2 Acres)",
      "Classic Heritage Property — Near Barah Patthar"
    ],
    highlights: ["Emerald Naini Lake", "Historic Colonial Architecture", "Barah Patthar Panoramic Ridge", "Established Heritage Enclaves"],
    image: "/images/nainital-actual.jpg"
  },
  {
    id: "kainchi-dham",
    name: "Kainchi Dham & Valley",
    district: "Nainital District",
    altitude: "1,400 m (4,593 ft)",
    tagline: "Spiritual Oasis in the Gentle Kshipra Valley",
    description: "A peaceful valley corridor made globally renowned by Neem Karoli Baba's ashram at Kainchi Dham. Benefiting from steady all-weather highway connectivity and continuous spiritual travelers, this corridor holds high potential for hospitality and retreats.",
    coordinates: { lat: 29.4230, lng: 79.5160 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Strategic Land Parcel — Near Kainchi Dham (100 Nali)"
    ],
    highlights: ["Neem Karoli Baba Ashram", "Gentle Valley Setting", "High Tourism Footfall", "Year-round Highway Access"],
    image: "/images/kainchi-dham-actual.jpg"
  },
  {
    id: "ranikhet",
    name: "Ranikhet",
    district: "Almora District",
    altitude: "1,869 m (6,132 ft)",
    tagline: "The Queen's Meadow & Pine Ridge Sanctuary",
    description: "Famed for its peaceful cantonment ambience, historic 9-hole golf course, and tall pine and deodar forests offering clear views of the western Himalayan peaks. Ideal for peaceful residences, farmhouses, and plotted retreats.",
    coordinates: { lat: 29.6434, lng: 79.4322 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Scenic Hillside Farmhouse — Ranikhet",
      "Expansive Land Holding — Machkhali (100 Nali)",
      "Ranikhet Plotting Project",
      "White Hills Cottages"
    ],
    highlights: ["Pristine Pine Forests", "Historic Ranikhet Golf Course", "Trishul Peak Panoramas", "Cantonment Tranquility"],
    image: "/images/ranikhet-actual.jpg"
  },
  {
    id: "machkhali",
    name: "Machkhali (Majkhali)",
    district: "Almora District",
    altitude: "1,850 m (6,070 ft)",
    tagline: "Rolling Green Meadows & Snow Peaks Corridor",
    description: "A picturesque hamlet situated just 12 km from Ranikhet along the Almora road. Celebrated for open rolling grasslands, tranquil pine slopes, and close proximity to the historic Ranikhet Golf Grounds in Upat.",
    coordinates: { lat: 29.6820, lng: 79.4280 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Expansive Land Holding — Machkhali (100 Nali)"
    ],
    highlights: ["Trishul & Nanda Devi Panoramas", "Near Upat Golf Course", "Lush Pine Forests", "Spacious Contiguous Land Parcels"],
    image: "/images/machkhali-ranikhet-actual.jpg"
  },
  {
    id: "kausani",
    name: "Kausani",
    district: "Bageshwar District",
    altitude: "1,890 m (6,201 ft)",
    tagline: "Unobstructed 300-km Himalayan Snow Panorama",
    description: "Perched atop a scenic ridge, Kausani is revered for offering India's most expansive panoramic views of the Himalayan peaks, including Nanda Devi, Trishul, and Panchachuli. Highly attractive for boutique hospitality and scenic land holdings.",
    coordinates: { lat: 29.8543, lng: 79.6053 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Himalayan Panorama Land — Kausani (70 Nali)"
    ],
    highlights: ["300 km Snow-Peak Views", "Lush Tea Gardens", "Mahatma Gandhi's Anasakti Ashram", "Crisp Alpine Climate"],
    image: "/images/kausani-actual.jpg"
  },
  {
    id: "sheetla",
    name: "Sheetla",
    district: "Nainital District",
    altitude: "2,200 m (7,218 ft)",
    tagline: "High-Altitude Haven of Peace & Oak Woods",
    description: "An idyllic hamlet near Mukteshwar known for pure mountain air, deep silence, and breathtaking snow-view vistas through ancient oak and pine groves. A premier choice for private estates and quiet sanctuaries.",
    coordinates: { lat: 29.4950, lng: 79.6200 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Prime Mountain Land Parcel — Sheetla (90 Nali)"
    ],
    highlights: ["Deep Forest Silence", "High Altitude Living", "Pristine Himalayan Air", "Private Estate Parcels"],
    image: "/images/sheetla-mukteshwar-actual.jpg"
  },
  {
    id: "jim-corbett",
    name: "Jim Corbett / Ramnagar",
    district: "Nainital District",
    altitude: "400–600 m (Sub-Himalayan Belt)",
    tagline: "World-Renowned Wilderness & Luxury Tourism Belt",
    description: "The gateway to India's oldest national park and Asia's premier wildlife corridor. Boasts India's highest concentration of premium wilderness resorts, luxury destination weddings, and year-round tourism activity along the Kosi River.",
    coordinates: { lat: 29.4100, lng: 79.1300 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Large Land Parcel — Jim Corbett & Marchula Region (Approx. 100 Bigha)",
      "The Hridayesh Spa Wilderness Resort (Track Record, 2009)",
      "Wood Castle Spa & Resort (Track Record, 2009)",
      "Corbett Roop Resorts Mohan (Track Record, 2002)",
      "Agricultural Land Chhoi (Track Record)"
    ],
    highlights: ["Corbett Tiger Reserve", "Destination Wedding Capital", "Kosi River Corridors", "Substantial Acreage Available"],
    image: "/images/corbett-wilderness-actual.jpg"
  },
  {
    id: "marchula",
    name: "Marchula & Ramganga Valley",
    district: "Almora / Nainital Border",
    altitude: "550–700 m (River Valley)",
    tagline: "Untouched Riverside Wilderness on the Ramganga River",
    description: "A scenic, pristine nature retreat situated along the banks of the Ramganga River near Mohan and Corbett's northern gateway. Famed for its iconic suspension bridge, crocodile viewpoint, and riverside luxury eco-resorts.",
    coordinates: { lat: 29.6062, lng: 79.0885 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Large Land Parcel — Jim Corbett & Marchula Region"
    ],
    highlights: ["Iconic Marchula Suspension Bridge", "Clear Ramganga River Views", "Boutique Wilderness Resorts", "Secluded Valley Settings"],
    image: "/images/marchula-actual.jpg"
  },
  {
    id: "mukteshwar",
    name: "Mukteshwar",
    district: "Nainital District",
    altitude: "2,286 m (7,500 ft)",
    tagline: "The High-Ridge Panorama of Orchards & Cliffs",
    description: "Situated at an exhilarating altitude of 7,500 feet, Mukteshwar offers 180-degree Himalayan views, apple orchards, and iconic rock cliffs (Chauli Ki Jali). A magnet for artists, executives, and luxury holiday home owners.",
    coordinates: { lat: 29.4722, lng: 79.6479 },
    hasAvailableProperties: false,
    associatedProperties: [],
    highlights: ["Dramatic Cliff Vistas (Chauli Ki Jali)", "Fruit Orchards", "Cool Summers & Winter Snow", "Luxury Holiday Home Enclaves"],
    image: "/images/sheetla-mukteshwar-actual.jpg"
  },
  {
    id: "ramgarh",
    name: "Ramgarh",
    district: "Nainital District",
    altitude: "1,789 m (5,869 ft)",
    tagline: "The Fruit Bowl of Kumaon & Literary Haven",
    description: "Celebrated as the orchard capital of Kumaon where Rabindranath Tagore and Mahadevi Varma wrote classic literature. Renowned for terraced apricot, peach, and plum orchards overlooking rolling Himalayan ridges.",
    coordinates: { lat: 29.4260, lng: 79.5530 },
    hasAvailableProperties: false,
    associatedProperties: [
      "The Himalayan Heights — Ramgarh (Land Sourced through PCJ)"
    ],
    highlights: ["Terraced Fruit Orchards", "Literary Heritage", "Quiet Hillside Living", "Scenic Sunrise Corridors"],
    image: "/images/ramgarh-actual.jpg"
  },
  {
    id: "bhimtal",
    name: "Bhimtal",
    district: "Nainital District",
    altitude: "1,370 m (4,495 ft)",
    tagline: "Serene Lake Living with Excellent Connectivity",
    description: "The largest lake in the Kumaon district with a charming island at its center. Offers milder winters than Nainital, gentle terrain, and rapid access to Kathgodam railway station.",
    coordinates: { lat: 29.3500, lng: 79.5667 },
    hasAvailableProperties: false,
    associatedProperties: [],
    highlights: ["Vast Island Lake", "Moderate Year-round Climate", "30-min from Kathgodam", "Flourishing Cafe & Lake Culture"],
    image: "/images/bhimtal.jpg"
  },
  {
    id: "naukuchiatal",
    name: "Naukuchiatal",
    district: "Nainital District",
    altitude: "1,220 m (4,003 ft)",
    tagline: "The Nine-Cornered Lake of Peace & Paragliding",
    description: "Surrounded by lush oak forests and bird sanctuaries, this picturesque nine-cornered lake provides peaceful lakefront settings, paragliding over mountain bowls, and premier educational institutions.",
    coordinates: { lat: 29.3190, lng: 79.5850 },
    hasAvailableProperties: false,
    associatedProperties: [
      "GD Goenka International School (formerly Templeton Academy / Temple Ten, Track Record 2006-07)"
    ],
    highlights: ["Nine-Cornered Deep Lake", "Thriving Bird Sanctuary", "Adventure & Paragliding", "Institutional Prestige"],
    image: "/images/gd-goenka-naukuchiatal-actual.jpg"
  },
  {
    id: "sattal",
    name: "Sattal",
    district: "Nainital District",
    altitude: "1,370 m (4,495 ft)",
    tagline: "Interconnected Freshwater Lakes in Dense Oak Woods",
    description: "An unblemished cluster of seven interconnected freshwater lakes set within thick, pristine oak and pine forests. Known worldwide for birdwatching and tranquil eco-retreats.",
    coordinates: { lat: 29.3560, lng: 79.5320 },
    hasAvailableProperties: false,
    associatedProperties: [],
    highlights: ["Seven Natural Lakes", "International Birding Destination", "Dense Oak Ecosystem", "Undisturbed Nature"],
    image: "/images/pine-forest.jpg"
  },
  {
    id: "almora",
    name: "Almora",
    district: "Almora District",
    altitude: "1,638 m (5,374 ft)",
    tagline: "The Cultural Capital & Heritage Ridge of Kumaon",
    description: "A horseshoe-shaped historic ridge town rich in Kumaoni cultural traditions, traditional stone architecture, and panoramic views of the central Himalayas. The historic hub of regional trade and art.",
    coordinates: { lat: 29.5971, lng: 79.6591 },
    hasAvailableProperties: false,
    associatedProperties: [],
    highlights: ["Rich Kumaoni Culture", "Traditional Stone Architecture", "Brighton End Corner Sunsets", "Thriving Arts & Handloom"],
    image: "/images/ranikhet-actual.jpg"
  },
  {
    id: "bhowali",
    name: "Bhowali",
    district: "Nainital District",
    altitude: "1,706 m (5,597 ft)",
    tagline: "The Central Crossroads & Fruit Market of Kumaon",
    description: "Strategically located at the junction linking Nainital, Almora, Ranikhet, Mukteshwar, and Haldwani. Famous for its historic sanatorium and wholesale hill fruit trading.",
    coordinates: { lat: 29.3820, lng: 79.5200 },
    hasAvailableProperties: false,
    associatedProperties: [],
    highlights: ["Central Transit Hub", "Famous Hill Fruit Bazaar", "Moderate Elevation", "Strategic Highway Interchange"],
    image: "/images/orchard-valley.jpg"
  },
  {
    id: "haldwani",
    name: "Haldwani",
    district: "Nainital District",
    altitude: "424 m (1,391 ft)",
    tagline: "The Economic Gateway & Commercial Hub of Kumaon",
    description: "The largest commercial center in Kumaon, located at the foothills. Directly adjacent to Kathgodam railway terminus and seamlessly connected to Delhi NCR and Pantnagar Airport.",
    coordinates: { lat: 29.2183, lng: 79.5130 },
    hasAvailableProperties: false,
    associatedProperties: [],
    highlights: ["Kathgodam Railhead Gateway", "Major Commercial & Healthcare Hub", "Broad Highway Access", "Urban Plotted Developments"],
    image: "/images/mukteshwar.jpg"
  },
  {
    id: "barah-patthar",
    name: "Barah Patthar (Bara Patthar)",
    district: "Nainital District",
    altitude: "2,150 m (7,053 ft)",
    tagline: "Elevated Ridge Viewpoint & Mountain Trailhead",
    description: "Situated on the scenic high ridge above Nainital town on the route to Land's End, Kilbury, and Tiffin Top. Renowned for its natural rock cliffs, horse riding trails, and secluded colonial estates.",
    coordinates: { lat: 29.3995, lng: 79.4390 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Classic Heritage Property — Near Barah Patthar"
    ],
    highlights: ["High Ridge Forest Trailhead", "Historic Stone Outcrops", "Direct Path to Tiffin Top", "Prestige Heritage Surroundings"],
    image: "/images/barah-patthar-actual.jpg"
  },
  {
    id: "gadhgarh",
    name: "Gadhgarh",
    district: "Nainital District",
    altitude: "1,750 m (5,741 ft)",
    tagline: "Emerging Commercial & Wellness Corridor",
    description: "A developing hill corridor with commanding valley perspectives and highway connectivity, offering prime potential for dedicated wellness centers, naturopathy clinics, and resort ventures.",
    coordinates: { lat: 29.4700, lng: 79.5500 },
    hasAvailableProperties: true,
    associatedProperties: [
      "Commercial & Hospitality Land — Gadhgarh (100 Nali)"
    ],
    highlights: ["Commercial Hospitality Zoning", "Panoramic Valley Exposure", "Excellent Highway Alignment", "Wellness Center Potential"],
    image: "/images/ramgarh-actual.jpg"
  }
];
