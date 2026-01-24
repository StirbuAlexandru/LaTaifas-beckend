import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// PUT - Update delivery zone
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { zone_name, min_order_value } = body;

    if (!zone_name || !min_order_value) {
      return NextResponse.json(
        { success: false, error: 'Zone name and minimum order value are required' },
        { status: 400 }
      );
    }

    // Update the zone - remove .single() to avoid coercion errors
    const { data, error } = await supabase
      .from('delivery_zones')
      .update({
        zone_name,
        min_order_value: Number(min_order_value),
      })
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Error updating delivery zone:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Zone not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error in PUT /api/delivery-zones/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete delivery zone
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('delivery_zones')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting delivery zone:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/delivery-zones/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
