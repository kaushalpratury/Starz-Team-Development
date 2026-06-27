"use client";

import type { ReactNode } from "react";

import { ParentOnly } from "@/components/auth/auth-guards";
import { AuthenticatedAppLayout } from "@/components/dashboard/authenticated-app-layout";
import {
  CalendarIcon,
  HomeIcon,
  SwimmersIcon,
  UserIcon,
} from "@/components/dashboard/icons";
import type { DashboardNavigationItem } from "@/components/dashboard/navigation";

const parentNavigation: DashboardNavigationItem[] = [
  { label: "Dashboard", icon: HomeIcon, href: "/parent" },
  {
    label: "Swimmers",
    icon: SwimmersIcon,
    href: "/parent#swimmers",
    activePrefix: "/parent/swimmers",
  },
  { label: "Lessons", icon: CalendarIcon },
  { label: "Profile", icon: UserIcon },
];

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <ParentOnly>
      <AuthenticatedAppLayout
        applicationTitle="Parent Portal"
        navigation={parentNavigation}
      >
        {children}
      </AuthenticatedAppLayout>
    </ParentOnly>
  );
}
