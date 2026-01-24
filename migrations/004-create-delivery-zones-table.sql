-- Create delivery_zones table
CREATE TABLE IF NOT EXISTS delivery_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_name TEXT NOT NULL,
  min_order_value INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_delivery_zones_min_order ON delivery_zones(min_order_value);

-- Insert existing zones (datele existente din cod)
INSERT INTO delivery_zones (zone_name, min_order_value) VALUES
('Burdujeni, Burdujeni Sat', 50),
('Oraș - Centru, Zamca, G. Enescu', 100),
('Ițcani', 100),
('Adâncata', 120),
('Obcini, Sf. Ilie', 150),
('Șcheia', 150),
('Ipotești, Lisaura', 150),
('Plopeni-Salcea', 150),
('Bosanci', 200),
('Moara', 200);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON delivery_zones
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to manage zones (for dashboard)
CREATE POLICY "Allow authenticated users to insert" ON delivery_zones
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" ON delivery_zones
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete" ON delivery_zones
  FOR DELETE
  TO authenticated
  USING (true);
