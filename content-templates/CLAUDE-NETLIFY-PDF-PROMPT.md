# Prompt voor Claude: Nederlandse Netlify-PDF (handmatige `dist`-upload)

Plak het blok hieronder in Claude (browser). De bedoeling is dat Claude een **Nederlandse** handleiding schrijft die je daarna als PDF exporteert (bijv. Google Docs → PDF).

---

```
Je schrijft een korte handleiding in het NEDERLANDS voor niet-technische gebruikers. De handleiding wordt later als PDF geëxporteerd (bijvoorbeeld vanuit Google Docs of Word). Gebruik duidelijke titels, genummerde stappen, en geen jargon zonder uitleg.

DOEL
Uitleggen hoe je de statische website “Kapsalon TND” (Vite + React) op Netlify zet door ALLEEN de inhoud van de map `dist` te uploaden. GitHub wordt NIET gekoppeld aan Netlify. De gebruiker heeft al een eigen domeinnaam; de registrar is Versio.

TOON EN NIVEAU
- Extreem eenvoudig: geen stap overslaan.
- “Hand aan de hand”: beschrijf wat de gebruiker op het scherm ziet en waar hij/zij klikt (knoppen, menu’s) in de Netlify-interface. Als exacte Engelse knoppenamen voorkomen, geef de Nederlandse uitleg erbij.
- Korte zinnen. Waar nodig: één zin waarom iets nodig is.

TECHNISCHE FEITEN (moeten kloppen in de gids)
- Het project staat op de computer van de gebruiker. Op de site moet eerst `npm install` en daarna `npm run build` worden uitgevoerd in de projectmap. Dat maakt de map `dist` aan.
- Alleen de INHOUD van `dist` gaat naar Netlify (niet `src`, niet `node_modules`, niet de hele projectmap).
- Dit is een SPA (React Router): na build moet in `dist` het bestand `_redirects` aanwezig zijn (komt uit de map `public` van het project). Zo werken directe links zoals `/amsterdam-oost` en `/zaandam` na vernieuwen van de pagina.
- Standaard is de site voor het hoofddomein bedoeld (pad `/`). Geen GitHub Pages-subpad tenzij expliciet anders geconfigureerd.
- De zichtbare teksten, prijzen en veel afbeeldingen komen uit een “content”-laag: een Google Spreadsheet en/of CSV-bestanden in de map `content/csv`, die bij `npm run build` worden omgezet naar `src/data/sheet-content.json`. Bij handmatige upload naar Netlify gebeurt die omzetting ALLEEN op de computer van de bouwer, niet op Netlify.

INHOUD VAN DE PDF (verplichte secties, in deze volgorde)

1) Voorbereiding op je computer
   - Node.js installeren (in één zin: nodig om te bouwen; link naar nodejs.org mag genoemd worden).
   - Terminal of Command Prompt openen in de projectmap.
   - Commando’s exact: `npm install` daarna `npm run build`.
   - Controleren dat de map `dist` bestaat en niet leeg is.

2) Waar wijzig je wat? (belangrijk voor de eigenaar)
   Leg in eenvoudige taal het onderscheid uit:
   - **Prijzen, teksten op locatiepagina’s, carrousels, home-galerij, adres/telefoon in de sheet-structuur:** dat hoort in de **Google Sheet** (of, als ze zonder Google werken, in de CSV-bestanden in `content/csv` volgens de projectdocumentatie). Na elke wijziging daar moet opnieuw `npm run build` op de computer, daarna opnieuw `dist` uploaden naar Netlify.
   - **Layout, kleuren, nieuwe pagina’s, technische aanpassingen:** dat is **programmeerwerk** in de code (`src`, enz.). Ook daarna: opnieuw `npm run build` en opnieuw `dist` uploaden.
   Maak expliciet: zonder opnieuw bouwen en opnieuw uploaden ziet de live site op Netlify de wijzigingen niet.

3) Stappen na een inhoudelijke wijziging (sheet of CSV)
   - Wijzig de Google Sheet (of de juiste CSV’s) volgens de kolomnamen/tabbladen die bij het project horen.
   - Sla op.
   - Op de computer: in de projectmap opnieuw `npm run build` uitvoeren (dit voert automatisch de content-sync vóór de build uit, zoals in het project ingesteld).
   - Controleren dat `dist` vernieuwd is.
   - Daarna: dezelfde handmatige upload-flow naar Netlify als bij de eerste keer (verwijs naar de sectie over handmatig uploaden).
   Kort noemen: als iemand **geen** spreadsheet- of CSV-sync gebruikt en alleen lokale bestanden in het project bewerkt, is de kernstap nog steeds: opnieuw `npm run build` en opnieuw `dist` uploaden.

4) Netlify-account en nieuwe site (zonder Git)
   - Naar netlify.com, account aanmaken/inloggen.
   - Waar je een “nieuwe site” start ZONDER “Import from Git”.
   - Zoek de optie voor handmatig deployen / drag-and-drop / deploy manually (gebruik de actuele Netlify-termen en leg ze uit).
   - Duidelijk maken: je sleept of uploadt de INHOUD van `dist` (of een zip van die inhoud—leg uit wat werkt als de gebruiker twijfelt).

5) Eerste publicatie testen
   - De tijdelijke Netlify-URL openen.
   - Homepage openen.
   - Minstens twee subpagina’s direct in de adresbalk typen en Enter: `/amsterdam-oost` en `/zaandam`. Uitleggen dat dit moet werken zonder wit scherm—zo test je de SPA-redirect.

6) Eigen domein koppelen (Netlify + Versio)
   - In Netlify: waar je “Domain settings” / custom domain toevoegt.
   - Domein toevoegen, DNS-verificatie in het kort.
   - Daarna: inloggen bij Versio (registrar).
   - Stap voor stap: waar DNS staat bij Versio (algemeen: DNS-beheer / nameservers / records—neutrale formulering omdat het panel kan wijzigen).
   - Leg uit: volg exact wat Netlify in het scherm toont (A-record of CNAME); geen verzonnen IP-adressen.
   - SSL/HTTPS: in Netlify automatisch certificaat na DNS-wachten.
   - Propagatie: DNS kan tot 24–48 uur duren (kort vermelden).

7) Elke keer opnieuw online zetten na wijzigingen (handmatig)
   - Samenvatting in 4–6 genummerde stappen: wijziging maken → `npm run build` → inhoud `dist` naar Netlify uploaden → even wachten → site verversen en controleren (eventueel privévenster).
   - Benadruk: dit geldt voor zowel sheet-wijzigingen als code-wijzigingen; het verschil zit alleen in *waar* je de eerste stap doet (sheet/CSV vs. code).

8) Veelvoorkomende problemen (max. 6 bullets)
   - Wijzigingen in de sheet zichtbaar in Google maar niet op de site → vergeten `npm run build` of vergeten opnieuw `dist` te uploaden.
   - Witte pagina na refresh op een subpagina → `_redirects` ontbreekt in `dist` of verkeerde map geüpload.
   - Verkeerde map geüpload → site stuk.
   - Domein werkt niet → DNS bij Versio nog niet goed of nog niet verspreid.
   - enz.

VERBODEN / NIET DOEN
- Geen stappen voor “Connect to GitHub” of repository koppelen.
- Geen aannames dat Netlify `npm run build` voor hen draait bij handmatige upload.

OUTPUTFORMAT
- Lever de volledige handleiding als doorlopende Nederlandse tekst met duidelijke koppen en genummerde substappen.
- Voeg een korte “Checklist vóór je live gaat” en een “Checklist na een wijziging” toe aan het eind (vinklijst-stijl in tekst).
- Lengte: genoeg om echt niets over te slaan, maar nog steeds een compacte PDF (denk 3–5 pagina’s A4 bij normale lettergrootte).

Als je geen PDF-bestand rechtstreeks kunt aanmaken: lever alleen de definitieve Nederlandse tekst; de gebruiker plakt die in Google Docs en exporteert als PDF.
```

---

Meer detail over content en spreadsheet: [README.md](./README.md).
