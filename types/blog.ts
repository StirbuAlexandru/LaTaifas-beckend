export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  tags: string[];
  categoryId?: string;
  category?: BlogCategory;
  publishedAt?: Date;
  status: BlogStatus;
  featured: boolean;
  viewsCount: number;
  readingTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogFilters {
  status?: BlogStatus;
  categoryId?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}
