import { useTheme } from "next-themes";
import { Smartphone, Download } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";

export function AppDownloadCTA() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#050505] relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden",
          isDark 
            ? "bg-[#101216] border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,1)]" 
            : "bg-slate-50 border border-slate-200 shadow-[0_30px_100px_-20px_rgba(15,23,42,0.1)]"
        )}>
          {/* Background decoration */}
          <div className={cn("absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3", isDark ? "bg-[#6DFF3B]/5" : "bg-[#6DFF3B]/20")} />
          <div className={cn("absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4", isDark ? "bg-blue-400/5" : "bg-blue-500/10")} />
          
          <div className="flex-1 max-w-2xl relative z-10">
            <div 
              className={cn(
                "inline-flex items-center justify-center mb-8 px-4 py-2 rounded-full font-semibold tracking-[0.15em] text-[0.7rem] uppercase",
                isDark ? "bg-[#6DFF3B]/10 text-[#6DFF3B] border border-[#6DFF3B]/20" : "bg-[#6DFF3B]/20 text-[#050505] border border-[#6DFF3B]/40"
              )}
            >
              Get The App
            </div>
            <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]", isDark ? "text-white" : "text-slate-900")}>
              Your entire sports life. <br />
              <span className={isDark ? "text-[#6DFF3B]" : "text-[#4ade80]"}>In your pocket.</span>
            </h2>
            <p className={cn(
              "text-lg md:text-xl mb-10 max-w-lg leading-relaxed",
              isDark ? "text-white/70" : "text-slate-600"
            )}>
              Book turfs in seconds, split payments with friends, and track your tournament progress on the go with the SportXClub app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className={cn(
                "h-16 rounded-full px-8 gap-4 text-base shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl group",
                isDark ? "border border-[#6DFF3B] bg-[#6DFF3B] text-[#050505] hover:bg-[#86ff60]" : "border border-[#050505] bg-[#050505] text-[#6DFF3B] hover:bg-[#1a1a1a]"
              )}>
                <Smartphone className="w-6 h-6" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[0.65rem] uppercase tracking-wider leading-tight opacity-70 font-semibold mb-0.5">Download on the</span>
                  <span className="font-bold text-lg leading-none">App Store</span>
                </div>
              </Button>
              <Button size="lg" className={cn(
                "h-16 rounded-full px-8 gap-4 text-base shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl group",
                isDark ? "border border-[#6DFF3B] bg-transparent text-white hover:bg-[#6DFF3B] hover:text-[#050505]" : "border border-slate-300 bg-white text-slate-900 hover:border-[#050505] hover:bg-slate-50"
              )}>
                <Download className="w-6 h-6" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[0.65rem] uppercase tracking-wider leading-tight opacity-70 font-semibold mb-0.5">Get it on</span>
                  <span className="font-bold text-lg leading-none">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
          
          {/* App Mockup Illustration */}
          <div className="flex-1 relative z-10 hidden lg:flex justify-end w-full max-w-md">
            <div className={cn(
              "relative w-[280px] aspect-[4/8] rounded-[2.5rem] overflow-hidden border-[12px] shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out",
              isDark ? "border-[#20232a] bg-[#050505]" : "border-slate-800 bg-slate-50"
            )}>
              {/* iPhone Notch */}
              <div className={cn("absolute top-0 inset-x-0 h-6 w-32 mx-auto rounded-b-2xl z-20", isDark ? "bg-[#20232a]" : "bg-slate-800")} />
              
              {/* Fake UI inside the phone */}
              <div className="absolute inset-0 p-5 pt-10 flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <div className={cn("h-4 w-24 rounded-full", isDark ? "bg-white/20" : "bg-slate-300")} />
                  <div className={cn("h-8 w-8 rounded-full", isDark ? "bg-white/10" : "bg-slate-200")} />
                </div>
                {/* Hero card */}
                <div className={cn(
                  "w-full aspect-[1.8/1] rounded-2xl border relative overflow-hidden",
                  isDark ? "bg-[#6DFF3B]/20 border-[#6DFF3B]/30" : "bg-[#6DFF3B]/20 border-[#6DFF3B]/40"
                )}>
                  <div className={cn("absolute bottom-3 left-3 h-3 w-1/2 opacity-40 rounded-full", isDark ? "bg-[#6DFF3B]" : "bg-[#4ade80]")} />
                </div>
                {/* Quick actions */}
                <div className="flex gap-3">
                   <div className={cn("flex-1 h-14 rounded-xl", isDark ? "bg-white/10" : "bg-slate-200")} />
                   <div className={cn("flex-1 h-14 rounded-xl", isDark ? "bg-white/10" : "bg-slate-200")} />
                </div>
                {/* List items */}
                <div className={cn("w-full h-16 rounded-2xl", isDark ? "bg-white/5" : "bg-white border border-slate-100")} />
                <div className={cn("w-full h-16 rounded-2xl", isDark ? "bg-white/5" : "bg-white border border-slate-100")} />
                <div className={cn("w-full h-16 rounded-2xl", isDark ? "bg-white/5" : "bg-white border border-slate-100")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
