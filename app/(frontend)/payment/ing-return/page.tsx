'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

/**
 * Pagină intermediară pentru redirectarea de la ING WebPay
 * ING adaugă parametrul mdOrder la URL după procesarea plății
 * Această pagină preia mdOrder și redirecționează către /payment/success pentru verificare
 */
function INGReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyAndRedirect = async () => {
      console.log('=== ING RETURN PAGE ===');
      
      const allParams = Object.fromEntries(searchParams.entries());
      console.log('URL Parameters received:', allParams);

      const ourOrderId = searchParams.get('orderId');
      const orderNumber = searchParams.get('orderNumber');

      if (!ourOrderId) {
        console.error('❌ MISSING orderId parameter!');
        router.replace(`/payment/fail?error=Missing order ID`);
        return;
      }

      try {
        // Fetch order from database to get ing_order_id (mdOrder)
        console.log('🔍 Fetching order from database:', ourOrderId);
        const orderResponse = await fetch(`/api/orders/${ourOrderId}`);
        
        if (!orderResponse.ok) {
          throw new Error('Order not found');
        }

        const orderData = await orderResponse.json();
        const mdOrder = orderData.data?.ing_order_id;

        console.log(`Order data: ing_order_id=${mdOrder}`);

        if (!mdOrder) {
          console.error('❌ MISSING ing_order_id in database!');
          router.replace(`/payment/fail?orderId=${ourOrderId}&error=Missing ING order ID`);
          return;
        }

        // Apelează getOrderStatusExtended conform doc ING (3.7.3)
        console.log('🔍 Calling /api/ing/check-status with mdOrder:', mdOrder);
        const response = await fetch('/api/ing/check-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mdOrder }),
        });

        const result = await response.json();
        console.log('📊 ING Status Check Result:', result);

        // Construiește URL pentru redirect bazat pe rezultatul verificării
        if (result.success && result.isPaid) {
          // Plată reușită (OrderStatus = 2 - Deposited)
          console.log('✅ PAYMENT SUCCESS - Redirecting to success page');
          const successUrl = new URLSearchParams({
            mdOrder,
            orderId: ourOrderId,
            ...(orderNumber && { orderNumber }),
            status: 'success',
          });
          router.replace(`/payment/success?${successUrl.toString()}`);
        } else {
          // Plată eșuată sau în așteptare
          console.log('❌ PAYMENT FAILED - Redirecting to fail page');
          console.log('Fail reason:', result.error || 'No error message');
          const failUrl = new URLSearchParams({
            orderId: ourOrderId,
            error: result.error || 'Plata nu a fost procesată cu succes',
          });
          router.replace(`/payment/fail?${failUrl.toString()}`);
        }
      } catch (error) {
        console.error('💥 EXCEPTION in payment verification:', error);
        router.replace(`/payment/fail?orderId=${ourOrderId || ''}&error=Eroare la verificarea plății`);
      }
    };

    verifyAndRedirect();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-gray-200 shadow-lg">
          <CardContent className="pt-8 pb-8 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Procesăm plata...</h2>
            <p className="text-gray-600">Vă rugăm așteptați</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function INGReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto border-2 border-gray-200 shadow-lg">
            <CardContent className="pt-8 pb-8 text-center">
              <Loader2 className="h-16 w-16 animate-spin text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Se încarcă...</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <INGReturnContent />
    </Suspense>
  );
}
