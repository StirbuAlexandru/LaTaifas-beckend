import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { id } = params;

    const { data: wine, error } = await supabase
      .from('wines')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !wine) {
      return NextResponse.json(
        {
          success: false,
          error: 'Wine not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: wine.id,
        name: wine.name,
        description: wine.description,
        price: wine.price,
        discountType: wine.discount_type,
        discountValue: wine.discount_value,
        discountActive: wine.discount_active,
        image: wine.image,
        wineType: wine.wine_type,
        customWineCategoryId: wine.custom_wine_category_id,
        sweetness: wine.sweetness,
        region: wine.region,
        alcoholContent: wine.alcohol_content,
        volume: wine.volume,
        year: wine.year,
        producer: wine.producer,
        inStock: wine.in_stock,
      },
    });
  } catch (error) {
    console.error('Error fetching wine:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
