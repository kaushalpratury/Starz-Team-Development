"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SwimmerForm } from "@/components/parent/swimmer-form";
import { ButtonLink } from "@/components/ui/button";
import { getFriendlySwimmerError } from "@/lib/swimmer-errors";
import {
  getParentSwimmer,
  updateParentSwimmer,
  type Swimmer,
} from "@/lib/firebase/swimmers";
import type { SwimmerFields } from "@/lib/swimmer-validation";

export default function EditSwimmerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [swimmer, setSwimmer] = useState<Swimmer | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSwimmer() {
      if (!user) return;
      try {
        const record = await getParentSwimmer(id, user.uid);
        if (!record || !record.active) {
          if (active) setLoadError("The requested swimmer is not available.");
        } else if (active) {
          setSwimmer(record);
        }
      } catch (error) {
        if (active) setLoadError(getFriendlySwimmerError(error));
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadSwimmer();
    return () => {
      active = false;
    };
  }, [id, user]);

  async function handleUpdate(values: SwimmerFields) {
    if (!user) throw new Error("A parent account is required.");
    await updateParentSwimmer(id, user.uid, values);
    router.push("/parent?status=swimmer-updated");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <DashboardHeader
        title="Edit Swimmer"
        description="Update this swimmer's profile information."
      />

      {loading ? (
        <DashboardCard>
          <div className="space-y-5" role="status" aria-label="Loading swimmer">
            <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </DashboardCard>
      ) : loadError || !swimmer ? (
        <DashboardCard>
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-5 py-6 text-center">
            <p className="text-sm text-red-700">{loadError ?? "The requested swimmer is not available."}</p>
            <ButtonLink href="/parent" variant="secondary" className="mt-5">
              Return to Dashboard
            </ButtonLink>
          </div>
        </DashboardCard>
      ) : (
        <DashboardCard>
          <SwimmerForm
            initialValues={{
              firstName: swimmer.firstName,
              lastName: swimmer.lastName,
              dateOfBirth: swimmer.dateOfBirth,
              abilityLevel: swimmer.abilityLevel,
              notes: swimmer.notes,
            }}
            submitLabel="Save Changes"
            submittingLabel="Saving Changes…"
            onSubmit={handleUpdate}
          />
        </DashboardCard>
      )}
    </div>
  );
}
