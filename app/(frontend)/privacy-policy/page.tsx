'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

export default function PrivacyPolicyPage() {
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
            Politica de Confidențialitate
          </h1>
          <p className="text-gray-600">
            La Taifas - Protecția datelor dumneavoastră personale
          </p>
        </div>

        {/* Content Section */}
        <Card className="border-2 border-red-100">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-2xl text-red-600">
              Informații importante despre confidențialitate
            </CardTitle>
          </CardHeader>
         <CardContent className="pt-6">
            <div className="prose max-w-none">
              <div className="space-y-6 text-gray-700">
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Data ultimei actualizări:</strong> {new Date().toLocaleDateString('ro-RO')}
                </p>

                <p className="text-base leading-relaxed">
                  La <strong>La Taifas</strong>, confidențialitatea datelor dumneavoastră este o prioritate. 
                  Această Politică de Confidențialitate explică modul în care colectăm, utilizăm și protejăm 
                  datele cu caracter personal ale clienților, vizitatorilor site-ului nostru și utilizatorilor 
                  serviciilor noastre, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).
                </p>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Operatorul de date</h2>
                  <p>Operatorul responsabil cu prelucrarea datelor este:</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p><strong>Nume:</strong> VINUM NOBILIS SRL</p>
                    <p><strong>Sediu Central:</strong> Municipiul Suceava, Strada Ion Niculce, nr.5, Bloc 47, Scara B, Ap 11, Județul Suceava</p>
                    <p><strong>CUI:</strong> RO45346331</p>
                    <p><strong>Reg. Com.:</strong> J33/2276/13.12.2021</p>
                    <p><strong>Activitate Principală:</strong> 4634 - Comerț cu ridicata al băuturilor</p>
                    <p><strong>Telefon:</strong> 0753 077 063</p>
                    <p><strong>E-mail:</strong> lataifas23@gmail.com</p>
                  </div>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Ce date personale colectăm</h2>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">2.1. Date furnizate direct de dumneavoastră:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nume și prenume</li>
                    <li>Număr de telefon</li>
                    <li>Adresă de e-mail</li>
                    <li>Adresă de livrare (pentru comenzi online)</li>
                    <li>Date pentru facturare</li>
                    <li>Mesaje sau detalii transmise prin formularul de contact, e-mail sau telefon</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">2.2. Date colectate automat:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresa IP</li>
                    <li>Informații despre device și browser</li>
                    <li>Date despre comportamentul pe site (cookies, pagini vizitate)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">2.3. Date colectate pentru recenzii sau feedback:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Opinii despre produse și servicii</li>
                    <li>Rating-uri</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Scopul prelucrării datelor</h2>
                  <p>Datele sunt colectate și utilizate pentru următoarele scopuri legitime:</p>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.1. Prestarea serviciilor</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Procesarea rezervărilor</li>
                    <li>Confirmarea comenzilor</li>
                    <li>Pregătirea și livrarea produselor</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.2. Comunicări necesare</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Notificări privind comenzi, rezervări sau modificări ale serviciilor</li>
                    <li>Răspunsuri la solicitări și întrebări</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.3. Marketing (numai cu consimțământul dumneavoastră)</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Trimiterea de oferte, promoții sau noutăți</li>
                    <li>Newsletter</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.4. Îmbunătățirea serviciilor</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Analizarea comportamentului pe site</li>
                    <li>Optimizarea experienței utilizatorilor</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Temeiul legal al prelucrării</h2>
                  <p>Prelucrăm datele dvs. personale pe baza următoarelor temeiuri:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Executarea contractului</strong> (rezervări, comenzi)</li>
                    <li><strong>Consimțământ</strong> (marketing, cookies opționale)</li>
                    <li><strong>Interes legitim</strong> (securitatea sistemelor, prevenirea fraudelor)</li>
                    <li><strong>Obligație legală</strong> (facturare, raportări obligatorii)</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Perioada de stocare</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Datele pentru comenzi:</strong> 5 ani (obligație fiscală)</li>
                    <li><strong>Datele de marketing:</strong> până la retragerea consimțământului</li>
                    <li><strong>Datele colectate prin cookies:</strong> conform termenelor din Politica de Cookies</li>
                    <li><strong>Datele din rezervări sau mesaje:</strong> max. 12 luni</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Dezvăluirea datelor către terți</h2>
                  <p>Datele pot fi transmise doar către parteneri care ne ajută în prestarea serviciilor:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Firme de livrare</li>
                    <li>Procesatori de plăți</li>
                    <li>Furnizori de servicii IT</li>
                    <li>Autorități publice, doar în condițiile legii</li>
                  </ul>
                  <p className="mt-4 font-semibold text-black">
                    Nu vindem și nu închiriem datele dumneavoastră către terți.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Securitatea datelor</h2>
                  <p>Implementăm măsuri tehnice și organizaționale, precum:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Criptarea datelor</li>
                    <li>Acces restricționat la informații</li>
                    <li>Servere securizate</li>
                    <li>Backup periodic</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Drepturile dumneavoastră conform GDPR</h2>
                  <p>Aveți următoarele drepturi:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Dreptul de acces la date</li>
                    <li>Dreptul la rectificare</li>
                    <li>Dreptul la ștergere („dreptul de a fi uitat")</li>
                    <li>Dreptul la restricționarea prelucrării</li>
                    <li>Dreptul la portabilitatea datelor</li>
                    <li>Dreptul de opoziție (inclusiv pentru marketing)</li>
                    <li>Dreptul de a retrage consimțământul în orice moment</li>
                    <li>Dreptul de a depune o plângere la ANSPDCP</li>
                  </ul>
                  <p className="mt-4">
                    Pentru exercitarea acestor drepturi, ne puteți contacta la:{' '}
                    <a href="mailto:lataifas23@gmail.com" className="text-red-600 hover:text-red-700 font-semibold">
                      lataifas23@gmail.com
                    </a>
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Cookie-uri</h2>
                  <p>
                    Site-ul nostru utilizează cookie-uri necesare pentru funcționare, dar și cookie-uri 
                    opționale (analiză, marketing), doar cu acordul utilizatorului.
                  </p>
                  <p className="mt-2 italic text-gray-600">
                    Vezi Politica de Cookies pentru detalii.
                  </p>

                  <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. Modificări ale Politicii</h2>
                  <p>
                    Ne rezervăm dreptul de a actualiza această Politică. Orice modificare va fi publicată 
                    pe site cu data actualizării.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
