import { useEffect, useState } from "react";
import { Menu, MessageCircleMore, Phone } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import {
  footerSocialLinks,
  locationsBySlug,
  navigationItems,
} from "@/data/site-content";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const linkBaseClasses =
  "motion-lift rounded-full px-4 py-2 text-sm font-medium transition-colors";

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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8f3e8_0%,#f3ede1_24%,#fbf8f2_100%)] text-foreground">
      <SiteHeader
        isHomePage={isHomePage}
        isVisible={showHomeHeader}
      />
      <main className="pb-14">
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
          ? "translate-y-0 border-amber-950/10 bg-background/86 opacity-100 backdrop-blur-xl"
          : "pointer-events-none -translate-y-6 border-transparent bg-background/0 opacity-0 backdrop-blur-none",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLockup />

        <nav className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) =>
                cn(
                  linkBaseClasses,
                  isActive
                    ? "bg-stone-950 text-stone-50 shadow-sm"
                    : "text-stone-700 hover:bg-stone-950/5 hover:text-stone-950",
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
              buttonVariants({ variant: "outline", size: "icon-lg" }),
              "md:hidden",
            )}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent className="w-[88vw] max-w-sm border-l border-stone-950/10 bg-[#f8f3e8]">
            <SheetHeader className="border-b border-stone-950/10 pb-5">
              <SheetTitle className="font-display text-3xl tracking-[0.08em] uppercase">
                Kapsalon TND
              </SheetTitle>
              <SheetDescription>
                Drie pagina&apos;s, twee locaties en een compleet vernieuwde frontend.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-4 pb-6">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    cn(
                      "motion-lift rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-stone-950 text-stone-50"
                        : "bg-white text-stone-800 ring-1 ring-stone-950/10 hover:bg-stone-50",
                    )
                  }
                  end={item.href === "/"}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-4 grid gap-2">
                <a
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "motion-lift justify-start rounded-2xl border-stone-950/10 bg-white",
                  )}
                  href={locationsBySlug.amsterdam.phoneHref}
                >
                  <Phone className="size-4" />
                  Bel Amsterdam
                </a>
                <a
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "motion-lift justify-start rounded-2xl bg-stone-950 text-stone-50 hover:bg-stone-800",
                  )}
                  href={locationsBySlug.zaandam.whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircleMore className="size-4" />
                  WhatsApp Zaandam
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-stone-950/10 bg-stone-950 text-stone-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="motion-enter space-y-4">

          <div>
            <h2 className="font-display text-4xl leading-none tracking-[0.08em] uppercase">
              Kapsalon TND
            </h2>

          </div>
        </div>

        <div className="motion-enter motion-delay-1 space-y-4">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-stone-100 uppercase">
            Locaties
          </h3>
          <div className="grid gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                className="motion-lift text-sm text-stone-300 transition-colors hover:text-white"
                to={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="motion-enter motion-delay-2 space-y-4">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-stone-100 uppercase">
            Contact
          </h3>
          <div className="flex flex-wrap gap-2">
            {footerSocialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "motion-lift rounded-full border border-white/10 bg-white/8 px-4 text-stone-100 hover:bg-white/14",
                  )}
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon className="size-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function BrandLockup() {
  return (
    <Link className="group flex items-center gap-3" to="/">
      <span className="flex size-12 shrink-0 overflow-hidden rounded-2xl border border-stone-950/10 bg-stone-950 shadow-[0_12px_30px_-16px_rgba(18,18,18,0.85)] transition-transform duration-500 group-hover:-translate-y-0.5 sm:size-14">
        <img
          alt="Kapsalon TND logo"
          className="motion-media h-full w-full object-cover"
          src="/images/brand/tnd.jpg"
        />
      </span>
      <div className="min-w-0">
        <p className="font-display text-2xl leading-none tracking-[0.14em] text-stone-950 uppercase sm:text-3xl">
          Kapsalon TND
        </p>
      </div>
    </Link>
  );
}
