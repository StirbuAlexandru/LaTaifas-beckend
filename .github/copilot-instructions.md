# 🚀 GitHub Copilot – Project Instructions (Next.js 14 + Supabase + Admin Dashboard)

You are assisting development inside a full restaurant e-commerce platform built with:

- Next.js 14 (App Router)
- TypeScript
- React Server Components + Client Components
- Tailwind + shadcn/ui
- Supabase (DB + Auth + Storage)
- Custom API Routes under `/app/api/**`
- Admin Dashboard in `/app/(dashboard)/dashboard/**`
- Public frontend in `/app/(frontend)/**`
- Context providers (CartContext, AuthContext)

Use these rules when generating or modifying code:

## 📁 Project structure you must ALWAYS follow

Important folders:

```
app/
  (dashboard)/dashboard/*      → Admin pages (products, orders, categories etc.)
  (frontend)/*                 → Public facing pages
  api/*                        → API routes using server functions (GET/POST/PUT/DELETE)
components/
  dashboard/*                  → Admin components
  frontend/*                   → Public components
lib/
  supabaseClient.ts            → Supabase client
  services/*                   → Business logic services
context/*                      → React contexts (Cart, Auth)
types/*                        → Shared TS types
public/images/*                → Static images
```

## 🗄️ Supabase usage rules

Whenever the project needs to interact with data, follow these instructions:

### Products table
```sql
products (
  id uuid pk,
  name text,
  description text,
  price numeric,
  image text,
  category_id uuid,
  in_stock boolean,
  created_at timestamp
)
```

### Categories table
```sql
categories (
  id uuid pk,
  name text,
  slug text unique,
  parent_id uuid null,
  created_at timestamp
)
```

### Orders table
```sql
orders (
  id uuid pk,
  user_id uuid,
  customer_name text,
  customer_email text,
  customer_phone text,
  customer_address text,
  items jsonb,
  subtotal numeric,
  total numeric,
  payment_method text,
  status text,
  created_at timestamp
)
```

### Supabase import rule

Always use:

```typescript
import { supabase } from "@/lib/supabaseClient";
```

API routes must use Next.js App Router conventions:

Example:

```typescript
export async function GET(request: Request) { ... }
export async function POST(request: Request) { ... }
export async function PUT(request: Request) { ... }
export async function DELETE(request: Request) { ... }
```

## 🎨 UI rules (shadcn + Tailwind)

- Use shadcn/ui components where possible (Button, Input, Card, Dialog, etc.)
- Use Tailwind for layout and styling
- Dashboard UI = cards, tables, modals, forms
- Frontend UI = clean, restaurant-style layout, big images

## 🧪 Validation rules

- Use native HTML validation when possible
- For backend/api validation → use Zod schemas
- For form handling → simple React controlled inputs or shadcn forms

## 🔄 React server vs client rules

### Server Components allowed:

- Page files (page.tsx)
- Layout files
- API fetching with Supabase
- Rendering lists
- Static UI

### Client Components required when:

- Using state (useState, useContext)
- Using CartContext
- Handling forms
- Buttons that trigger client actions
- Modals, dialogs, drawers

Always add `"use client"` at top of client components.

## 📦 Admin Dashboard (CRUD rules)

For any CRUD page in `/dashboard`:

- GET data server-side using Supabase
- POST/PUT/DELETE via API routes inside `/app/api/**`
- Admin pages must include:
  - List view (table/grid)
  - Add new item (form)
  - Edit item (id param)
  - Delete item (button)
  - Toast notifications

Examples Copilot must follow:

- `/dashboard/products` → list products
- `/dashboard/products/add-product` → add form
- `/dashboard/products/[id]` → edit page

## 🛒 Cart System

Cart uses CartContext:

```typescript
addToCart(product, quantity)
removeFromCart(id)
updateCartItem({ id, quantity })
clearCart()
```

Copilot must not re-implement cart logic. Use existing context.

## 📦 Orders system rules

When a user places an order:

1. Create order object
2. Insert into Supabase: `supabase.from("orders").insert([...])`
3. Clear cart
4. Redirect to success page

## 🖼️ Image Upload Rules (Supabase Storage)

When Copilot needs to generate upload logic:

- Bucket: `product-images`

Use:

```typescript
const { data, error } = await supabase.storage
  .from("product-images")
  .upload(`products/${id}/${file.name}`, file);
```

Then get URL:

```typescript
const url = supabase.storage
  .from("product-images")
  .getPublicUrl(path).data.publicUrl;
```

## 🔌 High-level tasks Copilot is allowed to generate

Copilot is allowed / encouraged to create or modify:

### ✅ Backend

- API routes (GET/POST/PUT/DELETE)
- Supabase queries
- Data validation with Zod
- Order processing logic
- Delivery zone calculation
- Search filters
- Pagination
- File upload endpoints

### ✅ Frontend (Public)

- Product listing & filtering
- Product details pages
- Cart interaction (via CartContext)
- Checkout forms
- Order confirmation pages

### ✅ Admin Dashboard

CRUD pages for:

- products
- categories
- orders
- customers
- banners
- blog posts

Tables, forms, modals, charts

Admin actions (activate, deactivate, delete)

### ✅ Utilities & Helpers

- Custom hooks (useProducts, useCategories, etc.)
- React components
- UI elements using shadcn
- TypeScript interfaces

## ❌ Things Copilot must NOT do

- Do NOT create its own database structure
- Do NOT create its own contexts (use existing ones)
- Do NOT create fake data if Supabase is present
- Do NOT mix server/client components incorrectly
- Do NOT generate pages outside the existing folder structure
- Do NOT use Prisma, MongoDB, or other DBs

## 📌 Final instruction for Copilot

Every response must integrate with the existing project structure, use Supabase correctly, and respect Next.js 14 App Router conventions.

All new code must be production-ready, typed, and follow the established patterns above.
