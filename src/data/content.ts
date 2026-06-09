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
