import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';
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

// GET - Fetch order by order_number
export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    const { orderNumber } = params;

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    console.error('Error fetching order by number:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
