import { useMemo, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, MapPin, Trophy, Users, UserCircle, MessageSquare, Bot, ChevronDown, Check } from "lucide-react";

import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { Logo } from "../brand/Logo";
import { MobileAppBar, MobileBottomNav } from "../mobile/mobile-chrome";
import { ThemeToggleButton } from "../ui/theme-toggle-button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Turfs", href: "/venues", icon: MapPin },
  { name: "Tournaments", href: "/tournaments", icon: Trophy },
  { name: "Players", href: "/players", icon: Users },
  { name: "Community", href: "/community", icon: MessageSquare },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
];

function getMobileTab(pathname: string) {
  if (pathname === "/" || pathname === "/dashboard") return "home";
  if (pathname.startsWith("/venues")) return "explore";
  if (pathname.startsWith("/bookings") || pathname.startsWith("/payment")) return "bookings";
  if (pathname.startsWith("/tournaments")) return "tournaments";
  return "profile";
}

function CitySelector() {
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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-3.5 py-2 text-xs  transition hover:bg-accent hover:text-foreground text-foreground cursor-pointer"
      >
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <span>{city === "All" ? "All Cities" : city}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 mt-2 w-48 rounded-2xl border border-border bg-card p-2 shadow-xl z-50 backdrop-blur-xl"
            >
              <p className="px-3 py-1.5 text-[0.68rem]  uppercase tracking-wider text-muted-foreground">Select Region</p>
              <div className="space-y-0.5 mt-1">
                {cities.map((c) => {
                  const isSelected = city === c;
                  return (
                    <button
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs  transition cursor-pointer ${
                        isSelected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>{c === "All" ? "All Cities" : c}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const mobileTab = useMemo(() => getMobileTab(location.pathname), [location.pathname]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 hidden border-b border-border/40 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 md:block">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            <CitySelector />

            <nav className="flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                        transition={{ type: "spring", duration: 0.45 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleButton className="h-10 w-10" />

            <Link to="/profile">
              <Button variant="ghost" className="h-10 px-3 flex items-center gap-2 rounded-full border border-border/50 bg-background/50 hover:bg-accent/50 transition-all shadow-sm" aria-label="View profile">
                <UserCircle className="h-5 w-5 text-primary" />
                <span className="text-sm pr-1">John Doe</span>
              </Button>
            </Link>
          </div>
        </Container>
      </header>

      <MobileAppBar />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="pb-[calc(104px+env(safe-area-inset-bottom))] md:pb-0"
      >
        <div className="px-4 py-5 md:mx-auto md:max-w-7xl md:px-6 md:py-6 lg:px-8">
          <Outlet />
        </div>
      </motion.main>

      <MobileBottomNav activeTab={mobileTab as "home" | "explore" | "bookings" | "tournaments" | "profile"} />
    </div>
  );
}

