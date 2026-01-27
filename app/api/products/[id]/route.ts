import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase as anonClient } from '../../../../lib/supabaseClient';

// Use service role client for admin operations, fallback to anon client
let supabase: any;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (serviceRoleKey && supabaseUrl && serviceRoleKey.split('.').length === 3) {
  supabase = createClient(supabaseUrl, serviceRoleKey);
} else {
  console.warn('[/api/products/[id]] Service role key not configured, using anon client');
  supabase = anonClient;
}

// GET /api/products/[id] - get specific product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    
    // Validate UUID format (basic validation)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productId)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID format' }, { status: 400 });
    }
    
    // Fetch product from database
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId);

    if (error) {
      console.error('Supabase error fetching product:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Check if product exists
    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    // Transform product to match frontend expectations
    const product = {
      ...data[0],
      // Map discount fields to match frontend interface
      discountType: data[0].discount_type || undefined,
      discountValue: data[0].discount_value || undefined,
      discountActive: data[0].discount_active || false,
    };

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productId)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID format' }, { status: 400 });
    }
    
    const body = await request.json();
    
    // Build update payload
    const payload: any = {};
    
    if (body.name !== undefined) payload.name = body.name;
    if (body.description !== undefined) payload.description = body.description;
    if (body.price !== undefined) payload.price = Number(body.price);
    if (body.discountType !== undefined) payload.discount_type = body.discountType;
    if (body.discountValue !== undefined) payload.discount_value = body.discountValue;
    if (body.discountActive !== undefined) payload.discount_active = body.discountActive;
    if (body.category_id !== undefined) payload.category_id = body.category_id;
    if (body.in_stock !== undefined) payload.in_stock = body.in_stock;
    if (body.image !== undefined) payload.image = body.image;
    
    // Update product in database
    const { data, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', productId)
      .select();

    if (error) {
      console.error('Supabase error updating product:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - delete product
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productId)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID format' }, { status: 400 });
    }
    
    // Delete product from database
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Supabase error deleting product:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}