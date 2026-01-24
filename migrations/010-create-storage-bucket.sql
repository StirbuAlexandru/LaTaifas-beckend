-- Create the 'products' storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for the 'products' bucket
-- Drop existing policies if they exist to make migration idempotent
DROP POLICY IF EXISTS "Public read access for products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update files in products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete from products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload to products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can update files in products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete from products bucket" ON storage.objects;

-- 1. Allow public read access to all files
CREATE POLICY "Public read access for products bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- 2. Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload to products bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- 3. Allow authenticated users to update their own uploads
CREATE POLICY "Authenticated users can update files in products bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- 4. Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete from products bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- 5. Allow public uploads (for anon key uploads from dashboard)
CREATE POLICY "Public can upload to products bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'products');

-- 6. Allow public updates (for anon key updates from dashboard)
CREATE POLICY "Public can update files in products bucket"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'products');

-- 7. Allow public deletes (for anon key deletes from dashboard)
CREATE POLICY "Public can delete from products bucket"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'products');
