-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  details TEXT,
  ingredients TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_categories_order ON menu_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_menu_items_order ON menu_items(display_order);

-- Disable RLS temporarily for easier management
ALTER TABLE menu_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;

-- Insert existing categories
INSERT INTO menu_categories (name, slug, display_order, note) VALUES
('ANTREURI', 'antreuri', 1, NULL),
('MICUL DEJUN', 'mic-dejun', 2, NULL),
('CIORBE ȘI SUPE', 'ciorbe', 3, '(pentru tipul de ciorba ce se poate servi, consultați chelnerul)'),
('PLATOURI', 'platouri', 4, NULL),
('PLATOURI EVENIMENTE', 'platouri-evenimente', 5, NULL),
('UNA, ALTA', 'una-alta', 6, NULL),
('GRILL', 'grill', 7, NULL),
('PASTE', 'paste', 8, NULL),
('BURGERI', 'burgeri', 9, NULL),
('SALATE de ÎNSOȚIRE', 'salate', 10, NULL),
('GARNITURI', 'garnituri', 11, NULL),
('PIZZA', 'pizza', 12, '( ingredientele ce compun produsul final sunt menționate în crud )'),
('SOSURI', 'sosuri', 13, NULL),
('PRODUSE DE POST', 'post', 14, NULL),
('PÂINE', 'paine', 15, NULL),
('DESERT', 'desert', 16, NULL),
('VINURI', 'vinuri', 17, NULL),
('BERE', 'bere', 18, NULL),
('BAUTURI SPIRTOASE', 'bauturi', 19, NULL),
('COCKTAILURI', 'cocktailuri', 20, NULL),
('LIMONADE SI FRESH-URI', 'limonade', 21, NULL),
('CAFEA', 'cafea', 22, NULL),
('BAUTURI RACORITOARE', 'bauturi-racoritoare', 23, NULL),
('DIVERSE', 'diverse', 24, NULL);
