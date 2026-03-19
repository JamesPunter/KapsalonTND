import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

import { homeGallery, locations } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function HomePage() {
  const heroImage = "/images/home/client-doing-hair-cut-barber-shop-salon.jpg";
  const galleryImagePositions = [
    "object-[center_22%]",
    "object-[center_85%]",
    "object-[center_42%]",
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-28 lg:px-8 lg:pb-40">
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-[0.28em] text-stone-500 uppercase">
            Amsterdam & Zaandam
          </p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-[0.08em] text-stone-950 uppercase sm:text-5xl">
            Kapsalon TND
          </h1>
        </div>

        <div className="relative overflow-hidden">
          <img
            alt="Client getting a haircut at Kapsalon TND"
            className="h-[25rem] w-full object-cover sm:h-[32rem] lg:h-[36rem]"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.06),rgba(17,17,17,0.18))]" />
          <p className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-0 font-display text-4xl tracking-[0.16em] text-white/35 uppercase sm:text-6xl lg:text-7xl">
            Uw afbeelding hier
          </p>
          <a
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "absolute bottom-4 left-4 justify-start rounded-full border border-white/15 bg-white/8 px-4 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8",
            )}
            href="https://www.instagram.com/kapsalon_tnd/"
            rel="noreferrer"
            target="_blank"
          >
            <Instagram className="size-4" />
            Vind ons op Instagram
          </a>
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6 sm:flex-row lg:inset-x-auto lg:right-8 lg:bottom-8">
            {locations.map((location) => (
              <Link
                key={location.slug}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full border border-white/20 bg-stone-950/88 px-6 text-stone-50 backdrop-blur-sm hover:bg-stone-800/92",
                )}
                to={`/${location.slug}`}
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {homeGallery.slice(1).map((image, index) => (
          <div
            key={image.src}
            className="overflow-hidden"
          >
            <img
              alt={image.alt}
              className={cn(
                "h-64 w-full object-cover sm:h-72 lg:h-80",
                galleryImagePositions[index],
              )}
              src={image.src}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
