import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-950 shadow-sm transition-colors placeholder:text-slate-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-100",
        className,
      )}
      {...props}
    />
  );
}
