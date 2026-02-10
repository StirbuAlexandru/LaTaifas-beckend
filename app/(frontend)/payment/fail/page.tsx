'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-2 border-red-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardTitle className="flex items-center justify-center text-center">
              <XCircle className="h-8 w-8 mr-3" />
              Plată Anulată
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-6 text-center">
            <div className="bg-red-50 rounded-xl p-6 mb-6">
              <p className="text-lg text-gray-900 mb-2">
                Ați anulat plata
              </p>
              <p className="text-sm text-gray-600">
                Comanda nu a fost finalizată
              </p>
            </div>
            <p className="text-gray-700 mb-6">
              Dacă aveți întrebări sau doriți să continuați, vă rugăm să încercați din nou.
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
