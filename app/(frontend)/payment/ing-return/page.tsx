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
      // Preia parametrii din URL
      // - orderId = ID-ul nostru din orders table (trimis de noi în returnUrl)
      // - orderNumber = numărul comenzii (trimis de noi în returnUrl)
      // - ING adaugă automat parametrul 'orderId' (mdOrder) în returnUrl după plată
      // Problema: ambele folosesc același nume 'orderId', trebuie să verificăm toate parametriile
      
      const allParams = Object.fromEntries(searchParams.entries());
      console.log('=== ING RETURN PAGE ===');
      console.log('URL Parameters received:', allParams);

      const ourOrderId = searchParams.get('orderId');
      const orderNumber = searchParams.get('orderNumber');
      
      // ING poate trimite mdOrder ca parametru separat sau poate suprascrie orderId
      // Trebuie să vedem ce primim exact în practice
      let mdOrder = searchParams.get('mdOrder') || searchParams.get('orderID');

      // Dacă nu avem mdOrder separat, înseamnă că ING a suprascris orderId
      // În acest caz, trebuie să folosim orderNumber pentru a identifica comanda noastră
      if (!mdOrder && ourOrderId && orderNumber) {
        console.log('ING a suprascris orderId, folosim ca mdOrder:', ourOrderId);
        mdOrder = ourOrderId;
      }

      console.log(`Extracted: ourOrderId=${ourOrderId}, orderNumber=${orderNumber}, mdOrder=${mdOrder}`);

      if (!mdOrder) {
        // Dacă nu există mdOrder de la ING, redirecționează către pagina de eșec
        console.error('❌ MISSING mdOrder from ING redirect!');
        router.replace(`/payment/fail?orderId=${ourOrderId || ''}&error=Missing ING orderId`);
        return;
      }

      try {
        // Apelează imediat getOrderStatusExtended conform doc ING (3.7.3)
        console.log('🔍 Calling /api/ing/check-status with mdOrder:', mdOrder);
        const response = await fetch('/api/ing/check-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mdOrder }),
        });

        const result = await response.json();
        console.log('📊 ING Status Check Result:', result);

        // Găsește orderId-ul nostru din baza de date folosind orderNumber
        let finalOrderId = ourOrderId;
        if (!finalOrderId && orderNumber) {
          console.log('🔍 Fetching order by number:', orderNumber);
          // Query database pentru a găsi orderId după orderNumber
          const orderResponse = await fetch(`/api/orders/by-number/${orderNumber}`);
          if (orderResponse.ok) {
            const orderData = await orderResponse.json();
            finalOrderId = orderData.data?.id;
            console.log('✅ Found order ID:', finalOrderId);
          } else {
            console.warn('⚠️ Could not find order by number');
          }
        }

        // Construiește URL pentru redirect bazat pe rezultatul verificării
        if (result.success && result.isPaid) {
          // Plată reușită (OrderStatus = 2 - Deposited)
          console.log('✅ PAYMENT SUCCESS - Redirecting to success page');
          const successUrl = new URLSearchParams({
            mdOrder,
            ...(finalOrderId && { orderId: finalOrderId }),
            ...(orderNumber && { orderNumber }),
            status: 'success',
          });
          router.replace(`/payment/success?${successUrl.toString()}`);
        } else {
          // Plată eșuată sau în așteptare
          console.log('❌ PAYMENT FAILED - Redirecting to fail page');
          console.log('Fail reason:', result.error || 'No error message');
          const failUrl = new URLSearchParams({
            ...(finalOrderId && { orderId: finalOrderId }),
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
