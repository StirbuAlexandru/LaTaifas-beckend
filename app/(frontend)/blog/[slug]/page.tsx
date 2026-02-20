'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowLeft, Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
      } else {
        setError('Articolul nu a fost găsit');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Eroare la încărcarea articolului');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Articol negăsit</h1>
        <p className="text-gray-600 mb-8">{error || 'Acest articol nu există sau a fost șters.'}</p>
        <Button onClick={() => router.push('/blog')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la blog
        </Link>

        {/* Blog Post Card */}
        <Card className="overflow-hidden shadow-lg">
          {/* Featured Image */}
          {blog.image && (
            <div className="relative w-full h-96">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <CardContent className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(blog.published_at || blog.created_at).toLocaleDateString('ro-RO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {blog.author}
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-gray-700 italic mb-8 pb-8 border-b">
                {blog.excerpt}
              </p>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </CardContent>
        </Card>

        {/* Back to Blog Button */}
        <div className="mt-8 text-center">
          <Button onClick={() => router.push('/blog')} variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Vezi toate articolele
          </Button>
        </div>
      </div>
    </div>
  );
}
