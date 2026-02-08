'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Save, X, Image as ImageIcon, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EventImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export default function EventGalleryPage() {
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    image_url: '',
    alt_text: '',
    is_primary: false,
  });
  const [uploading, setUploading] = useState(false);
  const [editFormData, setEditFormData] = useState<{[key: string]: Partial<EventImage>}>({});

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/event-gallery');
      const result = await response.json();
      if (result.success) {
        setImages(result.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      showMessage('error', 'Eroare la încărcarea imaginilor');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `event-gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: data.publicUrl });
      showMessage('success', 'Imaginea a fost încărcată cu succes');
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', 'Eroare la încărcarea imaginii');
    } finally {
      setUploading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle image upload for editing
  const handleEditImageUpload = async (imageId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `event-gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setEditFormData({
        ...editFormData,
        [imageId]: {
          ...editFormData[imageId],
          image_url: data.publicUrl
        }
      });
      showMessage('success', 'Imaginea a fost încărcată cu succes');
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', 'Eroare la încărcarea imaginii');
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.image_url) {
      showMessage('error', 'URL-ul imaginii este obligatoriu');
      return;
    }

    try {
      const response = await fetch('/api/event-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          display_order: images.length + 1,
        }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage('success', 'Imaginea a fost adăugată cu succes');
        setFormData({ image_url: '', alt_text: '', is_primary: false });
        setShowAddForm(false);
        fetchImages();
      } else {
        showMessage('error', result.error || 'Eroare la adăugarea imaginii');
      }
    } catch (error) {
      showMessage('error', 'Eroare la adăugarea imaginii');
    }
  };

  const handleUpdate = async (id: string, updates: Partial<EventImage>) => {
    try {
      const response = await fetch('/api/event-gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage('success', 'Imaginea a fost actualizată');
        setEditingId(null);
        fetchImages();
      } else {
        showMessage('error', result.error || 'Eroare la actualizarea imaginii');
      }
    } catch (error) {
      showMessage('error', 'Eroare la actualizarea imaginii');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sigur doriți să ștergeți această imagine?')) return;

    try {
      // Find the image to get its URL
      const imageToDelete = images.find(img => img.id === id);
      
      // Delete from database
      const response = await fetch(`/api/event-gallery?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        // Try to delete from storage if it's a Supabase URL
        if (imageToDelete?.image_url.includes('supabase.co/storage')) {
          const urlParts = imageToDelete.image_url.split('/storage/v1/object/public/products/');
          if (urlParts[1]) {
            await supabase.storage
              .from('products')
              .remove([urlParts[1]]);
          }
        }
        
        showMessage('success', 'Imaginea a fost ștearsă');
        fetchImages();
      } else {
        showMessage('error', result.error || 'Eroare la ștergerea imaginii');
      }
    } catch (error) {
      showMessage('error', 'Eroare la ștergerea imaginii');
    }
  };

  const moveImage = async (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    // Swap
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];

    // Update display orders
    const updates = newImages.map((img, idx) => ({
      id: img.id,
      display_order: idx + 1,
    }));

    // Update in database
    try {
      await Promise.all(
        updates.map(update =>
          fetch('/api/event-gallery', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update),
          })
        )
      );
      fetchImages();
    } catch (error) {
      showMessage('error', 'Eroare la reordonarea imaginilor');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galerie Evenimente</h1>
          <p className="text-gray-600 mt-1">Gestionează imaginile de la secțiunea evenimente</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adaugă Imagine
        </Button>
      </div>

      {message && (
        <Alert className={`mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {message.text}
        </Alert>
      )}

      {/* Add Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adaugă Imagine Nouă</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Încarcă Imagine</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                  {uploading && (
                    <p className="text-sm text-gray-500 mt-2">Se încarcă imaginea...</p>
                  )}
                  {formData.image_url && (
                    <div className="mt-3 relative h-32 w-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={formData.image_url}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label>Text Alternativ</Label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descriere eveniment"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_primary"
                  checked={formData.is_primary}
                  onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_primary">Afișează în prima secțiune (primele 4 imagini)</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Salvează
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Anulează
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                className="object-cover"
              />
              {image.is_primary && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Principal
                </div>
              )}
            </div>
            <CardContent className="p-4">
              {editingId === image.id ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Schimbă Imagine</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleEditImageUpload(image.id, e)}
                      disabled={uploading}
                      className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 mt-1"
                    />
                    {editFormData[image.id]?.image_url && (
                      <div className="mt-2 relative h-20 w-20 rounded overflow-hidden border">
                        <Image
                          src={editFormData[image.id].image_url!}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <Input
                    defaultValue={image.alt_text}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      [image.id]: {
                        ...editFormData[image.id],
                        alt_text: e.target.value
                      }
                    })}
                    placeholder="Text alternativ"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={image.is_primary}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        [image.id]: {
                          ...editFormData[image.id],
                          is_primary: e.target.checked
                        }
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Principal</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        handleUpdate(image.id, editFormData[image.id] || {});
                        setEditFormData({});
                      }}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      size="sm"
                      variant="outline"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-3">{image.alt_text}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => moveImage(index, 'up')}
                      disabled={index === 0}
                      size="sm"
                      variant="outline"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => moveImage(index, 'down')}
                      disabled={index === images.length - 1}
                      size="sm"
                      variant="outline"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setEditingId(image.id)}
                      size="sm"
                      variant="outline"
                      className="ml-auto"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(image.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nu există imagini. Adaugă prima imagine!</p>
        </div>
      )}
    </div>
  );
}
