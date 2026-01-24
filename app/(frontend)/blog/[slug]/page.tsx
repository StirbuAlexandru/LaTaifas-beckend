import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const mockBlogPost = {
  id: '1',
  title: '5 Sfaturi pentru un Stil de Viață Mai Sănătos',
  content: `
    <p>Trăirea unui stil de viață mai sănătos nu trebuie să fie complicată. Cu câteva schimbări simple, poți îmbunătăți semnificativ starea ta generală de bine și nivelul de energie. Iată cinci sfaturi practice pentru a începe:</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">1. Menține-te Hidratat</h2>
    <p>Băutura suficientă de apă este fundamentală pentru o bună sănătate. Încearcă să bei cel puțin 8 pahare de apă pe zi. Dacă ți se pare plictisitoare apa simplă, încearcă să adaugi o felie de lămâie sau castravete pentru un gust natural.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">2. Acordă Prioritate Somnului</h2>
    <p>Somnul de calitate este esențial atât pentru sănătatea fizică, cât și pentru cea mentală. Încearcă să dormi 7-9 ore pe noapte stabilind o rutină constantă de culcare și creând un mediu prietenos cu somnul.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">3. Mișcă-ți Corpul</h2>
    <p>Nu trebuie să alergi un maraton pentru a rămâne activ. Găsește activități pe care le plăcești, fie că este dans, înot, drumeții sau chiar grădinărit. Cheia este consecvența peste intensitate.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">4. Mănâncă Conștient</h2>
    <p>Acordă atenție ceea ce mănânci și cum te face să te simți. Concentrează-te pe alimente integrale precum fructe, legume, proteine slabe și cereale integrale. Practică controlul porțiilor și încearcă să mănânci încet.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">5. Gestionează Stresul</h2>
    <p>Stresul cronic poate avea un impact negativ asupra sănătății tale. Dezvoltă mecanisme sănătoase de coping cum ar fi meditația, exercițiile de respirație profundă sau petrecerea timpului în natură.</p>
    
    <p className="mt-8">Amintește-ți că schimbările mici duc la rezultate mari în timp. Începe cu unul sau două sfaturi și încorporează treptat mai multe pe măsură ce acestea devin obiceiuri.</p>
  `,
  date: '2023-06-15',
  author: 'Maria Rodriguez',
  tags: ['Sănătate', 'Stil de viață', 'Bunăstare'],
  image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800',
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/blog" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la Blog
        </Link>
      </Button>
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{mockBlogPost.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>De {mockBlogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(mockBlogPost.date).toLocaleDateString('ro-RO', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {mockBlogPost.tags.map((tag) => (
              <span 
                key={tag} 
                className="flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                <Tag className="h-4 w-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={mockBlogPost.image} 
            alt={mockBlogPost.title} 
            className="w-full h-96 object-cover"
          />
        </div>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
        />
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Scris de {mockBlogPost.author}</h3>
              <p className="text-gray-600">
                Nutriționistă și expertă în bunăstare cu peste 10 ani de experiență în ajutarea oamenilor să trăiască vieți mai sănătoase.
              </p>
            </div>
            <Button variant="outline">Citește Mai Multe Articole</Button>
          </div>
        </div>
      </article>
    </div>
  );
}