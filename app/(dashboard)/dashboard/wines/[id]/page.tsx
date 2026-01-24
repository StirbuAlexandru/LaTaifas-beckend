'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface EditWinePageProps {
  params: { id: string };
}

const EditWinePage = ({ params }: EditWinePageProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountType: 'percentage',
    discountValue: '',
    discountActive: false,
    wineType: '',
    sweetness: '',
    region: '',
    alcoholContent: '',
    volume: '750',
    year: '',
    producer: '',
    in_stock: true,
    featured: false,
    image: '',
    imageData: '',
    fileName: '',
  });

  useEffect(() => {
    const fetchWine = async () => {
      try {
        const response = await fetch(`/api/wines/${params.id}`);
        const result = await response.json();

        if (result.success) {
          const wine = result.data;
          setFormData({
            name: wine.name || '',
            description: wine.description || '',
            price: wine.price?.toString() || '',
            discountType: wine.discount_type || 'percentage',
            discountValue: wine.discount_value?.toString() || '',
            discountActive: wine.discount_active || false,
            wineType: wine.wine_type || '',
            sweetness: wine.sweetness || '',
            region: wine.region || '',
            alcoholContent: wine.alcohol_content?.toString() || '',
            volume: wine.volume?.toString() || '750',
            year: wine.year?.toString() || '',
            producer: wine.producer || '',
            in_stock: wine.in_stock !== false,
            featured: wine.featured || false,
            image: wine.image || '',
            imageData: '',
            fileName: '',
          });
          if (wine.image) {
            setImagePreview(wine.image);
          }
        } else {
          alert('Eroare la încărcarea vinului');
        }
      } catch (error) {
        console.error('Error fetching wine:', error);
        alert('A apărut o eroare');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchWine();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setFormData(prev => ({
        ...prev,
        imageData: base64,
        fileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discountValue: formData.discountValue && formData.discountValue.trim() !== '' ? parseFloat(formData.discountValue) : null,
        alcoholContent: formData.alcoholContent ? parseFloat(formData.alcoholContent) : null,
        volume: formData.volume ? parseInt(formData.volume) : 750,
        year: formData.year ? parseInt(formData.year) : null,
      };

      const response = await fetch(`/api/wines/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/dashboard/wines');
      } else {
        alert('Eroare la actualizarea vinului: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating wine:', error);
      alert('A apărut o eroare la actualizarea vinului');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-6 text-center">
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/wines">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la vinuri
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Editează Vin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Informații de bază</h2>
            
            <div>
              <Label htmlFor="name">Nume vin *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="description">Descriere</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="producer">Producător</Label>
                <Input id="producer" name="producer" value={formData.producer} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="region">Regiune</Label>
                <Input id="region" name="region" value={formData.region} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Detalii vin</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="wineType">Tip vin</Label>
                <Select value={formData.wineType} onValueChange={(value) => handleSelectChange('wineType', value)}>
                  <SelectTrigger><SelectValue placeholder="Selectează tipul" /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white">
                    <SelectItem value="red" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Roșu</SelectItem>
                    <SelectItem value="white" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Alb</SelectItem>
                    <SelectItem value="rose" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Rose</SelectItem>
                    <SelectItem value="sparkling" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Spumant</SelectItem>
                    <SelectItem value="dessert" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Desert</SelectItem>
                    <SelectItem value="fortified" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Fortificat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sweetness">Grad de zahăr</Label>
                <Select value={formData.sweetness} onValueChange={(value) => handleSelectChange('sweetness', value)}>
                  <SelectTrigger><SelectValue placeholder="Selectează gradul de zahăr" /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white">
                    <SelectItem value="dulce" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Dulce</SelectItem>
                    <SelectItem value="demidulce" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Demidulce</SelectItem>
                    <SelectItem value="demisec" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Demisec</SelectItem>
                    <SelectItem value="sec" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Sec</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">An</Label>
                <Input id="year" name="year" type="number" value={formData.year} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alcoholContent">Alcool (%)</Label>
                <Input id="alcoholContent" name="alcoholContent" type="number" step="0.1" value={formData.alcoholContent} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="volume">Volum (ml)</Label>
                <Input id="volume" name="volume" type="number" value={formData.volume} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preț și Reduceri</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preț (lei) *</Label>
                <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="discountType">Tip reducere</Label>
                <Select value={formData.discountType} onValueChange={(value) => handleSelectChange('discountType', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white">
                    <SelectItem value="percentage" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Procent</SelectItem>
                    <SelectItem value="fixed" className="bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900">Valoare fixă</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountValue">Valoare reducere</Label>
                <Input id="discountValue" name="discountValue" type="number" step="0.01" value={formData.discountValue} onChange={handleInputChange} />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox id="discountActive" checked={formData.discountActive} onCheckedChange={(checked) => handleCheckboxChange('discountActive', checked as boolean)} />
                <Label htmlFor="discountActive" className="cursor-pointer">Reducere activă</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Imagine</h2>
            <div>
              <Label htmlFor="image" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-red-600 transition-colors">
                  {imagePreview ? (
                    <div className="relative w-48 h-48 mx-auto">
                      <Image src={imagePreview} alt="Preview" fill className="object-contain rounded" />
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Click pentru a încărca o imagine</p>
                    </div>
                  )}
                </div>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h2>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="in_stock" checked={formData.in_stock} onCheckedChange={(checked) => handleCheckboxChange('in_stock', checked as boolean)} />
                <Label htmlFor="in_stock" className="cursor-pointer">În stoc</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" checked={formData.featured} onCheckedChange={(checked) => handleCheckboxChange('featured', checked as boolean)} />
                <Label htmlFor="featured" className="cursor-pointer">Promovat</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link href="/dashboard/wines">
              <Button type="button" variant="outline">Anulează</Button>
            </Link>
            <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
              {loading ? 'Se salvează...' : 'Salvează Modificările'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWinePage;
