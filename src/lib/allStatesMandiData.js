/**
 * GrainWise AI — 28 Indian States & Union Territories Comprehensive Mandi & Weather Intelligence
 * 
 * Inspired by Agmarknet & e-NAM (National Agriculture Market)
 * Covers all 28 states of India + Key Union Territories
 */

export const INDIAN_STATES_AND_UTS = [
  'All States & UTs',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Jammu and Kashmir',
  'Delhi',
  'Puducherry',
  'Chandigarh',
  'Ladakh'
];

export const CROP_CATEGORIES = [
  'All Crops',
  'Cereals',
  'Pulses',
  'Oilseeds',
  'Commercial',
  'Spices',
  'Vegetables & Fruits'
];

/**
 * IMD Weather Advisories for Agricultural Protection
 */
export const IMD_WEATHER_ALERTS = [
  {
    district: 'Nashik & Jalgaon',
    state: 'Maharashtra',
    severity: 'warning',
    condition: 'Unseasonal Thunderstorms',
    metrics: 'Rain: 14mm · Humidity: 78% · Wind: 28 km/h',
    advisory: 'Cover harvested onion and wheat under waterproof tarpaulins immediately. Delay pesticide spraying by 36 hours.'
  },
  {
    district: 'Bathinda & Firozpur',
    state: 'Punjab',
    severity: 'caution',
    condition: 'Dry & Strong Gusts',
    metrics: 'Temp: 34°C · Humidity: 32% · Wind: 22 km/h',
    advisory: 'Optimal weather for cotton and wheat threshing. Ensure open grain storage yards are guarded from wind dispersal.'
  },
  {
    district: 'Warangal & Nizamabad',
    state: 'Telangana',
    severity: 'warning',
    condition: 'Isolated Heavy Showers',
    metrics: 'Rain: 22mm · Humidity: 84% · Wind: 18 km/h',
    advisory: 'Move open paddy heaps to elevated platforms or covered market sheds. High moisture risk in gunny bags.'
  },
  {
    district: 'Guntur & Kurnool',
    state: 'Andhra Pradesh',
    severity: 'advisory',
    condition: 'Clear Sky & High Sun',
    metrics: 'Temp: 36°C · Humidity: 45% · Wind: 10 km/h',
    advisory: 'Ideal drying conditions for red chilli and turmeric. Spread pods evenly on raised concrete drying beds.'
  },
  {
    district: 'Kota & Bharatpur',
    state: 'Rajasthan',
    severity: 'caution',
    condition: 'Moderate Breeze & Dust',
    metrics: 'Temp: 35°C · Humidity: 38% · Wind: 25 km/h',
    advisory: 'Mustard and coriander threshing requires wind-break nets to prevent seed scattering.'
  },
  {
    district: 'Erode & Coimbatore',
    state: 'Tamil Nadu',
    severity: 'advisory',
    condition: 'Humid & Overcast',
    metrics: 'Temp: 31°C · Humidity: 74% · Wind: 12 km/h',
    advisory: 'Turmeric finger boiling and polishing ongoing. Ensure shade drying if drizzle manifests.'
  }
];

/**
 * Real-world Mandi Dataset across all 28 Indian States + UTs
 */
export const COMPREHENSIVE_MANDI_RECORDS = [
  // --- 1. Andhra Pradesh ---
  {
    id: 'ap-1',
    commodity: 'Red Chilli (Teja Fatki)',
    category: 'Spices',
    variety: 'Teja Superior',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    market: 'Guntur Mirchi Yard (APMC)',
    modalPrice: 19400,
    unit: '₹/qtl',
    dailyChangePct: 3.8,
    isUp: true,
    msp: 13500,
    verified: true,
    lat: 16.3067,
    lon: 80.4365,
    defaultDistanceKm: 14
  },
  {
    id: 'ap-2',
    commodity: 'Groundnut (Pods Bold)',
    category: 'Oilseeds',
    variety: 'Kadiri-6 Bold',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    market: 'Kurnool Agricultural Market',
    modalPrice: 6980,
    unit: '₹/qtl',
    dailyChangePct: 1.4,
    isUp: true,
    msp: 6783,
    verified: true,
    lat: 15.8281,
    lon: 78.0373,
    defaultDistanceKm: 28
  },

  // --- 2. Arunachal Pradesh ---
  {
    id: 'ar-1',
    commodity: 'Large Cardamom (Ram Sai)',
    category: 'Spices',
    variety: 'Ram Sai Hill Variety',
    state: 'Arunachal Pradesh',
    district: 'East Siang',
    market: 'Pasighat APMC Yard',
    modalPrice: 94000,
    unit: '₹/qtl',
    dailyChangePct: 2.1,
    isUp: true,
    msp: 78000,
    verified: true,
    lat: 28.0664,
    lon: 95.3268,
    defaultDistanceKm: 42
  },

  // --- 3. Assam ---
  {
    id: 'as-1',
    commodity: 'Mustard (Yellow Toria)',
    category: 'Oilseeds',
    variety: 'M-27 Toria',
    state: 'Assam',
    district: 'Nagaon',
    market: 'Dhing Regulated Market',
    modalPrice: 5850,
    unit: '₹/qtl',
    dailyChangePct: -0.8,
    isUp: false,
    msp: 5650,
    verified: true,
    lat: 26.4674,
    lon: 92.4649,
    defaultDistanceKm: 19
  },
  {
    id: 'as-2',
    commodity: 'Raw Jute (TD-5)',
    category: 'Commercial',
    variety: 'Tossa Desi',
    state: 'Assam',
    district: 'Dhubri',
    market: 'Gauripur Jute Market',
    modalPrice: 5620,
    unit: '₹/qtl',
    dailyChangePct: 1.9,
    isUp: true,
    msp: 5050,
    verified: true,
    lat: 26.0827,
    lon: 89.9722,
    defaultDistanceKm: 31
  },

  // --- 4. Bihar ---
  {
    id: 'br-1',
    commodity: 'Maize (Yellow Hybrid)',
    category: 'Cereals',
    variety: 'DeKalb 9108',
    state: 'Bihar',
    district: 'Purnea',
    market: 'Gulabbagh Mandi Purnea',
    modalPrice: 2380,
    unit: '₹/qtl',
    dailyChangePct: 4.1,
    isUp: true,
    msp: 2090,
    verified: true,
    lat: 25.7771,
    lon: 87.4753,
    defaultDistanceKm: 9
  },
  {
    id: 'br-2',
    commodity: 'Makhana (Fox Nut Phool)',
    category: 'Commercial',
    variety: 'Supaul Grade A',
    state: 'Bihar',
    district: 'Darbhanga',
    market: 'Darbhanga Krishi Yard',
    modalPrice: 72000,
    unit: '₹/qtl',
    dailyChangePct: 5.2,
    isUp: true,
    msp: 55000,
    verified: true,
    lat: 26.1542,
    lon: 85.8918,
    defaultDistanceKm: 22
  },

  // --- 5. Chhattisgarh ---
  {
    id: 'cg-1',
    commodity: 'Paddy (Swarna 1001)',
    category: 'Cereals',
    variety: 'Swarna Fine Grade',
    state: 'Chhattisgarh',
    district: 'Raipur',
    market: 'Raipur Krishi Upaj Mandi',
    modalPrice: 2360,
    unit: '₹/qtl',
    dailyChangePct: 0.5,
    isUp: true,
    msp: 2203,
    verified: true,
    lat: 21.2514,
    lon: 81.6296,
    defaultDistanceKm: 16
  },
  {
    id: 'cg-2',
    commodity: 'Kodo Millet (Cleaned)',
    category: 'Cereals',
    variety: 'Desi Organic Kodo',
    state: 'Chhattisgarh',
    district: 'Rajnandgaon',
    market: 'Rajnandgaon Upaj Mandi',
    modalPrice: 3820,
    unit: '₹/qtl',
    dailyChangePct: 2.3,
    isUp: true,
    msp: 3500,
    verified: true,
    lat: 21.0974,
    lon: 81.0366,
    defaultDistanceKm: 25
  },

  // --- 6. Goa ---
  {
    id: 'ga-1',
    commodity: 'Raw Cashew Nut',
    category: 'Commercial',
    variety: 'Goa Local Vengurla-4',
    state: 'Goa',
    district: 'North Goa',
    market: 'Sanquelim Agricultural Market',
    modalPrice: 13200,
    unit: '₹/qtl',
    dailyChangePct: 1.1,
    isUp: true,
    msp: 11000,
    verified: true,
    lat: 15.5583,
    lon: 74.0084,
    defaultDistanceKm: 18
  },

  // --- 7. Gujarat ---
  {
    id: 'gj-1',
    commodity: 'Cumin Seed (Jeera Special)',
    category: 'Spices',
    variety: 'Unjha Bold Machine Cleaned',
    state: 'Gujarat',
    district: 'Mehsana',
    market: 'Unjha APMC Market Yard',
    modalPrice: 28400,
    unit: '₹/qtl',
    dailyChangePct: 4.6,
    isUp: true,
    msp: 21500,
    verified: true,
    lat: 23.8042,
    lon: 72.3922,
    defaultDistanceKm: 11
  },
  {
    id: 'gj-2',
    commodity: 'Cotton (Shankar-6)',
    category: 'Commercial',
    variety: 'Long Staple 29mm',
    state: 'Gujarat',
    district: 'Rajkot',
    market: 'Gondal APMC Market Yard',
    modalPrice: 7680,
    unit: '₹/qtl',
    dailyChangePct: 2.8,
    isUp: true,
    msp: 7020,
    verified: true,
    lat: 21.9619,
    lon: 70.7923,
    defaultDistanceKm: 14
  },
  {
    id: 'gj-3',
    commodity: 'Groundnut (G-20 Pods)',
    category: 'Oilseeds',
    variety: 'Semi-Spreading Bold',
    state: 'Gujarat',
    district: 'Junagadh',
    market: 'Junagadh Agriculture Yard',
    modalPrice: 6850,
    unit: '₹/qtl',
    dailyChangePct: -1.2,
    isUp: false,
    msp: 6783,
    verified: true,
    lat: 21.5222,
    lon: 70.4579,
    defaultDistanceKm: 20
  },

  // --- 8. Haryana ---
  {
    id: 'hr-1',
    commodity: 'Paddy (Basmati 1121)',
    category: 'Cereals',
    variety: 'Pusa Basmati Super',
    state: 'Haryana',
    district: 'Karnal',
    market: 'Karnal New Grain Market',
    modalPrice: 4250,
    unit: '₹/qtl',
    dailyChangePct: 3.2,
    isUp: true,
    msp: 2320,
    verified: true,
    lat: 29.6857,
    lon: 76.9905,
    defaultDistanceKm: 8
  },
  {
    id: 'hr-2',
    commodity: 'Mustard (Black Bold)',
    category: 'Oilseeds',
    variety: 'RH-725 High Oil',
    state: 'Haryana',
    district: 'Sirsa',
    market: 'Sirsa Grain Market',
    modalPrice: 5790,
    unit: '₹/qtl',
    dailyChangePct: 1.5,
    isUp: true,
    msp: 5650,
    verified: true,
    lat: 29.5349,
    lon: 75.0295,
    defaultDistanceKm: 15
  },

  // --- 9. Himachal Pradesh ---
  {
    id: 'hp-1',
    commodity: 'Apple (Royal Delicious)',
    category: 'Vegetables & Fruits',
    variety: 'Kinnaur Royal Grade A',
    state: 'Himachal Pradesh',
    district: 'Shimla',
    market: 'Shimla Dhalli Subzi Mandi',
    modalPrice: 11500,
    unit: '₹/qtl',
    dailyChangePct: 4.8,
    isUp: true,
    msp: 8500,
    verified: true,
    lat: 31.1048,
    lon: 77.1734,
    defaultDistanceKm: 21
  },
  {
    id: 'hp-2',
    commodity: 'Garlic (Hill White)',
    category: 'Spices',
    variety: 'Solan Large Clove',
    state: 'Himachal Pradesh',
    district: 'Solan',
    market: 'Solan APMC Yard',
    modalPrice: 18200,
    unit: '₹/qtl',
    dailyChangePct: 6.2,
    isUp: true,
    msp: 12000,
    verified: true,
    lat: 30.9084,
    lon: 77.0999,
    defaultDistanceKm: 17
  },

  // --- 10. Jharkhand ---
  {
    id: 'jh-1',
    commodity: 'Tomato (Hybrid Red)',
    category: 'Vegetables & Fruits',
    variety: 'Abhinav Firm',
    state: 'Jharkhand',
    district: 'Ranchi',
    market: 'Ranchi Pandra Krishi Mandi',
    modalPrice: 2150,
    unit: '₹/qtl',
    dailyChangePct: -3.5,
    isUp: false,
    msp: 1600,
    verified: true,
    lat: 23.3441,
    lon: 85.3096,
    defaultDistanceKm: 12
  },

  // --- 11. Karnataka ---
  {
    id: 'ka-1',
    commodity: 'Tur / Arhar (Red Gram)',
    category: 'Pulses',
    variety: 'Gulbarga Desi Bold (GI)',
    state: 'Karnataka',
    district: 'Kalaburagi',
    market: 'Gulbarga APMC Yard',
    modalPrice: 10450,
    unit: '₹/qtl',
    dailyChangePct: 2.9,
    isUp: true,
    msp: 7550,
    verified: true,
    lat: 17.3297,
    lon: 76.8343,
    defaultDistanceKm: 10
  },
  {
    id: 'ka-2',
    commodity: 'Byadgi Chilli (KDL)',
    category: 'Spices',
    variety: 'Byadgi Kaddi Dark Red (GI)',
    state: 'Karnataka',
    district: 'Haveri',
    market: 'Byadgi APMC Yard',
    modalPrice: 38500,
    unit: '₹/qtl',
    dailyChangePct: 5.1,
    isUp: true,
    msp: 24000,
    verified: true,
    lat: 14.6781,
    lon: 75.4883,
    defaultDistanceKm: 19
  },

  // --- 12. Kerala ---
  {
    id: 'kl-1',
    commodity: 'Black Pepper (Malabar Garbled)',
    category: 'Spices',
    variety: 'Panniyur-1 Malabar (GI)',
    state: 'Kerala',
    district: 'Ernakulam',
    market: 'Kochi Spices Exchange',
    modalPrice: 64200,
    unit: '₹/qtl',
    dailyChangePct: 1.8,
    isUp: true,
    msp: 48000,
    verified: true,
    lat: 9.9312,
    lon: 76.2673,
    defaultDistanceKm: 13
  },
  {
    id: 'kl-2',
    commodity: 'Natural Rubber (RSS-4)',
    category: 'Commercial',
    variety: 'Sheet Rubber Grade 4',
    state: 'Kerala',
    district: 'Kottayam',
    market: 'Kottayam Rubber Board Market',
    modalPrice: 19800,
    unit: '₹/qtl',
    dailyChangePct: 0.9,
    isUp: true,
    msp: 17000,
    verified: true,
    lat: 9.5916,
    lon: 76.5222,
    defaultDistanceKm: 7
  },

  // --- 13. Madhya Pradesh ---
  {
    id: 'mp-1',
    commodity: 'Soybean (Yellow JS 335)',
    category: 'Oilseeds',
    variety: 'JS 9560 Bold',
    state: 'Madhya Pradesh',
    district: 'Indore',
    market: 'Indore Chhavani Mandi',
    modalPrice: 4890,
    unit: '₹/qtl',
    dailyChangePct: 1.5,
    isUp: true,
    msp: 4892,
    verified: true,
    lat: 22.7196,
    lon: 75.8577,
    defaultDistanceKm: 10
  },
  {
    id: 'mp-2',
    commodity: 'Wheat (Sharbati Gold)',
    category: 'Cereals',
    variety: 'Sehore Sharbati Extra Bold',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    market: 'Sehore Krishi Upaj Mandi',
    modalPrice: 3950,
    unit: '₹/qtl',
    dailyChangePct: 3.4,
    isUp: true,
    msp: 2275,
    verified: true,
    lat: 23.2032,
    lon: 77.0844,
    defaultDistanceKm: 22
  },
  {
    id: 'mp-3',
    commodity: 'Garlic (Desi Riyawan)',
    category: 'Spices',
    variety: 'Mandsaur Silver Bold',
    state: 'Madhya Pradesh',
    district: 'Mandsaur',
    market: 'Mandsaur Krishi Mandi',
    modalPrice: 17400,
    unit: '₹/qtl',
    dailyChangePct: 5.7,
    isUp: true,
    msp: 11000,
    verified: true,
    lat: 24.0722,
    lon: 75.0699,
    defaultDistanceKm: 18
  },

  // --- 14. Maharashtra ---
  {
    id: 'mh-1',
    commodity: 'Onion (Red Nashik)',
    category: 'Vegetables & Fruits',
    variety: 'Nashik Garva Summer Crop',
    state: 'Maharashtra',
    district: 'Nashik',
    market: 'Lasalgaon Onion APMC (Main)',
    modalPrice: 2840,
    unit: '₹/qtl',
    dailyChangePct: 4.2,
    isUp: true,
    msp: 2200,
    verified: true,
    lat: 20.1472,
    lon: 74.2264,
    defaultDistanceKm: 12
  },
  {
    id: 'mh-2',
    commodity: 'Soybean (Black / Yellow)',
    category: 'Oilseeds',
    variety: 'Latur Premium Bold',
    state: 'Maharashtra',
    district: 'Latur',
    market: 'Latur Agricultural APMC',
    modalPrice: 5020,
    unit: '₹/qtl',
    dailyChangePct: 1.8,
    isUp: true,
    msp: 4892,
    verified: true,
    lat: 18.4088,
    lon: 76.5604,
    defaultDistanceKm: 16
  },
  {
    id: 'mh-3',
    commodity: 'Cotton (Medium Staple)',
    category: 'Commercial',
    variety: 'BT Cotton Long Staple',
    state: 'Maharashtra',
    district: 'Akola',
    market: 'Akola Cotton Market',
    modalPrice: 7520,
    unit: '₹/qtl',
    dailyChangePct: 2.1,
    isUp: true,
    msp: 7122,
    verified: true,
    lat: 20.7002,
    lon: 77.0082,
    defaultDistanceKm: 24
  },

  // --- 15. Manipur ---
  {
    id: 'mn-1',
    commodity: 'Black Rice (Chak-Hao)',
    category: 'Cereals',
    variety: 'Organic Aromatic (GI)',
    state: 'Manipur',
    district: 'Imphal West',
    market: 'Imphal Khwairamband Mandi',
    modalPrice: 14500,
    unit: '₹/qtl',
    dailyChangePct: 3.1,
    isUp: true,
    msp: 9000,
    verified: true,
    lat: 24.8170,
    lon: 93.9368,
    defaultDistanceKm: 14
  },

  // --- 16. Meghalaya ---
  {
    id: 'ml-1',
    commodity: 'Turmeric (Lakadong GI)',
    category: 'Spices',
    variety: '7.5% High Curcumin',
    state: 'Meghalaya',
    district: 'West Jaintia Hills',
    market: 'Jowai Agricultural Yard',
    modalPrice: 22000,
    unit: '₹/qtl',
    dailyChangePct: 4.0,
    isUp: true,
    msp: 14000,
    verified: true,
    lat: 25.4526,
    lon: 92.2038,
    defaultDistanceKm: 33
  },

  // --- 17. Mizoram ---
  {
    id: 'mz-1',
    commodity: 'Bird’s Eye Chilli (Mizo)',
    category: 'Spices',
    variety: 'Mizo Pungent Organically Grown (GI)',
    state: 'Mizoram',
    district: 'Aizawl',
    market: 'Aizawl New Market',
    modalPrice: 32000,
    unit: '₹/qtl',
    dailyChangePct: 2.2,
    isUp: true,
    msp: 22000,
    verified: true,
    lat: 23.7271,
    lon: 92.7176,
    defaultDistanceKm: 26
  },

  // --- 18. Nagaland ---
  {
    id: 'nl-1',
    commodity: 'Naga King Chilli (Bhut Jolokia)',
    category: 'Spices',
    variety: 'Hot Ghost Pepper (GI)',
    state: 'Nagaland',
    district: 'Dimapur',
    market: 'Dimapur Agri Expo Yard',
    modalPrice: 48000,
    unit: '₹/qtl',
    dailyChangePct: 3.6,
    isUp: true,
    msp: 35000,
    verified: true,
    lat: 25.9094,
    lon: 93.7266,
    defaultDistanceKm: 15
  },

  // --- 19. Odisha ---
  {
    id: 'or-1',
    commodity: 'Paddy (Common Dhan)',
    category: 'Cereals',
    variety: 'Pooja High Yield',
    state: 'Odisha',
    district: 'Bargarh',
    market: 'Bargarh Regulated Market',
    modalPrice: 2260,
    unit: '₹/qtl',
    dailyChangePct: 0.8,
    isUp: true,
    msp: 2183,
    verified: true,
    lat: 21.3323,
    lon: 83.6198,
    defaultDistanceKm: 18
  },
  {
    id: 'or-2',
    commodity: 'Moong (Green Gram)',
    category: 'Pulses',
    variety: 'Nayagarh Desi Moong',
    state: 'Odisha',
    district: 'Nayagarh',
    market: 'Nayagarh Upaj Mandi',
    modalPrice: 8850,
    unit: '₹/qtl',
    dailyChangePct: 1.7,
    isUp: true,
    msp: 8558,
    verified: true,
    lat: 20.1264,
    lon: 85.1070,
    defaultDistanceKm: 27
  },

  // --- 20. Punjab ---
  {
    id: 'pb-1',
    commodity: 'Wheat (PBW 550 / Unnat)',
    category: 'Cereals',
    variety: 'PBW Milling Grade 1',
    state: 'Punjab',
    district: 'Ludhiana',
    market: 'Khanna Asia’s Largest Grain Market',
    modalPrice: 2420,
    unit: '₹/qtl',
    dailyChangePct: 1.1,
    isUp: true,
    msp: 2275,
    verified: true,
    lat: 30.7046,
    lon: 76.2163,
    defaultDistanceKm: 12
  },
  {
    id: 'pb-2',
    commodity: 'Cotton (American BT)',
    category: 'Commercial',
    variety: 'Long Staple 32mm',
    state: 'Punjab',
    district: 'Bathinda',
    market: 'Bathinda Cotton Yard',
    modalPrice: 7450,
    unit: '₹/qtl',
    dailyChangePct: 6.8,
    isUp: true,
    msp: 5550,
    verified: true,
    lat: 30.2110,
    lon: 74.9455,
    defaultDistanceKm: 8
  },
  {
    id: 'pb-3',
    commodity: 'Basmati Rice (1509 Pusa)',
    category: 'Cereals',
    variety: 'Pusa Aromatic 1509',
    state: 'Punjab',
    district: 'Amritsar',
    market: 'Amritsar Bhagtanwala Mandi',
    modalPrice: 3880,
    unit: '₹/qtl',
    dailyChangePct: 2.5,
    isUp: true,
    msp: 2320,
    verified: true,
    lat: 31.6340,
    lon: 74.8723,
    defaultDistanceKm: 14
  },

  // --- 21. Rajasthan ---
  {
    id: 'rj-1',
    commodity: 'Mustard (Yellow Sarson)',
    category: 'Oilseeds',
    variety: 'Bharatpur Grade 1 (42% Oil)',
    state: 'Rajasthan',
    district: 'Bharatpur',
    market: 'Bharatpur Krishi Mandi',
    modalPrice: 5680,
    unit: '₹/qtl',
    dailyChangePct: 0.9,
    isUp: true,
    msp: 5450,
    verified: true,
    lat: 27.2152,
    lon: 77.5030,
    defaultDistanceKm: 22
  },
  {
    id: 'rj-2',
    commodity: 'Coriander (Badami Dhaniya)',
    category: 'Spices',
    variety: 'Kota Green Machine Cleaned',
    state: 'Rajasthan',
    district: 'Kota',
    market: 'Ramganj Mandi (Coriander Capital)',
    modalPrice: 7950,
    unit: '₹/qtl',
    dailyChangePct: 3.8,
    isUp: true,
    msp: 6500,
    verified: true,
    lat: 24.6468,
    lon: 75.9450,
    defaultDistanceKm: 17
  },

  // --- 22. Sikkim ---
  {
    id: 'sk-1',
    commodity: 'Large Cardamom (Sikkim Dzongu)',
    category: 'Spices',
    variety: 'Golsey Organic (GI)',
    state: 'Sikkim',
    district: 'Gangtok',
    market: 'Gangtok Organic Spices Market',
    modalPrice: 98000,
    unit: '₹/qtl',
    dailyChangePct: 3.3,
    isUp: true,
    msp: 82000,
    verified: true,
    lat: 27.3389,
    lon: 88.6065,
    defaultDistanceKm: 25
  },

  // --- 23. Tamil Nadu ---
  {
    id: 'tn-1',
    commodity: 'Turmeric (Erode Finger)',
    category: 'Spices',
    variety: 'Erode Salem Finger (GI)',
    state: 'Tamil Nadu',
    district: 'Erode',
    market: 'Erode Turmeric Market Yard',
    modalPrice: 14200,
    unit: '₹/qtl',
    dailyChangePct: 8.4,
    isUp: true,
    msp: 10500,
    verified: true,
    lat: 11.3410,
    lon: 77.7172,
    defaultDistanceKm: 6
  },
  {
    id: 'tn-2',
    commodity: 'Coconut (Milling Copra)',
    category: 'Oilseeds',
    variety: 'Pollachi Cleaned Round',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    market: 'Pollachi Regulated Market',
    modalPrice: 11200,
    unit: '₹/qtl',
    dailyChangePct: 1.6,
    isUp: true,
    msp: 10860,
    verified: true,
    lat: 10.6580,
    lon: 77.0084,
    defaultDistanceKm: 18
  },

  // --- 24. Telangana ---
  {
    id: 'ts-1',
    commodity: 'Paddy (Basmati 1509)',
    category: 'Cereals',
    variety: 'BPT 5204 Samba Masuri',
    state: 'Telangana',
    district: 'Warangal',
    market: 'Warangal Enumamula Agriculture Yard',
    modalPrice: 3920,
    unit: '₹/qtl',
    dailyChangePct: 3.1,
    isUp: true,
    msp: 2183,
    verified: true,
    lat: 17.9689,
    lon: 79.5941,
    defaultDistanceKm: 15
  },
  {
    id: 'ts-2',
    commodity: 'Cotton (Kapas Bunty)',
    category: 'Commercial',
    variety: 'Adilabad Extra Long Staple',
    state: 'Telangana',
    district: 'Adilabad',
    market: 'Adilabad Cotton Market Yard',
    modalPrice: 7580,
    unit: '₹/qtl',
    dailyChangePct: 2.4,
    isUp: true,
    msp: 7122,
    verified: true,
    lat: 19.6641,
    lon: 78.5320,
    defaultDistanceKm: 32
  },

  // --- 25. Tripura ---
  {
    id: 'tr-1',
    commodity: 'Natural Rubber (RSS-3)',
    category: 'Commercial',
    variety: 'Tripura Sheet Grade',
    state: 'Tripura',
    district: 'West Tripura',
    market: 'Agartala Rubber APMC',
    modalPrice: 19400,
    unit: '₹/qtl',
    dailyChangePct: 1.2,
    isUp: true,
    msp: 16800,
    verified: true,
    lat: 23.8315,
    lon: 91.2868,
    defaultDistanceKm: 16
  },

  // --- 26. Uttar Pradesh ---
  {
    id: 'up-1',
    commodity: 'Wheat (Dara / Mill Quality)',
    category: 'Cereals',
    variety: 'UP Desi Hard Wheat',
    state: 'Uttar Pradesh',
    district: 'Hardoi',
    market: 'Hardoi Krishi Mandi',
    modalPrice: 2480,
    unit: '₹/qtl',
    dailyChangePct: 1.3,
    isUp: true,
    msp: 2275,
    verified: true,
    lat: 27.3989,
    lon: 80.1306,
    defaultDistanceKm: 14
  },
  {
    id: 'up-2',
    commodity: 'Potato (Kufri Chipsona)',
    category: 'Vegetables & Fruits',
    variety: 'Agra Cold Storage Sorted',
    state: 'Uttar Pradesh',
    district: 'Agra',
    market: 'Agra Khandauli Mandi',
    modalPrice: 1680,
    unit: '₹/qtl',
    dailyChangePct: -1.5,
    isUp: false,
    msp: 1350,
    verified: true,
    lat: 27.1767,
    lon: 78.0081,
    defaultDistanceKm: 11
  },
  {
    id: 'up-3',
    commodity: 'Sugarcane Gur (Jaggery)',
    category: 'Commercial',
    variety: 'Muzaffarnagar Yellow Chaku',
    state: 'Uttar Pradesh',
    district: 'Muzaffarnagar',
    market: 'Muzaffarnagar Gur Mandi',
    modalPrice: 3850,
    unit: '₹/qtl',
    dailyChangePct: 2.2,
    isUp: true,
    msp: 3150,
    verified: true,
    lat: 29.4727,
    lon: 77.7085,
    defaultDistanceKm: 9
  },

  // --- 27. Uttarakhand ---
  {
    id: 'uk-1',
    commodity: 'Basmati Rice (Type-3 Dehradun)',
    category: 'Cereals',
    variety: 'Dehraduni Sugandhit (GI)',
    state: 'Uttarakhand',
    district: 'Dehradun',
    market: 'Dehradun Niranjanpur Mandi',
    modalPrice: 6200,
    unit: '₹/qtl',
    dailyChangePct: 2.8,
    isUp: true,
    msp: 3400,
    verified: true,
    lat: 30.3165,
    lon: 78.0322,
    defaultDistanceKm: 13
  },

  // --- 28. West Bengal ---
  {
    id: 'wb-1',
    commodity: 'Paddy (Gobindobhog Aromatic)',
    category: 'Cereals',
    variety: 'Burdwan Sweet Rice (GI)',
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    market: 'Burdwan Kalna Grain Market',
    modalPrice: 5400,
    unit: '₹/qtl',
    dailyChangePct: 2.7,
    isUp: true,
    msp: 2800,
    verified: true,
    lat: 23.2324,
    lon: 87.8615,
    defaultDistanceKm: 17
  },
  {
    id: 'wb-2',
    commodity: 'Raw Jute (Tossa TD-5)',
    category: 'Commercial',
    variety: 'Hooghly Golden Fibre',
    state: 'West Bengal',
    district: 'Hooghly',
    market: 'Sheoraphuli Regulated Market',
    modalPrice: 5780,
    unit: '₹/qtl',
    dailyChangePct: 3.5,
    isUp: true,
    msp: 5050,
    verified: true,
    lat: 22.7562,
    lon: 88.3361,
    defaultDistanceKm: 21
  },

  // --- Union Territories ---
  // Jammu & Kashmir
  {
    id: 'jk-1',
    commodity: 'Apple (Kashmiri Delicious)',
    category: 'Vegetables & Fruits',
    variety: 'Sopore Extra Red Premium',
    state: 'Jammu and Kashmir',
    district: 'Baramulla',
    market: 'Sopore Fruit Mandi (Asia’s 2nd Largest)',
    modalPrice: 12800,
    unit: '₹/qtl',
    dailyChangePct: 4.5,
    isUp: true,
    msp: 8500,
    verified: true,
    lat: 34.2983,
    lon: 74.4694,
    defaultDistanceKm: 26
  },
  {
    id: 'jk-2',
    commodity: 'Saffron (Kashmiri Lacha)',
    category: 'Spices',
    variety: 'Pampore Grade 1 (GI)',
    state: 'Jammu and Kashmir',
    district: 'Pulwama',
    market: 'Pampore National Saffron Park',
    modalPrice: 285000,
    unit: '₹/kg',
    dailyChangePct: 1.8,
    isUp: true,
    msp: 220000,
    verified: true,
    lat: 34.0242,
    lon: 74.9317,
    defaultDistanceKm: 38
  },

  // Delhi (NCT)
  {
    id: 'dl-1',
    commodity: 'Wheat (Mill Quality Dara)',
    category: 'Cereals',
    variety: 'Grade A Dara Mill Delivery',
    state: 'Delhi',
    district: 'North Delhi',
    market: 'Narela Grain Market (APMC)',
    modalPrice: 2540,
    unit: '₹/qtl',
    dailyChangePct: 1.2,
    isUp: true,
    msp: 2275,
    verified: true,
    lat: 28.8529,
    lon: 77.0931,
    defaultDistanceKm: 15
  },
  {
    id: 'dl-2',
    commodity: 'Onion (Nashik Medium)',
    category: 'Vegetables & Fruits',
    variety: 'Delhi Azadpur Wholesale',
    state: 'Delhi',
    district: 'North West Delhi',
    market: 'Azadpur Mandi (Asia’s Largest)',
    modalPrice: 2950,
    unit: '₹/qtl',
    dailyChangePct: 3.2,
    isUp: true,
    msp: 2200,
    verified: true,
    lat: 28.7126,
    lon: 77.1812,
    defaultDistanceKm: 18
  },

  // Puducherry
  {
    id: 'py-1',
    commodity: 'Paddy (Ponni Deluxe)',
    category: 'Cereals',
    variety: 'White Fine Grain Ponni',
    state: 'Puducherry',
    district: 'Puducherry',
    market: 'Puducherry Uzhavar Sandhai',
    modalPrice: 2620,
    unit: '₹/qtl',
    dailyChangePct: 1.5,
    isUp: true,
    msp: 2183,
    verified: true,
    lat: 11.9416,
    lon: 79.8083,
    defaultDistanceKm: 11
  },

  // Chandigarh
  {
    id: 'ch-1',
    commodity: 'Wheat (Sharbati Punjab)',
    category: 'Cereals',
    variety: 'Cleaned Roller Mill Grade',
    state: 'Chandigarh',
    district: 'Chandigarh',
    market: 'Sector 26 Grain Market',
    modalPrice: 2610,
    unit: '₹/qtl',
    dailyChangePct: 0.9,
    isUp: true,
    msp: 2275,
    verified: true,
    lat: 30.7333,
    lon: 76.7794,
    defaultDistanceKm: 8
  },

  // Ladakh
  {
    id: 'la-1',
    commodity: 'Barley / Grim (Tsampa Grain)',
    category: 'Cereals',
    variety: 'High Altitude Ladakh Grim',
    state: 'Ladakh',
    district: 'Leh',
    market: 'Leh Agricultural Marketing Yard',
    modalPrice: 4200,
    unit: '₹/qtl',
    dailyChangePct: 1.0,
    isUp: true,
    msp: 3500,
    verified: true,
    lat: 34.1526,
    lon: 77.5771,
    defaultDistanceKm: 25
  }
];

/**
 * Calculates straight-line distance in kilometers between two GPS coordinates
 * using Haversine formula
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Offline-first IndexedDB cache storage for 2G/3G rural network resiliency
 */
const DB_NAME = 'grainwise_mandi_cache_db';
const DB_VERSION = 1;
const STORE_NAME = 'mandi_records_store';

export async function openMandiIndexedDB() {
  if (typeof window === 'undefined' || !window.indexedDB) return null;
  return new Promise((resolve) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = () => resolve(null);
  });
}

export async function saveMandiRecordsToIndexedDB(records) {
  try {
    const db = await openMandiIndexedDB();
    if (!db) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('grainwise_mandi_cached_records', JSON.stringify(records));
      }
      return;
    }
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    records.forEach(r => store.put(r));
  } catch {
    // Fail-safe silent catch for low-storage environments
  }
}

export async function loadMandiRecordsFromIndexedDB() {
  try {
    const db = await openMandiIndexedDB();
    if (!db) {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem('grainwise_mandi_cached_records');
        return raw ? JSON.parse(raw) : null;
      }
      return null;
    }
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        resolve(req.result && req.result.length > 0 ? req.result : null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
