
import { type HTMLAttributes } from "react";

import { cn } from "../ui/utils";

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex items-center justify-start shrink-0", className)} {...props}>
      <img 
        src="/assets/icons/SportXClub.png" 
        alt="SportXClub" 
        className="block h-[65px] md:h-[100px] w-auto object-contain mt-[15px] mr-[15px] md:mr-[30px] dark:invert transition-all duration-300" 
      />
    </div>
  );
}

