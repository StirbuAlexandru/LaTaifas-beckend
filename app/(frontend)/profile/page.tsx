'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import Link from 'next/link';
import { User, MapPin, CreditCard, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ ...user, name, email });
      setIsEditing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Te rugăm să te autentifici pentru a-ți vizualiza profilul</h2>
        <p className="text-gray-600 mb-8">Trebuie să fii autentificat pentru a vedea informațiile profilului tău</p>
        <Button asChild>
          <Link href="/auth/login">Autentificare</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profilul Meu</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informații Personale
              </CardTitle>
              <CardDescription>
                Gestionează-ți informațiile personale și setările contului
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nume Complet</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">Salvează Modificările</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setName(user?.name || '');
                        setEmail(user?.email || '');
                        setIsEditing(false);
                      }}
                    >
                      Anulează
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nume Complet</Label>
                    <p className="text-lg">{user?.name}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                  
                  <Button onClick={() => setIsEditing(true)}>
                    Editează Profilul
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setări Cont</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/profile/addresses" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Adrese
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/profile/settings" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Securitate
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gestionare Comenzi</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/orders" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Comenzile Mele
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
