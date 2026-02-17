// ING WebPay Configuration and Helper Functions

export const ING_CONFIG = {
  endpoints: {
    // Folosește endpoint-urile din .env.local (UAT pentru test, producție pentru live)
    base: process.env.ING_WEBPAY_ENDPOINT || 'https://securepay-uat.ing.ro/mpi_uat/rest',
  },
  currency: '946', // RON
};

// Construiește URL-urile dinamice bazate pe endpoint-ul de bază
const getEndpoint = (action: string) => `${ING_CONFIG.endpoints.base}/${action}`;


export interface INGInitiateParams {
  amount: number; // în bani (100 = 1 RON)
  orderNumber: string;
  returnUrl: string;
  failUrl: string;
  description?: string;
  clientId?: string;
  jsonParams?: string;
}

export interface INGInitiateResponse {
  orderId?: string;
  formUrl?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface INGOrderStatus {
  OrderStatus?: number; // 0=registered, 1=hold, 2=deposited, 3=reversed, 4=refunded, 5=ACS auth started, 6=declined
  ErrorCode?: string;
  ErrorMessage?: string;
  OrderNumber?: string;
  Pan?: string;
  expiration?: string;
  cardholderName?: string;
  Amount?: number;
  currency?: string;
  approvalCode?: string;
  authCode?: number;
  depositAmount?: number;
  Ip?: string;
}

/**
 * Inițiază o tranzacție ING WebPay
 */
export async function initiateINGPayment(params: INGInitiateParams): Promise<INGInitiateResponse> {
  const payload = new URLSearchParams({
    userName: process.env.ING_WEBPAY_USER!,
    password: process.env.ING_WEBPAY_PASSWORD!,
    amount: String(params.amount),
    currency: ING_CONFIG.currency,
    orderNumber: params.orderNumber,
    returnUrl: params.returnUrl,
    failUrl: params.failUrl,
    ...(params.description && { description: params.description }),
    ...(params.clientId && { clientId: params.clientId }),
    ...(params.jsonParams && { jsonParams: params.jsonParams }),
  });

  try {
    const response = await fetch(getEndpoint('register.do'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const data: INGInitiateResponse = await response.json();
    return data;
  } catch (error) {
    console.error('ING WebPay initiate error:', error);
    throw new Error('Failed to initiate ING payment');
  }
}

/**
 * Verifică statusul unei tranzacții
 */
export async function getINGOrderStatus(orderId: string): Promise<INGOrderStatus> {
  const payload = new URLSearchParams({
    userName: process.env.ING_WEBPAY_USER!,
    password: process.env.ING_WEBPAY_PASSWORD!,
    orderId: orderId,
  });

  try {
    const response = await fetch(getEndpoint('getOrderStatus.do'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const data: INGOrderStatus = await response.json();
    return data;
  } catch (error) {
    console.error('ING WebPay status check error:', error);
    throw new Error('Failed to check ING payment status');
  }
}

/**
 * Verifică dacă plata este reușită
 */
export function isPaymentSuccessful(status: INGOrderStatus): boolean {
  // OrderStatus = 2 înseamnă "deposited" (plată reușită)
  return status.OrderStatus === 2 && status.ErrorCode === '0';
}

/**
 * Generează un orderNumber unic
 */
export function generateOrderNumber(): string {
  // Format: timestamp + random 4 digits
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${timestamp}${random}`;
}
