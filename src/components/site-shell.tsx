import { useEffect, useState } from "react";
import { Instagram, Menu } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import {
  homeHeroImageFreepikAttribution,
  locations,
  locationsBySlug,
  navigationItems,
  siteInstagramUrl,
} from "@/data/site-content";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/** Mobile sheet only: Home first, then West → Oost → Zaandam (desktop order stays in `navigationItems`). */
const mobileSheetNavItems = [
  { href: "/", label: "Home" },
  { href: "/amsterdam-west", label: "Amsterdam - West" },
  { href: "/amsterdam-oost", label: "Amsterdam - Oost" },
  { href: "/zaandam", label: "Zaandam" },
] as const;

const linkBaseClasses =
  "relative rounded-md px-3 py-1.5 text-sm font-normal tracking-wide transition-colors";

export function SiteShell() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [showHomeHeader, setShowHomeHeader] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setShowHomeHeader(true);
      return;
    }

    const updateHeaderVisibility = () => {
      const trigger = document.getElementById("home-header-trigger");

      if (!trigger) {
        setShowHomeHeader(false);
        return;
      }

      const { top } = trigger.getBoundingClientRect();
      setShowHomeHeader(top <= 28);
    };

    updateHeaderVisibility();

    window.addEventListener("scroll", updateHeaderVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", updateHeaderVisibility);
      window.removeEventListener("resize", updateHeaderVisibility);
    };
  }, [isHomePage]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#f8f3e8_0%,#f3ede1_24%,#fbf8f2_100%)] text-foreground">
      <SiteHeader
        isHomePage={isHomePage}
        isVisible={showHomeHeader}
      />
      <main className="min-w-0">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

type SiteHeaderProps = {
  isHomePage: boolean;
  isVisible: boolean;
};

function SiteHeader({ isHomePage, isVisible }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "top-0 z-40 border-b transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isHomePage ? "fixed inset-x-0" : "sticky",
        isVisible
          ? "translate-y-0 border-white/10 bg-navy text-stone-100 opacity-100 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_rgb(0_8_15/0.35)] backdrop-blur-md"
          : cn(
              "pointer-events-none -translate-y-6 border-transparent bg-transparent text-stone-100 opacity-0 backdrop-blur-none",
              "max-md:translate-y-0 max-md:pointer-events-auto max-md:border-white/10 max-md:bg-navy max-md:opacity-100 max-md:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_rgb(0_8_15/0.35)] max-md:backdrop-blur-md",
            ),
      )}
    >
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <BrandLockup />

        <nav className="hidden items-center gap-1.5 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) =>
                cn(
                  linkBaseClasses,
                  isActive
                    ? "text-stone-50 nav-link-active"
                    : "text-stone-400 hover:text-stone-100",
                )
              }
              end={item.href === "/"}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              "md:hidden rounded-md border border-white/20 text-stone-200 hover:bg-white/5 hover:text-white",
            )}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent className="w-[88vw] max-w-sm border-l border-white/15 bg-navy text-stone-100 [&_button]:text-stone-300 [&_button:hover]:bg-white/10 [&_button:hover]:text-white">
            <SheetHeader className="border-b border-white/10 px-4 pb-6 pr-14 pt-2">
              <SheetTitle className="sr-only">Kapsalon TND — navigatie</SheetTitle>
              <img
                alt="Kapsalon TND"
                className="h-12 w-auto max-w-[min(12rem,72vw)] object-contain object-left drop-shadow-[0_2px_12px_rgb(0_0_0/0.35)]"
                decoding="async"
                height={LOGO_CLEAR_INTRINSIC.h}
                src={assetPath("images/brand/TNDlogoClear.png")}
                width={LOGO_CLEAR_INTRINSIC.w}
              />
            </SheetHeader>
            <nav
              aria-label="Hoofdnavigatie"
              className="flex flex-col px-4 pb-8"
            >
              {mobileSheetNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-white/10 py-3.5 text-sm font-normal tracking-wide transition-colors last:border-b-0",
                      isActive
                        ? "text-amber-200"
                        : "text-stone-400 hover:text-stone-100",
                    )
                  }
                  end={item.href === "/"}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}


const GOLDEN_COIL_ICON_SRC = assetPath("images/brand/favicon-coil-dark.png");

function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-navy text-stone-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* Gradient transition from page to footer */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-navy/25" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="motion-enter space-y-5">
          <div>
            <h2 className="font-display text-4xl leading-none tracking-[0.08em] uppercase lg:text-5xl">
              Kapsalon TND
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-stone-400">
              Uw kapper in Amsterdam en Zaandam.
            </p>
            <a
              className="motion-lift mt-4 inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-white"
              href={siteInstagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Instagram aria-hidden className="size-4 shrink-0" />
              Vind ons op Instagram
            </a>
          </div>
        </div>

        <div className="motion-enter motion-delay-1 space-y-5">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-stone-100 uppercase">
            Locaties
          </h3>
          <div className="grid gap-5">
            {locations.map((loc) => (
              <div key={loc.slug} className="space-y-1">
                <Link
                  className="motion-lift text-base text-stone-300 transition-colors hover:text-white"
                  to={`/${loc.slug}`}
                >
                  {loc.name}
                </Link>
                <p className="max-w-[18rem] text-sm leading-snug text-stone-500">
                  {loc.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="motion-enter motion-delay-2 space-y-5">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-stone-100 uppercase">
            Contact
          </h3>
          <div className="grid gap-3 text-sm text-stone-300">
            <div>
              <p className="text-xs tracking-[0.14em] text-stone-500 uppercase">
                Amsterdam - Oost
              </p>
              <p className="mt-1">
                {locationsBySlug["amsterdam-oost"].phoneDisplay}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.14em] text-stone-500 uppercase">
                Amsterdam - West
              </p>
              <p className="mt-1">
                {locationsBySlug["amsterdam-west"].phoneDisplay}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.14em] text-stone-500 uppercase">
                Zaandam
              </p>
              <p className="mt-1">{locationsBySlug.zaandam.phoneDisplay}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6 sm:px-6 lg:px-8">
          <a
            className="motion-lift inline-flex w-fit shrink-0 items-center gap-2 text-xs text-stone-400 transition-colors hover:text-stone-300"
            href="https://goldencoil.nl"
            rel="noreferrer"
            target="_blank"
          >
            <span
              aria-hidden
              className="inline-block size-4 shrink-0 bg-current"
              style={{
                maskImage: `url("${GOLDEN_COIL_ICON_SRC}")`,
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskImage: `url("${GOLDEN_COIL_ICON_SRC}")`,
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
              }}
            />
            <span>Website gemaakt door Golden Coil</span>
          </a>
          <div className="ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-x-4 gap-y-1 text-[0.65rem] leading-relaxed text-stone-400">
            <a
              className="underline decoration-stone-400/45 underline-offset-2 transition-colors hover:text-stone-300"
              href={homeHeroImageFreepikAttribution.href}
              rel="noreferrer"
              title={homeHeroImageFreepikAttribution.title}
              target="_blank"
            >
              {homeHeroImageFreepikAttribution.linkText}
            </a>
            <a
              className="underline decoration-stone-400/45 underline-offset-2 transition-colors hover:text-stone-300"
              href="https://www.flaticon.com/free-icons/flexibility"
              rel="noreferrer"
              title="flexibility icons"
              target="_blank"
            >
              Flexibility icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const LOGO_CLEAR_INTRINSIC = { w: 1600, h: 1327 } as const;

function BrandLockup() {
  return (
    <Link
      className="flex min-w-0 max-w-[calc(100vw-5.5rem)] flex-1 items-center gap-2.5 sm:max-w-none sm:flex-none sm:gap-3"
      to="/"
    >
      <img
        alt="Kapsalon TND logo"
        className="h-11 w-auto max-w-[min(10rem,calc(100vw-8rem))] shrink-0 object-contain drop-shadow-[0_2px_8px_rgb(0_8_15/0.4)] sm:h-12 sm:max-w-[11rem]"
        decoding="async"
        fetchPriority="high"
        height={LOGO_CLEAR_INTRINSIC.h}
        src={assetPath("images/brand/TNDlogoClear.png")}
        width={LOGO_CLEAR_INTRINSIC.w}
      />
      <div className="min-w-0 flex-1 sm:flex-none">
        <p className="truncate font-display text-lg leading-none tracking-[0.12em] text-stone-50 uppercase sm:text-2xl sm:tracking-[0.14em] md:text-3xl">
          Kapsalon TND
        </p>
      </div>
    </Link>
  );
}
