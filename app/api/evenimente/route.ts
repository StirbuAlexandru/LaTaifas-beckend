import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const now = new Date().toISOString();

    // Get active event (future or current)
    const { data: activeEvent, error: activeError } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', now)
      .eq('is_active', true)
      .order('event_date', { ascending: true })
      .limit(1)
      .single();

    if (activeError && activeError.code !== 'PGRST116') {
      console.error('Error fetching active event:', activeError);
    }

    // Get past events (last 20)
    const { data: pastEvents, error: pastError } = await supabase
      .from('events')
      .select('*')
      .lt('event_date', now)
      .order('event_date', { ascending: false })
      .limit(20);

    if (pastError) {
      throw pastError;
    }

    return NextResponse.json({
      success: true,
      data: {
        activeEvent: activeEvent || null,
        pastEvents: pastEvents || []
      }
    });
  } catch (error) {
    console.error('Error in evenimente API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, event_date, phone_number, text_color, imageData, fileName } = body;

    let image_url = '';

    // Upload image to Supabase Storage if provided
    if (imageData && fileName) {
      const base64Data = imageData.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      
      const uniqueFileName = `${Date.now()}-${fileName}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('events')
        .upload(uniqueFileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(uniqueFileName);

      image_url = publicUrl;
    }

    // Insert event
    const { data, error } = await supabase
      .from('events')
      .insert({
        title,
        description,
        event_date,
        image_url,
        phone_number,
        text_color: text_color || '#111827',
        is_active: true
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
