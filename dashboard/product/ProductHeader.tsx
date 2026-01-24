import { Input } from "../../components/ui/input";
import Link from "next/link";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface ProductHeaderProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  categories: { id: string; name: string }[];
  searchValue: string;
  categoryValue: string;
}

const ProductHeader = ({
  onSearchChange,
  onCategoryChange,
  categories,
  searchValue,
  categoryValue,
}: ProductHeaderProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Products
      </h2>
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg">
        <div className="flex gap-2">
          <Input
            placeholder="Search products by name"
            className="p-5 rounded-md w-full lg:w-64 bg-white"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Select value={categoryValue} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
              {/* Removed "All Categories" option as per requirements */}
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id} className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link
          href="/dashboard/products/add-product"
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg whitespace-nowrap"
        >
          New Product
        </Link>
      </div>
    </div>
  );
};

export default ProductHeader;