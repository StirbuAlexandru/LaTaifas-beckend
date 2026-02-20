'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, User, MapPin, CreditCard, Calendar, Loader2 } from 'lucide-react';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  delivery_address?: string;
  delivery_city?: string;
  delivery_postal_code?: string;
  total_amount: number;
  status: string;
  payment_method?: string;
  payment_status?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    pending: { label: 'În așteptare', className: 'bg-yellow-100 text-yellow-800' },
    processing: { label: 'În procesare', className: 'bg-blue-100 text-blue-800' },
    completed: { label: 'Completată', className: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Anulată', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
      } else {
        setError('Comanda nu a fost găsită');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Eroare la încărcarea comenzii');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white dark:bg-gray-800 min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Comandă negăsită</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error || 'Această comandă nu există sau a fost ștearsă.'}
          </p>
          <Button onClick={() => router.push('/dashboard/orders')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la Comenzi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              onClick={() => router.push('/dashboard/orders')}
              variant="outline"
              size="sm"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Comenzi
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Comandă #{order.order_number}
            </h1>
          </div>
          {getStatusBadge(order.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produse comandate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.product_name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cantitate: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {(item.price * item.quantity).toFixed(2)} lei
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">Nu există produse în comandă</p>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-red-600">{order.total_amount.toFixed(2)} lei</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informații client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nume</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.customer_email}</p>
                </div>
                {order.customer_phone && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Telefon</p>
                    <p className="font-medium text-gray-900 dark:text-white">{order.customer_phone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Delivery Address */}
            {order.delivery_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adresă livrare
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-900 dark:text-white">{order.delivery_address}</p>
                  {order.delivery_city && (
                    <p className="text-gray-600 dark:text-gray-400">{order.delivery_city}</p>
                  )}
                  {order.delivery_postal_code && (
                    <p className="text-gray-600 dark:text-gray-400">{order.delivery_postal_code}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Plată
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.payment_method && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Metodă de plată</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{order.payment_method}</p>
                  </div>
                )}
                {order.payment_status && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status plată</p>
                    <Badge className={
                      order.payment_status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }>
                      {order.payment_status === 'paid' ? 'Plătită' : 'Nepl ătită'}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Cronologie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data comenzii</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(order.created_at).toLocaleString('ro-RO')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ultima actualizare</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(order.updated_at).toLocaleString('ro-RO')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
