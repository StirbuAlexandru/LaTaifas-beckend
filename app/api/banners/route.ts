import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/banners - Fetch all banners
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('banners')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error: any) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/banners - Create new banner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, link, button_text, is_active, display_order } = body;

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('banners')
      .insert([{
        title,
        description,
        image: image || null,
        link: link || null,
        button_text: button_text || 'Learn More',
        is_active: is_active !== undefined ? is_active : true,
        display_order: display_order || 0,
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
