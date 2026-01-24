import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// PUT - Update menu item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { category_id, name, details, ingredients, display_order } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('menu_items')
      .update({ category_id, name, details, ingredients, display_order })
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Error updating menu item:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error in PUT /api/menu-items/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete menu item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting menu item:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/menu-items/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
