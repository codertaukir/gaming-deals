import type { Deal } from '@/types/marketplace';

export interface SeasonalCollection {
  id: string;
  title: string;
  window: string;
  summary: string;
  highlightTag: string;
  filterCategory: 'game' | 'hardware' | 'gift-card';
}

export const SEASONAL_COLLECTIONS: readonly SeasonalCollection[] = [
  {
    id: 'season-autumn-pc',
    title: 'Autumn Digital PC & Console Showcase',
    window: 'Nov 15 – Dec 02 (Sample Window)',
    summary:
      'Curated sample markdowns across PC, PlayStation, and Xbox digital editions from publisher-approved storefronts.',
    highlightTag: 'Up to 50% Off (Sample)',
    filterCategory: 'game',
  },
  {
    id: 'season-oled-upgrade',
    title: 'Display & Peripheral Upgrade Week',
    window: 'Nov 10 – Nov 30 (Sample Window)',
    summary:
      'Sample partner discounts on 240Hz OLED monitors, wireless planar headsets, and Hall-effect controllers.',
    highlightTag: 'Sample Coupon Codes',
    filterCategory: 'hardware',
  },
];

export const DEALS_CATALOGUE: readonly Deal[] = [
  {
    id: 'deal-sample-pc-autumn',
    title: 'Cyberpunk 2077: Ultimate Edition – 49% Off Sample Listing',
    description: 'Demonstration markdown across authorized DRM-free and PC digital storefronts.',
    discountLabel: '49% OFF',
    retailer: 'GOG Store (Sample)',
    category: 'game',
    platform: 'pc',
    expiryDate: '2026-12-01',
    verifiedAt: '2026-11-15',
    affiliateUrl: 'https://www.gog.com/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-gta-bundle',
    title: 'Grand Theft Auto V Enhanced – Console & PC Offer',
    description: 'Sample seasonal bundle listing covering base story and online starter content.',
    discountLabel: '50% OFF',
    retailer: 'Steam / PlayStation (Sample)',
    category: 'game',
    platform: 'playstation',
    expiryDate: '2026-11-30',
    verifiedAt: '2026-11-16',
    affiliateUrl: 'https://store.steampowered.com/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-headset-gear',
    title: 'Pro Wireless Gaming Headset – Sample Coupon',
    description: 'Demonstration partner promotion on wireless low-latency audio peripherals.',
    discountLabel: '₹3,000 OFF',
    couponCode: 'SAMPLEAUDIO',
    retailer: 'Authorized Peripherals Partner (Sample)',
    category: 'hardware',
    expiryDate: '2026-12-10',
    verifiedAt: '2026-11-15',
    affiliateUrl: 'https://www.amazon.in/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-oled-coupon',
    title: '27-inch QHD 240Hz OLED Monitor – Sample Promo Code',
    description: 'Sample bundle savings on OLED displays verified for PC and HDMI 2.1 consoles.',
    discountLabel: '₹10,000 OFF',
    couponCode: 'SAMPLEOLED',
    retailer: 'Authorized Electronics Retailer (Sample)',
    category: 'hardware',
    platform: 'pc',
    expiryDate: '2026-12-05',
    verifiedAt: '2026-11-15',
    affiliateUrl: 'https://www.amazon.in/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-psn-gift-card',
    title: 'PlayStation Store Digital Gift Cards (India INR)',
    description:
      'Official PlayStation Network wallet top-ups in ₹1,000 to ₹5,000 denominations via authorized distributors.',
    discountLabel: 'Official Top-Up',
    retailer: 'Authorized Gift Card Store (Sample)',
    category: 'gift-card',
    platform: 'playstation',
    expiryDate: '2026-12-31',
    verifiedAt: '2026-11-16',
    affiliateUrl: 'https://store.playstation.com/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-steam-wallet',
    title: 'Steam Wallet Digital Codes & Regional Top-Ups',
    description:
      'Authorized digital Steam Wallet codes delivered instantly for PC game and DLC purchases.',
    discountLabel: 'Instant Delivery',
    retailer: 'Authorized Digital Distributor (Sample)',
    category: 'gift-card',
    platform: 'pc',
    expiryDate: '2026-12-31',
    verifiedAt: '2026-11-16',
    affiliateUrl: 'https://store.steampowered.com/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-xbox-pass',
    title: 'Xbox Digital Gift Card & Game Pass Top-Up',
    description:
      'Authorized Xbox store credit and subscription top-ups redeemable on Series X|S and Windows.',
    discountLabel: 'Authorized Code',
    retailer: 'Microsoft / Xbox Store (Sample)',
    category: 'subscription',
    platform: 'xbox',
    expiryDate: '2026-12-31',
    verifiedAt: '2026-11-15',
    affiliateUrl: 'https://www.xbox.com/',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-mobile-topup',
    title: 'Google Play & Apple App Store Official Gift Codes',
    description:
      'Safe first-party mobile store balance top-ups for Android and iOS games and in-app passes.',
    discountLabel: 'Official Store',
    retailer: 'Google Play / Apple (Sample)',
    category: 'gift-card',
    platform: 'android',
    expiryDate: '2026-12-31',
    verifiedAt: '2026-11-14',
    affiliateUrl: 'https://play.google.com/store/games',
    isExpired: false,
    isSampleData: true,
  },
  {
    id: 'deal-sample-expired-summer',
    title: 'Summer SSD & Controller Flash Markdown (Ended)',
    description:
      'Archived sample listing showing how expired promotions are clearly separated from live deals.',
    discountLabel: 'EXPIRED',
    couponCode: 'SUMMER25',
    retailer: 'Authorized Hardware Partner (Sample)',
    category: 'hardware',
    expiryDate: '2026-09-30',
    verifiedAt: '2026-09-15',
    affiliateUrl: 'https://www.amazon.in/',
    isExpired: true,
    isSampleData: true,
  },
];
