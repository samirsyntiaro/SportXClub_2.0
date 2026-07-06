import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Calendar,
  IndianRupee,
  Star,
  Tag,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../../providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

const ownerNavigation = [
  { name: "Dashboard", href: "/owner-dashboard", icon: LayoutDashboard },
  { name: "My Turfs", href: "/owner-dashboard/turfs", icon: MapPin },
  { name: "Bookings", href: "/owner-dashboard/bookings", icon: CalendarDays },
  { name: "Calendar", href: "/owner-dashboard/calendar", icon: Calendar },
  { name: "Revenue", href: "/owner-dashboard/revenue", icon: IndianRupee },
  { name: "Reviews", href: "/owner-dashboard/reviews", icon: Star },
  { name: "Promotions", href: "/owner-dashboard/promotions", icon: Tag },
];

export function OwnerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, updateUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  // Create a local override state for demo purposes (when not logged in)
  const [demoProfile, setDemoProfile] = useState(() => {
    return JSON.parse(localStorage.getItem("mockOwnerProfile")) || null;
  });

  const activeProfile = currentUser || demoProfile || {};

  const [editFormData, setEditFormData] = useState({
    fullName: activeProfile.fullName || "",
    phone: activeProfile.phone || "",
    bio: activeProfile.bio || "",
    profilePicture: activeProfile.profilePicture || "",
  });

  const ownerName = activeProfile.fullName || "Turf Owner";
  const ownerEmail = activeProfile.email || "owner@sportxclub.com";

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image object to compress it
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setEditFormData(prev => ({ ...prev, profilePicture: compressedBase64 }));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    try {
      if (currentUser) {
        updateUser(editFormData);
      } else {
        // Save to local storage for demo mode
        localStorage.setItem("mockOwnerProfile", JSON.stringify(editFormData));
        setDemoProfile(editFormData);
      }
      toast.success("Profile updated successfully!");
      setIsEditProfileOpen(false);
    } catch (error) {
      toast.error("Failed to save profile. Image might be too large.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "TO";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
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
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/owner-dashboard" &&
              location.pathname.startsWith(item.href));
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
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
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
                {ownerNavigation.find(
                  (n) =>
                    location.pathname === n.href ||
                    (n.href !== "/owner-dashboard" &&
                      location.pathname.startsWith(n.href)),
                )?.name || "Admin Panel"}
              </h1>
            </div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none focus:outline-none flex items-center gap-2 rounded-full hover:bg-accent/50 p-1 pr-4 pl-1 transition-colors cursor-pointer border-0 bg-transparent">
                  <Avatar className="h-10 w-10 border-2 border-primary/10 transition-colors">
                    {activeProfile.profilePicture ? (
                      <AvatarImage src={activeProfile.profilePicture} alt={ownerName} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {getInitials(ownerName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="hidden lg:block text-sm font-medium">
                    {ownerName}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate("/owner-dashboard/profile")} className="cursor-pointer">
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsEditProfileOpen(true)} className="cursor-pointer">
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background shadow-xl md:hidden"
              >
                <div className="absolute right-4 top-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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
            <Outlet context={{ activeProfile }} />
          </div>
        </main>
      </div>

      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Photo</Label>
              <div className="col-span-3 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {editFormData.profilePicture ? (
                    <AvatarImage src={editFormData.profilePicture} className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(editFormData.fullName || "Turf Owner")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Label htmlFor="picture-upload" className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Upload new
                </Label>
                <Input 
                  id="picture-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={editFormData.fullName}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={editFormData.bio}
                onChange={handleEditChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
