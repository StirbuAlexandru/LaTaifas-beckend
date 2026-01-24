import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

// Create admin client for service role operations
let supabaseAdmin: any = null;
const _rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
try {
  if (_rawKey && _rawKey.split('.').length === 3) {
    supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', _rawKey);
  } else if (_rawKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY looks malformed (not a JWT).');
  } else {
    supabaseAdmin = null;
  }
} catch (err) {
  console.error('Failed to create Supabase admin client:', (err as any)?.message || String(err));
  supabaseAdmin = null;
}
if (!supabaseAdmin) supabaseAdmin = supabase;

// DELETE - Cleanup old orders (older than 30 days)
export async function DELETE(request: NextRequest) {
  try {
    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString();

    console.log('🗑️ Starting cleanup of orders older than:', cutoffDate);

    // Delete orders older than 30 days
    // Note: order_items will be deleted automatically due to CASCADE
    const { data: deletedOrders, error } = await supabaseAdmin
      .from('orders')
      .delete()
      .lt('created_at', cutoffDate)
      .select();

    if (error) {
      console.error('Error deleting old orders:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const deletedCount = deletedOrders?.length || 0;
    console.log(`✅ Successfully deleted ${deletedCount} old orders`);

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} orders older than 30 days`,
      deletedCount,
      cutoffDate,
    });
  } catch (error: any) {
    console.error('Error in cleanup:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Check how many orders would be deleted (dry run)
export async function GET(request: NextRequest) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString();

    const { data: oldOrders, error, count } = await supabaseAdmin
      .from('orders')
      .select('id, order_number, created_at', { count: 'exact' })
      .lt('created_at', cutoffDate);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Found ${count || 0} orders older than 30 days`,
      count: count || 0,
      cutoffDate,
      orders: oldOrders || [],
    });
  } catch (error: any) {
    console.error('Error checking old orders:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
