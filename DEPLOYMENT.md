# DEPLOYMENT GUIDE - La Taifas Restaurant

## 📋 Prerequisites

Before deployment, make sure you have:
- ✅ Supabase account with database setup
- ✅ Stripe account for payments
- ✅ Gmail account for email notifications
- ✅ Hostgare account for frontend hosting
- ✅ Render account for backend (if needed)

---

## 🚀 DEPLOYMENT STEPS

### 1️⃣ Prepare Environment Variables

Copy your `.env.local` values to `.env.production` and update with production values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
EMAIL_USER=lataifas23@gmail.com
EMAIL_PASS=your_app_password
NEXT_PUBLIC_SITE_URL=https://lataifas-suceava.ro
```

---

### 2️⃣ Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next` folder.

---

### 3️⃣ Deploy to Hostgare (Frontend + Backend)

#### Option A: Static Export (if no backend needed)
Add to `next.config.js`:
```javascript
output: 'export',
```

Then build and upload:
```bash
npm run build
# Upload 'out' folder to Hostgare
```

#### Option B: Full Next.js App (Recommended)
Hostgare with Node.js support:

1. **Upload files via FTP/cPanel:**
   - Upload entire project folder
   - Include `node_modules` or run `npm install` on server

2. **Start script in cPanel:**
   ```bash
   npm run build
   npm start
   ```

3. **Environment variables in cPanel:**
   - Go to cPanel → Environment Variables
   - Add all variables from `.env.production`

---

### 4️⃣ Alternative: Deploy Backend to Render

If Hostgare doesn't support Node.js well:

#### Create `render.yaml`:
```yaml
services:
  - type: web
    name: lataifas-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

#### Deploy to Render:
1. Connect GitHub repo to Render
2. Add environment variables in Render dashboard
3. Deploy automatically

---

### 5️⃣ Database Setup (Supabase)

1. **Run migrations:**
   - Open Supabase SQL Editor
   - Run all files from `/migrations` folder in order

2. **Set Row Level Security (RLS):**
   ```sql
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
   ```

3. **Storage buckets:**
   - Create `product-images` bucket
   - Set to public access

---

### 6️⃣ Stripe Configuration

1. **Switch to Live Mode** in Stripe Dashboard
2. **Get live API keys:**
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`
3. **Add webhook endpoint:**
   ```
   https://lataifas-suceava.ro/api/webhooks/stripe
   ```
4. **Select events:**
   - payment_intent.succeeded
   - payment_intent.payment_failed

---

### 7️⃣ Email Configuration

1. **Gmail App Password:**
   - Go to Google Account → Security
   - Enable 2-Factor Authentication
   - Generate App Password
   - Use this password in `EMAIL_PASS`

---

### 8️⃣ Domain Configuration

1. **Point domain to Hostgare:**
   - Update nameservers at domain registrar
   - Or add A record to Hostgare IP

2. **SSL Certificate:**
   - Enable AutoSSL in cPanel
   - Or use Let's Encrypt

---

### 9️⃣ Post-Deployment Checklist

- ✅ Test order placement
- ✅ Test payment with Stripe test cards
- ✅ Test email notifications
- ✅ Test image uploads
- ✅ Verify mobile responsiveness
- ✅ Check page load speed
- ✅ Test all navigation links

---

## 🔧 Troubleshooting

### Build fails:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Images not loading:
- Check Supabase storage permissions
- Verify `next.config.js` remote patterns

### API routes not working:
- Ensure Hostgare supports Next.js API routes
- Check environment variables are set

---

## 📞 Support

For issues, contact:
- Email: lataifas23@gmail.com
- Phone: 0753 077 063

---

## 🎉 You're Ready!

Your La Taifas restaurant website is now live! 🍕🍷
