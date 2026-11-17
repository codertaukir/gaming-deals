import { ROUTES } from '@/router/routes';

export interface NavItem {
  label: string;
  to: string;
}

export interface FooterColumn {
  heading: string;
  links: NavItem[];
}

export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { label: 'PC Games', to: ROUTES.pcGames },
  { label: 'PlayStation', to: ROUTES.playstation },
  { label: 'Xbox', to: ROUTES.xbox },
  { label: 'Hardware', to: ROUTES.hardware },
  { label: 'Deals', to: ROUTES.deals },
];

export const MOBILE_NAV_GROUPS: readonly FooterColumn[] = [
  {
    heading: 'Platforms',
    links: [
      { label: 'Home', to: ROUTES.home },
      { label: 'PC Games', to: ROUTES.pcGames },
      { label: 'PlayStation', to: ROUTES.playstation },
      { label: 'Xbox', to: ROUTES.xbox },
      { label: 'Mobile Games', to: ROUTES.mobileGames },
    ],
  },
  {
    heading: 'Gear & Offers',
    links: [
      { label: 'Accessories', to: ROUTES.accessories },
      { label: 'Gaming Hardware', to: ROUTES.hardware },
      { label: 'Deals & Coupons', to: ROUTES.deals },
      { label: 'GTA Gaming Hub', to: ROUTES.gtaHub },
      { label: 'Compare Products', to: ROUTES.compare },
    ],
  },
  {
    heading: 'Editorial & Trust',
    links: [
      { label: 'Reviews', to: ROUTES.reviews },
      { label: 'Guides', to: ROUTES.guides },
      { label: 'About', to: ROUTES.about },
      { label: 'Contact', to: ROUTES.contact },
      { label: 'Affiliate Disclosure', to: ROUTES.affiliateDisclosure },
    ],
  },
];

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: 'Platforms & Gear',
    links: [
      { label: 'PC Games', to: ROUTES.pcGames },
      { label: 'PlayStation', to: ROUTES.playstation },
      { label: 'Xbox', to: ROUTES.xbox },
      { label: 'Mobile Games', to: ROUTES.mobileGames },
      { label: 'Accessories', to: ROUTES.accessories },
      { label: 'Gaming Hardware', to: ROUTES.hardware },
    ],
  },
  {
    heading: 'Deals & Editorial',
    links: [
      { label: 'Deals & Coupons', to: ROUTES.deals },
      { label: 'GTA Gaming Hub', to: ROUTES.gtaHub },
      { label: 'Compare Products', to: ROUTES.compare },
      { label: 'Reviews', to: ROUTES.reviews },
      { label: 'Buying Guides', to: ROUTES.guides },
    ],
  },
  {
    heading: 'Company & Legal',
    links: [
      { label: 'About', to: ROUTES.about },
      { label: 'Contact', to: ROUTES.contact },
      { label: 'Affiliate Disclosure', to: ROUTES.affiliateDisclosure },
      { label: 'Privacy Policy', to: ROUTES.privacyPolicy },
      { label: 'Terms & Conditions', to: ROUTES.terms },
    ],
  },
];

export interface QuickSearchDestination {
  label: string;
  category: string;
  to: string;
  keywords: string[];
}

export const QUICK_SEARCH_DESTINATIONS: readonly QuickSearchDestination[] = [
  {
    label: 'PC Games Catalogue',
    category: 'Platform',
    to: ROUTES.pcGames,
    keywords: ['pc', 'steam', 'epic', 'windows', 'games'],
  },
  {
    label: 'PlayStation Games',
    category: 'Platform',
    to: ROUTES.playstation,
    keywords: ['ps5', 'ps4', 'playstation', 'sony', 'console'],
  },
  {
    label: 'Xbox Games',
    category: 'Platform',
    to: ROUTES.xbox,
    keywords: ['xbox', 'series x', 'series s', 'game pass'],
  },
  {
    label: 'Android & iOS Mobile Games',
    category: 'Platform',
    to: ROUTES.mobileGames,
    keywords: ['android', 'ios', 'mobile', 'phone'],
  },
  {
    label: 'Gaming Accessories',
    category: 'Gear',
    to: ROUTES.accessories,
    keywords: ['headset', 'controller', 'mouse', 'keyboard', 'accessories'],
  },
  {
    label: 'Gaming Hardware',
    category: 'Hardware',
    to: ROUTES.hardware,
    keywords: ['gpu', 'monitor', 'laptop', 'ssd', 'console', 'hardware'],
  },
  {
    label: 'Verified Deals & Coupons',
    category: 'Offers',
    to: ROUTES.deals,
    keywords: ['deals', 'coupons', 'discount', 'gift cards', 'top-up'],
  },
  {
    label: 'GTA Gaming Hub',
    category: 'Hub',
    to: ROUTES.gtaHub,
    keywords: ['gta', 'grand theft auto', 'rockstar', 'gta v', 'gta online'],
  },
  {
    label: 'Compare Products',
    category: 'Tool',
    to: ROUTES.compare,
    keywords: ['compare', 'specs', 'versus'],
  },
  {
    label: 'Reviews & Buying Guides',
    category: 'Editorial',
    to: ROUTES.guides,
    keywords: ['reviews', 'guides', 'buying guide', 'tips'],
  },
];
