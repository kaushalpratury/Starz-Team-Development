import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/dashboard/icons";

interface QuickActionCardProps {
  title: string;
  icon: ReactNode;
  href?: string;
}

export function QuickActionCard({ title, icon, href }: QuickActionCardProps) {
  const content = (
    <>
      <span className="flex w-full items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
          {icon}
        </span>
        <ArrowRightIcon className="h-4 w-4 text-slate-400" />
      </span>
      <span className="mt-4 text-sm font-semibold text-navy-800">{title}</span>
    </>
  );
  const className = "group flex min-h-28 w-full flex-col items-start justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:border-navy-200 hover:bg-navy-50 disabled:cursor-default disabled:opacity-100";

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button
      type="button"
      disabled
      title="Coming soon"
      className={className}
    >
      {content}
    </button>
  );
}
