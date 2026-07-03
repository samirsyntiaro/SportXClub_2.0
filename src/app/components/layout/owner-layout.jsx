import { useState, useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  MapPin, 
  CalendarDays, 
  Calendar, 
  IndianRupee, 
  Users, 
  Star, 
  Tag, 
  Bell, 
  FileText, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Logo } from "../brand/Logo";
import { ThemeToggleButton } from "../ui/theme-toggle-button";
import { Button } from "../ui/button";

const ownerNavigation = [
  { name: "Dashboard", href: "/owner-dashboard", icon: LayoutDashboard },
  { name: "My Turfs", href: "/owner-dashboard/turfs", icon: MapPin },
  { name: "Bookings", href: "/owner-dashboard/bookings", icon: CalendarDays },
  { name: "Calendar", href: "/owner-dashboard/calendar", icon: Calendar },
  { name: "Revenue", href: "/owner-dashboard/revenue", icon: IndianRupee },
  { name: "Customers", href: "/owner-dashboard/customers", icon: Users },
  { name: "Reviews", href: "/owner-dashboard/reviews", icon: Star },
  { name: "Promotions", href: "/owner-dashboard/promotions", icon: Tag },
  { name: "Notifications", href: "/owner-dashboard/notifications", icon: Bell },
  { name: "Documents", href: "/owner-dashboard/documents", icon: FileText },
  { name: "Settings", href: "/owner-dashboard/settings", icon: Settings },
];

export function OwnerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement actual logout
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4 space-y-1">
        {ownerNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || (item.href !== "/owner-dashboard" && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="p-4 mt-auto border-t border-border/40">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border/40 bg-card/30 md:flex fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border/40 bg-background/90 px-4 shadow-sm backdrop-blur-xl sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-muted-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg capitalize">
                {ownerNavigation.find(n => location.pathname === n.href || (n.href !== "/owner-dashboard" && location.pathname.startsWith(n.href)))?.name || "Admin Panel"}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggleButton className="h-10 w-10" />
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background shadow-xl md:hidden"
              >
                <div className="absolute right-4 top-4">
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-8 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
