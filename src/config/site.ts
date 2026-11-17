export const SITE_CONFIG = {
  name: 'Gaming Deals',
  tagline: 'Curated Games, Hardware & Verified Affiliate Offers',
  description:
    'Discover and compare PC, PlayStation, Xbox, mobile games, gaming hardware, gift cards, and verified affiliate deals across authorized retailers.',
  baseUrl: import.meta.env.VITE_SITE_URL || '',
  defaultCurrency: 'INR' as const,
  isDemoData: true,
  contactEmail: 'editorial@gamingdeals.example',
} as const;
