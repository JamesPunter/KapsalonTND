/**
 * Builds src/data/sheet-content.json from (first match wins):
 * 1. Google Sheets API — GOOGLE_SHEET_ID + service account credentials
 * 2. Public CSV URLs — all five GOOGLE_SHEET_PUBLIC_CSV_* env vars (no Google Cloud project)
 * 3. Local files — content/csv/
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "csv-parse/sync";
import { google } from "googleapis";

import {
  assembleSheetContent,
  buildCarouselForLocation,
  buildGalleryByLocation,
  buildHomeGallery,
  buildLocationsOverlay,
  buildPricesByLocation,
  matrixToObjects,
  validateSheetContent,
} from "./lib/sheet-build.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outFile = join(root, "src", "data", "sheet-content.json");
const csvDir = join(root, "content", "csv");

/** Google Sheet tab names must match these (case-sensitive). */
const TABS = {
  prices: "prices",
  carousel: "carousel",
  locations: "locations",
  gallery: "gallery",
  home_gallery: "home_gallery",
};

async function readText(path) {
  return readFile(path, "utf8");
}

function stripBom(text) {
  return text.replace(/^\uFEFF/, "");
}

function parseCsv(text) {
  /** @type {string[][]} */
  const records = parse(stripBom(text), {
    columns: false,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });
  return records;
}

/** Each tab must have a fetchable CSV URL (sheet published or “anyone with link can view”). */
const PUBLIC_CSV_ENV_NAMES = {
  prices: "GOOGLE_SHEET_PUBLIC_CSV_PRICES",
  carousel: "GOOGLE_SHEET_PUBLIC_CSV_CAROUSEL",
  locations: "GOOGLE_SHEET_PUBLIC_CSV_LOCATIONS",
  gallery: "GOOGLE_SHEET_PUBLIC_CSV_GALLERY",
  homeGalleryRaw: "GOOGLE_SHEET_PUBLIC_CSV_HOME_GALLERY",
};

async function loadFromPublicCsvUrls() {
  /** @type {Record<string, string | undefined>} */
  const urls = {};
  for (const [key, envName] of Object.entries(PUBLIC_CSV_ENV_NAMES)) {
    urls[key] = process.env[envName]?.trim() || undefined;
  }
  const values = Object.values(urls);
  const allSet = values.every(Boolean);
  const anySet = values.some(Boolean);
  if (anySet && !allSet) {
    console.error(
      "[sync-content] Public CSV mode: set all of these env vars, or none:\n" +
        Object.values(PUBLIC_CSV_ENV_NAMES)
          .map((n) => `  - ${n}`)
          .join("\n"),
    );
    process.exitCode = 1;
    return null;
  }
  if (!allSet) return null;

  const fetchCsv = async (label, url) => {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; KapsalonTND-content-sync/1.0; +https://github.com/)",
      },
    });
    if (!res.ok) {
      throw new Error(
        `[sync-content] ${label}: HTTP ${res.status} ${res.statusText} — check the URL and sharing/publish settings.`,
      );
    }
    return res.text();
  };

  try {
    const [pricesText, carouselText, locationsText, galleryText, homeText] =
      await Promise.all([
        fetchCsv("prices", urls.prices),
        fetchCsv("carousel", urls.carousel),
        fetchCsv("locations", urls.locations),
        fetchCsv("gallery", urls.gallery),
        fetchCsv("home_gallery", urls.homeGalleryRaw),
      ]);

    return {
      prices: matrixToObjects(parseCsv(pricesText)),
      carousel: matrixToObjects(parseCsv(carouselText)),
      locations: matrixToObjects(parseCsv(locationsText)),
      gallery: matrixToObjects(parseCsv(galleryText)),
      homeGalleryRaw: matrixToObjects(parseCsv(homeText)),
    };
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
    return null;
  }
}

async function loadFromCsv() {
  const prices = matrixToObjects(parseCsv(await readText(join(csvDir, "prices.csv"))));
  const carousel = matrixToObjects(parseCsv(await readText(join(csvDir, "carousel.csv"))));
  const locations = matrixToObjects(parseCsv(await readText(join(csvDir, "locations.csv"))));
  const gallery = matrixToObjects(parseCsv(await readText(join(csvDir, "gallery.csv"))));
  const homeGalleryRaw = matrixToObjects(
    parseCsv(await readText(join(csvDir, "home_gallery.csv"))),
  );
  return { prices, carousel, locations, gallery, homeGalleryRaw };
}

async function loadCredentials() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (json) {
    return JSON.parse(json);
  }
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path) {
    return JSON.parse(await readFile(path, "utf8"));
  }
  return null;
}

async function loadFromGoogleSheet() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return null;

  const credentials = await loadCredentials();
  if (!credentials) {
    console.warn(
      "[sync-content] GOOGLE_SHEET_ID is set but no credentials found. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.",
    );
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const ranges = [
    `${TABS.prices}!A:Z`,
    `${TABS.carousel}!A:Z`,
    `${TABS.locations}!A:Z`,
    `${TABS.gallery}!A:Z`,
    `${TABS.home_gallery}!A:Z`,
  ];

  const res = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges,
  });

  const valueRanges = res.data.valueRanges || [];
  const byTitle = {};
  for (let i = 0; i < ranges.length; i++) {
    const title = ranges[i].split("!")[0];
    const values = valueRanges[i]?.values || [];
    byTitle[title] = values;
  }

  return {
    prices: matrixToObjects(byTitle[TABS.prices] || []),
    carousel: matrixToObjects(byTitle[TABS.carousel] || []),
    locations: matrixToObjects(byTitle[TABS.locations] || []),
    gallery: matrixToObjects(byTitle[TABS.gallery] || []),
    homeGalleryRaw: matrixToObjects(byTitle[TABS.home_gallery] || []),
  };
}

function buildPayload(raw) {
  const pricesByLocation = buildPricesByLocation(raw.prices);
  /** @type {Record<string, ReturnType<buildCarouselForLocation>>} */
  const carouselByLocation = {};
  for (const slug of ["amsterdam-oost", "amsterdam-west", "zaandam"]) {
    carouselByLocation[slug] = buildCarouselForLocation(raw.carousel, slug);
  }
  const galleryByLocation = buildGalleryByLocation(raw.gallery);
  const homeGallery = buildHomeGallery(raw.homeGalleryRaw);
  const locationsOverlay = buildLocationsOverlay(raw.locations);

  return assembleSheetContent({
    pricesByLocation,
    carouselByLocation,
    galleryByLocation,
    homeGallery,
    locationsOverlay,
  });
}

async function main() {
  let raw = await loadFromGoogleSheet();
  let source = raw ? "Google Sheets API" : "";

  if (!raw) {
    raw = await loadFromPublicCsvUrls();
    if (raw) source = "public CSV URLs";
  }

  if (!raw) {
    if (process.exitCode) return;
    raw = await loadFromCsv();
    source = "content/csv";
  }

  const data = buildPayload(raw);
  const errors = validateSheetContent(data);
  if (errors.length) {
    console.error("[sync-content] Validation failed:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exitCode = 1;
    return;
  }

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`[sync-content] Wrote ${outFile} (${source})`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
