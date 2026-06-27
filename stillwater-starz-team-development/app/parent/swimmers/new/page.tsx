"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SwimmerForm } from "@/components/parent/swimmer-form";
import { createParentSwimmer } from "@/lib/firebase/swimmers";
import { emptySwimmerFields, type SwimmerFields } from "@/lib/swimmer-validation";

export default function NewSwimmerPage() {
  const router = useRouter();
  const { user } = useAuth();

  async function handleCreate(values: SwimmerFields) {
    if (!user) throw new Error("A parent account is required.");
    await createParentSwimmer(user.uid, values);
    router.push("/parent?status=swimmer-created");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <DashboardHeader
        title="Add Swimmer"
        description="Create a swimmer profile for your parent account."
      />
      <DashboardCard>
        <SwimmerForm
          initialValues={emptySwimmerFields}
          submitLabel="Add Swimmer"
          submittingLabel="Adding Swimmer…"
          onSubmit={handleCreate}
        />
      </DashboardCard>
    </div>
  );
}
