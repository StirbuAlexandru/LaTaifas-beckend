# Instrucțiuni pentru Galeria "Universul La Taifas"

## 📋 Pas 1: Rulează Migration SQL

Accesează Supabase Dashboard și rulează fișierul SQL:

**Fișier:** `migrations/008-create-location-gallery-table.sql`

Acest migration va crea:
- Tabelul `location_gallery` cu câmpurile necesare
- Index pentru performanță optimă
- 8 imagini default (locatie1.jpg - locatie8.jpg)
- Trigger pentru auto-update timestamp

## 🖼️ Pas 2: Verifică Imaginile Default

După rularea migration-ului, verifică în Supabase dacă tabelul `location_gallery` conține cele 8 imagini default.

## 🎨 Pas 3: Gestionează Galeria din Dashboard

1. Accesează: **Dashboard → Galerie Locație**
2. Funcționalități disponibile:
   - ✅ **Adaugă imagini noi** - buton "Adaugă Imagine"
   - ✅ **Încarcă imagini** - direct în Supabase Storage
   - ✅ **Editează** - text alternativ și ordine afișare
   - ✅ **Șterge** - imagini nedorite
   - ✅ **Reordonează** - schimbă ordinea de afișare

## 🌐 Frontend - Pagina "Despre Noi"

**Secțiunea "Universul La Taifas":**
- 📱 **4 imagini vizibile** inițial (responsive: 2 pe mobile, 4 pe desktop)
- 🔽 **Buton "Mai Multe Imagini"** - afișează toate imaginile
- 🔼 **Buton "Mai Puține Imagini"** - revine la primele 4 + scroll automat
- ✨ **Animație slideDown** - când se extind imaginile
- 🎯 **Hover effects** - shadow și border roșu

## 📁 Structura Fișierelor Create

```
migrations/
  └── 008-create-location-gallery-table.sql    # SQL migration

app/
  ├── api/
  │   └── location-gallery/
  │       └── route.ts                          # API CRUD endpoints
  └── (dashboard)/
      └── dashboard/
          └── location-gallery/
              └── page.tsx                      # Dashboard page

dashboard/
  └── sidebar/
      └── DashboardSidebar.tsx                  # Updated cu link nou

app/(frontend)/
  └── about/
      └── page.tsx                              # Updated cu API integration
```

## 🔧 API Endpoints

**GET** `/api/location-gallery`
- Returnează toate imaginile active, sortate după display_order

**POST** `/api/location-gallery`
- Body: `{ image_url, alt_text, display_order }`
- Creează imagine nouă

**PUT** `/api/location-gallery`
- Body: `{ id, image_url?, alt_text?, display_order?, is_active? }`
- Actualizează imagine existentă

**DELETE** `/api/location-gallery?id={id}`
- Șterge imagine

## ✅ Testare

1. **Rulează migration SQL** în Supabase
2. **Verifică tabelul** `location_gallery` are 8 înregistrări
3. **Accesează** `/dashboard/location-gallery` și testează CRUD
4. **Vizualizează** pagina `/about` - vezi primele 4 imagini
5. **Click "Mai Multe Imagini"** - vezi toate imaginile
6. **Click "Mai Puține Imagini"** - revine la 4 + scroll

## 🎯 Beneficii

✅ Management complet din dashboard
✅ Fără hardcoding - tot dinamic din DB
✅ Upload direct în Supabase Storage
✅ Ordine personalizabilă
✅ Responsive design
✅ Animații smooth
✅ Performance optimizat cu index

---

**Created by:** Știrbu Alexandru
**Contact:** alexstirbu99@gmail.com
