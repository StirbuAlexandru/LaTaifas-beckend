'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem, AddToCartPayload, UpdateCartItemPayload } from '../types/cart';
import { Product } from '../types/product';
import { calculateFinalPrice } from '../utils/discountCalculator';

interface CartContextType {
  cart: Cart;
  addToCart: (payload: AddToCartPayload, product: Product) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItem: (payload: UpdateCartItemPayload) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'restaurant-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    tax: 0,
    discount: 0,
    total: 0,
    itemsCount: 0,
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Calculate cart totals
  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const deliveryFee = 0;
    const tax = 0; // No tax
    
    // No need to calculate discount here since it's already applied to item prices
    const discount = 0;
    const total = subtotal + deliveryFee + tax;
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      itemsCount,
    };
  };

  const addToCart = (payload: AddToCartPayload, product: Product) => {
    setCart((prevCart) => {
      const { productId, quantity, selectedOptions, specialInstructions } = payload;

      // Calculate the discounted price using the discount calculator
      const basePrice = product.price;
      let discountedPrice = basePrice;
      
      // Apply discount if active
      if (product.discountActive && product.discountValue) {
        discountedPrice = calculateFinalPrice(basePrice, {
          discountType: product.discountType || 'percentage',
          discountValue: product.discountValue,
          discountActive: product.discountActive
        });
      }
      
      // Calculate price with options
      let price = discountedPrice;
      if (selectedOptions && selectedOptions.length > 0) {
        selectedOptions.forEach((option) => {
          price += option.priceModifier;
        });
      }

      // Check if item with same options already exists
      const existingItemIndex = prevCart.items.findIndex(
        (item) =>
          item.productId === productId &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex].quantity += quantity;
        newItems[existingItemIndex].subtotal = newItems[existingItemIndex].quantity * price;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${productId}-${Date.now()}`,
          productId,
          product, // Store the full product object with discount info
          quantity,
          selectedOptions,
          specialInstructions,
          price,
          subtotal: price * quantity,
        };
        newItems = [...prevCart.items, newItem];
      }

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== cartItemId);
      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    });
  };

  const updateCartItem = (payload: UpdateCartItemPayload) => {
    setCart((prevCart) => {
      const { cartItemId, quantity, selectedOptions, specialInstructions } = payload;
      const newItems = [...prevCart.items];
      const itemIndex = newItems.findIndex((item) => item.id === cartItemId);

      if (itemIndex > -1) {
        if (quantity !== undefined) {
          newItems[itemIndex].quantity = quantity;
        }
        if (selectedOptions !== undefined) {
          newItems[itemIndex].selectedOptions = selectedOptions;
          // Recalculate price with new options and discounts
          const basePrice = newItems[itemIndex].product.price;
          let discountedPrice = basePrice;
          
          // Apply discount if active
          if (newItems[itemIndex].product.discountActive && newItems[itemIndex].product.discountValue) {
            discountedPrice = calculateFinalPrice(basePrice, {
              discountType: newItems[itemIndex].product.discountType || 'percentage',
              discountValue: newItems[itemIndex].product.discountValue,
              discountActive: newItems[itemIndex].product.discountActive
            });
          }
          
          // Apply options
          let price = discountedPrice;
          selectedOptions.forEach((option) => {
            price += option.priceModifier;
          });
          newItems[itemIndex].price = price;
        }
        if (specialInstructions !== undefined) {
          newItems[itemIndex].specialInstructions = specialInstructions;
        }

        newItems[itemIndex].subtotal = newItems[itemIndex].quantity * newItems[itemIndex].price;
      }

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      tax: 0,
      discount: 0,
      total: 0,
      itemsCount: 0,
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
