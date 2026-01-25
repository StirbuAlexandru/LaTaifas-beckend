import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET - Fetch all menu categories
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu categories:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('Error in GET /api/menu-categories:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new menu category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, note, display_order } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('menu_categories')
      .insert([{ name, slug, note, display_order: display_order || 0 }])
      .select();

    if (error) {
      console.error('Error creating menu category:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data?.[0] });
  } catch (error) {
    console.error('Error in POST /api/menu-categories:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
