import { ROUTES } from '@/router/routes';

export interface PlatformCategory {
  id: string;
  name: string;
  summary: string;
  to: string;
  itemType: string;
}

export const GAMING_PLATFORMS: readonly PlatformCategory[] = [
  {
    id: 'pc',
    name: 'PC Games',
    summary: 'Steam, Epic Games Store & GOG digital editions compared.',
    to: ROUTES.pcGames,
    itemType: 'Digital Keys',
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    summary: 'PS5 & PS4 exclusives, DualSense bundles, and store cards.',
    to: ROUTES.playstation,
    itemType: 'PS5 & PS4',
  },
  {
    id: 'xbox',
    name: 'Xbox',
    summary: 'Series X|S titles, Play Anywhere editions, and Game Pass cards.',
    to: ROUTES.xbox,
    itemType: 'Series X|S',
  },
  {
    id: 'mobile',
    name: 'Mobile Games',
    summary: 'Curated Android & iOS releases and authorized top-ups.',
    to: ROUTES.mobileGames,
    itemType: 'Android & iOS',
  },
];

export const POPULAR_CATEGORIES: readonly PlatformCategory[] = [
  {
    id: 'accessories',
    name: 'Gaming Accessories',
    summary: 'Wireless headsets, hall-effect controllers, and low-latency mice.',
    to: ROUTES.accessories,
    itemType: 'Peripherals',
  },
  {
    id: 'hardware',
    name: 'Gaming Hardware',
    summary: 'OLED displays, GPUs, NVMe SSDs, and handheld systems.',
    to: ROUTES.hardware,
    itemType: 'Components & Displays',
  },
  {
    id: 'deals',
    name: 'Deals & Coupons',
    summary: 'Time-bounded store markdowns, gift cards, and verified codes.',
    to: ROUTES.deals,
    itemType: 'Verified Offers',
  },
  {
    id: 'gta-hub',
    name: 'GTA Gaming Hub',
    summary: 'Editions, platform comparisons, guides, and official store links.',
    to: ROUTES.gtaHub,
    itemType: 'Dedicated Hub',
  },
];
