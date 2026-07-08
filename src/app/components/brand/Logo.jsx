import { cn } from "../ui/utils";

export function Logo({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-start shrink-0",
        className,
      )}
      {...props}
    >
      <img
        src="/assets/icons/SportXClub.png"
        alt="SportXClub"
        className="block dark:hidden h-[65px] md:h-[100px] w-auto object-contain mt-[15px] mr-[15px] md:mr-[30px] transition-all duration-300"
      />
      <img
        src="/assets/icons/SportXClub-light.png"
        alt="SportXClub"
        className="hidden dark:block h-[65px] md:h-[100px] w-auto object-contain mt-[15px] mr-[15px] md:mr-[30px] transition-all duration-300"
      />
    </div>
  );
}
