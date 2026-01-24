import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { z } from 'zod';

// Create admin client with service role key (if available)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Import createClient from @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = serviceRoleKey && serviceRoleKey !== process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase;

// Zod schema for wine creation
const createWineSchema = z.object({
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
  wineType: z.string().optional().nullable(),
  sweetness: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  alcoholContent: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }),
  volume: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return 750;
    const num = Number(v);
    return isNaN(num) ? 750 : num;
  }),
  year: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }),
  producer: z.string().optional().nullable(),
  in_stock: z.boolean().optional(),
  featured: z.boolean().optional(),
  customWineCategoryId: z.string().uuid().optional().nullable(),
  image: z.string().optional().nullable(),
  imageData: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
});

// Utility: sanitize strings
const sanitizeString = (s: any) => {
  if (s === null || s === undefined) return s;
  if (typeof s !== 'string') return s;
  return s.replace(/[\u0000-\u001f]/g, '').replace(/[\uD800-\uDFFF]/g, '').trim();
};

// Utility: generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// GET /api/wines - List wines with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const wineType = searchParams.get('wineType');
    const customCategory = searchParams.get('customCategory');
    const featured = searchParams.get('featured');
    const inStock = searchParams.get('inStock');

    let query = supabase.from('wines').select(`
      *,
      custom_wine_category:custom_wine_categories(id, name, slug)
    `, { count: 'exact' });

    // Apply filters
    if (wineType) {
      query = query.eq('wine_type', wineType);
    }
    if (customCategory && customCategory !== 'all') {
      query = query.eq('custom_wine_category_id', customCategory);
    }
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    if (inStock === 'true') {
      query = query.eq('in_stock', true);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error fetching wines:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Transform wines to match frontend interface
    const transformedWines = (data || []).map((wine: any) => ({
      id: wine.id,
      name: wine.name,
      slug: wine.slug,
      description: wine.description,
      price: wine.price,
      discountType: wine.discount_type || undefined,
      discountValue: wine.discount_value || undefined,
      discountActive: wine.discount_active || false,
      image: wine.image,
      wineType: wine.wine_type,
      sweetness: wine.sweetness,
      region: wine.region,
      alcoholContent: wine.alcohol_content,
      volume: wine.volume || 750,
      year: wine.year,
      producer: wine.producer,
      inStock: wine.in_stock,
      featured: wine.featured,
      customWineCategory: wine.custom_wine_category || null,
      createdAt: wine.created_at,
      updatedAt: wine.updated_at,
    }));

    const total = typeof count === 'number' ? count : (data ? data.length : 0);
    const totalPages = Math.ceil(total / limit || 1);

    return NextResponse.json({ 
      success: true, 
      data: { wines: transformedWines, total, page, totalPages } 
    });
  } catch (error) {
    console.error('Error fetching wines:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch wines' }, { status: 500 });
  }
}

// POST /api/wines - Create new wine
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createWineSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Validation failed', 
        details: parsed.error.issues 
      }, { status: 400 });
    }

    const {
      name,
      description,
      price,
      discountType,
      discountValue,
      discountActive,
      wineType,
      sweetness,
      region,
      alcoholContent,
      volume,
      year,
      producer,
      in_stock,
      featured,
      customWineCategoryId,
      imageData,
      fileName
    } = parsed.data;

    // Generate slug from name
    let slug = generateSlug(name);
    
    // Check if slug exists and make unique if necessary
    const { data: existingWine } = await supabase
      .from('wines')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existingWine) {
      slug = `${slug}-${Date.now()}`;
    }

    // Handle image upload if imageData is provided
    let imageUrl = body.image || null;
    if (imageData) {
      // If imageData is a base64 string, use it directly
      if (imageData.startsWith('data:image')) {
        imageUrl = imageData;
      } else if (fileName) {
        // Try to upload to storage
        try {
          const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const fileExt = fileName.split('.').pop();
          const filePath = `wines/${slug}-${Date.now()}.${fileExt}`;

          const { error: uploadError } = await supabaseAdmin.storage
            .from('products')
            .upload(filePath, buffer, {
              contentType: `image/${fileExt}`,
              upsert: false
            });

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            // Fallback to base64 if upload fails
            imageUrl = imageData;
          } else {
            const { data: urlData } = supabaseAdmin.storage
              .from('products')
              .getPublicUrl(filePath);
            imageUrl = urlData.publicUrl;
          }
        } catch (uploadErr) {
          console.error('Image upload exception:', uploadErr);
          // Fallback to base64 if upload fails
          imageUrl = imageData;
        }
      }
    }

    // Prepare payload
    const payload: any = {
      name,
      slug,
      description: description ?? null,
      price: typeof price === 'number' ? price : Number(price),
      discount_type: discountType ?? 'percentage',
      discount_value: discountValue ?? null,
      discount_active: discountActive ?? false,
      wine_type: wineType ?? null,
      sweetness: sweetness ?? null,
      region: region ?? null,
      alcohol_content: alcoholContent ?? null,
      volume: volume ?? 750,
      year: year ?? null,
      producer: producer ?? null,
      in_stock: in_stock ?? true,
      featured: featured ?? false,
      image: imageUrl,
    };

    // Sanitize string fields
    for (const k of Object.keys(payload)) {
      if (typeof payload[k] === 'string') payload[k] = sanitizeString(payload[k]);
      if (payload[k] === undefined) payload[k] = null;
    }

    const { data, error } = await supabaseAdmin.from('wines').insert([payload]).select();

    if (error) {
      console.error('Supabase error inserting wine:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data && data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating wine:', error);
    return NextResponse.json({ success: false, error: 'Failed to create wine' }, { status: 500 });
  }
}
