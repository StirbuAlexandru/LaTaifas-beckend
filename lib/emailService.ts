import nodemailer from 'nodemailer';

// Email configuration - support both SMTP_* and EMAIL_* env vars
const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// Email templates for different order statuses
const emailTemplates = {
  pending: {
    subject: '🛒 Comandă Primită - #{orderNumber}',
    html: (orderNumber: string, customerName: string, totalAmount: number, items: any[]) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .total { font-size: 1.5em; font-weight: bold; color: #dc2626; text-align: right; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍕 La Taifas</h1>
              <p>Comanda ta a fost primită!</p>
            </div>
            <div class="content">
              <h2>Bună ${customerName}! 👋</h2>
              <p>Mulțumim pentru comandă! Am primit comanda ta <strong>#${orderNumber}</strong> și o vom procesa în cel mai scurt timp.</p>
              
              <div class="order-details">
                <h3>📦 Detalii Comandă:</h3>
                ${items.map(item => `
                  <div class="item">
                    <span>${item.product_name} x ${item.quantity}</span>
                    <span>${item.subtotal.toFixed(2)} LEI</span>
                  </div>
                `).join('')}
                <div class="total">Total: ${totalAmount.toFixed(2)} LEI</div>
              </div>

              <p><strong>📍 Status:</strong> În așteptare - Comanda ta este în procesare</p>
              <p>Vei primi un email când comanda ta va fi confirmată.</p>
              
              <div class="footer">
                <p>📞 Telefon: 0753 077 063 | 📧 Email: lataifas23@gmail.com</p>
                <p>VINUM NOBILIS SRL | CUI: 45346331</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  confirmed: {
    subject: '✅ Comandă Confirmată - #{orderNumber}',
    html: (orderNumber: string, customerName: string, totalAmount: number, items: any[]) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .total { font-size: 1.5em; font-weight: bold; color: #16a34a; text-align: right; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
            .status-badge { background: #16a34a; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Comandă Confirmată!</h1>
              <p>#${orderNumber}</p>
            </div>
            <div class="content">
              <h2>Vestea bună, ${customerName}! 🎉</h2>
              <p>Comanda ta a fost confirmată și va fi pregătită în curând.</p>
              
              <div class="status-badge">✅ Confirmată</div>
              
              <div class="order-details">
                <h3>📦 Detalii Comandă:</h3>
                ${items.map(item => `
                  <div class="item">
                    <span>${item.product_name} x ${item.quantity}</span>
                    <span>${item.subtotal.toFixed(2)} LEI</span>
                  </div>
                `).join('')}
                <div class="total">Total: ${totalAmount.toFixed(2)} LEI</div>
              </div>

              <p><strong>⏱️ Timp estimat de preparare:</strong> 30-45 minute</p>
              <p>Vei primi o notificare când comanda ta este gata pentru livrare.</p>
              
              <div class="footer">
                <p>📞 Telefon: 0753 077 063 | 📧 Email: lataifas23@gmail.com</p>
                <p>Mulțumim că ai ales La Taifas! 🍕</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  preparing: {
    subject: '👨‍🍳 În Preparare - #{orderNumber}',
    html: (orderNumber: string, customerName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
            .emoji-large { font-size: 3em; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>👨‍🍳 Bucătarii la lucru!</h1>
              <p>#${orderNumber}</p>
            </div>
            <div class="content">
              <h2>Bună ${customerName}! 🔥</h2>
              <div class="emoji-large">👨‍🍳 🍕 🔪</div>
              <p>Comanda ta este acum în preparare! Bucătarii noștri lucrează la prepararea produselor tale proaspete și delicioase.</p>
              <p><strong>📍 Status:</strong> În preparare</p>
              <p>Vei primi o notificare când comanda ta este gata pentru livrare.</p>
              
              <div class="footer">
                <p>📞 Pentru întrebări: 0753 077 063</p>
                <p>Mulțumim pentru răbdare! 😊</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  ready: {
    subject: '🚀 Comanda Ta Este Gata! - #{orderNumber}',
    html: (orderNumber: string, customerName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
            .emoji-large { font-size: 3em; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Comanda Gata!</h1>
              <p>#${orderNumber}</p>
            </div>
            <div class="content">
              <h2>Excelent, ${customerName}! 🎉</h2>
              <div class="emoji-large">📦 ✅ 🚗</div>
              <p>Comanda ta este gata și curierul nostru este pe drum către tine!</p>
              <p><strong>📍 Status:</strong> Gata pentru livrare / Pe drum</p>
              <p>Vei primi produsele tale proaspete în cel mai scurt timp posibil.</p>
              
              <div class="footer">
                <p>📞 Pentru întrebări: 0753 077 063</p>
                <p>Savurează masa! 🍕😋</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  delivered: {
    subject: '✅ Comandă Livrată - #{orderNumber}',
    html: (orderNumber: string, customerName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
            .emoji-large { font-size: 3em; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Livrare Finalizată!</h1>
              <p>#${orderNumber}</p>
            </div>
            <div class="content">
              <h2>Perfect, ${customerName}! 🎉</h2>
              <div class="emoji-large">✅ 🎊 😋</div>
              <p>Comanda ta a fost livrată cu succes! Sperăm că te bucuri de produsele noastre.</p>
              <p><strong>📍 Status:</strong> Livrată ✅</p>
              <p>Dacă ai avut o experiență plăcută, ne-ar face mare plăcere să ne lași o recenzie!</p>
              
              <div class="footer">
                <p>📞 Pentru feedback: 0753 077 063</p>
                <p>📧 Email: lataifas23@gmail.com</p>
                <p>Mulțumim că ne-ai ales! Așteptăm să te revedem! 🍕❤️</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  cancelled: {
    subject: '❌ Comandă Anulată - #{orderNumber}',
    html: (orderNumber: string, customerName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Comandă Anulată</h1>
              <p>#${orderNumber}</p>
            </div>
            <div class="content">
              <h2>Ne pare rău, ${customerName}</h2>
              <p>Comanda ta <strong>#${orderNumber}</strong> a fost anulată.</p>
              <p><strong>📍 Status:</strong> Anulată</p>
              <p>Dacă anularea a fost o eroare sau ai întrebări, te rugăm să ne contactezi:</p>
              <p>📞 <strong>Telefon:</strong> 0753 077 063</p>
              <p>📧 <strong>Email:</strong> lataifas23@gmail.com</p>
              
              <div class="footer">
                <p>Sperăm să ne revedem curând! 🍕</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};

interface SendOrderEmailParams {
  to: string;
  orderNumber: string;
  customerName: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount?: number;
  items?: any[];
}

export async function sendOrderStatusEmail({
  to,
  orderNumber,
  customerName,
  status,
  totalAmount = 0,
  items = [],
}: SendOrderEmailParams) {
  try {
    // Skip if no email provided
    if (!to || to.trim() === '') {
      console.log('No email provided, skipping email notification');
      return { success: true, skipped: true };
    }

    // Skip if SMTP is not configured
    if (!smtpUser || !smtpPass) {
      console.warn('SMTP not configured, skipping email notification');
      return { success: true, skipped: true, reason: 'SMTP not configured' };
    }

    const template = emailTemplates[status];
    if (!template) {
      throw new Error(`No email template found for status: ${status}`);
    }

    const subject = template.subject.replace('#{orderNumber}', orderNumber);
    const html = template.html(orderNumber, customerName, totalAmount, items);

    await transporter.sendMail({
      from: `"La Taifas" <${smtpUser}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${to} for order ${orderNumber} - Status: ${status}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// Verify SMTP connection
export async function verifyEmailConnection() {
  try {
    if (!smtpUser || !smtpPass) {
      return { success: false, error: 'SMTP credentials not configured' };
    }
    
    await transporter.verify();
    return { success: true, message: 'Email service is ready' };
  } catch (error: any) {
    console.error('Email verification failed:', error);
    return { success: false, error: error.message };
  }
}

// Send notification to restaurant when new order is placed
interface SendRestaurantNotificationParams {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  deliveryNotes?: string;
  paymentMethod: string;
  totalAmount: number;
  items: any[];
}

export async function sendRestaurantNotification({
  orderNumber,
  customerName,
  customerPhone,
  customerEmail,
  customerAddress,
  deliveryNotes,
  paymentMethod,
  totalAmount,
  items,
}: SendRestaurantNotificationParams) {
  try {
    // Skip if SMTP is not configured
    if (!smtpUser || !smtpPass) {
      console.warn('SMTP not configured, skipping restaurant notification');
      return { success: true, skipped: true, reason: 'SMTP not configured' };
    }

    const restaurantEmail = process.env.RESTAURANT_EMAIL || 'lataifas23@gmail.com';

    const subject = `🔔 COMANDĂ NOUĂ #${orderNumber} - ${totalAmount.toFixed(2)} LEI`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .section { margin: 25px 0; padding: 20px; background: #f9fafb; border-left: 4px solid #dc2626; border-radius: 4px; }
            .section-title { font-size: 1.2em; font-weight: bold; color: #dc2626; margin-bottom: 15px; }
            .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .info-label { font-weight: bold; color: #6b7280; }
            .info-value { color: #111827; }
            .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .items-table th { background: #dc2626; color: white; padding: 12px; text-align: left; }
            .items-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
            .total-row { background: #fef2f2; font-weight: bold; font-size: 1.3em; }
            .urgent { background: #fef2f2; border: 2px solid #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .badge { display: inline-block; padding: 5px 12px; border-radius: 12px; font-size: 0.9em; font-weight: bold; }
            .badge-cash { background: #16a34a; color: white; }
            .badge-card { background: #0891b2; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 COMANDĂ NOUĂ!</h1>
              <p style="font-size: 1.5em; margin: 10px 0;">Comandă #${orderNumber}</p>
            </div>
            <div class="content">
              <div class="urgent">
                <h2 style="margin: 0; color: #dc2626;">⚡ ACȚIUNE NECESARĂ - Confirmați comanda în dashboard!</h2>
              </div>

              <!-- Customer Info -->
              <div class="section">
                <div class="section-title">👤 Informații Client</div>
                <div class="info-row">
                  <span class="info-label">Nume:</span>
                  <span class="info-value">${customerName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">📞 Telefon:</span>
                  <span class="info-value"><a href="tel:${customerPhone}">${customerPhone}</a></span>
                </div>
                ${customerEmail ? `
                <div class="info-row">
                  <span class="info-label">📧 Email:</span>
                  <span class="info-value"><a href="mailto:${customerEmail}">${customerEmail}</a></span>
                </div>
                ` : ''}
              </div>

              <!-- Delivery Info -->
              <div class="section">
                <div class="section-title">📍 Informații Livrare</div>
                <div class="info-row">
                  <span class="info-label">Adresă:</span>
                  <span class="info-value">${customerAddress}</span>
                </div>
                ${deliveryNotes ? `
                <div class="info-row">
                  <span class="info-label">Observații:</span>
                  <span class="info-value" style="color: #dc2626; font-weight: bold;">${deliveryNotes}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">Metodă Plată:</span>
                  <span class="info-value">
                    <span class="badge ${paymentMethod === 'cash' ? 'badge-cash' : 'badge-card'}">
                      ${paymentMethod === 'cash' ? '💵 Numerar (Ramburs)' : '💳 Card Bancar'}
                    </span>
                  </span>
                </div>
              </div>

              <!-- Order Items -->
              <div class="section">
                <div class="section-title">📦 Produse Comandate</div>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Produs</th>
                      <th style="text-align: center;">Cantitate</th>
                      <th style="text-align: right;">Preț Unitar</th>
                      <th style="text-align: right;">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.map(item => `
                      <tr>
                        <td><strong>${item.product_name}</strong></td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: right;">${item.product_price.toFixed(2)} LEI</td>
                        <td style="text-align: right;"><strong>${item.subtotal.toFixed(2)} LEI</strong></td>
                      </tr>
                    `).join('')}
                    <tr class="total-row">
                      <td colspan="3" style="text-align: right; padding-right: 20px;">TOTAL:</td>
                      <td style="text-align: right; color: #dc2626;">${totalAmount.toFixed(2)} LEI</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Action Required -->
              <div style="text-align: center; margin-top: 30px;">
                <p style="font-size: 1.1em; color: #6b7280;">
                  🖥️ Accesează dashboard-ul pentru a gestiona comanda
                </p>
                <p style="font-size: 0.9em; color: #9ca3af; margin-top: 15px;">
                  Data comenzii: ${new Date().toLocaleString('ro-RO', { 
                    dateStyle: 'full', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"La Taifas - Notificări" <${smtpUser}>`,
      to: restaurantEmail,
      subject,
      html,
      priority: 'high',
    });

    console.log(`Restaurant notification sent for order ${orderNumber}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error sending restaurant notification:', error);
    return { success: false, error: error.message };
  }
}
