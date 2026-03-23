import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

import { homeGallery, locations } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";
import { buttonVariants } from "@/components/ui/button";

export function HomePage() {
  const heroImage = assetPath("images/home/client-doing-hair-cut-barber-shop-salon.jpg");
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
    <div className="flex flex-col">
      {/* Full-screen hero */}
      <section className="hero-full relative flex items-end overflow-hidden">
        <img
          alt="Client getting a haircut at Kapsalon TND"
          className="motion-pan absolute inset-0 h-full w-full object-cover"
          src={heroImage}
        />

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.25)_0%,rgba(12,10,9,0.1)_40%,rgba(12,10,9,0.65)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,9,0.15),transparent_60%)]" />

        {/* Content overlay */}
        <div className="relative z-10 flex w-full flex-col items-center gap-8 px-4 pb-12 pt-32 sm:items-start sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 sm:items-start">
            {/* Logo + Name */}
            <div className="motion-enter flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <span className="shrink-0 overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
                <img
                  alt="Kapsalon TND logo"
                  className="block h-20 w-20 scale-[1.06] object-cover sm:h-24 sm:w-24"
                  src={assetPath("images/brand/tnd.jpg")}
                />
              </span>
              <div className="min-w-0 space-y-2 text-center sm:text-left">
                <p className="text-xs font-medium tracking-[0.28em] text-white/60 uppercase">
                  Amsterdam & Zaandam
                </p>
                <h1 className="font-display text-5xl leading-[0.95] tracking-[0.08em] text-white uppercase sm:text-6xl lg:text-7xl">
                  Kapsalon TND
                </h1>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="h-px w-full"
              id="home-header-trigger"
            />

            {/* Buttons row */}
            <div className="motion-enter motion-delay-2 flex w-full flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-between">
              {/* Instagram */}
              <a
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "cta-btn motion-lift rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white backdrop-blur-sm hover:bg-white/18 hover:text-white",
                )}
                href="https://www.instagram.com/kapsalon_tnd/"
                rel="noreferrer"
                target="_blank"
              >
                <Instagram className="size-4" />
                Vind ons op Instagram
              </a>

              {/* Location buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {locations.map((location, index) => (
                  <Link
                    key={location.slug}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "motion-enter motion-lift cta-btn rounded-full border border-white/20 bg-white/12 px-7 py-2.5 text-base text-white backdrop-blur-md hover:bg-white/22",
                      index === 0 ? "motion-delay-3" : "motion-delay-4",
                    )}
                    to={`/${location.slug}`}
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="motion-fade motion-delay-5 absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="h-8 w-5 rounded-full border-2 border-white/30 p-0.5">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-16 lg:px-8 xl:grid-cols-3">
        {homeGallery.slice(1).map((image, index) => (
          <div
            key={image.src}
            className={cn(
              "gallery-item group motion-enter motion-lift overflow-hidden rounded-xl",
              galleryDelayClasses[index] ?? "motion-delay-1",
            )}
          >
            <img
              alt={image.alt}
              className={cn(
                "motion-media h-64 w-full rounded-xl object-cover sm:h-72 lg:h-80",
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
