import { ParentDashboard } from "@/components/parent/parent-dashboard";

interface ParentPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function ParentPage({ searchParams }: ParentPageProps) {
  const { status } = await searchParams;
  const successMessage =
    status === "swimmer-created"
      ? "Swimmer added successfully."
      : status === "swimmer-updated"
        ? "Swimmer updated successfully."
        : undefined;

  return <ParentDashboard successMessage={successMessage} />;
}
