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
  const galleryDelayClasses = [
    "motion-delay-1",
    "motion-delay-2",
    "motion-delay-3",
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-28 lg:px-8 lg:pb-40">
      <section className="space-y-4">
        <div className="motion-enter flex items-center gap-4 sm:gap-5">
          <span className="shrink-0 overflow-hidden rounded-[0.5rem] border border-stone-950/10 bg-stone-950 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.35)]">
            <img
              alt="Kapsalon TND logo"
              className="h-16 w-16 object-cover sm:h-20 sm:w-20"
              src="/images/brand/tnd.jpg"
            />
          </span>
          <div className="min-w-0 space-y-2">
            <p className="text-xs font-medium tracking-[0.28em] text-stone-500 uppercase">
              Amsterdam & Zaandam
            </p>
            <h1 className="font-display text-4xl leading-[0.95] tracking-[0.08em] text-stone-950 uppercase sm:text-5xl">
              Kapsalon TND
            </h1>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="h-px w-full"
          id="home-header-trigger"
        />

        <div className="group motion-enter motion-delay-1 relative overflow-hidden">
          <img
            alt="Client getting a haircut at Kapsalon TND"
            className="motion-media motion-pan h-[25rem] w-full object-cover sm:h-[32rem] lg:h-[36rem]"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.06),rgba(17,17,17,0.18))]" />
          <p className="motion-fade motion-delay-4 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-0 font-display text-4xl tracking-[0.16em] text-white/35 uppercase sm:text-6xl lg:text-7xl">
            Uw afbeelding hier
          </p>
          <a
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "motion-enter motion-delay-2 motion-lift absolute bottom-4 left-4 justify-start rounded-full border border-white/15 bg-white/8 px-4 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8",
            )}
            href="https://www.instagram.com/kapsalon_tnd/"
            rel="noreferrer"
            target="_blank"
          >
            <Instagram className="size-4" />
            Vind ons op Instagram
          </a>
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6 sm:flex-row lg:inset-x-auto lg:right-8 lg:bottom-8">
            {locations.map((location, index) => (
              <Link
                key={location.slug}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "motion-enter motion-lift rounded-full border border-white/20 bg-stone-950/88 px-6 text-stone-50 backdrop-blur-sm hover:bg-stone-800/92",
                  index === 0 ? "motion-delay-3" : "motion-delay-4",
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
            className={cn(
              "group motion-enter motion-lift overflow-hidden",
              galleryDelayClasses[index] ?? "motion-delay-1",
            )}
          >
            <img
              alt={image.alt}
              className={cn(
                "motion-media h-64 w-full object-cover sm:h-72 lg:h-80",
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
