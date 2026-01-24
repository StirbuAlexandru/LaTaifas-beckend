import { DiscountType } from '../utils/discountCalculator';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  // Original price of the product
  price: number;
  // Discount information (new structure)
  discountType?: DiscountType;
  discountValue?: number;
  discountActive?: boolean;
  // Simple discount price (deprecated - kept for backward compatibility)
  discountPrice?: number | null;
  // Additional properties for frontend display
  originalPrice?: number;
  discount?: number;
  // Calculated final price (derived from price and discount info)
  finalPrice?: number;
  image?: string; // Single image URL from Supabase
  images: string[];
  thumbnail: string;
  categoryId: string;
  category?: Category;
  stock: number;
  inStock: boolean;
  featured: boolean;
  rating?: number;
  reviewsCount?: number;
  average_rating?: number; // Average rating from reviews
  review_count?: number; // Total number of reviews
  tags?: string[];
  options?: ProductOption[];
  nutritionalInfo?: NutritionalInfo;
  allergens?: string[];
  preparationTime?: number; // in minutes
  spicyLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot';
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  choices: OptionChoice[];
}

export interface OptionChoice {
  id: string;
  name: string;
  priceModifier: number; // can be positive or negative
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parent_id?: string;
  children?: Category[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}