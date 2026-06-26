import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-light/40 via-white to-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.08),transparent_50%)]"
        aria-hidden="true"
      />
      <Container as="div" className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Swim Team Platform
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Starz Team Development
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The dedicated platform for private lesson scheduling, coach
            availability, and team announcements — built to replace
            spreadsheets with a simple, reliable experience for parents,
            coaches, and administrators.
          </p>
        </div>
      </Container>
    </section>
  );
}
