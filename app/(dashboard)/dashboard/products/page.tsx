'use client';

import ProductActions from "../../../../dashboard/product/ProductActions";
import ProductHeader from "../../../../dashboard/product/ProductHeader";
import ProductTable from "../../../../dashboard/product/ProductTable";
import React, { useState, useEffect } from "react";
import useCategories from "../../../../lib/useCategories";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_type?: 'percentage' | 'fixed' | null;
  discount_value?: number | null;
  discount_active?: boolean | null;
  discountType?: 'percentage' | 'fixed' | null;
  discountValue?: number | null;
  discountActive?: boolean | null;
  image: string | null;
  category_id: string | null;
  in_stock: boolean;
  created_at: string;
  updated_at?: string;
  featured?: boolean;
  average_rating?: number;
  review_count?: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Empty by default, requires category selection

  // Load last edited product category from localStorage on mount
  useEffect(() => {
    const lastCategory = localStorage.getItem('lastEditedProductCategory');
    if (lastCategory !== null) {
      setSelectedCategory(lastCategory);
      // Clear the stored category after using it
      localStorage.removeItem('lastEditedProductCategory');
    }
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 24; // Increased from 12 to show more products per page
  
  const { categories, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();

  // Debounce search term with shorter delay for better responsiveness
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, selectedCategory, debouncedSearchTerm]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      
      // Only fetch products if a category is selected
      if (!selectedCategory) {
        // No category selected, return empty results
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
        setLoading(false);
        return;
      }
      
      // Build query parameters
      let url = `/api/products?page=${page}&limit=${productsPerPage}`;
      
      // Add category filter
      url += `&categoryId=${selectedCategory}`;
      
      // Add search term if present
      if (debouncedSearchTerm) {
        url += `&search=${encodeURIComponent(debouncedSearchTerm)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.products || []);
        setTotalPages(data.data.totalPages || 1);
        setTotalProducts(data.data.total || 0);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while loading products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    // Since we're now filtering on the server side, we just pass through the products
    setFilteredProducts(products);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [debouncedSearchTerm, selectedCategory]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete product: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('An error occurred while deleting the product');
    }
  };

  const handleRetry = () => {
    fetchProducts(currentPage);
  };

  // Handle loading states
  if (categoriesLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produse</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gestionează inventarul și listele de produse
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Handle category error
  if (categoriesError) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produse</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gestionează inventarul și listele de produse
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load categories: {categoriesError}</p>
          <button 
            onClick={refetchCategories}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produse</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestionează inventarul și listele de produse
          </p>
        </div>
        <ProductActions />
      </div>
      <ProductHeader 
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        searchValue={searchTerm}
        categoryValue={selectedCategory}
      />
      <ProductTable 
        products={filteredProducts}
        categories={categories}
        onDelete={handleDelete}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
      
      {/* Pagination Controls - Always visible for better navigation */}
      <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Previous
        </button>
        
        {/* Page numbers */}
        {totalPages > 1 && Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          // Show first pages, current page, and last pages
          let pageNum;
          if (totalPages <= 7) {
            pageNum = i + 1;
          } else if (currentPage <= 4) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 3) {
            pageNum = totalPages - 6 + i;
          } else {
            pageNum = currentPage - 3 + i;
          }
          
          if (pageNum >= 1 && pageNum <= totalPages) {
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {pageNum}
              </button>
            );
          }
          return null;
        })}
        
        <span className="mx-2 text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages} ({totalProducts} total products)
        </span>
        
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;