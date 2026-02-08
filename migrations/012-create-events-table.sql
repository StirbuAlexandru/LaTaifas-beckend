-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT NOT NULL,
  phone_number TEXT NOT NULL DEFAULT '+40 753 077 063',
  text_color TEXT DEFAULT '#111827',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for querying active and upcoming events
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);

-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for events bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload event images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'events' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update event images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'events' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete event images"
ON storage.objects FOR DELETE
USING (bucket_id = 'events' AND auth.role() = 'authenticated');

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for events table
CREATE POLICY "Public can view events"
ON events FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert events"
ON events FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update events"
ON events FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete events"
ON events FOR DELETE
USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
