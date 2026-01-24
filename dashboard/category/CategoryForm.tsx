"use client";

import React, { useState, useEffect } from "react";
import { Category, CategoryFormData } from "../../lib/useCategories";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface CategoryFormProps {
  category?: Category | null;
  allCategories: Category[];
  onSubmit: (formData: CategoryFormData) => Promise<void>;
  onClose: () => void;
}

export default function CategoryForm({
  category,
  allCategories,
  onSubmit,
  onClose,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    parent_id: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        parent_id: category.parent_id || null,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        setError("Category name is required");
        setLoading(false);
        return;
      }

      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  // Get all categories that can be parents (exclude current category and its children)
  const getAvailableParents = (): Category[] => {
    const cannotBeParent = new Set<string>();
    if (category) {
      cannotBeParent.add(category.id);
      // Add all descendants (simplified: just first level, can be enhanced)
    }

    const flatten = (cats: Category[]): Category[] => {
      return cats.flatMap((cat) => [cat]);
    };

    return flatten(allCategories).filter((cat) => !cannotBeParent.has(cat.id));
  };

  const availableParents = getAvailableParents();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close modal when clicking on the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {category ? "Edit Category" : "Create New Category"}
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <Label htmlFor="name" className="block text-sm font-medium mb-1">
              Category Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Electronics"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional category description"
              rows={3}
            />
          </div>

          {/* Parent Category */}
          <div>
            <Label className="block text-sm font-medium mb-1">
              Parent Category
            </Label>
            <Select 
              value={formData.parent_id || "none"} 
              onValueChange={(value) => setFormData({ ...formData, parent_id: value === "none" ? null : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="None (Top-level category)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Top-level category)</SelectItem>
                {availableParents.map((parent) => (
                  <SelectItem key={parent.id} value={parent.id}>
                    {parent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}