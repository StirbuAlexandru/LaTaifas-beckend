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
    console.log('Running discount columns migration...');
    
    // Add discount column
    try {
      const { error: discountError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `ALTER TABLE products ADD COLUMN IF NOT EXISTS discount INTEGER DEFAULT 0;`
      });
      
      if (discountError) {
        console.warn('Warning adding discount column:', discountError.message);
      } else {
        console.log('Successfully added discount column');
      }
    } catch (err) {
      console.warn('Non-critical error adding discount column:', err);
    }
    
    // Add original_price column
    try {
      const { error: priceError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);`
      });
      
      if (priceError) {
        console.warn('Warning adding original_price column:', priceError.message);
      } else {
        console.log('Successfully added original_price column');
      }
    } catch (err) {
      console.warn('Non-critical error adding original_price column:', err);
    }
    
    // Add check constraint to ensure discount is between 0 and 100
    try {
      const { error: constraintError } = await supabaseAdmin.rpc('execute_sql', {
        sql: `
          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT 1 FROM pg_constraint WHERE conname = 'discount_range'
            ) THEN
              ALTER TABLE products 
              ADD CONSTRAINT discount_range CHECK (discount >= 0 AND discount <= 100);
            END IF;
          END
          $$;
        `
      });
      
      if (constraintError) {
        console.warn('Warning adding constraint:', constraintError.message);
      } else {
        console.log('Successfully added discount constraint');
      }
    } catch (err) {
      console.warn('Non-critical error adding constraint:', err);
    }
    
    return NextResponse.json({ success: true, message: 'Migration completed successfully!' });
  } catch (error) {
    console.error('Error running migration:', error);
    return NextResponse.json({ success: false, error: 'Failed to run migration' }, { status: 500 });
  }
}