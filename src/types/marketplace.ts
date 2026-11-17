export type PlatformId = 'pc' | 'playstation' | 'xbox' | 'android' | 'ios';

export type ProductCategory = 'accessory' | 'hardware' | 'gift-card';

export type AffiliateStatus = 'verified-partner' | 'sample-listing' | 'direct-store';

export type AvailabilityStatus = 'in-stock' | 'digital-key' | 'out-of-stock' | 'check-retailer';

export interface RetailerOffer {
  id: string;
  retailerName: string;
  price: number | null;
  originalPrice?: number | null;
  currency: 'INR' | 'USD';
  productUrl: string;
  availability: AvailabilityStatus;
  lastVerified: string;
  affiliateStatus: AffiliateStatus;
  isSampleData: boolean;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  platforms: PlatformId[];
  genres: string[];
  publisher: string;
  releaseDate: string;
  retailers: RetailerOffer[];
  featured?: boolean;
  trending?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  category: ProductCategory;
  image: string;
  specifications: ProductSpecification[];
  retailers: RetailerOffer[];
  featured?: boolean;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discountLabel: string;
  couponCode?: string;
  retailer: string;
  category: 'game' | 'hardware' | 'gift-card' | 'subscription';
  platform?: PlatformId;
  expiryDate: string;
  verifiedAt: string;
  affiliateUrl: string;
  isExpired: boolean;
  isSampleData: boolean;
}

export interface EditorialArticle {
  id: string;
  slug: string;
  type: 'review' | 'guide';
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  highlights: string[];
  sections: {
    heading: string;
    body: string;
  }[];
}
