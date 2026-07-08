import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../providers/auth-provider";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TimerReset,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { cn } from "../components/ui/utils";

const asset = (path) => `/assets${path}`;

const venueData = [
  {
    id: 1,
    name: "Elite Turf Arena",
    location: "Powai, Mumbai",
    city: "Mumbai",
    sport: "Football",
    rating: 4.9,
    reviews: 234,
    price: 1200,
    distance: 1.2,
    availableToday: true,
    availability: "Tonight slots available",
    image: asset("/venues/turf-1.webp"),
    badges: [asset("/venues/badge-top-rated.svg")],
    amenities: ["Flood lights", "Parking", "Verified venue"],
  },
  {
    id: 2,
    name: "Metro Sports Park",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    sport: "Cricket",
    rating: 4.8,
    reviews: 189,
    price: 950,
    distance: 2.5,
    availableToday: true,
    availability: "Few evening slots left",
    image: asset("/venues/turf-2.webp"),
    badges: [asset("/venues/badge-new.svg")],
    amenities: ["Wi-Fi", "Shower", "Secure payments"],
  },
  {
    id: 3,
    name: "Grand Playfield",
    location: "Andheri East, Mumbai",
    city: "Mumbai",
    sport: "Badminton",
    rating: 5.0,
    reviews: 92,
    price: 1500,
    distance: 3.8,
    availableToday: false,
    availability: "Morning slots only",
    image: asset("/venues/turf-3.webp"),
    badges: [asset("/venues/badge-top-rated.svg")],
    amenities: ["Pro lighting", "Parking", "Real reviews"],
  },
  {
    id: 4,
    name: "Victory Greens",
    location: "Juhu, Mumbai",
    city: "Mumbai",
    sport: "Tennis",
    rating: 4.7,
    reviews: 128,
    price: 1050,
    distance: 4.1,
    availableToday: true,
    availability: "Available after 6 PM",
    image: asset("/venues/turf-4.webp"),
    badges: [asset("/venues/badge-new.svg")],
    amenities: ["Flood lights", "Wi-Fi", "Verified venue"],
  },
  {
    id: 5,
    name: "Pro Match Grounds",
    location: "Thane West, Thane",
    city: "Thane",
    sport: "Football",
    rating: 4.8,
    reviews: 101,
    price: 800,
    distance: 6.6,
    availableToday: true,
    availability: "Prime time available",
    image: asset("/venues/turf-5.webp"),
    badges: [asset("/venues/badge-top-rated.svg")],
    amenities: ["Parking", "Changing room", "Easy refund"],
  },
  {
    id: 6,
    name: "Apex Turf Club",
    location: "Navi Mumbai",
    city: "Navi Mumbai",
    sport: "Basketball",
    rating: 4.9,
    reviews: 76,
    price: 1300,
    distance: 8.4,
    availableToday: false,
    availability: "Next slot tomorrow",
    image: asset("/venues/turf-6.webp"),
    badges: [asset("/venues/badge-new.svg")],
    amenities: ["Flood lights", "Shower", "Secure payments"],
  },
];

const sports = [
  "All",
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
];
const locations = ["All", "Mumbai", "Thane", "Navi Mumbai"];
const sorts = ["Recommended", "Rating", "Price: Low to High", "Distance"];
const bookingFlow = [
  { label: "Search", detail: "City and sport" },
  { label: "Filter", detail: "Price, rating, distance" },
  { label: "Compare", detail: "Trust and availability" },
  { label: "Book", detail: "Pick a slot" },
];

export function VenueBooking() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("All");
  const [location, setLocation] = useState(
    () => localStorage.getItem("preferred-city") || "All",
  );

  useEffect(() => {
    const handleCityChange = (e) => {
      const customEvent = e;
      setLocation(customEvent.detail);
    };
    window.addEventListener("preferredCityChanged", handleCityChange);
    return () =>
      window.removeEventListener("preferredCityChanged", handleCityChange);
  }, []);

  const handleLocationChange = (newVal) => {
    setLocation(newVal);
    localStorage.setItem("preferred-city", newVal);
    window.dispatchEvent(
      new CustomEvent("preferredCityChanged", { detail: newVal }),
    );
  };

  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState([700, 1600]);
  const [availabilityOnly, setAvailabilityOnly] = useState(true);
  const [ratingOnly, setRatingOnly] = useState(false);

  const filteredVenues = useMemo(() => {
    const filtered = venueData.filter((venue) => {
      const matchesQuery =
        !query.trim() ||
        venue.name.toLowerCase().includes(query.toLowerCase()) ||
        venue.location.toLowerCase().includes(query.toLowerCase()) ||
        venue.sport.toLowerCase().includes(query.toLowerCase());
      const matchesSport = sport === "All" || venue.sport === sport;
      const matchesLocation = location === "All" || venue.city === location;
      const matchesPrice =
        venue.price >= priceRange[0] && venue.price <= priceRange[1];
      const matchesAvailability = !availabilityOnly || venue.availableToday;
      const matchesRating = !ratingOnly || venue.rating >= 4.8;

      return (
        matchesQuery &&
        matchesSport &&
        matchesLocation &&
        matchesPrice &&
        matchesAvailability &&
        matchesRating
      );
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Distance") return a.distance - b.distance;
      return b.reviews - a.reviews;
    });

    return sorted;
  }, [
    availabilityOnly,
    location,
    priceRange,
    query,
    ratingOnly,
    sortBy,
    sport,
  ]);

  return (
    <div
      className={cn(
        "theme-adaptive",
        isDark ? "bg-[#050505] text-white" : "bg-white text-slate-900",
      )}
    >
      <section
        className="border-b border-white/[0.08]"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(180deg,rgba(109,255,59,0.04),rgba(5,5,5,0))"
            : "none",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[0.72rem]  uppercase tracking-[0.36em] text-[#6DFF3B]/85">
                  Venues
                </p>
                <h1 className="mt-3 text-3xl  tracking-tight text-white md:text-5xl">
                  Discover venues the BookMyShow way.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/64 md:text-base">
                  Search by sport, choose your city, compare venue trust
                  signals, and book the right slot without confusion.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#101216] px-4 py-2 text-sm text-white/72">
                  <MapPin className="h-4 w-4 text-[#6DFF3B]" />
                  Mumbai
                  <ChevronDown className="h-4 w-4 text-white/35" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#6DFF3B]/18 bg-[#6DFF3B]/10 px-4 py-2 text-sm  text-[#6DFF3B]">
                  <ShieldCheck className="h-4 w-4" />
                  Verified venues
                </div>
              </div>
            </div>

            <Card className="rounded-[24px] border-white/[0.08] bg-[#101216]">
              <CardContent className="p-4 md:p-5">
                <div className="grid gap-3 lg:grid-cols-[1.6fr_0.8fr_0.8fr_auto]">
                  <label className="relative block">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search sports, venues, or tournaments"
                      className="h-12 rounded-[18px] border-white/[0.08] bg-[#050505]/70 pl-11 text-white placeholder:text-white/35"
                    />
                  </label>

                  <Select value={location} onValueChange={handleLocationChange}>
                    <SelectTrigger className="h-12 rounded-[18px] border-white/[0.08] bg-[#050505]/70 text-white">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 rounded-[18px] border-white/[0.08] bg-[#050505]/70 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sorts.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button className="h-12 rounded-[18px] bg-[#6DFF3B] px-7  text-[#050505] hover:bg-[#86ff60]">
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {sports.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSport(item)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition",
                    sport === item
                      ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10 text-[#6DFF3B]"
                      : "border-white/[0.08] bg-white/[0.03] text-white/68 hover:border-white/[0.16] hover:bg-white/[0.06]",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {bookingFlow.map((step, index) => (
                <div
                  key={step.label}
                  className="rounded-[20px] border border-white/[0.08] bg-[#101216] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6DFF3B]/18 bg-[#6DFF3B]/10 text-sm  text-[#6DFF3B]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm  text-white">{step.label}</p>
                      <p className="mt-1 text-xs text-white/52">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8 lg:py-10">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="rounded-[24px] border-white/[0.08] bg-[#101216]">
            <CardContent className="space-y-6 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs  uppercase tracking-[0.28em] text-white/45">
                    Filters
                  </p>
                  <h2 className="mt-2 text-lg  text-white">
                    Refine your search
                  </h2>
                </div>
                <Filter className="h-5 w-5 text-[#6DFF3B]" />
              </div>

              <div className="space-y-3">
                <p className="text-sm  text-white/78">Sport</p>
                <div className="flex flex-wrap gap-2">
                  {sports.slice(1).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSport(item)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs  transition",
                        sport === item
                          ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10 text-[#6DFF3B]"
                          : "border-white/[0.08] bg-white/[0.03] text-white/68 hover:bg-white/[0.06]",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm  text-white/78">Price per hour</p>
                <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-4">
                  <Slider
                    value={priceRange}
                    min={500}
                    max={2000}
                    step={50}
                    onValueChange={setPriceRange}
                    className="py-3"
                  />

                  <div className="mt-2 flex items-center justify-between text-xs text-white/48">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm  text-white/78">Trust & availability</p>
                <button
                  type="button"
                  onClick={() => setAvailabilityOnly((current) => !current)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[18px] border px-4 py-3 text-left transition",
                    availabilityOnly
                      ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10 text-white"
                      : "border-white/[0.08] bg-white/[0.03] text-white/72",
                  )}
                >
                  <div>
                    <p className="text-sm ">Available today</p>
                    <p className="mt-1 text-xs text-white/52">
                      Hide sold-out venues
                    </p>
                  </div>
                  <TimerReset className="h-4 w-4 text-[#6DFF3B]" />
                </button>
                <button
                  type="button"
                  onClick={() => setRatingOnly((current) => !current)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[18px] border px-4 py-3 text-left transition",
                    ratingOnly
                      ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10 text-white"
                      : "border-white/[0.08] bg-white/[0.03] text-white/72",
                  )}
                >
                  <div>
                    <p className="text-sm ">4.8+ only</p>
                    <p className="mt-1 text-xs text-white/52">
                      Prioritize better-rated venues
                    </p>
                  </div>
                  <Star className="h-4 w-4 text-[#6DFF3B]" />
                </button>
              </div>

              <div className="rounded-[20px] border border-[#6DFF3B]/18 bg-[#6DFF3B]/10 p-4">
                <p className="text-sm  text-white">Trust badges</p>
                <div className="mt-3 space-y-2 text-sm text-white/70">
                  <p>Verified venue</p>
                  <p>Secure payment</p>
                  <p>Easy refund</p>
                  <p>Real reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/52">
              Showing{" "}
              <span className="text-white">{filteredVenues.length}</span> venues
              in your area
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Sort: Recommended",
                "Sport",
                "Location",
                "Price",
                "Rating",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/64"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#6DFF3B]" />
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {filteredVenues.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  whileHover={{ y: -6 }}
                >
                  <Link 
                    to={`/venues/${venue.id}`} 
                    className="block h-full"
                    onClick={(e) => {
                      if (!currentUser) {
                        e.preventDefault();
                        toast.error("Please sign in first to view slots and book.");
                        navigate("/login");
                      }
                    }}
                  >
                    <Card className="group h-full overflow-hidden rounded-[24px] border-white/[0.08] bg-[#101216] shadow-[0_18px_56px_-30px_rgba(0,0,0,0.85)]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={venue.image}
                          alt={venue.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 image-overlay bg-[linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.7))]" />
                        <div className="absolute left-4 top-4 flex gap-2">
                          {venue.badges.map((badge) => (
                            <img
                              key={badge}
                              src={badge}
                              alt=""
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          aria-label={`Save ${venue.name}`}
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-[#050505]/70 text-white/70 backdrop-blur-md transition hover:bg-[#050505]/90 hover:text-white"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <div className="absolute left-4 bottom-4 rounded-full border border-white/[0.08] bg-[#050505]/72 px-3 py-1.5 text-xs  text-white/90 backdrop-blur-md">
                          {venue.distance.toFixed(1)} km away
                        </div>
                      </div>

                      <CardContent className="space-y-4 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg  text-white">
                              {venue.name}
                            </h3>
                            <p className="mt-1 text-sm text-white/58">
                              {venue.location}
                            </p>
                          </div>
                          <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-white">
                            <Star className="inline-block h-4 w-4 fill-[#6DFF3B] text-[#6DFF3B]" />{" "}
                            {venue.rating.toFixed(1)}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/72">
                            {venue.sport}
                          </Badge>
                          <Badge className="rounded-full border border-[#6DFF3B]/20 bg-[#6DFF3B]/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#6DFF3B]">
                            {venue.availableToday
                              ? "Available today"
                              : "Limited slots"}
                          </Badge>
                        </div>

                        <div className="grid gap-2">
                          {venue.amenities.map((amenity) => (
                            <div
                              key={amenity}
                              className="flex items-center gap-2 rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white/66"
                            >
                              <ShieldCheck className="h-4 w-4 text-[#6DFF3B]" />
                              {amenity}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                              From
                            </p>
                            <p className="mt-1 text-xl  text-white">
                              ₹{venue.price}/hr
                            </p>
                          </div>
                          <Button className="group h-11 rounded-[16px] border border-[#6DFF3B] bg-transparent px-5 text-white transition-all hover:bg-[#6DFF3B] hover:text-[#050505]">
                            View slots
                            <ArrowRight className="h-4 w-4 text-[#6DFF3B] transition-colors group-hover:text-[#050505]" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="rounded-[24px] border-white/[0.08] bg-[#101216]">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <p className="text-lg  text-white">
                  No venues match your filters
                </p>
                <p className="max-w-md text-sm leading-7 text-white/58">
                  Try widening the price range or switching the sport and
                  location filters.
                </p>
                <Button
                  onClick={() => {
                    setQuery("");
                    setSport("All");
                    setLocation("All");
                    setSortBy("Recommended");
                    setPriceRange([700, 1600]);
                    setAvailabilityOnly(true);
                    setRatingOnly(false);
                  }}
                  className="h-11 rounded-[16px] bg-[#6DFF3B] px-5  text-[#050505] hover:bg-[#86ff60]"
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
