interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="mb-6 sm:mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
        Stillwater Starz
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
    </header>
  );
}
