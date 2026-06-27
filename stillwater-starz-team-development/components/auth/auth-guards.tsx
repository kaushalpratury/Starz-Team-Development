"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { PageLayout } from "@/components/ui/page-layout";

function AuthLoading() {
  return (
    <PageLayout>
      <div className="flex min-h-[70dvh] items-center justify-center" role="status">
        <div className="flex items-center gap-3 text-sm font-medium text-navy-700">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-navy-200 border-t-navy-700" />
          Loading your account…
        </div>
      </div>
    </PageLayout>
  );
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const isParent = Boolean(user && profile?.role === "parent" && profile.active);

  useEffect(() => {
    if (!loading && isParent) router.replace("/parent");
  }, [isParent, loading, router]);

  if (loading || isParent) return <AuthLoading />;
  return children;
}

export function ParentOnly({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const isParent = Boolean(user && profile?.role === "parent" && profile.active);

  useEffect(() => {
    if (!loading && !isParent) router.replace("/login");
  }, [isParent, loading, router]);

  if (loading || !isParent) return <AuthLoading />;
  return children;
}
