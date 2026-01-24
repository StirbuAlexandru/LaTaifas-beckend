import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

// Create admin client for service role operations
let supabaseAdmin: any = null;
const _rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
try {
  if (_rawKey && _rawKey.split('.').length === 3) {
    supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', _rawKey);
  } else if (_rawKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY looks malformed (not a JWT).');
  } else {
    supabaseAdmin = null;
  }
} catch (err) {
  console.error('Failed to create Supabase admin client:', (err as any)?.message || String(err));
  supabaseAdmin = null;
}
if (!supabaseAdmin) supabaseAdmin = supabase;

export async function GET() {
  try {
    console.log('Adding featured column to products table...');
    
    // Add featured column
    try {
      const { error: columnError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          ALTER TABLE public.products 
          ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
        `
      });
      
      if (columnError) {
        console.warn('Warning adding featured column:', columnError.message);
        return NextResponse.json({ success: false, error: columnError.message }, { status: 500 });
      } else {
        console.log('Successfully added featured column');
      }
    } catch (err) {
      console.warn('Error adding featured column:', err);
      return NextResponse.json({ success: false, error: 'Failed to add featured column' }, { status: 500 });
    }
    
    // Add index for better query performance
    try {
      const { error: indexError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
        `
      });
      
      if (indexError) {
        console.warn('Warning adding index to featured column:', indexError.message);
      } else {
        console.log('Successfully added index to featured column');
      }
    } catch (err) {
      console.warn('Non-critical error adding index to featured column:', err);
    }
    
    // Add comment for clarity
    try {
      const { error: commentError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          COMMENT ON COLUMN public.products.featured IS 'Whether the product is featured';
        `
      });
      
      if (commentError) {
        console.warn('Warning adding comment to featured column:', commentError.message);
      } else {
        console.log('Successfully added comment to featured column');
      }
    } catch (err) {
      console.warn('Non-critical error adding comment to featured column:', err);
    }
    
    return NextResponse.json({ success: true, message: 'Successfully added featured column to products table!' });
  } catch (error) {
    console.error('Error adding featured column:', error);
    return NextResponse.json({ success: false, error: 'Failed to add featured column' }, { status: 500 });
  }
}