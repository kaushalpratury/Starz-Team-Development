"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  ActivityIcon,
  CalendarIcon,
  HistoryIcon,
  SwimmersIcon,
  UserIcon,
} from "@/components/dashboard/icons";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { MySwimmers } from "@/components/parent/my-swimmers";

const quickActions = [
  { title: "Book Private Lesson", icon: CalendarIcon },
  { title: "My Swimmers", icon: SwimmersIcon, href: "/parent#swimmers" },
  { title: "Lesson History", icon: HistoryIcon },
  { title: "Profile", icon: UserIcon },
];

export function ParentDashboard({ successMessage }: { successMessage?: string }) {
  const { user, profile } = useAuth();
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(today);

  return (
    <>
      <DashboardHeader
        title="Parent Dashboard"
        description="Manage your swimmers and private lesson activity."
      />

      {successMessage ? (
        <div role="status" className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 sm:mb-6">
          {successMessage}
        </div>
      ) : null}

      <div className="space-y-5 sm:space-y-6">
        <section className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#1c2c54_0%,#243a63_58%,#314777_100%)] p-6 text-white shadow-[0_20px_50px_rgba(28,44,84,0.2)] sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-200">
                Parent Portal
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome back, {profile?.firstName}
              </h2>
            </div>
            <time
              dateTime={today.toISOString().slice(0, 10)}
              suppressHydrationWarning
              className="text-sm font-medium text-navy-100"
            >
              {formattedDate}
            </time>
          </div>
        </section>

        <div className="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <div className="space-y-5 sm:space-y-6">
            {user ? <MySwimmers parentId={user.uid} /> : null}

            <DashboardCard title="Quick Actions" description="Common parent portal tasks.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <QuickActionCard
                      key={action.title}
                      title={action.title}
                      icon={<Icon className="h-5 w-5" />}
                      href={action.href}
                    />
                  );
                })}
              </div>
            </DashboardCard>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <DashboardCard title="Upcoming Lessons">
              <EmptyState
                icon={<CalendarIcon className="h-6 w-6" />}
                message="No upcoming private lessons."
              />
            </DashboardCard>

            <DashboardCard title="Recent Activity">
              <EmptyState
                icon={<ActivityIcon className="h-6 w-6" />}
                message="No recent activity."
              />
            </DashboardCard>
          </div>
        </div>
      </div>
    </>
  );
}
