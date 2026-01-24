"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Category } from "../../lib/useCategories";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  parent_id: z.string().nullable().optional(),
});

// Define TypeScript types for form data
type FormData = z.infer<typeof formSchema>;

interface Props {
  onSubmit?: (data: FormData) => Promise<void> | void;
  allCategories?: Category[];
}

const CategoryForm: React.FC<Props> = ({ onSubmit, allCategories = [] }) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Form submission handler
  const localSubmit = async (data: FormData) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      console.log("Category submitted:", data);
    }
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Add Category
      </h2>
      <form onSubmit={handleSubmit(localSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Category Name
          </Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            className={`mt-1 p-2 w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        {/* Parent Category */}
        <div>
          <Label className="block text-sm font-medium mb-1">Parent Category</Label>
          <Select
            value={(typeof watch !== "undefined" ? (watch("parent_id") as string) : undefined) || "none"}
            onValueChange={(value: string) => {
              setValue("parent_id", value === "none" ? null : (value as any));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="None (Top-level category)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Top-level category)</SelectItem>
              {allCategories.map((parent) => (
                <SelectItem key={parent.id} value={parent.id}>
                  {parent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Description
          </Label>
          <textarea
            id="description"
            {...register("description")}
            className={`mt-1 p-2 w-full bg-white dark:bg-slate-950 rounded-md  border ${
              errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } focus:ring-blue-500 focus:border-blue-500`}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
