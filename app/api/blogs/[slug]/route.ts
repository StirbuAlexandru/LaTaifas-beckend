import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/blogs/[slug] - Fetch single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[slug] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { 
      title, 
      new_slug, 
      excerpt, 
      content, 
      image, 
      author, 
      tags, 
      is_published, 
      published_at 
    } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (new_slug !== undefined) updateData.slug = new_slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (author !== undefined) updateData.author = author;
    if (tags !== undefined) updateData.tags = tags;
    if (is_published !== undefined) updateData.is_published = is_published;
    if (published_at !== undefined) updateData.published_at = published_at;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update(updateData)
      .eq('slug', slug)
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[slug] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('slug', slug);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
