import { Container } from "@/components/layout/container";
import {
  Card,
  CardDescription,
  CardIcon,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Book Private Lessons",
    description:
      "Parents can browse coach availability and reserve private lesson slots for their swimmers during the summer season.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "Manage Coach Availability",
    description:
      "Coaches set their open time slots so parents always see accurate, up-to-date scheduling without back-and-forth messages.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Team Announcements",
    description:
      "Administrators publish announcements that reach the entire team, keeping everyone informed about schedule changes and updates.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M18 8a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a3 3 0 0 0 3-3" />
        <path d="M18 8v8a3 3 0 0 1-3 3" />
        <path d="M6 10h8M6 14h5" />
      </svg>
    ),
  },
] as const;

export function FeatureCards() {
  return (
    <section className="py-16 sm:py-20">
      <Container as="div">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Everything your team needs in one place
          </h2>
          <p className="mt-3 text-muted-foreground">
            A focused set of tools designed around how Starz private lessons
            actually work.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardIcon>{feature.icon}</CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
