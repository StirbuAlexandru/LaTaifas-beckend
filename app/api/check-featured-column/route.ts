import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  try {
    // Check if any products have featured = true
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('featured', true);

    if (error) {
      console.error('Error checking featured products:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      count: count || 0,
      message: `Found ${count || 0} featured products` 
    });
  } catch (error) {
    console.error('Error checking featured products:', error);
    return NextResponse.json({ success: false, error: 'Failed to check featured products' }, { status: 500 });
  }
}