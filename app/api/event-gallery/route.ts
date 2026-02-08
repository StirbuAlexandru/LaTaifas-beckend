import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch all event gallery images
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('event_gallery')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching event gallery:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new event gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image_url, alt_text, display_order, is_primary } = body;

    if (!image_url || display_order === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('event_gallery')
      .insert({
        image_url,
        alt_text: alt_text || 'Event Image',
        display_order,
        is_primary: is_primary || false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error creating event gallery image:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update event gallery image
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, image_url, alt_text, display_order, is_primary } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing image ID' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (image_url !== undefined) updateData.image_url = image_url;
    if (alt_text !== undefined) updateData.alt_text = alt_text;
    if (display_order !== undefined) updateData.display_order = display_order;
    if (is_primary !== undefined) updateData.is_primary = is_primary;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('event_gallery')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error updating event gallery image:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete event gallery image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing image ID' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('event_gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting event gallery image:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
