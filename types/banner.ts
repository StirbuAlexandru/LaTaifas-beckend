export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  buttonText?: string;
  buttonLink?: string;
  position: BannerPosition;
  order: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type BannerPosition = 
  | 'hero'
  | 'top'
  | 'middle'
  | 'bottom'
  | 'sidebar';
