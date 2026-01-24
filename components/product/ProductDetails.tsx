'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { Button } from '../ui/button';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { calculateFinalPrice, calculateDiscountPercentage } from '../../utils/discountCalculator';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  // States for dynamic rating calculation
  const [dynamicAverageRating, setDynamicAverageRating] = useState<number>(0);
  const [dynamicReviewCount, setDynamicReviewCount] = useState<number>(0);
  const [loadingRatings, setLoadingRatings] = useState<boolean>(true);
  
  // Form states for reviews
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Fetch and calculate ratings dynamically
  useEffect(() => {
    const fetchProductRatings = async () => {
      try {
        setLoadingRatings(true);
        const response = await fetch(`/api/reviews?productId=${product.id}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          const reviews = result.data;
          const reviewCount = reviews.length;
          const avgRating = reviewCount > 0 
            ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount
            : 0;
          
          setDynamicAverageRating(Math.round(avgRating * 10) / 10);
          setDynamicReviewCount(reviewCount);
        }
      } catch (error) {
        console.error('Error fetching product ratings:', error);
      } finally {
        setLoadingRatings(false);
      }
    };

    fetchProductRatings();
  }, [product.id]);

  // Discount check using new structure
  const hasDiscount = 
    product.discountActive === true && 
    product.discountValue != null && 
    product.discountValue > 0;

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart({ productId: product.id, quantity }, product);
    } finally {
      setIsAdding(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);
    setReviewSuccess(false);
    setReviewError('');

    if (!customerName.trim()) {
      setReviewError('Numele este obligatoriu');
      setSubmittingReview(false);
      return;
    }

    if (selectedRating === 0) {
      setReviewError('Te rugăm să alegi o evaluare');
      setSubmittingReview(false);
      return;
    }

    if (!reviewComment.trim()) {
      setReviewError('Comentariul este obligatoriu');
      setSubmittingReview(false);
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          customer_name: customerName,
          customer_email: customerEmail,
          rating: selectedRating,
          comment: reviewComment,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setReviewSuccess(true);
        // Reset form
        setCustomerName('');
        setCustomerEmail('');
        setSelectedRating(0);
        setReviewComment('');
      } else {
        setReviewError(result.error || 'Eroare la trimiterea recenziei');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setReviewError('Eroare la trimiterea recenziei. Te rugăm încearcă din nou.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb - Modern */}
      <nav className="flex mb-6 text-sm">
        <span className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer">Acasă</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer">Produse</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">{product.name}</span>
      </nav>

      {/* Titlu Produs */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {product.name}
      </h1>

      {/* Rating - Modern */}
      <div className="flex items-center mb-6 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border-2 border-gray-100">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= (dynamicAverageRating || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-3 text-base font-bold text-gray-900">
          {loadingRatings ? 'Calculare...' : (dynamicAverageRating?.toFixed(1) || '0.0')}
        </span>
        <span className="mx-3 text-gray-300">•</span>
        <span className="text-sm font-medium text-gray-600">
          {loadingRatings ? 'Încărcare...' : `${dynamicReviewCount || 0} recenzii`}
        </span>
      </div>

      {/* Preț - Modern cu gradient */}
      <div className="mb-8 bg-gradient-to-br from-red-50 via-orange-50 to-white p-6 rounded-2xl border-2 border-red-100 shadow-sm">
        <div className="flex items-baseline flex-wrap gap-3">
          {hasDiscount ? (
            <>
              <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                {calculateFinalPrice(product.price, {
                  discountType: product.discountType || 'percentage',
                  discountValue: product.discountValue || 0,
                  discountActive: product.discountActive || false
                }).toFixed(2)} lei
              </span>
              <span className="text-xl text-gray-400 line-through">
                {product.price.toFixed(2)} lei
              </span>
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <span className="text-base">🔥</span>
                Reducere {Math.round(calculateDiscountPercentage(product.price, {
                  discountType: product.discountType || 'percentage',
                  discountValue: product.discountValue || 0,
                  discountActive: product.discountActive || false
                }))}%
              </span>
            </>
          ) : (
            <span className="text-4xl font-bold text-gray-900">
              {product.price.toFixed(2)} lei
            </span>
          )}
        </div>
      </div>

      {/* Descriere - Modern card */}
      <div className="mb-8 p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></span>
          Descriere
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Selector Cantitate + Buton Adaugă - pe aceeași linie */}
      <div className="mb-12">
        <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></span>
          Cantitate
        </label>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-12 w-12 rounded-xl border-2 border-gray-200 hover:border-red-600 hover:bg-red-50 transition-all duration-300"
            >
              <Minus size={18} className="text-gray-700" />
            </Button>
            <span className="text-2xl font-bold text-gray-900 min-w-[60px] text-center bg-gradient-to-r from-gray-50 to-white px-6 py-2 rounded-xl border-2 border-gray-100">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              className="h-12 w-12 rounded-xl border-2 border-gray-200 hover:border-red-600 hover:bg-red-50 transition-all duration-300"
            >
              <Plus size={18} className="text-gray-700" />
            </Button>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="flex-1 min-w-[200px] h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isAdding ? 'Se adaugă...' : product.inStock ? 'Adaugă în Coș' : 'Stoc epuizat'}
          </Button>
        </div>
      </div>

      {/* Secțiune Recenzii - Modern */}
      <form onSubmit={handleSubmitReview} className="mb-8 p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></span>
          Lasă o recenzie
        </h3>
        
        {/* Success Message */}
        {reviewSuccess && (
          <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-700 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg">Recenzie trimisă cu succes!</p>
                <p className="text-sm">Mulțumim pentru feedback!</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {reviewError && (
          <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-700 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <p className="font-bold">{reviewError}</p>
            </div>
          </div>
        )}
        
        {/* Customer Name */}
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Nume *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 font-medium"
            placeholder="Numele tău"
            required
          />
        </div>
        
        {/* Customer Email (optional) */}
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Email (opțional)
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 font-medium"
            placeholder="email@example.com"
          />
        </div>
        
        {/* Rating */}
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Evaluarea ta *
          </label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="hover:scale-125 transition-transform duration-200"
              >
                <Star
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= (hoverRating || selectedRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            {selectedRating > 0 && (
              <span className="ml-3 text-base font-bold text-gray-900">
                {selectedRating} din 5 stele
              </span>
            )}
          </div>
        </div>
        
        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Comentariul tău *
          </label>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 font-medium resize-none"
            rows={5}
            placeholder="Spune-ne părerea ta despre acest produs..."
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={submittingReview}
        >
          {submittingReview ? 'Se trimite...' : 'Trimite recenzia'}
        </Button>
      </form>

      {/* Informații suplimentare - Modern */}
      <div className="mt-12 pt-8 border-t-2 border-gray-200 mb-16">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></span>
          Informații Produs
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-2">
              Categorie
            </h4>
            <p className="text-base text-gray-700 font-medium">
              {product.category?.name || 'N/A'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-2">
              Informații Dietetice
            </h4>
            <p className="text-base text-gray-700 font-medium">
              {product.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductDetails;