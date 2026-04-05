import { MessageCircleMore } from "lucide-react";

import { assetPath } from "@/lib/asset-path";

import sheetContent from "./sheet-content.json";

function resolveMediaSrc(src: string) {
  if (/^https?:\/\//i.test(src)) return src;
  return assetPath(src.replace(/^\/+/, ""));
}

export type PriceItem = {
  service: string;
  price: string;
};

export type PriceSection = {
  title: string;
  description?: string;
  items: PriceItem[];
};

/** Per-location prices split by gender. Filled from the spreadsheet / `sheet-content.json`. */
export type LocationPricesByGender = {
  dames: PriceSection[];
  heren: PriceSection[];
};

/** Slider items between price lists and the map; `src` may be a site path or an absolute media URL. */
export type LocationCarouselMedia =
  | { kind: "image"; src: string; alt: string; objectPosition?: string }
  | { kind: "video"; src: string; description: string };

export type LocationData = {
  slug: "amsterdam-oost" | "amsterdam-west" | "zaandam";
  name: string;
  headline: string;
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
  carouselMedia: LocationCarouselMedia[];
  pricesByGender: LocationPricesByGender;
};

type SheetContent = {
  version: number;
  pricesByLocation: Record<
    LocationData["slug"],
    LocationPricesByGender
  >;
  carouselByLocation: Record<
    LocationData["slug"],
    LocationCarouselMedia[]
  >;
  galleryByLocation: Record<
    LocationData["slug"],
    Array<{ src: string; alt: string }>
  >;
  homeGallery: HomeGalleryImage[];
  locationsOverlay: Record<
    LocationData["slug"],
    {
      name: string;
      headline: string;
      address: string;
      phoneDisplay: string;
      phoneHref: string;
      whatsappHref: string;
      mapHref: string;
      heroImage: string;
    }
  >;
};

const sheet = sheetContent as SheetContent;

const locationOrder: LocationData["slug"][] = [
  "amsterdam-oost",
  "amsterdam-west",
  "zaandam",
];

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/amsterdam-oost", label: "Amsterdam - Oost" },
  { href: "/amsterdam-west", label: "Amsterdam - West" },
  { href: "/zaandam", label: "Zaandam" },
];

export type HomeGalleryImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

/** Home carousel images from `home_gallery` tab / CSV. */
export const homeGallery: HomeGalleryImage[] = sheet.homeGallery.map((g) => ({
  ...g,
  src: resolveMediaSrc(g.src),
}));

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

export const locations: LocationData[] = locationOrder.map((slug) => {
  const overlay = sheet.locationsOverlay[slug];
  const carouselMedia = sheet.carouselByLocation[slug].map((item) => ({
    ...item,
    src: resolveMediaSrc(item.src),
  }));
  return {
    slug,
    name: overlay.name,
    headline: overlay.headline,
    address: overlay.address,
    phoneDisplay: overlay.phoneDisplay,
    phoneHref: overlay.phoneHref,
    whatsappHref: overlay.whatsappHref,
    mapHref: overlay.mapHref,
    heroImage: resolveMediaSrc(overlay.heroImage),
    gallery: sheet.galleryByLocation[slug].map((g) => ({
      ...g,
      src: resolveMediaSrc(g.src),
    })),
    carouselMedia,
    pricesByGender: sheet.pricesByLocation[slug],
  };
});

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
