import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Create admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = serviceRoleKey && serviceRoleKey !== process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : supabase;

// Zod schema for wine update
const updateWineSchema = z.object({
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
  wineType: z.string().optional().nullable(),
  sweetness: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  alcoholContent: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }),
  volume: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }),
  year: z.number().or(z.string()).optional().nullable().transform((v) => {
    if (v === null || v === undefined || v === '') return null;
    const num = Number(v);
    return isNaN(num) ? null : num;
  }),
  producer: z.string().optional().nullable(),
  in_stock: z.boolean().optional(),
  featured: z.boolean().optional(),
  image: z.string().optional().nullable(),
  imageData: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
});

const sanitizeString = (s: any) => {
  if (s === null || s === undefined) return s;
  if (typeof s !== 'string') return s;
  return s.replace(/[\u0000-\u001f]/g, '').replace(/[\uD800-\uDFFF]/g, '').trim();
};

// GET /api/wines/[id] - Get single wine
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const wineId = params.id;
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(wineId)) {
      return NextResponse.json({ success: false, error: 'Invalid wine ID format' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('wines')
      .select('*')
      .eq('id', wineId);

    if (error) {
      console.error('Supabase error fetching wine:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: 'Wine not found' }, { status: 404 });
    }

    const wine = {
      ...data[0],
      discountType: data[0].discount_type || undefined,
      discountValue: data[0].discount_value || undefined,
      discountActive: data[0].discount_active || false,
      wineType: data[0].wine_type,
      sweetness: data[0].sweetness,
      alcoholContent: data[0].alcohol_content,
      inStock: data[0].in_stock,
    };

    return NextResponse.json({ success: true, data: wine });
  } catch (error) {
    console.error('Error fetching wine:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch wine' }, { status: 500 });
  }
}

// PUT /api/wines/[id] - Update wine
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const wineId = params.id;
    const body = await request.json();
    
    const parsed = updateWineSchema.safeParse(body);
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
      imageData,
      fileName
    } = parsed.data;

    // Handle image upload if new image data provided
    let imageUrl = body.image || undefined;
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
          const filePath = `wines/${wineId}-${Date.now()}.${fileExt}`;

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

    const payload: any = {};
    
    if (name !== undefined) payload.name = name;
    if (description !== undefined) payload.description = description;
    if (price !== undefined) payload.price = price;
    if (discountType !== undefined) payload.discount_type = discountType;
    if (discountValue !== undefined && discountValue !== null) payload.discount_value = discountValue;
    if (discountActive !== undefined) payload.discount_active = discountActive;
    if (wineType !== undefined) payload.wine_type = wineType;
    if (sweetness !== undefined) payload.sweetness = sweetness;
    if (region !== undefined) payload.region = region;
    if (alcoholContent !== undefined) payload.alcohol_content = alcoholContent;
    if (volume !== undefined) payload.volume = volume;
    if (year !== undefined) payload.year = year;
    if (producer !== undefined) payload.producer = producer;
    if (in_stock !== undefined) payload.in_stock = in_stock;
    if (featured !== undefined) payload.featured = featured;
    if (imageUrl !== undefined) payload.image = imageUrl;

    // Sanitize strings
    for (const k of Object.keys(payload)) {
      if (typeof payload[k] === 'string') payload[k] = sanitizeString(payload[k]);
    }

    const { data, error } = await supabaseAdmin
      .from('wines')
      .update(payload)
      .eq('id', wineId)
      .select();

    if (error) {
      console.error('Supabase error updating wine:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: 'Wine not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error updating wine:', error);
    return NextResponse.json({ success: false, error: 'Failed to update wine' }, { status: 500 });
  }
}

// DELETE /api/wines/[id] - Delete wine
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const wineId = params.id;

    const { error } = await supabaseAdmin.from('wines').delete().eq('id', wineId);

    if (error) {
      console.error('Supabase error deleting wine:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Wine deleted successfully' });
  } catch (error) {
    console.error('Error deleting wine:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete wine' }, { status: 500 });
  }
}
