import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { mdOrder } = await request.json();

    if (!mdOrder) {
      return NextResponse.json(
        { success: false, error: 'mdOrder is required' },
        { status: 400 }
      );
    }

    // Credențiale ING WebPay
    const username = process.env.ING_WEBPAY_USER || 'TEST_API';
    const password = process.env.ING_WEBPAY_PASSWORD || 'q1w2e3r4Q!';
    const endpoint = process.env.ING_WEBPAY_ENDPOINT || 'https://securepay-uat.ing.ro/mpi_uat/rest';

    // Apelează endpoint-ul getOrderStatusExtended.do
    const url = `${endpoint}/getOrderStatusExtended.do`;
    const params = new URLSearchParams({
      userName: username,
      password: password,
      orderId: mdOrder,
      language: 'ro',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Verifică statusul plății
    // orderStatus: 0 = Înregistrată, dar nu autorizată
    // orderStatus: 1 = Pre-autorizată
    // orderStatus: 2 = Plată completă (success)
    // orderStatus: 3 = Autorizare anulată
    // orderStatus: 4 = Rambursare
    // orderStatus: 5 = Inițiere autorizare ACS
    // orderStatus: 6 = Autorizare refuzată

    const isPaid = data.orderStatus === 2;
    const isFailed = [3, 6].includes(data.orderStatus);

    return NextResponse.json({
      success: true,
      isPaid,
      isFailed,
      status: data.orderStatus,
      amount: data.amount,
      currency: data.currency,
      orderNumber: data.orderNumber,
      pan: data.pan,
      cardholderName: data.cardholderName,
      depositedDate: data.depositedDate,
      rawResponse: data,
    });
  } catch (error: any) {
    console.error('ING check status error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to check payment status',
      },
      { status: 500 }
    );
  }
}
