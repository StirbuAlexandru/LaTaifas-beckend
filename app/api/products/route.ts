import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '../../../lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';
import { DiscountType } from '../../../utils/discountCalculator';

// Prefer a server-side service role client when available for admin operations
let supabaseAdmin: any = null;
const _rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
try {
  // Basic validation: JWTs have 2 dots (three parts)
  if (_rawKey && _rawKey.split('.').length === 3) {
    supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', _rawKey);
  } else if (_rawKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY looks malformed (not a JWT).');
  } else {
    supabaseAdmin = null;
  }
} catch (err) {
  console.error('Failed to create Supabase admin client (invalid service role key):', (err as any)?.message || String(err));
  supabaseAdmin = null;
}
// Fallback to anon client when admin is not available
if (!supabaseAdmin) supabaseAdmin = supabase;

const getJSON = async (req: NextRequest) => {
  try {
    return await req.json();
  } catch (e) {
    return {};
  }
};

// Helpful check: ensure service role key is not missing or equal to anon key
const _serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const _anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const _serviceKeyLooksInvalid = !_serviceRoleKey || (_anonKey && _serviceRoleKey === _anonKey);

// Zod schemas for product creation
const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  price: z.number().or(z.string()).transform((v) => Number(v)),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }).optional(),
  discountActive: z.boolean().optional(),
  category_id: z.string().optional().nullable().transform((v) => (v === '' ? null : v)),
  in_stock: z.boolean().optional(),
  image: z.string().optional().nullable(),
  imageData: z.string().optional().nullable(), // base64 image data
  fileName: z.string().optional().nullable(), // original file name
});

// Zod schema for product update
const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  price: z.number().or(z.string()).transform((v) => Number(v)).optional(),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }).optional(),
  discountActive: z.boolean().optional(),
  category_id: z.string().optional().nullable().transform((v) => (v === '' ? null : v)),
  in_stock: z.boolean().optional(),
  image: z.string().optional().nullable(),
  imageData: z.string().optional().nullable(), // base64 image data
  fileName: z.string().optional().nullable(), // original file name
});

// Utility: sanitize strings (remove control chars and surrogate halves / emoji)
const sanitizeString = (s: any) => {
  if (s === null || s === undefined) return s;
  if (typeof s !== 'string') return s;
  // Remove control characters and surrogate pairs (often used for emoji)
  return s.replace(/[\u0000-\u001f]/g, '').replace(/[\uD800-\uDFFF]/g, '').trim();
};

const makeSlug = (name: string) => {
  const raw = (name || '').toLowerCase();
  let slug = raw
    .normalize('NFKD')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) slug = `prod-${Date.now()}`;
  return slug;
};

// GET /api/products - list with filters & pagination
// GET /api/products/[id] - get specific product
export async function GET(request: NextRequest, { params }: { params?: { id: string } }) {
  try {
    // If ID is provided in params, fetch specific product
    if (params?.id) {
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
    }
    
    // Otherwise, list products with filters & pagination
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get('categoryId') || undefined;
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const inStock = searchParams.get('inStock') === 'true' ? true : undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = (searchParams.get('sortBy') as string) || 'newest';

    let query = supabase.from('products').select('*');

    // Filter by category if provided
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    if (inStock !== undefined) query = query.eq('in_stock', inStock);
    if (featured !== undefined) query = query.eq('featured', featured);
    if (minPrice !== undefined) query = query.gte('price', minPrice);
    if (maxPrice !== undefined) query = query.lte('price', maxPrice);
    if (search) {
      // Simple search in name and description fields
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Sorting
    const orderBy = sortBy === 'price-asc' ? { column: 'price', ascending: true } :
      sortBy === 'price-desc' ? { column: 'price', ascending: false } :
      sortBy === 'name-asc' ? { column: 'name', ascending: true } :
      sortBy === 'name-desc' ? { column: 'name', ascending: false } :
      { column: 'created_at', ascending: false };

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await query.order(orderBy.column, { ascending: orderBy.ascending }).range(start, end);

    if (error) {
      console.error('Supabase error fetching products:', error);
      return NextResponse.json({ success: false, error: error?.message || 'Unknown error' }, { status: 500 });
    }

    // Transform products to match frontend expectations
    const transformedProducts = (data || []).map(product => ({
      ...product,
      // Map discount fields to match frontend interface
      discountType: product.discount_type || undefined,
      discountValue: product.discount_value || undefined,
      discountActive: product.discount_active || false,
    }));

    // Fetch average rating for each product
    const productsWithRatings = await Promise.all(
      transformedProducts.map(async (product) => {
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('product_id', product.id);
        
        const avgRating = reviews && reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;
        
        const reviewCount = reviews ? reviews.length : 0;
        
        return {
          ...product,
          average_rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
          review_count: reviewCount,
        };
      })
    );

    const total = typeof count === 'number' ? count : (data ? data.length : 0);
    const totalPages = Math.ceil(total / limit || 1);

    return NextResponse.json({ success: true, data: { products: productsWithRatings || [], total, page, totalPages } });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}



// POST /api/products - create product
export async function POST(request: NextRequest) {
  try {
    if (_serviceKeyLooksInvalid) {
      return NextResponse.json({
        success: false,
        error: 'Insert blocked by Row Level Security. Server service role key is missing or invalid. Set SUPABASE_SERVICE_ROLE_KEY to your project service role key (do NOT expose it publicly) and restart the server.'
      }, { status: 500 });
    }
    const body = await getJSON(request);
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      // Return zod validation issues (array of { path, message, code })
      return NextResponse.json({ success: false, error: parsed.error.issues }, { status: 400 });
    }

    let { name, description, price, discountType, discountValue, discountActive, category_id, in_stock, image, imageData, fileName } = parsed.data;

    name = sanitizeString(name) || name;
    description = sanitizeString(description) || description;
    
    let imageUrl = image || null;
    
    // If base64 image data is provided, upload it to Supabase Storage
    if (imageData && fileName) {
      try {
        // Convert base64 to buffer
        const base64Data = imageData.split(',')[1]; // Remove data:image/xxx;base64, prefix
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Generate unique file path
        const fileExt = fileName.split('.').pop();
        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${uniqueFileName}`;
        
        // Upload using admin client (bypasses RLS)
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('imagini')
          .upload(filePath, buffer, {
            contentType: imageData.split(';')[0].split(':')[1], // Extract MIME type
            upsert: false,
          });
        
        if (uploadError) {
          console.error('Image upload error:', uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('imagini')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrlData?.publicUrl || null;
      } catch (err: any) {
        console.error('Image upload exception:', err);
        throw new Error(`Failed to upload image: ${err.message}`);
      }
    }

    // Simplified payload - removed slug and images array since they don't exist in schema
    const payload: any = {
      name,
      description: description ?? null,
      price: typeof price === 'number' ? price : Number(price),
      discount_type: discountType ?? 'percentage',
      discount_value: discountValue ?? null,
      discount_active: discountActive ?? false,
      category_id: category_id ?? null,
      in_stock: in_stock ?? true,
      image: imageUrl, // Use uploaded image URL
    };

    // Sanitize string fields for DB
    for (const k of Object.keys(payload)) {
      if (typeof payload[k] === 'string') payload[k] = sanitizeString(payload[k]);
      if (payload[k] === undefined) payload[k] = null;
    }

    let { data, error } = await supabaseAdmin.from('products').insert([payload]).select();

    if (error) {
      console.error('Supabase error inserting product:', error);
      // try to detect missing columns and retry without them
      const msg = (error.message || '').toString();
      const missingCols: string[] = [];
      const p1 = /Could not find the '(.+?)' column/g;
      let m: RegExpExecArray | null;
      while ((m = p1.exec(msg)) !== null) missingCols.push(m[1]);
      const p2 = /column "(.+?)" of relation "(.+?)" does not exist/g;
      while ((m = p2.exec(msg)) !== null) missingCols.push(m[1]);

      if (missingCols.length > 0) {
        const uniq = Array.from(new Set(missingCols));
        uniq.forEach((col) => {
          // map common JS keys to DB keys
          if (col in payload) delete payload[col];
          if (col === 'category_id' && 'category_id' in payload) delete payload.category_id;
          if (col === 'description' && 'description' in payload) delete payload.description;
        });

        const retry = await supabaseAdmin.from('products').insert([payload]).select();
        if (retry.error) {
          const hint = supabaseAdmin === supabase
            ? 'Insert failed. Check Supabase Row Level Security (RLS) or provide SUPABASE_SERVICE_ROLE_KEY for server-side writes.'
            : undefined;
          console.error('Retry insert also failed:', retry.error);
          return NextResponse.json({ success: false, error: retry.error.message, hint }, { status: 500 });
        }
        return NextResponse.json({ success: true, data: retry.data && retry.data[0], warning: `Inserted after removing missing columns: ${uniq.join(', ')}` }, { status: 201 });
      }

      const hint = supabaseAdmin === supabase
        ? 'Insert failed. Check Supabase Row Level Security (RLS) or provide SUPABASE_SERVICE_ROLE_KEY for server-side writes.'
        : undefined;
      return NextResponse.json({ success: false, error: error.message, hint }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data && data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (_serviceKeyLooksInvalid) {
      return NextResponse.json({
        success: false,
        error: 'Update blocked by Row Level Security. Server service role key is missing or invalid. Set SUPABASE_SERVICE_ROLE_KEY to your project service role key (do NOT expose it publicly) and restart the server.'
      }, { status: 500 });
    }
    const body = await getJSON(request);
    const parsed = updateProductSchema.safeParse(body);
    if (!parsed.success) {
      // Return zod validation issues (array of { path, message, code })
      return NextResponse.json({ success: false, error: parsed.error.issues }, { status: 400 });
    }

    let { name, description, price, discountType, discountValue, discountActive, category_id, in_stock, image, imageData, fileName } = parsed.data;

    name = name ? sanitizeString(name) : name;
    description = description ? sanitizeString(description) : description;
    
    let imageUrl = image || null;
    
    // If base64 image data is provided, upload it to Supabase Storage
    if (imageData && fileName) {
      try {
        // Convert base64 to buffer
        const base64Data = imageData.split(',')[1]; // Remove data:image/xxx;base64, prefix
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Generate unique file path
        const fileExt = fileName.split('.').pop();
        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${uniqueFileName}`;
        
        // Upload using admin client (bypasses RLS)
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('imagini')
          .upload(filePath, buffer, {
            contentType: imageData.split(';')[0].split(':')[1], // Extract MIME type
            upsert: false,
          });
        
        if (uploadError) {
          console.error('Image upload error:', uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('imagini')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrlData?.publicUrl || null;
      } catch (err: any) {
        console.error('Image upload exception:', err);
        throw new Error(`Failed to upload image: ${err.message}`);
      }
    }

    // Build update payload
    const payload: any = {};
    
    if (name !== undefined) payload.name = name;
    if (description !== undefined) payload.description = description;
    if (price !== undefined) payload.price = typeof price === 'number' ? price : Number(price);
    if (discountType !== undefined) payload.discount_type = discountType;
    if (discountValue !== undefined) payload.discount_value = discountValue;
    if (discountActive !== undefined) payload.discount_active = discountActive;
    if (category_id !== undefined) payload.category_id = category_id;
    if (in_stock !== undefined) payload.in_stock = in_stock;
    // Only update image if a new one was uploaded
    if (imageData && fileName && imageUrl !== null) payload.image = imageUrl;

    // Sanitize string fields for DB
    for (const k of Object.keys(payload)) {
      if (typeof payload[k] === 'string') payload[k] = sanitizeString(payload[k]);
      if (payload[k] === undefined) payload[k] = null;
    }

    // If no fields to update, return early
    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ success: false, error: 'No valid fields to update' }, { status: 400 });
    }

    let { data, error } = await supabaseAdmin
      .from('products')
      .update(payload)
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Supabase error updating product:', error);
      const hint = supabaseAdmin === supabase
        ? 'Update failed. Check Supabase Row Level Security (RLS) or provide SUPABASE_SERVICE_ROLE_KEY for server-side writes.'
        : undefined;
      return NextResponse.json({ success: false, error: error.message, hint }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - delete product
// This will delete all order items associated with the product, then delete the product itself
export async function DELETE(request: NextRequest, { params }: { params?: { id: string } }) {
  try {
    // Get ID from either route params or query parameter
    let id: string | null = null;
    
    if (params?.id) {
      // Route parameter (e.g., /api/products/123)
      id = params.id;
    } else {
      // Query parameter (e.g., /api/products?id=123)
      const { searchParams } = new URL(request.url);
      id = searchParams.get('id');
    }
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    // Check if product exists
    const { data: existingProduct, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    // First, delete all order items associated with this product
    // This is necessary to avoid foreign key constraint violations
    const { error: deleteOrderItemsError } = await supabaseAdmin
      .from('order_items')
      .delete()
      .eq('product_id', id);

    if (deleteOrderItemsError) {
      console.error('Supabase error deleting order items:', deleteOrderItemsError);
      return NextResponse.json({ success: false, error: `Failed to delete order items: ${deleteOrderItemsError.message}` }, { status: 500 });
    }

    // Now delete the product itself
    const { error: deleteProductError } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (deleteProductError) {
      console.error('Supabase error deleting product:', deleteProductError);
      return NextResponse.json({ success: false, error: `Failed to delete product: ${deleteProductError.message}` }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Product and all associated order items deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
