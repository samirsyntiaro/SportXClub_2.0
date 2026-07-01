
import { type HTMLAttributes } from "react";

import { cn } from "../ui/utils";

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex h-16 items-center font-sans", className)} {...props}>
      <span className="text-foreground text-[1.4rem] font-light tracking-tight relative z-20 md:text-[1.8rem]">
        sport
      </span>
      <div className="relative flex w-5 items-center justify-center md:w-6">
        <span className="text-[#A8C93A] text-[2.8rem] md:text-[3.5rem] font-light absolute -top-[2.2rem] md:-top-[2.8rem] z-10 scale-y-90">
          X
        </span>
      </div>
      <span className="text-foreground text-[1.4rem] font-light tracking-tight relative z-20 md:text-[1.8rem]">
        club
      </span>
    </div>
  );
}

