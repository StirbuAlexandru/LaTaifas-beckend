-- Migration: Create wines table for wine showcase
-- This table stores wine products separately from food products

CREATE TABLE IF NOT EXISTS public.wines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_type VARCHAR(10) CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) DEFAULT 0,
    discount_active BOOLEAN DEFAULT false,
    image TEXT,
    wine_type VARCHAR(50), -- e.g., 'red', 'white', 'rose', 'sparkling'
    region VARCHAR(255), -- Wine region/origin
    alcohol_content DECIMAL(4, 2), -- Alcohol percentage
    volume INTEGER DEFAULT 750, -- Volume in ml (default 750ml)
    year INTEGER, -- Vintage year
    producer VARCHAR(255), -- Wine producer/brand
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_wines_wine_type ON public.wines(wine_type);
CREATE INDEX IF NOT EXISTS idx_wines_featured ON public.wines(featured);
CREATE INDEX IF NOT EXISTS idx_wines_in_stock ON public.wines(in_stock);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_wines_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wines_updated_at_trigger
    BEFORE UPDATE ON public.wines
    FOR EACH ROW
    EXECUTE FUNCTION update_wines_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.wines ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access to wines"
    ON public.wines
    FOR SELECT
    USING (true);

-- Policy: Allow authenticated users to insert/update/delete (for dashboard)
CREATE POLICY "Allow authenticated users to manage wines"
    ON public.wines
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
