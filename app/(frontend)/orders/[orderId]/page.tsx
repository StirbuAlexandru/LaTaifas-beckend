'use client';

import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import Link from 'next/link';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Separator } from '../../../../components/ui/separator';
import { ArrowLeft, MapPin, Clock, CheckCircle, User } from 'lucide-react';

const mockOrder = {
  id: 'ORD-001',
  date: '2023-06-15',
  status: 'delivered',
  total: 42.99,
  subtotal: 38.99,
  deliveryFee: 5.00,
  tax: 3.00,
  items: [
    {
      id: '1',
      name: 'Margherita Pizza',
      quantity: 1,
      price: 12.99,
      options: ['Extra cheese'],
    },
    {
      id: '2',
      name: 'Cheese Burger',
      quantity: 2,
      price: 9.99,
      options: [],
    },
    {
      id: '3',
      name: 'Caesar Salad',
      quantity: 1,
      price: 8.99,
      options: ['Extra dressing'],
    },
  ],
  deliveryAddress: {
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    zipCode: '10001',
    phone: '+1 234 567 890',
  },
};

const statusConfig = {
  processing: { label: 'Procesare', color: 'bg-yellow-500' },
  delivered: { label: 'Livrat', color: 'bg-green-500' },
  cancelled: { label: 'Anulat', color: 'bg-red-500' },
};

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const { isAuthenticated } = useAuth();
  const status = statusConfig[mockOrder.status as keyof typeof statusConfig];

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Te rugăm să te autentifici pentru a vedea detaliile comenzii</h2>
        <p className="text-gray-600 mb-8">Trebuie să fii autentificat pentru a vedea detaliile comenzii tale</p>
        <Button asChild>
          <Link href="/auth/login">Autentificare</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/orders" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la Comenzi
        </Link>
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Comanda {mockOrder.id}</h1>
          <p className="text-gray-600">Plasată pe {mockOrder.date}</p>
        </div>
        <div className="flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full ${status.color} mr-2`}></span>
          <span className="font-medium">{status.label}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Articole Comandă */}
          <Card>
            <CardHeader>
              <CardTitle>Articole</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.options.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {item.options.join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Adresă Livrare */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Adresă Livrare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{mockOrder.deliveryAddress.name}</p>
                <p>{mockOrder.deliveryAddress.street}</p>
                <p>{mockOrder.deliveryAddress.city}, {mockOrder.deliveryAddress.zipCode}</p>
                <p>{mockOrder.deliveryAddress.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Rezumat Comandă */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Rezumat Comandă</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxă Livrare</span>
                  <span>${mockOrder.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxă</span>
                  <span>${mockOrder.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${mockOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6" asChild>
                <Link href="/menu">Comandă Din Nou</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}