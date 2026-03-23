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
  const delayClasses = [
    "motion-delay-1",
    "motion-delay-2",
    "motion-delay-3",
    "motion-delay-4",
    "motion-delay-5",
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-8 pb-28 sm:px-6 sm:py-10 sm:pb-32 lg:px-8 lg:pb-40">
      <section>
        <div className="motion-enter mx-auto max-w-5xl overflow-hidden rounded-xl shadow-lg">
          <div className="group relative overflow-hidden">
            <img
              alt={`${location.name} storefront`}
              className={cn(
                "motion-media motion-pan h-[24rem] w-full object-cover sm:h-[32rem] lg:h-[38rem]",
                heroImagePositions[location.slug],
              )}
              src={location.heroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(12,10,9,0.7)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
              <div className="motion-enter motion-delay-2">
                <h1 className="font-display text-3xl tracking-[0.08em] text-white uppercase sm:text-4xl lg:text-5xl">
                  {location.name}
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-stone-200 sm:text-base">
                  {location.address}
                </p>
                <a
                  className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
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

      {/* Price list */}
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="motion-enter space-y-2 text-center">
          <h2 className="font-display text-4xl tracking-[0.08em] text-stone-950 uppercase sm:text-5xl">
            Prijslijst
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {location.priceSections.map((section, index) => (
            <article
              key={section.title}
              className={cn(
                "motion-enter motion-lift overflow-hidden rounded-xl border border-stone-300/60 bg-white shadow-sm",
                delayClasses[index] ?? "motion-delay-1",
              )}
            >
              <div className="border-b border-stone-200/80 px-5 py-4 sm:px-6">
                <p className="font-display text-2xl tracking-[0.08em] text-stone-800 uppercase">
                  {section.title}
                </p>
                {section.description ? (
                  <p className="mt-1.5 max-w-md text-sm leading-5 text-stone-500">
                    {section.description}
                  </p>
                ) : null}
              </div>

              <div>
                {section.items.map((item, itemIndex) => (
                  <div
                    key={`${section.title}-${item.service}`}
                    className={cn(
                      "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 px-5 py-3 sm:px-6",
                      itemIndex % 2 === 1 ? "bg-stone-50/70" : "",
                    )}
                  >
                    <p className="text-sm leading-5 font-medium text-stone-700 sm:text-[0.95rem]">
                      {item.service}
                    </p>
                    <p className="text-right text-sm font-semibold text-stone-900">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="motion-enter motion-delay-2 text-sm leading-7 text-stone-600">
          {location.note}
        </p>

        {/* CTA buttons — larger with golden hover accent */}
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            className={cn(
              buttonVariants({ size: "lg" }),
              "cta-btn motion-enter motion-delay-3 motion-lift h-16 justify-center rounded-xl border border-stone-950 bg-stone-950 px-8 text-base text-stone-50 transition-all hover:bg-stone-800 hover:shadow-lg hover:shadow-amber-900/10 sm:text-lg",
            )}
            href={location.phoneHref}
          >
            <Phone className="size-5" />
            {location.phoneDisplay}
          </a>
          <a
            className={cn(
              buttonVariants({ size: "lg" }),
              "cta-btn motion-enter motion-delay-4 motion-lift h-16 justify-center rounded-xl border-2 border-amber-700/20 bg-gradient-to-r from-amber-50 to-amber-100/60 px-8 text-base font-semibold text-stone-900 transition-all hover:from-amber-100 hover:to-amber-200/60 hover:shadow-lg hover:shadow-amber-900/10 sm:text-lg",
            )}
            href={location.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircleMore className="size-5" />
            WhatsApp {location.name}
          </a>
        </div>
      </section>

      {/* Gallery with golden overlay and rounded corners */}
      {remainingGallery.length > 0 ? (
        <section className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {remainingGallery.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                "gallery-item group motion-enter motion-lift overflow-hidden rounded-xl",
                delayClasses[index] ?? "motion-delay-1",
              )}
            >
              <img
                alt={image.alt}
                className={cn(
                  "motion-media h-72 w-full rounded-xl object-cover sm:h-80",
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
