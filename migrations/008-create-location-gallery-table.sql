-- Create location_gallery table for managing "Universul La Taifas" images
CREATE TABLE IF NOT EXISTS location_gallery (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_location_gallery_active_order ON location_gallery(is_active, display_order);

-- Insert existing images (cele 8 imagini pe care le ai deja)
INSERT INTO location_gallery (image_url, alt_text, display_order, is_active) 
SELECT * FROM (VALUES
  ('/images/locatie1.jpg', 'Locație La Taifas 1', 1, true),
  ('/images/locatie2.jpg', 'Locație La Taifas 2', 2, true),
  ('/images/locatie3.jpg', 'Locație La Taifas 3', 3, true),
  ('/images/locatie4.jpg', 'Locație La Taifas 4', 4, true),
  ('/images/locatie5.jpg', 'Locație La Taifas 5', 5, true),
  ('/images/locatie6.jpg', 'Locație La Taifas 6', 6, true),
  ('/images/locatie7.jpg', 'Locație La Taifas 7', 7, true),
  ('/images/locatie8.jpg', 'Locație La Taifas 8', 8, true)
) AS v(image_url, alt_text, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM location_gallery LIMIT 1);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_location_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS location_gallery_updated_at ON location_gallery;
CREATE TRIGGER location_gallery_updated_at
BEFORE UPDATE ON location_gallery
FOR EACH ROW
EXECUTE FUNCTION update_location_gallery_updated_at();
