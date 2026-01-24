'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function StripePaymentForm({
  amount,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders`,
        },
      });

      if (error) {
        onError(error.message || 'A apărut o eroare la procesarea plății');
      } else {
        onSuccess();
      }
    } catch (err: any) {
      onError('A apărut o eroare la procesarea plății');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          <p className="text-sm text-gray-600">Total de plată</p>
          <p className="text-2xl font-bold">{amount.toFixed(2)} lei</p>
        </div>
        
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se procesează...
            </>
          ) : (
            `Plătește ${amount.toFixed(2)} lei`
          )}
        </Button>
      </div>
    </form>
  );
}
