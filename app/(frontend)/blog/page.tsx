import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Calendar, User, Tag } from 'lucide-react';

const mockBlogPosts = [
  {
    id: '1',
    title: '5 Sfaturi pentru un Stil de Viață Mai Sănătos',
    excerpt: 'Descoperă schimbări simple pe care le poți face pentru a-ți îmbunătăți sănătatea generală și bunăstarea.',
    date: '2023-06-15',
    author: 'Maria Rodriguez',
    tags: ['Sănătate', 'Stil de viață'],
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800',
  },
  {
    id: '2',
    title: 'Arta Realizării unei Pizza Perfecte',
    excerpt: 'Află secretele pentru a crea o coajă de pizza perfectă și combinația ideală de toppinguri.',
    date: '2023-06-10',
    author: 'Chef Antonio',
    tags: ['Gătit', 'Pizza'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
  },
  {
    id: '3',
    title: 'Ingrediente Sezoniere: Preferatele Verii',
    excerpt: 'Explorează cele mai bune ingrediente sezoniere pentru vară și cum să le incluzi în mâncărurile tale.',
    date: '2023-06-05',
    author: 'Sarah Johnson',
    tags: ['Sezonier', 'Ingrediente'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
  },
  {
    id: '4',
    title: 'Restaurant Sustenabil: Inițiativele Noastre Ecologice',
    excerpt: 'Află despre angajamentul nostru față de sustenabilitate și practicile prietenoase cu mediul pe care le implementăm.',
    date: '2023-05-28',
    author: 'Michael Chen',
    tags: ['Sustenabilitate', 'Mediu'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blogul Nostru</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descoperă rețete, sfaturi de gătit și povești din bucătăria și comunitatea noastră.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href={`/blog/${post.id}`} className="hover:text-red-600 transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {post.excerpt}
              </CardDescription>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <Button variant="outline">Încarcă Mai Multe Articole</Button>
      </div>
    </div>
  );
}