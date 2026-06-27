import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/ui/page-layout";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <PageLayout>
      <main className="flex w-full items-center justify-center py-5 sm:py-8">
        <Card className="h-auto w-full max-w-xl p-5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
          <Link
            href="/"
            aria-label="Back to Stillwater Starz home"
            className="mx-auto block w-full max-w-64 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-500 sm:max-w-72"
          >
            <BrandMark />
          </Link>

          <div className="mt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
              {description}
            </p>
          </div>

          <div className="mt-8">{children}</div>

          <div className="mt-7 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
            {footer}
          </div>
        </Card>
      </main>
    </PageLayout>
  );
}
