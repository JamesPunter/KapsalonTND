import { ArrowUpRight, MapPin, Phone } from "lucide-react";

import { type LocationData } from "@/data/site-content";
import { cn } from "@/lib/utils";

function googleMapsEmbedSrc(address: string) {
  const q = encodeURIComponent(address);
  return `https://maps.google.com/maps?q=${q}&z=16&hl=nl&ie=UTF8&iwloc=&output=embed`;
}

type LocationPageProps = {
  location: LocationData;
};

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Renders "Amsterdam - …" with a sans hyphen so it stays horizontal (display serif hyphens can look slanted). */
function LocationHeroTitle({ name }: { name: string }) {
  const parts = name.split(" - ");
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        <span className="font-sans align-baseline text-[0.82em] font-semibold tracking-normal">
          {"\u00A0-\u00A0"}
        </span>
        {parts[1]}
      </>
    );
  }
  return <>{name}</>;
}

function LocationPriceBlocks({ location }: LocationPageProps) {
  const scrollOffsetClass = "scroll-mt-28";

  const contactCtaClass = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-none border border-navy bg-navy px-6 py-2.5 text-sm font-semibold text-stone-100 shadow-[0_2px_10px_rgb(0_8_15/0.22)] transition-[box-shadow,transform,background-color] duration-200",
    "hover:-translate-y-px hover:bg-[#001018] hover:shadow-[0_4px_18px_rgb(0_8_15/0.32)]",
    "active:translate-y-0 active:shadow-[0_2px_8px_rgb(0_8_15/0.2)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f3e8]",
  );

  const renderGender = (gender: "dames" | "heren", id: string, label: string) => (
    <section
      className={cn("motion-enter space-y-6", scrollOffsetClass)}
      id={id}
    >
      <h2 className="font-display text-2xl tracking-[0.08em] text-navy uppercase sm:text-3xl">
        {label}
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-12">
        {location.pricesByGender[gender].map((section) => (
          <div key={`${gender}-${section.title}`} className="space-y-3">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-navy/90 uppercase">
              {section.title}
            </h3>
            {section.description ? (
              <p className="text-sm leading-6 text-foreground/75">
                {section.description}
              </p>
            ) : null}
            {section.items.length > 0 ? (
              <ul className="divide-y divide-navy/10 border-t border-navy/10 text-sm">
                {section.items.map((row) => (
                  <li
                    className="flex items-baseline justify-between gap-4 py-2.5"
                    key={`${section.title}-${row.service}`}
                  >
                    <span className="text-foreground/90">{row.service}</span>
                    <span className="shrink-0 font-medium tabular-nums text-navy">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-16 border-t border-navy/15 pt-10 sm:pt-12">
      <div className="motion-enter flex flex-wrap justify-center gap-3 sm:gap-4">
        <a className={contactCtaClass} href={location.phoneHref}>
          <Phone aria-hidden className="size-4 shrink-0" strokeWidth={2} />
          Bel ons
        </a>
        <a
          className={contactCtaClass}
          href={location.whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <WhatsappIcon className="size-4 shrink-0" />
          Stuur een bericht
        </a>
      </div>
      {renderGender("dames", "prijzen-dames", "Dames")}
      {renderGender("heren", "prijzen-heren", "Heren")}
    </div>
  );
}

function LocationMapSection({ location }: LocationPageProps) {
  const headingId = `locatie-kaart-${location.slug}`;

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto w-full min-w-0 max-w-5xl space-y-4 py-12 sm:py-16"
    >
      <h2
        className="font-display text-2xl tracking-[0.08em] text-navy uppercase sm:text-3xl"
        id={headingId}
      >
        Locatie
      </h2>
      <div className="motion-enter overflow-hidden rounded-xl shadow-md ring-1 ring-navy/10">
        <iframe
          allowFullScreen
          className="aspect-[16/10] min-h-[min(50vw,18rem)] w-full border-0 sm:min-h-[20rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={googleMapsEmbedSrc(location.address)}
          title={`Google Maps: ${location.name} — ${location.address}`}
        />
      </div>
      <a
        className="motion-lift inline-flex items-center gap-2 text-sm font-medium text-navy underline decoration-navy/25 underline-offset-4 transition-colors hover:decoration-navy/60"
        href={location.mapHref}
        rel="noreferrer"
        target="_blank"
      >
        <MapPin aria-hidden className="size-4 shrink-0" />
        Open in Google Maps
        <ArrowUpRight aria-hidden className="size-4 shrink-0" />
      </a>
    </section>
  );
}

export function LocationPage({ location }: LocationPageProps) {
  const galleryExtras = location.gallery.filter(
    (item) => item.src !== location.heroImage,
  );

  return (
    <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-14 px-4 py-8 pb-28 sm:px-6 sm:py-10 sm:pb-32 lg:px-8 lg:pb-40">
      <section className="flex w-full min-w-0 flex-col gap-6">
        <div className="motion-enter mx-auto w-full min-w-0 max-w-5xl overflow-hidden rounded-xl shadow-lg">
          <div className="relative flex w-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-xl bg-navy px-5 pb-10 pt-16 sm:min-h-[30rem] sm:px-8 sm:pb-12 sm:pt-20 lg:min-h-[min(40rem,70vh)] lg:px-10 lg:pb-14 lg:pt-24">
            <img
              alt={`Interieur van ${location.name}`}
              className={cn(
                "absolute inset-0 size-full object-cover",
                location.slug === "amsterdam-west"
                  ? "object-[center_12%]"
                  : "object-center",
              )}
              decoding="async"
              src={location.heroImage}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_8_15/0.45)_0%,rgb(0_8_15/0.08)_32%,transparent_48%),linear-gradient(to_right,rgb(0_8_15/0.52)_0%,rgb(0_8_15/0.18)_36%,rgb(0_8_15/0.04)_50%,transparent_64%)]"
            />
            <div className="relative z-10 w-full max-w-lg self-start motion-enter motion-delay-2 [text-shadow:0_1px_2px_rgb(0_0_0/0.55),0_2px_16px_rgb(0_0_0/0.35)]">
              <h1 className="font-display text-3xl tracking-[0.08em] text-white uppercase sm:text-4xl lg:text-5xl">
                <LocationHeroTitle name={location.name} />
              </h1>
              <p className="mt-2 max-w-md text-sm leading-6 text-stone-100 sm:text-base">
                {location.address}
              </p>
              <a
                className="mt-3 inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white"
                href={location.mapHref}
                rel="noreferrer"
                target="_blank"
              >
                <MapPin className="size-4" />
                Open route
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {galleryExtras.length > 0 ? (
          <div className="mx-auto grid w-full max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5">
            {galleryExtras.map((item) => (
              <div
                className="motion-enter overflow-hidden rounded-xl shadow-md ring-1 ring-navy/10"
                key={item.src}
              >
                <img
                  alt={item.alt}
                  className="aspect-[4/3] size-full object-cover"
                  decoding="async"
                  src={item.src}
                />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <LocationPriceBlocks location={location} />

      <LocationMapSection location={location} />
    </div>
  );
}
