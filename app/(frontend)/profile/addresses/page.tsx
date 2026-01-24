'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import Link from 'next/link';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

const mockAddresses = [
  {
    id: '1',
    name: 'Home',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Work',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Te rugăm să te autentifici pentru a-ți gestiona adresele</h2>
        <p className="text-gray-600 mb-8">Trebuie să fii autentificat pentru a vedea adresele tale</p>
        <Button asChild>
          <Link href="/auth/login">Autentificare</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Adresele Mele</h1>
          <p className="text-gray-600">Gestionează-ți adresele de livrare</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Adresă
        </Button>
      </div>
      
      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Adaugă Adresă Nouă</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressName">Nume Adresă</Label>
                  <Input id="addressName" placeholder="ex: Acasă, Serviciu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Adresă Stradă</Label>
                  <Input id="street" placeholder="Str. Exemplu nr. 123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Oraș</Label>
                  <Input id="city" placeholder="București" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Județ</Label>
                  <Input id="state" placeholder="București" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Cod Poștal</Label>
                  <Input id="zipCode" placeholder="010101" />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">Salvează Adresa</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAdding(false)}
                >
                  Anulează
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAddresses.map((address) => (
          <Card key={address.id} className={address.isDefault ? 'border-blue-500 border-2' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  {address.name}
                </CardTitle>
                {address.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Implicită
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-600">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="mr-1 h-4 w-4" />
                  Editează
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Trash2 className="mr-1 h-4 w-4" />
                  Șterge
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
