import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Verificăm dacă este în mediu de dezvoltare pentru a permite această operațiune temporară
    if (process.env.NODE_ENV !== 'development' && !process.env.ALLOW_ING_STATUS_TEST) {
      return Response.json({ error: 'Test endpoint not allowed in production' }, { status: 403 });
    }

    const body = await req.json();
    const { orderId } = body;

    // Verificăm dacă orderId este cel furnizat de ING
    if (!orderId) {
      return Response.json({ error: 'orderId is required' }, { status: 400 });
    }

    // Datele de autentificare ING - acestea ar trebui să fie configurate în variabilele de mediu
    const userName = process.env.ING_API_USERNAME || 'TEST_API';
    const password = process.env.ING_API_PASSWORD || 'q1w2e3r4Q!';
    
    // URL-ul ING pentru test (UAT) - în producție ar trebui să fie alt URL
    const url = 'https://securepay-uat.ing.ro/mpi_uat/rest/getOrderStatusExtended.do';

    // Construim datele pentru cerere
    const formData = new URLSearchParams({
      orderId: orderId,
      userName: userName,
      password: password
    });

    console.log('ING Order Status Test - Request Details:');
    console.log('URL:', url);
    console.log('Order ID:', orderId);
    console.log('Username:', userName);
    console.log('Request Body:', formData.toString());

    // Facem apelul către ING
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const responseBody = await response.text();
    
    console.log('ING Order Status Test - Response Status:', response.status);
    console.log('ING Order Status Test - Response Headers:', Object.fromEntries(response.headers.entries()));
    console.log('ING Order Status Test - Raw Response Body:', responseBody);

    // Logăm răspunsul pentru a fi vizibil în Render logs
    console.log(`Răspuns ING pentru comanda ${orderId}:`, {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody
    });

    // Returnăm răspunsul către client
    return Response.json({
      orderId: orderId,
      ingResponse: {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseBody
      },
      timestamp: new Date().toISOString(),
      message: `Răspuns primit de la ING pentru comanda ${orderId}. Verificați logurile pentru detalii.`
    });

  } catch (error) {
    console.error('Eroare în testul de verificare a statusului comenzii ING:', error);
    
    return Response.json({ 
      error: 'A apărut o eroare la verificarea statusului comenzii',
      errorMessage: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}