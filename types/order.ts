import { Product } from './product';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  deliveryInstructions?: string;
  scheduledDeliveryTime?: Date;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  phone: string;
  email: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedOptions?: SelectedOption[];
  specialInstructions?: string;
  subtotal: number;
}

export interface SelectedOption {
  optionName: string;
  choiceName: string;
  priceModifier: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export type PaymentMethod = 
  | 'cash'
  | 'card'
  | 'online';

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  street: string;
  building?: string;
  apartment?: string;
  floor?: string;
  city: string;
  zipCode?: string;
  landmark?: string;
  addressType?: 'home' | 'work' | 'other';
  isDefault?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
}
