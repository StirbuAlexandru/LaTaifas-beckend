"use client";

import React, { useState } from "react";
import useCategories, { Category } from "@/lib/useCategories";
import CategoryForm from "./CategoryForm";
import CategoryTree from "./CategoryTree";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory, refetch } =
    useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [seeding, setSeeding] = useState(false);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        // Convert formData to match the expected format
        const categoryData = {
          name: formData.name,
          description: formData.description,
          parentId: formData.parent_id,
        };
        await createCategory(categoryData);
      }
      handleClose();
      refetch(); // Refresh the category list
    } catch (err: any) {
      console.error("Form submission error:", err);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm("Are you sure? This will delete the category and all its subcategories.")) {
      try {
        const result = await deleteCategory(categoryId);
        refetch(); // Refresh the category list
        
        // Show success message or warning
        if (result.message) {
          alert(result.message);
        } else {
          alert('Category deleted successfully!');
        }
      } catch (err: any) {
        console.error("Delete error:", err);
        alert(`Failed to delete category: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const handleSeedCategories = async () => {
    if (!confirm('This will add all menu categories to the database. Continue?')) {
      return;
    }

    try {
      setSeeding(true);
      const response = await fetch('/api/seed-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Categories seeded successfully!');
        refetch(); // Refresh the category list
      } else {
        alert(`Error: ${result.error || 'Failed to seed categories'}`);
      }
    } catch (error) {
      console.error('Error seeding categories:', error);
      alert('Failed to seed categories');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage product categories and their hierarchy
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/categories/add-category">
            <Button variant="outline">Add via Form</Button>
          </Link>
          <button
            onClick={handleSeedCategories}
            disabled={seeding}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {seeding ? 'Seeding...' : 'Seed Menu Categories'}
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Category
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No categories yet. Create one to start.</p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create First Category
          </button>
        </div>
      ) : (
        <CategoryTree
          categories={categories}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          allCategories={categories}
        />
      )}

      {isOpen && (
        <CategoryForm
          category={editingCategory}
          allCategories={categories}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}