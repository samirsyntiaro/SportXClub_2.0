import { useState, useEffect } from "react";
import { Link, type To } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
} from "lucide-react";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { ThemeToggleButton } from "../ui/theme-toggle-button";

type MobileTabKey = "home" | "explore" | "bookings" | "tournaments" | "profile";

export const mobileNavigation: Array<{
  key: MobileTabKey;
  label: string;
  href: To;
  icon: typeof Home;
}> = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "explore", label: "Turfs", href: "/venues", icon: Compass },
  { key: "bookings", label: "Bookings", href: "/bookings", icon: CalendarCheck2 },
  { key: "tournaments", label: "Tournaments", href: "/tournaments", icon: Trophy },
  { key: "profile", label: "Profile", href: "/profile", icon: UserCircle2 },
];

export function MobileAppBar() {
  const [city, setCity] = useState(() => localStorage.getItem("preferred-city") || "All");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleCityChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCity(customEvent.detail);
    };
    window.addEventListener("preferredCityChanged", handleCityChange);
    return () => window.removeEventListener("preferredCityChanged", handleCityChange);
  }, []);

  const handleCitySelect = (selected: string) => {
    localStorage.setItem("preferred-city", selected);
    setCity(selected);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("preferredCityChanged", { detail: selected }));
  };

  const cities = ["All", "Mumbai", "Thane", "Navi Mumbai"];

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/88 pt-[env(safe-area-inset-top)] backdrop-blur-2xl md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-sm  text-primary shadow-xs shrink-0">
            SX
          </Link>
          <div className="min-w-0">
            <p className="text-[0.62rem]  uppercase tracking-[0.24em] text-muted-foreground leading-none">
              SportXClub
            </p>
            {/* Preferred Location Selector (BookMyShow style) */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-0.5 mt-1 text-xs  text-primary active:opacity-70 text-left leading-none cursor-pointer"
            >
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[80px]">{city === "All" ? "All Areas" : city}</span>
              <ChevronDown className="h-3 w-3 shrink-0 text-primary/80" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10.5 w-10.5 rounded-full border border-border/60 bg-background/60 text-foreground shadow-xs backdrop-blur-md"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
          </Button>

          <ThemeToggleButton
            className="h-10.5 w-10.5 rounded-full border border-border/60 bg-background/60 text-foreground shadow-xs backdrop-blur-md"
            variant="ghost"
          />
        </div>
      </div>

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
              <h3 className="text-lg  text-foreground">Select Playing Region</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">Choose your city to view verified sports turfs near you.</p>
              
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
                        <MapPin className={`h-4.5 w-4.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
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

export function MobileBottomNav({
  activeTab,
}: {
  activeTab: MobileTabKey;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto max-w-screen-xl px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        <div className="relative overflow-hidden rounded-t-[28px] border border-border/40 border-b-0 bg-background/80 shadow-[0_-18px_40px_-22px_rgba(15,23,42,0.4)] backdrop-blur-2xl">
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
                    to={item.href}
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
                        transition={{ type: "spring", stiffness: 520, damping: 36 }}
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
                    <span className="relative z-10 leading-none">{item.label}</span>
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

