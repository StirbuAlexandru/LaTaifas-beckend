import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET - Fetch all delivery zones
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('delivery_zones')
      .select('*')
      .order('min_order_value', { ascending: true });

    if (error) {
      console.error('Error fetching delivery zones:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('Error in GET /api/delivery-zones:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new delivery zone
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { zone_name, min_order_value } = body;

    if (!zone_name || !min_order_value) {
      return NextResponse.json(
        { success: false, error: 'Zone name and minimum order value are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('delivery_zones')
      .insert([
        {
          zone_name,
          min_order_value: Number(min_order_value),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating delivery zone:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/delivery-zones:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
