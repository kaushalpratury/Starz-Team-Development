import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { FeatureCards } from "@/components/marketing/feature-cards";
import { Hero } from "@/components/marketing/hero";
import { LoginSection } from "@/components/marketing/login-section";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <LoginSection />
      </main>
      <Footer />
    </div>
  );
}
