'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function OrdersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    alert('Mesajul tău a fost trimis! Te vom contacta în cel mai scurt timp.');
    setFormData({ name: '', email: '', phone: '', orderNumber: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Urmărește Comanda</h1>
      
      {/* Contact Information Section */}
      <Card className="border-2 border-red-100">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-2xl text-red-600 flex items-center">
            <MessageSquare className="mr-3 h-6 w-6" />
            Ai întrebări despre comanda ta?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black mb-4">Contactează-ne direct:</h3>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Telefon</p>
                  <a href="tel:0753077063" className="font-semibold text-black hover:text-red-600">
                    0753 077 063
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href="mailto:lataifas23@gmail.com" className="font-semibold text-black hover:text-red-600">
                    lataifas23@gmail.com
                  </a>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Program:</strong> Luni - Duminică: 9:30 - 21:30
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Răspundem la toate întrebările despre comenzi în timpul programului de lucru.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Trimite-ne un mesaj:</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nume complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="ion@exemplu.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="0753077063"
                  />
                </div>
                <div>
                  <Label htmlFor="orderNumber">Număr comandă (opțional)</Label>
                  <Input
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                    placeholder="ORD-001"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mesajul tău</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Descrie întrebarea ta despre comandă..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Trimite mesajul
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}