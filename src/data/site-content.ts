import { MessageCircleMore } from "lucide-react";

import { assetPath } from "@/lib/asset-path";

export type PriceItem = {
  service: string;
  price: string;
};

export type PriceSection = {
  title: string;
  description?: string;
  items: PriceItem[];
};

/** Per-location prices split by gender. Edit `items` under `dames` / `heren` in `locations` below. */
export type LocationPricesByGender = {
  dames: PriceSection[];
  heren: PriceSection[];
};

/** Slider items between price lists and the map; `src` may be `assetPath(...)` or an absolute media URL. */
export type LocationCarouselMedia =
  | { kind: "image"; src: string; alt: string; objectPosition?: string }
  | { kind: "video"; src: string; description: string };

export type LocationData = {
  slug: "amsterdam-oost" | "amsterdam-west" | "zaandam";
  name: string;
  headline: string;
  summary: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  mapHref: string;
  heroImage: string;
  gallery: Array<{
    src: string;
    alt: string;
  }>;
  /** Same order as on kapsalontnd.nl for that location (Amsterdam Molukkenstraat → oost; zandaam-2 → Zaandam). */
  carouselMedia: LocationCarouselMedia[];
  highlights: string[];
  pricesByGender: LocationPricesByGender;
};

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/amsterdam-oost", label: "Amsterdam - Oost" },
  { href: "/amsterdam-west", label: "Amsterdam - West" },
  { href: "/zaandam", label: "Zaandam" },
];

export type HomeGalleryImage = {
  src: string;
  alt: string;
  /** Tailwind object-position utilities; overrides default carousel cycling when set. */
  objectPosition?: string;
};

export const homeGallery: HomeGalleryImage[] = [
  {
    src: assetPath("images/home/hero-banner.jpeg"),
    alt: "Kapsalon TND banner with salon branding and models.",
  },
  {
    src: assetPath("images/home/style-1.jpeg"),
    alt: "Close-up salon hairstyle result at Kapsalon TND.",
  },
  {
    src: assetPath("images/home/image1.jpeg"),
    alt: "Spacious Kapsalon TND interior with barber stations and warm lighting.",
  },
  {
    src: assetPath("images/home/style-2.jpeg"),
    alt: "Hair styling result photographed inside the salon.",
  },
  {
    src: assetPath("images/home/image2.jpeg"),
    alt: "Salon interior view toward the entrance with modern lighting.",
  },
  {
    src: assetPath("images/home/style-3.jpeg"),
    alt: "Team and client around a gold barber chair in the Kapsalon TND salon.",
    objectPosition: "object-[center_38%]",
  },
  {
    src: assetPath("images/home/image3.jpeg"),
    alt: "Kapsalon TND workspace with styling stations and salon branding.",
  },
];

/** Empty carousel cards after real images; reduce as you add entries to `homeGallery`. */
export const homeGalleryCarouselPlaceholderCount = 0;

/**
 * Freepik attribution for the home page hero (`images/home/client-doing-hair-cut-barber-shop-salon.jpg`).
 * Point `href` at the image or author URL from your Freepik download / license when available.
 */
export const homeHeroImageFreepikAttribution = {
  href: "https://www.freepik.com",
  title: "Freepik",
  linkText: "Home hero image on Freepik",
} as const;

/** Zaandam + Amsterdam - Oost (Molukkenstraat); Amsterdam - West uses the same dames list. */
const massagePriceItems: PriceItem[] = [
  { service: "Relax Normal — 30 min / 1 uur", price: "€45 / €55" },
  { service: "Medical Hard — 30 min / 1 uur", price: "€45 / €65" },
  { service: "Speciaal Royal — 1 uur", price: "€85" },
  { service: "Hoofdmassage", price: "€15" },
];

const pricesDamesAllLocations: PriceSection[] = [
  {
    title: "Haar & styling",
    items: [
      { service: "Dames knippen", price: "€30" },
      { service: "Vlechten (dames & heren)", price: "v.a. €40" },
      { service: "Föhnen (alle modellen)", price: "v.a. €30" },
      { service: "Haarstyling & kapsels", price: "v.a. €50" },
      { service: "Haarmasker", price: "€10" },
      { service: "Proteïnebehandeling (1 jaar effect)", price: "v.a. €50" },
      { service: "Haar verven", price: "Op aanvraag" },
      { service: "Highlights / mèches", price: "Op aanvraag" },
    ],
  },
  {
    title: "Make-up",
    items: [
      { service: "Dag make-up", price: "v.a. €30" },
      { service: "Avond / feest make-up", price: "v.a. €50" },
    ],
  },
  {
    title: "Wimpers & wenkbrauwen",
    items: [
      { service: "Wimperextensions", price: "v.a. €40" },
      { service: "Lash lifting", price: "€30" },
      { service: "Brow lifting", price: "€30" },
      { service: "Wenkbrauwen", price: "€20" },
    ],
  },
  {
    title: "Nagels & pedicure",
    items: [
      { service: "Gelnagels & extensions", price: "v.a. €30" },
      { service: "Pedicure met gel", price: "v.a. €30" },
      {
        service: "Complete voetverzorging (incl. scrub)",
        price: "v.a. €40",
      },
    ],
  },
  {
    title: "Gezichtsverzorging",
    items: [
      { service: "Gezicht reinigen (wax of draad)", price: "v.a. €30" },
      {
        service: "Dieptereiniging + masker + gezichtsmassage",
        price: "€40",
      },
    ],
  },
  {
    title: "Massage",
    items: massagePriceItems,
  },
];

/** Molukkenstraat + Zaandam — heren knippen €15 */
const pricesHerenOostZaandam: PriceSection[] = [
  {
    title: "Haar & baard",
    items: [
      { service: "Knippen", price: "€15" },
      { service: "Vlechten (dames & heren)", price: "v.a. €40" },
      { service: "Baard", price: "€15" },
      { service: "Haar wassen (hamam)", price: "€5" },
      { service: "Wenkbrauwen", price: "€15" },
      { service: "Wangen ontharen", price: "€15" },
      { service: "Haar verven", price: "€25" },
      { service: "Baard verven", price: "€15" },
    ],
  },
  {
    title: "Gezichtsverzorging",
    items: [
      { service: "Masker + scrub", price: "€30" },
      { service: "Zwart masker", price: "€15" },
      { service: "Scrub", price: "€15" },
    ],
  },
  {
    title: "Massage",
    items: massagePriceItems,
  },
];

/** Kinkerstraat — same as oost/zaandam except knippen €12 */
const pricesHerenWest: PriceSection[] = [
  {
    title: "Haar & baard",
    items: [
      { service: "Knippen", price: "€12" },
      { service: "Vlechten (dames & heren)", price: "v.a. €40" },
      { service: "Baard", price: "€15" },
      { service: "Haar wassen (hamam)", price: "€5" },
      { service: "Wenkbrauwen", price: "€15" },
      { service: "Wangen ontharen", price: "€15" },
      { service: "Haar verven", price: "€25" },
      { service: "Baard verven", price: "€15" },
    ],
  },
  {
    title: "Gezichtsverzorging",
    items: [
      { service: "Masker + scrub", price: "€30" },
      { service: "Zwart masker", price: "€15" },
      { service: "Scrub", price: "€15" },
    ],
  },
  {
    title: "Massage",
    items: massagePriceItems,
  },
];

/** Media URLs from kapsalontnd.nl WordPress uploads (Amsterdam / Zaandam legacy pages). */
const wp = "https://kapsalontnd.nl/wp-content/uploads";

/** Same sequence as the slider on https://kapsalontnd.nl/amsterdam/ (Molukkenstraat → Amsterdam - Oost). */
const carouselMediaAmsterdamOost: LocationCarouselMedia[] = [
  {
    kind: "video",
    src: `${wp}/2023/05/WhatsApp-Video-2023-05-15-at-13.35.01.mp4`,
    description: "Impressie van de salon op de Amsterdam-pagina van Kapsalon TND.",
  },
  {
    kind: "image",
    src: `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.12.58.jpeg`,
    alt: "Kapsalon TND Amsterdam - Oost.",
  },
  {
    kind: "image",
    src: `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.58-533x1024.jpeg`,
    alt: "Kapsalon TND Amsterdam - Oost.",
    objectPosition: "object-[center_25%]",
  },
  {
    kind: "image",
    src: `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-783x1024.jpeg`,
    alt: "Kapsalon TND Amsterdam - Oost.",
    objectPosition: "object-[center_20%]",
  },
  {
    kind: "image",
    src: `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-1-481x1024.jpeg`,
    alt: "Kapsalon TND Amsterdam - Oost.",
    objectPosition: "object-[center_22%]",
  },
  {
    kind: "image",
    src: `${wp}/2022/06/WhatsApp-Image-2022-06-13-at-6.23.01-PM.jpeg`,
    alt: "Kapsalon TND Amsterdam - Oost.",
  },

];

/** Same sequence as the slider on https://kapsalontnd.nl/zandaam-2/ (Zaandam). */
const carouselMediaZaandam: LocationCarouselMedia[] = [
  {
    kind: "video",
    src: `${wp}/2023/05/WhatsApp-Video-2023-05-15-at-13.35.01.mp4`,
    description: "Impressie van de salon op de Zaandam-pagina van Kapsalon TND.",
  },
  {
    kind: "video",
    src: `${wp}/2024/03/WhatsApp-Video-2024-03-02-at-15.41.05.mp4`,
    description: "Tweede video-impressie van Kapsalon TND Zaandam.",
  },
  {
    kind: "image",
    src: `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-783x1024.jpeg`,
    alt: "Kapsalon TND Zaandam.",
    objectPosition: "object-[center_20%]",
  },
  {
    kind: "image",
    src: `${wp}/2023/05/WhatsApp-Image-2023-05-15-at-13.09.59-1-481x1024.jpeg`,
    alt: "Kapsalon TND Zaandam.",
    objectPosition: "object-[center_22%]",
  },
  {
    kind: "image",
    src: `${wp}/2024/03/WhatsApp-Image-2024-03-02-at-14.23.27-1.jpeg`,
    alt: "Kapsalon TND Zaandam.",
  },
  {
    kind: "image",
    src: `${wp}/2024/03/WhatsApp-Image-2024-03-02-at-16.01.26-1.jpeg`,
    alt: "Kapsalon TND Zaandam.",
  },
];

const carouselMediaAmsterdamWest: LocationCarouselMedia[] = [
  {
    kind: "image",
    src: assetPath("images/amsterdam-west/carousel-west-stations.png"),
    alt: "Interieur Kapsalon TND Amsterdam - West met hexagonale plafondverlichting en gouden spiegels.",
    objectPosition: "object-[center_35%]",
  },
  {
    kind: "image",
    src: assetPath("images/amsterdam-west/carousel-west-interior.png"),
    alt: "Blik vanaf de ingang in de salon Amsterdam - West met wachtbank en werkplekken.",
    objectPosition: "object-[center_40%]",
  },
  {
    kind: "image",
    src: assetPath("images/amsterdam-west/carousel-west-storefront.png"),
    alt: "Gevel en entree TND3 Kapsalon aan de Kinkerstraat, Amsterdam - West.",
    objectPosition: "object-[center_30%]",
  },
];

export const locations: LocationData[] = [
  {
    slug: "amsterdam-oost",
    name: "Amsterdam - Oost",
    headline: "Molukkenstraat 35H, 1095 AT Amsterdam",
    summary:
      "Uw beschrijving hier",
    address: "Molukkenstraat 35H, 1095 AT Amsterdam",
    phoneDisplay: "+31 622288480",
    phoneHref: "tel:+31622288480",
    whatsappHref: "https://wa.me/31622288480",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Molukkenstraat+35H,+1095+AT+Amsterdam",
    heroImage: assetPath("images/amsterdam-oost/oostinterior.jpeg"),
    gallery: [
      {
        src: assetPath("images/amsterdam-oost/oostinterior.jpeg"),
        alt: "Interieur van Kapsalon TND Amsterdam - Oost.",
      },
    ],
    carouselMedia: carouselMediaAmsterdamOost,
    highlights: [
      "Knippen voor dames en heren",
      "Waxen, epileren en gezichtsverzorging",
      "Keratine, verven en styling",
    ],
    pricesByGender: {
      dames: pricesDamesAllLocations,
      heren: pricesHerenOostZaandam,
    },
  },
  {
    slug: "amsterdam-west",
    name: "Amsterdam - West",
    headline: "Kinkerstraat 294H, 1053 GC Amsterdam",
    summary:
      "Uw beschrijving hier",
    address: "Kinkerstraat 294H, 1053 GC Amsterdam",
    phoneDisplay: "+31 622288480",
    phoneHref: "tel:+31622288480",
    whatsappHref: "https://wa.me/31622288480",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Kinkerstraat+294H,+1053+GC+Amsterdam",
    heroImage: assetPath("images/amsterdam-west/westinterior.jpeg"),
    gallery: [
      {
        src: assetPath("images/amsterdam-west/westinterior.jpeg"),
        alt: "Interieur van Kapsalon TND Amsterdam - West.",
      },
    ],
    carouselMedia: carouselMediaAmsterdamWest,
    highlights: [
      "Knippen voor dames en heren",
      "Waxen, epileren en gezichtsverzorging",
      "Keratine, verven en styling",
    ],
    pricesByGender: {
      dames: pricesDamesAllLocations,
      heren: pricesHerenWest,
    },
  },
  {
    slug: "zaandam",
    name: "Zaandam",
    headline: "Westzijde 54, 1506 EG Zaandam",
    summary:
      "Uw beschrijving hier",
    address: "Westzijde 54, 1506 EG Zaandam",
    phoneDisplay: "+31 645000009",
    phoneHref: "tel:+31645000009",
    whatsappHref: "https://wa.me/31645000009",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Westzijde+54,+1506+EG+Zaandam",
    heroImage: assetPath("images/zaandam/zaandaminterior.jpeg"),
    gallery: [
      {
        src: assetPath("images/zaandam/zaandaminterior.jpeg"),
        alt: "Interieur van Kapsalon TND Zaandam.",
      },
    ],
    carouselMedia: carouselMediaZaandam,
    highlights: [
      "Knippen, baard, styling en wassen",
      "Beauty, extensions en kleur op aanvraag",
      "Massage en aanvullende behandelingen",
    ],
    pricesByGender: {
      dames: pricesDamesAllLocations,
      heren: pricesHerenOostZaandam,
    },
  },
];

export const locationsBySlug: Record<LocationData["slug"], LocationData> = {
  "amsterdam-oost": locations[0]!,
  "amsterdam-west": locations[1]!,
  zaandam: locations[2]!,
};

export const footerSocialLinks = [
  {
    label: "WhatsApp Amsterdam - Oost",
    href: locationsBySlug["amsterdam-oost"].whatsappHref,
    icon: MessageCircleMore,
  },
  {
    label: "WhatsApp Amsterdam - West",
    href: locationsBySlug["amsterdam-west"].whatsappHref,
    icon: MessageCircleMore,
  },
  {
    label: "WhatsApp Zaandam",
    href: locationsBySlug.zaandam.whatsappHref,
    icon: MessageCircleMore,
  },
];
