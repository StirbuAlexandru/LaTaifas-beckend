-- Add image_url column to menu_items table
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment
COMMENT ON COLUMN menu_items.image_url IS 'URL to the menu item image stored in Supabase Storage';
