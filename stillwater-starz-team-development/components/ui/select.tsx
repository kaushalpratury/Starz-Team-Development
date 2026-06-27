import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-950 shadow-sm transition-colors focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-100 disabled:bg-slate-100 disabled:text-slate-500",
        className,
      )}
      {...props}
    />
  );
}
