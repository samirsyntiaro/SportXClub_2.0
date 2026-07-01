import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronRight,
  Dumbbell,
  Heart,
  MapPin,
  Mic,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy,
  Waves,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../ui/utils";
import { MobileAppBar, MobileBottomNav } from "./mobile-chrome";

const asset = (path: string) => `/assets${path}`;

const sportsCategories = [
  { name: "Football", image: asset("/sports/cat-football.webp"), accent: "from-emerald-500/20 to-emerald-500/5" },
  { name: "Cricket", image: asset("/sports/cat-cricket.webp"), accent: "from-lime-500/20 to-lime-500/5" },
  { name: "Badminton", image: asset("/sports/cat-badminton.webp"), accent: "from-primary/20 to-primary/5" },
  { name: "Tennis", image: asset("/sports/cat-tennis.webp"), accent: "from-emerald-500/20 to-emerald-500/5" },
  { name: "Basketball", image: asset("/sports/cat-basketball.webp"), accent: "from-primary/20 to-primary/5" },
  { name: "Volleyball", image: asset("/sports/cat-boxmma.webp"), accent: "from-lime-500/20 to-lime-500/5" },
  { name: "Swimming", image: asset("/sports/cat-swimming.webp"), accent: "from-cyan-500/20 to-cyan-500/5" },
  { name: "Gym", image: asset("/sports/cat-padel.webp"), accent: "from-neutral-500/20 to-neutral-500/5" },
  { name: "More", image: asset("/sports/cat-boxmma.webp"), accent: "from-primary/20 to-primary/5" },
];

const featuredVenues = [
  {
    id: 1,
    name: "Elite Turf Arena",
    sport: "Football",
    location: "Powai, 1.2 km",
    rating: 4.9,
    price: "₹1,200",
    image: asset("/venues/turf-1.webp"),
    tag: "Top rated",
  },
  {
    id: 2,
    name: "Metro Sports Park",
    sport: "Cricket",
    location: "Bandra, 2.5 km",
    rating: 4.8,
    price: "₹950",
    image: asset("/venues/turf-2.webp"),
    tag: "Fast slots",
  },
  {
    id: 3,
    name: "Grand Playfield",
    sport: "Badminton",
    location: "Andheri, 3.8 km",
    rating: 5,
    price: "₹1,500",
    image: asset("/venues/turf-3.webp"),
    tag: "Verified",
  },
];

const nearbyTurfs = [
  {
    name: "Victory Greens",
    sport: "Football",
    distance: "1.9 km",
    price: "₹1,050/hr",
    image: asset("/venues/turf-4.webp"),
  },
  {
    name: "Pro Match Grounds",
    sport: "Cricket",
    distance: "2.8 km",
    price: "₹800/hr",
    image: asset("/venues/turf-5.webp"),
  },
  {
    name: "Apex Turf Club",
    sport: "Basketball",
    distance: "4.1 km",
    price: "₹1,300/hr",
    image: asset("/venues/turf-6.webp"),
  },
];

const tournaments = [
  {
    title: "City Five-A-Side Cup",
    date: "24 Jun",
    prize: "₹2.5L prize pool",
    image: asset("/tournaments/tournament-1-cover.webp"),
  },
  {
    title: "Midnight Turf League",
    date: "25 Jun",
    prize: "32 teams open",
    image: asset("/tournaments/tournament-2-cover.webp"),
  },
  {
    title: "Weekend Smash Open",
    date: "26 Jun",
    prize: "Registration closing",
    image: asset("/tournaments/tournament-3-cover.webp"),
  },
];

const offers = [
  {
    title: "Early bird cashback",
    copy: "Book your first weekend slot and get instant savings on select venues.",
    tint: "from-primary/20 to-primary/5",
  },
  {
    title: "Tournament starter pack",
    copy: "Launch a league with verified venues, live registrations, and smooth check-in.",
    tint: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Refund-safe booking",
    copy: "Clear booking policies, trusted payments, and easy cancellation in one flow.",
    tint: "from-lime-500/20 to-lime-500/5",
  },
];

const recommended = [
  {
    name: "Night Turf Special",
    detail: "After 7 PM slots",
    image: asset("/venues/turf-2.webp"),
  },
  {
    name: "Weekend Cricket Nets",
    detail: "Family friendly",
    image: asset("/venues/turf-1.webp"),
  },
  {
    name: "Indoor Smash Zone",
    detail: "Air-conditioned",
    image: asset("/venues/turf-3.webp"),
  },
];

const recent = [
  {
    name: "Elite Turf Arena",
    sport: "Football",
    image: asset("/venues/turf-1.webp"),
  },
  {
    name: "Metro Sports Park",
    sport: "Cricket",
    image: asset("/venues/turf-2.webp"),
  },
];

const trending = [
  {
    name: "5-a-side",
    icon: Trophy,
    note: "High energy matches",
  },
  {
    name: "Weekend leagues",
    icon: Sparkles,
    note: "Fast registration",
  },
  {
    name: "Recreation",
    icon: Dumbbell,
    note: "Fitness-first sessions",
  },
  {
    name: "Swimming",
    icon: Waves,
    note: "Pool bookings nearby",
  },
];

function SectionHeader({
  title,
  action = "View all",
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[1.05rem]  tracking-tight text-foreground">{title}</h2>
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm  text-primary"
      >
        {action}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="rounded-[24px] border border-border/60 bg-card/80 p-3 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl transition focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10">
      <div className="flex items-center gap-2">
        <div className="flex h-11 flex-1 items-center gap-3 rounded-[18px] border border-border/60 bg-background/90 px-4">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search venues, sports or tournaments"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-border/60 bg-background/90 text-foreground shadow-sm"
          aria-label="Voice search"
        >
          <Mic className="h-4.5 w-4.5" />
        </button>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-primary/20 bg-primary/10 text-primary shadow-sm"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}

function VenueCard({
  venue,
}: {
  venue: {
    id: number;
    name: string;
    sport: string;
    location: string;
    rating: number;
    price: string;
    image: string;
    tag: string;
  };
}) {
  return (
    <motion.article
      whileTap={{ scale: 0.985 }}
      className="min-w-[84%] overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-[0_12px_30px_-24px_rgba(15,23,42,0.32)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <ImageWithFallback
          src={venue.image}
          alt={venue.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 image-overlay bg-[linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.62))]" />
        <button
          type="button"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md"
          aria-label={`Save ${venue.name}`}
        >
          <Heart className="h-4.5 w-4.5" />
        </button>
        <Badge className="absolute left-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem]  uppercase tracking-[0.18em] text-primary">
          {venue.tag}
        </Badge>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base  text-foreground">{venue.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{venue.sport}</p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-500/15 bg-amber-500/10 px-2.5 py-1 text-xs  text-amber-700">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            {venue.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            {venue.location}
          </span>
          <span className=" text-foreground">{venue.price}/hr</span>
        </div>

        <Button className="h-11 w-full rounded-[16px] bg-primary  text-primary-foreground shadow-[0_12px_22px_-16px_rgba(34,197,94,0.85)] hover:bg-primary/90">
          Book now
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.article>
  );
}

function CarouselCard({
  title,
  copy,
  tint,
}: {
  title: string;
  copy: string;
  tint: string;
}) {
  return (
    <motion.article
      whileTap={{ scale: 0.985 }}
      className={cn(
        "min-w-[86%] rounded-[24px] border border-border/60 bg-gradient-to-br p-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.32)]",
        tint,
      )}
    >
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <p className="text-xs  uppercase tracking-[0.22em] text-primary">
            Offer
          </p>
          <h3 className="mt-3 text-lg  text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
        </div>
        <Button
          variant="ghost"
          className="h-10 w-fit rounded-full border border-border/70 bg-background/80 px-4 text-sm  text-foreground"
        >
          Claim offer
        </Button>
      </div>
    </motion.article>
  );
}

export function MobileHomePage() {
  return (
    <div className="theme-adaptive min-h-dvh bg-background text-foreground">
      <MobileAppBar />

      <main className="pb-[calc(108px+env(safe-area-inset-bottom))]">
        <div className="space-y-6 px-4 py-4">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-primary/10 bg-gradient-to-br from-primary/8 via-background to-background p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs  uppercase tracking-[0.24em] text-primary">
                  Good evening
                </p>
                <h1 className="mt-2 text-2xl  tracking-tight text-foreground">
                  Ready for your next game, Rohan?
                </h1>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Mumbai Central
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-primary/15 bg-primary/10 text-primary shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
          </motion.section>

          <SearchBar />

          <section className="space-y-3">
            <SectionHeader title="Sports categories" action="More" />
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {sportsCategories.map((item) => (
                <motion.button
                  key={item.name}
                  whileTap={{ scale: 0.96 }}
                  className="flex min-w-[76px] flex-col items-center gap-2"
                >
                  <span
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-gradient-to-br shadow-[0_10px_20px_-16px_rgba(15,23,42,0.35)]",
                      item.accent,
                    )}
                  >
                    <span className="flex h-12 w-12 overflow-hidden rounded-full bg-background/90">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  </span>
                  <span className="text-center text-[0.75rem]  leading-tight text-muted-foreground">
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Featured venues" />
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {featuredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Nearby turfs" />
            <div className="space-y-3">
              {nearbyTurfs.map((venue) => (
                <Link key={venue.name} to="/venues" className="block">
                  <motion.article
                    whileTap={{ scale: 0.99 }}
                    className="flex gap-3 rounded-[22px] border border-border/60 bg-card p-3 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.3)]"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[18px]">
                      <ImageWithFallback
                        src={venue.image}
                        alt={venue.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-base  text-foreground">
                            {venue.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{venue.sport}</p>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/15 bg-amber-500/10 px-2.5 py-1 text-xs  text-amber-700">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          4.8
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary" />
                          {venue.distance}
                        </span>
                        <span className=" text-foreground">{venue.price}</span>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1 text-sm  text-primary">
                        Explore slots
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Popular tournaments" />
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {tournaments.map((item) => (
                <motion.article
                  key={item.title}
                  whileTap={{ scale: 0.985 }}
                  className="min-w-[78%] overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-[0_12px_28px_-22px_rgba(15,23,42,0.32)]"
                >
                  <div className="relative aspect-[16/10]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 image-overlay bg-[linear-gradient(180deg,rgba(5,5,5,0.04),rgba(5,5,5,0.68))]" />
                    <Badge className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[0.65rem]  uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Upcoming
                    </Badge>
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <h3 className="text-base  text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm  text-primary">{item.prize}</p>
                      <Button variant="ghost" className="h-10 rounded-full px-4 text-sm  text-foreground">
                        Join
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Offers" />
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {offers.map((offer) => (
                <CarouselCard key={offer.title} {...offer} />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Recommended for you" />
            <div className="grid gap-3 sm:grid-cols-3">
              {recommended.map((item) => (
                <motion.article
                  key={item.name}
                  whileTap={{ scale: 0.985 }}
                  className="overflow-hidden rounded-[22px] border border-border/60 bg-card shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]"
                >
                  <div className="relative aspect-[4/3]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 image-overlay bg-[linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.56))]" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm  text-foreground">{item.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Recently viewed" action="See history" />
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {recent.map((item) => (
                <motion.article
                  key={item.name}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-[68%] overflow-hidden rounded-[22px] border border-border/60 bg-card"
                >
                  <div className="flex items-center gap-3 p-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[18px]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm  text-foreground">{item.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.sport}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader title="Trending activities" />
            <div className="grid grid-cols-2 gap-3">
              {trending.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.name}
                    whileTap={{ scale: 0.985 }}
                    className="rounded-[22px] border border-border/60 bg-card p-4 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm  text-foreground">{item.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.note}</p>
                  </motion.article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <MobileBottomNav activeTab="home" />
    </div>
  );
}

