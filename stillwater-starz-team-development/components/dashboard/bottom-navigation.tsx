"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { DashboardNavigationItem } from "@/components/dashboard/navigation";
import { cn } from "@/lib/utils";

export function BottomNavigation({ navigation }: { navigation: DashboardNavigationItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-4">
        {navigation.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const hrefPath = item.href?.split("#")[0];
          const current = item.current ?? (item.activePrefix
            ? pathname.startsWith(item.activePrefix)
            : hrefPath === "/parent"
              ? pathname === "/parent"
              : Boolean(hrefPath && pathname.startsWith(hrefPath)));
          const classes = cn(
            "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold",
            current ? "text-navy-800" : "text-slate-500",
          );

          return item.href ? (
            <Link key={item.label} href={item.href} aria-current={current ? "page" : undefined} className={classes}>
              <Icon className={cn("h-5 w-5", current && "text-red-600")} />
              <span>{item.label}</span>
            </Link>
          ) : (
            <button key={item.label} type="button" disabled title="Coming soon" className={cn(classes, "cursor-default")}>
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
