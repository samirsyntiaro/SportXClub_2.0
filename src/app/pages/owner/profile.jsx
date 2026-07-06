import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useAuth } from "../../providers/auth-provider";
import { Mail, Phone, MapPin, Building2, Briefcase, Camera } from "lucide-react";

import { useOutletContext } from "react-router";

export function OwnerProfile() {
  const { activeProfile } = useOutletContext();
  
  const ownerName = activeProfile?.fullName || "Turf Owner";
  const ownerEmail = activeProfile?.email || "owner@sportxclub.com";
  const getInitials = (name) => {
    if (!name) return "TO";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/80 to-primary h-48 sm:h-64 shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10" />
      </div>

      <div className="px-4 sm:px-6 relative -mt-20 sm:-mt-24">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
          <div className="relative">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background shadow-2xl ring-2 ring-primary/20">
              {activeProfile.profilePicture ? (
                <AvatarImage src={activeProfile.profilePicture} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                  {getInitials(ownerName)}
                </AvatarFallback>
              )}
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 rounded-full shadow-lg hover:shadow-xl transition-all">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-2 mb-4 sm:mb-6">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{ownerName}</h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Verified Owner
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">{activeProfile?.bio || "Professional Turf Manager & Sports Enthusiast"}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Personal Details */}
        <Card className="md:col-span-1 border-border/50 bg-card/40 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Your contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-semibold truncate">{ownerEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="font-semibold">{activeProfile?.phone || "+91 98765 43210"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-semibold">Mumbai, India</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Profile */}
        <Card className="md:col-span-2 border-border/50 bg-card/40 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>Manage your business presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2 p-4 rounded-xl border border-border/50 bg-muted/20">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium text-sm">Company Name</span>
                </div>
                <p className="text-lg font-semibold">{ownerName} Sports Pvt. Ltd.</p>
              </div>
              <div className="space-y-2 p-4 rounded-xl border border-border/50 bg-muted/20">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="font-medium text-sm">Business Registration No.</span>
                </div>
                <p className="text-lg font-semibold font-mono">SPORTX-2026-98X2</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">About the Business</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dedicated to providing premium quality sports infrastructure to local communities. 
                We manage highly rated multi-sport arenas with professional-grade synthetic turf, 
                floodlights, and top-tier amenities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
