'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, CreditCard, User, Loader2, ShoppingBag, Check } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import StripePaymentForm from '@/components/frontend/checkout/StripePaymentForm';
import { getApiUrl } from '@/lib/api';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    deliveryNotes: '',
    paymentMethod: 'cash',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      alert('Coșul este gol!');
      return;
    }

    // If card payment, create payment intent first
    if (formData.paymentMethod === 'card') {
      setIsSubmitting(true);
      
      try {
        // Create order first
        const orderData = {
          customer_name: formData.fullName,
          customer_email: formData.email || null,
          customer_phone: formData.phone,
          customer_address: formData.address,
          delivery_notes: formData.deliveryNotes || null,
          payment_method: formData.paymentMethod,
          items: cart.items.map(item => ({
            id: item.productId,
            name: item.product.name,
            price: item.price,
            quantity: item.quantity,
          })),
        };

        const orderResponse = await fetch(getApiUrl('api/orders'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const orderResult = await orderResponse.json();

        if (!orderResult.success) {
          throw new Error(orderResult.error || 'Eroare la plasarea comenzii');
        }

        // Create payment intent
        const paymentResponse = await fetch(getApiUrl('api/create-payment-intent'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: cart.total,
            orderId: orderResult.data.id,
          }),
        });

        const paymentResult = await paymentResponse.json();

        if (paymentResult.success && paymentResult.clientSecret) {
          setClientSecret(paymentResult.clientSecret);
          setShowStripeForm(true);
        } else {
          throw new Error('Eroare la inițializarea plății');
        }
      } catch (error: any) {
        console.error('Eroare:', error);
        alert('❌ A apărut o eroare. Vă rugăm să încercați din nou.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Cash payment - original flow
    setIsSubmitting(true);
    
    try {
      const orderData = {
        customer_name: formData.fullName,
        customer_email: formData.email || null,
        customer_phone: formData.phone,
        customer_address: formData.address,
        delivery_notes: formData.deliveryNotes || null,
        payment_method: formData.paymentMethod,
        items: cart.items.map(item => ({
          id: item.productId,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(getApiUrl('api/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      console.log('Order API Response:', result);
      console.log('Response status:', response.status);

      if (result.success) {
        clearCart();
        alert(`✅ Comanda ${result.data.order_number} a fost plasată cu succes! Vă vom contacta în curând.`);
        router.push('/');
      } else {
        console.error('Order creation failed:', result.error);
        throw new Error(result.error || 'Eroare la plasarea comenzii');
      }
    } catch (error: any) {
      console.error('Eroare la plasarea comenzii:', error);
      console.error('Error details:', error.message, error.stack);
      alert('❌ A apărut o eroare la plasarea comenzii. Vă rugăm să încercați din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    alert('✅ Plata a fost procesată cu succes! Comanda ta a fost plasată.');
    router.push('/orders');
  };

  const handlePaymentError = (error: string) => {
    alert(`❌ ${error}`);
    setShowStripeForm(false);
    setClientSecret('');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8">
            <div className="bg-gradient-to-br from-red-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coșul tău este gol</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Adaugă câteva produse delicioase în coș înainte de finalizare</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Link href="/comanda-online">Răsfoiește Produsele</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 md:pt-24 pb-4 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-4 md:mb-6 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-xl border-2 border-transparent hover:border-red-200">
          <Link href="/cart" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Coș
          </Link>
        </Button>
        
        {/* Page Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Finalizează Comanda</h1>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mt-2 md:mt-3"></div>
        </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Formular - Al doilea pe mobile, primul pe desktop */}
        <div className="lg:col-span-2 order-last lg:order-first">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informații Client */}
            <Card className="border-2 border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-50 to-white border-b-2 border-gray-100">
                <CardTitle className="flex items-center text-gray-900">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  Informații Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nume Complet *</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange}
                      required
                      minLength={4}
                      title="Numele trebuie să aibă minim 4 litere"
                      placeholder="Ion Popescu"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (opțional)</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      placeholder="ion@exemplu.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      required
                      pattern="0[0-9]{9}"
                      title="Numărul de telefon trebuie să înceapă cu 0 și să aibă 10 cifre (ex: 0753077063)"
                      placeholder="0753077063"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Adresă Livrare */}
            <Card className="border-2 border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b-2 border-gray-100">
                <CardTitle className="flex items-center text-gray-900">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-xl mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Adresă Livrare
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor="address">Adresă Livrare *</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange}
                    required
                    minLength={4}
                    title="Adresa trebuie să aibă minim 4 caractere"
                    placeholder="Str. Exemplu, Nr. 123, Ap. 4"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryNotes">Observații livrare (opțional)</Label>
                  <Textarea 
                    id="deliveryNotes" 
                    name="deliveryNotes" 
                    value={formData.deliveryNotes} 
                    onChange={handleInputChange}
                    placeholder="Ex: Sunați la interfon, etaj 2"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Metodă Plată */}
            <Card className="border-2 border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b-2 border-gray-100">
                <CardTitle className="flex items-center text-gray-900">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl mr-3">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  Metodă Plată
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-red-50 hover:border-red-300 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-red-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Numerar (Ramburs)</p>
                        {formData.paymentMethod === 'cash' && (
                          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Plătești la livrare</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-green-50 hover:border-green-300 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">Card Bancar</p>
                        {formData.paymentMethod === 'card' && (
                          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Plată securizată prin Stripe</p>
                      {/* Card Logos */}
                      <div className="flex items-center gap-2 mt-2">
                        <Image 
                          src="/images/R.jpg" 
                          alt="Mastercard" 
                          width={40} 
                          height={25}
                          className="object-contain"
                        />
                        <Image 
                          src="/images/Visa-Symbol.png" 
                          alt="Visa" 
                          width={40} 
                          height={25}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
            
            {!showStripeForm && (
              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Se procesează...
                    </>
                  ) : formData.paymentMethod === 'card' ? (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Continuă la Plată
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Plasează Comanda
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>

          {/* Stripe Payment Form */}
          {showStripeForm && clientSecret && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Plată Card Bancar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Elements
                  stripe={getStripe()}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                    },
                  }}
                >
                  <StripePaymentForm
                    amount={cart.total}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Rezumat Comandă - Prima pe mobile, ultima pe desktop */}
        <div className="relative order-first lg:order-last">
          <Card className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Rezumat Comandă
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                      {/* Discount badge */}
                      {item.product.discountActive && item.product.discountValue && item.product.discountValue > 0 && (
                        <div className="inline-block bg-red-100 text-red-800 text-xs font-medium px-1.5 py-0.5 rounded mt-1">
                          Reducere {Math.round(((item.product.price - item.price) / item.product.price) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p>{(item.price * item.quantity).toFixed(2)} lei</p>
                      {item.product.discountActive && item.product.discountValue && item.product.discountValue > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          {(
                            (item.product.price) * 
                            item.quantity
                          ).toFixed(2)} lei
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                <Separator className="bg-red-200" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">{cart.total.toFixed(2)} lei</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informații Societate - Sub rezumat pe desktop */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-md rounded-2xl overflow-hidden mt-6 hidden lg:block">
            <CardHeader className="bg-white border-b-2 border-red-200">
              <CardTitle className="text-red-600 flex items-center">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl mr-2">
                  <Check className="h-4 w-4 text-white" />
                </div>
                Informații Societate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm pt-6">
              <p className="font-semibold text-base text-red-700">VINUM NOBILIS SRL</p>
              <p><span className="font-semibold">Sediu Central:</span> Municipiul Suceava, Strada Ion Niculce, nr.5, Bloc 47, Scara B, Ap 11, Județ Suceava</p>
              <p><span className="font-semibold">CUI:</span> 45346331</p>
              <p><span className="font-semibold">Reg. Com.:</span> J33/2276/13.12.2021</p>
              <p><span className="font-semibold">Activitate Principală:</span> 4634 - Comerț cu ridicata al băuturilor</p>
              <p><span className="font-semibold">Telefon:</span> 0753 077 063</p>
              <p><span className="font-semibold">Email:</span> lataifas23@gmail.com</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Informații Societate - La final pe mobile */}
        <div className="order-last lg:hidden">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-md rounded-2xl overflow-hidden">
            <CardHeader className="bg-white border-b-2 border-red-200">
              <CardTitle className="text-red-600 flex items-center">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl mr-2">
                  <Check className="h-4 w-4 text-white" />
                </div>
                Informații Societate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm pt-6">
              <p className="font-semibold text-base text-red-700">VINUM NOBILIS SRL</p>
              <p><span className="font-semibold">Sediu Central:</span> Municipiul Suceava, Strada Ion Niculce, nr.5, Bloc 47, Scara B, Ap 11, Județ Suceava</p>
              <p><span className="font-semibold">CUI:</span> 45346331</p>
              <p><span className="font-semibold">Reg. Com.:</span> J33/2276/13.12.2021</p>
              <p><span className="font-semibold">Activitate Principală:</span> 4634 - Comerț cu ridicata al băuturilor</p>
              <p><span className="font-semibold">Telefon:</span> 0753 077 063</p>
              <p><span className="font-semibold">Email:</span> lataifas23@gmail.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}
