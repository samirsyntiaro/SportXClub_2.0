import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  Heart,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Share2,
  Star,
  Wifi,
  Car,
  Coffee,
  Droplets,
  Shirt,
  Users,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AnimatePresence } from "motion/react";

const asset = (path) => `/assets${path}`;

const venue = {
  name: "Elite Turf Arena",
  location: "Powai, Mumbai",
  address: "123 Sports Complex, Hiranandani Gardens, Powai, Mumbai - 400076",
  rating: 4.9,
  reviews: 234,
  price: 1200,
  sport: "Football",
  description:
    "Elite Turf Arena is built for fast discovery and confident booking. The venue combines reliable lighting, verified access, and clear refund terms so players can decide quickly.",
};

const gallery = [
  asset("/venues/turf-1.webp"),
  asset("/venues/turf-2.webp"),
  asset("/venues/turf-3.webp"),
  asset("/venues/turf-4.webp"),
];

const amenities = [
  { icon: Car, label: "Free parking" },
  { icon: Shirt, label: "Changing rooms" },
  { icon: Droplets, label: "Showers" },
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Coffee, label: "Cafe" },
  { icon: Users, label: "Coaching available" },
];

const slots = [
  { time: "6:00 AM - 7:00 AM", available: true },
  { time: "7:00 AM - 8:00 AM", available: true },
  { time: "8:00 AM - 9:00 AM", available: false },
  { time: "9:00 AM - 10:00 AM", available: true },
  { time: "10:00 AM - 11:00 AM", available: true },
  { time: "5:00 PM - 6:00 PM", available: true },
  { time: "6:00 PM - 7:00 PM", available: false },
  { time: "7:00 PM - 8:00 PM", available: true },
];

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent facility with clean turf and fast booking. The trust signals make the decision easy.",
  },
  {
    name: "Priya Patel",
    rating: 5,
    date: "1 week ago",
    comment:
      "Very professional experience. The slot selection and review details feel much more polished now.",
  },
  {
    name: "Arjun Malhotra",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great lighting and easy access. The app makes comparison and booking simple.",
  },
];

const bookingFlow = ["Search", "Filter", "Slot selection", "Payment"];

export function VenueDetails() {
  const [selectedSport, setSelectedSport] = useState(venue.sport);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedSlot, setSelectedSlot] = useState("7:00 PM - 8:00 PM");
  const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false);

  useEffect(() => {
    if (isMobileBookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileBookingOpen]);

  const renderBookingFlow = (isMobile = false) => (
    <div
      className={`flex flex-col space-y-5 h-full overflow-y-auto ${isMobile ? "px-6 pb-[120px] pt-6" : "p-6"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs  uppercase tracking-[0.28em] text-white/45">
            Booking flow
          </p>
          <h2 className="mt-2 text-xl  text-white">
            Select sport, date, and slot
          </h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center shrink-0 rounded-full border border-[#6DFF3B]/18 bg-[#6DFF3B]/10">
          <Calendar className="h-5 w-5 text-[#6DFF3B]" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm  text-white/78">Select sport</p>
        <div className="flex flex-wrap gap-2">
          {["Football", "Cricket", "Basketball"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedSport(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedSport === item
                  ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10 text-[#6DFF3B]"
                  : "border-white/[0.08] bg-white/[0.03] text-white/68 hover:bg-white/[0.06]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm  text-white/78">Select date</p>
        <label className="flex items-center gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-3">
          <Calendar className="h-4 w-4 text-[#6DFF3B]" />
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none"
          />
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm  text-white/78">Select time slot</p>
        <div className="grid gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => slot.available && setSelectedSlot(slot.time)}
              className={`flex items-center justify-between rounded-[18px] border px-4 py-3 text-left transition ${
                !slot.available
                  ? "cursor-not-allowed border-white/[0.08] bg-white/[0.02] text-white/30"
                  : selectedSlot === slot.time
                    ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10 text-white"
                    : "border-white/[0.08] bg-white/[0.03] text-white/72 hover:bg-white/[0.06]"
              }`}
            >
              <span className="text-sm">{slot.time}</span>
              {slot.available ? (
                <Check className="h-4 w-4 text-[#6DFF3B]" />
              ) : (
                <span className="text-xs">Booked</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] border border-[#6DFF3B]/18 bg-[#6DFF3B]/10 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-[#6DFF3B]/80">
          Review booking
        </p>
        <div className="mt-3 space-y-2 text-sm text-white/72">
          <p>{selectedSport}</p>
          <p>{selectedDate}</p>
          <p>{selectedSlot}</p>
        </div>
      </div>

      <Link to="/payment" className="block">
        <Button className="h-12 w-full rounded-[18px] bg-[#6DFF3B]  text-[#050505] hover:bg-[#86ff60]">
          Continue to payment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>

      <div className="grid grid-cols-2 gap-3 pb-8">
        <Button
          variant="ghost"
          className="h-11 rounded-[16px] border border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.06]"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call venue
        </Button>
        <Button
          variant="ghost"
          className="h-11 rounded-[16px] border border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.06]"
        >
          <Menu className="h-4 w-4 mr-2" />
          Compare
        </Button>
      </div>
    </div>
  );

  return (
    <div className="theme-adaptive bg-[#050505] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:py-8 lg:pb-8">
        <Link
          to="/venues"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/72 transition hover:border-[#6DFF3B]/25 hover:bg-[#6DFF3B]/10"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to venues
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_390px]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101216]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <ImageWithFallback
                  src={gallery[0]}
                  alt={venue.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 image-overlay bg-[linear-gradient(180deg,rgba(5,5,5,0.06),rgba(5,5,5,0.82))]" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <Badge className="rounded-full border border-[#6DFF3B]/20 bg-[#6DFF3B]/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#6DFF3B]">
                    Verified venue
                  </Badge>
                  <Badge className="rounded-full border border-white/[0.08] bg-[#050505]/70 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-white/78">
                    Secure payment
                  </Badge>
                </div>
                <div className="absolute right-5 top-5 flex gap-3">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-[#050505]/70 text-white/80 backdrop-blur-md"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-[#050505]/70 text-white/80 backdrop-blur-md"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-5 left-5 max-w-xl">
                  <p className="text-sm uppercase tracking-[0.26em] text-[#6DFF3B]/80">
                    Sports venue
                  </p>
                  <h1 className="mt-3 text-3xl  tracking-tight text-white md:text-5xl">
                    {venue.name}
                  </h1>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/72">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#6DFF3B]" />
                      {venue.location}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
                      <Star className="h-4 w-4 fill-[#6DFF3B] text-[#6DFF3B]" />
                      {venue.rating.toFixed(1)} ({venue.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 p-4 md:grid-cols-4">
                {gallery.map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-[4/3] overflow-hidden rounded-[20px]"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${venue.name} gallery ${index + 1}`}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Card className="rounded-[28px] border-white/[0.08] bg-[#101216]">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[0.72rem]  uppercase tracking-[0.36em] text-[#6DFF3B]/85">
                      Overview
                    </p>
                    <h2 className="mt-3 text-2xl  text-white">
                      Book with confidence
                    </h2>
                  </div>
                  <div className="rounded-[20px] border border-[#6DFF3B]/18 bg-[#6DFF3B]/10 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#6DFF3B]/85">
                      From
                    </p>
                    <p className="mt-1 text-2xl  text-white">
                      ₹{venue.price}/hr
                    </p>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-white/64 md:text-base">
                  {venue.description}
                </p>

                <div className="grid gap-3 md:grid-cols-3">
                  {["Real reviews", "Easy refund", "Secure payment"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6DFF3B]/18 bg-[#6DFF3B]/10">
                            <ShieldCheck className="h-4 w-4 text-[#6DFF3B]" />
                          </div>
                          <p className=" text-white">{item}</p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-4">
              {bookingFlow.map((step, index) => (
                <div
                  key={step}
                  className={`rounded-[20px] border p-4 ${
                    index === 2
                      ? "border-[#6DFF3B]/30 bg-[#6DFF3B]/10"
                      : "border-white/[0.08] bg-[#101216]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm  text-white">{step}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <Card className="rounded-[28px] border-white/[0.08] bg-[#101216]">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl  text-white">Amenities</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {amenities.map((amenity) => {
                      const Icon = amenity.icon;
                      return (
                        <div
                          key={amenity.label}
                          className="flex items-center gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.03] px-4 py-3"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6DFF3B]/18 bg-[#6DFF3B]/10">
                            <Icon className="h-4 w-4 text-[#6DFF3B]" />
                          </div>
                          <span className="text-sm text-white/72">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border-white/[0.08] bg-[#101216]">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl  text-white">Location map</h2>
                  <div className="mt-5 rounded-[22px] border border-dashed border-white/[0.12] bg-[linear-gradient(135deg,rgba(109,255,59,0.08),rgba(255,255,255,0.03))] p-6">
                    <div className="flex h-52 flex-col items-center justify-center rounded-[18px] border border-white/[0.08] bg-[#050505]/70 text-center">
                      <MapPin className="h-8 w-8 text-[#6DFF3B]" />
                      <p className="mt-4 text-sm  text-white">
                        Interactive map placeholder
                      </p>
                      <p className="mt-2 max-w-sm text-xs leading-6 text-white/52">
                        Show the exact venue pin, nearby transit, and
                        neighborhood context here.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/58">{venue.address}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-[28px] border-white/[0.08] bg-[#101216]">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem]  uppercase tracking-[0.36em] text-[#6DFF3B]/85">
                      Reviews
                    </p>
                    <h2 className="mt-3 text-2xl  text-white">
                      Real reviews, shown clearly
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl  text-white">
                      {venue.rating.toFixed(1)}
                    </p>
                    <p className="text-sm text-white/52">
                      {venue.reviews} verified reviews
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className=" text-white">{review.name}</p>
                          <p className="mt-1 text-sm text-white/52">
                            {review.date}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <Star
                                key={index}
                                className="h-4 w-4 fill-[#6DFF3B] text-[#6DFF3B]"
                              />
                            ),
                          )}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-white/66">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="hidden space-y-4 lg:sticky lg:top-24 lg:block lg:self-start">
            <Card className="rounded-[28px] border-white/[0.08] bg-[#101216] shadow-[0_18px_56px_-30px_rgba(0,0,0,0.85)]">
              {renderBookingFlow()}
            </Card>
          </aside>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#050505]/94 px-4 py-3 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Next step
              </p>
              <p className="mt-1 text-sm  text-white">Choose your slot</p>
            </div>
            <Button
              className="h-11 rounded-[16px] bg-[#6DFF3B] px-5  text-[#050505] hover:bg-[#86ff60]"
              onClick={() => setIsMobileBookingOpen(true)}
            >
              Book now
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileBookingOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileBookingOpen(false)}
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-[28px] border-t border-white/[0.08] bg-[#101216] lg:hidden"
              >
                <div className="flex items-center justify-center pt-3 pb-1">
                  <div className="h-1.5 w-12 rounded-full bg-white/20" />
                </div>
                {renderBookingFlow(true)}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
