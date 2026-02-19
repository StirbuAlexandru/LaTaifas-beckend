import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Update order with provided fields
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('PATCH /api/orders/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/orders/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
