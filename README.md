# Restaurant E-Commerce Platform

A full-stack restaurant e-commerce platform built with Next.js 14, featuring both customer-facing storefront and admin dashboard for managing orders, products, and deliveries.

## 🎯 Features

### Customer Frontend
- 🏠 **Homepage**: Hero section, featured products, categories
- 🍕 **Menu Browsing**: Filter by category, price, dietary preferences
- 🛒 **Shopping Cart**: Add items, customize options, view totals
- 💳 **Checkout**: Address management, delivery scheduling, payment
- 📦 **Order Tracking**: Real-time order status updates
- 👤 **User Account**: Profile management, order history, saved addresses
- 📝 **Blog**: Restaurant news, recipes, and updates

### Admin Dashboard
- 📊 **Analytics**: Sales reports, order statistics, revenue charts
- 🍔 **Product Management**: CRUD operations for menu items
- 📋 **Order Management**: View, update, and track orders
- 🏷️ **Category Management**: Organize products hierarchically
- 👥 **Customer Management**: View customer information and orders
- 🎨 **Banner Management**: Homepage promotional banners
- ✍️ **Blog Management**: Create and publish blog posts

### Notification System
- 📧 **Email Notifications**: Automatic emails sent to restaurant and customer on order placement
- 📱 **SMS Notifications**: Automatic SMS alerts sent to restaurant and customer on order placement
- 📋 **Order Details**: Complete order information including items, quantities, and totals
- 🕐 **Real-time Alerts**: Instant notifications when orders are placed

### Order Management
- 📦 **Order Creation**: Automatically creates orders from cart items
- 💾 **Order Persistence**: Saves orders to database (mock implementation)
- 🔄 **Order Status Updates**: Track order progress through fulfillment stages
- 🔍 **Order Retrieval**: Fetch order details by ID

## 🏗️ Project Structure

```
deshboard/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Admin dashboard routes
│   ├── (frontend)/               # Customer-facing routes
│   └── api/                      # API endpoints
├── components/                   # React components
│   ├── dashboard/                # Dashboard components
│   ├── frontend/                 # Frontend components
│   └── ui/                       # Shared UI components
├── context/                      # React Context providers
│   ├── CartContext.tsx           # Shopping cart state
│   └── AuthContext.tsx           # Authentication state
├── types/                        # TypeScript type definitions
│   ├── product.ts
│   ├── order.ts
│   ├── cart.ts
│   ├── user.ts
│   └── ...
├── lib/                          # Utilities and helpers
│   └── services/                 # Business logic services
│       ├── notificationService.ts # Email and SMS notifications
│       └── orderService.ts       # Order creation and management
├── public/                       # Static assets
└── data/                         # Mock data (replace with DB)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
cd c:\Users\alexs\OneDrive\Desktop\deshboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_database_connection_string"

# Authentication
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Payment Gateway (Stripe)
STRIPE_SECRET_KEY="your_stripe_secret"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="your_stripe_public_key"

# Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your_email"
SMTP_PASSWORD="your_password"

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="your_twilio_phone_number"

# Restaurant Contact Information
RESTAURANT_EMAIL="restaurant@tastybites.com"
RESTAURANT_PHONE="+1234567890"

# App Settings
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Set up the database**

If using Prisma:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: seed with sample data
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**

- Frontend: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard

## 📚 Documentation

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Complete file and folder structure
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - How dashboard and frontend connect

## 🔑 Key Concepts

### Route Groups

The app uses Next.js route groups to separate concerns:

- `(dashboard)` - Admin interface at `/dashboard/*`
- `(frontend)` - Customer interface at `/*`

Both groups share the same API routes and database.

### Shared Types

TypeScript interfaces in `/types` ensure type safety across:
- Frontend components
- Dashboard components
- API routes
- Database operations

### Context Providers

Global state management using React Context:
- **CartContext** - Shopping cart (items, totals, operations)
- **AuthContext** - User authentication and profile

### API Routes

RESTful API endpoints in `/app/api`:
- `/api/products` - Product CRUD
- `/api/orders` - Order management
- `/api/orders/[id]` - Get specific order
- `/api/orders/[id]/status` - Update order status
- `/api/categories` - Category operations
- `/api/auth` - Authentication
- `/api/customers` - Customer data

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Database**: MongoDB/PostgreSQL (your choice)
- **ORM**: Prisma (recommended)
- **Authentication**: NextAuth.js
- **Payment**: Stripe
- **Deployment**: Vercel

## 📝 API Examples

### Fetching Products (Frontend)

```typescript
// app/(frontend)/menu/page.tsx
const response = await fetch('/api/products?featured=true&limit=8');
const data = await response.json();
const products = data.data.products;
```

### Creating Product (Dashboard)

```typescript
// Dashboard form submission
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(productData),
});
```

### Placing Order (Frontend)

``typescript
// Checkout submission
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cart: cart,
    customerInfo: {
      fullName,
      email,
      phone,
      address,
      city,
      zipCode
    },
    customerId: user?.id
  }),
});
```

## 🎨 Customization

### Changing Brand Colors

Edit `tailwind.config.js`:

``js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      },
    },
  },
};
```

### Adding New Product Fields

1. Update type in `types/product.ts`
2. Update database schema (Prisma schema)
3. Update forms in `components/dashboard/forms/ProductForm.tsx`
4. Update API routes in `app/api/products/route.ts`

### Adding Payment Methods

Implement payment handlers in `services/paymentService.ts` and update checkout flow.

## 🔐 Authentication & Authorization

### User Roles

- **customer** - Can browse, order, view their orders
- **admin** - Full access to dashboard
- **staff** - Limited dashboard access (optional)

### Protected Routes

Middleware protects routes:
- `/dashboard/*` - Admin only
- `/orders/*` - Authenticated users
- `/profile/*` - Authenticated users

## 📦 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Add all `.env.local` variables to your hosting platform's environment settings.

### Database

Set up production database (MongoDB Atlas, Supabase, PlanetScale, etc.) and update `DATABASE_URL`.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the documentation files
- Review the integration guide
- Contact support

## 🎯 Next Steps

1. **Set up database** - Configure Prisma with your chosen database
2. **Implement authentication** - Set up NextAuth.js
3. **Connect payment gateway** - Integrate Stripe
4. **Add real data** - Replace mock data with database queries
5. **Deploy** - Push to production on Vercel
6. **Test** - Comprehensive testing of all features
7. **Monitor** - Set up analytics and error tracking

---

Built with ❤️ for restaurant businesses
