-- Add effervescence column to wines table
-- Separates wine color (wine_type) from effervescence type
-- wine_type: white, red, rose, orange (color only)
-- effervescence: still, sparkling, perlant (effervescence type)

ALTER TABLE wines 
ADD COLUMN IF NOT EXISTS effervescence VARCHAR(50) DEFAULT 'still';

-- Update existing sparkling wines to have effervescence='sparkling' and appropriate color
-- This is a manual step - you need to update existing wines with correct wine_type and effervescence

-- Add index for efficient filtering
CREATE INDEX IF NOT EXISTS idx_wines_effervescence ON wines(effervescence);

-- Add comment
COMMENT ON COLUMN wines.effervescence IS 'Wine effervescence type: still (liniștite), sparkling (spumoase), perlant (perlante)';

-- Example update queries (run these manually for your existing sparkling wines):
-- UPDATE wines SET wine_type = 'white', effervescence = 'sparkling' WHERE wine_type = 'sparkling' AND name ILIKE '%alb%';
-- UPDATE wines SET wine_type = 'rose', effervescence = 'sparkling' WHERE wine_type = 'sparkling' AND name ILIKE '%rose%';
-- UPDATE wines SET wine_type = 'red', effervescence = 'sparkling' WHERE wine_type = 'sparkling' AND name ILIKE '%rosu%';
