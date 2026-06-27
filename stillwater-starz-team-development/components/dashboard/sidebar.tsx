"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import { LogoutIcon } from "@/components/dashboard/icons";
import type { DashboardNavigationItem } from "@/components/dashboard/navigation";
import { useSignOut } from "@/components/dashboard/use-sign-out";
import { cn } from "@/lib/utils";

interface SidebarProps {
  applicationTitle: string;
  navigation: DashboardNavigationItem[];
}

export function Sidebar({ applicationTitle, navigation }: SidebarProps) {
  const pathname = usePathname();
  const { signOut, signingOut, signOutError } = useSignOut();

  return (
    <aside className="hidden min-h-dvh w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
      <div className="px-2">
        <BrandMark className="max-w-48" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-red-600">
          {applicationTitle}
        </p>
      </div>

      <nav aria-label="Primary navigation" className="mt-9 flex-1 space-y-1.5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const hrefPath = item.href?.split("#")[0];
          const current = item.current ?? (item.activePrefix
            ? pathname.startsWith(item.activePrefix)
            : hrefPath === "/parent"
              ? pathname === "/parent"
              : Boolean(hrefPath && pathname.startsWith(hrefPath)));
          const classes = cn(
            "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold",
            current
              ? "bg-navy-700 text-white shadow-[0_10px_24px_rgba(28,44,84,0.18)]"
              : "text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy-800",
          );

          return item.href ? (
            <Link key={item.label} href={item.href} aria-current={current ? "page" : undefined} className={classes}>
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          ) : (
            <button key={item.label} type="button" disabled title="Coming soon" className={cn(classes, "cursor-default")}>
              <Icon className="h-5 w-5" />
              {item.label}
              <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Soon
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 pt-4">
        {signOutError ? <p role="alert" className="mb-2 px-3 text-xs text-red-600">{signOutError}</p> : null}
        <button
          type="button"
          disabled={signingOut}
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 disabled:opacity-50"
        >
          <LogoutIcon className="h-5 w-5" />
          {signingOut ? "Signing Out…" : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
