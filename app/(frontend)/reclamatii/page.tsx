import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function ReclamatiiPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6 hover:bg-red-600 hover:text-white">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la Pagina Principală
        </Link>
      </Button>

      <h1 className="text-4xl font-bold text-red-600 mb-8">Formular de Reclamații</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <p className="mb-4 text-lg">
            La <strong className="text-red-600">La Taifas</strong>, ne străduim să oferim servicii 
            de cea mai înaltă calitate. Cu toate acestea, dacă nu sunteți mulțumit de produsele 
            sau serviciile noastre, vă încurajăm să ne informați pentru a putea remedia situația.
          </p>
        </section>

        <section className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Cum puteți depune o reclamație?</h2>
          <p className="mb-4">
            Puteți depune o reclamație în următoarele moduri:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-semibold mr-2">📧</span>
              <div>
                <strong>Email:</strong> lataifas23@gmail.com
                <p className="text-sm text-gray-600">Trimiteți-ne un email detaliat cu problema întâmpinată</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">📞</span>
              <div>
                <strong>Telefon:</strong> 0753 077 063
                <p className="text-sm text-gray-600">Sunați-ne în program: Luni - Duminică, 10:00 - 22:00</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">📍</span>
              <div>
                <strong>Adresă:</strong> Calea Unirii, Burdujeni, nr 80, Suceava, Romania
                <p className="text-sm text-gray-600">Vizitați-ne personal la restaurant</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">📝</span>
              <div>
                <strong>Registrul de reclamații:</strong> Disponibil la locația noastră
                <p className="text-sm text-gray-600">Puteți completa Registrul de reclamații la sediul nostru</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Ce informații să includeți?</h2>
          <p className="mb-4">Pentru a putea rezolva rapid reclamația dumneavoastră, vă rugăm să includeți:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Numele și prenumele complet</li>
            <li>Date de contact (telefon, email, adresă)</li>
            <li>Numărul comenzii (dacă este aplicabil)</li>
            <li>Data și ora incidentului</li>
            <li>Descrierea detaliată a problemei</li>
            <li>Dovezi (fotografii, chitanță, bon fiscal)</li>
            <li>Soluția dorită</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Timpul de răspuns</h2>
          <p className="mb-4">
            Ne angajăm să răspundem la toate reclamațiile în termen de <strong>48 de ore</strong> de 
            la primirea acestora. În funcție de complexitatea situației, rezolvarea completă poate 
            dura până la <strong>10 zile lucrătoare</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Drepturile dumneavoastră</h2>
          <p className="mb-4">Conform legislației în vigoare, aveți următoarele drepturi:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dreptul de a fi informat corect și complet</li>
            <li>Dreptul de a depune reclamație</li>
            <li>Dreptul la înlocuirea sau repararea produsului defect</li>
            <li>Dreptul la restituirea contravalorii produsului (în anumite condiții)</li>
            <li>Dreptul de a sesiza ANPC în caz de nemulțumire</li>
          </ul>
        </section>

        <section className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Soluționarea alternativă a litigiilor</h2>
          <p className="mb-4">
            Dacă nu sunteți mulțumit de modul în care a fost rezolvată reclamația dumneavoastră, 
            puteți apela la:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">ANPC (Autoritatea Națională pentru Protecția Consumatorilor)</h3>
              <ul className="space-y-1 text-sm">
                <li>📧 Email: office@anpc.ro</li>
                <li>📞 Telefon: 021.9551</li>
                <li>🌐 Website: <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">anpc.ro</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Platforma SOL (Soluționarea Online a Litigiilor)</h3>
              <p className="text-sm mb-2">
                Platforma europeană pentru soluționarea online a litigiilor între consumatori și comercianți:
              </p>
              <p className="text-sm">
                🌐 <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ec.europa.eu/consumers/odr</a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Conciliator ANPC Suceava</h3>
              <ul className="space-y-1 text-sm">
                <li>📍 Adresă: Str. Vasile Alecsandri, nr. 4, Suceava</li>
                <li>📞 Telefon: 0230.520.314</li>
                <li>📧 Email: office.suceava@anpc.ro</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Angajamentul nostru</h2>
          <p className="mb-4">
            Ne luăm foarte în serios fiecare reclamație și facem tot posibilul pentru a rezolva 
            rapid și eficient orice problemă. Feedback-ul dumneavoastră ne ajută să ne îmbunătățim 
            constant serviciile.
          </p>
          <p className="font-semibold text-red-600">
            Mulțumim pentru încrederea acordată! 🙏
          </p>
        </section>

        <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-600 rounded">
          <p className="font-semibold text-red-700 mb-3 text-lg">Date Identificare Societate</p>
          <p className="font-semibold text-red-600">VINUM NOBILIS SRL</p>
          <p className="text-sm mt-2">
            <strong>Sediu Central:</strong> Municipiul Suceava, Strada Ion Niculce, nr.5, 
            Bloc 47, Scara B, Ap 11, Județul Suceava
          </p>
          <p className="text-sm"><strong>CUI:</strong> RO45346331</p>
          <p className="text-sm"><strong>Reg. Com.:</strong> J33/2276/13.12.2021</p>
          <p className="text-sm">
            <strong>Activitate Principală:</strong> 4634 - Comerț cu ridicata al băuturilor
          </p>
          <p className="text-sm mt-2"><strong>Contact:</strong> 0753 077 063 | lataifas23@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
