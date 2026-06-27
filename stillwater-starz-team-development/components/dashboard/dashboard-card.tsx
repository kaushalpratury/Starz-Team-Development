import type { HTMLAttributes, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function DashboardCard({
  title,
  description,
  action,
  className,
  children,
  ...props
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        "h-auto rounded-3xl border-slate-200/90 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.055)] hover:shadow-[0_16px_44px_rgba(15,23,42,0.075)] sm:p-6",
        className,
      )}
      {...props}
    >
      {title || action ? (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title ? <h2 className="text-lg font-semibold text-navy-800">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </Card>
  );
}
