-- Insert menu items for all categories
-- This migration adds all existing menu items from the hardcoded menu page

-- ANTREURI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'King sandwich', '300 gr – 31 lei', 'Pâine toast 60 gr., cremă Philadelphia 40 gr, salată verde 20 gr., roșii 20 gr., șnițzel de pui 100 gr., branză Ceddar 30 gr, bacon 20 gr., ceapă roșie 10 grame, sare 2 gr, piper 1 gr.', 1
FROM menu_categories WHERE slug = 'antreuri'
UNION ALL
SELECT id, 'Bruschette cu roșii și busuioc', '300 gr. – 22 lei', 'Pâine baguetă 150 gr, roșii 130 gr, busuioc 3 gr, usturoi 4 gr, sare 3 gr, piper 2 gr, lămâie 3 gr, ulei 5 ml.', 2
FROM menu_categories WHERE slug = 'antreuri'
UNION ALL
SELECT id, 'Panini cu șuncă și piept de pui', '300 gr – 29,5 lei', 'Pâine pe vatră 80 gr, piept de pui 70 gr, șuncă 30 gr, mozzarella 50 gr, roșii 20 gr, castraveți 20 gr, salată 20 gr, maionează 10 gr, sare 2 gr, piper 1 gr', 3
FROM menu_categories WHERE slug = 'antreuri'
UNION ALL
SELECT id, 'Salată cu piept de pui și dressing de iaurt', '350 gr – 35,5 lei', 'Piept de pui 100 gr, salată verde 100 gr, roșii 30 gr, castraveți 25 gr, ardei gras 20 gr, ceapă 10 gr, crutoane 15 gr, dressing 50 gr, piper 1 gr', 4
FROM menu_categories WHERE slug = 'antreuri'
UNION ALL
SELECT id, 'Salată La Taifas', '350 gr – 32 lei', 'Proscciuto 30 gr, salată verde 100 gr, roșii 30 gr., castraveți 25 gr, măsline 10 gr, ceapa roșie 10 gr, ou 60 gr, telemea 65 gr, dressing 20 ml', 5
FROM menu_categories WHERE slug = 'antreuri'
UNION ALL
SELECT id, 'Salată cu ton', '350 gr. – 35 lei', 'Ton 70 gr, salată verde 100 gr, roșii 30 gr, castraveți 25 gr, ceapă roșie 10 gr, porumb 15 gr, ou 60 gr, fasole roșie 15 gr, lamaie 25 gr, sare 2 gr, piper 1 gr', 6
FROM menu_categories WHERE slug = 'antreuri';

-- MICUL DEJUN items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Omletă La Taifas', '350 gr/100 gr /50 gr – 31 lei ( inclus salată și pâine)', 'Ouă 3 buc, smântână de gătit 50 gr, șuncă 50 gr, ciuperci 20 gr, ardei 20 gr, dovlecei 20 gr, cremă de branză 60 gr, salată asortată 100 gr, sare 2 gr, piper 1 gr, pâine pe vatră 50 gr.', 1
FROM menu_categories WHERE slug = 'mic-dejun'
UNION ALL
SELECT id, 'Omletă țărănească', '350 gr/100 gr/50 gr – 30 lei ( inclus salată și pâine)', 'Ouă 3 buc, smântână de gătit 50 gr, bacon 30 gr, mozzarella 60 gr, ceapă 10gr, ardei gras 20 gr, ciuperci 20 gr, salată asortată 100 gr, sare 2 gr, piper 1 gr, pâine pe vatră 50 gr', 2
FROM menu_categories WHERE slug = 'mic-dejun'
UNION ALL
SELECT id, 'Mic dejun tradițional', '300 gr/100 gr/50 gr – 28,5 lei ( inclus salată și pâine)', 'Ouă 2 buc, bacon prajit 50 gr, branză sărată 130 gr, salată asortată 100 gr, pâine pe vatră 50 gr', 3
FROM menu_categories WHERE slug = 'mic-dejun'
UNION ALL
SELECT id, 'Cuib de cartofi cu bacon, branză și ou', '350 gr/50 gr – 31 lei ( inclus pâine)', 'Cartofi prăjiți 100 gr, bacon 50 gr, telemea de vaci 80 gr, ouă 2 buc, sare 3 gr, piper 2 gr, pâine pe vatră 50 gr', 4
FROM menu_categories WHERE slug = 'mic-dejun';

-- CIORBE ȘI SUPE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Ciorbă de legume', '450 gr – 23 lei', 'Cartofi 20 gr, morcov 15 gr., țelină 15 gr, borș 5 ml. ardei gras 15 gr, ceapă 10 gr, pasta tomate 10 gr., pătrunjel 5 gr, păstârnac 15 gr, supă 336 ml, sare 3 gr., piper 1 gr', 1
FROM menu_categories WHERE slug = 'ciorbe'
UNION ALL
SELECT id, 'Ciorbă de văcuță', '450 gr- 28 lei', 'Carne de văcuță 60 gr, cartofi 10 gr, morcov 10 gr, țelină 10 gr, ardei gras 10 gr, ceapă 5 gr, pastă de tomate 10 gr, păstârnac 10 gr, pătrunjel 5 gr, leuștean 5 gr, sare 3 gr, piper 2 gr, borș de putină 5 ml., supă 305 ml.', 2
FROM menu_categories WHERE slug = 'ciorbe'
UNION ALL
SELECT id, 'Supa de găină', '450 gr – 25 lei', 'piept de pui 80 gr, morcov 15 gr, tăiței 60 gr, pătrunjel 10 gr, supă 280 ml, sare 3 gr, piper 2 gr.', 3
FROM menu_categories WHERE slug = 'ciorbe'
UNION ALL
SELECT id, 'Ciorbă de purcel', '450 gr – 28 lei', 'Carne de purcel 70 gr, morcov 10 gr, țelină 10 gr, ceapă 10 gr, păstârnac 10 gr, ardei gras 10 gr, orez 15 gr, pastă de tomate 10 gr, pătrunjel 5 gr, leuștean 5 gr, sare 3 gr, piper 2 gr, borș de putină 10 ml., supă 280 ml.', 4
FROM menu_categories WHERE slug = 'ciorbe'
UNION ALL
SELECT id, 'Ciorbă rădăuțeană', '450 GR – 28LEI', 'piept de pui 100 gr, smântână 70 gr, galbenuș de ou 50 gr, usturoi 10 gr, oțet 3 ml, sare 4 gr, piper 2 gr, amidon 3 gr, supă de pui 250 ml., supă 208 ml', 5
FROM menu_categories WHERE slug = 'ciorbe'
UNION ALL
SELECT id, 'Ciorbă de fasole cu afumătură', '480 gr – 28 lei', 'Scăriță afumată 100 gr, fasole 50 gr, morcov 20 gr, bulion 10 gr, ceapă 10 gr, țelină 15 gr, leuștean 5 gr, borș 10 gr, supă 225 ml, sare 3 gr, piper 2 gr.', 6
FROM menu_categories WHERE slug = 'ciorbe';

-- PLATOURI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Platou tradițional cu scrijele', '850 gr – 54 lei', 'Cartofi scrijele 350 gr, slăninuță 150 gr, telemea 150 gr, ceapă 100 gr, iaurt 100 gr, sare 5 gr.', 1
FROM menu_categories WHERE slug = 'platouri'
UNION ALL
SELECT id, 'Tigaie picantă cu pui și legume', '450 gr – 45 lei', 'Piept de pui 200 gr, ceapă 25 gr, vinete 15 gr, dovlecei 15 gr, ardei gras 15 gr, ciuperci 20 gr, suc de roșii 150 ml, fulgi de chilly 2 gr, sare 5 gr, piper 3 grame', 2
FROM menu_categories WHERE slug = 'platouri'
UNION ALL
SELECT id, 'Coaste de porc', '850 gr - 69 lei', 'Coaste porc 500 gr, cartofi wedges 200 gr, usturoi 5 gr, pătrunjel verde 1 gr, dulceață de ardei iute 10 gr, sos Calypso 60 gr, ulei 5 ml, castraveți murați 65 gr, sare 3 gr, piper 1 gr', 3
FROM menu_categories WHERE slug = 'platouri'
UNION ALL
SELECT id, 'Platou Buquet', '2400 gr - 5 pers – 265 lei ( comandă cu cel puțin 1 h inainte)', 'Crispy 400 gr, mititei 200 gr, carnaciori 200, inele de ceapa 100 gr, aripioare 400 gr, nuggets n 400 gr, ardei capia 200 gr, cartofi prajiti pai 200 gr, cartofi wedges 200 gr, 2x50 gr sosuri (la alegere).', 4
FROM menu_categories WHERE slug = 'platouri'
UNION ALL
SELECT id, 'Platou de bere/2 pers', '800 gr/80 gr – 99 lei ( comandă cu cel puțin 1 h inainte)', 'Aripioare picante 200 gr, pui crispy 200 gr, coaste de pui 200 gr, cartofi prajiți 200 gr, sos Calypso 80 gr', 5
FROM menu_categories WHERE slug = 'platouri'
UNION ALL
SELECT id, 'Platou de bere/1 pers', '400 gr/40 gr – 54 lei ( comandă cu cel puțin 1 h inainte)', 'Aripioare picante 100 gr, pui crispy 100 gr, coaste de pui 100 gr, cartofi prajiți 100 gr, sos Calypso 40 gr', 6
FROM menu_categories WHERE slug = 'platouri';

-- PLATOURI EVENIMENTE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Platou rece de pește', '2500 gr - 270 lei', 'Creveți pane 250 gr, calamari pane 200 gr, bruschete cu somon fumme 200 gr, coșuleț cu salată de ton 200 gr, gujoane de șalău 150 gr, bruschete cu salată de icre 200 gr, frigărui cu pește marinat și măsline 200 gr, pește afumat 150 gr, roșii cerry 100 gr, castraveți 100 gr, măsline verzi 100 gr, tofu cu icre roșii 150 gr.', 1
FROM menu_categories WHERE slug = 'platouri-evenimente'
UNION ALL
SELECT id, 'Platou cald de pește', '2000 gr - 350 lei', 'Somon file 250 gr, file de păstrăv 250 gr, calamar în sos de roșii 200 gr; caracatiță la grătar 200 gr, cartofi gratinați 300 gr, ciuperci champinion cu usturoi 250 gr, legume la grătar : vinete, dovlecei, ardei gras 400 gr, focaccia cu ulei de măsline și oregano 150 gr.', 2
FROM menu_categories WHERE slug = 'platouri-evenimente'
UNION ALL
SELECT id, 'Platou de post', '1500 gr - 180 lei', 'Dovlecei pane 150 gr, vinete pane 150 gr, ciuperci pane 150 gr, tofu la grătar 150 gr, inele de ceapă pane 150 gr, bruschette cu zacuscă 100 gr, șnițel vegan 100 gr, roșii 100 gr, castraveți 100 gr, măsline 100 gr, rulou vegetal cu tortilla și pateu 150 gr, ardei gras 100 gr.', 3
FROM menu_categories WHERE slug = 'platouri-evenimente'
UNION ALL
SELECT id, 'Platou fast-food', '1000 gr – 130 lei', 'Pui crispy 250 gr, aripioare 300 gr, inele de ceapa 100 gr, cartofi prăjiți 200 gr, mozzarela pane 150 gr', 4
FROM menu_categories WHERE slug = 'platouri-evenimente'
UNION ALL
SELECT id, 'Platou aperitiv', '1500 gr – 210 lei', 'Coșuleț foitaj cu salată de pui 250 gr, inele de ceapă pane 100 gr, pui crispy 200 gr, frigărui de mozzarela și roșii cherry 250 gr, salam crud-uscat 150 gr, rulou de șuncă cu telemea 200 gr, bruschete cu cremă de brânză 200 gr, roșii cherry 100 gr, castraveți 100 gr, măsline 100 gr, pizzete cu peperoni 200 gr, rulou de bacon cu ardei gras 150 gr.', 5
FROM menu_categories WHERE slug = 'platouri-evenimente'
UNION ALL
SELECT id, 'Platou brânzeturi', '1500 gr – 230 lei', 'Gorgonzola 200 gr, camembert 200 gr, cașcaval afumat 200 gr, mozzarella 200 gr, mozzarella boconcini 200 gr, parmezan 200 gr, struguri 100 gr, grisine 50 gr, prosciutto 100 gr, fructe confiate 50 gr', 6
FROM menu_categories WHERE slug = 'platouri-evenimente';

-- UNA, ALTA items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Mixt grill', '550 GR – 55 LEI', 'Piept de pui 125 gr, mici 150 gr, ceafă 125 gr, cartofi prășiți 100 gr, muștar 50 gr.', 1
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Crispy strips cu cartofi prăjiți', '300 gr/150gr/50 gr – 37,5 lei', 'Piept de pui 200 gr, făină 10 gr, ou 50 gr, fulgi de porumb 40 gr, cartofi 150 gr, sos de iaurt cu usturoi 50 gr', 2
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Șnițzel de pui parizian', '250 gr – 32 lei', 'Piept de pui 170 gr, făină 10 gr, ou 40 gr, sare 2 grame, piper 1 gr', 3
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Aripioare crocante cu sos de usturoi', '300 gr/150 gr/60 gr – 39,5 lei', 'Aripioare de pui 300 gr, cartofi 150 gr, sos de usturoi 60 gr, amidon 3 gr, făină 3 gr, boia dulce 2 gr, usturoi 3 gr, piper 2 gr, sare 3 gr', 4
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Quesadilla cu pui și sos de roșii cu busuioc', '350/70 – 28,5 lei', 'Lipie 90 gr, piept de pui 100 gr, mozzarela 100 gr, porumb boabe 30 gr, ardei gras 30 gr, sos de roșii 70 gr', 5
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Wrap de pui', '300 gr – 31 lei', 'Lipie 90 gr, pui crispy 100 gr, salată verde 20 gr, roșii 20 gr, castraveți 20 gr, ceapă 10 gr, sos de iaurt 40 gr', 6
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Tocinel La Taifas', '410 gr/60 gr – 42 lei', 'Cartofi 150 gr, făină 20 gr, piept de pui 105 gr, mozzarella 70 gr, ou 60 gr, sare 5 gr, piper 2 gr, iaurt 60 gr', 7
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Ciolan copt-afumat cu cartofi', '800 gr/300 gr/100 gr – 99 lei', 'Ciolan afumat 800 gr, cartofi wedges 200 gr, usturoi 30gr, pătrunjel 5 gr, parmezan 30 gr, sare 5 gr, ulei 10 ml, dulceață de ardei iute 20 gr, castraveți murați 100 gr.', 8
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Shaorma LA TAIFAS', '700 gr – 42 lei', 'carne kebab pui 200 gr, cartofi prăjiți 200 gr, salată verde 60 gr, varză 100 gr, roșii 50 gr, ceapă 20 gr, sos kebab 70 gr', 9
FROM menu_categories WHERE slug = 'una-alta'
UNION ALL
SELECT id, 'Kebab la lipie', '700 gr – 44 lei', 'Lipie 15 gr., carne kebab pui 200 gr., cartofi prăjiți 200 gr., salată verde 60 gr, varză 80 gr, roșii 50 gr, ceapă 25 gr, sos kebab 70 gr.', 10
FROM menu_categories WHERE slug = 'una-alta';

-- GRILL items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Piept de pui la gratar', '200 gr – 32 lei', 'Piept de pui 200 gr, sare 3 gr, piper 1 gr, boia 1 gr, ulei 5 ml', 1
FROM menu_categories WHERE slug = 'grill'
UNION ALL
SELECT id, 'Ceafă la grătar', '200 gr – 35,5 lei', 'Ceafă de porc 200 gr, sare 3 gr, piper 1 gr, boia 1 gr, ulei 5 ml', 2
FROM menu_categories WHERE slug = 'grill'
UNION ALL
SELECT id, 'Mititei', '50 gr – 6 lei', 'Mititei amestec 50 gr/buc', 3
FROM menu_categories WHERE slug = 'grill'
UNION ALL
SELECT id, 'Cârnați tradiționali germani', '200 gr – 25 lei', 'Cârnați tradiționali Turinger 200 gr, sare 3 gr, piper 1 gr', 4
FROM menu_categories WHERE slug = 'grill';

-- PASTE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Penne Al forno', '400 gr – 42 lei', 'Penne 100 gr, ceapă 10 gr, ardei 15 gr, piept de pui 85 gr, bacon 45 gr, suc de roșii 50 ml, Grand Cucina 30 ml, mozzarela 40 gr, parmezan 25 gr, sare 3 gr, piper 1 gr', 1
FROM menu_categories WHERE slug = 'paste'
UNION ALL
SELECT id, 'Spaghete Carbonara', '400 gr – 42 lei', 'Spaghete 100 gr, pancetta 60 gr, parmezan 100 gr, Grand Cucina 80 gr, galbenuș 50 gr, sare 3 gr, piper 1 gr', 2
FROM menu_categories WHERE slug = 'paste'
UNION ALL
SELECT id, 'Tagliatelle cu creveți', '400 gr – 44 lei', 'Tagliatelle 100 gr, creveți 100 gr, parmezan 100 gr, roșii 60 gr, vin alb 15 gr, usturoi 5 gr, ulei de măsline 20 ml, busuioc 2 gr', 3
FROM menu_categories WHERE slug = 'paste'
UNION ALL
SELECT id, 'Paste Quattro Formaggio', '400 gr – 44 lei', 'Penne/ spaghete 100 gr, parmezan 60 gr, gorgonzola 60 gr, branză gouda 60 gr, branză emental 60 gr, gran cuccina 60 gr, sare, piper', 4
FROM menu_categories WHERE slug = 'paste';

-- BURGERI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Cheeseburger', '450gr/80 gr– 43 lei', 'Chiflă 80 gr, carne de vită 130 gr, castraveți murați 20 gr, bacon 50 gr, brânză ceddar 30 gr, salată verde 20 gr, roșii 50 gr, ceapă roșie murată 20 gr, sos Calipso( roze) 25 gr, sos de usturoi 25 gr., sare 3 gr, piper 1 gr, cartofi prajiti 80 gr.', 1
FROM menu_categories WHERE slug = 'burgeri'
UNION ALL
SELECT id, 'Crispy chicken burger', '400 gr/80 gr – 41 lei', 'Chiflă 80 gr, pui crispy 150 gr, ketchup 30 gr, maionează 30 gr, salată 20 gr, roșii 50 gr, mozzarella 40 gr, sare 3, piper 1, cartofi prajiti 80 gr', 2
FROM menu_categories WHERE slug = 'burgeri'
UNION ALL
SELECT id, 'La Taifas King Burger', '450 gr/80 gr – 46 lei', 'Chiflă 80 gr, plescovită 120 gr, bacon 50 gr, ou 50 gr, branză ceddar 30 gr, salată verde 20 gr, roșii 50 gr, sos Calipso 50 gr, sare, piper, cartofi prajiti 80 gr.', 3
FROM menu_categories WHERE slug = 'burgeri';

-- SALATE de ÎNSOȚIRE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Salată asortată', '250 gr – 19,5 lei', 'Salată verde 100 gr, roșii 60 gr, castraveți 50 gr, ardei gras 30 gr, ceapă roșie 10 gr', 1
FROM menu_categories WHERE slug = 'salate'
UNION ALL
SELECT id, 'Salată de varză', '200 gr – 13 lei', 'Varză 200 gr, ulei 10 ml, oțet 5 ml, sare 3 gr', 2
FROM menu_categories WHERE slug = 'salate'
UNION ALL
SELECT id, 'Salată de murături', '200 gr – 17,5 lei', 'Castraveți 50 gr, gogoșari 50 gr, conopida 50 gr, gogonele 50 gr', 3
FROM menu_categories WHERE slug = 'salate'
UNION ALL
SELECT id, 'Salată de roșii cu telemea', '200 gr – 19,5 lei', 'Roșii 100 gr, telemea100 gr, ulei 10 ml, sare3 gr', 4
FROM menu_categories WHERE slug = 'salate';

-- GARNITURI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Cartofi prăjiți', '200 gr – 12,5 lei', 'Cartofi prăjiți 200 gr, sare 3 gr', 1
FROM menu_categories WHERE slug = 'garnituri'
UNION ALL
SELECT id, 'Cartofi Wedges', '200 gr – 16 lei', 'Cartofi wedges prajiți 200 gr, sare 3 gr', 2
FROM menu_categories WHERE slug = 'garnituri'
UNION ALL
SELECT id, 'Cartofi țărănești', '200 gr – 17,5 lei', 'Cartofi fierți 100 gr, bacon 50 gr, ceapă 15 gr, ardei gras 20 gr, usturoi 10 gr, pătrunjel, mărar 3 gr, sare 3 gr, piper 1 gr', 3
FROM menu_categories WHERE slug = 'garnituri'
UNION ALL
SELECT id, 'Cartofi cu mozzarela', '250 gr – 16,5 lei', 'Cartofi copți 150 gr, mozzarela 100 gr, sare 3 gr', 4
FROM menu_categories WHERE slug = 'garnituri'
UNION ALL
SELECT id, 'Cartofi gratinați cu gorgonzola (post și frupt)', '230 gr – 22 lei', 'Cartofi gratinați 210 gr, gorgonzola 50 gr, usturoi 5 gr, pătrunjel frunze 2 gr, sare 2 gr, ulei 3 ml', 5
FROM menu_categories WHERE slug = 'garnituri'
UNION ALL
SELECT id, 'Legume la grătar', '250 gr – 22 lei', 'Vinete 60 gr, dovlecei 60 gr, ciuperci 60 gr, ardei gras 30 gr, roșii 20 gr, ceapă roșie 20 gr, sare3 gr', 6
FROM menu_categories WHERE slug = 'garnituri';

-- PIZZA items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Pizza LA TAIFAS', '650 gr – 43 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 70 gr, salam 50 gr, bacon 40 gr, cabanos 30 gr, telemea 20 gr.', 1
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza CAPRICIOSA', '650 gr – 39 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 80 gr, salam 50 gr, ardel gras 40 gr, ciuperci 40 gr.', 2
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza QUATRO STAGIONI', '650 gr – 39 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, salam 80 gr, ciuperci 40 gr, măsline 50 gr, ardei gras 40 gr.', 3
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza DIAVOLA', '600 gr – 39 lei', 'Blat de pizza 270 gr, sos pizza 50 gr, mozzarella 120 gr, salam picant 150 gr, chilly 5 gr, piper, sare', 4
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza QUATRO FORMAGIO', '600 gr – 43 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, gorgonzola 50 gr, ementaller 50 gr, parmezan 50 gr, sare 3 gr, piper 2 gr.', 5
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza PROSCIUTO E FUNGHI', '600 gr – 39 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120gr, sunca 100gr, ciuperci 50 gr.', 6
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza BAMBINO', '600 gr – 39 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, sunca 110 gr, porumb 50 gr.', 7
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza AL TONO', '650 gr. – 42 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, ton 120 gr, ceapa 40 gr, masline 40 gr, porumb 20 gr.', 8
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza VEGETARIANA', '700 gr – 37 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella vegana 130 gr, ciuperci 100 gr, rosii 50 gr, ardei gras 50 gr, masline 50 gr, porumb 50 gr.', 9
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza SALAMI', '600 gr – 42 lei', 'Blat de pizza 270 gr, mozzarella 120 gr, pepperoni 160 gr, sos pizza 50 gr', 10
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza POLLO', '650 gr – 43 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarella 120 gr, gorgonzola 50 gr, piept de pui 100 gr, ardei roșu 40 gr, porumb boabe 20 gr.', 11
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza cu HRIBI', '650 gr - 43 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarela vegană 120 gr, hribi 125 gr, ceapa 30 gr, ardei gras 50 gr, patrunjel 1 gr, sare 3 gr, piper 1 gr.', 12
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza FALAFEL', '700 gr – 39 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarela vegană 120 gr, falafel 125 gr(5 buc), măsline 20 gr, rosii 40 gr, cartofi 70 gr, sare 3 gr, piper 2 gr', 13
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza cu CREVEȚI', '650 gr – 45 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarela vegană 120 gr, tofu 60 gr, creveți 85 gr ( 6 buc ), roșii 40 gr, usturoi 15 gr, busuioc 5 gr, sare 3 gr, piper 2 gr.', 14
FROM menu_categories WHERE slug = 'pizza'
UNION ALL
SELECT id, 'Pizza KEBAB', '750 gr – 40 lei', 'blat de pizza 270 gr., sos 40 gr, mozzarela 120 gr., carne kebab pui 200 gr., roșii 50 gr, ceapă 20 gr., salată iceberg 30 gr, sos kebab 20 gr', 15
FROM menu_categories WHERE slug = 'pizza';

-- SOSURI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Sos DULCE', '50 gr – 4,5 lei', 'Roșii pasate 40 gr, oregano 2 gr, cimbru 2 gr, ulei de măsline 3 gr, sare 1gr, zahar 2 gr.', 1
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos PICANT', '50 gr – 4,5 lei', 'Rosii pasate 40gr, oregano 2 gr, cimbru 2gr, ulei de masline 3ml, sare 1gr, zahar 2 gr, fulgi de chilly 5g.', 2
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos TZATZIKI', '50 gr – 6,5 lei', 'Iaurt grecesc 30 gr, castravete 10 gr, marar 3gr, sare 2 gr, zeama de lamaie 2 gr, usturoi 3 gr.', 3
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos LA TAIFAS', '50 gr – 6,5 lei', 'Iaurt grecesc 10 gr, maioneza 15 gr, Grand Cucina 15 gr, ulei de măsline 5 ml, mentă 1 gr, usturoi 2 gr, sare 2 gr', 4
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos PIZZA', '50 gr – 6,5 lei', 'Bulion rosii 40 gr, ulei de masline 4 gr, cimbru 1 gr, busuioc 1 gr, oregano 1 gr, usturoi granulat 1 gr, sare 1 gr, piper 1 gr', 5
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos CALYPSO roze', '50 gr – 7 lei', 'Maioneza 20gr, ketchup 20 gr, boia de ardei 5 gr, cognac 5 ml, sare 2gr', 6
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos de MAIONEZA cu usturoi', '50 gr – 5,5 lei', 'Maioneza 44 gr, usturoi 3 gr, oregano 2 gr, zeama lamaie 1 gr', 7
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Sos KEBAB', '70 gr - 6 lei', 'Grand Cucina 200 gr., smântână 100 gr., maioneză 100 gr., zeamă de lămâie 20 gr., mujdei 5 gr., oregano 0,5 gr., sare 2 gr., piper 0,5 gr.', 8
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Mujdei de usturoi', '50 gr – 5 lei', 'Usturoi 15 gr, ulei 30 ml, zeama lamaie 4 ml, sare 1 gr', 9
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Muștar', '50 gr – 4 lei', '', 10
FROM menu_categories WHERE slug = 'sosuri'
UNION ALL
SELECT id, 'Smântână', '50 gr – 5,5 lei', '', 11
FROM menu_categories WHERE slug = 'sosuri';

-- PRODUSE DE POST items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Paste cu legume', '350 gr – 36 lei', 'Pene 150 gr, ciuperci 50 gr, ardei gras 20 gr, ceapă 10, dovlecei 20 gr, sos de roșii 100 ml, sare 3 gr, piper 1 gr', 1
FROM menu_categories WHERE slug = 'post'
UNION ALL
SELECT id, 'Pizza vegetală', '600 gr – 37 lei', 'Blat de pizza 270 gr, sos de pizza 50 gr, mozzarele de post 130 gr, ciuperci 10 gr, porumb 20 gr, măsline 20 gr, ardei gras 20 gr, sare 3 gr, piper 2 gr', 2
FROM menu_categories WHERE slug = 'post'
UNION ALL
SELECT id, 'Tofu la grătar cu cartofi prăjiți și salată asortată', '460 gr – 41 lei', 'Soia 200 gr, cartofi prăjiți 150 gr, salată 60 gr, roșie 25 gr, castraveți 15 gr, ulei 5 ml, sare 3 gr, piper 2 gr', 3
FROM menu_categories WHERE slug = 'post'
UNION ALL
SELECT id, 'Șnițel de soia cu cartofi wedges și salată asortată', '530 gr – 41 lei', 'Soia 250 gr, cartofi wedges 180 gr, roșii 100 gr, ulei 5 ml, sare 3 gr, piper 2 gr', 4
FROM menu_categories WHERE slug = 'post'
UNION ALL
SELECT id, 'Big sandwich de post', '300 gr – 30 lei', 'Chiflă 90 gr, roșie 30 gr, salată verde 15 gr, șnitzel de soia 100 gr, castravete 20 gr, tofu 40 gr, sare 3 gr, piper 2 gr', 5
FROM menu_categories WHERE slug = 'post';

-- PÂINE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Foccacia cu parmezan', '270 gr – 16,5 lei', 'Blat pizza 270 gr, parmezen 50 gr', 1
FROM menu_categories WHERE slug = 'paine'
UNION ALL
SELECT id, 'Foccacia cu ulei de măsline și oregano', '200 gr – 13 lei', 'Blat pizza 270 gr, oregano 3 gr, ulei de măsline 10 gr.', 2
FROM menu_categories WHERE slug = 'paine'
UNION ALL
SELECT id, 'Pâine pe vatră', '135 gr – 5 lei', 'Blat pizza 270 gr, oregano, sare', 3
FROM menu_categories WHERE slug = 'paine';

-- DESERT items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Înghețată', '150 gr – 22 lei', 'Înghețată 3 cupe, toping de ciocolată 5 ml', 1
FROM menu_categories WHERE slug = 'desert'
UNION ALL
SELECT id, 'Clătite cu brânză dulce și sos de vanilie', '350 gr – 28,5 lei', 'Lapte 60 ml, făină 40 gr, ou 60 gr, zahăr 10 gr, brânză de vaci 70 gr, stafide 10 gr, Grand Cucina 100 ml, zahăr vanilat 5 gr', 2
FROM menu_categories WHERE slug = 'desert'
UNION ALL
SELECT id, 'Clătite cu ciocolată/dulceață', '300 gr – 25 lei', 'Lapte 60 ml, ou 60 ml, făină 115 gr, zahăr 15 gr, dulceață/ciocolată 50 gr, sare 2 gr', 3
FROM menu_categories WHERE slug = 'desert'
UNION ALL
SELECT id, 'Papanași', '350 gr – 32 lei', 'Lapte 60 ml, ou 50 gr, făină 40 gr, bicarbonat 5 gr, sare1 gr, smântână 100 gr, dulceață 50 gr', 4
FROM menu_categories WHERE slug = 'desert'
UNION ALL
SELECT id, 'Tarta cu lămâie', '150 gr – 27,5 lei', 'Tartă cu lămâie 150 gr, inghețată 50 gr, frunze de mentă', 5
FROM menu_categories WHERE slug = 'desert'
UNION ALL
SELECT id, 'Cheesecake', '200 gr – 30 lei', 'Cheesecake, sos de fructe de pădure, mentă', 6
FROM menu_categories WHERE slug = 'desert';

-- VINURI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Vinuri albe 750 ml', '', 'Simbol - Tămâioasă Românească demisec Domeniile Bohotin - 65 lei | Simbol – Sauvognon Blank sec Domeniile Bohotin - 65 lei | Pelin de Urlați demisec - 45 lei | Simbol - Tămâioasă Românească sec Domeniile Bohotin - 65 lei | Selecții – Moscat Otonel demidulce Domeniile Bohotin - 55 lei | Șarba sec Domeniile Gârboiu - 65 lei', 1
FROM menu_categories WHERE slug = 'vinuri'
UNION ALL
SELECT id, 'Vinuri roșii 750 ml', '', 'Poem Fetească neagră sec Domeniile Bohotin – 80 lei | Zur-zur Fetească Neagră demidulce Domeniile Bohotin – 44 lei | Poem cupaj( FN+M+CS ) sec Domeniile Bohotin – 80 lei | Pelin de Urlați demisec - 45 lei | Rezerve Fetească Neagră demidulce Domeniile Bohotin – 87 lei', 2
FROM menu_categories WHERE slug = 'vinuri'
UNION ALL
SELECT id, 'Vinuri roze 750 ml', '', 'Simbol – Busuioacă de Bohotin demisec Domeniile Bohotin - 65 lei | Selecții – Busuioacă de Bohotin demidulce Domeniile Bohotin - 65 lei | Simbol – Busuioacă de Bohotin sec Domeniile Bohotin - 65 lei | Pelin de Urlați demisec - 45 lei', 3
FROM menu_categories WHERE slug = 'vinuri'
UNION ALL
SELECT id, 'Spumante 750 ml', '', 'Spumant brut Domeniile Bohotin – 60 lei | Spumant Muscat Otonel dulce – 60 lei | Spumant roze dulce Domeniile Bohotin – 60 lei | Spumant demisec Domeniile Bohotin – 60 lei', 4
FROM menu_categories WHERE slug = 'vinuri'
UNION ALL
SELECT id, 'Vinul La Taifas', '', 'vin de masa 200 ml - 10 lei | vin de masa carafă 0,500 l - 24 lei | vin de masa carafă 1 l - 45 lei | Vinuri albe: Muscat Otonel demidulce, Tămâioasă Românească demisec, Sauvignon Blank sec, Fetească Albă demisec | Vinuri roșii: Fetească Neagră demidulce, Fetească Neagră demisec, Merlot sec | Vinuri roze: Busuioacă de Bohotin demidulce, Busuioacă de Bohotin demisec', 5
FROM menu_categories WHERE slug = 'vinuri';

-- BERE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Tuborg', '500 ml – 11 lei', '', 1
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Tuborg FA', '500 ml – 11 lei', '', 2
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Carlsberg', '500 ml – 12,5 lei', '', 3
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Skol', '500 ml – 9 lei', '', 4
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Holsten', '500 ml – 8,5 lei', '', 5
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Bucur', '330 ml – 14 lei', '', 6
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Corona', '330 ml – 15,5 lei', '', 7
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Bermas', '500 ml – 8,5 lei', '', 8
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Călimani', '500 ml – 8,5 lei', '', 9
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Suceava', '500 ml – 8,5 lei', '', 10
FROM menu_categories WHERE slug = 'bere'
UNION ALL
SELECT id, 'Bere draught', '400 ml', 'Calimani – 8 lei | Skol – 8,5 lei | Tuborg – 11 lei', 11
FROM menu_categories WHERE slug = 'bere';

-- BAUTURI SPIRTOASE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'TRADITIONALE 50 ml', '', 'Palinca prune – 20 lei | Palinca pere – 22 lei | Palinca prune afumate – 22 lei | Palinca mere – 17,5 lei | Palinca fructe – 17,5 lei | Palinca caise – 22 lei | Afinata - 20 lei', 1
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'VOTCA 50 ml', '', 'Absolut – 12,5 lei | Finlandia – 12,5 lei | Tazoscki – 8 lei', 2
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'WHISKY 50 ml', '', 'Jack Daniels – 16,5 lei | Balantines – 13,5 lei | J&B – 16,5 lei | Johny Walker – 13,5 lei', 3
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'DISTILATE DE VIN', '', 'Jidvei VSOP 50 ml – 14 lei | Miorita VS 50 ml – 15 lei | Miorita VSOP 50 ml – 19 lei | Metaxa 7 * 50 ml – 22 lei', 4
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'Rom', 'Captain Morgan/Havana club 50 ml – 14,5 lei', '', 5
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'Gin Wembley', '50 ml - 13,5 lei', '', 6
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'Tequilla', '( tequila, sare, lime ) 30 ml – 11 lei', '', 7
FROM menu_categories WHERE slug = 'bauturi'
UNION ALL
SELECT id, 'JAGERMEISTER', '0,50 ml – 11 lei', '', 8
FROM menu_categories WHERE slug = 'bauturi';

-- COCKTAILURI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Taifas Mojito', '330 ml – 27 lei', 'Suc de lamaie 50 ml, lime 20 gr, rom alb 50 ml, apa tonica 100 ml zahar brun 5 gr, menta 5 gr, gheață 100 gr', 1
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Gin Tonic', '330 ml – 27 lei', 'Gin 70 ml, apa tonica 100 ml, lamaie 60 gr, gheata 100 gr', 2
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Aperol Spritz', '400 ml – 27 lei', 'Aperol 70 ml, prosseco 130 ml, gheata 50 gr, suc de portocale 50 ml, gheata 100 gr', 3
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Sex on the beach', '400 ml – 29 lei', 'Suc de ananas 100 ml, suc de merisoare 100 ml, zeama de lamaie 50 ml, votca 50 ml, gheață 100 gr', 4
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Dum Dum Taifas', '400 gr – 26,5 lei', 'Suc de ananas 150 ml, suc de merisoare 100 ml, zeama de lamaie 50 ml, gheata 100g', 5
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Jugerboomb', '250 ml – 35 lei', 'Jagermeister 50 ml, absint 50 ml, energizant 150 ml', 6
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Hugo', '300 ml – 29 lei', '150 ml proseco, 30 ml apă mineral, sirop de soc 20 ml, lime 3 felii, mentă 6 frz, gheață 100 gr', 7
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'COSMOPOLITAN', '105 ml – 30 lei', 'Votca 40 ml, triplu sec 15 ml, suc de lamaie 20 ml, suc de merisoare 20 ml', 8
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Sunshine cocktail (Non-alcoolice)', '250 ml – 23 lei', 'Suc de merișoare 100 ml, apă tonică 100 ml, piure de fructe 25 ml, lime, 1 felie, lamiae 1 felie, gheață 100 gr', 9
FROM menu_categories WHERE slug = 'cocktailuri'
UNION ALL
SELECT id, 'Green Apple (Non-alcoolice)', '300 ml – 23 lei', 'suc de mere verzi 200 ml, zahăr brun 1 lingură, lime ½ buc, gheață mărunțită sau întreagă, sirop blue curacao 5ml', 10
FROM menu_categories WHERE slug = 'cocktailuri';

-- LIMONADE SI FRESH-URI items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'LIMONADA CLASICA', '330 ml – 16,5 lei', 'Zeama de lamaie 50 ml, sirop de zahar 50 ml, sirop de menta 10 ml, apa 100 ml, gheata 100 gr, menta 10 gr, lamaie 10 gr', 1
FROM menu_categories WHERE slug = 'limonade'
UNION ALL
SELECT id, 'LIMONADA CU AROME', '330 ml – 18,5 lei', 'Zeama de lamaie 50 ml, sirop de zahar 50 ml, arome 20 ml, apa 100 ml, gheata 100 gr, menta 5 gr, lamaie 5 gr', 2
FROM menu_categories WHERE slug = 'limonade'
UNION ALL
SELECT id, 'FRESH DE PORTOCALE', '330 ml – 16,5 lei', 'Suc de portocale 200 ml, gheata 100 gr, sirop de zahar 30 ml', 3
FROM menu_categories WHERE slug = 'limonade'
UNION ALL
SELECT id, 'FRESH DE GRAPEFRUIT', '330 ml – 16,5 lei', 'Suc de Grapefruit 200 ml, gheata 100 gr, sirop de zahar 30 ml', 4
FROM menu_categories WHERE slug = 'limonade'
UNION ALL
SELECT id, 'FRESH MIXT', '330 ml – 16,5 lei', 'Suc de grapefruit 100 ml, suc de portocale 100 ml, gheata 100 gr, sirop de zahar 30 ml', 5
FROM menu_categories WHERE slug = 'limonade';

-- CAFEA items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'ESPRESSO SCURT', '30 ml – 8,5 lei', 'Cafea Illy capsulă roșie 6,7 gr, apa 30 ml', 1
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'ESPRESSO DUBLU', '60 ml – 15 lei', 'Cafea Illy capsulă roșie 2X6,7 gr, apa 60 ml', 2
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CAFÉ RISTRETO', '15 ml – 8 lei', 'Cafea Illy capsula roșie 6,7 gr, apă 15 ml', 3
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'ESPRESSO LUNGO', '80 ml – 8,5 lei', 'Cafea Illy capsula albastră 6,2 gr, apă 80 ml', 4
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CAFÉ MACCHIATO', '40 ml – 9 lei', 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 10 ml, apa 30 ml', 5
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CAFÉ LATTE', '200 ml – 12 lei', 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 170 ml, apa 30 ml', 6
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CAPPUCINO', '160 ml – 10 lei', 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 130 ml, apa 30 ml', 7
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CAPPUCINO VIENNESE', '175 ml – 15 lei', 'Cafea Illy capsulă roșie 6,7 gr, cremă lapte 130 ml, apa 30 ml, frișcă 15 gr', 8
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CAFÉ DECAFFEINATO EXPRESSO/LUNGO', '30ml/80 ml – 9 lei', 'Cafea Illy capsulă decof 6,7 gr, apa 30/80 ml', 9
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CIOCOLATA CALDĂ', '200 ml – 10 lei', 'Ciocolată plic 25 gr, apă 200 ml, optional miere de albine plic', 10
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'CEAI', '200 ml - 10 lei', 'Plic de ceai 2 gr, apă 200 ml', 11
FROM menu_categories WHERE slug = 'cafea'
UNION ALL
SELECT id, 'VIN FIERT', '300 ml – 15 lei ( ingrediente la 5 l)', 'Vin fiert 240 ml, apă 60 ml, zahăr 6 gr, cuișoare 3 buc, scorțișoară ½ baton, coajă portocală, piper 5 boabe', 12
FROM menu_categories WHERE slug = 'cafea';

-- BAUTURI RACORITOARE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Coca cola/Fanta/ Sprite', '250 ml – 8,5 lei', '', 1
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Schweppes Tonic', '250 ml – 11 lei', '', 2
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Fuze Tea', '250 ml – 12 lei', '', 3
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Cappy portocale /rosii', '250 ml – 11 lei', '', 4
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Apa mineral', '330 ml – 8,5 lei', '', 5
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Apa plata', '330 ml – 8,5 lei', '', 6
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Apa mineral', '750 ml – 15,5 lei', '', 7
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Apa plata', '750 ml – 15,5 lei', '', 8
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Suc de rosii', '330 ml – 10 lei', '', 9
FROM menu_categories WHERE slug = 'bauturi-racoritoare'
UNION ALL
SELECT id, 'Suc de mere natural ( diverse arome)', '330 ml – 8 lei', '', 10
FROM menu_categories WHERE slug = 'bauturi-racoritoare';

-- DIVERSE items
INSERT INTO menu_items (category_id, name, details, ingredients, display_order)
SELECT id, 'Alune', '100 gr – 8,5 lei', '', 1
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Fistic', '100 gr – 20 lei', '', 2
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Extrapizza', '– 5 lei', '', 3
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Ardei iute', '30 gr – 3 lei', '', 4
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Tuborg 500 ml DZ', '– 12 lei', '', 5
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Tuborg FA 500 ml DZ', '– 12 lei', '', 6
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Sprite 330 ml DZ', '– 11 lei', '', 7
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Coca-cola 330 ml DZ', '– 11 lei', '', 8
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Fanta 330 ml DZ', '– 11 lei', '', 9
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Apă minerală/plată 500 ml', '– 9 lei', '', 10
FROM menu_categories WHERE slug = 'diverse'
UNION ALL
SELECT id, 'Red Bull', '0,250 – 13 lei', '', 11
FROM menu_categories WHERE slug = 'diverse'; 