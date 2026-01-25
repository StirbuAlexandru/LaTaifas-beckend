import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  try {
    // Check if table exists
    const { data: existingTable } = await supabase
      .from('location_gallery')
      .select('id')
      .limit(1);

    if (existingTable && existingTable.length > 0) {
      return NextResponse.json({ 
        message: 'Tabelul location_gallery există deja!',
        exists: true 
      });
    }

    // Create table using raw SQL
    const createTableSQL = `
      -- Create location_gallery table
      CREATE TABLE IF NOT EXISTS location_gallery (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        alt_text VARCHAR(255),
        display_order INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create index
      CREATE INDEX IF NOT EXISTS idx_location_gallery_active_order ON location_gallery(is_active, display_order);

      -- Insert default images
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
      WHERE NOT EXISTS (SELECT 1 FROM location_gallery);

      -- Create trigger function
      CREATE OR REPLACE FUNCTION update_location_gallery_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      -- Create trigger
      DROP TRIGGER IF EXISTS location_gallery_updated_at ON location_gallery;
      CREATE TRIGGER location_gallery_updated_at
      BEFORE UPDATE ON location_gallery
      FOR EACH ROW
      EXECUTE FUNCTION update_location_gallery_updated_at();
    `;

    const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });

    if (error) {
      console.error('Migration error:', error);
      return NextResponse.json({ 
        error: 'Migrarea a eșuat. Rulează manual SQL-ul din migrations/008-create-location-gallery-table.sql',
        details: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Migrare finalizată cu succes! Tabelul location_gallery a fost creat cu 8 imagini default.',
      success: true 
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      error: 'Migrarea a eșuat. Rulează manual SQL-ul din Supabase Dashboard.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
