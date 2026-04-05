/**
 * One-time / maintenance seed: writes content/csv/*.csv from current site-equivalent data.
 * Run: node scripts/seed-csv.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { stringifyRows } from "./lib/csv-stringify.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const csvDir = join(root, "content", "csv");

const massageItems = [
  ["Relax Normal — 30 min / 1 uur", "€45 / €55"],
  ["Medical Hard — 30 min / 1 uur", "€45 / €65"],
  ["Speciaal Royal — 1 uur", "€85"],
  ["Hoofdmassage", "€15"],
];

function damesSections() {
  let sort = 0;
  const rows = [];
  const add = (section, sectionDesc, service, price) => {
    sort += 10;
    rows.push({ section, sectionDesc, service, price, sort });
  };
  const haar = [
    ["Dames knippen", "€30"],
    ["Vlechten (dames & heren)", "v.a. €40"],
    ["Föhnen (alle modellen)", "v.a. €30"],
    ["Haarstyling & kapsels", "v.a. €50"],
    ["Haarmasker", "€10"],
    ["Proteïnebehandeling (1 jaar effect)", "v.a. €50"],
    ["Haar verven", "Op aanvraag"],
    ["Highlights / mèches", "Op aanvraag"],
  ];
  for (const [s, p] of haar) add("Haar & styling", "", s, p);
  for (const [s, p] of [
    ["Dag make-up", "v.a. €30"],
    ["Avond / feest make-up", "v.a. €50"],
  ])
    add("Make-up", "", s, p);
  for (const [s, p] of [
    ["Wimperextensions", "v.a. €40"],
    ["Lash lifting", "€30"],
    ["Brow lifting", "€30"],
    ["Wenkbrauwen", "€20"],
  ])
    add("Wimpers & wenkbrauwen", "", s, p);
  for (const [s, p] of [
    ["Gelnagels & extensions", "v.a. €30"],
    ["Pedicure met gel", "v.a. €30"],
    ["Complete voetverzorging (incl. scrub)", "v.a. €40"],
  ])
    add("Nagels & pedicure", "", s, p);
  for (const [s, p] of [
    ["Gezicht reinigen (wax of draad)", "v.a. €30"],
    ["Dieptereiniging + masker + gezichtsmassage", "€40"],
  ])
    add("Gezichtsverzorging", "", s, p);
  for (const [s, p] of massageItems) add("Massage", "", s, p);
  return rows;
}

function herenOostZaandamSections() {
  let sort = 0;
  const rows = [];
  const add = (section, sectionDesc, service, price) => {
    sort += 10;
    rows.push({ section, sectionDesc, service, price, sort });
  };
  for (const [s, p] of [
    ["Knippen", "€15"],
    ["Vlechten (dames & heren)", "v.a. €40"],
    ["Baard", "€15"],
    ["Haar wassen (hamam)", "€5"],
    ["Wenkbrauwen", "€15"],
    ["Wangen ontharen", "€15"],
    ["Haar verven", "€25"],
    ["Baard verven", "€15"],
  ])
    add("Haar & baard", "", s, p);
  for (const [s, p] of [
    ["Masker + scrub", "€30"],
    ["Zwart masker", "€15"],
    ["Scrub", "€15"],
  ])
    add("Gezichtsverzorging", "", s, p);
  for (const [s, p] of massageItems) add("Massage", "", s, p);
  return rows;
}

function herenWestSections() {
  let sort = 0;
  const rows = [];
  const add = (section, sectionDesc, service, price) => {
    sort += 10;
    rows.push({ section, sectionDesc, service, price, sort });
  };
  for (const [s, p] of [
    ["Knippen", "€12"],
    ["Vlechten (dames & heren)", "v.a. €40"],
    ["Baard", "€15"],
    ["Haar wassen (hamam)", "€5"],
    ["Wenkbrauwen", "€15"],
    ["Wangen ontharen", "€15"],
    ["Haar verven", "€25"],
    ["Baard verven", "€15"],
  ])
    add("Haar & baard", "", s, p);
  for (const [s, p] of [
    ["Masker + scrub", "€30"],
    ["Zwart masker", "€15"],
    ["Scrub", "€15"],
  ])
    add("Gezichtsverzorging", "", s, p);
  for (const [s, p] of massageItems) add("Massage", "", s, p);
  return rows;
}

function expandPriceRows() {
  const out = [];
  const locs = ["amsterdam-oost", "amsterdam-west", "zaandam"];
  const dames = damesSections();
  for (const loc of locs) {
    for (const r of dames) {
      out.push([
        loc,
        "dames",
        r.section,
        r.sectionDesc,
        r.service,
        r.price,
        r.sort,
      ]);
    }
  }
  for (const r of herenOostZaandamSections()) {
    out.push(["amsterdam-oost", "heren", r.section, r.sectionDesc, r.service, r.price, r.sort]);
    out.push(["zaandam", "heren", r.section, r.sectionDesc, r.service, r.price, r.sort]);
  }
  for (const r of herenWestSections()) {
    out.push(["amsterdam-west", "heren", r.section, r.sectionDesc, r.service, r.price, r.sort]);
  }
  return out;
}

const wp = "https://kapsalontnd.nl/wp-content/uploads";

/** Default site base for URLs in CSV (matches Netlify root deploy). Use `/repo/` for GitHub Pages subpath. */
const BASE = "/";

function carouselRows() {
  const rows = [];
  let sort = 0;
  const add = (loc, kind, src, text, objectPosition) => {
    sort += 10;
    rows.push([loc, kind, src, text, objectPosition ?? "", sort]);
  };
  add(
    "amsterdam-oost",
    "video",
    `${wp}/2023/05/WhatsApp-Video-2023-05-15-at-13.35.01.mp4`,
    "Impressie van de salon op de Amsterdam-pagina van Kapsalon TND.",
    "",
  );
  add(
    "amsterdam-oost",
    "image",
    `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.12.58.jpeg`,
    "Kapsalon TND Amsterdam - Oost.",
    "",
  );
  add(
    "amsterdam-oost",
    "image",
    `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.58-533x1024.jpeg`,
    "Kapsalon TND Amsterdam - Oost.",
    "object-[center_25%]",
  );
  add(
    "amsterdam-oost",
    "image",
    `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-783x1024.jpeg`,
    "Kapsalon TND Amsterdam - Oost.",
    "object-[center_20%]",
  );
  add(
    "amsterdam-oost",
    "image",
    `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-1-481x1024.jpeg`,
    "Kapsalon TND Amsterdam - Oost.",
    "object-[center_22%]",
  );
  add(
    "amsterdam-oost",
    "image",
    `${wp}/2022/06/WhatsApp-Image-2022-06-13-at-6.23.01-PM.jpeg`,
    "Kapsalon TND Amsterdam - Oost.",
    "",
  );

  add(
    "zaandam",
    "video",
    `${wp}/2023/05/WhatsApp-Video-2023-05-15-at-13.35.01.mp4`,
    "Impressie van de salon op de Zaandam-pagina van Kapsalon TND.",
    "",
  );
  add(
    "zaandam",
    "video",
    `${wp}/2024/03/WhatsApp-Video-2024-03-02-at-15.41.05.mp4`,
    "Tweede video-impressie van Kapsalon TND Zaandam.",
    "",
  );
  add(
    "zaandam",
    "image",
    `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-783x1024.jpeg`,
    "Kapsalon TND Zaandam.",
    "object-[center_20%]",
  );
  add(
    "zaandam",
    "image",
    `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-1-481x1024.jpeg`,
    "Kapsalon TND Zaandam.",
    "object-[center_22%]",
  );
  add(
    "zaandam",
    "image",
    `${wp}/2024/03/WhatsApp-Image-2024-03-02-at-14.23.27-1.jpeg`,
    "Kapsalon TND Zaandam.",
    "",
  );
  add(
    "zaandam",
    "image",
    `${wp}/2024/03/WhatsApp-Image-2024-03-02-at-16.01.26-1.jpeg`,
    "Kapsalon TND Zaandam.",
    "",
  );

  const west = (file, alt, pos) =>
    `${BASE}images/amsterdam-west/${file}`;
  add(
    "amsterdam-west",
    "image",
    west("carousel-west-stations.png"),
    "Interieur Kapsalon TND Amsterdam - West met hexagonale plafondverlichting en gouden spiegels.",
    "object-[center_35%]",
  );
  add(
    "amsterdam-west",
    "image",
    west("carousel-west-interior.png"),
    "Blik vanaf de ingang in de salon Amsterdam - West met wachtbank en werkplekken.",
    "object-[center_40%]",
  );
  add(
    "amsterdam-west",
    "image",
    west("carousel-west-storefront.png"),
    "Gevel en entree TND3 Kapsalon aan de Kinkerstraat, Amsterdam - West.",
    "object-[center_30%]",
  );
  return rows;
}

function locationRows() {
  return [
    [
      "amsterdam-oost",
      "Amsterdam - Oost",
      "Molukkenstraat 35H, 1095 AT Amsterdam",
      "Molukkenstraat 35H, 1095 AT Amsterdam",
      "+31 622288480",
      "tel:+31622288480",
      "https://wa.me/31622288480",
      "https://www.google.com/maps/search/?api=1&query=Molukkenstraat+35H,+1095+AT+Amsterdam",
      `${BASE}images/amsterdam-oost/oostinterior.jpeg`,
    ],
    [
      "amsterdam-west",
      "Amsterdam - West",
      "Kinkerstraat 294H, 1053 GC Amsterdam",
      "Kinkerstraat 294H, 1053 GC Amsterdam",
      "+31 622288480",
      "tel:+31622288480",
      "https://wa.me/31622288480",
      "https://www.google.com/maps/search/?api=1&query=Kinkerstraat+294H,+1053+GC+Amsterdam",
      `${BASE}images/amsterdam-west/westinterior.jpeg`,
    ],
    [
      "zaandam",
      "Zaandam",
      "Westzijde 54, 1506 EG Zaandam",
      "Westzijde 54, 1506 EG Zaandam",
      "+31 645000009",
      "tel:+31645000009",
      "https://wa.me/31645000009",
      "https://www.google.com/maps/search/?api=1&query=Westzijde+54,+1506+EG+Zaandam",
      `${BASE}images/zaandam/zaandaminterior.jpeg`,
    ],
  ];
}

function galleryRows() {
  return [
    ["amsterdam-oost", 10, `${BASE}images/amsterdam-oost/oostinterior.jpeg`, "Interieur van Kapsalon TND Amsterdam - Oost."],
    ["amsterdam-west", 10, `${BASE}images/amsterdam-west/westinterior.jpeg`, "Interieur van Kapsalon TND Amsterdam - West."],
    ["zaandam", 10, `${BASE}images/zaandam/zaandaminterior.jpeg`, "Interieur van Kapsalon TND Zaandam."],
  ];
}

function homeGalleryRows() {
  let sort = 0;
  const rows = [];
  const add = (src, alt, objectPosition = "") => {
    sort += 10;
    const path = src.startsWith("http") ? src : `${BASE}${src.replace(/^\/+/, "")}`;
    rows.push([sort, path, alt, objectPosition]);
  };
  add("images/home/hero-banner.jpeg", "Kapsalon TND banner with salon branding and models.");
  add("images/home/style-1.jpeg", "Close-up salon hairstyle result at Kapsalon TND.");
  add(
    "images/home/image1.jpeg",
    "Spacious Kapsalon TND interior with barber stations and warm lighting.",
  );
  add("images/home/style-2.jpeg", "Hair styling result photographed inside the salon.");
  add(
    "images/home/image2.jpeg",
    "Salon interior view toward the entrance with modern lighting.",
  );
  add(
    "images/home/style-3.jpeg",
    "Team and client around a gold barber chair in the Kapsalon TND salon.",
    "object-[center_38%]",
  );
  add(
    "images/home/image3.jpeg",
    "Kapsalon TND workspace with styling stations and salon branding.",
  );
  return rows;
}

await mkdir(csvDir, { recursive: true });

const priceHeader = [
  "location",
  "gender",
  "section",
  "section_description",
  "service",
  "price",
  "sort_order",
];
await writeFile(
  join(csvDir, "prices.csv"),
  stringifyRows(priceHeader, expandPriceRows()),
);

await writeFile(
  join(csvDir, "carousel.csv"),
  stringifyRows(
    ["location", "kind", "src", "alt_or_description", "objectPosition", "sort_order"],
    carouselRows(),
  ),
);

await writeFile(
  join(csvDir, "locations.csv"),
  stringifyRows(
    [
      "slug",
      "name",
      "headline",
      "address",
      "phoneDisplay",
      "phoneHref",
      "whatsappHref",
      "mapHref",
      "heroImage",
    ],
    locationRows(),
  ),
);

await writeFile(
  join(csvDir, "gallery.csv"),
  stringifyRows(["location", "sort_order", "src", "alt"], galleryRows()),
);

await writeFile(
  join(csvDir, "home_gallery.csv"),
  stringifyRows(["sort_order", "src", "alt", "objectPosition"], homeGalleryRows()),
);

console.log("Wrote CSV templates to content/csv/");
