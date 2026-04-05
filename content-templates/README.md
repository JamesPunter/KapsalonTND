# Site content: spreadsheet workflow

Editors maintain prices, location text, and media URLs in **Google Sheets** (or in the CSV files under [`content/csv/`](../content/csv/) for offline use). A build step turns that data into [`src/data/sheet-content.json`](../src/data/sheet-content.json), which the React app reads. You do not need to open code files to change prices or copy.

## Tabs (or CSV files) and columns

Use **exact** sheet tab names: `prices`, `carousel`, `locations`, `gallery`, `home_gallery`. The first row of each tab is the header row.

### `prices`

| Column | Description |
|--------|-------------|
| `location` | `amsterdam-oost`, `amsterdam-west`, or `zaandam` |
| `gender` | `dames` or `heren` |
| `section` | Group title (e.g. `Haar & styling`) |
| `section_description` | Optional subtitle under the section |
| `service` | Line item name |
| `price` | Price text (e.g. `€30`, `v.a. €40`, `Op aanvraag`) |
| `sort_order` | Number; lower values appear earlier within that location and gender |

Each location can have different rows (e.g. Amsterdam West heren prices differ from Oost).

### `carousel`

Sliders on each location page (between prices and the map).

| Column | Description |
|--------|-------------|
| `location` | `amsterdam-oost`, `amsterdam-west`, or `zaandam` |
| `kind` | `image` or `video` |
| `src` | Full `https://...` URL, or a site path such as `/images/amsterdam-west/photo.jpg` |
| `alt_or_description` | For images: alt text. For videos: short description |
| `objectPosition` | Optional; advanced (Tailwind `object-[...]` class). Leave empty if unsure |
| `sort_order` | Display order |

### `locations`

One row per salon. **Do not change `slug`** unless a developer updates routes too.

| Column | Description |
|--------|-------------|
| `slug` | `amsterdam-oost`, `amsterdam-west`, or `zaandam` |
| `name` | Display name (shown in the hero) |
| `headline` | Loaded into the app but not shown on the page today (hero uses `name` and `address` only) |
| `address` | Full address (shown under the hero and used for the map) |
| `phoneDisplay` | Phone as shown |
| `phoneHref` | `tel:` link, e.g. `tel:+31622288480` |
| `whatsappHref` | WhatsApp link, e.g. `https://wa.me/31622288480` |
| `mapHref` | Google Maps URL |
| `heroImage` | Path like `/images/amsterdam-oost/oostinterior.jpeg` or a full image URL |

### `gallery`

Extra stills for each location (beyond the hero).

| Column | Description |
|--------|-------------|
| `location` | Slug |
| `sort_order` | Order |
| `src` | Image URL or `/images/...` path |
| `alt` | Alt text |

### `home_gallery`

Home page horizontal gallery (all rows are shown in order).

| Column | Description |
|--------|-------------|
| `sort_order` | Order |
| `src` | URL or `/images/home/...` path |
| `alt` | Alt text |
| `objectPosition` | Optional Tailwind override; leave empty to use defaults |

## Publishing changes

1. Edit the Google Sheet (or CSV files in `content/csv/`).
2. Run a **new site build** (e.g. push to git so Netlify builds, or run `npm run build` locally). The command `npm run build` automatically runs `npm run sync:content` first.
3. If the build pulls from **Google Sheets** (API or public CSV URLs), set the matching environment variables on the host. If those are missing, the build uses the committed CSV files under `content/csv/`.

## Public CSV URLs (no Google Cloud / no service account)

Use this when the spreadsheet is **world-readable** via URL: either **Publish to web** or **Share → General access → Anyone with the link** (Viewer). Anyone who has the CSV link can read that tab’s data (same as public website content).

Set **all five** Netlify (or CI) environment variables to the **full CSV URL** for each tab. The sync script fetches them at build time.

| Variable | Tab |
|----------|-----|
| `GOOGLE_SHEET_PUBLIC_CSV_PRICES` | `prices` |
| `GOOGLE_SHEET_PUBLIC_CSV_CAROUSEL` | `carousel` |
| `GOOGLE_SHEET_PUBLIC_CSV_LOCATIONS` | `locations` |
| `GOOGLE_SHEET_PUBLIC_CSV_GALLERY` | `gallery` |
| `GOOGLE_SHEET_PUBLIC_CSV_HOME_GALLERY` | `home_gallery` |

### How to get each URL (export link + `gid`)

1. Open your spreadsheet. Select the tab (e.g. **prices**). The browser URL contains `gid=NUMBER` — copy that number.
2. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/**SPREADSHEET_ID**/edit...`
3. Build the export URL (repeat per tab with its own `gid`):

   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=GID`

4. Paste that full URL into the matching `GOOGLE_SHEET_PUBLIC_CSV_*` variable.

**Sharing:** Under **Share**, set **General access** to **Anyone with the link** → **Viewer** (so the export URL returns CSV, not a sign-in page). Alternatively use **File → Share → Publish to web** and use the published CSV link Google gives you for each sheet (if offered).

**Priority:** If `GOOGLE_SHEET_ID` and service account credentials are set, the **API** is used first. Otherwise, if **all five** public CSV variables are set, those URLs are fetched. Otherwise the build uses **`content/csv/`**.

**Partial variables:** If you set only some of the `GOOGLE_SHEET_PUBLIC_CSV_*` variables, the sync script **errors** (to avoid accidentally mixing live sheet data with local CSV). Unset all five to use `content/csv/` again.

## Google Sheets API (Netlify / CI)

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project, enable **Google Sheets API**, and create a **service account**.
2. Create a JSON key for that service account.
3. Share your content spreadsheet with the service account email (Viewer is enough).
4. Set on Netlify (Site settings → Environment variables):
   - `GOOGLE_SHEET_ID` — the ID from the sheet URL (`https://docs.google.com/spreadsheets/d/**THIS_PART**/edit`)
   - Either paste the whole key as `GOOGLE_SERVICE_ACCOUNT_JSON` (single-line JSON string), **or** use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a key file path (typical for local builds only).

**Security:** Never commit the service account JSON to git. Prefer `GOOGLE_SERVICE_ACCOUNT_JSON` as a Netlify secret.

## Offline / CSV-only workflow

- Edit files in [`content/csv/`](../content/csv/).
- Run `npm run sync:content` (or `npm run build`) to regenerate `src/data/sheet-content.json`.
- Commit both the CSV changes and the updated `sheet-content.json` if you deploy without Google credentials.

## Regenerating CSV from the old site layout

If you need to reset CSVs to the bundled example data:

```bash
npm run seed:csv
npm run sync:content
```

Then review diffs and commit as needed.

## Images

- **Site images** live under `public/images/`. Paths in the sheet are usually `/images/...`.
- **External images** (e.g. a CDN): use the full `https://` URL in `src`.
- Google Drive “share links” are often **not** direct image URLs; use a host that gives a direct link, or upload files into `public/images/` with help from a developer.
