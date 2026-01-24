# Wine Management System - Setup Guide

Am creat un sistem complet de gestionare a vinurilor pentru restaurantul tău! Iată ce am implementat:

## 📋 Ce am creat:

### 1. Baza de date
- **Tabelul `wines`** cu toate câmpurile necesare:
  - Informații de bază (nume, descriere, preț)
  - Sistem de reduceri (discount_type, discount_value, discount_active)
  - Detalii specifice vinurilor (tip vin, regiune, producător, an, conținut alcool, volum)
  - Status (în stoc, promovat)
  - Imagine

### 2. API Routes
- **`/api/wines`** - GET (listă vinuri cu filtre), POST (creare vin nou)
- **`/api/wines/[id]`** - GET (detalii vin), PUT (actualizare), DELETE (ștergere)

### 3. Dashboard
- **`/dashboard/wines`** - Listă vinuri cu filtrare și căutare
- **`/dashboard/wines/add`** - Adăugare vin nou
- **`/dashboard/wines/[id]`** - Editare vin existent

### 4. Frontend
- **`/vinuri`** - Pagină publică de prezentare vinuri
- Link în header lângă "Meniu"
- Filtrare după tip de vin
- Design modern cu discount badges

## 🚀 Cum pornești:

### Pasul 1: Rulează migrația bazei de date

Trebuie să creezi tabelul în Supabase. Accesează:
1. Du-te la https://supabase.com și autentifică-te
2. Selectează proiectul tău
3. Click pe "SQL Editor" din sidebar
4. Click pe "New Query"
5. Copiază conținutul fișierului `migrations/002-create-wines-table.sql`
6. Lipește-l în editor și apasă "Run"

SAU poți rula comanda din terminal:
```bash
# Dacă ai Supabase CLI instalat
supabase db push
```

### Pasul 2: Verifică conexiunea

Restartează serverul de development:
```bash
npm run dev
```

### Pasul 3: Testează sistemul

1. **Accesează dashboard-ul**: http://localhost:3000/dashboard/wines
2. **Adaugă primul vin**: Click pe "Adaugă Vin"
3. **Vezi pagina publică**: http://localhost:3000/vinuri

## 📚 Tipuri de vinuri disponibile:

- **red** - Vin Roșu
- **white** - Vin Alb
- **rose** - Vin Rose
- **sparkling** - Vin Spumant
- **dessert** - Vin de Desert
- **fortified** - Vin Fortificat

## 💡 Funcționalități:

### Dashboard:
- ✅ Adăugare/editare/ștergere vinuri
- ✅ Încărcare imagine
- ✅ Sistem de reduceri (procent sau valoare fixă)
- ✅ Filtrare după tip de vin
- ✅ Căutare după nume, producător, regiune
- ✅ Status în stoc / stoc epuizat
- ✅ Marcare vinuri ca "Promovat"

### Frontend:
- ✅ Prezentare elegantă a vinurilor
- ✅ Filtrare după tip
- ✅ Afișare reduceri cu badge
- ✅ Detalii complete (an, alcool, volum, regiune)
- ✅ Design responsive

## 🎨 Structura fișierelor create:

```
migrations/
  └── 002-create-wines-table.sql          # SQL pentru tabelul wines

types/
  └── wine.ts                             # TypeScript interface pentru Wine

app/
  ├── api/
  │   └── wines/
  │       ├── route.ts                    # GET, POST wines
  │       └── [id]/
  │           └── route.ts                # GET, PUT, DELETE wine by ID
  │
  ├── (dashboard)/dashboard/wines/
  │   ├── page.tsx                        # Listă vinuri (dashboard)
  │   ├── add/
  │   │   └── page.tsx                    # Adăugare vin nou
  │   └── [id]/
  │       └── page.tsx                    # Editare vin
  │
  └── (frontend)/
      └── vinuri/
          └── page.tsx                    # Pagină publică vinuri

components/
  └── frontend/layout/
      └── Header.tsx                      # Actualizat cu link "Vinuri"

dashboard/
  ├── sidebar/
  │   └── DashboardSidebar.tsx           # Actualizat cu link "Vinuri"
  └── header/
      └── DashboardMobileHeader.tsx      # Actualizat cu link "Vinuri"
```

## 🔧 Exemplu de vin:

```json
{
  "name": "Merlot Premium 2020",
  "description": "Un vin roșu intens, cu arome de fructe negre și note de vanilie",
  "price": 89.99,
  "discountType": "percentage",
  "discountValue": 15,
  "discountActive": true,
  "wineType": "red",
  "region": "Valea Douro, Portugalia",
  "alcoholContent": 13.5,
  "volume": 750,
  "year": 2020,
  "producer": "Cramele Recaș",
  "in_stock": true,
  "featured": true
}
```

## ✅ Checklist final:

- [x] Migrație bază de date creată
- [x] API routes pentru CRUD operations
- [x] Dashboard pentru gestionare vinuri
- [x] Pagină frontend pentru prezentare
- [x] Link în header navigation
- [x] Link în dashboard sidebar
- [x] Sistem de reduceri integrat
- [x] Upload imagini
- [x] Filtrare și căutare

## 🎯 Următorii pași:

1. Rulează migrația SQL în Supabase
2. Adaugă câteva vinuri de test în dashboard
3. Verifică pagina publică `/vinuri`
4. Personalizează design-ul după preferințe
5. Adaugă vinurile tale din restaurant!

## 📞 Ajutor:

Dacă întâmpini probleme:
1. Verifică că serverul rulează: `npm run dev`
2. Verifică că migrația SQL a fost rulată cu succes în Supabase
3. Verifică console-ul pentru erori
4. Asigură-te că `.env.local` conține credențialele corecte pentru Supabase

---

**Gata! Sistemul de vinuri este complet funcțional! 🍷**
