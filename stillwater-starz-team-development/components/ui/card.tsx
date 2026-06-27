import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-full rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-shadow duration-200 hover:shadow-[0_24px_70px_rgba(15,23,42,0.11)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
