import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/reviews - Get all reviews (with optional product filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    let query = supabaseAdmin
      .from('reviews')
      .select(`
        *,
        products:product_id (
          id,
          name,
          image
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by product if productId is provided
    if (productId) {
      query = query.eq('product_id', productId);
    }

    const { data: reviews, error } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Transform data to include product_name
    const transformedReviews = reviews?.map(review => ({
      ...review,
      product_name: review.products?.name || 'Unknown Product',
    })) || [];

    return NextResponse.json({
      success: true,
      data: transformedReviews,
    });
  } catch (error: any) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id, customer_name, customer_email, rating, comment } = body;

    // Validation
    if (!product_id || !customer_name || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: product_id, customer_name, rating' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Insert review
    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        product_id,
        customer_name,
        customer_email: customer_email || null,
        rating,
        comment: comment || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Update product's average rating and review count
    try {
      // Get all reviews for this product
      const { data: productReviews } = await supabaseAdmin
        .from('reviews')
        .select('rating')
        .eq('product_id', product_id);

      if (productReviews && productReviews.length > 0) {
        // Calculate average rating
        const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = totalRating / productReviews.length;
        const reviewCount = productReviews.length;

        // Update product record
        const { error: updateError } = await supabaseAdmin
          .from('products')
          .update({
            average_rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
            review_count: reviewCount
          })
          .eq('id', product_id);

        if (updateError) {
          console.error('Error updating product ratings:', updateError);
          // Don't fail the review creation if product update fails
        }
      }
    } catch (updateError) {
      console.error('Error calculating product ratings:', updateError);
      // Continue anyway - the review was created successfully
    }

    return NextResponse.json({
      success: true,
      data: review,
      message: 'Review created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/reviews:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}
