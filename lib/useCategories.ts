import { useState, useEffect } from 'react';

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  parent_id?: string | null;
  slug?: string;
  created_at?: string;
  // Additional properties for frontend display
  children?: Category[];
  order?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryFormData {
  name: string;
  description?: string | null;
  parent_id?: string | null;
}

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/categories');
      const json = await res.json();
      if (json.success) {
        setCategories(json.data || []);
        setError(null);
      } else {
        setError(json.error || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (categoryData: CategoryFormData) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryData.name,
          description: categoryData.description || null,
          parentId: categoryData.parent_id || null,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        // include hint if provided
        const errMsg = json.error || 'Failed to create category';
        const hint = json.hint ? ` — ${json.hint}` : '';
        throw new Error(`${errMsg}${hint}`);
      }

      // append to local state
      setCategories(prev => [...prev, json.data]);
      return json.data;
    } catch (err: any) {
      console.error('createCategory error', err);
      throw err;
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    const res = await fetch('/api/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...categoryData }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update category');
    setCategories(prev => prev.map(c => (c.id === id ? json.data : c)));
    return json.data;
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to delete category');
      
      // If the category was deactivated instead of deleted, we still want to remove it from the UI
      setCategories(prev => prev.filter(c => c.id !== id));
      return json;
    } catch (err: any) {
      console.error('deleteCategory error', err);
      throw err;
    }
  };

  const refetch = () => fetchCategories();

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
  };
}