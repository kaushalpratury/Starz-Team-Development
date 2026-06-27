import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function PageLayout({ className, children, ...props }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(28,44,84,0.09),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#edf2f8_100%)] text-slate-950",
        className,
      )}
      {...props}
    >
      <Container className="flex min-h-dvh items-start justify-center py-5 sm:py-8 lg:py-10">
        {children}
      </Container>
    </div>
  );
}
