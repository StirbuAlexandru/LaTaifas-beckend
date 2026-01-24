import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/custom-wine-categories - Get all active custom wine categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    let query = supabaseAdmin
      .from('custom_wine_categories')
      .select('*')
      .order('display_order', { ascending: true });

    // Only filter by active status if not explicitly requesting inactive ones
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data: categories, error } = await query;

    if (error) {
      console.error('Error fetching custom wine categories:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: categories || [],
    });
  } catch (error: any) {
    console.error('Error in GET /api/custom-wine-categories:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/custom-wine-categories - Create a new custom wine category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, displayOrder } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Insert new category
    const { data: category, error } = await supabaseAdmin
      .from('custom_wine_categories')
      .insert({
        name,
        slug,
        description: description || null,
        display_order: displayOrder || 0,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating custom wine category:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/custom-wine-categories:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}