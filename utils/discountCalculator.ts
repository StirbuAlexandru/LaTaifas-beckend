/**
 * Discount calculation utilities
 */

export type DiscountType = 'percentage' | 'fixed';

export interface DiscountInfo {
  discountType: DiscountType;
  discountValue: number;
  discountActive: boolean;
}

/**
 * Calculate the final price based on original price and discount information
 * @param originalPrice - The original price of the product
 * @param discountInfo - Discount information object
 * @returns The final calculated price
 */
export const calculateFinalPrice = (
  originalPrice: number,
  discountInfo: DiscountInfo
): number => {
  // If discount is not active, return original price
  if (!discountInfo.discountActive) {
    return originalPrice;
  }

  let finalPrice = originalPrice;

  // Calculate discount based on type
  if (discountInfo.discountType === 'percentage') {
    finalPrice = originalPrice - (originalPrice * discountInfo.discountValue) / 100;
  } else if (discountInfo.discountType === 'fixed') {
    finalPrice = originalPrice - discountInfo.discountValue;
  }

  // Ensure final price is not negative
  return Math.max(0, finalPrice);
};

/**
 * Calculate discount amount (for display purposes)
 * @param originalPrice - The original price of the product
 * @param discountInfo - Discount information object
 * @returns The discount amount
 */
export const calculateDiscountAmount = (
  originalPrice: number,
  discountInfo: DiscountInfo
): number => {
  // If discount is not active, return 0
  if (!discountInfo.discountActive) {
    return 0;
  }

  if (discountInfo.discountType === 'percentage') {
    return (originalPrice * discountInfo.discountValue) / 100;
  } else if (discountInfo.discountType === 'fixed') {
    return discountInfo.discountValue;
  }

  return 0;
};

/**
 * Calculate discount percentage for display
 * @param originalPrice - The original price of the product
 * @param discountInfo - Discount information object
 * @returns The discount percentage
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  discountInfo: DiscountInfo
): number => {
  // If discount is not active, return 0
  if (!discountInfo.discountActive) {
    return 0;
  }

  if (discountInfo.discountType === 'percentage') {
    return discountInfo.discountValue;
  } else if (discountInfo.discountType === 'fixed') {
    return Math.round((discountInfo.discountValue / originalPrice) * 100);
  }

  return 0;
};