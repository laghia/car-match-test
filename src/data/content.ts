import { buildCarDetailsUrl } from '../flow/config';

const RACV = 'https://www.racv.com.au';

export const assets = {
  hero: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
  heroMobile: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/720x540/green-mg-720x540.jpg`,
  logo: `${RACV}/content/dam/racv-assets/images/logos/racv-logo.svg`,
};

export const categories = [
  {
    id: 'electric',
    label: 'Electric',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/electric-420x280.jpg`,
    tag: 'electric-tag',
    badge: true,
  },
  {
    id: 'hybrids',
    label: 'Hybrids',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/hybrid-420x280.jpg`,
    tag: 'hybrid-and-plugin-tag',
  },
  {
    id: 'family',
    label: 'Family',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/family-420x280.jpg`,
    tag: 'family-tag',
  },
  {
    id: 'utes',
    label: 'Utes',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/ute-420x280.jpg`,
    tag: 'tradie-tag',
  },
  {
    id: '4x4',
    label: '4x4 off-road',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/4x4-offroad-420x280.jpg`,
    tag: '4x4-offroad-tag',
  },
  {
    id: 'towing',
    label: 'Towing',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/towing-420x280.jpg`,
    tag: 'towing-tag',
  },
  {
    id: 'sports',
    label: 'Sports & performance',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/sports-car-420x280.jpg`,
    tag: 'performance-tag',
  },
  {
    id: 'budget',
    label: 'Budget',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/hatch-back-420x280.jpg`,
    tag: 'first-car-tag',
  },
];

export const features = [
  {
    title: 'Estimated running costs',
    description:
      'Consider the hidden costs of owning and maintaining a vehicle with our comprehensive estimated running cost calculations.',
    icon: 'costs',
  },
  {
    title: 'Feature comparison',
    description:
      'Compare car features from over 4 million data points, and against the current industry benchmark.',
    icon: 'features',
  },
  {
    title: 'Expert car reviews',
    description:
      'Get the latest news and car reviews from RACV experts, including our best car guide and independent buying advice.',
    icon: 'reviews',
  },
];

export type Article = {
  title: string;
  description: string;
  label: string;
  image: string;
};

export const evArticles: Article[] = [
  {
    title: "BYD's rise to the top in Australia: how it plans to overtake Toyota",
    description:
      "BYD is set to become one of the top three car brands in Australia in 2026 and eventually plans to be market leader. Here's the company's outlook and strategy, from new EV and PHEV models to how it will better deal with customers",
    label: 'Electric',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-performance/banners-and-thumbnails/2026-BYD-Shark-6-Performance-off-road-RACV-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    title: 'Buying an electric car with finance: what to know',
    description:
      'Discover how electric vehicle finance unlocks exclusive incentives, slashes running costs compared to petrol cars, offers generous rebates, and guides you through a simple finance process—revealing the true value and savings of EV ownership.',
    label: 'Car Loans',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-sealion-5/banners-and-thumbnails/2026-BYD-Sealion-5-RACV-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    title: 'EV insurance in Australia: costs, coverage and what you need to know',
    description:
      "Everything Australians need to know about EV insurance in Victoria, including how much it costs, what's typically covered, and how insuring an electric vehicle compares with petrol and diesel cars.",
    label: 'Property',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2025-cars/byd/2025-byd-sealion-7/2025-byd-sealion-7-black/BYD-Sealion-7-Thumbnail.jpg.transform/imageDesktop/image.jpg`,
  },
];

export const reviewArticles: Article[] = [
  {
    title: '2026 Ford Everest review',
    description:
      "It's all about base camp with the latest Ford Everest, where a cheaper new Active model with a 2.0-litre single-turbo diesel engine slots into one of Australia's most popular family 4x4 off-road SUVs.",
    label: 'Review',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/ford/ford-everest/ford-everest-active/banners-and-thumbnails/2026-Ford-Everest-Active-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    title: '2026 BYD Shark 6 Dynamic Cab Chassis review',
    description:
      "The BYD Shark 6 Dynamic Cab Chassis opens up new options for customising the back end of BYD's popular plug-in hybrid dual-cab ute, but it does have its drawbacks.",
    label: 'Review',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-cab-chassis/banners-and-thumbnails/2026-BYD-Shark-6-Cab-Chassis-RACV-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    title: '2026 BYD Shark 6 Performance review',
    description:
      'The BYD Shark 6 Performance answers key criticisms levelled at the popular plug-in hybrid dual-cab ute, including the need for a higher towing capacity and better off-road capability. But are they worth the extra outlay?',
    label: 'Review',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-performance/banners-and-thumbnails/2026-BYD-Shark-6-Performance-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
];

export const adviceArticles: Article[] = [
  {
    title: 'What is a car insurance excess and how does it work?',
    description:
      "The term 'excess' is commonly used when dealing with a car insurance policy, but what does it mean, and what will it cost?",
    label: 'Property',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/safety/wet-roads/Wet-roads-0252-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    title: 'What causes potholes? How to avoid car damage',
    description:
      'Learn what causes potholes, how they damage tyres and suspension, and practical tips to help avoid costly car repairs when driving on damaged roads.',
    label: 'Car Safety',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/driving/potholes/banners---thumbnails/Pothole-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    title: 'How to change a tyre safely: step-by-step guide for drivers',
    description:
      'Learn how to change a tyre safely with this step-by-step guide. Discover what tools you need, how to fit a spare tyre, and when to call roadside assistance.',
    label: 'Car Maintenance',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/tyres/banners---thumbnails/Change-Tyre-RACV-ERA-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
];

export const awards = [
  `${RACV}/content/dam/racv-assets/images/logos/awards/loans/160x160/wemoney-electric-car-2026-160x160.jpg`,
  `${RACV}/content/dam/racv-assets/images/logos/awards/loans/160x160/wemoney-new-car-loans-160x160.jpg`,
  `${RACV}/content/dam/racv-assets/images/logos/awards/loans/160x160/wemoney-electric-car-160x160.jpg`,
  `${RACV}/content/dam/racv-assets/images/logos/awards/loans/160x160/wemoney-personal-loans-160x160.jpg`,
];

export const financeTiles = [
  {
    title: 'New car loans',
    description:
      'Buying brand new? Get a great rate, flexible terms, and no ongoing fees to help you hit the road sooner.',
    cta: 'Learn more',
    secondaryCta: 'Get my rate',
  },
  {
    title: 'Green car loans for EVs',
    description:
      'Switching to electric? Enjoy a discounted rate and flexible options designed for electric vehicles.',
    cta: 'Learn more',
    secondaryCta: 'Get my rate',
  },
  {
    title: 'Used car loans',
    description:
      'Found a second-hand gem? Finance it easily with competitive rates and support for dealer or private sales.',
    cta: 'Learn more',
    secondaryCta: 'Get my rate',
  },
];

export const popularMakes = [
  'BYD',
  'Toyota',
  'Hyundai',
  'MG',
  'GWM',
  'Chery',
  'Kia',
  'Subaru',
  'Tesla',
  'Mazda',
];

export const fuelTypes = [
  'Petrol',
  'Diesel',
  'Hybrid',
  'Electric',
  'Plug-in Hybrid',
  'Hydrogen',
  'Other',
];

export type VehicleResult = {
  id: number;
  title: string;
  variant: string;
  price: string;
  fuelType: string;
  engine: string;
  image: string;
  badge?: string;
};

export type RelatedCarYearTag = 'current-model' | 'coming-soon';

export type RelatedCar = VehicleResult & {
  variantCount: number;
  yearTag?: RelatedCarYearTag;
  showReview?: boolean;
};

export const categoryTagLabels: Record<string, string> = {
  'electric-tag': 'Electric',
  'hybrid-and-plugin-tag': 'Hybrid & plug-in',
  'family-tag': 'Family',
  'tradie-tag': 'Tradie',
  '4x4-offroad-tag': '4x4 off-road',
  'towing-tag': 'Towing',
  'performance-tag': 'Sports & performance',
  'first-car-tag': 'Budget',
};

export const electricSearchResults: VehicleResult[] = [
  {
    id: 1,
    title: '2026 BYD Seal Premium',
    variant: 'Extended Range RWD',
    price: '$45,990',
    fuelType: 'Electric',
    engine: '230kW single motor RWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2025-cars/byd/2025-byd-sealion-7/2025-byd-sealion-7-black/BYD-Sealion-7-Thumbnail.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 2,
    title: '2026 Tesla Model 3',
    variant: 'Long Range AWD',
    price: '$61,900',
    fuelType: 'Electric',
    engine: '366kW dual motor AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-sealion-5/banners-and-thumbnails/2026-BYD-Sealion-5-RACV-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 3,
    title: '2026 MG 4 Excite',
    variant: '51kWh Standard Range',
    price: '$38,990',
    fuelType: 'Electric',
    engine: '125kW single motor FWD',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/electric-420x280.jpg`,
  },
  {
    id: 4,
    title: '2026 Hyundai Ioniq 5',
    variant: 'Dynamiq Extended Range',
    price: '$52,000',
    fuelType: 'Electric',
    engine: '168kW single motor RWD',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
  },
  {
    id: 5,
    title: '2026 Kia EV6 Air',
    variant: 'Standard Range RWD',
    price: '$48,590',
    fuelType: 'Electric',
    engine: '125kW single motor RWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-performance/banners-and-thumbnails/2026-BYD-Shark-6-Performance-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 6,
    title: '2026 Polestar 2',
    variant: 'Long Range Single Motor',
    price: '$56,990',
    fuelType: 'Electric',
    engine: '170kW single motor FWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/ford/ford-everest/ford-everest-active/banners-and-thumbnails/2026-Ford-Everest-Active-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 7,
    title: '2026 BMW iX1',
    variant: 'xDrive30 M Sport',
    price: '$82,900',
    fuelType: 'Electric',
    engine: '230kW dual motor AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-cab-chassis/banners-and-thumbnails/2026-BYD-Shark-6-Cab-Chassis-RACV-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 8,
    title: '2026 Volvo EX30',
    variant: 'Plus Single Motor Extended Range',
    price: '$54,990',
    fuelType: 'Electric',
    engine: '200kW single motor RWD',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
  },
  {
    id: 9,
    title: '2026 Cupra Born',
    variant: 'V e-Boost Extended Range',
    price: '$52,990',
    fuelType: 'Electric',
    engine: '170kW single motor RWD',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/electric-420x280.jpg`,
  },
  {
    id: 10,
    title: '2026 Mercedes-Benz EQA',
    variant: '250+ Progressive',
    price: '$68,900',
    fuelType: 'Electric',
    engine: '140kW single motor FWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2025-cars/byd/2025-byd-sealion-7/2025-byd-sealion-7-black/BYD-Sealion-7-Thumbnail.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 11,
    title: '2026 Nissan Leaf',
    variant: 'e+ N-Trek',
    price: '$49,990',
    fuelType: 'Electric',
    engine: '160kW single motor FWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-sealion-5/banners-and-thumbnails/2026-BYD-Sealion-5-RACV-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 12,
    title: '2026 GWM Ora',
    variant: 'Extended Range GT',
    price: '$43,990',
    fuelType: 'Electric',
    engine: '126kW single motor FWD',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/hybrid-420x280.jpg`,
    badge: 'Electric',
  },
];

export const defaultSearchResults: VehicleResult[] = [
  {
    id: 1,
    title: '2024 Toyota RAV4 Cruiser',
    variant: '2.5 Hybrid AWD E-CVT',
    price: '$52,700',
    fuelType: 'Petrol (hybrid electric)',
    engine: '233kW automatic AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
    badge: 'Hybrid',
  },
  {
    id: 2,
    title: '2026 Ford Everest Active',
    variant: '2.0L Bi-Turbo Diesel 4WD',
    price: '$58,990',
    fuelType: 'Diesel',
    engine: '154kW automatic 4WD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/ford/ford-everest/ford-everest-active/banners-and-thumbnails/2026-Ford-Everest-Active-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 3,
    title: '2026 BYD Seal Premium',
    variant: 'Extended Range RWD',
    price: '$45,990',
    fuelType: 'Electric',
    engine: '230kW single motor RWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2025-cars/byd/2025-byd-sealion-7/2025-byd-sealion-7-black/BYD-Sealion-7-Thumbnail.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 4,
    title: '2026 MG 4 Excite',
    variant: '51kWh Standard Range',
    price: '$38,990',
    fuelType: 'Electric',
    engine: '125kW single motor FWD',
    image: `${RACV}/content/dam/racv-assets/images/icons/car-match/electric-420x280.jpg`,
  },
  {
    id: 5,
    title: '2026 BYD Shark 6 Performance',
    variant: 'Plug-in Hybrid Dual Cab',
    price: '$57,900',
    fuelType: 'Plug-in hybrid electric',
    engine: '321kW dual motor AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-performance/banners-and-thumbnails/2026-BYD-Shark-6-Performance-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  },
  {
    id: 6,
    title: '2026 Toyota RAV4 GX',
    variant: '2.5 Hybrid AWD E-CVT',
    price: '$42,500',
    fuelType: 'Petrol (hybrid electric)',
    engine: '163kW automatic AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
  },
];

export const searchFilterSections = [
  {
    title: 'Basic',
    filters: [
      { label: 'Current / previous model', count: 0 },
      { label: 'Make and model', count: 1, value: 'Ford Mustang' },
      { label: 'Fuel type', count: 1, value: 'Electric' },
      { label: 'Year', count: 0 },
      { label: 'Price', count: 0 },
      { label: 'Drive type', count: 0 },
      { label: 'Transmission', count: 0 },
      { label: 'Cylinders', count: 0 },
      { label: 'Towing capacity', count: 0 },
      { label: 'Safety ratings', count: 0 },
      { label: 'Lifestyle', count: 0 },
      { label: 'Body type', count: 0 },
      { label: 'Doors', count: 0 },
      { label: 'Seats', count: 0 },
      { label: 'Rating', count: 0 },
    ],
  },
  {
    title: 'Electric systems',
    filters: [
      { label: 'Battery size', count: 0 },
      { label: 'Max charging speed', count: 1, value: 'Very Fast (150 - 300kW)' },
      { label: 'Plug type', count: 0 },
    ],
  },
  {
    title: 'Popular features',
    filters: [
      { label: 'Driver assistance', count: 0 },
      { label: 'In-car technology', count: 2, value: 'Apple CarPlay, Android Auto' },
      { label: 'Practicality', count: 2, value: 'Large boot, Roof rails' },
      { label: 'Safety & security', count: 0 },
    ],
  },
];

export type CarDetailsVariant = {
  id: string;
  trim: string;
  price: string;
  engine: string;
  isHybrid?: boolean;
};

export type CarDetailsSpec = {
  label: string;
  value: string;
};

export type CarDetailsFuelFilter = {
  id: string;
  label: string;
  active?: boolean;
};

export type RunningCostsLineItem = {
  id: string;
  icon: string;
  label: string;
  value: string;
  footnote?: string;
  valueFootnote?: string;
  linkLabel?: string;
  linkHref?: string;
};

export type RunningCostsData = {
  loanCost: number;
  runningCost: number;
  lineItems: RunningCostsLineItem[];
};

export type VehicleSpecRow = {
  label: string;
  value: string;
  footnote?: string;
};

export type VehicleSpecAccordion = {
  id: string;
  title: string;
  rows: VehicleSpecRow[];
};

export type VehicleSpecsData = {
  overview: VehicleSpecRow[];
  features: VehicleSpecAccordion[];
  specifications: VehicleSpecAccordion[];
};

export type CarDetails = {
  make: string;
  model: string;
  makeSlug: string;
  modelSlug: string;
  variantSlug: string;
  year: number;
  title: string;
  variant: string;
  price: string;
  monthlyRepayment: string;
  images: string[];
  moreImagesCount: number;
  specs: CarDetailsSpec[];
  fuelFilters: CarDetailsFuelFilter[];
  variants: CarDetailsVariant[];
  variantCount: number;
  yearOptions: number[];
  selectedVariantId: string;
  ancapYear?: string;
  ancapStars?: number;
  runningCosts: RunningCostsData;
  vehicleSpecs: VehicleSpecsData;
  relatedCars: RelatedCar[];
};

const defaultRunningCostLineItems: RunningCostsLineItem[] = [
  {
    id: 'registration',
    icon: '🪪',
    label: 'Victorian registration',
    value: '$96',
  },
  {
    id: 'fuel',
    icon: '⛽',
    label: 'Fuel / electricity',
    value: '$104',
    valueFootnote: '^',
  },
  {
    id: 'servicing',
    icon: '🔧',
    label: 'Servicing',
    value: '$45',
  },
  {
    id: 'tyres',
    icon: '🛞',
    label: 'Tyres',
    value: '$16',
  },
  {
    id: 'battery',
    icon: '🔋',
    label: 'Battery',
    value: '$8',
    valueFootnote: '^',
  },
  {
    id: 'roadside',
    icon: '🚐',
    label: 'RACV Extra Care Roadside Assistance',
    footnote: '#',
    value: '$18',
    linkLabel: 'Join now',
  },
];

const cheryRunningCosts: RunningCostsData = {
  loanCost: 574,
  runningCost: 314,
  lineItems: [
    {
      id: 'registration',
      icon: '🪪',
      label: 'Victorian registration',
      value: '$78',
    },
    {
      id: 'fuel',
      icon: '⛽',
      label: 'Fuel / electricity',
      value: '$165',
      valueFootnote: '^',
    },
    {
      id: 'servicing',
      icon: '🔧',
      label: 'Servicing',
      value: '$25',
    },
    {
      id: 'tyres',
      icon: '🛞',
      label: 'Tyres',
      value: '$18',
    },
    {
      id: 'battery',
      icon: '🔋',
      label: 'Battery',
      value: '$8',
      valueFootnote: '^',
    },
    {
      id: 'roadside',
      icon: '🚐',
      label: 'RACV Extra Care Roadside Assistance',
      footnote: '#',
      value: '$20',
      linkLabel: 'Join now',
    },
  ],
};

const rav4RunningCosts: RunningCostsData = {
  loanCost: 1385,
  runningCost: 440,
  lineItems: [
    {
      id: 'insurance',
      icon: '🚗',
      label: 'RACV Comprehensive Car Insurance***',
      value: 'N/A',
      linkLabel: 'Get a quote',
    },
    ...defaultRunningCostLineItems,
  ],
};

const featureAccordions: VehicleSpecAccordion[] = [
  {
    id: 'safety-security',
    title: 'Safety and security',
    rows: [
      { label: 'Autonomous emergency braking', value: 'Standard' },
      { label: 'Lane departure warning', value: 'Standard' },
      { label: 'Reversing camera', value: 'Standard' },
    ],
  },
  {
    id: 'in-car-technology',
    title: 'In-car technology',
    rows: [
      { label: 'Apple CarPlay', value: 'Standard' },
      { label: 'Android Auto', value: 'Standard' },
      { label: 'Digital instrument cluster', value: 'Standard' },
    ],
  },
  {
    id: 'driver-assistance',
    title: 'Driver assistance',
    rows: [
      { label: 'Adaptive cruise control', value: 'Optional' },
      { label: 'Blind spot monitoring', value: 'Optional' },
    ],
  },
  {
    id: 'convenience',
    title: 'Convenience',
    rows: [
      { label: 'Keyless entry', value: 'Standard' },
      { label: 'Power tailgate', value: 'Not available' },
    ],
  },
];

const specificationAccordions: VehicleSpecAccordion[] = [
  {
    id: 'engine-transmission',
    title: 'Engine and transmission',
    rows: [
      { label: 'Engine type', value: 'Turbo petrol' },
      { label: 'Cylinders', value: '4' },
    ],
  },
  {
    id: 'battery-charging',
    title: 'Battery and charging',
    rows: [{ label: 'Battery type', value: 'N/A' }],
  },
  {
    id: 'dimensions-weight',
    title: 'Dimensions and weight',
    rows: [
      { label: 'Length', value: '4,318mm' },
      { label: 'Width', value: '1,831mm' },
      { label: 'Height', value: '1,662mm' },
    ],
  },
  {
    id: 'cargo-towing',
    title: 'Cargo and towing capacity',
    rows: [
      { label: 'Boot volume', value: '401L' },
      { label: 'Towing capacity (braked)', value: '750kg' },
    ],
  },
  {
    id: 'fuel-economy',
    title: 'Fuel economy and emissions',
    rows: [
      { label: 'Fuel consumption (combined)', value: '7.1L/100km (WLTP)', footnote: '†' },
      { label: 'CO2 emissions (combined)', value: '162g/km (WLTP)', footnote: '†' },
    ],
  },
  {
    id: 'warranty-services',
    title: 'Warranty and services',
    rows: [
      { label: 'Warranty', value: '7 Years/unlimited km' },
      { label: 'Capped price service', value: '1 years/15,000km' },
    ],
  },
  {
    id: 'wheels-tyres',
    title: 'Wheels and tyres',
    rows: [{ label: 'Tyre size', value: '215/60 R17' }],
  },
  {
    id: 'off-road',
    title: 'Off road',
    rows: [{ label: 'Ground clearance', value: '190mm' }],
  },
];

const cheryVehicleSpecs: VehicleSpecsData = {
  overview: [
    { label: 'Body type', value: 'SUV' },
    { label: 'Number of doors', value: '5' },
    { label: 'Number of seats', value: '5' },
    { label: 'Fuel Type', value: 'Petrol' },
    { label: 'Power / torque', value: '108kW/210Nm' },
    { label: 'Transmission', value: 'automatic' },
    { label: 'Drive wheels', value: 'FWD' },
    { label: 'Engine size', value: '1.5L' },
    { label: 'Towing capacity (braked)', value: '750kg' },
    { label: 'Fuel consumption (combined)', value: '7.1L/100km (WLTP)', footnote: '†' },
    { label: 'CO2 emissions (combined)', value: '162g/km (WLTP)', footnote: '†' },
    { label: 'Warranty', value: '7 Years/unlimited km' },
    { label: 'Capped price service', value: '1 years/15,000km' },
    { label: 'Safety rating', value: '5 stars' },
    { label: 'Build country', value: 'China' },
  ],
  features: featureAccordions,
  specifications: specificationAccordions,
};

const rav4VehicleSpecs: VehicleSpecsData = {
  overview: [
    { label: 'Body type', value: 'SUV' },
    { label: 'Number of doors', value: '5' },
    { label: 'Number of seats', value: '5' },
    { label: 'Fuel Type', value: 'Hybrid' },
    { label: 'Power / torque', value: '163kW/323Nm' },
    { label: 'Transmission', value: 'automatic' },
    { label: 'Drive wheels', value: '4x4' },
    { label: 'Engine size', value: '2.5L' },
    { label: 'Towing capacity (braked)', value: '1,500kg' },
    { label: 'Fuel consumption (combined)', value: '4.7L/100km (WLTP)', footnote: '†' },
    { label: 'Energy consumption (combined)', value: '21.2kW/100km (WLTP)', footnote: '†' },
    { label: 'CO2 emissions (combined)', value: '107g/km (WLTP)', footnote: '†' },
    { label: 'Warranty', value: '5 Years/unlimited km' },
    { label: 'Capped price service', value: '1 years/15,000km' },
    { label: 'Safety rating', value: '5 stars' },
    { label: 'Build country', value: 'Japan' },
  ],
  features: featureAccordions,
  specifications: specificationAccordions,
};

const cheryTiggoImages = [
  `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
  `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/ford/ford-everest/ford-everest-active/banners-and-thumbnails/2026-Ford-Everest-Active-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  `${RACV}/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/byd/byd-shark-6/shark-6-performance/banners-and-thumbnails/2026-BYD-Shark-6-Performance-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg`,
  `${RACV}/content/dam/racv-assets/images/icons/car-match/electric-420x280.jpg`,
];

const relatedCarsMock: RelatedCar[] = [
  {
    id: 101,
    title: '2024 Toyota RAV4 Cruiser',
    variant: '2.5 Hybrid E-CVT',
    price: '$49,700',
    fuelType: 'Petrol (hybrid electric)',
    engine: '163kW automatic',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
    badge: 'Hybrid',
    variantCount: 11,
    yearTag: 'current-model',
    showReview: true,
  },
  {
    id: 102,
    title: '2023 Toyota RAV4 Cruiser',
    variant: '2.5 Hybrid AWD E-CVT',
    price: '$49,700',
    fuelType: 'Petrol (hybrid electric)',
    engine: '233kW automatic AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
    badge: 'Hybrid',
    variantCount: 11,
    yearTag: 'current-model',
    showReview: true,
  },
  {
    id: 103,
    title: '2024 Toyota RAV4 Cruiser',
    variant: '2.5 Hybrid AWD E-CVT',
    price: '$49,700',
    fuelType: 'Petrol (hybrid electric)',
    engine: '233kW automatic AWD',
    image: `${RACV}/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg`,
    badge: 'Hybrid',
    variantCount: 11,
    yearTag: 'coming-soon',
    showReview: true,
  },
];

const rav4Mock: CarDetails = {
  make: 'Toyota',
  model: 'RAV4',
  makeSlug: 'toyota',
  modelSlug: 'rav4',
  variantSlug: 'cruiser-2-5-hybrid-e-cvt',
  year: 2023,
  title: '2023 Toyota RAV4 Cruiser',
  variant: '2.5 Hybrid E-CVT',
  price: '$49,700',
  monthlyRepayment: '$891',
  images: cheryTiggoImages,
  moreImagesCount: 19,
  ancapYear: '2019',
  ancapStars: 5,
  runningCosts: rav4RunningCosts,
  vehicleSpecs: rav4VehicleSpecs,
  specs: [
    { label: 'Fuel type', value: 'Hybrid' },
    { label: 'Drive wheels', value: '4x4' },
    { label: 'Body type', value: 'SUV' },
    { label: 'Seats', value: '5 seats' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Power', value: '163kW' },
    { label: 'Towing capacity', value: '1,500kg' },
  ],
  fuelFilters: [
    { id: 'all', label: 'All', active: true },
    { id: 'hybrid-electric', label: 'Hybrid electric (9)' },
    { id: 'petrol', label: 'Petrol (5)' },
    { id: 'hybrid', label: 'Hybrid (5)' },
    { id: 'electric', label: 'Electric (2)' },
    { id: 'hydrogen', label: 'Hydrogen (1)' },
  ],
  variantCount: 14,
  yearOptions: [2023, 2022, 2021, 2020, 2019],
  selectedVariantId: 'cruiser-hybrid-ecvt',
  variants: [
    {
      id: 'cruiser-hybrid-ecvt',
      trim: 'Cruiser',
      price: '$49,700',
      engine: '2.5 Hybrid E-CVT',
      isHybrid: true,
    },
    {
      id: 'cruiser-2-0-cvt',
      trim: 'Cruiser',
      price: '$47,200',
      engine: '2.0 CVT',
    },
    {
      id: 'cruiser-hybrid-awd',
      trim: 'Cruiser',
      price: '$52,700',
      engine: '2.5 Hybrid AWD E-CVT',
      isHybrid: true,
    },
    {
      id: 'edge-hybrid-awd',
      trim: 'Edge',
      price: '$56,650',
      engine: '2.5 Hybrid AWD Auto',
      isHybrid: true,
    },
    {
      id: 'edge-awd',
      trim: 'Edge',
      price: '$54,520',
      engine: '2.5 AWD Auto',
    },
    {
      id: 'gxl-hybrid',
      trim: 'GXL',
      price: '$44,100',
      engine: '2.5 Hybrid E-CVT',
      isHybrid: true,
    },
  ],
  relatedCars: relatedCarsMock,
};

const cheryTiggoMock: CarDetails = {
  make: 'Chery',
  model: 'Tiggo 4',
  makeSlug: 'chery',
  modelSlug: 'tiggo-4',
  variantSlug: 'ultimate-8448836f0465815247e42d2961a082dcdc2bda6',
  year: 2025,
  title: '2025 Chery Tiggo 4 Ultimate',
  variant: '1.5 Turbo CVT',
  price: '$29,990',
  monthlyRepayment: '$542',
  images: cheryTiggoImages,
  moreImagesCount: 12,
  ancapYear: '2024',
  ancapStars: 5,
  runningCosts: cheryRunningCosts,
  vehicleSpecs: cheryVehicleSpecs,
  specs: [
    { label: 'Fuel type', value: 'Petrol' },
    { label: 'Drive wheels', value: 'FWD' },
    { label: 'Body type', value: 'SUV' },
    { label: 'Seats', value: '5 seats' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Power', value: '108kW' },
    { label: 'Towing capacity', value: '750kg' },
  ],
  fuelFilters: [
    { id: 'all', label: 'All', active: true },
    { id: 'petrol', label: 'Petrol (4)' },
  ],
  variantCount: 4,
  yearOptions: [2025, 2024],
  selectedVariantId: 'ultimate',
  variants: [
    {
      id: 'ultimate',
      trim: 'Ultimate',
      price: '$29,990',
      engine: '1.5 Turbo CVT',
    },
    {
      id: 'pro',
      trim: 'Pro',
      price: '$27,490',
      engine: '1.5 Turbo CVT',
    },
    {
      id: 'elite',
      trim: 'Elite',
      price: '$25,990',
      engine: '1.5 Turbo CVT',
    },
    {
      id: 'city',
      trim: 'City',
      price: '$23,990',
      engine: '1.5 CVT',
    },
  ],
  relatedCars: relatedCarsMock,
};

const carDetailsByKey: Record<string, CarDetails> = {
  'chery/tiggo-4': cheryTiggoMock,
  'toyota/rav4': rav4Mock,
};

export function getCarDetails(
  makeSlug: string,
  modelSlug: string,
  variantSlug: string,
): CarDetails {
  const key = `${makeSlug}/${modelSlug}`;
  const base = carDetailsByKey[key] ?? rav4Mock;

  return {
    ...base,
    makeSlug,
    modelSlug,
    variantSlug,
    make: base.makeSlug === makeSlug ? base.make : titleCase(makeSlug),
    model: base.modelSlug === modelSlug ? base.model : titleCase(modelSlug.replace(/-/g, ' ')),
  };
}

function titleCase(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getVehicleDetailsPath(vehicle: VehicleResult): string {
  const titleParts = vehicle.title.split(' ');
  const make = titleParts[1] ?? 'car';
  const model = titleParts.slice(2).join(' ') || 'model';
  const variantSlug = `${vehicle.variant.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${vehicle.id}`;

  return buildCarDetailsUrl(make, model, variantSlug);
}
