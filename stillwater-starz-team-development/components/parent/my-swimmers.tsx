"use client";

import { useCallback, useEffect, useState } from "react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { SwimmersIcon } from "@/components/dashboard/icons";
import { Button, ButtonLink } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { getFriendlySwimmerError } from "@/lib/swimmer-errors";
import {
  getParentSwimmers,
  softDeleteParentSwimmer,
  type Swimmer,
} from "@/lib/firebase/swimmers";
import { calculateAge } from "@/lib/swimmer-validation";

export function MySwimmers({ parentId }: { parentId: string }) {
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedSwimmer, setSelectedSwimmer] = useState<Swimmer | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadSwimmers = useCallback(async () => {
    try {
      const records = await getParentSwimmers(parentId);
      setSwimmers(records);
      setError(null);
    } catch (loadError) {
      setError(getFriendlySwimmerError(loadError));
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    let active = true;
    void loadSwimmers().catch(() => {
      if (active) setError("We couldn't load your swimmers right now. Please try again later.");
    });
    return () => {
      active = false;
    };
  }, [loadSwimmers]);

  async function handleDelete() {
    if (!selectedSwimmer) return;
    setDeleting(true);
    setError(null);

    try {
      await softDeleteParentSwimmer(selectedSwimmer.swimmerId, parentId);
      await loadSwimmers();
      setSuccess(`${selectedSwimmer.firstName} was removed successfully.`);
      setSelectedSwimmer(null);
    } catch (deleteError) {
      setError(getFriendlySwimmerError(deleteError));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <DashboardCard
        id="swimmers"
        title="My Swimmers"
        description="Swimmers connected to your parent account."
        action={
          <ButtonLink href="/parent/swimmers/new" className="h-10 shrink-0 px-4 text-xs">
            Add Swimmer
          </ButtonLink>
        }
      >
        {success ? (
          <div role="status" className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {success}
          </div>
        ) : null}
        {error ? (
          <div role="alert" className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2" role="status" aria-label="Loading swimmers">
            <div className="h-44 animate-pulse rounded-2xl bg-slate-100" />
            <div className="hidden h-44 animate-pulse rounded-2xl bg-slate-100 sm:block" />
          </div>
        ) : swimmers.length === 0 ? (
          <EmptyState
            icon={<SwimmersIcon className="h-6 w-6" />}
            message="You haven't added any swimmers yet."
            actionLabel="Add Swimmer"
            actionHref="/parent/swimmers/new"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {swimmers.map((swimmer) => (
              <article
                key={swimmer.swimmerId}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-100 text-sm font-bold text-navy-700">
                      {swimmer.firstName[0]}
                      {swimmer.lastName[0]}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-navy-900">
                        {swimmer.firstName} {swimmer.lastName}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Age {calculateAge(swimmer.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                  <span className={swimmer.active ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700" : "rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600"}>
                    {swimmer.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ability Level</p>
                  <p className="mt-1 text-sm font-medium text-navy-800">{swimmer.abilityLevel}</p>
                </div>

                {swimmer.active ? (
                  <div className="mt-5 flex gap-2">
                    <ButtonLink href={`/parent/swimmers/${swimmer.swimmerId}/edit`} variant="secondary" className="h-9 flex-1 px-3 text-xs">
                      Edit
                    </ButtonLink>
                    <Button type="button" variant="secondary" onClick={() => {
                      setSuccess(null);
                      setSelectedSwimmer(swimmer);
                    }} className="h-9 flex-1 border-red-200 px-3 text-xs text-red-600 hover:border-red-300 hover:bg-red-50">
                      Delete
                    </Button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </DashboardCard>

      <ConfirmationDialog
        open={Boolean(selectedSwimmer)}
        title="Delete swimmer?"
        description={`${selectedSwimmer?.firstName ?? "This swimmer"} will be marked inactive and can no longer be used for future actions.`}
        confirmLabel="Delete Swimmer"
        confirmingLabel="Deleting…"
        confirming={deleting}
        onCancel={() => setSelectedSwimmer(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
