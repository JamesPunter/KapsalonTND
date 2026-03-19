import { MessageCircleMore } from "lucide-react";

export type PriceItem = {
  service: string;
  price: string;
};

export type PriceSection = {
  title: string;
  description?: string;
  items: PriceItem[];
};

export type LocationData = {
  slug: "amsterdam" | "zaandam";
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
  highlights: string[];
  priceSections: PriceSection[];
  note: string;
};

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/amsterdam", label: "Amsterdam" },
  { href: "/zaandam", label: "Zaandam" },
];

export const homeGallery = [
  {
    src: "/images/home/hero-banner.jpeg",
    alt: "Kapsalon TND banner with salon branding and models.",
  },
  {
    src: "/images/home/style-1.jpeg",
    alt: "Close-up salon hairstyle result at Kapsalon TND.",
  },
  {
    src: "/images/home/style-2.jpeg",
    alt: "Hair styling result photographed inside the salon.",
  },
  {
    src: "/images/home/style-3.jpeg",
    alt: "Styled hair example from Kapsalon TND.",
  },
];

export const locations: LocationData[] = [
  {
    slug: "amsterdam",
    name: "Amsterdam",
    headline: "Molukkenstraat 35H, 1095 AT Amsterdam",
    summary:
      "Uw beschrijving hier",
    address: "Molukkenstraat 35H, 1095 AT Amsterdam",
    phoneDisplay: "+31 622288480",
    phoneHref: "tel:+31622288480",
    whatsappHref: "https://wa.me/31622288480",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Molukkenstraat+35H,+1095+AT+Amsterdam",
    heroImage: "/images/amsterdam/storefront.jpeg",
    gallery: [
      {
        src: "/images/amsterdam/storefront.jpeg",
        alt: "Storefront of Kapsalon TND Amsterdam.",
      },
      {
        src: "/images/amsterdam/interior-1.jpeg",
        alt: "Interior photo of the Amsterdam salon.",
      },
      {
        src: "/images/amsterdam/interior-2.jpg",
        alt: "Salon stations inside the Amsterdam location.",
      },
      {
        src: "/images/amsterdam/interior-3.jpeg",
        alt: "Additional Amsterdam interior photo.",
      },
    ],
    highlights: [
      "Knippen voor dames en heren",
      "Waxen, epileren en gezichtsverzorging",
      "Keratine, verven en styling",
    ],
    priceSections: [
      {
        title: "Haarverzorging",
        items: [
          { service: "Normaal knippen", price: "EUR 10" },
          { service: "Overloop", price: "EUR 15" },
          { service: "Haren knippen (alleen met schaar)", price: "EUR 15" },
          { service: "Haren knippen (vrouw)", price: "EUR 20" },
          { service: "Baard / overloop / trimmen", price: "EUR 8" },
          { service: "Contouren (nekharen)", price: "EUR 3" },
          { service: "Contouren (snor)", price: "Gratis*" },
        ],
      },
      {
        title: "Waxen",
        items: [
          { service: "Hele gezicht", price: "EUR 10" },
          { service: "Wangen", price: "EUR 7" },
          { service: "Neus", price: "Gratis*" },
          { service: "Oren", price: "Gratis*" },
        ],
      },
      {
        title: "Epileren",
        items: [
          { service: "Hele gezicht", price: "EUR 10" },
          { service: "Wangen", price: "EUR 6" },
          { service: "Wenkbrauwen", price: "EUR 6" },
          { service: "Wenkbrauwen (scheermes)", price: "EUR 3" },
          { service: "Baard scheren / trimmen", price: "Gratis*" },
        ],
      },
      {
        title: "Verven & styling",
        items: [
          { service: "Haarverf (man)", price: "EUR 15" },
          { service: "Baard", price: "EUR 8" },
          { service: "Wenkbrauwen", price: "EUR 6" },
          { service: "Keratine", price: "vanaf EUR 50" },
          { service: "Fohnen", price: "vanaf EUR 17" },
          { service: "Haarverf (vrouw)", price: "vanaf EUR 25" },
          { service: "Wassen haar", price: "EUR 3" },
        ],
      },
      {
        title: "Gezichtsbehandeling",
        items: [
          { service: "Masker en scrub", price: "EUR 15" },
          { service: "Black masker", price: "EUR 6" },
          { service: "Scrub", price: "EUR 6" },
          { service: "Hoofdmassage", price: "EUR 5" },
          { service: "Gezicht creme of tonic", price: "Gratis*" },
        ],
      },
    ],
    note:
      "* Gratis behandelingen gelden in combinatie met minimaal 1 betaalde behandeling uit het prijsoverzicht.",
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
    heroImage: "/images/zaandam/storefront.jpeg",
    gallery: [
      {
        src: "/images/zaandam/storefront.jpeg",
        alt: "Storefront of Kapsalon TND Zaandam.",
      },
      {
        src: "/images/zaandam/interior-1.jpeg",
        alt: "Interior of the Zaandam salon.",
      },
      {
        src: "/images/zaandam/interior-2.jpeg",
        alt: "Treatment space inside the Zaandam location.",
      },
      {
        src: "/images/zaandam/interior-3.jpeg",
        alt: "Beauty and treatment area at Kapsalon TND Zaandam.",
      },
    ],
    highlights: [
      "Knippen, baard, styling en wassen",
      "Beauty, extensions en kleur op aanvraag",
      "Massage en aanvullende behandelingen",
    ],
    priceSections: [
      {
        title: "Haarverzorging",
        items: [
          { service: "Normaal knippen", price: "EUR 20" },
          { service: "Overloop", price: "EUR 25" },
          { service: "Haren knippen (alleen met schaar)", price: "EUR 30" },
          { service: "Haren knippen (vrouw)", price: "EUR 30" },
          { service: "Fohnen", price: "EUR 30" },
          { service: "Baardscheren / trimmen / overloop", price: "EUR 10" },
          { service: "Wassen haar", price: "EUR 5" },
          { service: "Contouren (snor)", price: "Gratis*" },
        ],
      },
      {
        title: "Waxen",
        items: [
          { service: "Hele gezicht", price: "EUR 30" },
          { service: "Hele lichaam", price: "v.a." },
          { service: "Wangen", price: "EUR 10" },
          { service: "Neus", price: "Gratis*" },
          { service: "Oren", price: "Gratis*" },
        ],
      },
      {
        title: "Epileren",
        items: [
          { service: "Hele gezicht", price: "v.a." },
          { service: "Wangen", price: "EUR 10" },
          { service: "Wenkbrauwen", price: "EUR 15" },
        ],
      },
      {
        title: "Beauty & kleur",
        description: "Prijzen die op de huidige site als v.a. staan, blijven op aanvraag.",
        items: [
          { service: "Haarverf (man)", price: "EUR 20" },
          { service: "Baardverf", price: "EUR 10" },
          { service: "Keratine & proteine", price: "v.a." },
          { service: "Haarverf (vrouw)", price: "v.a." },
          { service: "Make-up expert", price: "v.a." },
          {
            service: "Hair extensions, installatie en verkoop",
            price: "v.a.",
          },
        ],
      },
      {
        title: "Gezichtsbehandeling",
        items: [
          { service: "Masker en scrub", price: "EUR 30" },
          { service: "Black masker", price: "EUR 15" },
          { service: "Scrub", price: "EUR 10" },
          { service: "Gezicht creme of tonic", price: "Gratis*" },
        ],
      },
      {
        title: "Massage & extra",
        items: [
          { service: "Nagels + pedicure-spa", price: "EUR 20 v.a." },
          { service: "Massage Relax Normal", price: "30 min EUR 45 / 1h EUR 55" },
          { service: "Massage Medical Hard", price: "30 min EUR 45 / 1h EUR 65" },
          { service: "Massage Speciaal Royal", price: "1h EUR 85" },
          { service: "Hoofdmassage", price: "EUR 10" },
        ],
      },
    ],
    note:
      "* Gratis behandelingen gelden in combinatie met minimaal 1 betaalde behandeling uit het prijsoverzicht.",
  },
];

export const locationsBySlug = {
  amsterdam: locations[0],
  zaandam: locations[1],
};

export const footerSocialLinks = [
  {
    label: "WhatsApp Amsterdam",
    href: locationsBySlug.amsterdam.whatsappHref,
    icon: MessageCircleMore,
  },
  {
    label: "WhatsApp Zaandam",
    href: locationsBySlug.zaandam.whatsappHref,
    icon: MessageCircleMore,
  },
];
