import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Check if the featured column exists
    const { data, error } = await supabase
      .from('products')
      .select('featured')
      .limit(1);

    if (error) {
      console.error('Error verifying featured column:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // If we got here, the column exists
    return NextResponse.json({ success: true, message: 'Featured column exists in products table' });
  } catch (error) {
    console.error('Error verifying featured column:', error);
    return NextResponse.json({ success: false, error: 'Failed to verify featured column' }, { status: 500 });
  }
}