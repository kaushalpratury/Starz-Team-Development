import type { ComponentType, SVGProps } from "react";

export interface DashboardNavigationItem {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  activePrefix?: string;
  current?: boolean;
}
