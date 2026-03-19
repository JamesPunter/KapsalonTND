import { ArrowUpRight, MapPin, MessageCircleMore, Phone } from "lucide-react";

import type { LocationData } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type LocationPageProps = {
  location: LocationData;
};

const heroImagePositions: Record<LocationData["slug"], string> = {
  amsterdam: "object-[center_52%]",
  zaandam: "object-[center_50%]",
};

const galleryImagePositions: Record<LocationData["slug"], string[]> = {
  amsterdam: [
    "object-[center_44%]",
    "object-[center_46%]",
    "object-[center_40%]",
  ],
  zaandam: [
    "object-[center_0%]",
    "object-[center_10.5%]",
    "object-[center_32%]",
  ],
};

export function LocationPage({ location }: LocationPageProps) {
  const remainingGallery = location.gallery.filter(
    (image) => image.src !== location.heroImage,
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 pb-28 sm:px-6 sm:py-10 sm:pb-32 lg:px-8 lg:pb-40">
      <section className="space-y-5 text-center">
        <div className="space-y-3">
          <h1 className="font-display text-4xl leading-[0.95] tracking-[0.08em] text-stone-950 uppercase sm:text-5xl">
            {location.name}
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-medium tracking-[0.04em] text-stone-600 sm:text-base">
            {location.summary}
          </p>
        </div>

        <div className="mx-auto max-w-5xl border border-stone-950/10 bg-white">
          <div className="relative overflow-hidden">
            <img
              alt={`${location.name} storefront`}
              className={cn(
                "h-[24rem] w-full object-cover sm:h-[32rem] lg:h-[38rem]",
                heroImagePositions[location.slug],
              )}
              src={location.heroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.42))]" />
            <div className="absolute inset-x-4 bottom-4 flex justify-start sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8">
              <div className="border border-white/15 bg-stone-950/78 px-5 py-4 text-left text-white backdrop-blur-sm sm:px-6 sm:py-5">
                <p className="text-xs tracking-[0.24em] text-stone-200 uppercase">
                  Adres
                </p>
                <p className="mt-2 font-display text-3xl tracking-[0.08em] uppercase sm:text-4xl">
                  {location.name}
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-stone-200 sm:text-base">
                  {location.address}
                </p>
                <a
                  className="mt-4 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-stone-200"
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
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="space-y-2 text-center">
          <h2 className="font-display text-4xl tracking-[0.08em] text-stone-950 uppercase sm:text-5xl">
            Prijslijst
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {location.priceSections.map((section) => (
            <article
              key={section.title}
              className="overflow-hidden border border-stone-950/10 bg-white"
            >
              <div className="border-b border-stone-950/10 bg-[linear-gradient(180deg,rgba(251,191,36,0.08),rgba(255,255,255,0))] px-4 py-4 sm:px-5">
                <p className="font-display text-2xl tracking-[0.08em] text-stone-950 uppercase">
                  {section.title}
                </p>
                {section.description ? (
                  <p className="mt-1 max-w-md text-sm leading-5 text-stone-600">
                    {section.description}
                  </p>
                ) : null}
              </div>

              <div className="divide-y divide-stone-950/8">
                {section.items.map((item) => (
                  <div
                    key={`${section.title}-${item.service}`}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 px-4 py-3 sm:px-5"
                  >
                    <p className="pr-2 text-sm leading-5 font-medium text-stone-900 sm:text-[0.95rem]">
                      {item.service}
                    </p>
                    <p className=" border border-stone-950/10 bg-stone-950/4 px-2.5 py-1 text-right text-[0.7rem] font-semibold tracking-[0.14em] text-stone-700 uppercase sm:text-xs">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="text-sm leading-6 text-stone-600">{location.note}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-14 justify-center border border-stone-950 bg-stone-950 px-6 text-base text-stone-50 hover:bg-stone-800",
            )}
            href={location.phoneHref}
          >
            <Phone className="size-4" />
            {location.phoneDisplay}
          </a>
          <a
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-14 justify-center border border-stone-950 bg-stone-950 px-6 text-base text-stone-50 hover:bg-stone-800",
            )}
            href={location.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircleMore className="size-4" />
            WhatsApp {location.name}
          </a>
        </div>
      </section>

      {remainingGallery.length > 0 ? (
        <section className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {remainingGallery.map((image, index) => (
            <div
              key={image.src}
              className="overflow-hidden border border-stone-950/10 bg-white"
            >
              <img
                alt={image.alt}
                className={cn(
                  "h-72 w-full object-cover sm:h-80",
                  galleryImagePositions[location.slug][index],
                )}
                src={image.src}
              />
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
