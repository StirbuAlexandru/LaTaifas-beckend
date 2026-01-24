'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Card, CardContent } from '../../../../components/ui/card';
import { Pencil, Trash2, Plus, Save, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface LocationImage {
  id: number;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

export default function LocationGalleryPage() {
  const [images, setImages] = useState<LocationImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    image_url: '',
    alt_text: '',
    display_order: 0
  });

  // Fetch images
  const fetchImages = async () => {
    try {
      const response = await fetch('/api/location-gallery');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle image upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `location-gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Eroare la încărcarea imaginii');
    }
  };

  // Add new image
  const handleAdd = async () => {
    try {
      const response = await fetch('/api/location-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchImages();
        setIsAdding(false);
        setFormData({ image_url: '', alt_text: '', display_order: 0 });
      }
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  // Update image
  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch('/api/location-gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData })
      });

      if (response.ok) {
        await fetchImages();
        setEditingId(null);
        setFormData({ image_url: '', alt_text: '', display_order: 0 });
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  // Delete image
  const handleDelete = async (id: number) => {
    if (!confirm('Sigur vrei să ștergi această imagine?')) return;

    try {
      const response = await fetch(`/api/location-gallery?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchImages();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Start editing
  const startEdit = (image: LocationImage) => {
    setEditingId(image.id);
    setFormData({
      image_url: image.image_url,
      alt_text: image.alt_text,
      display_order: image.display_order
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galerie Universul La Taifas</h1>
          <p className="text-gray-600 mt-2">Gestionează imaginile din secțiunea &quot;Universul La Taifas&quot;</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adaugă Imagine
        </Button>
      </div>

      {/* Add New Image Form */}
      {isAdding && (
        <Card className="mb-8 border-2 border-red-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Adaugă Imagine Nouă</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Imagine</label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  {formData.image_url && (
                    <div className="relative w-20 h-20">
                      <Image
                        src={formData.image_url}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                        sizes="80px"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Text Alternativ</label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descriere imagine"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ordine Afișare</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Salvează
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setFormData({ image_url: '', alt_text: '', display_order: 0 });
                  }}
                  variant="outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Anulează
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            </div>
            <CardContent className="p-4">
              {editingId === image.id ? (
                <div className="space-y-2">
                  <Input
                    value={formData.alt_text}
                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                    placeholder="Text alternativ"
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    placeholder="Ordine"
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(image.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Salvează
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ image_url: '', alt_text: '', display_order: 0 });
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-2">{image.alt_text}</p>
                  <p className="text-xs text-gray-500 mb-3">Ordine: {image.display_order}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(image)}
                      className="flex-1"
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Editează
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(image.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Nu există imagini. Adaugă prima imagine!</p>
        </div>
      )}
    </div>
  );
}
