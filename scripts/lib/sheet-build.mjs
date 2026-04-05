/** @typedef {{ title: string; description?: string; items: { service: string; price: string }[] }} PriceSection */

const LOCATION_SLUGS = ["amsterdam-oost", "amsterdam-west", "zaandam"];
const GENDERS = ["dames", "heren"];

/**
 * @param {Record<string, string>[]} priceRows
 */
export function buildPricesByLocation(priceRows) {
  /** @type {Record<string, { dames: PriceSection[]; heren: PriceSection[] }>} */
  const out = {};
  for (const slug of LOCATION_SLUGS) {
    out[slug] = { dames: [], heren: [] };
  }

  for (const gender of GENDERS) {
    for (const loc of LOCATION_SLUGS) {
      const rows = priceRows
        .filter((r) => r.location === loc && r.gender === gender)
        .sort(
          (a, b) =>
            Number(a.sort_order || 0) - Number(b.sort_order || 0),
        );

      /** @type {PriceSection[]} */
      const sections = [];
      /** @type {PriceSection | null} */
      let current = null;
      for (const r of rows) {
        const sectionTitle = (r.section || "").trim();
        if (!sectionTitle || !(r.service || "").trim()) continue;
        if (!current || current.title !== sectionTitle) {
          if (current) sections.push(current);
          const desc = (r.section_description || "").trim();
          current = {
            title: sectionTitle,
            ...(desc ? { description: desc } : {}),
            items: [],
          };
        }
        current.items.push({
          service: (r.service || "").trim(),
          price: (r.price || "").trim(),
        });
      }
      if (current) sections.push(current);
      out[loc][gender] = sections;
    }
  }
  return out;
}

/**
 * @param {Record<string, string>[]} carouselRows
 * @param {string} location
 */
export function buildCarouselForLocation(carouselRows, location) {
  return carouselRows
    .filter((r) => r.location === location)
    .sort(
      (a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0),
    )
    .map((r) => {
      const kind = (r.kind || "").trim().toLowerCase();
      const src = (r.src || "").trim();
      const text = (r.alt_or_description || "").trim();
      const objectPosition = (r.objectPosition || "").trim();
      if (kind === "video") {
        return {
          kind: "video",
          src,
          description: text,
        };
      }
      return {
        kind: "image",
        src,
        alt: text,
        ...(objectPosition ? { objectPosition } : {}),
      };
    });
}

/**
 * @param {Record<string, string>[]} locationRows
 */
export function buildLocationsOverlay(locationRows) {
  /** @type {Record<string, Record<string, string>>} */
  const bySlug = {};
  for (const r of locationRows) {
    const slug = (r.slug || "").trim();
    if (!slug) continue;
    bySlug[slug] = {
      name: (r.name || "").trim(),
      headline: (r.headline || "").trim(),
      address: (r.address || "").trim(),
      phoneDisplay: (r.phoneDisplay || "").trim(),
      phoneHref: (r.phoneHref || "").trim(),
      whatsappHref: (r.whatsappHref || "").trim(),
      mapHref: (r.mapHref || "").trim(),
      heroImage: (r.heroImage || "").trim(),
    };
  }
  return bySlug;
}

/**
 * @param {Record<string, string>[]} galleryRows
 */
export function buildGalleryByLocation(galleryRows) {
  /** @type {Record<string, { src: string; alt: string }[]>} */
  const out = {};
  for (const slug of LOCATION_SLUGS) out[slug] = [];

  const sorted = [...galleryRows].sort(
    (a, b) =>
      Number(a.sort_order || 0) - Number(b.sort_order || 0),
  );
  for (const r of sorted) {
    const loc = (r.location || "").trim();
    if (!LOCATION_SLUGS.includes(loc)) continue;
    const src = (r.src || "").trim();
    const alt = (r.alt || "").trim();
    if (!src) continue;
    out[loc].push({ src, alt });
  }
  return out;
}

/**
 * @param {Record<string, string>[]} homeRows
 */
export function buildHomeGallery(homeRows) {
  return [...homeRows]
    .sort(
      (a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0),
    )
    .map((r) => {
      const src = (r.src || "").trim();
      const alt = (r.alt || "").trim();
      const objectPosition = (r.objectPosition || "").trim();
      return {
        src,
        alt,
        ...(objectPosition ? { objectPosition } : {}),
      };
    })
    .filter((g) => g.src && g.alt);
}

/**
 * @param {string[][]} matrix - first row headers
 * @returns {Record<string, string>[]}
 */
export function matrixToObjects(matrix) {
  if (!matrix.length) return [];
  const headers = matrix[0].map((h) => (h ?? "").trim());
  const rows = matrix.slice(1).filter((row) => row.some((c) => (c ?? "").trim() !== ""));
  return rows.map((r) => {
    /** @type {Record<string, string>} */
    const o = {};
    headers.forEach((h, i) => {
      o[h] = (r[i] ?? "").trim();
    });
    return o;
  });
}

/**
 * @param {ReturnType<buildPricesByLocation>} pricesByLocation
 * @param {Record<string, ReturnType<buildCarouselForLocation>>} carouselByLocation
 * @param {Record<string, { src: string; alt: string }[]>} galleryByLocation
 * @param {ReturnType<buildHomeGallery>} homeGallery
 * @param {ReturnType<buildLocationsOverlay>} locationsOverlay
 */
export function assembleSheetContent({
  pricesByLocation,
  carouselByLocation,
  galleryByLocation,
  homeGallery,
  locationsOverlay,
}) {
  return {
    version: 1,
    pricesByLocation,
    carouselByLocation,
    galleryByLocation,
    homeGallery,
    locationsOverlay,
  };
}

export function validateSheetContent(data) {
  const errors = [];
  for (const slug of LOCATION_SLUGS) {
    const p = data.pricesByLocation[slug];
    if (!p?.dames?.length || !p?.heren?.length) {
      errors.push(`Missing prices for ${slug} (dames and/or heren empty).`);
    }
    const car = data.carouselByLocation[slug];
    if (!car?.length) {
      errors.push(`Missing carousel rows for ${slug}.`);
    }
    const g = data.galleryByLocation[slug];
    if (!g?.length) {
      errors.push(`Missing gallery rows for ${slug}.`);
    }
    const loc = data.locationsOverlay[slug];
    if (!loc?.name || !loc?.phoneHref) {
      errors.push(`Missing locations row for ${slug} (name/phoneHref).`);
    }
  }
  if (!data.homeGallery?.length) {
    errors.push("home_gallery is empty.");
  }
  return errors;
}
