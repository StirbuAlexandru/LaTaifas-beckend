'use client';

import React, { useState, useEffect } from 'react';
import { Star, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  comment: string;
  created_at: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/reviews');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
      } else {
        setError(data.error || 'Failed to load reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('An error occurred while loading reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sigur doriți să ștergeți această recenzie?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setReviews(reviews.filter(r => r.id !== id));
      } else {
        alert('Failed to delete review: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('An error occurred while deleting the review');
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-300">❌ {error}</p>
          <Button onClick={fetchReviews} className="mt-4" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recenzii</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestionează recenziile și evalurile clienților ({reviews.length} total)
          </p>
        </div>
        <Button onClick={fetchReviews} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizează
        </Button>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Produs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Comentariu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dată
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Încă nu există recenzii
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {review.product_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {review.customer_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-md truncate">
                        {review.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.created_at).toLocaleDateString('ro-RO')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(review.id)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Message */}
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300">
          ✅ <strong>Sistemul de Recenzii este Activ!</strong> Recenziile sunt acum conectate la baza de date Supabase.
        </p>
        <p className="text-sm text-green-700 dark:text-green-400 mt-2">
          Clienții pot trimite recenzii de pe paginile de produse, iar ele vor apărea aici automat.
        </p>
      </div>
    </div>
  );
};

export default ReviewsPage;
