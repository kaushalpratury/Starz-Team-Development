import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import { BottomNavigation } from "@/components/dashboard/bottom-navigation";
import type { DashboardNavigationItem } from "@/components/dashboard/navigation";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { Sidebar } from "@/components/dashboard/sidebar";

interface AuthenticatedAppLayoutProps {
  applicationTitle: string;
  navigation: DashboardNavigationItem[];
  children: ReactNode;
}

export function AuthenticatedAppLayout({
  applicationTitle,
  navigation,
  children,
}: AuthenticatedAppLayoutProps) {
  return (
    <div className="min-h-dvh bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-slate-950">
      <div className="mx-auto flex min-h-dvh max-w-[1600px] bg-slate-50/40">
        <Sidebar applicationTitle={applicationTitle} navigation={navigation} />

        <div className="min-w-0 flex-1 pb-24 lg:pb-0">
          <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:justify-end lg:px-8">
            <div className="lg:hidden">
              <BrandMark className="max-w-28" />
              <p className="mt-0.5 text-sm font-semibold text-navy-900">{applicationTitle}</p>
            </div>
            <ProfileMenu />
          </header>

          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {children}
          </main>
        </div>
      </div>

      <BottomNavigation navigation={navigation} />
    </div>
  );
}
