import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
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
    console.log('Adding discountPrice column to products table...');
    
    // Add discountPrice column
    try {
      const { error: columnError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          ALTER TABLE public.products 
          ADD COLUMN IF NOT EXISTS discountPrice DECIMAL(10,2);
        `
      });
      
      if (columnError) {
        console.warn('Warning adding discountPrice column:', columnError.message);
        return NextResponse.json({ success: false, error: columnError.message }, { status: 500 });
      } else {
        console.log('Successfully added discountPrice column');
      }
    } catch (err) {
      console.warn('Error adding discountPrice column:', err);
      return NextResponse.json({ success: false, error: 'Failed to add discountPrice column' }, { status: 500 });
    }
    
    // Update any existing string values to proper numbers
    try {
      const { error: updateError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          UPDATE public.products 
          SET discountPrice = CAST(NULLIF(TRIM(discountPrice::TEXT), '') AS DECIMAL(10,2))
          WHERE discountPrice IS NOT NULL;
        `
      });
      
      if (updateError) {
        console.warn('Warning updating discountPrice values:', updateError.message);
      } else {
        console.log('Successfully updated discountPrice values');
      }
    } catch (err) {
      console.warn('Non-critical error updating discountPrice values:', err);
    }
    
    // Ensure discountPrice is null when it's 0 or invalid
    try {
      const { error: nullifyError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          UPDATE public.products 
          SET discountPrice = NULL 
          WHERE discountPrice <= 0 OR discountPrice >= price;
        `
      });
      
      if (nullifyError) {
        console.warn('Warning nullifying invalid discountPrice values:', nullifyError.message);
      } else {
        console.log('Successfully nullified invalid discountPrice values');
      }
    } catch (err) {
      console.warn('Non-critical error nullifying invalid discountPrice values:', err);
    }
    
    // Add comment for clarity
    try {
      const { error: commentError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          COMMENT ON COLUMN public.products.discountPrice IS 'Discounted price of the product (if applicable)';
        `
      });
      
      if (commentError) {
        console.warn('Warning adding comment to discountPrice column:', commentError.message);
      } else {
        console.log('Successfully added comment to discountPrice column');
      }
    } catch (err) {
      console.warn('Non-critical error adding comment to discountPrice column:', err);
    }
    
    return NextResponse.json({ success: true, message: 'Successfully added discountPrice column to products table!' });
  } catch (error) {
    console.error('Error adding discountPrice column:', error);
    return NextResponse.json({ success: false, error: 'Failed to add discountPrice column' }, { status: 500 });
  }
}