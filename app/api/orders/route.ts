import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';
import { sendOrderStatusEmail, sendRestaurantNotification } from '../../../lib/emailService';
import { getClientIP } from '../../../lib/ipUtils';

// Create admin client for service role operations
let supabaseAdmin: any = null;
const _rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
try {
  if (_rawKey && _rawKey.split('.').length === 3) {
    supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', _rawKey);
  } else if (_rawKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY looks malformed (not a JWT).');
  } else {
    supabaseAdmin = null;
  }
} catch (err) {
  console.error('Failed to create Supabase admin client:', (err as any)?.message || String(err));
  supabaseAdmin = null;
}
if (!supabaseAdmin) supabaseAdmin = supabase;

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: orders, error, count } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Fetch order items for each order
    const ordersWithItems = await Promise.all(
      (orders || []).map(async (order: any) => {
        const { data: items } = await supabaseAdmin
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        return {
          ...order,
          items: items || [],
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        orders: ordersWithItems,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error: any) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      delivery_zone_id,
      delivery_notes,
      payment_method,
      items,
    } = body;

    // Validation
    if (!customer_name || !customer_phone || !customer_address || !delivery_zone_id || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate order number
    const { data: orderNumberData } = await supabaseAdmin.rpc('generate_order_number');
    const orderNumber = orderNumberData || `ORD-${Date.now()}`;

    // Calculate total
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Get client IP for fraud detection (ING WebPay compliance - Ghid 1.4.2)
    const clientIP = getClientIP(request);
    console.log('Order created from IP:', clientIP);

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name,
        customer_email: customer_email || null,
        customer_phone,
        customer_address,
        delivery_zone_id,
        delivery_notes: delivery_notes || null,
        total_amount: totalAmount,
        status: 'pending',
        payment_method: payment_method || 'cash',
        client_ip: clientIP,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { success: false, error: orderError.message },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback: delete the order
      await supabaseAdmin.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { success: false, error: itemsError.message },
        { status: 500 }
      );
    }

    // Send confirmation email ONLY if payment method is NOT card
    // For card payments, email will be sent after payment verification
    if (customer_email && payment_method !== 'card') {
      sendOrderStatusEmail({
        to: customer_email,
        orderNumber: orderNumber,
        customerName: customer_name,
        status: 'pending',
        totalAmount: totalAmount,
        items: orderItems,
      }).then(() => {
        console.log(`Order confirmation email sent to ${customer_email}`);
      }).catch((emailError) => {
        console.error('Failed to send order confirmation email:', emailError);
      });
    }

    // Send notification to restaurant (non-blocking)
    sendRestaurantNotification({
      orderNumber: orderNumber,
      customerName: customer_name,
      customerPhone: customer_phone,
      customerEmail: customer_email || undefined,
      customerAddress: customer_address,
      deliveryNotes: delivery_notes || undefined,
      paymentMethod: payment_method || 'cash',
      totalAmount: totalAmount,
      items: orderItems,
    }).then(() => {
      console.log(`Restaurant notification sent for order ${orderNumber}`);
    }).catch((emailError) => {
      console.error('Failed to send restaurant notification:', emailError);
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
