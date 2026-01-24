import React from "react";
import { Category } from "@/lib/useCategories";

interface CategoryTreeProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  allCategories: Category[];
  parentId?: string | null;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onEdit,
  onDelete,
  allCategories,
  parentId = null,
}) => {
  const childCategories = categories.filter(
    (category) => category.parent_id === parentId
  );

  if (childCategories.length === 0) return null;

  // Create a new component for recursion to avoid self-reference issues
  const RecursiveCategoryTree = (props: Omit<CategoryTreeProps, 'parentId'> & { parentId?: string | null }) => (
    <CategoryTree 
      categories={props.categories}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      allCategories={props.allCategories}
      parentId={props.parentId || null}
    />
  );

  return (
    <div className={`space-y-2 ${parentId ? "ml-6 pl-4 border-l border-gray-200" : ""}`}>
      {childCategories.map((category) => (
        <div key={category.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {category.description}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(category)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          
          {/* Recursive rendering for child categories */}
          <RecursiveCategoryTree
            categories={categories}
            onEdit={onEdit}
            onDelete={onDelete}
            allCategories={allCategories}
            parentId={category.id}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryTree;