'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 pt-32">
        <Button variant="ghost" asChild className="mb-6 hover:bg-red-600 hover:text-white">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Pagina Principală
          </Link>
        </Button>

        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Termeni și Condiții
          </h1>
          <p className="text-gray-600">
            La Taifas - Condiții generale de utilizare
          </p>
        </div>

        {/* Content Section */}
        <Card className="border-2 border-red-100">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-2xl text-red-600">
              Termeni și condiții de utilizare a serviciilor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <div className="space-y-6 text-gray-700">
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Data ultimei actualizări:</strong> {new Date().toLocaleDateString('ro-RO')}
                </p>

                <p className="text-base leading-relaxed">
                  Vă rugăm să citiți cu atenție acești Termeni și Condiții înainte de a utiliza serviciile 
                  oferite de <strong>La Taifas</strong>, inclusiv site-ul nostru, serviciile de rezervare și 
                  comenzile online. Prin accesarea sau utilizarea oricărei părți a serviciilor, sunteți de acord 
                  cu acești Termeni și Condiții.
                </p>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Informații generale despre operator</h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p><strong>Nume:</strong> VINUM NOBILIS SRL</p>
                    <p><strong>Sediu Central:</strong> Municipiul Suceava, Strada Ion Niculce, nr.5, Bloc 47, Scara B, Ap 11, Județul Suceava</p>
                    <p><strong>CUI:</strong> RO45346331</p>
                    <p><strong>Reg. Com.:</strong> J33/2276/13.12.2021</p>
                    <p><strong>Activitate Principală:</strong> 4634 - Comerț cu ridicata al băuturilor</p>
                    <p><strong>Telefon:</strong> 0753 077 063</p>
                    <p><strong>E-mail:</strong> lataifas23@gmail.com</p>
                  </div>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Acceptarea termenilor</h2>
                  <p>Prin accesarea site-ului sau utilizarea serviciilor restaurantului, declarați că:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Aveți cel puțin 18 ani</li>
                    <li>Ați citit și înțeles acești termeni</li>
                    <li>Sunteți de acord să respectați toate regulile și politicile asociate</li>
                  </ul>
                  <p className="mt-4">
                    Dacă nu sunteți de acord, vă rugăm să nu utilizați serviciile noastre.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Serviciile oferite</h2>
                  <p>Restaurantul poate pune la dispoziție:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mese și servicii în locație</li>
                    <li>Sisteme de rezervare</li>
                    <li>Servicii de comenzi online și livrări</li>
                    <li>Meniuri, produse și informații alimentare</li>
                    <li>Oferte și campanii promoționale</li>
                  </ul>
                  <p className="mt-4">
                    Ne rezervăm dreptul de a modifica, suspenda sau întrerupe anumite servicii fără notificare prealabilă.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Rezervări</h2>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.1. Condiții generale</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Rezervările pot fi efectuate telefonic, prin site sau prin platforme partenere</li>
                    <li>Restaurantul își rezervă dreptul de a confirma, modifica sau anula rezervarea în situații excepționale</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.2. Întârzieri</h3>
                  <p>
                    În caz de întârziere mai mare de 15 minute, rezervarea poate fi eliberată dacă nu ați anunțat în prealabil.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Comenzi și livrări</h2>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.1. Acceptarea comenzii</h3>
                  <p>
                    O comandă este considerată acceptată doar după confirmarea din partea restaurantului 
                    (telefonic, SMS sau prin platformă).
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.2. Prețuri și disponibilitate</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Prețurile pot fi modificate fără notificare</li>
                    <li>Produsele sunt oferite în funcție de stocul disponibil</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.3. Refuzul comenzii</h3>
                  <p>Ne rezervăm dreptul de a refuza o comandă în situații precum:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Lipsa stocului</li>
                    <li>Imposibilitatea livrării</li>
                    <li>Suspiciune de fraudă</li>
                    <li>Date incomplete</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Plăți</h2>
                  <p>Acceptăm următoarele metode:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Numerar</li>
                    <li>Card bancar</li>
                    <li>Plata online (dacă este disponibilă)</li>
                    <li>Tichete de masă (opțional)</li>
                  </ul>
                  <p className="mt-4">
                    Toate plățile trebuie efectuate integral la primirea produselor sau înainte, 
                    în funcție de metoda aleasă.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Prețuri, erori și modificări</h2>
                  <p>
                    Deși încercăm să menținem informațiile corecte, pot exista erori de tipărire sau de afișare.
                  </p>
                  <p className="mt-2">În astfel de cazuri:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Vă vom contacta înainte de procesarea comenzii</li>
                    <li>Aveți dreptul să renunțați fără costuri</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Politica de anulare</h2>
                  <p><strong>Pentru rezervări:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Clientul este rugat să anunțe anularea cu cât mai mult timp înainte</li>
                  </ul>
                  <p className="mt-4"><strong>Pentru comenzi:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Comenzile plasate și confirmate nu pot fi anulate după ce au intrat în procesul de pregătire</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Politica privind alergenii</h2>
                  <p>
                    Meniul poate conține alergeni precum gluten, lactoză, nuci, soia etc.
                  </p>
                  <p className="mt-2">
                    Clienții cu alergii alimentare sunt rugați să informeze personalul înainte de a comanda.
                  </p>
                  <p className="mt-2 font-semibold text-black">
                    Restaurantul nu poate garanta absența completă a contaminării încrucișate.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. Responsabilitatea utilizatorului</h2>
                  <p>Utilizatorul site-ului sau clientul serviciilor restaurantului se obligă:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Să ofere informații corecte și actuale</li>
                    <li>Să nu folosească site-ul în scopuri ilegale</li>
                    <li>Să nu crească artificial volumul comenzilor sau rezervărilor</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">11. Drepturile de proprietate intelectuală</h2>
                  <p>
                    Conținutul site-ului (texte, imagini, logo-uri, design) aparține <strong>La Taifas</strong> și 
                    nu poate fi copiat, distribuit sau folosit fără acordul nostru scris.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">6.1. Zone de livrare</h3>
                  <p>Livrăm în următoarele zone din Suceava și împrejurimi:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Oraș - Centru, Zamca, G. Enescu - Comandă minimă: 100 lei</li>
                    <li>Burdujeni, Burdujeni Sat - Comandă minimă: 50 lei</li>
                    <li>Obcini, Sf. Ilie - Comandă minimă: 150 lei</li>
                    <li>Șcheia - Comandă minimă: 150 lei</li>
                    <li>Ițcani - Comandă minimă: 100 lei</li>
                    <li>Bosanci - Comandă minimă: 200 lei</li>
                    <li>Ipotești, Lisaura - Comandă minimă: 150 lei</li>
                    <li>Moara - Comandă minimă: 200 lei</li>
                    <li>Plopeni-Salcea - Comandă minimă: 150 lei</li>
                    <li>Adâncata - Comandă minimă: 120 lei</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">6.2. Program de livrare</h3>
                  <p>
                    <strong>Luni - Duminică: 9:30 - 21:30</strong>
                  </p>
                  <p className="mt-2">
                    Timpul de livrare estimat este între 30-60 de minute, în funcție de volumul de comenzi.
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">6.3. Taxă de livrare</h3>
                  <p>
                    Livrarea este <strong>gratuită</strong> pentru toate comenzile care îndeplinesc 
                    valoarea minimă specificată pentru fiecare zonă.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">12. Protecția datelor personale (GDPR)</h2>
                  <p>
                    Prelucrarea datelor personale se face conform{' '}
                    <a href="/privacy-policy" className="text-red-600 hover:text-red-700 font-semibold underline">
                      Politicii de Confidențialitate
                    </a>, disponibilă la secțiunea dedicată de pe site.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">13. Limitarea răspunderii</h2>
                  <p>Restaurantul nu poate fi responsabil pentru:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Erori ale platformelor de livrare</li>
                    <li>Întârzieri provocate de trafic sau condiții meteo</li>
                    <li>Pierderi cauzate de utilizarea improprie a site-ului</li>
                    <li>Întreruperi temporare ale serviciului</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">14. Link-uri către terți</h2>
                  <p>
                    Site-ul poate include link-uri către platforme externe (Glovo, Tazz, Bolt Food etc.).
                  </p>
                  <p className="mt-2">
                    Nu suntem responsabili pentru conținutul sau politicile acestora.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">15. Modificări ale termenilor</h2>
                  <p>
                    Ne rezervăm dreptul de a modifica acești Termeni și Condițiioricând.
                  </p>
                  <p className="mt-2">
                    Versiunea actualizată va fi publicată pe site, cu data ultimei revizuiri.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">16. Zone de livrare</h2>
                  <p>Livrăm în următoarele zone din Suceava și împrejurimi:</p>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">7.1. Produse deteriorate sau greșite</h3>
                  <p>
                    Dacă produsele livrate sunt deteriorate sau nu corespund comenzii, 
                    vă rugăm să ne contactați imediat la <strong>0753 077 063</strong>. 
                    Vom înlocui produsele sau vă vom rambursa suma achitată.
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">7.2. Termen de reclamație</h3>
                  <p>
                    Reclamațiile pot fi făcute în termen de maximum 24 de ore de la livrare.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Protecția datelor personale</h2>
                  <p>
                    Colectăm și procesăm datele dumneavoastră personale în conformitate cu GDPR 
                    și legislația română aplicabilă. Pentru detalii, consultați{' '}
                    <a href="/privacy-policy" className="text-red-600 hover:text-red-700 font-semibold underline">
                      Politica de Confidențialitate
                    </a>.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Proprietate intelectuală</h2>
                  <p>
                    Tot conținutul acestui site (texte, imagini, logo-uri, design) este proprietatea 
                    exclusivă a La Taifas și este protejat de legile drepturilor de autor. 
                    Orice utilizare neautorizată este interzisă.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. Limitarea răspunderii</h2>
                  <p>
                    La Taifas nu își asumă răspunderea pentru:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Întârzieri de livrare cauzate de forță majoră sau condiții meteo extreme</li>
                    <li>Erori în comanda plasată de către utilizator</li>
                    <li>Probleme tehnice ale site-ului în afara controlului nostru</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">11. Legea aplicabilă</h2>
                  <p>
                    Acești Termeni și Condiții sunt guvernați de legile din România. 
                    Orice litigiu va fi soluționat de instanțele competente din Suceava, România.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">12. Modificări ale termenilor</h2>
                  <p>
                    Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. 
                    Modificările vor intra în vigoare imediat după publicarea pe site. 
                    Utilizarea continuă a site-ului constituie acceptarea noilor termeni.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">17. Contact</h2>
                  <p>
                    Pentru întrebări sau sesizări, ne puteți contacta la:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                    <p><strong>Telefon:</strong> 0753 077 063</p>
                    <p><strong>Email:</strong> lataifas23@gmail.com</p>
                    <p><strong>Adresă:</strong> Calea Unirii, Burdujeni, nr 80, Suceava, Romania</p>
                    <p><strong>Program:</strong> Luni - Duminică: 9:30 - 21:30</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
