'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Plus, Upload } from 'lucide-react';

// Structura categoriilor din meniu
const menuCategories = [
  {
    id: 'antreuri',
    name: 'ANTREURI',
    items: [
      { name: 'King sandwich', details: '300 gr – 31 lei', ingredients: 'Pâine toast 60 gr., cremă Philadelphia 40 gr, salată verde 20 gr., roșii 20 gr., șnițzel de pui 100 gr., branză Ceddar 30 gr, bacon 20 gr., ceapă roșie 10 grame, sare 2 gr, piper 1 gr.' },
      { name: 'Bruschette cu roșii și busuioc', details: '300 gr. – 22 lei', ingredients: 'Pâine baguetă 150 gr, roșii 130 gr, busuioc 3 gr, usturoi 4 gr, sare 3 gr, piper 2 gr, lămâie 3 gr, ulei 5 ml.' },
      { name: 'Panini cu șuncă și piept de pui', details: '300 gr – 29,5 lei', ingredients: 'Pâine pe vatră 80 gr, piept de pui 70 gr, șuncă 30 gr, mozzarella 50 gr, roșii 20 gr, castraveți 20 gr, salată 20 gr, maionează 10 gr, sare 2 gr, piper 1 gr' },
      { name: 'Salată cu piept de pui și dressing de iaurt', details: '350 gr – 35,5 lei', ingredients: 'Piept de pui 100 gr, salată verde 100 gr, roșii 30 gr, castraveți 25 gr, ardei gras 20 gr, ceapă 10 gr, crutoane 15 gr, dressing 50 gr, piper 1 gr' },
      { name: 'Salată La Taifas', details: '350 gr – 32 lei', ingredients: 'Proscciuto 30 gr, salată verde 100 gr, roșii 30 gr., castraveți 25 gr, măsline 10 gr, ceapa roșie 10 gr, ou 60 gr, telemea 65 gr, dressing 20 ml' },
      { name: 'Salată cu ton', details: '350 gr. – 35 lei', ingredients: 'Ton 70 gr, salată verde 100 gr, roșii 30 gr, castraveți 25 gr, ceapă roșie 10 gr, porumb 15 gr, ou 60 gr, fasole roșie 15 gr, lamaie 25 gr, sare 2 gr, piper 1 gr' }
    ]
  },
  {
    id: 'mic-dejun',
    name: 'MICUL DEJUN',
    items: [
      { name: 'Omletă La Taifas', details: '350 gr/100 gr /50 gr – 31 lei ( inclus salată și pâine)', ingredients: 'Ouă 3 buc, smântână de gătit 50 gr, șuncă 50 gr, ciuperci 20 gr, ardei 20 gr, dovlecei 20 gr, cremă de branză 60 gr, salată asortată 100 gr, sare 2 gr, piper 1 gr, pâine pe vatră 50 gr.' },
      { name: 'Omletă țărănească', details: '350 gr/100 gr/50 gr – 30 lei ( inclus salată și pâine)', ingredients: 'Ouă 3 buc, smântână de gătit 50 gr, bacon 30 gr, mozzarella 60 gr, ceapă 10gr, ardei gras 20 gr, ciuperci 20 gr, salată asortată 100 gr, sare 2 gr, piper 1 gr, pâine pe vatră 50 gr' },
      { name: 'Mic dejun tradițional', details: '300 gr/100 gr/50 gr – 28,5 lei ( inclus salată și pâine)', ingredients: 'Ouă 2 buc, bacon prajit 50 gr, branză sărată 130 gr, salată asortată 100 gr, pâine pe vatră 50 gr' },
      { name: 'Cuib de cartofi cu bacon, branză și ou', details: '350 gr/50 gr – 31 lei ( inclus pâine)', ingredients: 'Cartofi prăjiți 100 gr, bacon 50 gr, telemea de vaci 80 gr, ouă 2 buc, sare 3 gr, piper 2 gr, pâine pe vatră 50 gr' }
    ]
  },
  {
    id: 'ciorbe',
    name: 'CIORBE ȘI SUPE',
    note: '(pentru tipul de ciorba ce se poate servi, consultați chelnerul)',
    items: [
      { name: 'Ciorbă de legume', details: '450 gr – 23 lei', ingredients: 'Cartofi 20 gr, morcov 15 gr., țelină 15 gr, borș 5 ml. ardei gras 15 gr, ceapă 10 gr, pasta tomate 10 gr., pătrunjel 5 gr, păstârnac 15 gr, supă 336 ml, sare 3 gr., piper 1 gr' },
      { name: 'Ciorbă de văcuță', details: '450 gr- 28 lei', ingredients: 'Carne de văcuță 60 gr, cartofi 10 gr, morcov 10 gr, țelină 10 gr, ardei gras 10 gr, ceapă 5 gr, pastă de tomate 10 gr, păstârnac 10 gr, pătrunjel 5 gr, leuștean 5 gr, sare 3 gr, piper 2 gr, borș de putină 5 ml., supă 305 ml.' },
      { name: 'Supa de găină', details: '450 gr – 25 lei', ingredients: 'piept de pui 80 gr, morcov 15 gr, tăiței 60 gr, pătrunjel 10 gr, supă 280 ml, sare 3 gr, piper 2 gr.' },
      { name: 'Ciorbă de purcel', details: '450 gr – 28 lei', ingredients: 'Carne de purcel 70 gr, morcov 10 gr, țelină 10 gr, ceapă 10 gr, păstârnac 10 gr, ardei gras 10 gr, orez 15 gr, pastă de tomate 10 gr, pătrunjel 5 gr, leuștean 5 gr, sare 3 gr, piper 2 gr, borș de putină 10 ml., supă 280 ml.' },
      { name: 'Ciorbă rădăuțeană', details: '450 GR – 28LEI', ingredients: 'piept de pui 100 gr, smântână 70 gr, galbenuș de ou 50 gr, usturoi 10 gr, oțet 3 ml, sare 4 gr, piper 2 gr, amidon 3 gr, supă de pui 250 ml., supă 208 ml' },
      { name: 'Ciorbă de fasole cu afumătură', details: '480 gr – 28 lei', ingredients: 'Scăriță afumată 100 gr, fasole 50 gr, morcov 20 gr, bulion 10 gr, ceapă 10 gr, țelină 15 gr, leuștean 5 gr, borș 10 gr, supă 225 ml, sare 3 gr, piper 2 gr.' }
    ]
  },
  {
    id: 'platouri',
    name: 'PLATOURI',
    items: [
      { name: 'Platou tradițional cu scrijele', details: '850 gr – 54 lei', ingredients: 'Cartofi scrijele 350 gr, slăninuță 150 gr, telemea 150 gr, ceapă 100 gr, iaurt 100 gr, sare 5 gr.' },
      { name: 'Tigaie picantă cu pui și legume', details: '450 gr – 45 lei', ingredients: 'Piept de pui 200 gr, ceapă 25 gr, vinete 15 gr, dovlecei 15 gr, ardei gras 15 gr, ciuperci 20 gr, suc de roșii 150 ml, fulgi de chilly 2 gr, sare 5 gr, piper 3 grame' },
      { name: 'Coaste de porc', details: '850 gr - 69 lei', ingredients: 'Coaste porc 500 gr, cartofi wedges 200 gr, usturoi 5 gr, pătrunjel verde 1 gr, dulceață de ardei iute 10 gr, sos Calypso 60 gr, ulei 5 ml, castraveți murați 65 gr, sare 3 gr, piper 1 gr' },
      { name: 'Platou Buquet', details: '2400 gr - 5 pers – 265 lei ( comandă cu cel puțin 1 h inainte)', ingredients: 'Crispy 400 gr, mititei 200 gr, carnaciori 200, inele de ceapa 100 gr, aripioare 400 gr, nuggets n 400 gr, ardei capia 200 gr, cartofi prajiti pai 200 gr, cartofi wedges 200 gr, 2x50 gr sosuri (la alegere).' },
      { name: 'Platou de bere/2 pers', details: '800 gr/80 gr – 99 lei ( comandă cu cel puțin 1 h inainte)', ingredients: 'Aripioare picante 200 gr, pui crispy 200 gr, coaste de pui 200 gr, cartofi prajiti 200 gr, sos Calypso 80 gr' },
      { name: 'Platou de bere/1 pers', details: '400 gr/40 gr – 54 lei ( comandă cu cel puțin 1 h inainte)', ingredients: 'Aripioare picante 100 gr, pui crispy 100 gr, coaste de pui 100 gr, cartofi prajiti 100 gr, sos Calypso 40 gr' }
    ]
  },
  {
    id: 'platouri-evenimente',
    name: 'PLATOURI EVENIMENTE',
    items: [
      { name: 'Platou rece de pește', details: '2500 gr - 270 lei', ingredients: 'Creveți pane 250 gr, calamari pane 200 gr, bruschete cu somon fumme 200 gr, coșuleț cu salată de ton 200 gr, gujoane de șalău 150 gr, bruschete cu salată de icre 200 gr, frigărui cu pește marinat și măsline 200 gr, pește afumat 150 gr, roșii cerry 100 gr, castraveți 100 gr, măsline verzi 100 gr, tofu cu icre roșii 150 gr.' },
      { name: 'Platou cald de pește', details: '2000 gr - 350 lei', ingredients: 'Somon file 250 gr, file de păstrăv 250 gr, calamar în sos de roșii 200 gr; caracatiță la grătar 200 gr, cartofi gratinați 300 gr, ciuperci champinion cu usturoi 250 gr, legume la grătar : vinete, dovlecei, ardei gras 400 gr, focaccia cu ulei de măsline și oregano 150 gr.' },
      { name: 'Platou de post', details: '1500 gr - 180 lei', ingredients: 'Dovlecei pane 150 gr, vinete pane 150 gr, ciuperci pane 150 gr, tofu la grătar 150 gr, inele de ceapă pane 150 gr, bruschette cu zacuscă 100 gr, șnițel vegan 100 gr, roșii 100 gr, castraveți 100 gr, măsline 100 gr, rulou vegetal cu tortilla și pateu 150 gr, ardei gras 100 gr.' },
      { name: 'Platou fast-food', details: '1000 gr – 130 lei', ingredients: 'Pui crispy 250 gr, aripioare 300 gr, inele de ceapa 100 gr, cartofi prăjiți 200 gr, mozzarela pane 150 gr' },
      { name: 'Platou aperitiv', details: '1500 gr – 210 lei', ingredients: 'Coșuleț foitaj cu salată de pui 250 gr, inele de ceapă pane 100 gr, pui crispy 200 gr, frigărui de mozzarela și roșii cherry 250 gr, salam crud-uscat 150 gr, rulou de șuncă cu telemea 200 gr, bruschete cu cremă de brânză 200 gr, roșii cherry 100 gr, castraveți 100 gr, măsline 100 gr, pizzete cu peperoni 200 gr, rulou de bacon cu ardei gras 150 gr.' },
      { name: 'Platou brânzeturi', details: '1500 gr – 230 lei', ingredients: 'Gorgonzola 200 gr, camembert 200 gr, cașcaval afumat 200 gr, mozzarella 200 gr, mozzarella boconcini 200 gr, parmezan 200 gr, struguri 100 gr, grisine 50 gr, prosciutto 100 gr, fructe confiate 50 gr' }
    ]
  },
  {
    id: 'una-alta',
    name: 'UNA, ALTA',
    items: [
      { name: 'Mixt grill', details: '550 GR – 55 LEI', ingredients: 'Piept de pui 125 gr, mici 150 gr, ceafă 125 gr, cartofi prășiți 100 gr, muștar 50 gr.' },
      { name: 'Crispy strips cu cartofi prăjiți', details: '300 gr/150gr/50 gr – 37,5 lei', ingredients: 'Piept de pui 200 gr, făină 10 gr, ou 50 gr, fulgi de porumb 40 gr, cartofi 150 gr, sos de iaurt cu usturoi 50 gr' },
      { name: 'Șnițzel de pui parizian', details: '250 gr – 32 lei', ingredients: 'Piept de pui 170 gr, făină 10 gr, ou 40 gr, sare 2 grame, piper 1 gr' },
      { name: 'Aripioare crocante cu sos de usturoi', details: '300 gr/150 gr/60 gr – 39,5 lei', ingredients: 'Aripioare de pui 300 gr, cartofi 150 gr, sos de usturoi 60 gr, amidon 3 gr, făină 3 gr, boia dulce 2 gr, usturoi 3 gr, piper 2 gr, sare 3 gr' },
      { name: 'Quesadilla cu pui și sos de roșii cu busuioc', details: '350/70 – 28,5 lei', ingredients: 'Lipie 90 gr, piept de pui 100 gr, mozzarela 100 gr, porumb boabe 30 gr, ardei gras 30 gr, sos de roșii 70 gr' },
      { name: 'Wrap de pui', details: '300 gr – 31 lei', ingredients: 'Lipie 90 gr, pui crispy 100 gr, salată verde 20 gr, roșii 20 gr, castraveți 20 gr, ceapă 10 gr, sos de iaurt 40 gr' },
      { name: 'Tocinel La Taifas', details: '410 gr/60 gr – 42 lei', ingredients: 'Cartofi 150 gr, făină 20 gr, piept de pui 105 gr, mozzarella 70 gr, ou 60 gr, sare 5 gr, piper 2 gr, iaurt 60 gr' },
      { name: 'Ciolan copt-afumat cu cartofi', details: '800 gr/300 gr/100 gr – 99 lei', ingredients: 'Ciolan afumat 800 gr, cartofi wedges 200 gr, usturoi 30gr, pătrunjel 5 gr, parmezan 30 gr, sare 5 gr, ulei 10 ml, dulceață de ardei iute 20 gr, castraveți murați 100 gr.' },
      { name: 'Shaorma LA TAIFAS', details: '700 gr – 42 lei', ingredients: 'carne kebab pui 200 gr, cartofi prăjiți 200 gr, salată verde 60 gr, varză 100 gr, roșii 50 gr, ceapă 20 gr, sos kebab 70 gr' },
      { name: 'Kebab la lipie', details: '700 gr – 44 lei', ingredients: 'Lipie 15 gr., carne kebab pui 200 gr., cartofi prăjiți 200 gr., salată verde 60 gr, varză 80 gr, roșii 50 gr, ceapă 25 gr, sos kebab 70 gr.' }
    ]
  },
  {
    id: 'grill',
    name: 'GRILL',
    items: [
      { name: 'Piept de pui la gratar', details: '200 gr – 32 lei', ingredients: 'Piept de pui 200 gr, sare 3 gr, piper 1 gr, boia 1 gr, ulei 5 ml' },
      { name: 'Ceafă la grătar', details: '200 gr – 35,5 lei', ingredients: 'Ceafă de porc 200 gr, sare 3 gr, piper 1 gr, boia 1 gr, ulei 5 ml' },
      { name: 'Mititei', details: '50 gr – 6 lei', ingredients: 'Mititei amestec 50 gr/buc' },
      { name: 'Cârnați tradiționali germani', details: '200 gr – 25 lei', ingredients: 'Cârnați tradiționali Turinger 200 gr, sare 3 gr, piper 1 gr' }
    ]
  },
  {
    id: 'paste',
    name: 'PASTE',
    items: [
      { name: 'Penne Al forno', details: '400 gr – 42 lei', ingredients: 'Penne 100 gr, ceapă 10 gr, ardei 15 gr, piept de pui 85 gr, bacon 45 gr, suc de roșii 50 ml, Grand Cucina 30 ml, mozzarela 40 gr, parmezan 25 gr, sare 3 gr, piper 1 gr' },
      { name: 'Spaghete Carbonara', details: '400 gr – 42 lei', ingredients: 'Spaghete 100 gr, pancetta 60 gr, parmezan 100 gr, Grand Cucina 80 gr, galbenuș 50 gr, sare 3 gr, piper 1 gr' },
      { name: 'Tagliatelle cu creveți', details: '400 gr – 44 lei', ingredients: 'Tagliatelle 100 gr, creveți 100 gr, parmezan 100 gr, roșii 60 gr, vin alb 15 gr, usturoi 5 gr, ulei de măsline 20 ml, busuioc 2 gr' },
      { name: 'Paste Quattro Formaggio', details: '400 gr – 44 lei', ingredients: 'Penne/ spaghete 100 gr, parmezan 60 gr, gorgonzola 60 gr, branză gouda 60 gr, branză emental 60 gr, gran cuccina 60 gr, sare, piper' }
    ]
  },
  {
    id: 'burgeri',
    name: 'BURGERI',
    items: [
      { name: 'Cheeseburger', details: '450gr/80 gr– 43 lei', ingredients: 'Chiflă 80 gr, carne de vită 130 gr, castraveți murați 20 gr, bacon 50 gr, brânză ceddar 30 gr, salată verde 20 gr, roșii 50 gr, ceapă roșie murată 20 gr, sos Calipso( roze) 25 gr, sos de usturoi 25 gr., sare 3 gr, piper 1 gr, cartofi prajiti 80 gr.' },
      { name: 'Crispy chicken burger', details: '400 gr/80 gr – 41 lei', ingredients: 'Chiflă 80 gr, pui crispy 150 gr, ketchup 30 gr, maionează 30 gr, salată 20 gr, roșii 50 gr, mozzarella 40 gr, sare 3, piper 1, cartofi prajiti 80 gr' },
      { name: 'La Taifas King Burger', details: '450 gr/80 gr – 46 lei', ingredients: 'Chiflă 80 gr, plescovită 120 gr, bacon 50 gr, ou 50 gr, branză ceddar 30 gr, salată verde 20 gr, roșii 50 gr, sos Calipso 50 gr, sare, piper, cartofi prajiti 80 gr.' }
    ]
  },
  {
    id: 'salate',
    name: 'SALATE de ÎNSOȚIRE',
    items: [
      { name: 'Salată asortată', details: '250 gr – 19,5 lei', ingredients: 'Salată verde 100 gr, roșii 60 gr, castraveți 50 gr, ardei gras 30 gr, ceapă roșie 10 gr' },
      { name: 'Salată de varză', details: '200 gr – 13 lei', ingredients: 'Varză 200 gr, ulei 10 ml, oțet 5 ml, sare 3 gr' },
      { name: 'Salată de murături', details: '200 gr – 17,5 lei', ingredients: 'Castraveți 50 gr, gogoșari 50 gr, conopida 50 gr, gogonele 50 gr' },
      { name: 'Salată de roșii cu telemea', details: '200 gr – 19,5 lei', ingredients: 'Roșii 100 gr, telemea100 gr, ulei 10 ml, sare3 gr' }
    ]
  },
  {
    id: 'garnituri',
    name: 'GARNITURI',
    items: [
      { name: 'Cartofi prăjiți', details: '200 gr – 12,5 lei', ingredients: 'Cartofi prăjiți 200 gr, sare 3 gr' },
      { name: 'Cartofi Wedges', details: '200 gr – 16 lei', ingredients: 'Cartofi wedges prajiți 200 gr, sare 3 gr' },
      { name: 'Cartofi țărănești', details: '200 gr – 17,5 lei', ingredients: 'Cartofi fierți 100 gr, bacon 50 gr, ceapă 15 gr, ardei gras 20 gr, usturoi 10 gr, pătrunjel, mărar 3 gr, sare 3 gr, piper 1 gr' },
      { name: 'Cartofi cu mozzarela', details: '250 gr – 16,5 lei', ingredients: 'Cartofi copți 150 gr, mozzarela 100 gr, sare 3 gr' },
      { name: 'Cartofi gratinați cu gorgonzola (post și frupt)', details: '230 gr – 22 lei', ingredients: 'Cartofi gratinați 210 gr, gorgonzola 50 gr, usturoi 5 gr, pătrunjel frunze 2 gr, sare 2 gr, ulei 3 ml' },
      { name: 'Legume la grătar', details: '250 gr – 22 lei', ingredients: 'Vinete 60 gr, dovlecei 60 gr, ciuperci 60 gr, ardei gras 30 gr, roșii 20 gr, ceapă roșie 20 gr, sare3 gr' }
    ]
  },
  {
    id: 'pizza',
    name: 'PIZZA',
    note: '( ingredientele ce compun produsul final sunt menționate în crud )',
    items: [
      { name: 'Pizza LA TAIFAS', details: '650 gr – 43 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 70 gr, salam 50 gr, bacon 40 gr, cabanos 30 gr, telemea 20 gr.' },
      { name: 'Pizza CAPRICIOSA', details: '650 gr – 39 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 80 gr, salam 50 gr, ardel gras 40 gr, ciuperci 40 gr.' },
      { name: 'Pizza QUATRO STAGIONI', details: '650 gr – 39 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, salam 80 gr, ciuperci 40 gr, măsline 50 gr, ardei gras 40 gr.' },
      { name: 'Pizza DIAVOLA', details: '600 gr – 39 lei', ingredients: 'Blat de pizza 270 gr, sos pizza 50 gr, mozzarella 120 gr, salam picant 150 gr, chilly 5 gr, piper, sare' },
      { name: 'Pizza QUATRO FORMAGIO', details: '600 gr – 43 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, gorgonzola 50 gr, ementaller 50 gr, parmezan 50 gr, sare 3 gr, piper 2 gr.' },
      { name: 'Pizza PROSCIUTO E FUNGHI', details: '600 gr – 39 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120gr, sunca 100gr, ciuperci 50 gr.' },
      { name: 'Pizza BAMBINO', details: '600 gr – 39 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 110 gr, porumb 50 gr.' },
      { name: 'Pizza AL TONO', details: '650 gr. – 42 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, ton 120 gr, ceapa 40 gr, masline 40 gr, porumb 20 gr.' },
      { name: 'Pizza VEGETARIANA', details: '700 gr – 37 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella vegana 130 gr, ciuperci 100 gr, rosii 50 gr, ardei gras 50 gr, masline 50 gr, porumb 50 gr.' },
      { name: 'Pizza SALAMI', details: '600 gr – 42 lei', ingredients: 'Blat de pizza 270 gr, mozzarella 120 gr, pepperoni 160 gr, sos pizza 50 gr' },
      { name: 'Pizza POLLO', details: '650 gr – 43 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, gorgonzola 50 gr, piept de pui 100 gr, ardei roșu 40 gr, porumb boabe 20 gr.' },
      { name: 'Pizza cu HRIBI', details: '650 gr - 43 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarela vegană 120 gr, hribi 125 gr, ceapa 30 gr, ardei gras 50 gr, patrunjel 1 gr, sare 3 gr, piper 1 gr.' },
      { name: 'Pizza FALAFEL', details: '700 gr – 39 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarela vegană 120 gr, falafel 125 gr(5 buc), măsline 20 gr, rosii 40 gr, cartofi 70 gr, sare 3 gr, piper 2 gr' },
      { name: 'Pizza cu CREVEȚI', details: '650 gr – 45 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarela vegană 120 gr, tofu 60 gr, creveți 85 gr ( 6 buc ), roșii 40 gr, usturoi 15 gr, busuioc 5 gr, sare 3 gr, piper 2 gr.' },
      { name: 'Pizza KEBAB', details: '750 gr – 40 lei', ingredients: 'blat de pizza 270 gr., sos 40 gr, mozzarela 120 gr., carne kebab pui 200 gr., roșii 50 gr, ceapă 20 gr., salată iceberg 30 gr, sos kebab 20 gr' }
    ]
  },
  {
    id: 'sosuri',
    name: 'SOSURI',
    items: [
      { name: 'Sos DULCE', details: '50 gr – 4,5 lei', ingredients: 'Roșii pasate 40 gr, oregano 2 gr, cimbru 2 gr, ulei de măsline 3 gr, sare 1gr, zahar 2 gr.' },
      { name: 'Sos PICANT', details: '50 gr – 4,5 lei', ingredients: 'Rosii pasate 40gr, oregano 2 gr, cimbru 2gr, ulei de masline 3ml, sare 1gr, zahar 2 gr, fulgi de chilly 5g.' },
      { name: 'Sos TZATZIKI', details: '50 gr – 6,5 lei', ingredients: 'Iaurt grecesc 30 gr, castravete 10 gr, marar 3gr, sare 2 gr, zeama de lamaie 2 gr, usturoi 3 gr.' },
      { name: 'Sos LA TAIFAS', details: '50 gr – 6,5 lei', ingredients: 'Iaurt grecesc 10 gr, maioneza 15 gr, Grand Cucina 15 gr, ulei de măsline 5 ml, mentă 1 gr, usturoi 2 gr, sare 2 gr' },
      { name: 'Sos PIZZA', details: '50 gr – 6,5 lei', ingredients: 'Bulion rosii 40 gr, ulei de masline 4 gr, cimbru 1 gr, busuioc 1 gr, oregano 1 gr, usturoi granulat 1 gr, sare 1 gr, piper 1 gr' },
      { name: 'Sos CALYPSO roze', details: '50 gr – 7 lei', ingredients: 'Maioneza 20gr, ketchup 20 gr, boia de ardei 5 gr, cognac 5 ml, sare 2gr' },
      { name: 'Sos de MAIONEZA cu usturoi', details: '50 gr – 5,5 lei', ingredients: 'Maioneza 44 gr, usturoi 3 gr, oregano 2 gr, zeama lamaie 1 gr' },
      { name: 'Sos KEBAB', details: '70 gr - 6 lei', ingredients: 'Grand Cucina 200 gr., smântână 100 gr., maioneză 100 gr., zeamă de lămâie 20 gr., mujdei 5 gr., oregano 0,5 gr., sare 2 gr., piper 0,5 gr.' },
      { name: 'Mujdei de usturoi', details: '50 gr – 5 lei', ingredients: 'Usturoi 15 gr, ulei 30 ml, zeama lamaie 4 ml, sare 1 gr' },
      { name: 'Muștar', details: '50 gr – 4 lei', ingredients: '' },
      { name: 'Smântână', details: '50 gr – 5,5 lei', ingredients: '' }
    ]
  },
  {
    id: 'post',
    name: 'PRODUSE DE POST',
    items: [
      { name: 'Paste cu legume', details: '350 gr – 36 lei', ingredients: 'Pene 150 gr, ciuperci 50 gr, ardei gras 20 gr, ceapă 10, dovlecei 20 gr, sos de roșii 100 ml, sare 3 gr, piper 1 gr' },
      { name: 'Pizza vegetală', details: '600 gr – 37 lei', ingredients: 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarele de post 130 gr, ciuperci 10 gr, porumb 20 gr, măsline 20 gr, ardei gras 20 gr, sare 3 gr, piper 2 gr' },
      { name: 'Tofu la grătar cu cartofi prăjiți și salată asortată', details: '460 gr – 41 lei', ingredients: 'Soia 200 gr, cartofi prăjiți 150 gr, salată 60 gr, roșie 25 gr, castraveți 15 gr, ulei 5 ml, sare 3 gr, piper 2 gr' },
      { name: 'Șnițel de soia cu cartofi wedges și salată asortată', details: '530 gr – 41 lei', ingredients: 'Soia 250 gr, cartofi wedges 180 gr, roșii 100 gr, ulei 5 ml, sare 3 gr, piper 2 gr' },
      { name: 'Big sandwich de post', details: '300 gr – 30 lei', ingredients: 'Chiflă 90 gr, roșie 30 gr, salată verde 15 gr, șnitzel de soia 100 gr, castravete 20 gr, tofu 40 gr, sare 3 gr, piper 2 gr' }
    ]
  },
  {
    id: 'paine',
    name: 'PÂINE',
    items: [
      { name: 'Foccacia cu parmezan', details: '270 gr – 16,5 lei', ingredients: 'Blat pizza 270 gr, parmezen 50 gr' },
      { name: 'Foccacia cu ulei de măsline și oregano', details: '200 gr – 13 lei', ingredients: 'Blat pizza 270 gr, oregano 3 gr, ulei de măsline 10 gr.' },
      { name: 'Pâine pe vatră', details: '135 gr – 5 lei', ingredients: 'Blat pizza 270 gr, oregano, sare' }
    ]
  },
  {
    id: 'desert',
    name: 'DESERT',
    items: [
      { name: 'Înghețată', details: '150 gr – 22 lei', ingredients: 'Înghețată 3 cupe, toping de ciocolată 5 ml' },
      { name: 'Clătite cu brânză dulce și sos de vanilie', details: '350 gr – 28,5 lei', ingredients: 'Lapte 60 ml, făină 40 gr, ou 60 gr, zahăr 10 gr, brânză de vaci 70 gr, stafide 10 gr, Grand Cucina 100 ml, zahăr vanilat 5 gr' },
      { name: 'Clătite cu ciocolată/dulceață', details: '300 gr – 25 lei', ingredients: 'Lapte 60 ml, ou 60 ml, făină 115 gr, zahăr 15 gr, dulceață/ciocolată 50 gr, sare 2 gr' },
      { name: 'Papanași', details: '350 gr – 32 lei', ingredients: 'Lapte 60 ml, ou 50 gr, făină 40 gr, bicarbonat 5 gr, sare1 gr, smântână 100 gr, dulceață 50 gr' },
      { name: 'Tarta cu lămâie', details: '150 gr – 27,5 lei', ingredients: 'Tartă cu lămâie 150 gr, inghețată 50 gr, frunze de mentă' },
      { name: 'Cheesecake', details: '200 gr – 30 lei', ingredients: 'Cheesecake, sos de fructe de pădure, mentă' }
    ]
  },
  {
    id: 'vinuri',
    name: 'VINURI',
    items: [
      { name: 'Vinuri albe 750 ml', details: '', ingredients: 'Simbol - Tămâioasă Românească demisec Domeniile Bohotin - 65 lei | Simbol – Sauvognon Blank sec Domeniile Bohotin - 65 lei | Pelin de Urlați demisec - 45 lei | Simbol - Tămâioasă Românească sec Domeniile Bohotin - 65 lei | Selecții – Moscat Otonel demidulce Domeniile Bohotin - 55 lei | Șarba sec Domeniile Gârboiu - 65 lei' },
      { name: 'Vinuri roșii 750 ml', details: '', ingredients: 'Poem Fetească neagră sec Domeniile Bohotin – 80 lei | Zur-zur Fetească Neagră demidulce Domeniile Bohotin – 44 lei | Poem cupaj( FN+M+CS ) sec Domeniile Bohotin – 80 lei | Pelin de Urlați demisec - 45 lei | Rezerve Fetească Neagră demidulce Domeniile Bohotin – 87 lei' },
      { name: 'Vinuri roze 750 ml', details: '', ingredients: 'Simbol – Busuioacă de Bohotin demisec Domeniile Bohotin - 65 lei | Selecții – Busuioacă de Bohotin demidulce Domeniile Bohotin - 65 lei | Simbol – Busuioacă de Bohotin sec Domeniile Bohotin - 65 lei | Pelin de Urlați demisec - 45 lei' },
      { name: 'Spumante 750 ml', details: '', ingredients: 'Spumant brut Domeniile Bohotin – 60 lei | Spumant Muscat Otonel dulce – 60 lei | Spumant roze dulce Domeniile Bohotin – 60 lei | Spumant demisec Domeniile Bohotin – 60 lei' },
      { name: 'Vinul La Taifas', details: '', ingredients: 'vin de masa 200 ml - 10 lei | vin de masa carafă 0,500 l - 24 lei | vin de masa carafă 1 l - 45 lei | Vinuri albe: Muscat Otonel demidulce, Tămâioasă Românească demisec, Sauvignon Blank sec, Fetească Albă demisec | Vinuri roșii: Fetească Neagră demidulce, Fetească Neagră demisec, Merlot sec | Vinuri roze: Busuioacă de Bohotin demidulce, Busuioacă de Bohotin demisec' }
    ]
  },
  {
    id: 'bere',
    name: 'BERE',
    items: [
      { name: 'Tuborg', details: '500 ml – 11 lei', ingredients: '' },
      { name: 'Tuborg FA', details: '500 ml – 11 lei', ingredients: '' },
      { name: 'Carlsberg', details: '500 ml – 12,5 lei', ingredients: '' },
      { name: 'Skol', details: '500 ml – 9 lei', ingredients: '' },
      { name: 'Holsten', details: '500 ml – 8,5 lei', ingredients: '' },
      { name: 'Bucur', details: '330 ml – 14 lei', ingredients: '' },
      { name: 'Corona', details: '330 ml – 15,5 lei', ingredients: '' },
      { name: 'Bermas', details: '500 ml – 8,5 lei', ingredients: '' },
      { name: 'Călimani', details: '500 ml – 8,5 lei', ingredients: '' },
      { name: 'Suceava', details: '500 ml – 8,5 lei', ingredients: '' },
      { name: 'Bere draught', details: '400 ml', ingredients: 'Calimani – 8 lei | Skol – 8,5 lei | Tuborg – 11 lei' }
    ]
  },
  {
    id: 'bauturi',
    name: 'BAUTURI SPIRTOASE',
    items: [
      { name: 'TRADITIONALE 50 ml', details: '', ingredients: 'Palinca prune – 20 lei | Palinca pere – 22 lei | Palinca prune afumate – 22 lei | Palinca mere – 17,5 lei | Palinca fructe – 17,5 lei | Palinca caise – 22 lei | Afinata - 20 lei' },
      { name: 'VOTCA 50 ml', details: '', ingredients: 'Absolut – 12,5 lei | Finlandia – 12,5 lei | Tazoscki – 8 lei' },
      { name: 'WHISKY 50 ml', details: '', ingredients: 'Jack Daniels – 16,5 lei | Balantines – 13,5 lei | J&B – 16,5 lei | Johny Walker – 13,5 lei' },
      { name: 'DISTILATE DE VIN', details: '', ingredients: 'Jidvei VSOP 50 ml – 14 lei | Miorita VS 50 ml – 15 lei | Miorita VSOP 50 ml – 19 lei | Metaxa 7 * 50 ml – 22 lei' },
      { name: 'Rom', details: 'Captain Morgan/Havana club 50 ml – 14,5 lei', ingredients: '' },
      { name: 'Gin Wembley', details: '50 ml - 13,5 lei', ingredients: '' },
      { name: 'Tequilla', details: '( tequila, sare, lime ) 30 ml – 11 lei', ingredients: '' },
      { name: 'JAGERMEISTER', details: '0,50 ml – 11 lei', ingredients: '' }
    ]
  },
  {
    id: 'cocktailuri',
    name: 'COCKTAILURI',
    items: [
      { name: 'Taifas Mojito', details: '330 ml – 27 lei', ingredients: 'Suc de lamaie 50 ml, lime 20 gr, rom alb 50 ml, apa tonica 100 ml zahar brun 5 gr, menta 5 gr, gheață 100 gr' },
      { name: 'Gin Tonic', details: '330 ml – 27 lei', ingredients: 'Gin 70 ml, apa tonica 100 ml, lamaie 60 gr, gheata 100 gr' },
      { name: 'Aperol Spritz', details: '400 ml – 27 lei', ingredients: 'Aperol 70 ml, prosseco 130 ml, gheata 50 gr, suc de portocale 50 ml, gheata 100 gr' },
      { name: 'Sex on the beach', details: '400 ml – 29 lei', ingredients: 'Suc de ananas 100 ml, suc de merisoare 100 ml, zeama de lamaie 50 ml, votca 50 ml, gheață 100 gr' },
      { name: 'Dum Dum Taifas', details: '400 gr – 26,5 lei', ingredients: 'Suc de ananas 150 ml, suc de merisoare 100 ml, zeama de lamaie 50 ml, gheata 100g' },
      { name: 'Jugerboomb', details: '250 ml – 35 lei', ingredients: 'Jagermeister 50 ml, absint 50 ml, energizant 150 ml' },
      { name: 'Hugo', details: '300 ml – 29 lei', ingredients: '150 ml proseco, 30 ml apă mineral, sirop de soc 20 ml, lime 3 felii, mentă 6 frz, gheață 100 gr' },
      { name: 'COSMOPOLITAN', details: '105 ml – 30 lei', ingredients: 'Votca 40 ml, triplu sec 15 ml, suc de lamaie 20 ml, suc de merisoare 20 ml' },
      { name: 'Sunshine cocktail (Non-alcoolice)', details: '250 ml – 23 lei', ingredients: 'Suc de merișoare 100 ml, apă tonică 100 ml, piure de fructe 25 ml, lime, 1 felie, lamiae 1 felie, gheață 100 gr' },
      { name: 'Green Apple (Non-alcoolice)', details: '300 ml – 23 lei', ingredients: 'suc de mere verzi 200 ml, zahăr brun 1 lingură, lime ½ buc, gheață mărunțită sau întreagă, sirop blue curacao 5ml' }
    ]
  },
  {
    id: 'limonade',
    name: 'LIMONADE SI FRESH-URI',
    items: [
      { name: 'LIMONADA CLASICA', details: '330 ml – 16,5 lei', ingredients: 'Zeama de lamaie 50 ml, sirop de zahar 50 ml, sirop de menta 10 ml, apa 100 ml, gheata 100 gr, menta 10 gr, lamaie 10 gr' },
      { name: 'LIMONADA CU AROME', details: '330 ml – 18,5 lei', ingredients: 'Zeama de lamaie 50 ml, sirop de zahar 50 ml, arome 20 ml, apa 100 ml, gheata 100 gr, menta 5 gr, lamaie 5 gr' },
      { name: 'FRESH DE PORTOCALE', details: '330 ml – 16,5 lei', ingredients: 'Suc de portocale 200 ml, gheata 100 gr, sirop de zahar 30 ml' },
      { name: 'FRESH DE GRAPEFRUIT', details: '330 ml – 16,5 lei', ingredients: 'Suc de Grapefruit 200 ml, gheata 100 gr, sirop de zahar 30 ml' },
      { name: 'FRESH MIXT', details: '330 ml – 16,5 lei', ingredients: 'Suc de grapefruit 100 ml, suc de portocale 100 ml, gheata 100 gr, sirop de zahar 30 ml' }
    ]
  },
  {
    id: 'cafea',
    name: 'CAFEA',
    items: [
      { name: 'ESPRESSO SCURT', details: '30 ml – 8,5 lei', ingredients: 'Cafea Illy capsulă roșie 6,7 gr, apa 30 ml' },
      { name: 'ESPRESSO DUBLU', details: '60 ml – 15 lei', ingredients: 'Cafea Illy capsulă roșie 2X6,7 gr, apa 60 ml' },
      { name: 'CAFÉ RISTRETO', details: '15 ml – 8 lei', ingredients: 'Cafea Illy capsula roșie 6,7 gr, apă 15 ml' },
      { name: 'ESPRESSO LUNGO', details: '80 ml – 8,5 lei', ingredients: 'Cafea Illy capsula albastră 6,2 gr, apă 80 ml' },
      { name: 'CAFÉ MACCHIATO', details: '40 ml – 9 lei', ingredients: 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 10 ml, apa 30 ml' },
      { name: 'CAFÉ LATTE', details: '200 ml – 12 lei', ingredients: 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 170 ml, apa 30 ml' },
      { name: 'CAPPUCINO', details: '160 ml – 10 lei', ingredients: 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 130 ml, apa 30 ml' },
      { name: 'CAPPUCINO VIENNESE', details: '175 ml – 15 lei', ingredients: 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 130 ml, apa 30 ml, frișcă 15 gr' },
      { name: 'CAFÉ DECAFFEINATO EXPRESSO/LUNGO', details: '30ml/80 ml – 9 lei', ingredients: 'Cafea Illy capsulă decof 6,7 gr, apa 30/80 ml' },
      { name: 'CIOCOLATA CALDĂ', details: '200 ml – 10 lei', ingredients: 'Ciocolată plic 25 gr, apă 200 ml, optional miere de albine plic' },
      { name: 'CEAI', details: '200 ml - 10 lei', ingredients: 'Plic de ceai 2 gr, apă 200 ml' },
      { name: 'VIN FIERT', details: '300 ml – 15 lei ( ingrediente la 5 l)', ingredients: 'Vin fiert 240 ml, apă 60 ml, zahăr 6 gr, cuișoare 3 buc, scorțișoară ½ baton, coajă portocală, piper 5 boabe' }
    ]
  },
  {
    id: 'bauturi-racoritoare',
    name: 'BAUTURI RACORITOARE',
    items: [
      { name: 'Coca cola/Fanta/ Sprite', details: '250 ml – 8,5 lei', ingredients: '' },
      { name: 'Schweppes Tonic', details: '250 ml – 11 lei', ingredients: '' },
      { name: 'Fuze Tea', details: '250 ml – 12 lei', ingredients: '' },
      { name: 'Cappy portocale /rosii', details: '250 ml – 11 lei', ingredients: '' },
      { name: 'Apa mineral', details: '330 ml – 8,5 lei', ingredients: '' },
      { name: 'Apa plata', details: '330 ml – 8,5 lei', ingredients: '' },
      { name: 'Apa mineral', details: '750 ml – 15,5 lei', ingredients: '' },
      { name: 'Apa plata', details: '750 ml – 15,5 lei', ingredients: '' },
      { name: 'Suc de rosii', details: '330 ml – 10 lei', ingredients: '' },
      { name: 'Suc de mere natural ( diverse arome)', details: '330 ml – 8 lei', ingredients: '' }
    ]
  },
  {
    id: 'diverse',
    name: 'DIVERSE',
    items: [
      { name: 'Alune', details: '100 gr – 8,5 lei', ingredients: '' },
      { name: 'Fistic', details: '100 gr – 20 lei', ingredients: '' },
      { name: 'Extrapizza', details: '– 5 lei', ingredients: '' },
      { name: 'Ardei iute', details: '30 gr – 3 lei', ingredients: '' },
      { name: 'Tuborg 500 ml DZ', details: '– 12 lei', ingredients: '' },
      { name: 'Tuborg FA 500 ml DZ', details: '– 12 lei', ingredients: '' },
      { name: 'Sprite 330 ml DZ', details: '– 11 lei', ingredients: '' },
      { name: 'Coca-cola 330 ml DZ', details: '– 11 lei', ingredients: '' },
      { name: 'Fanta 330 ml DZ', details: '– 11 lei', ingredients: '' },
      { name: 'Apă minerală/plată 500 ml', details: '– 9 lei', ingredients: '' },
      { name: 'Red Bull', details: '0,250 – 13 lei', ingredients: '' }
    ]
  }
];

interface MenuItem {
  name: string;
  details: string;
  ingredients: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string;
}

export default function MenuProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);
  const [productsToAdd, setProductsToAdd] = useState<MenuItem[]>([]);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  const extractPrice = (details: string): number => {
    // Extrage prețul din detalii (ex: "300 gr – 31 lei" -> 31)
    const priceMatch = details.match(/(\d+(?:,\d+)?)\s*lei/i);
    if (priceMatch) {
      return parseFloat(priceMatch[1].replace(',', '.'));
    }
    return 0;
  };

  const handleAddProduct = async (item: MenuItem) => {
    try {
      // Verificăm dacă produsul a fost deja adăugat
      if (addedProducts.includes(item.name)) {
        setAlertMessage({ type: 'error', message: `Produsul "${item.name}" a fost deja adăugat.` });
        return;
      }

      // Extragem prețul din detalii
      const price = extractPrice(item.details);
      
      // Pregătim datele pentru trimitere
      const productData: ProductFormData = {
        name: item.name,
        description: item.ingredients,
        price: price,
        categoryId: selectedCategory,
        categoryName: currentCategory?.name || ''
      };

      // Trimitem datele către API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category_id: productData.categoryId,
          in_stock: true
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Adăugăm produsul la lista celor adăugate
        setAddedProducts(prev => [...prev, item.name]);
        setAlertMessage({ type: 'success', message: `Produsul "${item.name}" a fost adăugat cu succes!` });
      } else {
        setAlertMessage({ type: 'error', message: `Eroare la adăugarea produsului: ${result.error}` });
      }
    } catch (error) {
      console.error('Eroare la adăugarea produsului:', error);
      setAlertMessage({ type: 'error', message: 'A apărut o eroare la adăugarea produsului.' });
    }
  };

  const handleAddAllProducts = async () => {
    if (!currentCategory) return;

    try {
      const productsToProcess = currentCategory.items.filter(
        item => !addedProducts.includes(item.name)
      );

      if (productsToProcess.length === 0) {
        setAlertMessage({ type: 'error', message: 'Toate produsele din această categorie au fost deja adăugate.' });
        return;
      }

      // Procesăm fiecare produs
      const results = await Promise.all(
        productsToProcess.map(async (item) => {
          const price = extractPrice(item.details);
          
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: item.name,
              description: item.ingredients,
              price: price,
              category_id: selectedCategory,
              in_stock: true
            }),
          });

          const result = await response.json();
          return { name: item.name, success: result.success, error: result.error };
        })
      );

      // Actualizăm starea cu produsele adăugate
      const successfullyAdded = results
        .filter(r => r.success)
        .map(r => r.name);
      
      setAddedProducts(prev => [...prev, ...successfullyAdded]);
      
      // Afișăm mesajul de succes
      setAlertMessage({ 
        type: 'success', 
        message: `Au fost adăugate ${successfullyAdded.length} produse din categoria ${currentCategory.name}.` 
      });
    } catch (error) {
      console.error('Eroare la adăugarea produselor:', error);
      setAlertMessage({ type: 'error', message: 'A apărut o eroare la adăugarea produselor.' });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Adaugă Produse din Meniu</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Adaugă produsele din meniul restaurantului în sistemul de comandă online
          </p>
        </div>
      </div>

      {alertMessage && (
        <Alert className={`mb-6 ${alertMessage.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <AlertDescription className={alertMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {alertMessage.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar cu Categorii */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categorii Meniu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {menuCategories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full justify-start text-left ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conținut Produse */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{currentCategory?.name}</CardTitle>
              <Button onClick={handleAddAllProducts} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Adaugă toate produsele
              </Button>
            </CardHeader>
            <CardContent>
              {currentCategory?.note && (
                <p className="text-sm italic text-gray-600 mb-4">{currentCategory.note}</p>
              )}
              
              <div className="space-y-4">
                {currentCategory?.items.map((item, index) => {
                  const isAdded = addedProducts.includes(item.name);
                  
                  return (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="mb-2">
                            <span className="font-bold text-black text-lg">{item.name}</span>
                            {item.details && <span className="text-gray-700 ml-2">{item.details}</span>}
                          </div>
                          {item.ingredients && (
                            <p className="text-sm text-gray-600">{item.ingredients}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            onClick={() => handleAddProduct(item)}
                            disabled={isAdded}
                            className={`flex items-center gap-2 ${isAdded ? 'bg-green-500 hover:bg-green-600' : ''}`}
                          >
                            {isAdded ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Adăugat
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                Adaugă
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}