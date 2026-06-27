import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon, message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/75 px-5 py-8 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-50 text-navy-600">
        {icon}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{message}</p>
      {actionLabel && actionHref ? (
        <ButtonLink href={actionHref} className="mt-5 h-10 px-5 text-xs">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
