'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface DeliveryZone {
  id: string;
  zone_name: string;
  min_order_value: number;
  created_at?: string;
}

export default function DeliveryZonesPage() {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    zone_name: '',
    min_order_value: '',
  });

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const response = await fetch('/api/delivery-zones');
      const data = await response.json();
      if (data.success) {
        setZones(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching zones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.zone_name || !formData.min_order_value) {
      alert('Te rog completează toate câmpurile!');
      return;
    }

    try {
      if (editingZone) {
        // Update existing zone
        const response = await fetch(`/api/delivery-zones/${editingZone.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          await fetchZones();
          resetForm();
        } else {
          alert('Eroare la actualizare: ' + data.error);
        }
      } else {
        // Create new zone
        const response = await fetch('/api/delivery-zones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          await fetchZones();
          resetForm();
        } else {
          alert('Eroare la creare: ' + data.error);
        }
      }
    } catch (error) {
      console.error('Error saving zone:', error);
      alert('Eroare la salvare!');
    }
  };

  const handleEdit = (zone: DeliveryZone) => {
    setEditingZone(zone);
    setFormData({
      zone_name: zone.zone_name,
      min_order_value: zone.min_order_value.toString(),
    });
    setIsAddingNew(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi această zonă?')) return;

    try {
      const response = await fetch(`/api/delivery-zones/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        await fetchZones();
      } else {
        alert('Eroare la ștergere: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting zone:', error);
      alert('Eroare la ștergere!');
    }
  };

  const resetForm = () => {
    setFormData({ zone_name: '', min_order_value: '' });
    setEditingZone(null);
    setIsAddingNew(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Zone de Livrare</h1>
        {!isAddingNew && (
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adaugă Zonă Nouă
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAddingNew && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{editingZone ? 'Editează Zona' : 'Adaugă Zonă Nouă'}</span>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="zone_name">Nume Zonă</Label>
                <Input
                  id="zone_name"
                  value={formData.zone_name}
                  onChange={(e) =>
                    setFormData({ ...formData, zone_name: e.target.value })
                  }
                  placeholder="Ex: Burdujeni, Burdujeni Sat"
                  required
                />
              </div>

              <div>
                <Label htmlFor="min_order_value">Valoare Minimă Comandă (lei)</Label>
                <Input
                  id="min_order_value"
                  type="number"
                  value={formData.min_order_value}
                  onChange={(e) =>
                    setFormData({ ...formData, min_order_value: e.target.value })
                  }
                  placeholder="Ex: 50"
                  required
                  min="0"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingZone ? 'Actualizează' : 'Adaugă'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Anulează
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Zones List */}
      <Card>
        <CardHeader>
          <CardTitle>Zone de Livrare Existente</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Se încarcă...</p>
          ) : zones.length === 0 ? (
            <p className="text-gray-500">Nu există zone de livrare. Adaugă prima zonă!</p>
          ) : (
            <div className="space-y-2">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">{zone.zone_name}</p>
                    <p className="text-sm text-gray-600">
                      Minim comandă: <span className="font-bold text-red-600">{zone.min_order_value} lei</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(zone)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(zone.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
