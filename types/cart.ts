import { Product, ProductOption } from './product';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions?: CartItemOption[];
  specialInstructions?: string;
  price: number;
  subtotal: number;
}

export interface CartItemOption {
  optionId: string;
  optionName: string;
  choiceId: string;
  choiceName: string;
  priceModifier: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  itemsCount: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  selectedOptions?: CartItemOption[];
  specialInstructions?: string;
}

export interface UpdateCartItemPayload {
  cartItemId: string;
  quantity?: number;
  selectedOptions?: CartItemOption[];
  specialInstructions?: string;
}
