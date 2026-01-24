import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6 hover:bg-red-600 hover:text-white">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la Pagina Principală
        </Link>
      </Button>

      <h1 className="text-4xl font-bold text-red-600 mb-8">Politica de Cookies</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Ce sunt cookie-urile?</h2>
          <p className="mb-4">
            Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul dumneavoastră 
            (computer, tabletă, smartphone) atunci când vizitați website-ul nostru. Acestea ajută 
            la funcționarea corectă a site-ului și la îmbunătățirea experienței de navigare.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Cum folosim cookie-urile?</h2>
          <p className="mb-4">Utilizăm cookie-uri pentru următoarele scopuri:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Cookie-uri esențiale:</strong> Necesare pentru funcționarea de bază a site-ului (ex: coșul de cumpărături, autentificare)</li>
            <li><strong>Cookie-uri de performanță:</strong> Ne ajută să înțelegem cum utilizați site-ul pentru a-l îmbunătăți</li>
            <li><strong>Cookie-uri funcționale:</strong> Memorează preferințele dumneavoastră (ex: limba, regiunea)</li>
            <li><strong>Cookie-uri de marketing:</strong> Folosite pentru a afișa anunțuri relevante</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Cookie-uri utilizate pe site-ul nostru</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-600 pl-4">
              <h3 className="font-semibold mb-2">Cookie-uri proprii</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>restaurant-auth:</strong> Gestionează autentificarea utilizatorilor</li>
                <li>• <strong>cart:</strong> Memorează produsele din coșul de cumpărături</li>
                <li>• <strong>admin_session:</strong> Sesiune pentru acces dashboard administrator</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-600 pl-4">
              <h3 className="font-semibold mb-2">Cookie-uri terțe</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Google Analytics:</strong> Analiză trafic și comportament utilizatori</li>
                <li>• <strong>Stripe:</strong> Procesare plăți securizate cu cardul</li>
                <li>• <strong>Facebook Pixel:</strong> Remarketing și măsurare conversii</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Gestionarea cookie-urilor</h2>
          <p className="mb-4">
            Puteți gestiona sau șterge cookie-urile în funcție de preferințele dumneavoastră. 
            Puteți șterge toate cookie-urile stocate pe dispozitivul dumneavoastră și puteți 
            configura majoritatea browserelor să blocheze plasarea acestora.
          </p>
          <p className="mb-4">
            <strong>Important:</strong> Dacă blocați cookie-urile, este posibil ca unele funcționalități 
            ale site-ului să nu mai funcționeze corect (ex: coșul de cumpărături, autentificarea).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Cum să dezactivați cookie-urile?</h2>
          <p className="mb-4">Majoritatea browserelor acceptă cookie-uri în mod implicit, dar puteți modifica setările:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri</li>
            <li><strong>Mozilla Firefox:</strong> Opțiuni → Confidențialitate și securitate</li>
            <li><strong>Safari:</strong> Preferințe → Confidențialitate</li>
            <li><strong>Microsoft Edge:</strong> Setări → Confidențialitate</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Actualizări ale politicii</h2>
          <p className="mb-4">
            Ne rezervăm dreptul de a actualiza această politică de cookie-uri. Vă recomandăm 
            să consultați periodic această pagină pentru a fi la curent cu eventualele modificări.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Ultima actualizare:</strong> Ianuarie 2026
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Contact</h2>
          <p className="mb-4">
            Pentru întrebări sau nelămuriri legate de politica de cookie-uri, ne puteți contacta:
          </p>
          <ul className="space-y-2">
            <li><strong>Email:</strong> lataifas23@gmail.com</li>
            <li><strong>Telefon:</strong> 0753 077 063</li>
            <li><strong>Adresă:</strong> Calea Unirii, Burdujeni, nr 80, Suceava, Romania</li>
          </ul>
        </section>

        <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-600 rounded">
          <p className="font-semibold text-red-700 mb-2">VINUM NOBILIS SRL</p>
          <p className="text-sm">CUI: RO45346331</p>
          <p className="text-sm">J33/2276/13.12.2021</p>
        </div>
      </div>
    </div>
  );
}
