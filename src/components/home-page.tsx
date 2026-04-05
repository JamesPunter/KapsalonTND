import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

import {
  homeGallery,
  homeGalleryCarouselPlaceholderCount,
  locations,
  siteInstagramUrl,
} from "@/data/site-content";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";
import { Button, buttonVariants } from "@/components/ui/button";

export function HomePage() {
  const heroImage = assetPath("images/home/client-doing-hair-cut-barber-shop-salon.jpg");
  const galleryScrollerRef = useRef<HTMLDivElement>(null);
  const galleryImagePositions = [
    "object-[center_22%]",
    "object-[center_85%]",
    "object-[center_42%]",
  ];
  const galleryDelayClasses = [
    "motion-delay-1",
    "motion-delay-2",
    "motion-delay-3",
    "motion-delay-4",
    "motion-delay-5",
    "motion-delay-5",
  ];

  const scrollGallery = useCallback((direction: -1 | 1) => {
    const el = galleryScrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-gallery-slide]");
    const gapPx = Number.parseFloat(getComputedStyle(el).gap) || 16;
    const step = (slide?.offsetWidth ?? el.clientWidth * 0.82) + gapPx;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,8,15,0.32)_0%,rgba(0,8,15,0.14)_40%,rgba(0,8,15,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,8,15,0.22),transparent_60%)]" />

        {/* Content overlay */}
        <div className="relative z-10 flex w-full min-w-0 flex-col items-center gap-8 px-4 pb-[max(3rem,env(safe-area-inset-bottom))] pt-[max(6rem,calc(env(safe-area-inset-top)+4.5rem))] sm:items-start sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 sm:items-start">
            {/* Logo + Name */}
            <div className="motion-enter flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <img
                alt="Kapsalon TND logo"
                className="motion-media shrink-0 h-[5.25rem] w-auto max-w-[min(16rem,88vw)] object-contain drop-shadow-[0_14px_36px_rgba(0,8,15,0.5)] sm:h-[6.25rem] sm:max-w-[18rem]"
                src={assetPath("images/brand/TNDlogoClear.png")}
              />
              <div className="min-w-0 space-y-2 text-center sm:text-left">
                <p className="text-xs font-medium tracking-[0.28em] text-white/60 uppercase">
                  Amsterdam & Zaandam
                </p>
                <h1 className="font-display text-4xl leading-[0.95] tracking-[0.08em] text-white uppercase sm:text-6xl lg:text-7xl">
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
                  "rounded-md border border-white/30 bg-white/5 px-4 py-2 text-sm font-normal text-white/90 backdrop-blur-[2px] hover:border-white/45 hover:bg-white/10 hover:text-white",
                )}
                href={siteInstagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Instagram className="size-4" />
                Vind ons op Instagram
              </a>

              {/* Location links */}
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-8 sm:gap-y-1">
                {locations.map((location, index) => (
                  <Link
                    key={location.slug}
                    className={cn(
                      "motion-enter py-2 text-center text-sm font-normal tracking-wide text-white/88 decoration-white/35 underline-offset-[0.35rem] transition-colors hover:text-white hover:underline",
                      index === 0
                        ? "motion-delay-3"
                        : index === 1
                          ? "motion-delay-4"
                          : "motion-delay-5",
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

      </section>

      {/* Gallery carousel */}
      <section
        aria-label="Salonwerk en resultaten"
        className="mx-auto max-w-7xl min-w-0 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="flex min-w-0 items-stretch gap-1.5 sm:gap-3">
          <div className="flex shrink-0 items-center">
            <Button
              aria-label="Vorige afbeelding"
              className={cn(
                "size-9 rounded-md border border-navy/15 bg-transparent text-navy sm:size-10",
                "transition-[color,background-color,border-color]",
                "hover:border-navy/30 hover:bg-navy/[0.06]",
                "active:!translate-y-0",
              )}
              onClick={() => scrollGallery(-1)}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </div>

          <div
            ref={galleryScrollerRef}
            className={cn(
              "flex min-h-0 min-w-0 flex-1 gap-3 overflow-x-auto overscroll-x-contain scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4",
              "snap-x snap-mandatory scroll-px-1 sm:scroll-px-2",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {homeGallery.slice(1).map((image, index) => (
              <div
                key={image.src}
                className={cn(
                  "gallery-item group motion-enter motion-lift w-[min(20rem,100%)] shrink-0 snap-center overflow-hidden rounded-xl sm:w-[min(20rem,85%)] sm:snap-start",
                  galleryDelayClasses[index] ?? "motion-delay-1",
                )}
                data-gallery-slide
              >
                <img
                  alt={image.alt}
                  className={cn(
                    "motion-media h-64 w-full rounded-xl object-cover sm:h-72 lg:h-80",
                    image.objectPosition ??
                      galleryImagePositions[index % galleryImagePositions.length],
                  )}
                  src={image.src}
                />
              </div>
            ))}
            {Array.from({ length: homeGalleryCarouselPlaceholderCount }, (_, i) => (
              <div
                key={`gallery-placeholder-${i}`}
                className={cn(
                  "gallery-item flex h-64 w-[min(20rem,100%)] shrink-0 snap-center flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-foreground/20 bg-foreground/[0.04] text-center sm:h-72 sm:w-[min(20rem,85%)] sm:snap-start lg:h-80",
                  galleryDelayClasses[homeGallery.slice(1).length + i] ?? "motion-delay-1",
                )}
                data-gallery-slide
              >
                <span className="text-xs font-medium tracking-wide text-foreground/45 uppercase">
                  Binnenkort
                </span>
                <span className="max-w-[12rem] text-sm text-foreground/55">
                  Nog een foto volgt hier.
                </span>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center">
            <Button
              aria-label="Volgende afbeelding"
              className={cn(
                "size-9 rounded-md border border-navy/15 bg-transparent text-navy sm:size-10",
                "transition-[color,background-color,border-color]",
                "hover:border-navy/30 hover:bg-navy/[0.06]",
                "active:!translate-y-0",
              )}
              onClick={() => scrollGallery(1)}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
