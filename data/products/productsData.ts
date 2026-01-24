// Sample product data matching the Product type from types/product.ts
export const productsData = [
  {
    id: "1",
    name: "Deluxe Burger",
    slug: "deluxe-burger",
    description: "Juicy beef patty with fresh vegetables and special sauce",
    price: 12.99,
    originalPrice: 15.99,
    discount: 15,
    categoryId: "2",
    category: {
      id: "2",
      name: "Burgers",
      slug: "burgers",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.5,
    reviewsCount: 128,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
    ],
    inStock: true,
    stock: 50,
    stockQuantity: 50,
    featured: true,
    preparationTime: 15,
    tags: ["burger", "beef", "popular"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Margherita Pizza",
    slug: "margherita-pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 14.99,
    originalPrice: 18.99,
    discount: 20,
    categoryId: "1",
    category: {
      id: "1",
      name: "Pizza",
      slug: "pizza",
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.8,
    reviewsCount: 96,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
    ],
    inStock: true,
    stock: 30,
    stockQuantity: 30,
    featured: true,
    preparationTime: 20,
    tags: ["pizza", "italian", "vegetarian"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Caesar Salad",
    slug: "caesar-salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 8.99,
    originalPrice: 10.99,
    discount: 18,
    categoryId: "3",
    category: {
      id: "3",
      name: "Salads",
      slug: "salads",
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.3,
    reviewsCount: 72,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
    ],
    inStock: true,
    stock: 25,
    stockQuantity: 25,
    featured: false,
    preparationTime: 10,
    tags: ["salad", "vegetarian", "healthy"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]