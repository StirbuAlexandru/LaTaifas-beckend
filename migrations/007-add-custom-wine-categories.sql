-- Migration: Add custom wine categories table
-- This allows administrators to create custom wine categories beyond the standard types

-- Create custom wine categories table
CREATE TABLE IF NOT EXISTS public.custom_wine_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add custom_wine_category_id to wines table
ALTER TABLE public.wines 
ADD COLUMN IF NOT EXISTS custom_wine_category_id UUID REFERENCES public.custom_wine_categories(id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_custom_wine_categories_slug ON public.custom_wine_categories(slug);
CREATE INDEX IF NOT EXISTS idx_custom_wine_categories_active ON public.custom_wine_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_wines_custom_category ON public.wines(custom_wine_category_id);

-- Insert some default custom wine categories
INSERT INTO public.custom_wine_categories (name, slug, description, display_order) VALUES
('Spumante', 'spumante', 'Vinuri spumante și șampanii', 1),
('Vinuri de Desert', 'vinuri-de-desert', 'Vinuri dulci speciale pentru desert', 2),
('Vinuri Fortificate', 'vinuri-fortificate', 'Vinuri fortificate cum ar fi Porto, Sherry', 3),
('Vinuri Naturale', 'vinuri-naturale', 'Vinuri naturale și biologice', 4),
('Vinuri Premium', 'vinuri-premium', 'Selecții premium și rare', 5)
ON CONFLICT (slug) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_custom_wine_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER custom_wine_categories_updated_at_trigger
    BEFORE UPDATE ON public.custom_wine_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_custom_wine_categories_updated_at();

-- Enable Row Level Security
ALTER TABLE public.custom_wine_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to custom wine categories"
    ON public.custom_wine_categories
    FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage custom wine categories"
    ON public.custom_wine_categories
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');