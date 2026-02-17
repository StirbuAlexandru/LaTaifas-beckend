import { NextRequest, NextResponse } from 'next/server';
import { initiateINGPayment, generateOrderNumber } from '@/lib/ingWebPay';

export async function POST(request: NextRequest) {
  try {
    // Verifică dacă credențialele ING sunt configurate
    if (!process.env.ING_WEBPAY_USER || !process.env.ING_WEBPAY_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: 'ING WebPay nu este configurat. Adaugă ING_WEBPAY_USER și ING_WEBPAY_PASSWORD în .env.local',
        },
        { status: 503 }
      );
    }

    const { amount, orderId, customerName, customerEmail } = await request.json();

    // Generează orderNumber unic pentru ING
    const orderNumber = generateOrderNumber();

    // URL-uri de return pentru succes și eșec
    // ING va adăuga automat parametrul mdOrder la returnUrl
    // Format: returnUrl&mdOrder=xxx sau returnUrl?mdOrder=xxx
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const returnUrl = `${baseUrl}/payment/ing-return?orderId=${orderId}&orderNumber=${orderNumber}`;
    const failUrl = `${baseUrl}/payment/fail?orderId=${orderId}`;

    // Inițiază plata ING WebPay
    const result = await initiateINGPayment({
      amount: Math.round(amount * 100), // Convertește în bani (100 = 1 RON)
      orderNumber,
      returnUrl,
      failUrl,
      description: `Comanda #${orderId}`,
      clientId: customerEmail || customerName,
    });

    if (result.errorCode && result.errorCode !== '0') {
      return NextResponse.json(
        {
          success: false,
          error: result.errorMessage || 'Eroare la inițializarea plății',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      formUrl: result.formUrl,
      ingOrderId: result.orderId,
      orderNumber,
    });
  } catch (error: any) {
    console.error('ING WebPay initiate error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to initiate payment',
      },
      { status: 500 }
    );
  }
}
