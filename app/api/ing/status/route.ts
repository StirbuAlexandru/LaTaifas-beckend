import { NextRequest, NextResponse } from 'next/server';
import { getINGOrderStatus, isPaymentSuccessful } from '@/lib/ingWebPay';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ingOrderId = searchParams.get('ingOrderId');

    if (!ingOrderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing ingOrderId parameter',
        },
        { status: 400 }
      );
    }

    // Verifică statusul plății la ING
    const status = await getINGOrderStatus(ingOrderId);

    return NextResponse.json({
      success: true,
      status,
      isSuccessful: isPaymentSuccessful(status),
      orderNumber: status.OrderNumber,
      amount: status.Amount,
      errorMessage: status.ErrorMessage,
    });
  } catch (error: any) {
    console.error('ING WebPay status check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to check payment status',
      },
      { status: 500 }
    );
  }
}
