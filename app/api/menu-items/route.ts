import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET - Fetch all menu items (optionally filter by category_id)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');

    let query = supabase
      .from('menu_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching menu items:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('Error in GET /api/menu-items:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new menu item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category_id, name, details, ingredients, display_order } = body;

    if (!category_id || !name) {
      return NextResponse.json(
        { success: false, error: 'Category ID and name are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('menu_items')
      .insert([{ 
        category_id, 
        name, 
        details, 
        ingredients, 
        display_order: display_order || 0
      }])
      .select();

    if (error) {
      console.error('Error creating menu item:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data?.[0] });
  } catch (error) {
    console.error('Error in POST /api/menu-items:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
