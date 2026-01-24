'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { UtensilsCrossed, Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  note: string | null;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  details: string | null;
  ingredients: string | null;
  display_order: number;
  image_url: string | null;
}

export default function MenuManagerPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    note: '',
    display_order: 0,
  });

  const [itemForm, setItemForm] = useState({
    name: '',
    details: '',
    ingredients: '',
    display_order: 0,
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/menu-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
        if (data.data && data.data.length > 0 && !selectedCategoryId) {
          setSelectedCategoryId(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch items for selected category
  const fetchItems = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/menu-items?category_id=${categoryId}`);
      const data = await response.json();
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchItems(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  // Category handlers
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await fetch(`/api/menu-categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryForm),
        });
      } else {
        await fetch('/api/menu-categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryForm),
        });
      }
      fetchCategories();
      resetCategoryForm();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Sigur vrei să ștergi această categorie? Toate produsele din ea vor fi șterse.')) return;
    try {
      await fetch(`/api/menu-categories/${id}`, { method: 'DELETE' });
      fetchCategories();
      if (selectedCategoryId === id) {
        setSelectedCategoryId('');
        setItems([]);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const startEditCategory = (category: MenuCategory) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      note: category.note || '',
      display_order: category.display_order,
    });
    setIsAddingCategory(true);
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setIsAddingCategory(false);
    setCategoryForm({ name: '', slug: '', note: '', display_order: 0 });
  };

  // Item handlers
  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const itemData = {
        ...itemForm,
        category_id: selectedCategoryId,
      };

      console.log('Submitting item:', itemData);

      if (editingItem) {
        const response = await fetch(`/api/menu-items/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        const result = await response.json();
        console.log('Update response:', result);
        if (!result.success) {
          alert('Eroare la actualizare: ' + (result.error || 'Eroare necunoscută'));
          return;
        }
      } else {
        const response = await fetch('/api/menu-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        const result = await response.json();
        console.log('Create response:', result);
        if (!result.success) {
          alert('Eroare la creare: ' + (result.error || 'Eroare necunoscută'));
          return;
        }
      }
      await fetchItems(selectedCategoryId);
      resetItemForm();
      alert('Produs salvat cu succes!');
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Eroare la salvare: ' + error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Sigur vrei să ștergi acest produs?')) return;
    try {
      await fetch(`/api/menu-items/${id}`, { method: 'DELETE' });
      fetchItems(selectedCategoryId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const startEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      details: item.details || '',
      ingredients: item.ingredients || '',
      display_order: item.display_order,
    });
    setIsAddingItem(true);
  };

  const resetItemForm = () => {
    setEditingItem(null);
    setIsAddingItem(false);
    setItemForm({ name: '', details: '', ingredients: '', display_order: 0 });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold">Gestionare Meniu</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Categorii</h2>
            <Button
              size="sm"
              onClick={() => setIsAddingCategory(!isAddingCategory)}
              className="bg-red-600 hover:bg-red-700"
            >
              {isAddingCategory ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>

          {isAddingCategory && (
            <form onSubmit={handleCategorySubmit} className="mb-4 p-4 border rounded-lg space-y-3">
              <div>
                <Label>Nume</Label>
                <Input
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Notă (opțional)</Label>
                <Input
                  value={categoryForm.note}
                  onChange={(e) => setCategoryForm({ ...categoryForm, note: e.target.value })}
                />
              </div>
              <div>
                <Label>Ordine</Label>
                <Input
                  type="number"
                  value={categoryForm.display_order}
                  onChange={(e) => setCategoryForm({ ...categoryForm, display_order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Salvează
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={resetCategoryForm}>
                  Anulează
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCategoryId === category.id
                    ? 'bg-red-50 border-2 border-red-600'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{category.name}</h3>
                    {category.note && (
                      <p className="text-xs text-gray-500 mt-1">{category.note}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditCategory(category);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Produse {selectedCategoryId && `- ${categories.find(c => c.id === selectedCategoryId)?.name}`}
            </h2>
            {selectedCategoryId && (
              <Button
                size="sm"
                onClick={() => setIsAddingItem(!isAddingItem)}
                className="bg-red-600 hover:bg-red-700"
              >
                {isAddingItem ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </Button>
            )}
          </div>

          {!selectedCategoryId && (
            <p className="text-gray-500 text-center py-8">Selectează o categorie pentru a vedea produsele</p>
          )}

          {selectedCategoryId && isAddingItem && (
            <form onSubmit={handleItemSubmit} className="mb-6 p-4 border rounded-lg space-y-3">
              <div>
                <Label>Nume Produs</Label>
                <Input
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Detalii (opțional)</Label>
                <Textarea
                  value={itemForm.details}
                  onChange={(e) => setItemForm({ ...itemForm, details: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>Ingrediente (opțional)</Label>
                <Textarea
                  value={itemForm.ingredients}
                  onChange={(e) => setItemForm({ ...itemForm, ingredients: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>Ordine</Label>
                <Input
                  type="number"
                  value={itemForm.display_order}
                  onChange={(e) => setItemForm({ ...itemForm, display_order: parseInt(e.target.value) })}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Salvează
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={resetItemForm}>
                  Anulează
                </Button>
              </div>
            </form>
          )}

          {selectedCategoryId && (
            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Niciun produs în această categorie</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.details && (
                          <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                        )}
                        {item.ingredients && (
                          <p className="text-xs text-gray-500 mt-1 italic">Ingrediente: {item.ingredients}</p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditItem(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
