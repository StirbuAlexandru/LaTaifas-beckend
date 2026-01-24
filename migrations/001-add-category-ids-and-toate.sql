-- Migration: Add category_ids column to products and ensure 'Toate' category exists

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category_ids UUID[];

-- Create index on category_ids for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_category_ids ON public.products USING gin (category_ids);

-- Ensure a "Toate" category exists (slug: "toate")
INSERT INTO public.categories (id, name, slug, created_at)
SELECT gen_random_uuid(), 'Toate', 'toate', NOW()
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE slug = 'toate');
