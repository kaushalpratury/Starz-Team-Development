import { Container } from "@/components/layout/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <Container as="div" className="py-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {year} Starz Team Development. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
