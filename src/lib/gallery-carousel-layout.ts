import { cn } from "@/lib/utils";

/** Shared horizontal gallery (location pages + home). */
export const galleryCarouselScrollerClassName = cn(
  "flex min-h-64 min-w-0 flex-1 gap-3 overflow-x-auto overscroll-x-contain scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4",
  "snap-x snap-mandatory scroll-px-1 sm:scroll-px-2",
  "[&::-webkit-scrollbar]:hidden",
);

export const galleryCarouselSlideClassName =
  "gallery-item motion-enter motion-lift w-[min(20rem,100%)] shrink-0 snap-center overflow-hidden rounded-xl sm:w-[min(20rem,85%)] sm:snap-start";

export const galleryCarouselVisualClassName =
  "motion-media h-64 w-full rounded-xl object-cover sm:h-72 lg:h-80";
