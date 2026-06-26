import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const loginOptions = [
  {
    label: "Parent Login",
    description: "Book lessons and view your swimmer's schedule.",
  },
  {
    label: "Coach Login",
    description: "Manage availability and view upcoming lessons.",
  },
  {
    label: "Admin Login",
    description: "Manage users, bookings, and team settings.",
  },
] as const;

export function LoginSection() {
  return (
    <section id="sign-in" className="border-t border-border bg-muted/30 py-16 sm:py-20">
      <Container as="div">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Sign in to your account
          </h2>
          <p className="mt-3 text-muted-foreground">
            Select your role to access the platform. Authentication will be
            available in a future release.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {loginOptions.map((option) => (
            <div
              key={option.label}
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                aria-label={option.label}
              >
                {option.label}
              </Button>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
