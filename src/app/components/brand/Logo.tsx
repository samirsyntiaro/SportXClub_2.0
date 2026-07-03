
import { type HTMLAttributes } from "react";

import { cn } from "../ui/utils";

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex items-center justify-start shrink-0", className)} {...props}>
      <img 
        src="/assets/icons/SportXClub-light.png" 
        alt="SportXClub" 
        className="block h-6 md:h-7 w-auto object-contain dark:hidden" 
      />
      <img 
        src="/assets/icons/SportXClub-dark.png" 
        alt="SportXClub" 
        className="hidden h-6 md:h-7 w-auto object-contain dark:block" 
      />
    </div>
  );
}

