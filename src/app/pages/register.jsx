import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Check,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Shield,
  Activity,
  Sparkles,
  Smartphone,
  Eye,
  EyeOff,
  UserCircle,
  Building,
  Target,
  Star,
  Users
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Logo } from "../components/brand/Logo";
import { cn } from "../components/ui/utils";

const sportsOptions = [
  { id: "football", name: "Football", emoji: "⚽", category: "Outdoor" },
  { id: "cricket", name: "Cricket", emoji: "🏏", category: "Outdoor" },
  { id: "badminton", name: "Badminton", emoji: "🏸", category: "Indoor" },
  { id: "tennis", name: "Tennis", emoji: "🎾", category: "Racket" },
  { id: "basketball", name: "Basketball", emoji: "🏀", category: "Court" },
  { id: "swimming", name: "Swimming", emoji: "🏊", category: "Aquatic" },
  { id: "gym", name: "Gym & Fitness", emoji: "🏋️", category: "Indoor" },
  { id: "volleyball", name: "Volleyball", emoji: "🏐", category: "Court" },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "athlete", // athlete | owner | admin
    selectedSports: [] as string[],
    skillLevel: "Intermediate", // Beginner | Intermediate | Pro
    city: "Mumbai",
    phone: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const toggleSport = (sportId: string) => {
    setFormData((prev) => {
      const selected = prev.selectedSports.includes(sportId)
        ? prev.selectedSports.filter((id) => id !== sportId)
        : [...prev.selectedSports, sportId];
      return { ...prev, selectedSports: selected };
    });
  };

  const selectSkill = (level: string) => {
    setFormData((prev) => ({ ...prev, skillLevel: level }));
  };

  // Basic Validations
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const isStep1Valid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.includes("@") &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword
    );
  };

  const isStep2Valid = () => {
    if (formData.role === "athlete") {
      return formData.selectedSports.length > 0;
    }
    return true;
  };

  const isStep3Valid = () => {
    return formData.phone.length >= 10 && (!otpSent || formData.otp.length === 6);
  };

  const handleNext = () => {
    if (step === 1 && isStep1Valid()) setStep(2);
    else if (step === 2 && isStep2Valid()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const sendMockOtp = () => {
    if (formData.phone.length < 10) return;
    setOtpSent(true);
    setOtpError("");
    alert("Mock OTP code sent to your phone: 994021");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent && formData.otp !== "994021") {
      setOtpError("Invalid verification code. Please use 994021.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      if (formData.role === "owner") navigate("/owner-dashboard");
      else if (formData.role === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    }, 1500);
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = ["bg-neutral-300", "bg-rose-500", "bg-amber-500", "bg-yellow-500", "bg-emerald-500"];
  const strengthLabels = ["Empty", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 transition-colors duration-200">
      {/* BACKGROUND ELEMENTS (Grid + Radial Accent Glows) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Floating Blur Circles (Dynamic glow backdrop) */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-emerald-500/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-[10%] right-[5%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />

      {/* FLOAT WIDGETS (Gives the unique, premium sports-dashboard feel around the card) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="hidden lg:flex absolute left-[10%] top-[30%] rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-4 shadow-lg items-center gap-3 max-w-[200px]"
      >
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
          <Star className="h-5 w-5 fill-primary text-primary" />
        </div>
        <div>
          <p className="text-xs ">4.9/5 Rating</p>
          <p className="text-[0.62rem] text-muted-foreground">Loved by 12k+ active athletes</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hidden lg:flex absolute right-[10%] bottom-[30%] rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-4 shadow-lg items-center gap-3 max-w-[200px]"
      >
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs ">Tournaments</p>
          <p className="text-[0.62rem] text-muted-foreground">Compete, register, & win pools</p>
        </div>
      </motion.div>

      {/* HEADER LOGO */}
      <div className="w-full max-w-xl flex items-center mb-6 z-10">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
          <div className="flex flex-col justify-center">
            <p className="text-sm">Register Platform</p>
          </div>
        </Link>
      </div>

      {/* MAIN CONTAINER (Centered premium Card) */}
      <div className="w-full max-w-xl border border-border/50 bg-card/65 backdrop-blur-2xl rounded-[32px] p-6 sm:p-10 shadow-[0_28px_60px_-24px_rgba(15,23,42,0.15)] dark:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.4)] relative overflow-hidden z-10">
        {/* Subtle top decoration bar */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <AnimatePresence mode="wait">
          {isSuccess ? (
            // Success Screen
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-8 space-y-6"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                >
                  <Check className="h-10 w-10 text-emerald-500" />
                </motion.div>
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-45 pointer-events-none" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl  tracking-tight">Registration Complete!</h1>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Welcome aboard, {formData.fullName}. Creating your personalized sports dashboard...
                </p>
              </div>

              {/* Profile Card Preview */}
              <div className="p-4 rounded-2xl border border-border bg-card/50 text-left space-y-3 shadow-md max-w-xs mx-auto">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center  text-sm">
                    {formData.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm ">{formData.fullName}</p>
                    <p className="text-xs text-muted-foreground">@{formData.fullName.toLowerCase().replace(/\s+/g, "")}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="outline" className="text-[0.65rem] border-primary/20 bg-primary/5 text-primary rounded-full uppercase tracking-wide">
                    {formData.role}
                  </Badge>
                  {formData.role === "athlete" && (
                    <Badge variant="outline" className="text-[0.65rem] border-amber-500/20 bg-amber-500/5 text-amber-500 rounded-full uppercase tracking-wide">
                      {formData.skillLevel}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[0.65rem] border-blue-500/20 bg-blue-500/5 text-blue-500 rounded-full">
                    {formData.city}
                  </Badge>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="w-full h-11 rounded-full bg-primary text-primary-foreground  shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all"
                >
                  Go to Dashboard Now
                </Button>
              </div>
            </motion.div>
          ) : (
            // Form Steps
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Step Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <p className="text-xs  uppercase tracking-[0.2em] text-primary">
                    Step {step} of 3
                  </p>
                  <h1 className="text-2xl  tracking-tight sm:text-3xl">
                    {step === 1 && "Create Account"}
                    {step === 2 && "Setup Profile"}
                    {step === 3 && "Verify Phone"}
                  </h1>
                </div>
                <span className="text-xs  text-muted-foreground bg-muted/65 rounded-full px-3 py-1">
                  {step === 1 && "Account"}
                  {step === 2 && "Interests"}
                  {step === 3 && "Security"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* STEP 1: ACCOUNT DETAILS */}
                {step === 1 && (
                  <div className="space-y-4">
                    {/* Account Type Selector */}
                    <div className="flex p-1 space-x-1 rounded-xl bg-muted/50 border border-border/50 mb-2">
                      {(["athlete", "owner", "admin"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleRoleSelect(type)}
                          className={cn(
                            "flex-1 rounded-lg py-2 text-xs transition-all duration-200",
                            formData.role === type
                              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                          )}
                        >
                          {type === "athlete" ? "Player" : type === "owner" ? "Turf Owner" : "Site Maker"}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 h-10.5 rounded-xl border-border bg-background/50 focus-visible:bg-background"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10 h-10.5 rounded-xl border-border bg-background/50 focus-visible:bg-background"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        {formData.password && (
                          <span className={`text-xs  ${
                            passwordStrength >= 3 ? "text-emerald-500" : passwordStrength === 2 ? "text-amber-500" : "text-rose-500"
                          }`}>
                            {strengthLabels[passwordStrength]}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-10.5 rounded-xl border-border bg-background/50 focus-visible:bg-background"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                      </div>
                      {/* Password strength bar */}
                      {formData.password && (
                        <div className="grid grid-cols-4 gap-1.5 pt-1">
                          {[1, 2, 3, 4].map((index) => (
                            <div
                              key={index}
                              className={`h-1 rounded-full transition-all duration-300 ${
                                index <= passwordStrength ? strengthColors[passwordStrength] : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-[0.72rem] text-muted-foreground">
                        Must be at least 6 characters with mixed letters and numbers.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 h-10.5 rounded-xl border-border bg-background/50 focus-visible:bg-background"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-rose-500 ">Passwords do not match.</p>
                      )}
                    </div>

                    <div className="pt-3">
                      <Button
                        type="button"
                        disabled={!isStep1Valid()}
                        onClick={handleNext}
                        className="w-full h-11 rounded-full bg-primary text-primary-foreground  hover:shadow-lg hover:shadow-primary/10 transition-all flex items-center justify-center gap-1.5 group"
                      >
                        Continue
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 2: PROFILE SETUP (ROLE & SPORTS) */}
                {step === 2 && (
                  <div className="space-y-5">
                    {/* Dynamic Preferences */}
                    {formData.role === "athlete" ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Choose Your Sports</Label>
                            <span className="text-xs text-muted-foreground ">
                              {formData.selectedSports.length} selected
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 max-h-[170px] overflow-y-auto pr-1">
                            {sportsOptions.map((sport) => {
                              const isSelected = formData.selectedSports.includes(sport.id);
                              return (
                                <button
                                  key={sport.id}
                                  type="button"
                                  onClick={() => toggleSport(sport.id)}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left text-sm transition-all ${
                                    isSelected
                                      ? "border-primary bg-primary/10  text-foreground"
                                      : "border-border bg-background/30 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                                  }`}
                                >
                                  <span className="text-lg leading-none">{sport.emoji}</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs  leading-tight">{sport.name}</p>
                                    <p className="text-[0.62rem] text-muted-foreground leading-none mt-0.5">{sport.category}</p>
                                  </div>
                                  {isSelected && (
                                    <div className="h-4.5 w-4.5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                      <Check className="h-3 w-3 stroke-[3]" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Skill Level */}
                        <div className="space-y-2">
                          <Label>Your Skill Level</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Beginner", "Intermediate", "Pro"].map((level) => {
                              const isSelected = formData.skillLevel === level;
                              return (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() => selectSkill(level)}
                                  className={`py-2 px-3 rounded-xl border text-xs  text-center transition-all ${
                                    isSelected
                                      ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                      : "border-border bg-background/30 text-muted-foreground hover:bg-muted/30"
                                  }`}
                                >
                                  {level}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4 pt-2">
                        <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2.5">
                          <div className="flex gap-2">
                            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs ">Verification Required</p>
                              <p className="text-[0.72rem] text-muted-foreground mt-0.5 leading-relaxed">
                                To ensure the highest quality listings and match safety, SportXClub verifies all commercial venue owners and tournament organizers.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label htmlFor="city">City of Operation</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                            <Input
                              id="city"
                              name="city"
                              type="text"
                              placeholder="E.g. Mumbai, Delhi"
                              className="pl-10 h-10.5 rounded-xl border-border bg-background/50 focus-visible:bg-background"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 pt-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="h-11 px-4 rounded-full border border-border flex items-center justify-center gap-1.5"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        disabled={!isStep2Valid()}
                        onClick={handleNext}
                        className="flex-1 h-11 rounded-full bg-primary text-primary-foreground  hover:shadow-lg hover:shadow-primary/10 transition-all flex items-center justify-center gap-1.5 group"
                      >
                        Continue
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: OTP VERIFICATION */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Mobile Number</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Phone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="98765 43210"
                              className="pl-10 h-10.5 rounded-xl border-border bg-background/50 focus-visible:bg-background"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            disabled={formData.phone.length < 10}
                            onClick={sendMockOtp}
                            className="h-10.5 px-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs  transition-all shrink-0"
                          >
                            Send OTP
                          </Button>
                        </div>
                      </div>

                      {otpSent && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-1.5"
                        >
                          <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                            <Input
                              id="otp"
                              name="otp"
                              type="text"
                              maxLength={6}
                              placeholder="994021"
                              className="pl-10 h-10.5 rounded-xl tracking-[0.25em] font-mono text-center  text-lg"
                              value={formData.otp}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          {otpError && (
                            <p className="text-xs text-rose-500 ">{otpError}</p>
                          )}
                          <p className="text-[0.72rem] text-muted-foreground">
                            Enter the mock verification code: <code className="bg-muted px-1.5 py-0.5 rounded font-mono ">994021</code>
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl border border-border bg-muted/20 text-xs text-muted-foreground space-y-1.5">
                      <p className=" text-foreground">Terms and Conditions</p>
                      <p className="leading-relaxed">
                        By finalizing registration, you agree to SportXClub's Terms of Use, Privacy Policy, Turf Booking Codes, and Match Fair-Play Guidelines.
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 pt-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="h-11 px-4 rounded-full border border-border flex items-center justify-center gap-1.5"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={!isStep3Valid() || isSubmitting}
                        className="flex-1 h-11 rounded-full bg-[#6DFF3B] text-[#050505]  hover:shadow-lg hover:shadow-[#6DFF3B]/20 hover:bg-[#86ff60] transition-all flex items-center justify-center gap-1.5"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          <>
                            Complete Registration
                            <Check className="h-4.5 w-4.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Footer */}
        {!isSuccess && (
          <div className="text-center text-sm text-muted-foreground mt-8 pt-6 border-t border-border/40">
            Already have an account?{" "}
            <Link to="/login" className="text-primary  hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

