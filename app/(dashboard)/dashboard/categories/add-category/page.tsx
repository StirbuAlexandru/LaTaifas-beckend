"use client";

import React from 'react';
import CategoryForm from '@/dashboard/forms/CategoryForm';
import BreadcrumbComponent from '@/components/others/Breadcrumb';
import useCategories from '@/lib/useCategories';
import { useRouter } from 'next/navigation';

const AddCategoryPage = () => {
  const { categories, createCategory, refetch } = useCategories();
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      // Convert formData to match the expected format
      const categoryData = {
        name: formData.name,
        description: formData.description,
        parentId: formData.parent_id,
      };
      
      await createCategory(categoryData);
      refetch(); // Refresh the categories
      // Navigate back to categories list
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Error creating category:', error);
      // Show detailed error message if available
      const msg = error instanceof Error ? error.message : 'Failed to create category';
      alert(`Failed to create category: ${msg}`);
    }
  };

  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent 
        links={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/categories', label: 'Categories' }
        ]} 
        pageText='Add Category'
      />
      <div className="mt-4">
        <CategoryForm 
          onSubmit={handleSubmit}
          allCategories={categories}
        />
      </div>
    </div>
  );
};

export default AddCategoryPage;