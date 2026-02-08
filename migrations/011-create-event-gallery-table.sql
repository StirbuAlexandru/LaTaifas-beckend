-- Create event_gallery table for managing event images
CREATE TABLE IF NOT EXISTS event_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT DEFAULT 'Event Image',
  display_order INTEGER NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_event_gallery_order ON event_gallery(display_order);

-- Insert existing images
INSERT INTO event_gallery (image_url, alt_text, display_order, is_primary) VALUES
('/images/evenimente1.jpg', 'Eveniment 1', 1, true),
('/images/evenimente2.jpg', 'Eveniment 2', 2, true),
('/images/evenimente3.jpg', 'Eveniment 3', 3, true),
('/images/evenimente4.jpg', 'Eveniment 4', 4, true),
('/images/5.jpg', 'Eveniment 5', 5, false),
('/images/6.jpg', 'Eveniment 6', 6, false),
('/images/7.jpg', 'Eveniment 7', 7, false),
('/images/8.jpg', 'Eveniment 8', 8, false);

-- Enable RLS
ALTER TABLE event_gallery ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON event_gallery
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON event_gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON event_gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON event_gallery
  FOR DELETE USING (auth.role() = 'authenticated');
