export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'dessert' | 'fortified';

export interface CustomWineCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wine {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  // Discount information
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  discountActive?: boolean;
  // Calculated final price
  finalPrice?: number;
  image?: string;
  wineType?: WineType;
  customWineCategory?: CustomWineCategory;
  customWineCategoryId?: string;
  region?: string;
  alcoholContent?: number;
  volume?: number; // in ml
  year?: number; // Vintage year
  producer?: string;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  effervescence?: 'still' | 'perlate' | 'spumoase' | 'spumante';
  sweetness?: 'sec' | 'demisec' | 'demidulce' | 'dulce' | 'licoros' | 'brut';
}
