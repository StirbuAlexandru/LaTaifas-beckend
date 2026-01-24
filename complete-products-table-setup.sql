-- Complete Products Table Setup with Discount Columns
-- This script creates or updates the products table with the proper discount structure

-- Create the products table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_type VARCHAR(10) CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) DEFAULT 0,
    discount_active BOOLEAN DEFAULT false,
    image TEXT,
    images TEXT[],
    thumbnail TEXT,
    category_id UUID REFERENCES public.categories(id),
    stock INTEGER DEFAULT 0,
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    rating DECIMAL(2, 1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2),
    review_count INTEGER,
    tags TEXT[],
    preparation_time INTEGER,
    spicy_level VARCHAR(10) CHECK (spicy_level IN ('mild', 'medium', 'hot', 'extra-hot')),
    is_vegetarian BOOLEAN,
    is_vegan BOOLEAN,
    is_gluten_free BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add the discount columns if they don't exist (for existing tables)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS discount_type VARCHAR(10) CHECK (discount_type IN ('percentage', 'fixed')),
ADD COLUMN IF NOT EXISTS discount_value DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS discount_active BOOLEAN DEFAULT false;

-- Remove old discount columns if they exist
ALTER TABLE public.products 
DROP COLUMN IF EXISTS discount,
DROP COLUMN IF EXISTS original_price;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- Add comments for clarity
COMMENT ON COLUMN public.products.discount_type IS 'Type of discount: percentage or fixed';
COMMENT ON COLUMN public.products.discount_value IS 'Discount value: percentage (e.g., 20 for 20%) or fixed amount (e.g., 10.00 for 10 lei)';
COMMENT ON COLUMN public.products.discount_active IS 'Whether the discount is active or not';

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone" ON public.products
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert products" ON public.products
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products" ON public.products
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products" ON public.products
FOR DELETE USING (auth.role() = 'authenticated');