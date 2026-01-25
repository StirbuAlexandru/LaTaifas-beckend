import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/custom-wine-categories/[id] - Get a specific custom wine category
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    const { data: category, error } = await supabaseAdmin
      .from('custom_wine_categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (error) {
      console.error('Error fetching custom wine category:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    console.error('Error in GET /api/custom-wine-categories/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT /api/custom-wine-categories/[id] - Update a custom wine category
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;
    const body = await request.json();
    const { name, description, displayOrder, isActive } = body;

    // Build update payload
    const payload: any = {};
    
    if (name !== undefined) {
      payload.name = name;
      // Regenerate slug if name changed
      payload.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    if (description !== undefined) payload.description = description;
    if (displayOrder !== undefined) payload.display_order = displayOrder;
    if (isActive !== undefined) payload.is_active = isActive;

    // Update category
    const { data: category, error } = await supabaseAdmin
      .from('custom_wine_categories')
      .update(payload)
      .eq('id', categoryId)
      .select()
      .single();

    if (error) {
      console.error('Error updating custom wine category:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category updated successfully',
    });
  } catch (error: any) {
    console.error('Error in PUT /api/custom-wine-categories/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/custom-wine-categories/[id] - Delete a custom wine category
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    // First check if any wines are using this category
    const { data: winesUsingCategory } = await supabaseAdmin
      .from('wines')
      .select('id')
      .eq('custom_wine_category_id', categoryId)
      .limit(1);

    if (winesUsingCategory && winesUsingCategory.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cannot delete category because it is used by existing wines' 
        },
        { status: 400 }
      );
    }

    // Delete the category
    const { error } = await supabaseAdmin
      .from('custom_wine_categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      console.error('Error deleting custom wine category:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    console.error('Error in DELETE /api/custom-wine-categories/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}