export type QuoteAudienceMode = 'homeowner' | 'contractor';

export type ServiceCategory =
  | 'regular-fortnightly'
  | 'regular-monthly'
  | 'one-off-cleanup'
  | 'softscaping'
  | 'hardscaping';

export type GrassType = 'buffalo' | 'kikuyu' | 'couch-zoysia';

export type GrowthCondition = 'maintained' | 'moderate-growth' | 'overgrown';

export type AccessTerrain = 'open-flat' | 'standard-gates' | 'obstacles-slope';

export type WasteDisposal = 'council-bin' | 'mulch-onsite' | 'bag-and-tip';

export interface SiteConfig {
  phone: string;
  email: string;
  abn: string;
  hours: string;
  saturdayConfirmed: boolean;
  insuranceActive: boolean;
  epaLicenceActive: boolean;
  facebookUrl: string;
  instagramUrl: string;
  gbpUrl: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  phone: '0423 715 078',
  email: '',
  abn: '45 076 364 953',
  hours: 'Monday–Friday, 7:30am–4:30pm (Saturday by arrangement)',
  saturdayConfirmed: false,
  insuranceActive: false,
  epaLicenceActive: false,
  facebookUrl: '',
  instagramUrl: '',
  gbpUrl: '',
};

export interface ServiceItem {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  note?: string;
  calculatorCategory: ServiceCategory;
  requiresEpaLicence?: boolean;
  imageSrc: string;
  imageAlt: string;
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'lawn-mowing',
    name: 'Lawn mowing',
    priceLabel: 'From $75 per visit (under 100 m²)',
    description:
      'Regular mowing with edging, whipper-snipping and a full blow-down of paths and driveways. Fortnightly in the growing season, monthly in winter.',
    calculatorCategory: 'regular-fortnightly',
    imageSrc: '/assets/aistudio/lawn-mowing-1x1_900763f8.jpg',
    imageAlt: 'Freshly mowed lawn beside clean concrete pathway with red lawn mower in Chester Hill',
  },
  {
    id: 'garden-maintenance',
    name: 'Garden maintenance',
    priceLabel: 'Plans from $125 per 2-hour visit',
    description:
      'Weeding, pruning, shaping, mulching and a general tidy so your garden stays looking its best between visits.',
    calculatorCategory: 'regular-monthly',
    imageSrc: '/assets/aistudio/garden-maintenance-1x1_294687e1.jpg',
    imageAlt: 'Veronica Rolles hand-pruning native grevilleas in a mulched suburban garden bed',
  },
  {
    id: 'hedge-trimming',
    name: 'Hedge trimming',
    priceLabel: '$65 per hour + green waste',
    description: 'Neat, even hedges and shrubs, with all clippings removed.',
    calculatorCategory: 'softscaping',
    imageSrc: '/assets/aistudio/hedge-trimming-1x1_5101f44f.jpg',
    imageAlt: 'Veronica Rolles trimming a suburban hedge to a crisp level line',
  },
  {
    id: 'garden-cleanups',
    name: 'Garden cleanups',
    priceLabel: 'From $260',
    description:
      "Overgrown yards, end-of-lease and pre-sale cleanups. We'll get it back under control in one visit.",
    calculatorCategory: 'one-off-cleanup',
    imageSrc: '/assets/aistudio/garden-cleanup-1x1_6bc5f0d5.jpg',
    imageAlt: 'Veronica clearing overgrown weeds and branches into a wheelbarrow during a yard cleanup',
  },
  {
    id: 'pressure-cleaning',
    name: 'Pressure cleaning',
    priceLabel: 'From $140 (2-hour min); driveways quoted',
    description:
      'Driveways, paths, patios, pavers and fences brought back to like-new.',
    calculatorCategory: 'hardscaping',
    imageSrc: '/assets/aistudio/pressure-cleaning-1x1_436031d8.jpg',
    imageAlt: 'Veronica high-pressure cleaning grime off a suburban concrete driveway',
  },
  {
    id: 'green-waste-removal',
    name: 'Green waste removal',
    priceLabel: '$140–$200 per load',
    description: "We take it away so you don't have to — no skip bins needed.",
    calculatorCategory: 'one-off-cleanup',
    imageSrc: '/assets/aistudio/green-waste-removal-1x1_188fbcb5.jpg',
    imageAlt: 'Green garden waste neatly bagged and loaded for haulage without needing a skip bin',
  },
  {
    id: 'small-tree-removal',
    name: 'Small tree removal',
    priceLabel: 'Quoted per job',
    description:
      'Removal of small trees and large shrubs, safely felled from the ground.',
    note: 'Council approval must be in place before work starts.',
    calculatorCategory: 'one-off-cleanup',
    imageSrc: '/assets/aistudio/small-tree-removal-1x1_21cc1959.jpg',
    imageAlt: 'Safe ground-level removal and sectioning of small residential trees and shrubs',
  },
  {
    id: 'planting-mulching',
    name: 'Planting & mulching',
    priceLabel: '$65 per hour + materials',
    description: 'New garden beds, seasonal planting, turf patches and fresh mulch.',
    calculatorCategory: 'softscaping',
    imageSrc: '/assets/aistudio/planting-and-mulching-1x1_059b3d24.jpg',
    imageAlt: 'Newly planted Australian native shrubs set in dark organic mulch along a timber edge',
  },
  {
    id: 'weed-spraying',
    name: 'Targeted weed spraying',
    priceLabel: 'Quoted per job',
    description:
      'Licensed weed treatment for paths, driveways, and garden bed perimeters.',
    note: 'NSW EPA ground applicator licence active.',
    calculatorCategory: 'regular-fortnightly',
    requiresEpaLicence: true,
    imageSrc: '/assets/aistudio/nissan-elgrand-van-3x2_ee626443.jpg',
    imageAlt: 'The Avid Gardener service vehicle equipped for licensed garden care',
  },
];

export interface BeforeAfterItem {
  id: string;
  indexLabel: string;
  title: string;
  categoryLabel: string;
  serviceName: string;
  calculatorCategory: ServiceCategory;
  summary: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
}

export const BEFORE_AFTER_GALLERY: BeforeAfterItem[] = [
  {
    id: 'backyard-cleanup',
    indexLabel: '01',
    title: 'Backyard Overgrown Cleanup',
    categoryLabel: 'Garden Cleanup · Bankstown Area',
    serviceName: 'Garden cleanup',
    calculatorCategory: 'one-off-cleanup',
    summary:
      'Full cutback of knee-high grass and lantana along the timber fence line, crisp perimeter edging, and green waste cleared in one visit.',
    beforeSrc: '/assets/aistudio/01-backyard-before_c737d24a.jpg',
    beforeAlt: 'Overgrown suburban backyard with tall weeds along the timber fence before cleanup',
    afterSrc: '/assets/aistudio/01-backyard-after_2f4b961e.jpg',
    afterAlt: 'Neatly mowed backyard lawn with cleared fence line and tidy perimeter borders after cleanup',
  },
  {
    id: 'hedge-trimming',
    indexLabel: '02',
    title: 'Hedge Trimming & Shaping',
    categoryLabel: 'Hedge Trimming · Sefton',
    serviceName: 'Hedge trimming',
    calculatorCategory: 'softscaping',
    summary:
      'Tall, uneven boundary hedging reshaped to a level top and square face, with all clippings raked and removed.',
    beforeSrc: '/assets/aistudio/02-hedge-before_eabedd27.jpg',
    beforeAlt: 'Overgrown uneven garden hedge before trimming',
    afterSrc: '/assets/aistudio/02-hedge-after_ad6f7fe0.jpg',
    afterAlt: 'Levelled and cleanly shaped boundary hedge after trimming',
  },
  {
    id: 'garden-bed-refresh',
    indexLabel: '03',
    title: 'Garden Bed Weeding & Mulching',
    categoryLabel: 'Planting & Mulching · Chester Hill',
    serviceName: 'Planting & mulching',
    calculatorCategory: 'softscaping',
    summary:
      'Manual weed removal around established shrubs followed by a fresh dark mulch layer to lock in moisture and suppress regrowth.',
    beforeSrc: '/assets/aistudio/03-garden-bed-before_300fb625.jpg',
    beforeAlt: 'Weedy, dry front garden bed before weeding and mulching',
    afterSrc: '/assets/aistudio/03-garden-bed-after_b181e961.jpg',
    afterAlt: 'Weed-free garden bed finished with fresh dark organic mulch',
  },
  {
    id: 'driveway-pressure-clean',
    indexLabel: '04',
    title: 'Concrete Driveway Pressure Clean',
    categoryLabel: 'Pressure Cleaning · Bass Hill',
    serviceName: 'Pressure cleaning',
    calculatorCategory: 'hardscaping',
    summary:
      'Years of dark surface grime, algae, and tyre marks lifted cleanly from concrete slabs and path joints.',
    beforeSrc: '/assets/aistudio/04-driveway-before_99076ced.jpg',
    beforeAlt: 'Dark weathered concrete driveway stained with grime and moss before pressure cleaning',
    afterSrc: '/assets/aistudio/04-driveway-after_bb832f28.jpg',
    afterAlt: 'Bright, even concrete driveway surface after pressure cleaning',
  },
  {
    id: 'front-lawn-restoration',
    indexLabel: '05',
    title: 'Front Lawn & Edge Restoration',
    categoryLabel: 'Lawn Mowing · Regents Park',
    serviceName: 'Lawn mowing',
    calculatorCategory: 'regular-fortnightly',
    summary:
      'Overgrown nature strip and front lawn cut back in clean passes, vertical kerb edging restored, and concrete blown spotless.',
    beforeSrc: '/assets/aistudio/05-front-lawn-before_47fbace9.jpg',
    beforeAlt: 'Untidy overgrown front lawn spilling over the kerb and path before mowing',
    afterSrc: '/assets/aistudio/05-front-lawn-after_77bf88ae.jpg',
    afterAlt: 'Crisply striped front lawn with sharp concrete edging after mowing',
  },
  {
    id: 'side-path-cleanup',
    indexLabel: '06',
    title: 'Side Path Cleanup & Sweep',
    categoryLabel: 'Garden Maintenance · Georges Hall',
    serviceName: 'Garden maintenance',
    calculatorCategory: 'regular-monthly',
    summary:
      'Overgrown side-access corridor cleared of encroaching weeds and leaf litter, restoring clean, safe access down the house.',
    beforeSrc: '/assets/aistudio/06-side-path-before_2ef36268.jpg',
    beforeAlt: 'Side house path cluttered with tall weeds and fallen leaves before cleanup',
    afterSrc: '/assets/aistudio/06-side-path-after_46dadec9.jpg',
    afterAlt: 'Clear, weeded and swept side-access concrete path after garden maintenance',
  },
];

export interface MaintenancePlan {
  id: string;
  name: string;
  included: string;
  price: string;
  sizePreset: 'Small (under 100 m²)' | 'Medium (100–250 m²)' | 'Large (250 m²+)' | 'Not sure';
  serviceTag: string;
}

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'lawn-small',
    name: 'Lawn Care — Small',
    included: 'Mow, edge, whipper-snip, blow. Lawns under 100 m²',
    price: '$75 / visit',
    sizePreset: 'Small (under 100 m²)',
    serviceTag: 'Lawn mowing',
  },
  {
    id: 'lawn-medium',
    name: 'Lawn Care — Medium',
    included: 'Same, lawns 100–250 m²',
    price: '$110 / visit',
    sizePreset: 'Medium (100–250 m²)',
    serviceTag: 'Lawn mowing',
  },
  {
    id: 'lawn-large',
    name: 'Lawn Care — Large',
    included: 'Same, lawns 250–500 m²',
    price: '$150 / visit',
    sizePreset: 'Large (250 m²+)',
    serviceTag: 'Lawn mowing',
  },
  {
    id: 'garden-care',
    name: 'Garden Care',
    included: '2-hour visit: weeding, pruning, hedging, tidy',
    price: '$125 / visit',
    sizePreset: 'Not sure',
    serviceTag: 'Garden maintenance',
  },
  {
    id: 'garden-care-plus',
    name: 'Garden Care Plus',
    included: '3-hour visit: lawn + garden combined',
    price: '$185 / visit',
    sizePreset: 'Medium (100–250 m²)',
    serviceTag: 'Garden maintenance',
  },
];

export interface SuburbLocation {
  name: string;
  postcode: string;
  lat: number;
  lng: number;
  distanceKm: number;
  zone: 'Core (Within 10 km)' | 'Extended (10–20 km)';
}

// Chester Hill centre: -33.8815, 150.9977
export const CHESTER_HILL_CENTER = { lat: -33.8815, lng: 150.9977 };

export const CORE_SERVICE_SUBURBS: SuburbLocation[] = [
  { name: 'Chester Hill', postcode: '2162', lat: -33.8815, lng: 150.9977, distanceKm: 0.0, zone: 'Core (Within 10 km)' },
  { name: 'Sefton', postcode: '2162', lat: -33.8901, lng: 151.0086, distanceKm: 1.4, zone: 'Core (Within 10 km)' },
  { name: 'Regents Park', postcode: '2143', lat: -33.8832, lng: 151.0235, distanceKm: 2.4, zone: 'Core (Within 10 km)' },
  { name: 'Birrong', postcode: '2143', lat: -33.8962, lng: 151.0218, distanceKm: 2.8, zone: 'Core (Within 10 km)' },
  { name: 'Potts Hill', postcode: '2143', lat: -33.8981, lng: 151.0315, distanceKm: 3.6, zone: 'Core (Within 10 km)' },
  { name: 'Bass Hill', postcode: '2197', lat: -33.9022, lng: 150.9942, distanceKm: 2.3, zone: 'Core (Within 10 km)' },
  { name: 'Georges Hall', postcode: '2198', lat: -33.9135, lng: 150.9854, distanceKm: 3.8, zone: 'Core (Within 10 km)' },
  { name: 'Lansvale', postcode: '2166', lat: -33.8959, lng: 150.9639, distanceKm: 3.5, zone: 'Core (Within 10 km)' },
  { name: 'Villawood', postcode: '2163', lat: -33.8811, lng: 150.9749, distanceKm: 2.1, zone: 'Core (Within 10 km)' },
  { name: 'Yagoona', postcode: '2199', lat: -33.9078, lng: 151.0217, distanceKm: 3.7, zone: 'Core (Within 10 km)' },
  { name: 'Bankstown', postcode: '2200', lat: -33.9182, lng: 151.0345, distanceKm: 5.3, zone: 'Core (Within 10 km)' },
  { name: 'Condell Park', postcode: '2200', lat: -33.9277, lng: 151.0138, distanceKm: 5.3, zone: 'Core (Within 10 km)' },
  { name: 'Greenacre', postcode: '2190', lat: -33.9061, lng: 151.0558, distanceKm: 6.0, zone: 'Core (Within 10 km)' },
  { name: 'Carramar', postcode: '2163', lat: -33.8818, lng: 150.9587, distanceKm: 3.6, zone: 'Core (Within 10 km)' },
  { name: 'Guildford', postcode: '2161', lat: -33.8542, lng: 150.9853, distanceKm: 3.2, zone: 'Core (Within 10 km)' },
  { name: 'Fairfield', postcode: '2165', lat: -33.8705, lng: 150.9565, distanceKm: 4.0, zone: 'Core (Within 10 km)' },
  { name: 'Yennora', postcode: '2161', lat: -33.8645, lng: 150.9718, distanceKm: 3.1, zone: 'Core (Within 10 km)' },
  { name: 'Berala', postcode: '2141', lat: -33.8721, lng: 151.0318, distanceKm: 3.3, zone: 'Core (Within 10 km)' },
  { name: 'Lidcombe', postcode: '2141', lat: -33.8646, lng: 151.0457, distanceKm: 4.8, zone: 'Core (Within 10 km)' },
  { name: 'Auburn', postcode: '2144', lat: -33.8492, lng: 151.0327, distanceKm: 4.8, zone: 'Core (Within 10 km)' },
];

export const FAQS = [
  {
    q: 'Do I need to be home?',
    a: "No. As long as we can get to the garden safely (gate unlocked, pets inside), you don't need to be there.",
  },
  {
    q: 'What happens if it rains?',
    a: "We'll move your visit to the next available day and let you know by SMS.",
  },
  {
    q: 'Do you take the green waste away?',
    a: 'We use your green bin first. Anything extra can be removed for a per-load fee ($140–$200 per load).',
  },
  {
    q: 'Are there lock-in contracts?',
    a: "No. Plans are fortnightly or monthly and you can pause or cancel with 24 hours' notice before a visit.",
  },
  {
    q: 'Do you remove trees?',
    a: "Yes, small trees and large shrubs that can be safely felled from the ground. The property owner needs to check Canterbury-Bankstown Council approval first; we're happy to point you in the right direction. Larger trees are referred to a qualified arborist.",
  },
  {
    q: 'Do you bring your own equipment?',
    a: 'Yes — mowers, trimmers, blowers, chainsaw and pressure cleaner. We just need access to an outdoor tap for pressure cleaning.',
  },
  {
    q: 'How do I pay?',
    a: 'Card or bank transfer. Plans are charged automatically after each visit; one-off jobs are invoiced on completion (7-day terms). Jobs over $500 need a 30% deposit.',
  },
  {
    q: 'Do you work weekends?',
    a: 'Monday–Friday 7:30am–4:30pm, with Saturdays by arrangement.',
  },
];

export const POLICIES = [
  { label: 'Cancellations', detail: "24 hours' notice for plan visits." },
  {
    label: 'Wasted visits',
    detail: "If we can't get in (locked gate, dog in the yard), a $40 fee applies after one reminder.",
  },
  { label: 'Weather', detail: 'Rain-affected visits move to the next free slot.' },
  { label: 'Quotes', detail: 'Valid for 30 days.' },
  {
    label: 'Privacy',
    detail: 'Contact details are only used to quote, book and invoice your job. They are never sold or shared.',
  },
];

export interface QuoteInput {
  lengthM: number;
  widthM: number;
  service: ServiceCategory;
  grassType: GrassType;
  growthCondition: GrowthCondition;
  accessTerrain: AccessTerrain;
  wasteDisposal: WasteDisposal;
  suburb: string;
  includeHedgeTrim: boolean;
  includeGardenWeeding: boolean;
  includePressureWash: boolean;
  softscapeScope: 'turf-lay' | 'mulch-beds' | 'full-bed-refresh';
  hardscapeScope: 'steel-edging' | 'stepping-pavers' | 'retaining-wall';
}

export interface LineItem {
  label: string;
  detail: string;
  minAmount: number;
  maxAmount: number;
}

export interface QuoteResult {
  areaSqm: number;
  minTotal: number;
  maxTotal: number;
  perSqmLow: number;
  perSqmHigh: number;
  estMinutesMin: number;
  estMinutesMax: number;
  hourlyMin: number;
  hourlyMax: number;
  travelFee: number;
  lineItems: LineItem[];
  pricingNote: string;
}

export const SERVICE_LABELS: Record<ServiceCategory, { title: string; subtitle: string }> = {
  'regular-fortnightly': {
    title: 'Regular Lawn Mowing (Fortnightly)',
    subtitle: 'Mow, edge, whipper-snip, and blow-down of paths and driveways',
  },
  'regular-monthly': {
    title: 'Regular Lawn & Garden (Monthly)',
    subtitle: 'Mow, edge, whipper-snip, blow-down, and light tidy',
  },
  'one-off-cleanup': {
    title: 'One-Off Garden Cleanup',
    subtitle: 'Overgrown yards, end-of-lease & pre-sale resets (from $260 full cleanup)',
  },
  softscaping: {
    title: 'Planting, Mulching & Hedging',
    subtitle: 'Hedge trimming ($65/hr + green waste), turf patches & fresh mulch',
  },
  hardscaping: {
    title: 'Pressure Cleaning & Edging',
    subtitle: 'Driveways, paths, patios & pavers from $140 (2-hour min)',
  },
};

export function validateAustralianABN(rawAbn: string): {
  cleaned: string;
  formatted: string;
  isValid: boolean;
  isComplete: boolean;
} {
  const cleaned = rawAbn.replace(/\D/g, '').slice(0, 11);
  const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
  if (cleaned.length !== 11) {
    return { cleaned, formatted: cleaned, isValid: false, isComplete: false };
  }
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const digits = cleaned.split('').map(Number);
  digits[0] = digits[0] - 1;
  const sum = digits.reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
  return {
    cleaned,
    formatted,
    isValid: sum % 89 === 0,
    isComplete: true,
  };
}

export function calculateNswQuote(input: QuoteInput): QuoteResult {
  const areaSqm = Math.max(20, Math.round(input.lengthM * input.widthM));
  const areaRatio = areaSqm / 400;
  const lineItems: LineItem[] = [];

  const isCoreSuburb = CORE_SERVICE_SUBURBS.some(
    (s) => s.name.toLowerCase() === input.suburb.trim().toLowerCase()
  );
  const travelFee = isCoreSuburb ? 0 : 25;

  if (input.service === 'softscaping') {
    const scopeRates = {
      'turf-lay': {
        label: 'Turf Patches & Lawn Top-Up',
        low: 28,
        high: 42,
        minsPer100: 55,
      },
      'mulch-beds': {
        label: 'Garden Bed Mulching & Tidy ($65/hr + materials)',
        low: 16,
        high: 26,
        minsPer100: 35,
      },
      'full-bed-refresh': {
        label: 'Seasonal Planting & New Garden Beds',
        low: 34,
        high: 55,
        minsPer100: 65,
      },
    }[input.softscapeScope];

    const baseMin = Math.round(areaSqm * scopeRates.low);
    const baseMax = Math.round(areaSqm * scopeRates.high);
    lineItems.push({
      label: scopeRates.label,
      detail: `${areaSqm} m² scope · $65/hr labour + materials`,
      minAmount: baseMin,
      maxAmount: baseMax,
    });
  } else if (input.service === 'hardscaping') {
    const scopeRates = {
      'steel-edging': {
        label: 'Garden Edging & Border Reset',
        low: 45,
        high: 75,
        calcAreaFactor: 0.25,
      },
      'stepping-pavers': {
        label: 'Pressure Cleaning (Paths, Patios & Pavers)',
        low: 140,
        high: 260,
        calcAreaFactor: 1,
        flat: true,
      },
      'retaining-wall': {
        label: 'Driveway & Patio Deep Pressure Wash',
        low: 180,
        high: 360,
        calcAreaFactor: 1,
        flat: true,
      },
    }[input.hardscapeScope];

    if ('flat' in scopeRates && scopeRates.flat) {
      lineItems.push({
        label: scopeRates.label,
        detail: 'From $140 (2-hour minimum); driveways quoted per job (needs outdoor tap)',
        minAmount: scopeRates.low,
        maxAmount: scopeRates.high,
      });
    } else {
      const units = Math.max(8, Math.round(areaSqm * scopeRates.calcAreaFactor));
      lineItems.push({
        label: scopeRates.label,
        detail: `Approx. ${units} linear m`,
        minAmount: Math.round(units * scopeRates.low),
        maxAmount: Math.round(units * scopeRates.high),
      });
    }
  } else {
    const isFortnightly = input.service === 'regular-fortnightly';
    const isOneOff = input.service === 'one-off-cleanup';

    // Align smoothly with both the Small (<100m² $75), Medium (100-250m² $110), Large (250-500m² $150),
    // and 400 m² NSW benchmark ($80-$130 regular / $120-$180 one-off / $260+ full overgrown cleanup)
    let scaledMin: number;
    let scaledMax: number;

    if (areaSqm < 100) {
      scaledMin = isOneOff ? 120 : 75;
      scaledMax = isOneOff ? 180 : 90;
    } else if (areaSqm <= 250) {
      scaledMin = isOneOff ? 150 : isFortnightly ? 95 : 110;
      scaledMax = isOneOff ? 220 : 125;
    } else {
      const baseMin400 = isOneOff ? 140 : isFortnightly ? 80 : 100;
      const baseMax400 = isOneOff ? 260 : isFortnightly ? 115 : 150;
      scaledMin = Math.round(baseMin400 * Math.pow(areaRatio, 0.88));
      scaledMax = Math.round(baseMax400 * Math.pow(areaRatio, 0.92));
    }

    lineItems.push({
      label: isOneOff
        ? 'One-Off Lawn & Yard Cleanup'
        : isFortnightly
          ? 'Fortnightly Mow, Edge, Whipper-Snip & Blow'
          : 'Monthly Mow, Edge, Whipper-Snip & Blow',
      detail: `${areaSqm} m² (${input.lengthM} m × ${input.widthM} m) · Paths & driveways blown clear`,
      minAmount: scaledMin,
      maxAmount: scaledMax,
    });

    if (input.grassType === 'kikuyu') {
      lineItems.push({
        label: 'Thick Kikuyu Turf Allowance',
        detail: 'Higher clipping volume & dense edge work',
        minAmount: Math.round(10 * areaRatio),
        maxAmount: Math.round(20 * areaRatio),
      });
    }

    if (input.growthCondition === 'moderate-growth') {
      lineItems.push({
        label: '3–4 Week Growth Adjustment',
        detail: 'Double-pass cut to keep finish tidy',
        minAmount: Math.round(15 * areaRatio),
        maxAmount: Math.round(25 * areaRatio),
      });
    } else if (input.growthCondition === 'overgrown') {
      lineItems.push({
        label: 'Overgrown Cleanup Adjustment',
        detail: 'Heavy cutback & edge restoration (full overgrown cleanups from $260)',
        minAmount: Math.round(45 * areaRatio),
        maxAmount: Math.round(80 * areaRatio),
      });
    }

    if (input.accessTerrain === 'standard-gates') {
      lineItems.push({
        label: 'Tight Side Gate / Garden Beds',
        detail: 'Push-mower & extra whipper-snipping time',
        minAmount: Math.round(10 * areaRatio),
        maxAmount: Math.round(18 * areaRatio),
      });
    } else if (input.accessTerrain === 'obstacles-slope') {
      lineItems.push({
        label: 'Steep Slope / Heavy Obstacles',
        detail: 'Slower production around slopes, trampolines & trees',
        minAmount: Math.round(22 * areaRatio),
        maxAmount: Math.round(35 * areaRatio),
      });
    }

    if (input.wasteDisposal === 'bag-and-tip') {
      lineItems.push({
        label: 'Extra Green Waste Removal',
        detail: 'Council green bin used first; extra haulage $140–$200 per full load',
        minAmount: Math.round(35 + 25 * areaRatio),
        maxAmount: Math.round(70 + 50 * areaRatio),
      });
    }

    if (input.includeHedgeTrim) {
      lineItems.push({
        label: 'Hedge & Shrub Trimming ($65/hr)',
        detail: 'Neat shaping with clippings removed',
        minAmount: 65,
        maxAmount: 130,
      });
    }
    if (input.includeGardenWeeding) {
      lineItems.push({
        label: 'Hand-Weeding & Garden Bed Tidy',
        detail: 'Manual weeding, pruning & general bed clean-up',
        minAmount: 55,
        maxAmount: 110,
      });
    }
    if (input.includePressureWash) {
      lineItems.push({
        label: 'Pressure Cleaning (2-hr min)',
        detail: 'From $140 for paths & patios (requires outdoor tap)',
        minAmount: 140,
        maxAmount: 220,
      });
    }
  }

  if (travelFee > 0) {
    lineItems.push({
      label: `Travel Fee Beyond 10 km (${input.suburb})`,
      detail: '$25 per visit for 10–20 km from Chester Hill; further distances quoted',
      minAmount: 25,
      maxAmount: 25,
    });
  }

  const minTotal = lineItems.reduce((s, i) => s + i.minAmount, 0);
  const maxTotal = lineItems.reduce((s, i) => s + i.maxAmount, 0);

  const estMinutesMin = Math.max(30, Math.round(45 * Math.pow(areaRatio, 0.8)));
  const estMinutesMax = Math.max(45, Math.round(75 * Math.pow(areaRatio, 0.85)));

  return {
    areaSqm,
    minTotal,
    maxTotal,
    perSqmLow: Number((minTotal / areaSqm).toFixed(2)),
    perSqmHigh: Number((maxTotal / areaSqm).toFixed(2)),
    estMinutesMin,
    estMinutesMax,
    hourlyMin: 65,
    hourlyMax: 80,
    travelFee,
    lineItems,
    pricingNote:
      'Fixed prices for regular fortnightly or monthly plans ($20 off your first visit on a 3-month plan until 31 Jan 2027). Written quotes valid for 30 days.',
  };
}
