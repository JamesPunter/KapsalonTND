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
  /** Shorter label for the site navigation; falls back to `name`. */
  navLabel?: string;
  /** One-line descriptor shown under the title in the hero. */
  tagline?: string;
  address: string;
  /** Slug of the other business at this same address, if any. */
  sameAddressAs?: LocationSlug;
  /** Own Google Maps listing; falls back to an address search. */
  mapsLink?: string;
  phone: string;
  whatsapp: string;
  booking?: string;
  heroImage: string;
  gallery: RawGalleryItem[];
  carousel: RawCarouselItem[];
  /** A location may offer `dames`, `heren`, or both. */
  prices: {
    dames?: RawPriceSection[];
    heren?: RawPriceSection[];
  };
};

type RawContent = {
  site: { instagram: string };
  home: { gallery: RawGalleryItem[] };
  locations: Record<LocationSlug, RawLocation>;
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

/** Omitted entirely when a location does not offer that side of the business. */
export type LocationPricesByGender = {
  dames?: PriceSection[];
  heren?: PriceSection[];
};

export type LocationCarouselMedia =
  | { kind: "image"; src: string; alt: string; objectPosition?: string }
  | { kind: "video"; src: string; description: string };

export type LocationSlug =
  | "amsterdam-oost"
  | "amsterdam-west"
  | "haarlem"
  | "zaandam"
  | "zaandam-nagels";

export type LocationData = {
  slug: LocationSlug;
  name: string;
  navLabel: string;
  tagline?: string;
  headline: string;
  address: string;
  /** The other business sharing this address, if any. */
  sameAddressAs?: LocationSlug;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  bookingHref?: string;
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

function mapLocation(slug: LocationSlug, raw: RawLocation): LocationData {
  const encodedAddress = encodeURIComponent(raw.address);
  return {
    slug,
    name: raw.name,
    navLabel: raw.navLabel ?? raw.name,
    ...(raw.tagline ? { tagline: raw.tagline } : {}),
    headline: raw.address,
    address: raw.address,
    ...(raw.sameAddressAs ? { sameAddressAs: raw.sameAddressAs } : {}),
    phoneDisplay: raw.phone,
    phoneHref: `tel:+${raw.whatsapp}`,
    whatsappHref: `https://wa.me/${raw.whatsapp}`,
    ...(raw.booking ? { bookingHref: raw.booking } : {}),
    mapHref:
      raw.mapsLink ??
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    heroImage: resolveImageSrc(raw.heroImage),
    gallery: raw.gallery.map((g) => ({
      src: resolveImageSrc(g.src),
      alt: g.alt,
    })),
    carouselMedia: mapCarousel(raw.carousel),
    pricesByGender: {
      ...(raw.prices.dames ? { dames: raw.prices.dames } : {}),
      ...(raw.prices.heren ? { heren: raw.prices.heren } : {}),
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

/** Order shown in the header, footer and on the home page. */
const locationOrder = [
  "amsterdam-oost",
  "amsterdam-west",
  "haarlem",
  "zaandam",
  "zaandam-nagels",
] as const satisfies readonly LocationSlug[];

export const locations: LocationData[] = locationOrder.map((slug) =>
  mapLocation(slug, content.locations[slug])
);

export const locationsBySlug = Object.fromEntries(
  locations.map((loc) => [loc.slug, loc])
) as Record<LocationSlug, LocationData>;

export const navigationItems = [
  { href: "/", label: "Home" },
  ...locations.map((loc) => ({ href: `/${loc.slug}`, label: loc.navLabel })),
];

/** The other business at the same address, resolved in both directions. */
export function siblingLocation(
  location: LocationData
): LocationData | undefined {
  return location.sameAddressAs
    ? locationsBySlug[location.sameAddressAs]
    : locations.find((other) => other.sameAddressAs === location.slug);
}

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
    label: "WhatsApp Haarlem",
    href: locationsBySlug.haarlem.whatsappHref,
    icon: MessageCircleMore,
  },
  {
    label: "WhatsApp Zaandam",
    href: locationsBySlug.zaandam.whatsappHref,
    icon: MessageCircleMore,
  },
];
