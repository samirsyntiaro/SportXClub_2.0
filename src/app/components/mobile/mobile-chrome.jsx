import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import {
  Bell,
  CalendarCheck2,
  Compass,
  Home,
  Menu,
  Trophy,
  UserCircle2,
  MapPin,
  ChevronDown,
  Check,
  X,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { ThemeToggleButton } from "../ui/theme-toggle-button";
import { Logo } from "../brand/Logo";
import { useAuth } from "../../providers/auth-provider";

export const mobileNavigation = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "explore", label: "Turfs", href: "/venues", icon: Compass },
  {
    key: "bookings",
    label: "Bookings",
    href: "/bookings",
    icon: CalendarCheck2,
  },
  {
    key: "tournaments",
    label: "Tournaments",
    href: "/tournaments",
    icon: Trophy,
  },
  { key: "profile", label: "Profile", href: "/profile", icon: UserCircle2 },
];

export function MobileAppBar() {
  const [city, setCity] = useState(
    () => localStorage.getItem("preferred-city") || "Mumbai",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { currentUser } = useAuth();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const handleCityChange = (e) => {
      const customEvent = e;
      setCity(customEvent.detail);
    };
    window.addEventListener("preferredCityChanged", handleCityChange);
    return () =>
      window.removeEventListener("preferredCityChanged", handleCityChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleCitySelect = (selected) => {
    localStorage.setItem("preferred-city", selected);
    setCity(selected);
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent("preferredCityChanged", { detail: selected }),
    );
  };

  const cities = [
    "Mumbai",
    "Bengaluru",
    "Delhi NCR",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
  ];

  const menuItems = [
    { label: "Turf", to: "/venues", hasChevron: true },
    { label: "Events", to: "/community", hasChevron: true },
    { label: "Tournaments", to: "/tournaments", hasChevron: true },
    {
      label: "Notifications",
      to: "/dashboard",
      hasChevron: true,
      isNotification: true,
      badge: 3,
    },
    {
      label: "Cart",
      to: "/bookings",
      hasChevron: true,
      isCart: true,
      badge: 2,
    },
  ].filter((item) => {
    if (!currentUser && ["Events"].includes(item.label)) {
      return false;
    }
    return true;
  });

  return (
    <header className="sticky top-0 z-45 border-b border-border/40 bg-background/88 pt-[env(safe-area-inset-top)] backdrop-blur-2xl md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2">
          <Link to="/" className="shrink-0 flex items-center h-10 w-auto">
            <Logo />
          </Link>
          <div className="min-w-0 flex flex-col justify-center">
            {/* Preferred Location Selector (BookMyShow style) */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-0.5 mt-1 text-xs  text-primary active:opacity-70 text-left leading-none cursor-pointer"
            >
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[80px]">
                {city === "All" ? "All Areas" : city}
              </span>
              <ChevronDown className="h-3 w-3 shrink-0 text-primary/80" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-10.5 w-10.5 rounded-full border border-border/60 bg-background/60 text-foreground shadow-xs backdrop-blur-md cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-4.5 w-4.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Hamburger Dropdown Drawer for Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-x-0 bottom-0 top-[calc(64px+env(safe-area-inset-top))] z-40 bg-black/25 backdrop-blur-xs"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu container */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 z-50 border-b shadow-2xl px-6 py-5 flex flex-col gap-4 bg-background border-border max-h-[calc(100vh-80px-env(safe-area-inset-top))] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Menu list items */}
              <div className="flex flex-col">
                {menuItems.map((item) => {
                  const itemContent = (
                    <div className="flex items-center justify-between w-full py-4 px-1 border-b border-border/40 transition-colors duration-150 hover:bg-muted/40 group">
                      <div className="flex items-center gap-3">
                        {item.isCart && (
                          <ShoppingCart className="h-5 w-5 text-primary" />
                        )}
                        {item.isNotification && (
                          <Bell className="h-5 w-5 text-primary" />
                        )}
                        <span
                          className={cn(
                            "text-sm tracking-wide text-left transition-colors duration-150",
                            item.isGreen ? "text-primary" : "text-foreground group-hover:text-primary",
                          )}
                        >
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge !== undefined && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] bg-primary text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                        {item.hasChevron && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-colors duration-150 group-hover:text-primary" />
                        )}
                      </div>
                    </div>
                  );

                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="block text-left"
                    >
                      {itemContent}
                    </Link>
                  );
                })}
              </div>

              {/* Theme Toggle inside Menu */}
              <div className="flex items-center justify-between py-4 px-1">
                <span className="text-sm tracking-wide text-left text-foreground">Theme</span>
                <ThemeToggleButton className="h-9 w-9 rounded-full border border-border/60 shadow-xs cursor-pointer" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Drawer Overlay for City Selection */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark glass backdrop closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
            />

            {/* Native-style bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 inset-x-0 rounded-t-[32px] border-t border-border bg-card p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="mx-auto w-12 h-1 bg-muted rounded-full mb-4" />
              <h3 className="text-lg  text-foreground">
                Select Playing Region
              </h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Choose your city to view verified sports turfs near you.
              </p>

              <div className="space-y-2">
                {cities.map((c) => {
                  const isSelected = city === c;
                  return (
                    <button
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-xs  transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-background hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin
                          className={`h-4.5 w-4.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span>{c === "All" ? "All Cities" : c}</span>
                      </div>
                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full mt-5 h-12 rounded-full border border-border text-sm  cursor-pointer"
              >
                Cancel
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export function MobileBottomNav({ activeTab }) {
  const { currentUser } = useAuth();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto max-w-screen-xl px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        <div className="relative overflow-hidden rounded-[24px] border border-border/40 bg-background/80 shadow-[0_-18px_40px_-22px_rgba(15,23,42,0.4)] backdrop-blur-2xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="grid grid-cols-5 px-2 py-2">
            {mobileNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === activeTab;

              return (
                <motion.div
                  key={item.key}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className="relative"
                >
                  <Link
                    to={item.key === 'profile' && currentUser?.role === 'owner' ? '/owner-dashboard' : item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[20px] px-1 text-[0.68rem]  transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-active"
                        className="absolute inset-0 rounded-[20px] bg-primary/10"
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 36,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-transform",
                        isActive
                          ? "bg-primary/15 text-primary shadow-[0_8px_20px_-12px_rgba(34,197,94,0.8)]"
                          : "bg-transparent text-muted-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="relative z-10 leading-none">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
