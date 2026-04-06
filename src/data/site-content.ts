import { MessageCircleMore } from "lucide-react";

import { assetPath } from "@/lib/asset-path";
import rawContent from "../../content.yaml";

// ---------------------------------------------------------------------------
// Raw YAML types — mirrors the structure of content.yaml
// ---------------------------------------------------------------------------

type RawPriceItem = { service: string; price: string };
type RawPriceSection = { title: string; description?: string; items: RawPriceItem[] };

type RawCarouselItem =
  | { kind: "image"; src: string; alt: string; objectPosition?: string }
  | { kind: "video"; src: string; description: string };

type RawGalleryItem = { src: string; alt: string; objectPosition?: string };

type RawLocation = {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  heroImage: string;
  gallery: RawGalleryItem[];
  carousel: RawCarouselItem[];
  prices: {
    dames: RawPriceSection[];
    heren: RawPriceSection[];
  };
};

type RawContent = {
  site: { instagram: string };
  home: { gallery: RawGalleryItem[] };
  locations: {
    "amsterdam-oost": RawLocation;
    "amsterdam-west": RawLocation;
    zaandam: RawLocation;
  };
};

// ---------------------------------------------------------------------------
// Public types (consumed by components — unchanged from original)
// ---------------------------------------------------------------------------

export type PriceItem = {
  service: string;
  price: string;
};

export type PriceSection = {
  title: string;
  description?: string;
  items: PriceItem[];
};

export type LocationPricesByGender = {
  dames: PriceSection[];
  heren: PriceSection[];
};

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
  gallery: Array<{ src: string; alt: string }>;
  carouselMedia: LocationCarouselMedia[];
  pricesByGender: LocationPricesByGender;
};

export type HomeGalleryImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const content = rawContent as RawContent;

/** Return the src as-is if it looks like a full URL, otherwise wrap with assetPath(). */
function resolveImageSrc(src: string): string {
  return src.startsWith("http://") || src.startsWith("https://")
    ? src
    : assetPath(src);
}

function mapCarousel(items: RawCarouselItem[]): LocationCarouselMedia[] {
  return items.map((item) => {
    if (item.kind === "video") {
      return { kind: "video", src: resolveImageSrc(item.src), description: item.description };
    }
    return {
      kind: "image",
      src: resolveImageSrc(item.src),
      alt: item.alt,
      ...(item.objectPosition ? { objectPosition: item.objectPosition } : {}),
    };
  });
}

function mapLocation(
  slug: LocationData["slug"],
  raw: RawLocation
): LocationData {
  const encodedAddress = encodeURIComponent(raw.address);
  return {
    slug,
    name: raw.name,
    headline: raw.address,
    address: raw.address,
    phoneDisplay: raw.phone,
    phoneHref: `tel:+${raw.whatsapp}`,
    whatsappHref: `https://wa.me/${raw.whatsapp}`,
    mapHref: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    heroImage: resolveImageSrc(raw.heroImage),
    gallery: raw.gallery.map((g) => ({
      src: resolveImageSrc(g.src),
      alt: g.alt,
    })),
    carouselMedia: mapCarousel(raw.carousel),
    pricesByGender: {
      dames: raw.prices.dames,
      heren: raw.prices.heren,
    },
  };
}

// ---------------------------------------------------------------------------
// Exports consumed by components
// ---------------------------------------------------------------------------

export const siteInstagramUrl: string = content.site.instagram;

export const homeGallery: HomeGalleryImage[] = content.home.gallery.map((g) => ({
  src: resolveImageSrc(g.src),
  alt: g.alt,
  ...(g.objectPosition ? { objectPosition: g.objectPosition } : {}),
}));

export const homeGalleryCarouselPlaceholderCount = 0;

export const homeHeroImageFreepikAttribution = {
  href: "https://www.freepik.com",
  title: "Freepik",
  linkText: "Home hero image on Freepik",
} as const;

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/amsterdam-oost", label: "Amsterdam - Oost" },
  { href: "/amsterdam-west", label: "Amsterdam - West" },
  { href: "/zaandam", label: "Zaandam" },
];

export const locations: LocationData[] = [
  mapLocation("amsterdam-oost", content.locations["amsterdam-oost"]),
  mapLocation("amsterdam-west", content.locations["amsterdam-west"]),
  mapLocation("zaandam", content.locations.zaandam),
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
