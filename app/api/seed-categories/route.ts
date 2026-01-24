import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

// Categories data from the menu page
const menuCategories = [
  {
    id: 'antreuri',
    name: 'I. ANTREURI'
  },
  {
    id: 'mic-dejun',
    name: 'II. MICUL DEJUN'
  },
  {
    id: 'ciorbe',
    name: 'III. CIORBE ȘI SUPE'
  },
  {
    id: 'platouri',
    name: 'IV. PLATOURI'
  },
  {
    id: 'platouri-evenimente',
    name: 'VI. PLATOURI EVENIMENTE'
  },
  {
    id: 'una-alta',
    name: 'V. UNA, ALTA'
  },
  {
    id: 'grill',
    name: 'VI. GRILL'
  },
  {
    id: 'paste',
    name: 'VII. PASTE'
  },
  {
    id: 'burgeri',
    name: 'VIII. BURGERI'
  },
  {
    id: 'salate',
    name: 'IX. SALATE de ÎNSOȚIRE'
  },
  {
    id: 'garnituri',
    name: 'X. GARNITURI'
  },
  {
    id: 'pizza',
    name: 'XI. PIZZA'
  },
  {
    id: 'sosuri',
    name: 'XII. SOSURI'
  },
  {
    id: 'post',
    name: 'XIII. PRODUSE DE POST'
  },
  {
    id: 'paine',
    name: 'XIV. PÂINE'
  },
  {
    id: 'desert',
    name: 'XV. DESERT'
  },
  {
    id: 'vinuri',
    name: 'XVI. VINURI'
  },
  {
    id: 'bere',
    name: 'XVII. BERE'
  },
  {
    id: 'bauturi',
    name: 'XVIII. BAUTURI SPIRTOASE'
  },
  {
    id: 'cocktailuri',
    name: 'XIX. COCKTAILURI'
  },
  {
    id: 'limonade',
    name: 'XX. LIMONADE SI FRESH-URI'
  },
  {
    id: 'cafea',
    name: 'XXI. CAFEA'
  },
  {
    id: 'bauturi-racoritoare',
    name: 'XXII. BAUTURI RACORITOARE'
  },
  {
    id: 'diverse',
    name: 'XXIII. DIVERSE'
  }
];

interface CategoryToInsert {
  id: string;
  name: string;
  slug: string;
  description: null;
  parent_id: null;
  order: number;
  is_active: boolean;
  created_at: string;
}

// POST /api/seed-categories - Seed categories into database
export async function POST(request: NextRequest) {
  try {
    // Check if categories already exist
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('id, name, slug');
      
    if (fetchError) {
      console.error('Error fetching existing categories:', fetchError);
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
    }
    
    // Prepare categories for insertion (only add missing ones)
    const categoriesToAdd: CategoryToInsert[] = [];
    const existingCategoryIds = new Set(existingCategories?.map(cat => cat.id) || []);
    const existingSlugs = new Set(existingCategories?.map(cat => cat.slug) || []);
    
    menuCategories.forEach((category, index) => {
      // Only add category if it doesn't already exist
      if (!existingCategoryIds.has(category.id) && !existingSlugs.has(category.id)) {
        categoriesToAdd.push({
          id: uuidv4(), // Generate a new UUID
          name: category.name,
          slug: category.id,
          description: null,
          parent_id: null,
          order: index,
          is_active: true,
          created_at: new Date().toISOString()
        });
      }
    });
    
    // If no categories to add, return early
    if (categoriesToAdd.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'All menu categories already exist in database',
        data: existingCategories 
      });
    }
    
    // Insert missing categories
    const { data, error } = await supabase
      .from('categories')
      .insert(categoriesToAdd)
      .select();
      
    if (error) {
      console.error('Error inserting categories:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    
    // Log what we've added
    console.log(`Added ${categoriesToAdd.length} new categories:`, categoriesToAdd.map(c => c.name));
    
    return NextResponse.json({ 
      success: true, 
      message: `Added ${categoriesToAdd.length} new categories`,
      data 
    });
  } catch (error) {
    console.error('Error seeding categories:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed categories' }, { status: 500 });
  }
}