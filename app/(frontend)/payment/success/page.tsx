'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [errorMessage, setErrorMessage] = useState('');

  const orderId = searchParams.get('orderId');
  const orderNumber = searchParams.get('orderNumber');
  const ingOrderId = searchParams.get('orderId'); // ING trimite orderId în URL

  useEffect(() => {
    if (!ingOrderId) {
      setIsVerifying(false);
      setPaymentStatus('failed');
      setErrorMessage('Lipsesc parametrii de plată');
      return;
    }

    // Verifică statusul plății
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/ing/status?ingOrderId=${ingOrderId}`);
        const result = await response.json();

        if (result.success && result.isSuccessful) {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('failed');
          setErrorMessage(result.errorMessage || 'Plata nu a fost procesată cu succes');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('failed');
        setErrorMessage('Eroare la verificarea plății');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [ingOrderId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto border-2 border-gray-200 shadow-lg">
            <CardContent className="pt-8 pb-8 text-center">
              <Loader2 className="h-16 w-16 animate-spin text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verificăm plata...</h2>
              <p className="text-gray-600">Vă rugăm așteptați câteva momente</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="flex items-center justify-center text-center">
                <CheckCircle className="h-8 w-8 mr-3" />
                Plată Reușită!
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6 text-center">
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-900 mb-2">
                  Plata a fost procesată cu succes!
                </p>
                {orderNumber && (
                  <p className="text-sm text-gray-600">
                    Număr comandă: <span className="font-bold">{orderNumber}</span>
                  </p>
                )}
              </div>
              <p className="text-gray-700 mb-6">
                Vă mulțumim pentru comandă! Veți fi contactat în curând pentru confirmare.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  <Link href="/orders">Vezi Comenzile Mele</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/">Înapoi Acasă</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-red-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardTitle className="flex items-center justify-center text-center">
              <XCircle className="h-8 w-8 mr-3" />
              Plată Eșuată
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-6 text-center">
            <div className="bg-red-50 rounded-xl p-6 mb-6">
              <p className="text-lg text-gray-900 mb-2">
                Plata nu a putut fi procesată
              </p>
              {errorMessage && (
                <p className="text-sm text-gray-600 mt-2">{errorMessage}</p>
              )}
            </div>
            <p className="text-gray-700 mb-6">
              Vă rugăm să încercați din nou sau alegeți o altă metodă de plată.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                <Link href="/checkout">Încearcă Din Nou</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Înapoi Acasă</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
