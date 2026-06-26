import { Container } from "@/components/layout/container";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/80 backdrop-blur-md">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Logo />
        <Button variant="primary" size="sm" href="#sign-in" aria-label="Login">
          Login
        </Button>
      </Container>
    </header>
  );
}
