'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-4 border-red-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Meniul Restaurantului</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Închide"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold text-red-600">I. ANTREURI</h3>
            <ol>
              <li>
                <strong>King sandwich 300 gr – 31 lei</strong>
                <br />
                Pâine toast 60 gr., cremă Philadelphia 40 gr, salată verde 20 gr., roșii 20 gr., șnitzel de pui 100 gr., branză Ceddar 30 gr, bacon 20 gr., ceapă roșie 10 grame, sare 2 gr, piper 1 gr.
              </li>
              <li>
                <strong>Bruschette cu roșii și busuioc 300 gr. – 22 lei</strong>
                <br />
                Pâine baghetă 150 gr, roșii 130 gr, busuioc 3 gr, usturoi 4 gr, sare 3 gr, piper 2 gr, lămâie 3 gr, ulei 5 ml.
              </li>
              <li>
                <strong>Panini cu șuncă și piept de pui 300 gr – 29,5 lei</strong>
                <br />
                Pâine pe vatră 80 gr, piept de pui 70 gr, șuncă 30 gr, mozzarella 50 gr, roșii 20 gr, castraveți 20 gr, salată 20 gr, maioneză 10 gr, sare 2 gr, piper 1 gr
              </li>
              <li>
                <strong>Salată cu piept de pui și dressing de iaurt 350 gr – 35,5 lei</strong>
                <br />
                Piept de pui 100 gr, salată verde 100 gr, roșii 30 gr, castraveți 25 gr, ardei gras 20 gr, ceapă 10 gr, crutoane 15 gr, dressing 50 gr, piper 1 gr
              </li>
              <li>
                <strong>Salată La Taifas 350 gr – 32 lei</strong>
                <br />
                Proscciuto 30 gr, salată verde 100 gr, roșii 30 gr., castraveți 25 gr, măsline 10 gr, ceapă roșie 10 gr, ou 60 gr, telemea 65 gr, dressing 20 ml
              </li>
              <li>
                <strong>Salată cu ton 350 gr. – 35 lei</strong>
                <br />
                Ton 70 gr, salată verde 100 gr, roșii 30 gr, castraveți 25 gr, ceapă roșie 10 gr, porumb 15 gr, ou 60 gr, fasole roșie 15 gr, lamaie 25 gr, sare 2 gr, piper 1 gr
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">II. Micul Dejun</h3>
            <ol>
              <li>
                <strong>Omletă La Taifas 350 gr/100 gr /50 gr – 31 lei ( inclus salată și pâine)</strong>
                <br />
                Ouă 3 buc, smântână de gătit 50 gr, șuncă 50 gr, ciuperci 20 gr, ardei 20 gr, dovlecei 20 gr, cremă de brânză 60 gr, salată asortată 100 gr, sare 2 gr, piper 1 gr, pâine pe vatră 50 gr.
              </li>
              <li>
                <strong>Omletă țărănească 350 gr/100 gr/50 gr – 30 lei ( inclus salată și pâine)</strong>
                <br />
                Ouă 3 buc, smântână de gătit 50 gr, bacon 30 gr, mozzarella 60 gr, ceapă 10gr, ardei gras 20 gr, ciuperci 20 gr, salată asortată 100 gr, sare 2 gr, piper 1 gr, pâine pe vatră 50 gr
              </li>
              <li>
                <strong>Mic dejun tradițional 300 gr/100 gr/50 gr – 28,5 lei ( inclus salată și pâine)</strong>
                <br />
                Ouă 2 buc, bacon prajit 50 gr, brânză sărată 130 gr, salată asortată 100 gr, pâine pe vatră 50 gr
              </li>
              <li>
                <strong>Cuib de cartofi cu bacon , brânză și ou 350 gr/50 gr – 31 lei ( inclus pâine)</strong>
                <br />
                Cartofi prăjiți 100 gr, bacon 50 gr, telemea de vaci 80 gr, ouă 2 buc, sare 3 gr, piper 2 gr, pâine pe vatră 50 gr
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">III. CIORBE ȘI SUPE</h3>
            <p>(pentru tipul de ciorba ce se poate servi, consultați chelnerul)</p>
            <ol>
              <li>
                <strong>Ciorbă de legume 450 gr – 23 lei</strong>
                <br />
                Cartofi 20 gr, morcov 15 gr., țelină 15 gr, borș 5 ml . ardei gras 15 gr, ceapă 10 gr, pasta tomate 10 gr., patrunjel 5 gr, păstârnac 15 gr, supă 336 ml, sare 3 gr., piper 1 gr
              </li>
              <li>
                <strong>Ciorbă de văcuță 450 gr- 28 lei</strong>
                <br />
                Carne de văcuță 60 gr, cartofi 10 gr, morcov 10 gr, țelină 10 gr, ardei gras 10 gr, ceapă 5 gr, pastă de tomate 10 gr, păstârnac 10 gr, pătrunjel 5 gr, leuștean 5 gr, sare 3 gr, piper 2 gr, borș de putină 5 ml., supă 305 ml.
              </li>
              <li>
                <strong>Supa de găină 450 gr – 25 lei</strong>
                <br />
                piept de pui 80 gr, morcov 15 gr, tăiței 60 gr, pătrunjel 10 gr, supă 280 ml, sare 3 gr, piper 2 gr.
              </li>
              <li>
                <strong>Ciorbă de purcel 450 gr – 28 lei</strong>
                <br />
                Carne de purcel 70 gr, morcov 10 gr, țelină 10 gr, ceapă 10 gr, păstârnac 10 gr, ardei gras 10 gr, orez 15 gr, pastă de tomate 10 gr, pătrunjel 5 gr, leuștean 5 gr, sare 3 gr, piper 2 gr, borș de putină 10 ml., supă 280 ml.
              </li>
              <li>
                <strong>Ciorbă rădăuțeană 450 GR – 28LEI</strong>
                <br />
                piept de pui 100 gr, smântână 70 gr, galbenuș de ou 50 gr, usturoi 10 gr, oțet 3 ml, sare 4 gr, piper 2 gr, amidon 3 gr, supă de pui 250 ml., supă 208 ml
              </li>
              <li>
                <strong>Ciorbă de fasole cu afumătură 480 gr – 28</strong>
                <br />
                Scăriță afumată 100 gr, fasole 50 gr, morcov 20 gr, bulion 10 gr, ceapă 10 gr, țelină 15 gr, leuștean 5 gr, borș 10 gr, supă 225 ml, sare 3 gr, piper 2 gr.
                <br />
                * fiecare produs include, cu opțiuni : ceapă roșie 100 gr/1 ardei 10 gr/, smântână 50 ml.
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">IV. PLATOURI</h3>
            <ol>
              <li>
                <strong>Platou tradițional cu scrijele 850 gr – 54 lei</strong>
                <br />
                Cartofi scrijele 350 gr, slăninuță 150 gr, telemea 150 gr, ceapă 100 gr, iaurt 100 gr, sare 5 gr.
              </li>
              <li>
                <strong>Tigaie picantă cu pui și legume 450 gr – 45 lei</strong>
                <br />
                Piept de pui 200 gr, ceapă 25 gr, vinete 15 gr, dovlecei 15 gr, ardei gras 15 gr, ciuperci 20 gr, suc de roșii 150 ml, fulgi de chilly 2 gr, sare 5 gr, piper 3 grame
              </li>
              <li>
                <strong>Coaste de porc 850 gr - 69 lei</strong>
                <br />
                Coaste porc 500 gr, cartofi wedges 200 gr, usturoi 5 gr, patrunjel verde 1 gr, dulceață de ardei iute 10 gr, sos Calypso 60 gr, ulei 5 ml, castraveți murați 65 gr, sare 3 gr, piper 1 gr
              </li>
              <li>
                <strong>Platou Buquet 2400 gr - 5 pers – 265 lei ( comandă cu cel puțin 1 h inainte)</strong>
                <br />
                Crispy 400 gr, mititei 200 gr, carnaciori 200, inele de ceapa 100 gr, aripioare 400 gr, nuggets n 400 gr, ardei capia 200 gr, cartofi prajiti pai 200 gr, cartofi wedges 200 gr, 2x50 gr sosuri (la alegere).
              </li>
              <li>
                <strong>Platou de bere/2 pers 800 gr/80 gr – 99 lei ( comandă cu cel puțin 1 h inainte)</strong>
                <br />
                Aripioare picante 200 gr, pui crispy 200 gr, coaste de pui 200 gr, cartofi prajiți 200 gr, sos Calypso 80 gr
              </li>
              <li>
                <strong>Platou de bere/1 pers 400 gr/40 gr – 54 lei ( comandă cu cel puțin 1 h inainte)</strong>
                <br />
                Aripioare picante 100 gr, pui crispy 100 gr, coaste de pui 100 gr, cartofi prajiți 100 gr, sos Calypso 40 gr
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">VI. PLATOURI EVENIMENTE</h3>
            <ol>
              <li>
                <strong>Platou rece de pește 2500 gr - 270 lei</strong>
                <br />
                Creveți pane 250 gr, calamari pane 200 gr, bruschete cu somon fumme 200 gr,coșuleț cu salată de ton 200 gr, gujoane de șalău 150 gr, bruschete cu salată de icre 200 gr, frigărui cu pește marinat și măsline 200 gr, pește afumat 150 gr, roșii cerry 100 gr, castraveți 100 gr, măsline verzi 100 gr, tofu cu icre roșii 150 gr.
              </li>
              <li>
                <strong>Platou cald de pește 2000 gr - 350 lei</strong>
                <br />
                Somon file 250 gr, file de păstrăv 250 gr, calamar în sos de roșii 200 gr; caracatiță la grătar 200 gr, cartofi gratinați 300 gr, ciuperci champinion cu usturoi 250 gr, legume la grătar : vinete, dovlecei, ardei gras 400 gr, focaccia cu ulei de măsline și oregano 150 gr.
              </li>
              <li>
                <strong>Platou de post 1500 gr - 180 lei</strong>
                <br />
                Dovlecei pane 150 gr, vinete pane 150 gr, ciuperci pane 150 gr, tofu la grătar 150 gr, inele de ceapă pane 150 gr, bruschette cu zacuscă 100 gr, șnițel vegan 100 gr, roșii 100 gr, castraveți 100 gr, măsline 100 gr, rulou vegetal cu tortilla și pateu 150 gr, ardei gras 100 gr.
              </li>
              <li>
                <strong>Platou fast-food 1000 gr – 130 lei</strong>
                <br />
                Pui crispy 250 gr, aripioare 300 gr, inele de ceapa 100 gr, cartofi prăjiși 200 gr, mozzarela pane 150 gr
              </li>
              <li>
                <strong>Platou aperitiv 1500 gr – 210 lei</strong>
                <br />
                Coșuleț foitaj cu salată de pui 250 gr, inele de ceapă pane 100 gr, pui crispy 200 gr, frigărui de mozzarela și roșii cherry 250 gr, salam crud-uscat 150 gr, rulou de șuncă cu telemea 200 gr, bruschete cu cremă de brânză 200 gr, roșii cherry 100 gr, castraveți 100 gr, măsline 100 gr, pizzete cu peperoni 200 gr, rulou de bacon cu ardei gras 150 gr.
              </li>
              <li>
                <strong>Platou brânzeturi 1500 gr – 230 lei</strong>
                <br />
                Gorgonzola 200 gr, camembert 200 gr, cașcaval afumat 200 gr, mozzarella 200 gr, mozzarella boconcini 200 gr, parmezan 200 gr, struguri 100 gr, grisine 50 gr, prosciutto 100 gr, fructe confiate 50 gr
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">V. UNA, ALTA</h3>
            <ol>
              <li>
                <strong>Mixt grill 550 GR – 55 LEI</strong>
                <br />
                Piept de pui 125 gr, mici 150 gr, ceafă 125 gr, cartofi prășiți 100 gr, muștar 50 gr.
              </li>
              <li>
                <strong>Crispy strips cu cartofi prăjiți 300 gr/150gr/50 gr – 37,5 lei</strong>
                <br />
                Piept de pui 200 gr, făină 10 gr, ou 50 gr, fulgi de porump 40 gr, cartofi 150 gr, sos de iaurt cu usturoi 50 gr
              </li>
              <li>
                <strong>Șnitzel de pui parizian 250 gr – 32 lei</strong>
                <br />
                Piept de pui 170 gr, făină 10 gr, ou 40 gr, sare 2 grame, piper 1 gr
              </li>
              <li>
                <strong>Aripioare crocante cu sos de usturoi 300 gr/150 gr/60 gr – 39,5 lei</strong>
                <br />
                Aripioare de pui 300 gr, cartofi 150 gr, sos de usturoi 60 gr, amidon 3 gr, faină 3 gr, boia dulce 2 gr, usturoi 3 gr, piper 2 gr, sare 3 gr
              </li>
              <li>
                <strong>Quesadilla cu pui și sos de roșii cu busuioc 350/70 – 28,5 lei</strong>
                <br />
                Lipie 90 gr, piept de pui 100 gr, mozzarela 100 gr, porumb boabe 30 gr, ardei gras 30 gr, sos de roșii 70 gr,
              </li>
              <li>
                <strong>Wrap de pui 300 gr – 31 lei</strong>
                <br />
                Lipie 90 gr, pui crispy 100 gr, salată verde 20 gr, roșii 20 gr, castraveți 20 gr, ceapă 10 gr, sos de iaurt 40 gr
              </li>
              <li>
                <strong>Tocinel La Taifas 410 gr/60 gr – 42 lei</strong>
                <br />
                Cartofi 150 gr, făină 20 gr, piept de pui 105 gr, mozzarella 70 gr, ou 60 gr, sare 5 gr, piper 2 gr, iaurt 60 gr
              </li>
              <li>
                <strong>Ciolan copt-afumat cu cartofi 800 gr/300 gr/100 gr – 99 lei</strong>
                <br />
                Ciolan afumat 800 gr, cartofi wedges 200 gr, usturoi 30gr, pătrunjel 5 gr, parmezan 30 gr, sare 5 gr, ulei 10 ml, dulceață de ardei iute 20 gr, castraveți murați 100 gr.
              </li>
              <li>
                <strong>Shaorma LA TAIFAS 700 gr – 42 lei</strong>
                <br />
                carne kebab pui 200 gr, cartofi prăjiți 200 gr, salată verde 60 gr, varză 100 gr, roșii 50 gr, ceapă 20 gr, sos kebab 70 gr
              </li>
              <li>
                <strong>Kebab la lipie – 700 gr – 44 lei</strong>
                <br />
                Lipie 15 gr., carne kebab pui 200 gr., cartofi prăjiți 200 gr., salată verde 60 gr, varză 80 gr, roșii 50 gr, ceapă 25 gr, sos kebab 70 gr.
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">VI. GRILL</h3>
            <ol>
              <li>
                <strong>Piept de pui la gratar 200 gr – 32 lei</strong>
                <br />
                Piept de pui 200 gr, sare 3 gr, piper 1 gr, boia 1 gr, ulei 5 ml
              </li>
              <li>
                <strong>Ceafă la grătar 200 gr – 35,5 lei</strong>
                <br />
                Ceafă de porc 200 gr, sare 3 gr, piper 1 gr, boia 1 gr, ulei 5 ml
              </li>
              <li>
                <strong>Mititei 50 gr – 6 lei</strong>
                <br />
                Mititei amestec 50 gr/buc
              </li>
              <li>
                <strong>Cârnați tradiționali germani 200 gr – 25 lei</strong>
                <br />
                Cârnați tradiționali Turinger 200 gr, sare 3 gr, piper 1 gr
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">VII. PASTE</h3>
            <ol>
              <li>
                <strong>Penne Al forno 400 gr – 42 lei</strong>
                <br />
                Penne 100 gr, ceapă 10 gr, ardei 15 gr, piept de pui 85 gr, bacon 45 gr, suc de roșii 50 ml, Grand Cucina 30 ml, mozzarela 40 gr, parmezan 25 gr, sare 3 gr, piper 1 gr
              </li>
              <li>
                <strong>Spaghete Carbonara 400 gr – 42 lei</strong>
                <br />
                Spaghete 100 gr, pancetta 60 gr, permezan 100 gr, Grand Cucina 80 gr, galbenuș 50 gr, sare 3 gr, piper 1 gr
              </li>
              <li>
                <strong>Tagliatelle cu creveți 400 gr – 44 lei</strong>
                <br />
                Tagliatelle 100 gr, creveți 100 gr, parmezan 100 gr, roșii 60 gr, vin alb 15 gr, usturoi 5 gr, ulei de măsline 20 ml, busuioc 2 gr
              </li>
              <li>
                <strong>Paste Quattro Formaggio – 400 gr – 44 lei</strong>
                <br />
                Penne/ spaghete 100 gr, parmezan 60 gr, gorgonzola 60 gr, branza gouda 60 gr, branza emental 60 gr, gran cuccina 60 gr, sare, piper
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">VIII. BURGERI</h3>
            <ol>
              <li>
                <strong>Cheeseburger 450gr/80 gr– 43 lei</strong>
                <br />
                Chiflă 80 gr, carne de vită 130 gr, castraveți murați 20 gr, bacon 50 gr, brânză ceddar 30 gr, salată verde 20 gr, roșii 50 gr, ceapă roșie murată 20 gr, sos Calipso( roze) 25 gr, sos de usturoi 25 gr., sare 3 gr, piper 1 gr, cartofi prajiti 80 gr.
              </li>
              <li>
                <strong>Crispy chicken burger 400 gr/80 gr – 41 lei</strong>
                <br />
                Chiflă 80 gr, pui crispy 150 gr, kechup 30 gr, maioneză 30 gr, salată 20 gr, roșii 50 gr, mozzarella 40 gr, sare 3, piper 1, cartofi prajiti 80 gr
              </li>
              <li>
                <strong>La Taifas King Burger 450 gr/80 gr – 46 lei</strong>
                <br />
                Chiflă 80 gr, plescoviță 120 gr, bacon 50 gr, ou 50 gr, branza ceddar 30 gr, salată verde 20 gr, roșii 50 gr, sos Calipso 50 gr, sare, piper, cartofi prajiti 80 gr.
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">IX. SALATE de ÎNSOȚIRE</h3>
            <ol>
              <li>
                <strong>Salată asortată 250 gr – 19,5 lei</strong>
                <br />
                Salată verde 100 gr, roșii 60 gr, castraveți 50 gr, ardei gras 30 gr, ceapă roșie 10 gr
              </li>
              <li>
                <strong>Salată de varză 200 gr – 13 lei</strong>
                <br />
                Varză 200 gr, ulei 10 ml, oțet 5 ml, sare 3 gr
              </li>
              <li>
                <strong>Salată de murături 200 gr – 17,5 lei</strong>
                <br />
                Castraveți 50 gr, gogoșari 50 gr, conopida 50 gr, gogonele 50 gr
              </li>
              <li>
                <strong>Salată de roșii cu telemea 200 gr – 19,5 lei</strong>
                <br />
                Roșii 100 gr, telemea100 gr, ulei 10 ml, sare3 gr
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">X. GARNITURI</h3>
            <ol>
              <li>
                <strong>Cartofi prăjiți 200 gr – 12,5 lei</strong>
                <br />
                Cartofi prăjiți 200 gr, sare 3 gr
              </li>
              <li>
                <strong>Cartofi Wedges 200 gr – 16 lei</strong>
                <br />
                Cartofi wedges prajiți 200 gr, sare 3 gr
              </li>
              <li>
                <strong>Cartofi țărănești 200 gr – 17,5 lei</strong>
                <br />
                Cartofi fierți 100 gr, bacon 50 gr, ceapă 15 gr, ardei gras 20 gr, usturoi 10 gr, patrunjel, mărar 3 gr, sare 3 gr, piper 1 gr
              </li>
              <li>
                <strong>Cartofi cu mozzarela 250 gr – 16,5 lei</strong>
                <br />
                Cartofi copți 150 gr, mozzarela 100 gr, sare 3 gr
              </li>
              <li>
                <strong>Cartofi gratinați cu gorgonzola( post și frupt) 230 gr – 22 lei</strong>
                <br />
                Cartofi gratinați 210 gr, gorgonzola 50 gr, usturoi 5 gr, pătrunjel frunze 2 gr, sare 2 gr, ulei 3 ml
              </li>
              <li>
                <strong>Legume la grătar 250 gr – 22 lei</strong>
                <br />
                Vinete 60 gr, dovlecei 60 gr, ciuperci 60 gr, ardei gras 30 gr, roșii 20 gr, ceapă roșie 20 gr, sare3 gr,
              </li>
            </ol>

            <h3 className="text-xl font-bold text-red-600 mt-6">XI. PIZZA ( ingredientele ce compun produsul final sunt menționate în crud )</h3>
            <ol>
              <li>
                <strong>Pizza LA TAIFAS 650 gr – 43 lei</strong>
                <br />
                Blat de pizza 270 gr, sos de pizza 50 gr,mozzarella 120 gr, sunca 70 gr, salam 50 gr, bacon 40 gr, cabanos 30 gr, telemea 20 gr.
              </li>
              <li>
                <strong>Pizza CAPRICIOSA 650 gr – 39 lei</strong>
                <br />
                Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 80 gr,
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;